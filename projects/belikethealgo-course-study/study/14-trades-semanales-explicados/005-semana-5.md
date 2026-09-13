# 14 Trades Semanales Explicados — Semana 5

Status: **COMPLETE**

## Evidence reviewed

- Full video duration: ~70.3 min.
- 616 timestamped transcript segments.
- 71 periodic contact sheets and 857 detected chart-state changes.
- Visual review included Asia-range examples, LTF imbalance/structure entries, HTF imbalance reactions, stop-management examples and late-session no-trade discussion.

## Evidence-supported rules

### Do not operate unresolved inside the Asia range

**Instructor-explicit.** Around 06:45–07:05 Benjamin says he prefers to operate only after the Asia high or low has been liquidated and explicitly says he does not want to trade in the middle of Asia.

This is held-out confirmation of Module 7.

### Risk/reward is evaluated together with entry quality

**Instructor-explicit.** Around 13:10–13:33 Benjamin again frames the setup around a 1:3 objective and emphasizes disciplined execution rather than chasing after the move.

The video contains several alternative entry locations; therefore 3R remains a target framework, not proof that every valid entry mechanically reaches 3R.

### Stop management is an active part of the strategy

**Instructor-explicit.** Around 26:12–28:33 Benjamin says stop management is key, demonstrates moving protection after price progression and says the stop does not always need to remain at the original extreme. Around 29:06–29:20 he describes being in profit with the stop at breakeven and no longer caring about the remaining outcome.

Later examples repeat moving the stop behind newly formed structure/impulse as price progresses.

Operational consequence:

```text
initial_stop = structural invalidation / setup protection
managed_stop = may tighten after objective new price information
fixed untouched stop until TP = NOT universal
```

Exact trigger remains uncalibrated.

### The structure reference used for confirmation is local/reaction-relevant

**Instructor-explicit.** Around 40:00–40:25 Benjamin explains that when he searches for structure confluence he uses nearby minima/maxima associated with the impulse/reaction rather than arbitrarily distant swings.

This helps narrow the structure detector: the reference swing should be causally/local-context relevant, not simply the largest visible swing.

### HTF imbalance reactions remain valid context

**Instructor-explicit + visual-confirmed.** Around 44:15–47:20 he walks through Daily three-candle imbalances and repeated reactions/mitigations. These are HTF context/POI evidence, not direct intraday entries without LTF confirmation.

### Confidence must not lower setup quality

**Instructor-explicit no-trade discipline.** Around 62:08–62:45 he warns against entering mediocre setups because of lack of confidence/fear and reiterates that a stop loss on a valid setup is acceptable.

This reinforces the requirement to preserve setup criteria regardless of recent outcome or emotion.

## Calibration observations from weeks 1–5

Across the first independent weekly examples, the recurring causal sequence is remarkably stable:

```text
HTF/session liquidity map
-> wait for relevant liquidity to be taken
-> inspect location + timing
-> require candle/impulse/imbalance evidence
-> structure used as nearby confirmation when available
-> enter on retracement/confirmation
-> protect with structural stop
-> manage stop dynamically as new structure/liquidity appears
-> target around 3R / meaningful liquidity
```

The corpus already contains losing/BE outcomes that Benjamin still regards as legitimate setups. Those must remain in the calibration dataset to avoid outcome-based label leakage.

## Unresolved / excluded from frozen rules

1. Exact numerical impulse threshold.
2. Exact local swing-selection algorithm for structure confirmation.
3. Exact event that permits each stop move / BE adjustment.
4. Exact conditions for choosing 1m vs 2m/3m/5m execution.
5. Quantitative difference in expectancy between preferred and non-preferred killzone subwindows.