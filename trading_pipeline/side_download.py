import os, subprocess, time, hashlib, json
from pathlib import Path
import pandas as pd
import numpy as np

window = os.environ["WINDOW"]
TARGET = os.environ.get("TARGET", "EURUSD").upper()
SIDE = os.environ.get("SIDE", "bid").lower()
START_DATE, END_DATE = window.split("__", 1)

if SIDE not in {"bid", "ask"}:
    raise ValueError(f"Unknown SIDE={SIDE}")

TARGETS = {
    "EURUSD": ("EURUSD", "eurusd"),
    "DXY": ("DXY_DUKASCOPY", "dollaridxusd"),
}
if TARGET not in TARGETS:
    raise ValueError(f"Unknown TARGET={TARGET}")
LABEL, INSTRUMENT = TARGETS[TARGET]

ROOT = Path("output")
RAW = ROOT / "raw"
REPORTS = ROOT / "reports"
RAW.mkdir(parents=True, exist_ok=True)
REPORTS.mkdir(parents=True, exist_ok=True)

stem = f"{LABEL}_m1_{SIDE}_{START_DATE}_{END_DATE}"
csv = RAW / f"{stem}.csv"
pq = RAW / f"{stem}.parquet"

# Separate runners mean ASK is no longer the second request after BID.
# Back off only after an actual failure instead of sleeping minutes before every block.
delays = [0, 60, 300] if TARGET == "EURUSD" else [0, 120, 480]
last_rc = None
for attempt, delay in enumerate(delays, 1):
    if delay:
        print(f"Backoff after failed attempt: {delay}s", flush=True)
        time.sleep(delay)
    csv.unlink(missing_ok=True)
    cmd = [
        "dukascopy-node", "-i", INSTRUMENT,
        "-from", START_DATE, "-to", END_DATE,
        "-t", "m1", "-p", SIDE,
        "-f", "csv", "-dir", str(RAW), "-fn", stem,
        "-bs", "1", "-bp", "10000", "-r", "1", "-rp", "15000"
    ]
    print(f"ATTEMPT {attempt}/{len(delays)}:", " ".join(cmd), flush=True)
    last_rc = subprocess.run(cmd).returncode
    if last_rc == 0 and csv.exists() and csv.stat().st_size > 50:
        break
else:
    raise RuntimeError(f"download failed: {LABEL} m1 {SIDE} {START_DATE} {END_DATE}; rc={last_rc}")

df = pd.read_csv(csv)
if df.empty:
    raise RuntimeError(f"empty csv: {csv}")
required = {"timestamp", "open", "high", "low", "close"}
missing_cols = required.difference(df.columns)
if missing_cols:
    raise RuntimeError(f"missing columns {missing_cols}: {csv}")

duplicates = int(df["timestamp"].duplicated().sum())
invalid_ohlc = int(((df["high"] < df[["open", "close"]].max(axis=1)) |
                    (df["low"] > df[["open", "close"]].min(axis=1)) |
                    (df["high"] < df["low"])).sum())
if duplicates or invalid_ohlc:
    raise RuntimeError(f"quality failure {LABEL} {SIDE}: duplicates={duplicates} invalid_ohlc={invalid_ohlc}")

ts = pd.to_datetime(df["timestamp"], unit="ms", utc=True)
gaps = ts.sort_values().diff().dropna()

# Compact immediately, then read back and compare before removing CSV.
df.to_parquet(pq, index=False, compression="zstd")
vr = pd.read_parquet(pq)
if list(df.columns) != list(vr.columns) or len(df) != len(vr):
    raise RuntimeError(f"parquet structural mismatch: {pq}")
for c in df.columns:
    if pd.api.types.is_numeric_dtype(df[c]):
        if not np.array_equal(df[c].to_numpy(), vr[c].to_numpy(), equal_nan=True):
            raise RuntimeError(f"parquet numeric mismatch: {pq}::{c}")
csv.unlink()

h = hashlib.sha256()
with open(pq, "rb") as f:
    for chunk in iter(lambda: f.read(8 * 1024 * 1024), b""):
        h.update(chunk)
sha = h.hexdigest()

quality = {
    "instrument": LABEL,
    "source_instrument": INSTRUMENT,
    "kind": "m1",
    "side": SIDE,
    "rows": len(df),
    "duplicates": duplicates,
    "invalid_ohlc": invalid_ohlc,
    "gaps_over_1m": int((gaps > pd.Timedelta(minutes=1)).sum()),
    "largest_gap": str(gaps.max()) if len(gaps) else "0 days 00:00:00",
    "start_utc": str(ts.min()),
    "end_utc": str(ts.max()),
}
pd.DataFrame([quality]).to_csv(REPORTS / f"quality_{stem}.csv", index=False)
pd.DataFrame([{
    "file": str(pq.relative_to(ROOT)),
    "bytes": pq.stat().st_size,
    "sha256": sha,
}]).to_csv(REPORTS / f"checksums_{stem}.csv", index=False)

manifest = {
    "source": "Dukascopy public historical data feed",
    "target": TARGET,
    "instrument": INSTRUMENT,
    "side": SIDE,
    "timeframe": "m1",
    "start_inclusive": START_DATE,
    "end_exclusive": END_DATE,
    "timezone": "UTC",
    "compression": "parquet-zstd",
    "sha256": sha,
    "validation": "single-side structural, numeric roundtrip, duplicates and OHLC",
    "cross_bid_ask_validation": "deferred until matching BID and ASK sides are both verified",
    "file": str(pq.relative_to(ROOT)),
}
(REPORTS / f"manifest_{stem}.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

print(pd.DataFrame([quality]).to_string(index=False))
print(json.dumps(manifest, indent=2))
