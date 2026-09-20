# Detector changelog

## v0.1.0 — evidence through Week 20

Initial formal detector.

- Added ordered L0/L1 state machine.
- Added PASS/FAIL/UNRESOLVED layer outputs.
- Added hard session/holiday/news/context gates.
- Added context-liquidity vs activation-liquidity distinction.
- Added required-liquidity-taken gate.
- Added impulse + imbalance semantic gate.
- Added wick-only vs body-close structure handling.
- Added provisional confirmation-count rule.
- Added orderblock inducement gate.
- Added entry-zone/retrace/trigger/no-chase gates.
- Added look-ahead checks.
- Added unresolved numeric-threshold registry.
- Explicitly excludes L3 outcome from entry decision.

Future weekly videos must append evidence and create a new detector version when behavior changes; never silently mutate v0.1 labels.
