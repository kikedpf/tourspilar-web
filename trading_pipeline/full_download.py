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

# Core bars are mandatory. EURUSD ticks are attempted but do not invalidate a month
# if Dukascopy rate-limits them; missing ticks are recorded for a later recovery pass.
CORE_TASKS = [
    ("EURUSD","eurusd","m1","bid"),
    ("EURUSD","eurusd","m1","ask"),
    ("DXY_DUKASCOPY","dollaridxusd","m1","bid"),
    ("DXY_DUKASCOPY","dollaridxusd","m1","ask"),
]
OPTIONAL_TICK_TASKS = [
    ("EURUSD","eurusd","tick","bid"),
]

def stem(label, tf, side):
    return f"{label}_{tf}_{side}_{START_DATE}_{END_DATE}"

def run_download(label, instrument, tf, side, required=True):
    s = stem(label, tf, side)
    csv = RAW / f"{s}.csv"
    delays = [0, 30, 90, 180]
    for attempt, delay in enumerate(delays, 1):
        if delay:
            time.sleep(delay)
        cmd = [
            "dukascopy-node", "-i", instrument, "-from", START_DATE, "-to", END_DATE,
            "-t", tf, "-p", side, "-f", "csv", "-dir", str(RAW), "-fn", s,
            "-bs", "1", "-bp", "5000", "-r", "2", "-rp", "7000"
        ]
        print(f"ATTEMPT {attempt}/{len(delays)}:", " ".join(cmd), flush=True)
        rc = subprocess.run(cmd).returncode
        if rc == 0 and csv.exists() and csv.stat().st_size > 50:
            return csv
        if csv.exists():
            csv.unlink(missing_ok=True)
    if required:
        raise RuntimeError(f"download failed: {label} {tf} {side} {START_DATE} {END_DATE}")
    print(f"OPTIONAL DOWNLOAD FAILED: {label} {tf} {side} {START_DATE} {END_DATE}", flush=True)
    return None

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
    if dup or bad:
        raise RuntimeError(f"{label} {side}: duplicates={dup} invalid_ohlc={bad}")
    return {"instrument":label,"kind":"m1","side":side,"rows":len(df),
            "duplicates":dup,"invalid_ohlc":bad,"start_utc":str(ts.min()),"end_utc":str(ts.max())}

def quality_tick(label, df):
    req = {"timestamp","askPrice","bidPrice"}
    miss = req.difference(df.columns)
    if miss:
        raise RuntimeError(f"{label} tick: missing {miss}")
    ts = pd.to_datetime(df["timestamp"], unit="ms", utc=True)
    neg = int((df["askPrice"] < df["bidPrice"]).sum())
    if neg:
        raise RuntimeError(f"{label} tick: negative_spread={neg}")
    return {"instrument":label,"kind":"tick","side":"both","rows":len(df),
            "duplicates":int(df["timestamp"].duplicated().sum()),
            "negative_spread":neg,
            "start_utc":str(ts.min()),"end_utc":str(ts.max())}

created, quality, missing_optional = [], [], []
m1_frames = {}

for label, instrument, tf, side in CORE_TASKS:
    csv = run_download(label, instrument, tf, side, required=True)
    pq, df = verify_and_compact(csv)
    created.append(pq)
    quality.append(quality_m1(label, side, df))
    m1_frames[(label,side)] = df
    time.sleep(12)

for label, instrument, tf, side in OPTIONAL_TICK_TASKS:
    csv = run_download(label, instrument, tf, side, required=False)
    if csv is None:
        missing_optional.append({"instrument":label,"kind":tf,"side":side,"start":START_DATE,"end":END_DATE})
    else:
        pq, df = verify_and_compact(csv)
        created.append(pq)
        quality.append(quality_tick(label, df))
    time.sleep(20)

for label in ("EURUSD","DXY_DUKASCOPY"):
    b = m1_frames[(label,"bid")][["timestamp","open","close"]].rename(columns={"open":"bid_open","close":"bid_close"})
    a = m1_frames[(label,"ask")][["timestamp","open","close"]].rename(columns={"open":"ask_open","close":"ask_close"})
    j = b.merge(a, on="timestamp", how="outer", indicator=True)
    missing = int((j["_merge"]!="both").sum())
    negative = int(((j["ask_open"]-j["bid_open"]<0) | (j["ask_close"]-j["bid_close"]<0)).fillna(False).sum())
    if missing or negative:
        raise RuntimeError(f"{label} bid/ask crosscheck failed: missing={missing} negative={negative}")
    quality.append({
        "instrument":label,"kind":"m1_crosscheck","side":"bid_ask",
        "rows":len(j),"duplicates":0,
        "missing_bid_or_ask":missing,
        "negative_spread":negative
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

if missing_optional:
    (REPORTS / f"missing_optional_{START_DATE}_{END_DATE}.json").write_text(json.dumps(missing_optional, indent=2), encoding="utf-8")

manifest = {
    "source":"Dukascopy public historical data feed",
    "start_inclusive":START_DATE,"end_exclusive":END_DATE,
    "timezone":"UTC",
    "EURUSD":{"m1":["bid","ask"],"ticks":"downloaded when available; missing periods listed separately for recovery"},
    "DXY_DUKASCOPY":{"instrument":"dollaridxusd","m1":["bid","ask"],"ticks":"not requested in this pass after persistent HTTP 429"},
    "missing_optional":missing_optional,
    "files":[str(p.relative_to(ROOT)) for p in created]
}
(REPORTS / f"manifest_{START_DATE}_{END_DATE}.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(q.to_string(index=False))
print(json.dumps(manifest, indent=2))
