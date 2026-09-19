# 14 Trades Semanales Explicados — Semana 20

Status: **IN PROGRESS — v2 semantic/event extraction persisted; final exhaustive dense-event audit pending**

## Evidence reviewed

- Published source: `20) Trades Semana 20.mp4`.
- Source duration: **1496.017 s (~24m56s)**.
- Full timestamped transcript reviewed chronologically: **~270 transcript lines / 271 indexed segments**.
- Dense visual artifact available and reviewed across the full source:
  - **1,497 frames at 1 fps**;
  - **2,993 frames at 2 fps**;
  - timestamped contact sheets checked around every major trade/no-trade/structure/liquidity/news explanation identified in the transcript.
- L0/L1 setup logic is kept separate from L2 execution and L3 outcome/management.
- No numeric threshold is frozen from profitability or from one winning/losing example.
- Exact historical market dates/DST mapping, synchronized DXY, raw OHLC/ATR, exact fills/spread/slippage and exact MFE/MAE remain pending market-data reconstruction.

## v2 event inventory

### W20-E01 — Monday: USD holiday; baseline no-trade

Benjamin says Monday is a dollar holiday and strongly recommends not trading holidays because the market can remain range-bound, move erratically and lack normal institutional flow. He allows, at most, the idea that a very clear London setup could be considered, but his transmitted baseline is to avoid the day.

```text
USD holiday
-> abnormal/low institutional activity expectation
-> baseline = no trade
```

This reinforces the existing holiday gate. Any discretionary London-holiday exception must remain separate from the baseline strategy.

### W20-E02 — Tuesday: no trade / no useful setup

Benjamin explicitly says there was nothing on Tuesday. Preserve Tuesday as a no-candidate/no-trade day rather than dropping it from eligible-day denominators.

### W20-E03 — Wednesday London: no trade because price is ranging / no clear setup

After the previous-week-low / HTF liquidity context is discussed, Benjamin says London itself offered nothing because price was in a range.

`trade_taken=false`; no later move may upgrade this original London decision.

### W20-E04 — Wednesday: relevant upper liquidity is taken, ideal LTF geometry appears outside preferred timing

The important context contains:

- prior-week / HTF reaction context;
- a 15m maximum that is also the London-session high;
- additional trend-line / Asia / PDL liquidity references in the intended downward path.

Benjamin shows a textbook-looking LTF sequence:

```text
upper liquidity taken
-> candle formation
-> structure change
-> bearish impulse / imbalances
-> confirmation candle
```

but explicitly says the earlier ideal location/activation occurred **outside the time he wanted**. Therefore visually correct LTF geometry does not override the timing gate.

### W20-E05 — Wednesday later short: higher-TF continuation execution after missed/out-of-time ideal activation

Because the ideal small-timeframe setup had already occurred outside his preferred timing, Benjamin moves to a larger execution timeframe (2m/3m/5m are the timeframes he recommends) rather than forcing a 1m entry.

He identifies 5m imbalances and says he enters from that continuation structure, with the stop above the relevant local structure and a ~1:3 target / lower trend-line liquidity as alternatives.

Current classification:

- `trade_taken=true`;
- this is **not** evidence that an out-of-time 1m activation becomes valid retrospectively;
- store it as a distinct candidate family: `higher_tf_continuation_after_missed_activation`;
- replication status remains conditional until more weekly examples show when Benjamin allows this continuation family.

### W20-E06 — Wednesday short management into news: protect at BE after favorable progress

Before relevant news, the short has already progressed and broken lower. Benjamin moves the stop to break-even because the news can produce a violent adverse spike.

The news later retraces upward, takes a local 5m maximum, and then price falls. That later favorable move is L3 and cannot be used to claim the BE decision was wrong.

Candidate management sequence:

```text
open trade
-> favorable structural progress
-> relevant news imminent
-> BE protection available
-> move stop to BE
```

Exact time-to-news threshold for managing an already-open position remains unresolved.

### W20-E07 — Wednesday post-news long after PDL / lower-range liquidity is taken

After the news-driven move, price takes PDL / the lower side of the range. Benjamin buys with a wider-than-usual stop because news volatility is elevated and because he sees sufficient target room toward upper maxima / a 4H imbalance.

Important separation:

- stop width is an L2 execution consequence of volatility + structural invalidation;
- the wider stop is not a setup-quality feature by itself;
- target availability / initial RR remains known before the entry.

Benjamin later manually exits near BE after prolonged accumulation/stalling. This reinforces the Week-19 stagnation-management candidate.

### W20-E08 — Wednesday long management: prolonged accumulation is a reason to flatten near neutral

Benjamin says the price spends almost two hours accumulating and he exits manually once he can leave near break-even because he dislikes remaining exposed inside a long accumulation.

This is L3 management evidence:

```text
filled trade
-> prolonged low-progress accumulation
-> neutral / BE exit becomes available
-> manual exit preferred
```

Do not use the fact that price later could have produced a large winner to optimize the original decision.

### W20-E09 — Thursday NY: first post-news imbalance rejected

A strong 14:30 news move occurs. Benjamin shows an imbalance that could superficially invite an entry but says he did not enter there because:

- he sees a liquidity formation around the candidate;
- the candle formation is not good enough.

This is first-class negative evidence:

```text
post-news imbalance present
AND poor candle formation / unresolved local liquidity
=> imbalance alone is insufficient
```

### W20-E10 — Thursday NY: later long after liquidity collection + better candle formation

Benjamin contrasts the rejected area with the later one. In the later construction he highlights:

- candle formation that **collects liquidity**;
- a paradigm/directional change;
- an aggressive/less-clean structure change can be visible;
- an imbalance is created and then mitigated/respected.

He says this later area could be bought and that his own execution is later protected at BE after a strong reaction.

This pair is valuable calibration evidence that the first imbalance after a violent move is not automatically the correct one.

### W20-E11 — Friday London: no trade because the relevant liquidity event occurred before London open

Benjamin says he saw nothing in London because the manipulation/liquidity event had already happened before the London opening. This independently reinforces timing as an L0 gate.

### W20-E12 — Friday NY first short after news: taken, but candle-formation quality is not ideal

After news Benjamin takes a short from the marked imbalance/confirmation area. He describes the break as aggressive, enters after seeing bearish force and protects above local structure.

As the trade moves favorably he places BE. He says he is not fully comfortable with the candle formation and would have preferred that formation to be located differently.

Store separately:

- `trade_taken=true`;
- `setup_quality_pre_entry/instructor_reason = degraded_or_uncertain_candle_formation`;
- `setup_validity` remains distinct from quality;
- BE management belongs to L3;
- later price path cannot relabel the original setup.

### W20-E13 — Friday second NY window: upper liquidity sweep -> body structure break -> imbalance; valid missed/illustrative short

Later price takes the upper maximum / PDH-area liquidity around the second New York window (~10:00 NY / ~16:00 Spain in the narrated example).

Benjamin then shows the sequence he wants on the lower timeframe:

```text
upper liquidity taken
-> bearish impulse
-> structure change
-> imbalance
-> retracement/reaction
-> short candidate
```

He explicitly warns that the structure change should be **with candle body**, not merely a wick, because wick-only entries produce many stops.

If price does not return to the initially desired imbalance, he says not to chase the exact perfect price. One alternative is:

```text
wait for body-confirmed structure change
-> use the first later imbalance that is mitigated and reacts
```

This is an instructor-supported alternative activation path, not permission to market-chase.

## Week 20 — quantitative rule additions / refinements

### 1. Primary context liquidity vs LTF activation liquidity

Benjamin ends the lesson by recommending that high-probability liquidity points be located primarily on **1H or, at minimum, 15m**. He warns that lower-timeframe maxima/minima can react but often do not create enough reaction for a trade.

This does **not** mean 1m/5m liquidity is useless: the course repeatedly uses lower-timeframe liquidity for activation after HTF context is already established.

Therefore split the object:

```text
context_liquidity
activation_liquidity
```

Store:

```text
liquidity_role ∈ {context, activation, target, unresolved}
liquidity_tf_minutes
liquidity_named_reference
liquidity_structural_relevance
higher_tf_context_liquidity_present
```

Candidate diagnostic:

```text
micro_liquidity_only =
    liquidity_tf_minutes < 15
    AND not liquidity_named_reference
    AND not higher_tf_context_liquidity_present
```

Week 20 supports downgrading `micro_liquidity_only` as a standalone context source. It does **not** freeze a universal `tf >= 15m` veto for activation.

### 2. Strong explicit structure rule: body break is different from wick-only violation

Week 20 provides direct instructor language:

```text
body_structure_break_candidate =
    directional_close_crosses_reference

wick_only_violation =
    directional_extreme_crosses_reference
    AND directional_close_does_not_cross_reference
```

Store:

```text
structure_break_by_close
structure_break_penetration_atr
structure_break_close_penetration_atr
structure_break_body_ratio
structure_break_close_location
impulse_created_imbalance
```

No numeric close-penetration/body-ratio threshold is frozen yet, but `wick_only_violation` must not be treated as equivalent to the instructor's preferred body-confirmed break.

### 3. First imbalance after a violent/news move is not automatically the entry imbalance

Thursday gives paired negative/positive evidence.

Store every candidate imbalance after the same impulse:

```text
imbalance_sequence_index
liquidity_collected_before_imbalance
candle_formation_confirmed
structure_change_confirmed
local_opposing_liquidity_present
clean_before_retrace
mitigation_time
reaction_after_mitigation
```

Candidate ranking logic:

```text
entry_imbalance_candidate =
    imbalance_created
    AND valid_context
    AND acceptable_liquidity_sequence
    AND acceptable_candle_formation
```

The exact meaning of `acceptable_*` remains label-calibration work; no P&L threshold is inserted.

### 4. Missed ideal entry must not create FOMO / chase

Friday provides a practical alternative when price does not return to the desired imbalance:

```text
if original_entry_zone_not_retraced:
    do_not_chase_market
    wait_for fresh body_structure_break
    then evaluate first_new_imbalance_mitigation_reaction
```

Store:

```text
original_entry_zone_retraced
chase_attempted
fresh_structure_reference_id
fresh_structure_break_by_close
fresh_imbalance_id
fresh_imbalance_first_touch_time
fresh_imbalance_reaction_confirmed
```

### 5. Higher-timeframe continuation after an out-of-time/missed micro setup is a separate family

Wednesday suggests that Benjamin may move from 1m to 2m/3m/5m and execute a continuation if the original micro event already occurred but the directional thesis remains intact.

Store:

```text
original_activation_time_eligible
original_activation_missed
directional_thesis_still_valid
higher_tf_execution_tf
higher_tf_fresh_imbalance
target_liquidity_still_available
continuation_entry_taken
```

Do not merge this with the original LTF setup. Current label: **conditional candidate family**, not frozen baseline.

### 6. News affects both eligibility and execution/management

For open positions:

```text
relevant_news_imminent
minutes_to_news
favorable_progress_before_news
be_available_before_news
news_be_protection_used
```

Candidate management state:

```text
if trade_open
and relevant_news_imminent
and favorable_progress_allows_BE:
    news_protection_candidate = true
```

Week 20 supports protection; exact time threshold for open trades remains unresolved.

### 7. Stop distance is volatility/structure dependent, not a fixed-pip validity rule

Post-news Wednesday Benjamin accepts a materially wider stop because volatility has expanded.

Store:

```text
stop_distance_pips
stop_distance_atr
news_volatility_state
structure_invalidation_distance_atr
initial_RR
nearest_meaningful_target_R
```

A wider stop is acceptable only as an execution decision if structural invalidation and available reward still make sense. Do not encode a fixed-pip stop filter.

### 8. Stagnation-management evidence strengthened

Week 20 independently repeats the Week-19 logic that roughly two hours of accumulation with little progress can justify exiting near neutral.

Keep:

```text
stall_duration_minutes
net_progress_atr_since_fill
MFE_R_since_fill
overlap_ratio_since_fill
new_opposing_liquidity_count
near_neutral_exit_available
```

Candidate:

```text
stall_exit_candidate =
    prolonged_stall
    AND weak_follow_through
    AND near_neutral_exit_available
```

If new opposing liquidity is created, confidence in the exit candidate increases. The observed ~2h examples are not yet a universal timeout.

### 9. Strategy detector and execution policy must be separate

Benjamin explicitly says two traders using the same strategy can end differently because of:

- entry price;
- reaction timing;
- BE timing;
- target choice;
- emotional/manual exit.

Therefore future backtesting must expose separate versions:

```text
setup_detector_version
execution_model_version
management_model_version
```

The market setup must not be redefined to make one execution variant look better.

### 10. Second New York window remains a probability hypothesis, not a frozen edge

Benjamin says the second NY window has recently produced useful impulses/trades, especially during this slow week.

Store:

```text
ny_subwindow_id
minutes_from_ny_open
first_window_blocked_by_news
second_window_candidate
```

Do not hard-code superiority from this week's outcomes.

### 11. Holiday baseline strengthened

Current conservative Benjamin-replication baseline remains:

```text
if USD_US_holiday:
    baseline_trade_eligible = false
```

Week 20 mentions a possible very-clear-London exception, but this should be encoded only as a separate discretionary exception flag until repeated evidence defines it.

## Correlation / independence controls

- Monday/Tuesday are explicit no-trade days and remain in the corpus.
- Wednesday E04–E08 are one evolving market day; the short, news event, later long and management are correlated.
- Thursday rejected and accepted imbalances are deliberately paired contrast examples from the same underlying move; do not treat them as independent samples.
- Friday first short and later second-window short are same-day correlated candidates.
- Multiple imbalance/stop/target variants shown for one move are execution variants, not independent market setups.

## Unresolved before final v2 closure

- exact market dates and historical Spain/NY/DST mapping;
- exact OHLC/ATR values for body breaks, impulses, retracements and stop distances;
- synchronized DXY state;
- precise rule boundary for the higher-TF continuation family after missed/out-of-time activation;
- exact classification of Friday's first short as valid-lower-quality vs discretionary;
- exact open-trade news-protection timing;
- exact generality of the H1/15m liquidity recommendation versus named/session liquidity exceptions;
- exact fill/spread/slippage, MFE/MAE and realized R;
- final exhaustive event screenshot index.

No unresolved field is guessed.

## Current gate

- full transcript reviewed chronologically: **PASS**;
- full-video dense visual coverage available: **PASS**;
- major event dense checks: **PASS**;
- positive + negative/no-trade inventory: **PASS (provisional)**;
- impulse vs displacement separated: **PASS**;
- L0/L1 vs L2/L3 separated: **PASS**;
- setup detector vs execution/management separated: **PASS**;
- mathematical variables/rules extracted: **PASS**;
- final exhaustive event screenshot index / closure audit: **PENDING**;
- exact OHLC reconstruction: **PENDING**.

**Week 20 is not marked COMPLETE yet.**
