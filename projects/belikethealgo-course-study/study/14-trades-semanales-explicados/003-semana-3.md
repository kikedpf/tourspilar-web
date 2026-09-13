# 14 Trades Semanales Explicados — Semana 3

Status: **COMPLETE**

## Evidence reviewed

- Full video duration: ~27.0 min.
- 256 timestamped transcript segments.
- 27 periodic contact sheets and 257 detected chart-state changes.
- Visual review included the London/Frankfurt liquidity sequence, rejected early candle formation, later structure/imbalance entry examples and HTF orderblock context.

## Evidence-supported rules

### Bank holidays and major red-news days are first-class no-trade conditions

**Instructor-explicit.** At ~00:12–01:13 Benjamin says bank-holiday sessions tend to be range-bound/bad and specifically says he does not advise trading days dominated by NFP/FOMC because of the volatility.

This reinforces the existing news/calendar veto rather than adding a new setup rule.

### Asia-side liquidation alone is not enough

**Instructor-explicit.** Around 02:03–02:25 he describes the common Judas possibility after the top of Asia is liquidated, but immediately conditions the idea on receiving confirmation.

Operationally:

```text
Asia liquidity taken != automatic reversal entry
Asia liquidity taken + valid timing + confirmation = candidate
```

### Candle pattern without clear impulse is rejected

**Instructor-explicit negative example.** Around 04:47–05:07 Benjamin says the candle pattern is the type he likes but there is no clear impulse showing intent to move lower, therefore he would not enter there.

This is direct held-out support for the current confirmation hierarchy: candle formation alone is insufficient.

### Structure break is useful but embedded in a larger sequence

**Instructor-explicit + visual-confirmed.** Around 05:58–06:16 price mitigates the area and breaks structure; later examples combine prior liquidity, impulse/imbalance and structure rather than treating the break as an isolated trigger.

The week supports keeping `structure_change` as confluence/confirmation, not a standalone entry.

### Inducement / liquidity created during approach matters

**Instructor-explicit.** Around 07:26–07:46 Benjamin labels an intermediate high as inducement where stops can collect before continuation.

At ~23:30–24:03 he explicitly says the optimal approach into the zone is gradual and **generating liquidity along the way**; arriving in only one or two impulsive candles is less desirable.

This independently supports the module-10 approach-quality hypothesis.

### HTF orderblock confluence is additive

**Instructor-explicit.** Around 18:25–18:52 he combines PDH + Asia high liquidation + a structure break + an unmitigated orderblock formed in the impulse + breaker-block confluence.

The example does not contradict the established rule that orderblocks are optional confluence rather than the root cause of the trade.

## Unresolved / excluded from frozen rules

1. No numeric definition yet separates “clear impulse” from ordinary directional movement.
2. No quantitative minimum amount of approach-generated liquidity is supplied.
3. Holiday/news avoidance is qualitatively strong, but exact event-class/calendar taxonomy must be frozen later for backtesting.
4. Orderblock weighting versus liquidity/imbalance is contextual and not assigned a numeric score.