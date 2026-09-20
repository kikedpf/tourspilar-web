# Detector v0.1 — calibration report

Status: **LOGICAL DETECTOR BUILT; NUMERIC OHLC THRESHOLD CALIBRATION STILL OPEN**

## Corpus used

- Modules 2–12.
- Independent labeled examples extracted from Weeks 1–20.
- Week 2 and Week 17 excluded as duplicate sources.
- Week 6 excluded as source gap.
- **112 independent calibration rows**:
  - 50 Benjamin-valid/recognized setups;
  - 62 Benjamin-invalid/no-trade examples.

These rows include positive trades, losing valid trades, missed-valid setups, rejected candidates and explicit no-trade sessions.

## Logical calibration result

Applying Detector v0.1 to the 112 construction rows:

| Metric | Count |
|---|---:|
| TP — valid & detector PASS | 50 |
| TN — invalid/no-trade & detector FAIL | 62 |
| FP | 0 |
| FN | 0 |
| UNRESOLVED logical rows | 0 |

**Calibration agreement = 100%.**

This is **not** forward accuracy and says nothing about profitability. The same Weeks 1–20 were used to discover the rules and encode these calibration rows. Its purpose is to prove the state machine is internally consistent with the evidence already studied.

## Negative-example coverage by hard reason

| Reason code | Instructor-negative examples |
|---|---:|
| `LIQ_REQUIRED_NOT_TAKEN` | 14 |
| `ENTRY_TIME_INVALID` | 14 |
| `CONFIRMATION_INSUFFICIENT` | 9 |
| `CTX_SESSION_BLOCKED` | 7 |
| `CTX_NEWS_BLOCKED` | 7 |
| `IMPULSE_MISSING` | 5 |
| `LIQ_REQUIRED_MISSING` | 5 |
| `CTX_HOLIDAY_BLOCKED` | 3 |
| `ORDERBLOCK_NO_INDUCEMENT` | 3 |
| `CTX_REQUIRED_HTF_LOCATION_MISSING` | 2 |
| `IMPULSE_NO_IMBALANCE` | 1 |
| `IMBALANCE_MISSING` | 1 |
| `CTX_TARGET_ROOM_INSUFFICIENT` | 1 |
| `ENTRY_NO_RETRACE` | 1 |
| `ENTRY_TRIGGER_MISSING` | 1 |

## What is already executable

Detector v0.1 now has explicit logic for:

- context/session/holiday/news eligibility;
- context liquidity versus activation liquidity;
- required-liquidity-taken gate;
- sweep not being sufficient by itself;
- impulse and displacement as separate objects;
- impulse + imbalance route;
- body-close structure confirmation versus wick-only violation;
- imbalance geometry and POI eligibility;
- orderblock inducement requirement;
- confirmation combinations;
- retracement/entry-zone/trigger checks;
- no-chase rule;
- target-room gate;
- anti-lookahead `known_time <= decision_time`;
- L2 execution separation;
- L3 management/outcome isolation.

The raw OHLC measurement layer calculates ATR, candle geometry, FVGs, sweeps, body/wick BOS measurements, leg efficiency, overlap, directional fraction, range expansion, equal-level dispersion and target R.

## What is deliberately NOT invented yet

The following thresholds remain null until exact instructor-labeled OHLC values are reconstructed:

- `min_context_liquidity_prominence_atr`
- `equal_level_tolerance_atr`
- `min_sweep_penetration_atr`
- `max_sweep_penetration_atr`
- `min_impulse_net_move_atr`
- `min_impulse_body_ratio`
- `min_impulse_directional_fraction`
- `max_impulse_overlap_ratio`
- `max_bars_liquidity_to_impulse`
- `min_structure_close_penetration_atr`
- `min_structure_break_body_ratio`
- `min_fvg_gap_atr`
- `max_entry_lateness_minutes`
- `min_target_room_R`
- `stall_exit_minutes`

The weekly records from the later part of the calibration corpus explicitly state that exact historical market date/DST and raw OHLC are not yet established. Therefore we cannot truthfully claim, for example, “valid impulse >= 0.82 ATR” yet.

## Numeric calibration rule

For each Week 1–20 example:

```text
VIDEO / BENJAMIN LABEL
        +
exact chart date/time
        +
EUR/USD & DXY OHLC
        ↓
measured feature vector
        ↓
positive vs negative distributions
        ↓
simplest threshold reproducing Benjamin
        ↓
freeze threshold
```

P&L is forbidden from selecting these thresholds.

## Gate before Week 21

Do **not** resume forward weekly study until:

1. the detector code/spec/data/tests/backups are stable;
2. Weeks 1–20 machine-readable rows are preserved;
3. date/OHLC reconstruction is completed as far as source evidence allows;
4. each still-null threshold is either numerically calibrated or explicitly declared discretionary/unresolvable;
5. Detector v0.1 parameters are frozen for first forward application to Week 21.

Week 21 is reserved as the first forward chronological validation material and must not be used to secretly finish the initial detector.
