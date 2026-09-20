# Detector calibration log

Purpose: chronological, append-only record of how each new course video supports or changes the detector.

## Rules

For every newly studied weekly video:

1. Run the current detector version against every reconstructed candidate/no-trade **before changing the detector**.
2. Compare detector decision with Benjamin's decision/label.
3. Record each sample as:
   - TP replication: detector PASS, Benjamin accepts/takes/recognizes valid setup;
   - TN replication: detector FAIL, Benjamin rejects/no-trade;
   - FP replication: detector PASS, Benjamin rejects;
   - FN replication: detector FAIL, Benjamin accepts;
   - UNRESOLVED: detector lacks a frozen measurement/threshold or evidence is insufficient.
4. Investigate FP/FN as:
   - missing context rule;
   - liquidity classification error;
   - wrong event ordering;
   - impulse threshold/definition issue;
   - structure/BOS issue;
   - imbalance/POI issue;
   - timing/news issue;
   - execution-only difference;
   - instructor discretion/inconsistency;
   - visual/transcription/data ambiguity.
5. Do not change a rule because of P&L.
6. Any behavioral change creates a new detector version.
7. Previous predictions and labels remain immutable.

## Entry template

```text
Week:
Detector version used BEFORE review:
Samples evaluated:

Replication confusion:
TP =
TN =
FP =
FN =
UNRESOLVED =

Mismatch details:
- sample_id:
- detector_prediction:
- Benjamin_label:
- reason:
- evidence timestamp:
- proposed change:

Effect on rules:
SUPPORT / NARROW / BROADEN / CONTRADICT / NONE

Threshold evidence added:
- feature:
- positive/negative label:
- measured value:
- source:

New detector version:
Changelog entry:
```

## Initial baseline

### v0.1.0
- Evidence cutoff used to design detector: Week 20.
- No chronological replication score is claimed yet because Weeks 1–20 helped construct the detector.
- First genuine forward calibration starts with Week 21.
- Numeric thresholds still unresolved are stored in `parameters_v0_1.json`.
