# 06 Velas Japonesas — 01 Importancia de las velas japonesas

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript: ~32.8 min, 345 segments.
- 394 periodic frames across the full timeline.
- 247 chart-state-change frames plus adaptive-scene evidence.
- Concept diagrams and multiple real-chart examples on EUR/USD reviewed, including positive and negative candle formations.

## Core idea — instructor explicit

Benjamin does **not** treat a single candle as an isolated entry signal. The candle formation is useful after price reaches/takes a meaningful location:

```text
relevant liquidity / POI
-> rejection information
-> directional impulse / displacement
-> imbalance when produced
-> candidate execution
```

He repeatedly describes these candle shapes as **confluence / probability**, not certainty.

## Rejection candle / rejection block information

At the beginning of the lesson Benjamin illustrates the preferred sell-side reaction:

1. price takes a maximum or reaches a relevant orderblock/zone;
2. the reaction candle leaves a large wick on the rejection side;
3. the candle must be allowed to **close** before its information is accepted;
4. a following strong directional candle/impulse should demonstrate force;
5. an imbalance created by that displacement materially strengthens the setup.

The bullish version is symmetric around liquidation of a minimum.

### Closed-candle requirement — strong rule

Benjamin explicitly warns not to act with 10–20 seconds left in the candle because its final form may change completely. Therefore candle-shape features are not `known` until the candle used for confirmation has closed.

```text
candle_shape_known_time = candle_close_time
```

Using the unfinished final wick/body in a backtest would be look-ahead relative to his instruction.

## Wick alone is not enough

A real-chart negative example around ~941–982 s is important:

- price takes the marked high;
- a large rejecting wick appears;
- however the following price action does not produce the displacement/imbalance Benjamin wants;
- he rejects the formation and notes that price ranges instead.

This gives a concrete negative rule:

```text
liquidity sweep + attractive rejection wick
WITHOUT adequate follow-through / displacement
!= sufficient confirmation
```

## Preferred three-candle / “staircase” sequence

Around ~1249–1310 s Benjamin explicitly describes the formation he likes as a staircase / three-candle sequence:

- candle 1: pre-event candle / approach;
- candle 2: creates/takes the extreme (high for sells, low for buys), i.e. the liquidity event/rejection area;
- candle 3: directional impulse away from that extreme.

For sells he describes: first candle -> second candle creates/liquidates the high -> third candle produces the bearish displacement. The buy version is mirrored.

He calls this type of setup one of the formations they should continually look for, but also says real markets do not always print the exact same candle geometry.

## Doji / indecision can still be valid in context

In a real example around ~996–1066 s, the rejection candle is closer to a doji/indecision candle with wicks on both sides. Benjamin accepts it because:

- the rejection-side wick is meaningful;
- the relevant liquidity was taken;
- the next candle is a very large directional decision candle;
- the sequence creates an imbalance;
- Asia/session/timing context also aligns.

Therefore `doji == invalid` would be wrong. The candle must be evaluated in its contextual sequence.

## Imbalance selection after the candle formation

A clean candle formation can create several lower-timeframe imbalances. Benjamin does **not** provide a universal deterministic rule selecting which of several imbalances price will revisit. He discusses entries at the imbalance edge or midpoint to improve R:R, but acknowledges that deeper/shallower fills vary.

This remains an unresolved entry-selection problem and must be learned statistically from later examples rather than hard-coded now.

## Timeframes and information trade-off

Benjamin explicitly allows the setup on roughly 1m, 2m, 3m and 5m.

- 1m: earlier/tighter entries and potentially better R:R, but less information and greater false-entry risk.
- 2–5m: slower confirmation/wider stops, but cleaner information for students who read 1m poorly.

He explicitly says missing an operation because it is not clear on the chosen timeframe is acceptable.

## Session/context remains mandatory in the demonstrated workflow

The preferred formation is discussed inside the valid killzone/session framework. Benjamin says the buy setup should occur within the relevant trading hours and preferably inside his narrower timing windows. He also lists DXY/context and liquidity correctness among the filters he checks before entering.

Thus candle formation does not replace the previously learned gates.

## R:R statements in this lesson

Benjamin says a trader can be profitable with roughly 25–30% winners if consistently achieving around 1:3, and repeatedly discusses 1:3 / 1:4 targets. This is presented as risk-management arithmetic / his preferred framework, **not evidence that every trade structurally offers exactly 3R**.

Do not convert the stated win-rate numbers into a claimed historical expectancy until the weekly trade corpus is measured.

## Candidate measurable fields

For each candidate reaction sequence store:

```text
liquidity_event_type
poi_type
session_eligible
c1_ohlc
c2_ohlc
c3_ohlc
c2_sweeps_previous_extreme
rejection_wick_ratio
opposite_wick_ratio
body_ratio
close_location
c3_direction
c3_range_atr
c3_body_ratio
c3_engulf_body_fraction
c3_close_beyond_c1_or_c2_reference
imbalance_created
gap_size_atr
follow_through_atr
formation_timeframe
formation_known_time
```

Ratios/ATR fields are **OUR METRICS**, not terminology Benjamin specifies numerically.

## Confirmed vs unresolved

### Confirmed
- candle must close before its shape is trusted;
- liquidity/POI context comes before candle confirmation;
- rejection wick gives rejection information but wick alone is insufficient;
- displacement/force after the rejection is strongly preferred;
- creation of an imbalance adds important confirmation;
- preferred clean three-candle / staircase formation exists;
- 1–5m execution timeframes are acceptable, with a speed-vs-information trade-off;
- candle formation is probabilistic confluence, not certainty.

### Unresolved
- exact minimum wick/body ratios;
- exact numerical definition of the required impulse/displacement;
- exact geometric tolerance for the three-candle staircase;
- universal choice among multiple imbalances created by one displacement;
- whether every valid entry later in the course requires this exact three-candle pattern.

**Lesson status: COMPLETE.**