# Candlestick / candle-formation measurement model

Purpose: formalize the evidence from module 6 without inventing thresholds Benjamin has not stated.

## Anti-lookahead rule

Any candle-shape feature is available only after that candle closes.

```text
known_time(candle_features) = candle_close_time
```

For a 3-candle pattern, `known_time` is no earlier than the close of candle 3.

## Single-candle measurements — OUR METRICS

For candle `c`:

```text
range = high - low
body = abs(close - open)
body_ratio = body / range
upper_wick = high - max(open, close)
lower_wick = min(open, close) - low
upper_wick_ratio = upper_wick / range
lower_wick_ratio = lower_wick / range
close_location = (close - low) / range
range_atr = range / ATR_ref
```

No fixed threshold is accepted yet.

## Context fields

Every candle confirmation candidate must carry:

```text
symbol
timeframe
session
valid_session
poi_type
poi_timeframe
liquidity_type
liquidity_price
liquidity_swept
sweep_distance_atr
news_state
DXY_context_if_applicable
```

The same candle geometry outside the intended location/session must not be assumed equivalent.

## Rejection candidate

For bearish reactions, record whether the candle sweeps a relevant high and leaves a material upper wick. For bullish reactions mirror the logic at a relevant low.

```text
rejection_candidate = location_event + closed_candle_shape
```

But module 6 explicitly provides negative examples where a rejection wick is followed by range/no displacement. Therefore rejection is only the first part of the sequence.

## Follow-through / decision candle

For the candle(s) after rejection store:

```text
direction_correct
body_ratio
range_atr
close_location
engulf_fraction
net_move_atr
imbalance_created
imbalance_size_atr
```

`engulf_fraction` is an auxiliary measurement of how much of prior candle bodies/ranges the decision candle covers.

## Preferred three-candle / 1–3 formation

Represent candidate candles as `(c1,c2,c3)`.

Store:

```text
c2_sweeps_relevant_extreme
c2_rejection_wick_ratio
c3_direction_correct
c3_range_atr
c3_body_ratio
c3_close_minus_c1_close_atr
c3_close_minus_c1_body_edge_atr
c3_close_minus_c1_extreme_atr
c3_close_minus_c2_body_edge_atr
c3_close_minus_c2_extreme_atr
imbalance_created_by_c1_c2_c3
```

Signs should be normalized by trade direction so positive values mean a stronger close in the intended direction.

Do not choose one inequality as the official `pattern_1_3` definition until OHLC data from instructor-labelled positive and negative examples determines which reference Benjamin is visually using.

## Sequence quality measurements — OUR METRICS

```text
sequence_efficiency = abs(close3 - open1) / sum(abs(delta_close_i))
sequence_range_expansion = median(range(c2,c3)) / median(prior_ranges)
sequence_overlap = overlap(c1,c2,c3)
follow_through_k_atr
max_retrace_after_pattern_atr
```

These are research features, not course terminology.

## Entry ranking interaction

For every geometrically valid LTF imbalance after a POI interaction, store its relation to candle formation:

```text
formed_before_rejection_sequence
formed_during_rejection_sequence
formed_by_decision_candle
formed_after_pattern
pattern_quality_features
```

This allows testing the lesson-6 claim that the first imbalance is not necessarily the best one and that candle formation quality can improve selection.

## Execution variants

Keep at least:

```text
entry_mode = limit_at_imbalance
entry_mode = imbalance_midpoint
entry_mode = confirmation_candle
```

Do not merge their results; they have different entry price, stop size, fill probability and R:R.

## Stop / BE research fields

```text
initial_stop_reference
initial_stop_distance_atr
stop_reduced_after_impulse
stop_reduction_time
stop_reduction_reference
be_moved
be_time
favorable_impulse_before_be_atr
retracement_if_be_triggered
```

Module 6 supports qualitative risk reduction after a large favorable impulse but no fixed threshold.

## Validation plan

1. Label positive 1–3 patterns from modules 6 and later weekly trades.
2. Label explicitly rejected/poor candle formations.
3. Pull exact OHLC around each timestamp.
4. Compare candidate close-reference inequalities and wick/body features.
5. Freeze a candidate detector.
6. Test on held-out weekly-trade videos.
7. Track precision/recall and detection delay.

Until that process is complete, `pattern_1_3` remains a labelled concept plus feature vector, not a guessed numerical formula.