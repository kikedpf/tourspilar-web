# Detector build status — v0.1

Status: **BUILD PRIORITY ACTIVE — weekly study paused after Week 20**

## Built

- `docs/detector_v0_1_spec.md` — ordered strategy/state-machine specification.
- `detector/detector_v0_1.py` — PASS/FAIL/UNRESOLVED detector by context/liquidity/activation/entry layer.
- `detector/market_measurements_v0_1.py` — raw OHLC measurement layer:
  - Wilder ATR;
  - candle body/wicks/close location;
  - exact 3-candle FVG geometry;
  - liquidity sweep/return-inside measurements;
  - body-vs-wick structure break measurements;
  - impulse/displacement leg measurements;
  - overlap/efficiency/directional fraction/body dominance/range expansion;
  - equal-level dispersion;
  - anti-lookahead confirmed pivots;
  - target room in R.
- `detector/parameters_v0_1.json` — versioned hard/provisional/unresolved parameter registry.
- `detector/calibration_rows_v0_1.jsonl` — 112 independent Weeks 1–20 construction examples:
  - 50 Benjamin-valid/recognized;
  - 62 Benjamin-invalid/no-trade.
- `detector/calibrate_detector_v0_1.py` — reproducible calibration runner.
- `detector/CALIBRATION_REPORT_v0_1.md` + JSON report.
- `detector/CALIBRATION_LOG.md` — append-only future mismatch log.
- synthetic detector tests + raw-measurement tests.

## Logical calibration

Current construction-corpus result:

```text
TP = 50
TN = 62
FP = 0
FN = 0
UNRESOLVED logical rows = 0
```

This proves internal consistency only. It is not forward accuracy or edge.

## Current hard detector logic

```text
CONTEXT
  session
  holiday
  news
  HTF location when required
  relevant context liquidity
  target room
    ↓
REQUIRED LIQUIDITY TAKEN
    ↓
IMPULSE + IMBALANCE
    ↓
CONFIRMATION
  body structure break and/or candle formation
    ↓
ENTRY ZONE + RETRACE + TRIGGER
  valid time
  no chase
    ↓
ENTRY ACTIVATED
```

Additional rules:
- wick-only break does not count as structure confirmation;
- orderblock without inducement is non-actionable in the conservative baseline;
- context liquidity and activation liquidity are separate roles;
- L2 execution never redefines L1 setup validity;
- L3 outcome is forbidden from original entry detection.

## Remaining detector-build work before Week 21 may be studied

The logical detector exists. The unresolved work is **numeric calibration**, not strategy architecture.

Need historical chart date/time + OHLC alignment for instructor-labeled Weeks 1–20 examples to measure/freeze:

- liquidity prominence/tolerance;
- sweep penetration;
- impulse ATR/body/overlap/directional thresholds;
- maximum bars liquidity -> impulse;
- BOS close penetration/body quality;
- minimum FVG size if any;
- entry lateness;
- minimum target room;
- stagnation-management timing.

Several Week 13–20 study records explicitly state that historical dates/raw OHLC are unresolved, so these values must not be invented.

## Gate

**Do not study Week 21+ until:**
1. source chart dates/times are reconstructed as far as possible;
2. numeric features are calculated from OHLC for Weeks 1–20;
3. candidate thresholds are fitted to Benjamin labels only;
4. genuinely unresolvable concepts are explicitly declared discretionary;
5. v0.1 parameters are frozen and backed up.

Only then is Week 21 used as the first forward chronological validation material.
