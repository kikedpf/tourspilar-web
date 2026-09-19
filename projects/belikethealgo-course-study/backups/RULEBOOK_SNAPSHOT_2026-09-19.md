# BeLikeTheAlgo quantitative rulebook backup — 2026-09-19

Status: **recovery snapshot + formula registry**

Branch: `belikethealgo-course-study`
Recovery base commit before this backup series: `a3932d36db70511e30de2329b0ae495db3ae3e27`
Week 19 persisted-draft commit: `e8398819ec0feb99df0e14337f38487728e47f5c`

Purpose: preserve the current rule/measurement state independently of short-lived GitHub Actions artifacts. This file is a compact recovery layer; canonical detail remains in the study/measurement files at the immutable blob SHAs recorded below.

## Immutable source map

### Core protocol / schema
- `ANALYSIS_PROTOCOL.md` — `9e48fb3c4fea876fa3341c9c18907249ad983cc3`
- `STUDY_PROGRESS.md` — `d01e10845474b3aabe1b2363e824d8d22f504eb0`
- `docs/measurement_architecture_v2.md` — `f83f528e84deb82658add6f2cefd6992514baaaa`
- `docs/measurement_model.md` — `f40ee05659ed5f0048a24f989d15679631a1759e`
- `docs/weekly_trade_event_schema_v2.md` — recover from the same branch commit above.

### Component measurement models
- Asia — `3647f62b87f6f9bc1efca51cf1a9e7c48e43a68b`
- Candlesticks — `1d921ea21f619f15ef6a7f683d7f1c0c8dd3d30e`
- Entry confirmation — `63326ee3230bba5fb6789ff8c2d2bc4c1e850749`
- High-probability ranking — `4098a406d20c18b2afdc7117fc19417e45dd35e1`
- Liquidity — `0345b03ddef8d583823cceadabafc44f078d1bbe`
- London — `f5150511ab56b6585c5cded977c2dcb112e81c28`
- Orderblocks — `0300ce22fd70a3f665bfc86176327dee0e962d8c`
- Trading plan — `c2bbe45dc88373b07df67ac8b7bbd4f41532ad30`

### Weekly study records
- W01 `109ca329e56862796e41b9da66509869c521ef4f`
- W02 duplicate `d31643e4a14f99846154cd7d557bb49e86399d7c`
- W03 `5232a892fed413f1a0e6a6679e773d850f89a839`
- W04 `20eb8e3eccf7020b842a5c7e741b2d58a0acf331`
- W05 `fdf2befb12778492135499b5c2fed51b5725ca9f`
- W06 source gap `4b2ac5c2de16d76ff3a2d09cdc7a0138dc6bd39b`
- W07 `263dfafdd27b14bffa1e232acf47c44e686923aa`
- W08 `1327ba15408dd74e7edca7cc7cf72f863483de2f`
- W09 `b3522d690c7eb0d318181780f0a92ea3c796a64f`
- W10 `44603fb50fe9058ef9ea663d720d193854e46f5d`
- W11 `860add1e850cfd9ff7cec16b9b7af030ef2014ce`
- W12 `3b54b519e0c6fff4d339a1e76acc015dadf7cdcc`
- W13 `0c0f21bac5781ddaf0904fc06720133047801cb6`
- W14 `92318b8394621b82b1499a56a921de0b7c2af49c`
- W15 `65dcc93013d218b0cb0f0326bd076ee3fc2a1cfa`
- W16 `ea460c4ffe179a75dbedcb3194a34fc49e3bc943`
- W17 duplicate `0f4af2f4ea7949689c4bb54c349fcfadbbf898e3`
- W18 `e2e8c5f60d761e6d48deb5df3e4c170b2c7b8b7e`
- W19 current draft `d2b92ca2167c03049a63c0fc70a69ea988b66407`

## Non-negotiable architecture

```text
L0 = context known before setup
L1 = activation known before entry
L2 = execution/fill
L3 = post-entry path/outcome

ENTRY DECISION MAY USE ONLY L0 + L1.
```

```text
setup_validity
setup_quality_pre_entry
trade_taken
trade_result_R
```

must remain separate variables.

Canonical candidate state machine:

```text
CONTEXT_READY
-> LIQUIDITY_EVENT
-> REACTION
-> IMPULSE
-> IMBALANCE_CREATED
-> STRUCTURE/CANDLE_CONFIRMATION
-> RETRACEMENT_TO_ENTRY_AREA
-> ENTRY_ACTIVATED
-> ORDER
-> FILL
-> MANAGEMENT
-> EXIT
```

Not every family requires every optional state; the course decides.

## Formula registry

### Candle geometry

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

Known time for candle features:

```text
known_time(candle_features) = candle_close_time
```

No body/wick threshold frozen yet.

### Imbalance geometry

Bullish:

```text
high(c1) < low(c3)
zone = [high(c1), low(c3)]
```

Bearish:

```text
low(c1) > high(c3)
zone = [high(c3), low(c1)]
```

Touch/mitigation:

```text
touch(k) = (high_k >= zone_low) AND (low_k <= zone_high)
```

Auxiliary:

```text
gap_size = zone_high - zone_low
gap_size_atr = gap_size / ATR_ref
fill_fraction = penetration_into_zone / gap_size
```

### Asia range

Conceptual New York-local accumulation interval:

```text
19:00 <= NY_local_time < 00:00
asia_high = max(high_t)
asia_low  = min(low_t)
asia_range = asia_high - asia_low
asia_range_atr = asia_range / ATR_ref
```

High breach candidates:

```text
wick_breach_high = high_t > AH
close_breach_high = close_t > AH
penetration_high_atr = max(0, high_t - AH) / ATR_ref
close_penetration_high_atr = max(0, close_t - AH) / ATR_ref
```

Low side mirrors these formulas.

### Liquidity candidate measurements

```text
distance_atr = abs(P_current - P_liquidity) / ATR_ref
penetration_atr = sweep_distance / ATR_ref
```

For repeated/equal pools retain cluster dispersion and prominence; tolerances remain unresolved.

Candidate hierarchy is not a weighted formula yet:

```text
actionable_priority =
    f(timeframe_rank,
      structural_extreme,
      unswept_state,
      valid_session,
      context)
```

Nominal timeframe hierarchy observed:

```text
Weekly > Daily > 4H > 1H > 15m
```

but structural relevance can override a simple timeframe-only rank.

### Impulse

Store:

```text
impulse_candle_count
impulse_net_move_atr
impulse_max_candle_range_atr
impulse_median_body_ratio
impulse_directional_fraction
impulse_overlap_ratio
impulse_created_imbalance
bars_from_liquidity_event_to_impulse
structure_interaction_during_impulse
```

`impulse_confirmed` remains an instructor-label calibration target. No universal numeric cutoff is frozen.

### Displacement

```text
inclination = (Pn - P0) / (N * ATR_ref)

efficiency =
    abs(Pn - P0) /
    sum(abs(P_i - P_{i-1}))

body_dominance =
    sum(abs(close-open)) /
    sum(high-low)

directional_consistency =
    directional_candles / N

overlap_ratio =
    total_overlap_between_candles /
    total_leg_range

range_expansion =
    median(range_leg) /
    median(range_previous_N)

net_move_atr =
    abs(Pn - P0) / ATR_ref
```

Post-event continuation/retracement are L3 if future bars are required.

### Structure / BOS

Store both wick and close penetration:

```text
penetration_atr = extreme_penetration / ATR_ref
close_penetration_atr = close_penetration / ATR_ref
```

Week 19 strengthens:

```text
wick_only_violation =
    extreme_crosses_reference
    AND close_does_not_cross_reference

body_break_candidate =
    close_crosses_reference
```

A wick-only violation is not assumed equal to Benjamin's accepted structure change. Body/force/impulse/imbalance context remains part of calibration.

### Candle 1–3 research features

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

No single official inequality frozen yet.

### Entry confirmation

```text
impulse_plus_imbalance =
    impulse_confirmed
    AND imbalance_created

confirmation_count =
    int(structure_change_confirmed)
  + int(impulse_plus_imbalance)
  + int(candle_formation_confirmed)
```

Candidate Module-11 encoding:

```text
normal_ltf_confirmation_eligible =
    context_gate
    AND impulse_plus_imbalance
    AND confirmation_count >= 2
```

Module 12 presents the hierarchy slightly differently (candle formation + impulse creating imbalance as core; structure additive), so weekly replication decides final baseline.

### Orderblock / inducement

Conservative current baseline:

```text
actionable_orderblock_poi =
    orderblock_present
    AND inducement_exists_before_retest
```

Week 19 independently reinforces:

```text
if orderblock_present and not inducement_exists_before_retest:
    orderblock_role = liquidity_candidate_or_nonactionable_poi
```

Classic candidate:

```text
bearish:
candidate_close > candidate_open
AND strong_bearish_displacement_follows

bullish:
candidate_close < candidate_open
AND strong_bullish_displacement_follows
```

Rejection-block directional candidates:

```text
bearish: current_high > previous_high AND strong_bearish_displacement_follows
bullish: current_low < previous_low AND strong_bullish_displacement_follows
```

The strong-displacement threshold remains unresolved.

### Approach quality

```text
approach_efficiency =
    abs(Pn - P0) /
    sum(abs(P_i - P_{i-1}))
```

Retain:
- overlap;
- body dominance;
- range expansion;
- internal pullbacks;
- new liquidity created;
- target-side liquidity consumed;
- opposing liquidity created.

High-probability exploratory metric:

```text
approach_liquidity_retention_ratio =
    intact_liquidity_at_entry /
    identifiable_liquidity_before_approach
```

No threshold frozen.

### Week 19 pause/force liquidity candidate

New persisted research object:

```text
pause_compactness =
    pause_range / ATR_ref

departure_efficiency =
    abs(Pn - P0) /
    sum(abs(P_i - P_{i-1}))
```

Store:

```text
pause_duration_bars
pause_range_atr
pause_median_candle_range_atr
pause_median_body_atr
departure_net_move_atr
departure_efficiency
departure_range_expansion
departure_created_imbalance
pause_force_liquidity_candidate
```

No boundary is frozen yet.

### Retracement depth

Week 19 paired-entry research metric:

```text
retrace_fraction =
    retracement_distance /
    preceding_impulse_net_move
```

Store with structure/body/impulse/candle quality. No optimum depth selected from P&L.

### R and target math

Long:

```text
risk_distance = entry_price - stop_price
reward_distance = target_price - entry_price
```

Short:

```text
risk_distance = stop_price - entry_price
reward_distance = entry_price - target_price
```

```text
initial_RR = reward_distance / risk_distance
realized_R = pnl_price_distance / risk_distance
```

`realized_R` is L3.

Trading-plan 3R price:

```text
R = abs(entry_price - stop_price)
three_R_price = entry_price ± 3 * R
```

Instructor-supported management branches:

```text
A) exit 100% at ~3R
B) take ~70% at ~3R + move ~30% runner to BE
```

Weekly videos also show contextual deviations; these are recorded factually, never retrospectively optimized.

### Break-even / management

Store:

```text
be_moved
be_time
be_trigger_type
new_favorable_structure_time
new_adverse_structure_time
partial_taken
partial_fraction
stop_moved_after_be
```

Week 19 reinforces that repeated micro-trailing after BE is discouraged; taking partials is a separate decision.

### Week 19 stagnation candidate

```text
stall_duration_minutes = now - fill_time
net_progress_atr_since_fill
MFE_R_since_fill
new_opposing_liquidity_count
equal_extreme_cluster_created
time_remaining_in_operating_window
exit_cost_R
```

Candidate state only:

```text
stall_exit_candidate =
    prolonged_stall
    AND weak_follow_through
    AND new_opposing_liquidity_created
    AND near_neutral_exit_available
```

The observed ~90–120 min example is not yet a universal threshold.

### News state

Store:

```text
news_event_id
news_calendar_color
news_event_type
instructor_treats_as_relevant
minutes_to_news
minutes_from_news
news_released
```

Candidate state:

```text
news_eligible =
    no_relevant_news_imminent
    OR relevant_news_already_released
```

Week 19 proves calendar color alone is insufficient because Benjamin waits for a specific orange housing release.

### Daily risk overlay

```text
if trades_today >= 3:
    block new trade

if losses_today >= 2:
    block new trade
```

Funding overlay remains separate from market-edge baseline.

## Weekly invariants currently supported

These are not all equally “frozen”, but they are repeatedly supported and must be tested as measurable states:

1. Relevant liquidity/context precedes a valid activation.
2. Timing/session is a real gate, not decoration.
3. Liquidity sweep alone is insufficient.
4. POI/imbalance/orderblock touch alone is insufficient.
5. Impulse and displacement are different objects.
6. Wick-only structure violation can differ materially from a valid body/force change.
7. Orderblock without inducement is not trusted as a primary POI in the conservative baseline.
8. Candle formation is contextual and must be known only after close.
9. Outcome never changes original setup validity.
10. Direct vs confirmation entries are execution variants, not separate market setups.
11. Aggressive/conservative stop variants are L2 choices.
12. News/holiday state can veto otherwise attractive geometry.
13. Target-side meaningful liquidity and available R matter before entry.
14. Management is event/state dependent; it is not allowed to leak back into entry detection.
15. Exact repeated videos are not independent samples.

## Recovery rule

If any Actions artifact expires, reconstruct from:
1. the immutable Git blobs/commits listed here;
2. source MEGA videos via existing workflows;
3. the v2 schema and protocol;
4. weekly files in sequence.

Never reconstruct a missing threshold from memory or P&L. Unresolved remains unresolved until source evidence + OHLC measurement solve it.
