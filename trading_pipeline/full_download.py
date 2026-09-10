import os, subprocess, time, hashlib, json
from pathlib import Path
import pandas as pd
import numpy as np

window = os.environ["WINDOW"]
START_DATE, END_DATE = window.split("__", 1)
ROOT = Path("output")
RAW = ROOT / "raw"
REPORTS = ROOT / "reports"
RAW.mkdir(parents=True, exist_ok=True)
REPORTS.mkdir(parents=True, exist_ok=True)

TASKS = [
    ("EURUSD","eurusd","m1","bid"),
    ("EURUSD","eurusd","m1","ask"),
    ("EURUSD","eurusd","tick","bid"),
    ("DXY_DUKASCOPY","dollaridxusd","m1","bid"),
    ("DXY_DUKASCOPY","dollaridxusd","m1","ask"),
]

def stem(label, tf, side):
    return f"{label}_{tf}_{side}_{START_DATE}_{END_DATE}"

def run_download(label, instrument, tf, side):
    s = stem(label, tf, side)
    csv = RAW / f"{s}.csv"
    delays = [0, 20, 45, 90, 180, 300]
    for attempt, delay in enumerate(delays, 1):
        if delay:
            time.sleep(delay)
        cmd = [
            "dukascopy-node", "-i", instrument, "-from", START_DATE, "-to", END_DATE,
            "-t", tf, "-p", side, "-f", "csv", "-dir", str(RAW), "-fn", s,
            "-bs", "1", "-bp", "3000", "-r", "4", "-rp", "5000"
        ]
        print(f"ATTEMPT {attempt}/{len(delays)}:", " ".join(cmd), flush=True)
        rc = subprocess.run(cmd).returncode
        if rc == 0 and csv.exists() and csv.stat().st_size > 50:
            return csv
        if csv.exists():
            csv.unlink(missing_ok=True)
    raise RuntimeError(f"download failed: {label} {tf} {side} {START_DATE} {END_DATE}")

def verify_and_compact(csv):
    df = pd.read_csv(csv)
    if df.empty:
        raise RuntimeError(f"empty csv: {csv}")
    pq = csv.with_suffix(".parquet")
    df.to_parquet(pq, index=False, compression="zstd")
    vr = pd.read_parquet(pq)
    if list(df.columns) != list(vr.columns) or len(df) != len(vr):
        raise RuntimeError(f"parquet structural mismatch: {pq}")
    for c in df.columns:
        if pd.api.types.is_numeric_dtype(df[c]):
            if not np.array_equal(df[c].to_numpy(), vr[c].to_numpy(), equal_nan=True):
                raise RuntimeError(f"parquet numeric mismatch: {pq}::{c}")
    csv.unlink()
    return pq, df

def quality_m1(label, side, df):
    req = {"timestamp","open","high","low","close"}
    miss = req.difference(df.columns)
    if miss:
        raise RuntimeError(f"{label} {side}: missing {miss}")
    dup = int(df["timestamp"].duplicated().sum())
    ts = pd.to_datetime(df["timestamp"], unit="ms", utc=True)
    bad = int(((df["high"] < df[["open","close"]].max(axis=1)) |
               (df["low"] > df[["open","close"]].min(axis=1)) |
               (df["high"] < df["low"])).sum())
    return {"instrument":label,"kind":"m1","side":side,"rows":len(df),
            "duplicates":dup,"invalid_ohlc":bad,"start_utc":str(ts.min()),"end_utc":str(ts.max())}

def quality_tick(label, df):
    req = {"timestamp","askPrice","bidPrice"}
    miss = req.difference(df.columns)
    if miss:
        raise RuntimeError(f"{label} tick: missing {miss}")
    ts = pd.to_datetime(df["timestamp"], unit="ms", utc=True)
    return {"instrument":label,"kind":"tick","side":"both","rows":len(df),
            "duplicates":int(df["timestamp"].duplicated().sum()),
            "negative_spread":int((df["askPrice"] < df["bidPrice"]).sum()),
            "start_utc":str(ts.min()),"end_utc":str(ts.max())}

created, quality = [], []
m1_frames = {}
for label, instrument, tf, side in TASKS:
    csv = run_download(label, instrument, tf, side)
    pq, df = verify_and_compact(csv)
    created.append(pq)
    if tf == "m1":
        quality.append(quality_m1(label, side, df))
        m1_frames[(label,side)] = df
    else:
        quality.append(quality_tick(label, df))
    time.sleep(8 if tf == "m1" else 20)

for label in ("EURUSD","DXY_DUKASCOPY"):
    b = m1_frames[(label,"bid")][["timestamp","open","close"]].rename(columns={"open":"bid_open","close":"bid_close"})
    a = m1_frames[(label,"ask")][["timestamp","open","close"]].rename(columns={"open":"ask_open","close":"ask_close"})
    j = b.merge(a, on="timestamp", how="outer", indicator=True)
    quality.append({
        "instrument":label,"kind":"m1_crosscheck","side":"bid_ask",
        "rows":len(j),"duplicates":0,
        "missing_bid_or_ask":int((j["_merge"]!="both").sum()),
        "negative_spread":int(((j["ask_open"]-j["bid_open"]<0) | (j["ask_close"]-j["bid_close"]<0)).fillna(False).sum())
    })

q = pd.DataFrame(quality)
q.to_csv(REPORTS / f"quality_{START_DATE}_{END_DATE}.csv", index=False)

rows=[]
for p in sorted(created):
    h=hashlib.sha256()
    with open(p,"rb") as f:
        for chunk in iter(lambda:f.read(8*1024*1024), b""):
            h.update(chunk)
    rows.append({"file":str(p.relative_to(ROOT)),"bytes":p.stat().st_size,"sha256":h.hexdigest()})
pd.DataFrame(rows).to_csv(REPORTS / f"checksums_{START_DATE}_{END_DATE}.csv", index=False)

manifest = {
    "source":"Dukascopy public historical data feed",
    "start_inclusive":START_DATE,"end_exclusive":END_DATE,
    "timezone":"UTC",
    "EURUSD":{"m1":["bid","ask"],"ticks":"bid+ask contained in each tick row"},
    "DXY_DUKASCOPY":{"instrument":"dollaridxusd","m1":["bid","ask"],"ticks":"omitted after persistent HTTP 429; M1 retained for all required bar timeframes"},
    "files":[str(p.relative_to(ROOT)) for p in created]
}
(REPORTS / f"manifest_{START_DATE}_{END_DATE}.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(q.to_string(index=False))
print(json.dumps(manifest, indent=2))
