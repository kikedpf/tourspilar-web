# Weekly Trade/Event Schema v2 — BeLikeTheAlgo

Purpose: canonical field checklist for weekly-trade reviews and later machine-readable datasets.

This schema is deliberately broader than a final trading algorithm. Some fields are descriptive or post-entry diagnostics. Each field must obey the availability-layer rules in `measurement_architecture_v2.md`.

## A. Sample identity and independence

- `sample_id`
- `video_id`
- `week_number`
- `source_timestamp_start`
- `source_timestamp_end`
- `instrument`
- `market_date`
- `timezone_basis`
- `canonical_example_id`
- `duplicate_of`
- `independent_sample`
- `same_market_day_group`
- `same_week_group`
- `same_underlying_move_group`
- `evidence_quality ∈ {explicit, visual_confirmed, provisional, unresolved}`

## B. L0 — Context before setup

### Time / eligibility
- `decision_timezone`
- `session`
- `session_eligible`
- `preferred_subwindow`
- `holiday_eligible`
- `news_eligible`
- `minutes_to_next_relevant_news`
- `minutes_from_previous_relevant_news`

### HTF context
- `htf_direction`
- `htf_direction_basis`
- `htf_structure_state`
- `htf_poi_present`
- `htf_poi_type`
- `htf_poi_tf`
- `htf_poi_zone_low/high`
- `opposing_htf_liquidity_unresolved`

### Asia/session context
- `asia_range_known`
- `asia_high`
- `asia_low`
- `asia_side_taken_before_setup`
- `london_high/low_known`
- `ny_high/low_known`

### DXY synchronized context
- `dxy_available`
- `dxy_directional_context`
- `dxy_liquidity_event_present`
- `dxy_confirms_eurusd`
- `dxy_conflicts_eurusd`
- `dxy_known_time`

## C. Liquidity object references

For every setup link the relevant liquidity IDs from the liquidity table:

- `required_liquidity_id`
- `required_liquidity_tf`
- `required_liquidity_kind`
- `required_liquidity_external_internal`
- `required_liquidity_priority_rank`
- `required_liquidity_structural_relevance`
- `required_liquidity_taken`
- `required_liquidity_take_time`
- `required_liquidity_take_known_time`
- `required_liquidity_take_mode`
- `target_liquidity_id`
- `opposing_liquidity_id`
- `nearest_target_liquidity_distance_atr`
- `target_side_liquidity_count`
- `target_side_liquidity_consumed_before_entry`

## D. L1 — Activation sequence

### Liquidity event
- `liquidity_event_present`
- `liquidity_event_time`
- `liquidity_event_known_time`
- `sweep_penetration_atr`
- `sweep_return_inside`

### Reaction
- `reaction_present`
- `reaction_start_time`
- `reaction_known_time`
- `reaction_direction`
- `reaction_range_atr`

### Impulse — separate from displacement
- `impulse_confirmed`
- `impulse_label_source`
- `impulse_start_time`
- `impulse_end_time`
- `impulse_known_time`
- `impulse_candle_count`
- `impulse_net_move_atr`
- `impulse_max_candle_range_atr`
- `impulse_median_body_ratio`
- `impulse_directional_fraction`
- `impulse_created_imbalance`

### Displacement leg
- `displacement_start_time`
- `displacement_end_time`
- `displacement_net_move_atr`
- `displacement_efficiency`
- `displacement_inclination`
- `displacement_body_dominance`
- `displacement_overlap_ratio`
- `displacement_directional_consistency`
- `displacement_range_expansion`
- `displacement_duration_bars`

### Structure
- `structure_reference_id`
- `structure_reference_price`
- `structure_reference_known_time`
- `structure_change_confirmed`
- `structure_break_time`
- `structure_break_known_time`
- `structure_break_by_close`
- `structure_break_penetration_atr`
- `structure_break_body_ratio`
- `structure_break_created_imbalance`

### Candle formation
- `candle_formation_confirmed`
- `candle_pattern_label`
- `candle_pattern_start/end`
- `candle_pattern_known_time`
- `rejection_wick_fraction`
- `candle_body_ratio`
- `candle_close_location`
- `pattern_1_3_relation`

### Imbalance
- `entry_imbalance_id`
- `entry_imbalance_created`
- `entry_imbalance_known_time`
- `entry_imbalance_zone_low/high`
- `entry_imbalance_gap_atr`
- `entry_imbalance_clean_before_retrace`

## E. Ordered timing relationships

Store bars and seconds where data resolution allows:

- `dt_liquidity_to_reaction`
- `dt_liquidity_to_impulse`
- `dt_impulse_to_structure_break`
- `dt_impulse_to_imbalance_known`
- `dt_imbalance_to_retrace`
- `dt_liquidity_to_entry_decision`
- `dt_entry_decision_to_fill`

Also store `observed_sequence`, e.g.:

`liquidity > reaction > impulse > imbalance > structure > retrace > entry`

## F. Approach quality

- `approach_start_time`
- `approach_end_time`
- `approach_duration_bars`
- `approach_net_move_atr`
- `approach_efficiency`
- `approach_overlap_ratio`
- `approach_body_dominance`
- `approach_range_expansion`
- `approach_internal_pullback_count`
- `approach_new_liquidity_count`
- `approach_new_liquidity_prominence_sum`
- `approach_target_liquidity_consumed_count`
- `approach_opposing_liquidity_created_count`
- `instructor_approach_label`

## G. Setup decision before outcome

- `setup_family`
- `context_gate_passed`
- `confirmation_count`
- `impulse_plus_imbalance`
- `htf_veto`
- `entry_trigger_confirmed`
- `setup_validity`
- `setup_quality_pre_entry`
- `trade_taken`
- `no_trade_reason`
- `decision_time`
- `rulebook_version_at_decision`

## H. L2 — Order and fill

- `entry_mode`
- `order_time`
- `order_type`
- `requested_entry_price`
- `entry_zone_low/high`
- `split_order_count`
- `split_order_fractions`
- `filled`
- `fill_time`
- `fill_price_before_costs`
- `spread_model`
- `spread_value`
- `slippage_model`
- `slippage_value`
- `fill_price_after_costs`
- `cancel_time`
- `cancel_reason`
- `missed_trade`

## I. Initial risk plan

- `stop_price_initial`
- `stop_reference_type`
- `stop_distance_pips`
- `stop_distance_atr`
- `target_price_initial`
- `target_reference_type`
- `initial_RR`
- `risk_pct_planned`

## J. L3 — Path and management

These fields are outcome/management diagnostics and cannot be used to justify the original entry.

- `MFE_R`
- `MAE_R`
- `time_to_0_5R`
- `time_to_1R`
- `time_to_2R`
- `time_to_3R`
- `max_retrace_after_1R`
- `max_retrace_after_2R`
- `first_target_liquidity_hit_time`
- `new_opposing_liquidity_after_entry_time`
- `new_favorable_structure_time`
- `new_adverse_structure_time`
- `be_moved`
- `be_time`
- `be_trigger_type`
- `protected_stop_price`
- `partial_taken`
- `partial_time`
- `partial_fraction`
- `partial_price`
- `runner_exit_time`
- `runner_exit_price`
- `runner_realized_R`
- `final_exit_time`
- `final_exit_reason`
- `realized_R`

## K. Counterfactual execution research

Only after the factual/instructor path is recorded, optionally simulate separately:

- imbalance edge entry;
- imbalance midpoint entry;
- split edge/midpoint;
- directional-candle confirmation;
- different evidence-supported stop variants.

Counterfactual fields must carry a separate `execution_variant_id` and must never overwrite the observed instructor execution.

## L. Required completeness checks per example

An example is not COMPLETE unless:

1. source interval is known;
2. L0 context is recorded;
3. relevant liquidity objects are linked;
4. activation sequence is chronologically reconstructed;
5. impulse and displacement are not conflated;
6. structure reference is explicit or marked unresolved;
7. entry decision/no-trade reason is recorded before outcome;
8. order/fill assumptions are recorded if a trade occurs;
9. L3 outcome is isolated from L0/L1 decision fields;
10. independence/duplicate fields are populated;
11. every unresolved field is explicitly marked unresolved rather than guessed.