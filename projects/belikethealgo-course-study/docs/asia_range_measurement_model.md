# Modelo cuantitativo candidato — Rango de Asia

Status: **candidate measurement model; thresholds unresolved**

This document formalizes only what modules 7.1–7.2 support. Numerical thresholds are not strategy rules until validated on held-out course examples.

## Session construction

Use timezone `America/New_York` with historical DST.

Conceptual Asia accumulation interval taught by Benjamin:

```text
19:00 <= local New York time < 00:00
```

The TradingView indicator is configured as `19:00 -> 00:01` only because Benjamin says `00:00` does not display correctly in that indicator. Backtest logic should not add an unexplained minute unless later evidence requires it.

For session date `d`:

```text
asia_high = max(high_t) over Asia interval
asia_low  = min(low_t) over Asia interval
asia_range = asia_high - asia_low
asia_range_atr = asia_range / ATR_ref       # OUR METRIC
```

Store:

- `asia_start_time`
- `asia_end_time`
- `asia_high`, `asia_low`
- `asia_range_pips`
- `asia_range_atr` (**OUR METRIC**)
- number of candles/timeframe used to construct the box
- whether high/low has been taken
- first-take timestamp for each side

## Boundary event candidates

Do not finalize wick/close logic yet. For every side, calculate multiple candidate definitions so the weekly corpus can tell us which best reproduces Benjamin's labels.

For Asia high `AH`:

```text
wick_breach_high = high_t > AH
close_breach_high = close_t > AH
penetration_high_atr = max(0, high_t - AH) / ATR_ref
close_penetration_high_atr = max(0, close_t - AH) / ATR_ref
```

For Asia low `AL`:

```text
wick_breach_low = low_t < AL
close_breach_low = close_t < AL
penetration_low_atr = max(0, AL - low_t) / ATR_ref
close_penetration_low_atr = max(0, AL - close_t) / ATR_ref
```

Keep `event_time` and `known_time` separately.

## Session-relative timing

For each boundary event record:

- `minutes_to_london_open`
- `minutes_from_london_open`
- `in_frankfurt_pre_london`
- `in_valid_london_window`
- `in_valid_newyork_window`
- `news_proximity_minutes`

Never classify a move as valid simply because the shape resembles Judas/Retest; module 7 repeatedly distinguishes correct geometry from correct timing.

## Judas candidate

### Bullish Judas candidate

Observed ordering:

```text
Asia completed
-> Asia low taken/breached
-> reaction upward in valid session
```

Store:

- `taken_side = low`
- `penetration_atr`
- `time_outside_range`
- `return_inside_range_time`
- `return_inside_range_candles`
- `reaction_displacement_atr`
- `reaction_efficiency` (**OUR METRIC**)
- `imbalance_created`
- `ltf_structure_change`
- `poi_confluence`
- `opposite_boundary_reached`
- `max_favorable_move_R/ATR`

Bearish logic mirrors the high side.

No requirement such as `must reach opposite Asia boundary` is imposed yet because the lesson contains a Judas that fails to do so.

## Asian Break Retest candidate

### Bullish

```text
Asia completed
-> price establishes break above Asia high
-> later return toward / into Asia-high boundary area
-> bullish continuation/reaction
```

Record:

- break event/time
- break by wick vs close
- break penetration ATR
- whether break occurred before London open
- minutes between break and retest
- retest penetration relative to AH
- whether retest enters full Asia box
- local liquidity taken during retest
- POI/orderblock/imbalance confluence
- reaction displacement and efficiency
- continuation distance after retest

Bearish version mirrors Asia low.

### Conditional prior from course

Benjamin repeatedly says an Asia break occurring before London open makes an Asian Break Retest at London a scenario to watch. Encode this only as a feature:

```text
pre_london_break = true/false
```

Do **not** encode:

```text
pre_london_break => guaranteed retest
```

because his own examples contain exceptions.

## Classification labels for course corpus

Every day/example can receive one of:

```text
JUDAS_BULL
JUDAS_BEAR
BREAK_RETEST_BULL
BREAK_RETEST_BEAR
NO_CLEAN_SCENARIO
ABNORMAL_NEWS
AMBIGUOUS
```

Labels come first from instructor-explicit examples. Candidate detector predictions are compared against those labels later.

## Negative evidence fields

Record explicit failure modes:

- `early_move_no_london_entry`
- `break_no_retest`
- `judas_no_opposite_boundary_completion`
- `news_distorted`
- `wrong_time`
- `reaction_too_weak`
- `no_valid_ltf_entry`

This prevents survivorship bias from learning only textbook diagrams.

## Statistical claims to test later

Do not accept the instructor's verbal phrases such as “la mayoría de días”, “casi todos los días”, “siempre” or “mayor probabilidad” as measured frequencies.

When the weekly corpus is labelled, calculate:

- fraction of days with any clean Asia scenario;
- Judas vs Break-Retest frequency;
- conditional probability of retest given pre-London break;
- reaction/target completion rates;
- behavior by session, weekday, volatility and news;
- precision/recall of the eventual real-time detector.

## Anti-lookahead

Asia high/low become fixed only when the defined Asia accumulation interval has completed. No detector may use the final Asia extrema before that time.

Scenario classification must unfold chronologically. A Judas cannot be identified merely because price later reversed; the boundary event and subsequent confirmation must occur before the trade decision is considered known.
