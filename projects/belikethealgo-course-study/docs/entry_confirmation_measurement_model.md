# Entry-confirmation measurement model — BeLikeTheAlgo

## Scope

This file converts Module 11 confirmation logic into measurable research variables. Benjamin's own terms remain primary. Any additional numerical feature is an auxiliary metric and is not presented as course terminology.

## Context gate

No lower-timeframe confirmation is eligible unless the candidate setup first has:

- `relevant_htf_location = true`;
- `liquidity_event_present = true`;
- `session_eligible = true`;
- higher-timeframe directional context recorded.

Store:

- `htf_context_tf`;
- `htf_direction`;
- `htf_poi_type`;
- `liquidity_type`;
- `liquidity_event_time`;
- `liquidity_known_time`;
- `opposing_htf_liquidity_unresolved`;
- `entry_tf` (course examples: roughly 1m–5m).

## Three instructor confirmations

### 1. Structure change

Store the already defined structure-break measurements plus:

- `structure_change_confirmed`;
- `structure_reference_price`;
- `structure_break_by_close`;
- `structure_break_body_ratio`;
- `structure_break_penetration_atr`;
- `bars_from_liquidity_event_to_structure_change`.

No new threshold is fixed here.

### 2. Impulse + imbalance

Module 11 makes this the normal mandatory core.

Store:

- `impulse_confirmed`;
- displacement metrics from `measurement_model.md`;
- `imbalance_created`;
- `imbalance_direction`;
- `imbalance_zone_low/high`;
- `imbalance_clean_at_first_retrace`;
- `bars_from_liquidity_event_to_impulse`;
- `bars_from_impulse_to_retrace`.

Candidate boolean:

```text
impulse_plus_imbalance = impulse_confirmed AND imbalance_created
```

The detector for `impulse_confirmed` remains under calibration from instructor-labeled examples.

### 3. Candle formation

Store:

- `candle_formation_confirmed`;
- pattern label if Benjamin explicitly labels one;
- rejection wick fraction;
- body/range ratio;
- close location within candle;
- relation to the previously studied 1–3 pattern;
- whether the candle occurs before or after imbalance creation.

No universal candle geometry is accepted yet.

## Normal confirmation count

Module 11 states:

```text
normal_core = impulse_plus_imbalance
normal_minimum = at least 2 of the 3 confirmations
preferred_second = structure_change
alternative_second = candle_formation
```

Store:

```text
confirmation_count =
    int(structure_change_confirmed)
  + int(impulse_plus_imbalance)
  + int(candle_formation_confirmed)
```

Candidate normal eligibility:

```text
normal_ltf_confirmation_eligible =
    context_gate
    AND impulse_plus_imbalance
    AND confirmation_count >= 2
```

This candidate mirrors the explicit lesson logic and must still be checked against held-out weekly examples.

## Optional directional entry candle

Benjamin allows either direct execution when price returns to the selected imbalance or waiting for an extra directional candle.

Store:

- `extra_directional_candle_used`;
- `extra_candle_direction_matches_trade`;
- `extra_candle_body_ratio`;
- `extra_candle_wick_ratio`;
- `entry_mode ∈ {imbalance_touch_market, directional_candle_confirmation, other}`;
- `entry_time`;
- `entry_price`.

The directional candle is an execution refinement, not added to the three-confirmation count.

## Higher-timeframe veto

Store:

- `htf_target_liquidity_price`;
- `htf_target_liquidity_tf`;
- `distance_to_htf_target_at_ltf_signal`;
- `proposed_trade_against_htf_draw`;
- `htf_veto`.

Candidate research rule:

```text
if proposed_trade_against_htf_draw
and higher-priority external liquidity remains unresolved:
    htf_veto = true
```

The exact operational definition of `htf_draw` / “price clearly seeking liquidity” remains unresolved.

## News-displacement exception

Module 11 permits a conditional exception when news creates such a large impulse that the ordinary structure-change reference becomes impractically distant.

Store:

- `high_impact_news_recent`;
- `news_impulse_range_atr`;
- `structure_reference_distance_atr`;
- `important_liquidity_taken`;
- `strong_htf_poi_present`;
- `htf_direction_aligned`;
- `candle_formation_confirmed`;
- `impulse_plus_imbalance`;
- `news_structure_waiver_used`.

Do not enable the waiver merely because news occurred. The strong-location condition must first be made objectively reproducible from course examples.

## No-trade labels

Record at least:

- `no_confirmation`;
- `wrong_session`;
- `no_relevant_liquidity_event`;
- `random_ltf_signal_without_htf_context`;
- `htf_veto_unresolved_external_liquidity`;
- `weak_confirmation_set`;
- `news_signal_in_mediocre_location`;
- `late_confirmation_outside_session`.

## Validation

Before promoting this decision tree into the frozen backtest specification:

1. reproduce Module 11 worked examples;
2. reproduce explicit no-trade examples;
3. test the confirmation-count logic on held-out weekly trades;
4. measure false positives from random 1m/5m confirmations;
5. validate the HTF veto separately;
6. validate the news exception separately;
7. keep `event_time` and `known_time` for every confirmation.
