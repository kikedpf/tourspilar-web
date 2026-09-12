# Liquidity measurement model — BeLikeTheAlgo

Status: **candidate research specification after Module 9**. No numeric threshold below is final unless explicitly stated by Benjamin.

## 1. Liquidity candidate object

For each candidate level/pool store:

- `instrument`
- `tf_origin`
- `price_center`
- `zone_low`, `zone_high`
- `created_at`
- `known_at`
- `kind ∈ {swing_high, swing_low, repeated_highs, repeated_lows, trendline_highs, trendline_lows, PWH, PWL, PDH, PDL, Asia_high, Asia_low, session_extreme, other_course_supported}`
- `range_role ∈ {external, internal, unresolved}`
- `structural_extreme = true/false/unresolved`
- `session_origin`
- `touch_count`
- `swept = true/false`
- `sweep_time`
- `sweep_mode ∈ {wick, close, unresolved}`
- `priority_tf_rank`
- `distance_atr` — **OUR METRIC**
- `prominence_atr` — **OUR METRIC**
- `cluster_dispersion_atr` — **OUR METRIC**
- `age_bars`

## 2. Candidate geometry

Module 9 supports six symmetric visual families:

- isolated relevant high/low;
- repeated/consecutive highs or lows that have not swept one another;
- trendline/staircase highs or lows.

No equality tolerance is fixed yet. Candidate detectors should retain several possible tolerances for later calibration rather than choosing one after seeing P&L.

## 3. External vs internal state

External liquidity is the meaningful range/structure boundary or major prior/session extreme. Internal liquidity is formed inside the active range/impulse by intermediate highs/lows.

Because the status changes when a new impulse defines a new range, store:

- `range_id`
- `range_start_time`
- `range_end_candidate_time`
- `external_side ∈ {upper, lower}`
- `internal_sequence_index`

The exact algorithm that freezes a new `range_id` remains unresolved and must be learned from instructor-labeled examples.

## 4. Priority model

Instructor-explicit nominal timeframe hierarchy:

`Weekly > Daily > 4H > 1H > 15m`

But Module 9 proves that timeframe label alone is insufficient. Add a separate structural-relevance gate:

`actionable_priority = f(timeframe_rank, structural_extreme, unswept_state, valid_session, context)`

No weights are assigned yet.

A PWH/PWL/PDH/PDL in the middle of a larger range may be ignored by Benjamin, while the true range endpoint is treated as the meaningful manipulation level.

## 5. Liquidity taken event

For every candidate sweep record:

- `level_id`
- `event_time`
- `known_time`
- `max_penetration`
- `penetration_atr` — **OUR METRIC**
- wick-through vs close-through;
- immediate return inside zone;
- displacement in next N candles;
- structure break after sweep;
- imbalance created after sweep;
- reaction distance before retracement;
- time from sweep to first valid entry trigger.

The universal wick/close/tolerance definition is still unresolved. Do not hard-code one rule yet.

## 6. Sequence features

Module 9 strengthens these sequences as research labels:

### Reversal / manipulation candidate

`external_liquidity_taken -> rejection/reaction -> displacement -> LTF confirmation/imbalance -> retracement/entry`

### Continuation candidate

`internal_liquidity_taken -> displacement -> imbalance -> next_external_liquidity`

### Range-cycle candidate

`external_taken -> retrace_into_internal -> sufficient_internal_taken -> new_impulse -> next_external`

The word “sufficient” is instructor language but is not quantified; record the number, prominence and distance of internal levels taken before each new impulse.

## 7. Entry activation

A liquidity event alone does not activate a trade. Store a boolean chain:

- `liquidity_relevant`
- `liquidity_taken`
- `valid_session`
- `news_clear`
- `poi_present`
- `reaction_present`
- `structure_confirmation`
- `displacement_present`
- `entry_imbalance_present`
- `entry_trigger_confirmed`

Every instructor trade/no-trade example should show which condition failed or passed.

## 8. Target and management research

For each open trade measure distance to:

- nearest internal liquidity;
- nearest external liquidity;
- PDH/PDL;
- PWH/PWL;
- Asia/session extreme;
- 1H/4H structural extreme.

Record whether Benjamin takes partials before/at/after each event and whether price retraces after external liquidity is taken.

This will test his qualitative claim that external liquidity often precedes retracement and will quantify late-entry risk caused by internal liquidity left behind.

## 9. No-trade labels

First-class labels:

- `no_relevant_1h_or_higher_liquidity`
- `named_period_level_not_structurally_relevant`
- `liquidity_taken_outside_valid_session`
- `liquidity_taken_but_no_poi_or_reaction`
- `news_conflict`
- `lower_tf_noise_only`
- `target_liquidity_already_consumed`

## 10. Calibration plan

The 152 available weekly trade videos will be used to estimate:

- precision/recall of liquidity candidate detection;
- probability of reaction by timeframe rank;
- effect of structural-extreme alignment;
- external vs internal outcome distributions;
- wick vs close sweep behavior;
- tolerance for repeated/equal highs/lows;
- frequency of `external -> internal retrace -> continuation`;
- entry quality vs number/distance of internal liquidity pools left behind.

No threshold is promoted to the frozen backtest specification until tested on held-out course examples without lookahead.