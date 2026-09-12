# 08 Importancia de la Sesión de Londres — 01 London Killzone

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript: ~778.9 s / 13.0 min, 113 transcript segments.
- 156 periodic source frames at ~5 s intervals.
- 84 detected chart-state changes plus scene-change evidence.
- 13 periodic contact sheets and 7 state-change sheets visually reviewed, including the opening AMD explanation, repeated historical examples, the explicit exception, and the later trade-management example.

## Core claim — instructor explicit, but NOT accepted as measured probability

Benjamin teaches a probabilistic London-session tendency:

```text
Asia accumulation
-> London manipulation / decisive move
-> London often establishes the high or low that remains unbroken through the rest of that trading day
```

He repeatedly says that London "usually" creates the day's maximum or minimum and visually walks through roughly 7–10 recent examples. He also explicitly shows at least one counterexample where New York later breaks the London extreme.

Therefore the accepted course rule is **not**:

```text
London high/low = guaranteed daily high/low
```

It is:

```text
London-origin extreme retention = instructor hypothesis / probability enhancer
```

The actual retention frequency must be measured later across the weekly-trade corpus and independent OHLC data.

## Relationship to Asia / AMD

The lesson reinforces the previous module rather than replacing it.

Benjamin describes the common sequence as:

```text
Asia accumulates
-> London manipulates one side / creates the decisive impulse
-> price distributes away from that London extreme
```

He also references the alternative break/retest-style scenario already taught in the Asia module.

This materially supports treating London as the main resolution window for Asia context, but still does **not** make time alone an entry trigger.

## London extreme and daily horizon

Benjamin evaluates whether the London extreme survives through the remainder of that trading day, explicitly referring to the period through the end of New York. He distinguishes next-day price action from the same-day test.

Candidate research fields:

```text
london_extreme_type ∈ {high, low}
london_extreme_time
london_extreme_price
same_day_new_york_end_time
extreme_revisited_same_day
extreme_breached_same_day
bars_until_breach
max_favorable_excursion_before_breach
```

Exact day-boundary and timezone implementation must use the session conventions already established in the course; DST cannot be hard-coded as a fixed UTC offset.

## Timing evidence and caution

Most examples are verbally associated with roughly the London opening area, frequently "8 or 9" or "9" in the chart context. One example is explicitly called late / risky because the important move occurs around 10–11 / 11–12 rather than the preferred opening timing.

This is consistent with the previously established course session rule (London valid window and preferred subwindows), but this lesson does **not** cleanly redefine a new exact numerical Killzone boundary.

Therefore:

- do not replace the previously verified session schedule with a new guessed interval;
- record exact event times from examples;
- treat later-than-preferred moves as lower-quality timing evidence, not automatically impossible trades.

## Positive examples

Benjamin rapidly reviews a sequence of recent EUR/USD examples. The recurring visual structure is:

1. an identifiable London-area high or low is formed;
2. a directional move departs from it;
3. price does not meaningfully take that extreme again before the end of New York.

Several charts are annotated directly with arrows / marked extrema while Benjamin advances day by day.

These examples support the existence of the heuristic. They are **not** statistical evidence because:

- sample selection is instructor-selected;
- sample size is small;
- no denominator of all eligible days is provided;
- the definition of a "breach" is not numerically formalized in this video.

## Explicit negative / exception

Benjamin explicitly points to a Friday example where the London minimum is later "destroyed" / broken in New York.

This negative example is important because it proves:

```text
London-extreme retention is not a hard invariant.
```

Any backtest implementation must allow London-extreme failure and measure its frequency rather than filtering such days out retrospectively.

## Integrated trade example

In the second half Benjamin shows a bullish example rather than merely day-level statistics.

The contextual sequence he describes is approximately:

```text
bullish structural/contextual environment
-> relevant low/liquidity is taken in London
-> long entry in a good area (entry mechanics intentionally not re-taught here)
-> London is near the beginning of the directional move
-> upside liquidity / external range objective remains available
-> trade can potentially be held farther than a normal early partial target
```

He explicitly says the purpose of the example is not to reteach entry mechanics. Therefore no new entry trigger is inferred from this example.

## Management rule — funding-account conditional, not universal strategy rule

Benjamin gives a specific management suggestion for a strong London trade when the trader is **at breakeven or already in profit** in a funding challenge/account:

- at approximately **1:3 R**, take a smaller partial, around **30–40%**;
- leave the remaining position running because a London-origin move with strong confluence can have larger same-day range potential;
- he visually discusses examples extending toward roughly 1:6.5 and even ~1:10 in the illustrated setup.

He contrasts this with being in drawdown, where he recommends prioritizing recovery toward account balance rather than aggressively maximizing a runner.

Important classification:

```text
funding_state_management_rule = conditional money-management advice
```

not:

```text
all London trades must take exactly 30–40% at 3R
```

The 6.5R / 10R values are demonstrated possibilities in one example, not expected returns.

## Confluences Benjamin explicitly names for allowing a larger runner

In the trade-management explanation he stacks several conditions:

- London-open / London-session origin;
- relevant liquidity taken (including Asia context);
- compatible bullish/bearish structure;
- entry from a "good zone" under previously taught concepts;
- remaining liquidity / external range objective in the trade direction;
- the trader is not currently managing a drawdown state.

This reinforces the course hierarchy:

```text
time-of-day alone != trade
London timing + liquidity + structure/location + LTF entry evidence = stronger candidate
```

## What this lesson does NOT establish

Unresolved / deliberately excluded from hard rules:

- exact statistical probability that London creates the daily high/low;
- exact wick-vs-close threshold for saying the London extreme was breached;
- a new standalone London entry model;
- a new exact Killzone interval that supersedes the earlier session lesson;
- universal partial percentage for all trades;
- universal 3R / 6.5R / 10R target requirements;
- deterministic prediction of daily direction from London alone.

## Candidate quantitative detector — OUR FORMALIZATION

For each eligible trading day:

1. construct Asia range using the already defined New-York-local session convention;
2. construct London session using the course session schedule;
3. identify the London session high and low progressively with no future leakage;
4. identify the directional departure / candidate manipulation-resolution event using already validated liquidity + structure + displacement definitions;
5. after the candidate London extreme becomes known, track whether it is touched or breached through end of New York;
6. store retention/failure as an outcome, never as a pre-known filter.

Suggested fields:

```text
date
asia_high, asia_low
asia_side_taken
london_candidate_direction
london_extreme_price
london_extreme_event_time
london_extreme_known_time
preferred_timing_flag
structure_alignment
remaining_external_liquidity
ltf_confirmation_present
same_day_extreme_breach
breach_time
MFE_R
MAE_R
funding_state ∈ {drawdown, breakeven, profit, n/a}
partial_at_3R_fraction
runner_max_R
```

`same_day_extreme_breach` is an **outcome variable**, not information available at entry time.

## Consolidated lesson rule

```text
ASIA CONTEXT
-> LONDON RESOLUTION / MANIPULATION AROUND VALID TIMING
-> require previously learned liquidity + structure/location + LTF evidence for entry
-> London-origin extreme is a candidate same-day anchor, NOT a guarantee
-> if trade quality is high and account state permits, smaller early partial + larger runner may exploit the London move
```

## Inventory gate

- Full transcript reviewed: yes.
- Full periodic visual coverage reviewed: yes.
- Repeated positive London-extreme examples inventoried: yes.
- Explicit New-York breach exception recorded: yes.
- Integrated bullish London trade example reviewed: yes.
- Funding-account management advice separated from entry strategy: yes.
- Instructor probability language kept as hypothesis rather than statistical fact: yes.
- Anti-lookahead treatment of same-day retention specified: yes.

**Lesson status: COMPLETE.**
