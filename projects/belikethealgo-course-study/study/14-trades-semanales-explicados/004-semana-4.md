# 14 Trades Semanales Explicados — Semana 4

Status: **COMPLETE**

## Evidence reviewed

- Full video duration: ~41.5 min.
- 355 timestamped transcript segments.
- 42 periodic contact sheets and 469 detected chart-state changes.
- Visual review included the early stopped setup, preferred London timing discussion, HTF imbalance context, liquidity-building examples and later BE management.

## Evidence-supported rules

### A valid stop can still come from a lower-quality setup

**Instructor-explicit.** Around 01:05–01:29 Benjamin reviews a trade that stopped out and calls it a valid stop, while also saying the candle formation was not the best.

This is important for calibration: a losing outcome does not retroactively make a setup invalid. Quality labels must be based on information available before outcome.

### Preferred London subwindow is probabilistic, not an absolute session boundary

**Instructor-explicit.** Around 01:39–02:18 Benjamin says his preferred London period is roughly 09:15–09:45 Spain / 03:15–03:45 New York and says this is where he personally sees his best win rate. He explicitly frames it as something to backtest.

Store as a candidate probability feature, not a hard universal veto until the weekly corpus measures it.

### HTF imbalance/location can outweigh a small LTF structure signal

**Instructor-explicit.** Around 07:38–07:54 he states that the daily imbalance/context matters more to him than the nearby structure detail in that example.

This supports a hierarchical model:

```text
HTF location / draw / liquidity context
> isolated LTF structure signal
```

It does not mean structure is generally irrelevant.

### Liquidity generation during approach is again preferred

**Instructor-explicit + visual-confirmed.** Around 14:28–15:00 he points out liquidity being generated below while price is strongly bearish and ties the move to prior Daily imbalance mitigation.

Later he warns that when price is stalling and creating liquidity against the position, the trader should protect or exit rather than passively ignore it.

### BE / stop management is adaptive to new structure and liquidity

**Instructor-explicit.** Multiple sections (~20:05 onward and ~30:20–32:20) show Benjamin moving to BE or tightening the stop after relevant price progress/structure events. He explicitly discusses moving protection when price forms new candles/structure and warns that newly generated opposing liquidity can justify protecting the position.

No single fixed-R BE trigger is established.

### 3R remains the repeated baseline objective

**Instructor-explicit.** Around 10:32–10:56 and later examples he again refers to the typical 1:3 objective. Some trades may be extended, but 3R is the stable Trading Plan benchmark.

## No-trade / downgrade evidence

- A setup can be technically valid but downgraded because candle formation is poor.
- Preferred subwindow matters probabilistically.
- Isolated LTF structure should not override stronger HTF location/context.
- If a trade stalls and builds adverse liquidity, passive holding is not automatically preferred.

## Unresolved / excluded from frozen rules

1. Preferred subwindow win-rate claim is not yet measured.
2. No objective numeric candle-quality threshold is given.
3. Exact adverse-liquidity condition that mandates BE/exit remains discretionary.
4. Exact hierarchy weights between Daily imbalance, liquidity, structure and candle formation remain unquantified.