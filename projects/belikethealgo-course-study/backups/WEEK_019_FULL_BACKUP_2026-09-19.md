# Backup Semana 019 — 2026-09-19

Source path: `projects/belikethealgo-course-study/study/14-trades-semanales-explicados/019-semana-19.md`
Source blob SHA at backup time: `d2b92ca2167c03049a63c0fc70a69ea988b66407`
Branch: `belikethealgo-course-study`

> Recovery copy. Contains the full current study record, including rules, formulas, evidence states and unresolved fields. The source remains canonical while active research continues.

---

# 14 Trades Semanales Explicados — Semana 19

Status: **IN PROGRESS — v2 semantic/event extraction persisted; final exhaustive dense-sheet audit pending**

## Evidence reviewed

- Published source: `19) Trades Semana 19.mp4`.
- Source duration from dense manifest: **1867.183 s (~31m07s)**.
- Full timestamped transcript reviewed chronologically: **325 segments**.
- Dense visual artifact available and checked: **1,868 frames at 1 fps + 3,735 frames at 2 fps**.
- Full-video visual overview reviewed across the entire source, with denser checks around the instructor's trade/no-trade/structure/impulse explanations.
- No numeric detector threshold below is frozen from P&L. Rules remain instructor-replication research until held-out validation.
- Exact historical date/DST, raw OHLC/ATR, broker spread/slippage, exact fills, MFE/MAE and several exact R outcomes remain unresolved pending market-data reconstruction.

## Event inventory — current v2 reconstruction

### W19-E01 — Monday London first short candidate

Around the London open Benjamin waits until a relevant upper-side event occurs. At ~08:15 he explicitly says there is still nothing for him; near London open price takes the Frankfurt high, interacts with a 1m rejection block and reacts bearish.

Observed sequence:

```text
London eligible
-> upper liquidity / Frankfurt high taken
-> bearish reaction
-> imbalance created
-> structure reference selected (aggressive/conservative variants)
-> retracement
-> short candidate
```

Benjamin says this trade could have been taken. After price breaks the lower structure reference he discusses protecting at break-even. This is a recognized setup, but the later continuation/reversal is L3 and cannot define its original quality.

### W19-E02 — Monday later London short; cleaner contrast case

Price later returns upward inside the London window, takes upper highs again, creates trend/equal-high-like liquidity and a cleaner bearish candle/imbalance sequence. Benjamin explicitly contrasts this entry with the previous one.

The crucial instructor distinction is:

- the cleaner setup has a **deeper retracement**;
- cleaner candle formation;
- a clearer structure break;
- stronger/clearer impulse;
- the earlier comparable movement breaks the reference **with wick** rather than the same quality of structure change.

Benjamin explicitly says the two movements look similar but **the change of structure and impulse are not the same**.

This is high-value paired evidence for the future BOS/impulse detector.

L2 variants shown:
- aggressive stop above the confirmation/imbalance candle;
- wider stop around ~4.5 pips;
- wider structural stop around ~6 pips;
- target Asia low or approximately 1:3.

These stop distances are examples/typical execution, not fixed entry thresholds.

### W19-E03 — Tuesday: no trade

Benjamin explicitly states that Tuesday had nothing. Preserve this as a first-class no-candidate/no-trade market day rather than omitting it from the dataset.

### W19-E04 — Wednesday first long: taken by Benjamin, stopped, later self-criticized

Wednesday has a broader context in which previous important highs had been taken and Benjamin initially discusses greater probability of retracement/sales. On LTF, however, a 5m minimum plus imbalance appears at a time he likes. Price takes the minimum, produces a bullish impulse and creates an imbalance.

Benjamin says he entered and was stopped.

Important anti-outcome-bias handling:
- `trade_taken=true`;
- loss is L3;
- he later says the first trade came from not reading the market well enough and that he leaned heavily on the good time + good impulse;
- the ex-ante observable issue he then teaches is that zones formed by a compact pause / very small candles followed by very strong departure often become **liquidity**, because participants place orders/stops there.

Therefore current label remains:
- `setup_validity=unresolved/self-criticized` until the dense visual audit and later corpus calibration separate “valid but lower quality” from “rule violation”;
- `setup_quality_pre_entry=degraded candidate` due the origin/pause-liquidity characteristic;
- do not relabel it simply because it lost.

### W19-E05 — Wednesday second/better long after the first zone is liquidated

Benjamin explains that after the first area is taken, it can itself be treated as a minimum/liquidity reference. Around 10:00 price takes that minimum and then generates the stronger bullish move.

Sequence:

```text
prior pause/origin becomes liquidity candidate
-> minimum/stops taken
-> strong bullish impulse
-> first imbalance
-> clearer structure change
-> decision candle / first usable imbalance
-> later imbalance alternatives
-> long candidate(s)
```

Benjamin says this second construction was better because it first liquidated the stops accumulated around the small candles.

This is paired positive/negative evidence against using “good time + visually strong impulse” alone.

### W19-E06 — Wednesday New York: reject pre-news sell; allow post-news structure/imbalance short

Price reaches/takes an important prior-week high. Benjamin sees an apparent sell idea before a scheduled orange housing release but notes that only ~15 minutes remain and the release is relevant enough to wait.

Negative phase:

```text
important upper liquidity taken
-> apparent pre-news sell/manipulation
-> relevant news imminent
-> NO ENTRY
```

Positive phase after release:

```text
news released
-> structure change
-> small bearish imbalance
-> confirmation candle / retest
-> short candidate
```

This is evidence that news relevance cannot be reduced blindly to calendar color alone. The event type/Benjamin relevance must be stored.

### W19-E07 — Thursday London: no trade; uninduced orderblock behaves as liquidity

Benjamin expects retracement after a meaningful weekly high/liquidity event. Before London, price mitigates an imbalance and falls hard. He revisits a core rule: an orderblock without inducement/liquidity before it often acts as **liquidity**, not as a reliable reaction POI.

He explicitly says London produced nothing for him.

This strengthens:

```text
orderblock_present
AND no_prior_inducement
=> not sufficient as actionable POI
```

### W19-E08 — Thursday New York long candidate + stagnation management rule

After news, Benjamin wants the relevant lower liquidity/PDL interaction inside the 4H context before buying. Price takes PDL and he describes a riskier and a safer buy area.

After activation, price spends roughly **1.5–2 hours** manipulating/stalling and forms equal lows / additional liquidity. Benjamin advises that if the trade is already at BE/neutral or only slightly negative, he prefers exiting rather than keeping full risk while price fails to expand.

This belongs to **L3 management**, not L0/L1 validity.

Candidate management state:

```text
filled trade
-> prolonged stall / little follow-through
-> new opposing liquidity/equal lows created
-> trade can be exited near BE / tiny loss
```

The 1.5–2 h observation is an instructor example, not yet a universal frozen timeout.

### W19-E09 — Friday pre-NFP geometry: baseline no-trade because NFP has not released

Benjamin explicitly recommends not operating before NFP.

Before release, price interacts with a 4H imbalance and Asia-side liquidity, then later creates structure/imbalance geometry that could otherwise look tradable. Under the baseline this remains blocked by the news state.

```text
technical geometry present
+ NFP pending
=> no baseline entry before release
```

This is strong negative evidence against a chart-only detector.

### W19-E10 — Friday after NFP / second sell window

After NFP, price interacts with a 1H orderblock nested in the 4H imbalance and later forms a short opportunity during the second sell window Benjamin likes (he references ~15:35 Spain in the example).

He explicitly says that if the first sell window is compromised by important news, he normally prefers waiting for the second one.

Current status:
- recognized instructor-supported candidate;
- exact subwindow boundaries must be resolved from the session model and historical clock/DST reconstruction before coding.

## Week 19 — measurable rule additions / refinements

### 1. BOS / structure change: wick-only and body/force are not equivalent

Week 19 gives direct paired language that superficially similar movements differ because one only violates structure with wick while the cleaner one has a real structure change + impulse.

Store for every structure candidate:

```text
reference_price
break_side
wick_penetration_atr
close_penetration_atr
break_body_ratio
close_location_in_break_candle
impulse_net_move_atr
impulse_created_imbalance
bars_liquidity_to_break
```

Candidate booleans:

```text
wick_only_violation =
    extreme_crosses_reference
    AND close_does_not_cross_reference

body_break_candidate =
    close_crosses_reference
```

No minimum ATR penetration/body ratio is frozen yet.

### 2. Retracement depth is a candidate quality variable, not a standalone entry rule

Monday's paired entries motivate:

```text
retrace_fraction =
    retracement_distance / preceding_impulse_net_move
```

Also store:
- `retrace_duration_bars`;
- `retrace_overlap_ratio`;
- `candle_formation_confirmed`;
- `structure_break_by_close`;
- `impulse_created_imbalance`.

Week 19 does **not** establish a numeric minimum/maximum `retrace_fraction`.

### 3. Compact pause + strong departure can define a liquidity candidate

Benjamin explicitly warns that a zone made of very small candles / pause followed by a very strong move often attracts orders/stops and therefore can function as liquidity rather than as a POI to trust blindly.

Add an origin-compression object:

```text
pause_duration_bars
pause_range_atr
pause_median_candle_range_atr
pause_median_body_atr
departure_net_move_atr
departure_efficiency
departure_range_expansion
departure_created_imbalance
stops_side_inferred
```

Auxiliary measurements:

```text
pause_compactness =
    pause_range / ATR_ref

departure_efficiency =
    abs(Pn - P0) / sum(abs(P_i - P_{i-1}))
```

Candidate label only:

```text
pause_force_liquidity_candidate = true/false/unresolved
```

No threshold is frozen yet; calibrate against Benjamin-positive/negative examples.

### 4. Uninduced orderblock rule strengthened

Week 19 independently supports the existing conservative encoding:

```text
actionable_orderblock_poi =
    orderblock_present
    AND inducement_exists_before_retest
```

An uninduced orderblock may be stored as a liquidity candidate instead:

```text
if orderblock_present and not inducement_exists_before_retest:
    orderblock_role = liquidity_candidate_or_nonactionable_poi
```

Exact scope remains subject to held-out validation because Benjamin sometimes speaks probabilistically.

### 5. Timing + impulse is insufficient without correct liquidity interpretation

Wednesday's first/second long contrast motivates a composite diagnostic:

```text
candidate_entry_quality_inputs = [
    session_quality,
    required_liquidity_relevance,
    origin_pause_liquidity_state,
    liquidity_taken,
    impulse_confirmed,
    structure_change_confirmed,
    imbalance_created,
    candle_formation_confirmed
]
```

No weighted score is created yet.

### 6. News gate needs event relevance, not just color

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

Candidate baseline logic:

```text
news_eligible =
    no_relevant_news_imminent
    OR relevant_news_already_released
```

The exact “imminent” threshold stays governed by the broader course rules and event-specific evidence; Week 19's orange housing example shows that `calendar_color != sufficient relevance classifier`.

### 7. Break-even protection and stop movement are different decisions

Benjamin again advocates aggressive BE after favorable structural/impulse progress, but says once protected at BE he generally prefers **not** to keep trailing the stop candle by candle; partials are a separate alternative.

Store:

```text
be_trigger_type
be_time
new_favorable_structure_time
new_impulse_time
partial_taken
stop_moved_after_be
```

Candidate behavioral rule:

```text
if stop_is_at_BE:
    repeated_micro_trailing = discouraged
```

This is L3 management.

### 8. Stagnation / liquidity-building exit candidate

From the Thursday example:

```text
stall_duration_minutes = now - fill_time
MFE_R_since_fill
net_progress_atr_since_fill
new_opposing_liquidity_count
equal_extreme_cluster_created
time_remaining_in_operating_window
exit_cost_R
```

Candidate management state:

```text
stall_exit_candidate =
    prolonged_stall
    AND weak_follow_through
    AND new_opposing_liquidity_created
    AND near_neutral_exit_available
```

Do not freeze `prolonged_stall = 90–120 min` globally yet; that interval is directly observed in this example and must be validated elsewhere.

### 9. Typical stop size is descriptive, not definitional

Benjamin says most of his stops are commonly around **3–5 pips**, sometimes ~6 or a bit outside that range.

Store the empirical distribution:

```text
stop_distance_pips
stop_distance_atr
stop_reference_type
```

Do **not** encode `3 <= stop_pips <= 6` as setup validity. Structural invalidation remains primary.

### 10. 1:3 remains recurring planning baseline

Week 19 repeatedly uses ~1:3 as a practical target alternative to named liquidity.

Store separately:

```text
target_reference_type
rr_at_target
nearest_meaningful_liquidity_rr
```

Never choose the target retrospectively from the path.

## Correlation / independence controls

- Monday's two London entries are same-day and strongly related; cluster `W19-MON`.
- Wednesday's initial failed long and later cleaner long are paired contrast evidence and must not be treated as independent proof of the same rule.
- Wednesday pre-/post-news short is one evolving NY context.
- Thursday long + later management is one underlying setup.
- Friday pre-NFP blocked geometry and post-NFP candidate are same-day conditional states.
- Tuesday is a no-trade day and remains part of eligible-day denominators once exact market date is reconstructed.

## Unresolved before final v2 closure

- exact market dates and Spain/NY/DST clock mapping;
- raw OHLC/ATR measurements for all candidate impulses/BOS/retracements;
- exact body-vs-wick penetration values;
- quantitative boundary for pause/compression becoming liquidity-like;
- exact status of Wednesday first long: valid-lower-quality vs invalid under Benjamin baseline;
- exact fills/spread/slippage and R outcomes;
- DXY synchronized state where not visible;
- exact boundaries of the Friday “second sell window”;
- full exhaustive dense contact-sheet audit and final event screenshot index.

No unresolved field is guessed.

## Current gate

- full transcript chronological review: **PASS**;
- full-video visual overview: **PASS**;
- key event dense visual checks: **PASS**;
- positive + negative/no-trade inventory: **PASS (provisional)**;
- L0/L1 vs L2/L3 separation: **PASS**;
- impulse vs displacement separation: **PASS**;
- candidate mathematical variables extracted: **PASS**;
- exhaustive dense-sheet/event screenshot audit: **PENDING**;
- exact OHLC reconstruction: **PENDING**.

**Week 19 is not marked COMPLETE yet.**
