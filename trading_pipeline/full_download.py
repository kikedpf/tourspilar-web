import os, subprocess, time, hashlib, json
from pathlib import Path
import pandas as pd
import numpy as np

window = os.environ["WINDOW"]
TARGET = os.environ.get("TARGET", "EURUSD").upper()
START_DATE, END_DATE = window.split("__", 1)
ROOT = Path("output")
RAW = ROOT / "raw"
REPORTS = ROOT / "reports"
RAW.mkdir(parents=True, exist_ok=True)
REPORTS.mkdir(parents=True, exist_ok=True)

TARGETS = {
    "EURUSD": ("EURUSD", "eurusd"),
    "DXY": ("DXY_DUKASCOPY", "dollaridxusd"),
}
if TARGET not in TARGETS:
    raise ValueError(f"Unknown TARGET={TARGET}")
LABEL, INSTRUMENT = TARGETS[TARGET]
CORE_TASKS = [(LABEL, INSTRUMENT, "m1", "bid"), (LABEL, INSTRUMENT, "m1", "ask")]

def stem(label, tf, side):
    return f"{label}_{tf}_{side}_{START_DATE}_{END_DATE}"

def run_download(label, instrument, tf, side):
    s = stem(label, tf, side)
    csv = RAW / f"{s}.csv"
    # DXY has shown much stricter Dukascopy rate limiting than EURUSD.
    delays = [0, 120, 360] if TARGET == "EURUSD" else [0, 300, 900]
    for attempt, delay in enumerate(delays, 1):
        if delay:
            print(f"Rate-limit cooldown: {delay}s", flush=True)
            time.sleep(delay)
        cmd = [
            "dukascopy-node", "-i", instrument, "-from", START_DATE, "-to", END_DATE,
            "-t", tf, "-p", side, "-f", "csv", "-dir", str(RAW), "-fn", s,
            "-bs", "1", "-bp", "10000", "-r", "1", "-rp", "15000"
        ]
        print(f"ATTEMPT {attempt}/{len(delays)}:", " ".join(cmd), flush=True)
        rc = subprocess.run(cmd).returncode
        if rc == 0 and csv.exists() and csv.stat().st_size > 50:
            return csv
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
    if dup or bad:
        raise RuntimeError(f"{label} {side}: duplicates={dup} invalid_ohlc={bad}")
    gaps = ts.sort_values().diff().dropna()
    return {"instrument":label,"kind":"m1","side":side,"rows":len(df),
            "duplicates":dup,"invalid_ohlc":bad,
            "gaps_over_1m":int((gaps > pd.Timedelta(minutes=1)).sum()),
            "largest_gap":str(gaps.max()) if len(gaps) else "0 days 00:00:00",
            "start_utc":str(ts.min()),"end_utc":str(ts.max())}

created, quality, m1_frames = [], [], {}
for idx, (label, instrument, tf, side) in enumerate(CORE_TASKS):
    csv = run_download(label, instrument, tf, side)
    pq, df = verify_and_compact(csv)
    created.append(pq)
    quality.append(quality_m1(label, side, df))
    m1_frames[side] = df
    if idx == 0:
        cooldown = 90 if TARGET == "EURUSD" else 180
        print(f"Bid/ask cooldown: {cooldown}s", flush=True)
        time.sleep(cooldown)

b = m1_frames["bid"][["timestamp","open","close"]].rename(columns={"open":"bid_open","close":"bid_close"})
a = m1_frames["ask"][["timestamp","open","close"]].rename(columns={"open":"ask_open","close":"ask_close"})
j = b.merge(a, on="timestamp", how="outer", indicator=True)
missing = int((j["_merge"]!="both").sum())
negative = int(((j["ask_open"]-j["bid_open"]<0) | (j["ask_close"]-j["bid_close"]<0)).fillna(False).sum())
if missing or negative:
    raise RuntimeError(f"{LABEL} bid/ask crosscheck failed: missing={missing} negative={negative}")
quality.append({"instrument":LABEL,"kind":"m1_crosscheck","side":"bid_ask",
                "rows":len(j),"duplicates":0,"missing_bid_or_ask":missing,"negative_spread":negative})

q = pd.DataFrame(quality)
q.to_csv(REPORTS / f"quality_{LABEL}_{START_DATE}_{END_DATE}.csv", index=False)
rows=[]
for p in sorted(created):
    h=hashlib.sha256()
    with open(p,"rb") as f:
        for chunk in iter(lambda:f.read(8*1024*1024), b""):
            h.update(chunk)
    rows.append({"file":str(p.relative_to(ROOT)),"bytes":p.stat().st_size,"sha256":h.hexdigest()})
pd.DataFrame(rows).to_csv(REPORTS / f"checksums_{LABEL}_{START_DATE}_{END_DATE}.csv", index=False)
manifest = {
    "source":"Dukascopy public historical data feed",
    "target":TARGET,"instrument":INSTRUMENT,
    "start_inclusive":START_DATE,"end_exclusive":END_DATE,"timezone":"UTC",
    "m1":["bid","ask"],"ticks":"separate recovery pipeline",
    "files":[str(p.relative_to(ROOT)) for p in created]
}
(REPORTS / f"manifest_{LABEL}_{START_DATE}_{END_DATE}.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(q.to_string(index=False))
print(json.dumps(manifest, indent=2))
