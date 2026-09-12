# London session measurement model — BeLikeTheAlgo

## Purpose

Operationalize the evidence from `London Killzone` without turning Benjamin's probabilistic language into a guaranteed rule.

## Core distinction

Benjamin's claim that London often establishes the daily high or low is an **instructor hypothesis to test**, not information that may be assumed at entry time.

Therefore the model separates:

- **features available at entry**;
- **same-day outcome variables known only later**.

## Entry-time features

For each day / London candidate:

```text
date
asia_high
asia_low
asia_range_size
asia_side_taken_before_entry
london_session_eligible
preferred_london_subwindow
candidate_direction
htf_structure_direction
structure_alignment
relevant_liquidity_taken
poi_type
ltf_confirmation_present
entry_time
entry_price
stop_price
next_internal_liquidity
next_external_liquidity
distance_to_external_liquidity_R
```

No London-high/low retention outcome may enter the feature vector before it happens.

## Candidate London extreme

The London high and low evolve during the session. A candidate manipulated extreme must retain both:

```text
event_time
known_time
```

The detector must not use the final London-session high/low retrospectively to choose the "correct" entry.

A candidate extreme should instead be associated with an event sequence already supported by earlier modules, e.g. relevant liquidity interaction plus LTF directional confirmation/displacement.

## Retention outcome

After the entry/candidate event, measure through the end of New York:

```text
candidate_extreme_revisited
candidate_extreme_breached
breach_time
breach_distance_atr
minutes_to_breach
```

The exact boundary convention (wick touch, wick penetration, close beyond) is not frozen until the Liquidity module resolves Benjamin's take/breach semantics.

## London-origin move

Store descriptive metrics:

```text
move_from_london_extreme_atr
move_from_london_extreme_R
MFE_R_before_end_NY
MAE_R_before_end_NY
external_liquidity_reached
asia_opposite_boundary_reached
PDH_PDL_reached
```

These are outcomes and target-context measurements, not automatic target rules.

## Timing quality

Preserve the previously verified London session and preferred subwindows. `London Killzone` repeatedly favors the opening area and calls a later 10–11 / 11–12 example riskier / out of preferred timing, but does not define a replacement Killzone interval.

Suggested fields:

```text
minutes_from_london_open
inside_main_london_window
inside_preferred_london_subwindow
late_london_flag
frankfurt_origin_flag
```

## Management experiment

Benjamin suggests that a high-quality London trade, when a funding account is at breakeven/profit, can take a smaller partial at ~3R and leave a larger runner.

Record rather than assume:

```text
account_state ∈ {drawdown, breakeven, profit, n/a}
reached_3R
partial_fraction_at_3R
runner_MFE_R
runner_exit_R
```

Course example values such as 30–40% partial at ~3R and possible 6.5R/10R continuation are parameters/examples to test, not universal constants.

## Required validation

Across weekly trades and independent history measure at minimum:

- fraction of eligible London candidates whose extreme survives through end of New York;
- same statistic split by Judas vs Break-Retest;
- split by preferred vs late timing;
- split by HTF structure alignment;
- split by Asia liquidity taken / not taken;
- split by LTF confirmation quality;
- MFE/MAE distribution from candidate London entries;
- incremental effect of runner management versus normal partial management.

## Anti-lookahead rule

Never label a candidate as "the daily high/low" before the day has finished. At entry it is only a **candidate London extreme**. `became_daily_extreme` is a later outcome label.
