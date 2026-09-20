# Benjamin Detector v0.1 — instructor-replication specification

Status: **ACTIVE DISCOVERY VERSION**  
Evidence basis: Modules 2–12 + weekly corpus studied through Week 20. Weeks 1–5 remain pending v2 backfill, so rules supported only there cannot be frozen.

## Purpose

Turn Benjamin's strategy into an ordered, measurable detector before market P&L optimization.

This detector answers five different questions separately:

1. Is the market context eligible?
2. Was relevant liquidity identified and taken correctly?
3. Did a valid activation sequence occur?
4. Is there an actionable entry now?
5. If filled, how is the position executed/managed?

Only L0 + L1 may determine setup eligibility. L2 controls execution. L3 never changes original setup validity.

## Output states

Every layer returns:

- `PASS` — required evidence-supported conditions are satisfied.
- `FAIL` — at least one evidence-supported hard rule is violated.
- `UNRESOLVED` — no known hard violation exists, but one or more required concepts still depend on an unfrozen threshold/missing observation.

No weighted score is used in v0.1.

## Canonical state machine

```text
S0 CONTEXT_READY
-> S1 REQUIRED_LIQUIDITY_IDENTIFIED
-> S2 REQUIRED_LIQUIDITY_TAKEN
-> S3 REACTION
-> S4 IMPULSE
-> S5 IMBALANCE_CREATED
-> S6 CONFIRMATION
-> S7 RETRACEMENT_TO_ENTRY_AREA
-> S8 ENTRY_ACTIVATED
-> S9 ORDER
-> S10 FILL
-> S11 MANAGEMENT
-> S12 EXIT
```

A setup may be rejected at any state. Setup families may later specialize transitions, but v0.1 uses the conservative common path.

## L0 — Context detector

Hard gates currently supported:

```text
session_eligible == true
holiday_eligible == true
news_eligible == true
relevant_context_liquidity_exists == true
required_HTF_location_condition != false
target_room_sufficient != false
```

If a field required by the setup is unknown, return `UNRESOLVED`.

### HTF direction

`htf_alignment` is stored as context/quality, not a universal directional veto. Course evidence shows countertrend trades can be taken with different ambition/management.

### Context liquidity vs activation liquidity

Week 20 distinguishes:
- `context_liquidity` — primary reason/location for the trade;
- `activation_liquidity` — LTF liquidity used to trigger the setup.

Benjamin recommends important context liquidity primarily on 1H / at least 15m. Therefore:

```text
context liquidity < 15m AND not named/session/HTF liquidity
=> quality warning / UNRESOLVED_CONTEXT_QUALITY
```

It is not a universal hard veto in v0.1.

DXY is contextual confirmation and never substitutes for the required EUR/USD liquidity event.

## Liquidity detector

Each liquidity object must store:

```text
id
role ∈ {context, activation, target, opposing}
kind
timeframe_minutes
price
formation_time
known_time
structural_relevance
external_internal
touch_count
age_bars
prominence_atr
equal_cluster_dispersion_atr
swept
take_time
take_known_time
take_mode
penetration_atr
return_inside
```

Hard activation rule:

```text
required_liquidity_taken == true
```

A sweep by itself never activates an entry.

Unfrozen measurements:
- minimum swing prominence;
- equal-high/low tolerance;
- minimum/maximum sweep penetration;
- maximum liquidity age.

These remain parameters with null thresholds until calibrated against instructor labels.

## Impulse detector

Impulse is the local confirmation event, not the later displacement leg.

Required v0.1 semantic state:

```text
impulse_confirmed == true
AND impulse_created_imbalance == true
```

Measured features:

```text
impulse_candle_count
impulse_net_move_atr
impulse_max_candle_range_atr
impulse_median_body_ratio
impulse_directional_fraction
impulse_overlap_ratio
bars_from_liquidity_event_to_impulse
```

Numeric thresholds are intentionally unfrozen in v0.1.

## Structure / BOS detector

Week 19–20 evidence strongly distinguishes wick-only violation from body-close break.

```text
wick_only_violation =
    extreme_crosses_reference
    AND close_does_not_cross_reference

body_break_candidate =
    close_crosses_reference
```

A wick-only event does not count as structure confirmation.

Measured features:

```text
structure_break_penetration_atr
structure_break_close_penetration_atr
structure_break_body_ratio
structure_break_close_location
structure_break_created_imbalance
```

No minimum close penetration/body ratio is frozen yet.

## Imbalance / POI detector

Existence of an imbalance is not equivalent to entry eligibility.

Geometric FVG:

```text
bullish: high(c1) < low(c3)
bearish: low(c1) > high(c3)
```

For a v0.1 actionable entry imbalance:

```text
entry_imbalance_created == true
AND impulse_created_imbalance == true
AND required_liquidity_taken == true
AND timing/news/context gates are still valid
```

Additional quality variables:

```text
gap_size_atr
imbalance_sequence_index
entry_imbalance_clean_before_retrace
liquidity_collected_before_imbalance
local_opposing_liquidity_present
previous_mitigation_count
candle_formation_confirmed
structure_change_by_close
```

Week 20 proves the first imbalance after a violent/news move is not automatically the correct one.

### Orderblock-specific rule

Current conservative baseline:

```text
if poi_type == orderblock:
    actionable only if inducement_exists_before_retest == true
```

An uninduced orderblock is downgraded to non-actionable POI / liquidity candidate.

## Confirmation logic

Current discovery encoding, derived from Modules 11–12 and weekly replication:

```text
impulse_plus_imbalance =
    impulse_confirmed
    AND impulse_created_imbalance
    AND entry_imbalance_created

body_structure_confirmation =
    structure_change_confirmed
    AND structure_break_by_close

confirmation_count =
    int(impulse_plus_imbalance)
  + int(body_structure_confirmation)
  + int(candle_formation_confirmed)

normal_activation_candidate =
    context_pass
    AND required_liquidity_taken
    AND impulse_plus_imbalance
    AND confirmation_count >= 2
```

The `>=2` rule is **PROVISIONAL** until more weekly holdout evidence confirms whether Module 11 or Module 12 framing is the final baseline.

A wick-only break contributes zero structure confirmations.

## Entry detector

The setup and the execution are separate.

Entry eligibility requires:

```text
activation_candidate
AND entry_zone_defined
AND retracement_into_entry_zone
AND entry_trigger_confirmed
AND chase_attempted == false
AND timing_eligible_at_entry == true
AND target_room_sufficient != false
```

If original entry is missed:

```text
do not chase
-> wait for fresh body-confirmed structure change
-> identify fresh imbalance
-> evaluate first valid mitigation/reaction
```

This is stored as a separate reactivation route.

## No-trade hard reason codes

Current v0.1 hard failures include:

```text
CTX_SESSION_BLOCKED
CTX_HOLIDAY_BLOCKED
CTX_NEWS_BLOCKED
CTX_REQUIRED_HTF_LOCATION_MISSING
CTX_TARGET_ROOM_INSUFFICIENT
LIQ_REQUIRED_MISSING
LIQ_REQUIRED_NOT_TAKEN
IMPULSE_MISSING
IMPULSE_NO_IMBALANCE
IMBALANCE_MISSING
BOS_WICK_ONLY_NOT_CONFIRMATION
CONFIRMATION_INSUFFICIENT
ORDERBLOCK_NO_INDUCEMENT
ENTRY_ZONE_UNDEFINED
ENTRY_NO_RETRACE
ENTRY_TRIGGER_MISSING
ENTRY_CHASE
ENTRY_TIME_INVALID
LOOKAHEAD_VIOLATION
```

Not every code alone invalidates every setup family. The implementation records layer-specific failures and the final decision.

## Look-ahead protection

For every L0/L1 feature with a `known_time`:

```text
known_time <= decision_time
```

Any feature becoming known after decision time is ignored and produces `LOOKAHEAD_VIOLATION`.

L3 fields are never read by the entry detector.

## L2 execution model

After `ENTRY_ACTIVATED`, execution variants remain separate:

- direct imbalance entry;
- confirmation entry;
- aggressive stop;
- structural/conservative stop;
- split entry;
- higher-timeframe continuation after missed micro activation (still conditional/unfrozen).

No execution variant may redefine whether the underlying setup existed.

## L3 management model

Stored separately:

- BE trigger and time;
- partials;
- new favorable/adverse structure;
- MFE/MAE;
- target hit;
- stagnation/accumulation;
- final R.

Current repeated management hypotheses:
- ~3R is a recurring planning reference, not a universal validity threshold;
- ~70% at 3R + ~30% runner to BE is an instructor-supported branch;
- prolonged ~90–120 min stagnation with weak follow-through/new opposing liquidity can justify a near-neutral exit, but duration is not frozen globally;
- favorable progress + imminent relevant news can justify BE protection.

## Parameters intentionally unresolved in v0.1

These must be learned from instructor-positive vs instructor-negative examples, not P&L:

```text
min_context_liquidity_prominence_atr
equal_level_tolerance_atr
min_sweep_penetration_atr
max_sweep_penetration_atr
min_impulse_net_move_atr
min_impulse_body_ratio
min_impulse_directional_fraction
max_impulse_overlap_ratio
max_bars_liquidity_to_impulse
min_structure_close_penetration_atr
min_structure_break_body_ratio
min_fvg_gap_atr
max_entry_lateness_minutes
min_target_room_R
stall_exit_minutes
```

## Version-adjustment policy

Every new weekly video can do one of four things:

1. **SUPPORT** — adds evidence to an existing rule.
2. **NARROW** — adds a condition/exception.
3. **BROADEN** — proves the rule accepts more cases than v0.1.
4. **CONTRADICT** — creates a mismatch that must be investigated.

Detector changes create a new version (`v0.2`, `v0.3`, ...). Previous rule versions and weekly labels remain immutable. No old label is silently rewritten.

Thresholds are calibrated on instructor replication first. P&L is forbidden from choosing them.
