# 14 Trades Semanales Explicados — Semana 7

Status: **COMPLETE — v2 measurement gate passed**

## Evidence reviewed

- Full source duration: ~42m18s (`2537.9 s`).
- 377 timestamped transcript segments reviewed chronologically.
- Dense visual evidence generated and reviewed from the original source:
  - 1 fps baseline across the chart-review body (~185–2500 s): 2,313 frames before contact-sheet consolidation.
  - 2 fps focus evidence across entry/drawing/management intervals: 3,184 frames before contact-sheet consolidation.
- Visual review was cross-checked against the transcript for Monday London/New York, Tuesday, Wednesday London/New York, Thursday and Friday examples.
- Evidence is used to reconstruct Benjamin's decisions, not to optimize thresholds against trade outcome.

## v2 separation

The labels below preserve the architecture:

- **L0 — context:** session, HTF location/liquidity, Asia/PDH/PDL/PWH/PWL and other pre-existing context.
- **L1 — activation:** liquidity event, candle formation, impulse, imbalance and structure evidence known before a candidate entry.
- **L2 — execution/management:** limit versus confirmation-candle execution, stop placement and later stop adjustment.
- **L3 — outcome:** 3R, BE, stop or later path. L3 is recorded but never used to retroactively validate L0/L1.

No numeric detector threshold is frozen from this week.

## Chronological trade / no-trade inventory

### 1. Monday London — Asia-low liquidation -> confirmation -> long candidate (~197–638 s)

**L0 — instructor-explicit + visual-confirmed.** Benjamin begins with the pre-existing liquidity map and says he wants the Asia minimum liquidated before looking for continuation. Around ~296–313 s, London opens and price liquidates the Asia low.

**L1.** Around ~320–394 s he describes the confirmation set as structure change, impulse/imbalance and candle formation. Critically, he does **not** state that all three are universally mandatory. He says a trader may demand all three, but that a setup can be taken with fewer confirmations at lower confidence/risk. This reinforces the prior course distinction between setup eligibility and setup quality rather than replacing it.

Around ~418–432 s he marks the post-liquidation impulse/imbalance entry area. The dense visual evidence confirms that the POI/imbalance is being identified after the sharp reaction from the low rather than selected because of the later 3R outcome.

**Execution refinement.** Around ~456–571 s Benjamin rejects/avoids one direct interpretation because the candle formation is not sufficiently clean for him and then waits for a one-minute directional confirmation. At ~537–571 s he describes the bullish confirmation candle as taking the nearby lows and rejecting the area. The sequence is therefore:

```text
Asia low taken in London
-> reaction / impulse
-> imbalance / structure context
-> retracement into entry area
-> directional candle confirmation
-> entry candidate
```

**L3 only.** Around ~585–638 s he shows that the trade would have delivered ~3R and potentially more. This outcome is not part of the entry label.

**Measurement consequence:** create separate fields for `direct_imbalance_entry_eligible`, `confirmation_candle_used` and `pre_entry_quality`. The confirmation candle is an execution/filter choice, not proof that the underlying POI did not exist before it.

### 2. Monday alternate execution / confirmation-filter example (~667–818 s)

Benjamin again treats nearby structure as confluence rather than a universally mandatory root condition (~667–675 s). He explicitly recommends waiting for a reaction/confirmation around ~697–719 s and says that if price simply continues lower without producing the desired candle, **do not enter**; that can avoid a losing limit order.

He contrasts direct limit execution with waiting for evidence after the zone is touched (~786–818 s). This is strong evidence that execution mode must be backtested separately from setup validity.

Store:

```text
same_pre_entry_setup_family
execution_variant_A = direct_limit
execution_variant_B = wait_for_directional_candle
```

Do not use the later outcome to decide retroactively which variant was "the valid setup".

### 3. Monday New York — bad initial formation -> later structural/imbalance candidate (~850–1041 s)

At ~850–869 s Benjamin rejects the first apparent opportunity: there is movement/impulse but the candle formation is poor and he says there is no reason to enter there.

Around ~869–929 s he instead waits for a clearer structure/imbalance sequence, liquidity/inducement and reaction in the valid session. This is a first-class negative example:

```text
movement alone != entry
impulse without acceptable contextual confirmation != automatic entry
```

Around ~995–1031 s he explicitly revisits the confirmation framework. The three elements discussed are structure, candle formation and impulse+imbalance; he says more confirmations give more confluence/probability and entries can be made with two or three. This weekly example independently supports the Module 11/12 hierarchy while showing that the confirmation count is a **quality/risk dimension**, not a binary outcome-derived label.

Unresolved: Benjamin verbally attaches illustrative probabilities to different confirmation counts earlier in the lesson but explicitly says he is inventing the numbers. Those percentages are **not data** and must never enter the backtest.

### 4. Tuesday — wait for PDL; direct limit would stop, confirmation filter avoids it (~1062–1641 s)

**L0.** Benjamin notes that an earlier maximum was taken during Frankfurt, but he does not treat that event alone as sufficient. Around ~1110–1128 s he rejects a nearby lower-quality POI/OB and waits for PDL because the earlier level lacks clear inducement / candle quality and sits next to the more important liquidity.

**L1.** After PDL/context is resolved, around ~1199–1245 s he acknowledges useful candle formation + impulse + imbalance. He calls the structure break relatively mediocre/unclear but still considers a candidate because the rest of the context is strong. This is direct evidence for:

```text
HTF/liquidity/location + strong LTF evidence
can remain eligible when structure quality is weaker
```

It does **not** imply structure never matters; it changes quality/confluence.

**Execution counterfactual.** Around ~1245–1281 s Benjamin shows that a direct limit in the first area would have been stopped, while waiting for a bullish confirmation/reaction like Monday would have avoided that stop. This is particularly important for our v2 architecture: the post-touch confirmation rule belongs to **L2 execution/filtering**, and must be compared against the same pre-entry L0/L1 setup.

A later, clearer structure/imbalance sequence appears around ~1281–1499 s. Benjamin repeatedly evaluates several available imbalances and warns that one cannot know in advance which imbalance price will revisit. Therefore no single retrospective "correct FVG" may be selected from this example merely because it worked.

**Management / L3.** Around ~1528–1640 s he discusses moving to BE after substantial favorable movement/new structure. The reviewed path ultimately returns to BE rather than 3R. His explicit preference is preserving capital over leaving the original full stop indefinitely. This strengthens dynamic-management research but still supplies no universal numeric BE threshold.

### 5. Wednesday London — no trade while waiting for PDL (~1641–1858 s)

Benjamin says he waited for PDL and did not take the London move because the liquidity he wanted was not reached. He uses the sequence to explain internal/external liquidity around ~1788–1848 s: intermediate/internal liquidity can be taken before price continues toward an external range objective.

This is an important no-trade label:

```text
price moved in expected direction
BUT required/preferred liquidity condition was not satisfied
=> no Benjamin trade
```

The subsequent favorable movement must not be used to rewrite the decision as a missed valid entry.

### 6. Wednesday New York — news-aware confirmation -> short candidate (~1875–2137 s)

**L0/L1.** Around ~1937–1968 s Benjamin says the first imbalance is risky and rejects an earlier candidate because structure is not clearly broken / candle formation is insufficient and a news event has just occurred. He waits for the next confirmation instead of treating the news impulse itself as permission to enter.

After the additional bearish formation, around ~1969–2023 s he identifies the break of nearby lows and a usable entry/imbalance. Dense evidence shows the marked structure/levels first and the imbalance/entry region being drawn after the bearish decision move.

**L2.** He describes two execution possibilities: an aggressive entry near candle close when the directional candle is nearly completed, or waiting for the imbalance/retrace. These must be separate execution variants, because their fill price and stop distance differ.

**Management.** Around ~2055–2128 s he advocates reducing the stop substantially after new lows/structure are broken. He emphasizes reducing capital at risk quickly; later BE is preferred to a full original stop if the market reverses.

**Unresolved:** exact numerical condition for moving the stop is still discretionary/structural. Do not turn the example's pip distances into a universal rule.

### 7. Thursday London / New York — required Asia liquidity not reached; no clear trade (~2142–2291 s)

Benjamin says he wanted at least the nearby minimum/Asia liquidity taken and did not see a clear trade when price reacted without doing so (~2163–2219 s). Lower-timeframe structure/candle evidence later exists, but he still describes the situation as unclear and not something he took.

This reinforces the hierarchy:

```text
small LTF confirmation
cannot automatically compensate for missing/rejected higher-priority liquidity condition
```

The day is retained as a negative/no-trade example, not removed because another LTF pattern could be drawn afterward.

### 8. Friday — actual PDH short loses; failure attributed to context that could have been read better, not relabeled as impossible setup (~2312–2500 s)

Benjamin explicitly says he took a stop around PDH. Around ~2345–2357 s he describes the initial reasons: PDH is attacked with force, a local high is liquidated and a good bearish candle formation appears; he enters around that formation.

He then diagnoses what could have been improved: the broader liquidity path was toward external liquidity / PWH, PDH had already been interacted with multiple times and the market did not meaningfully reject it. Around ~2424–2470 s he explains that repeated PDH liquidation without reaction reduced its importance for the reversal thesis.

This is important calibration evidence because the actual loss remains a real trade. It must be labeled:

```text
instructor_trade = true
outcome = loss
pre_entry_quality = downgradable from context evidence
setup_invalid_because_it_lost = false
```

This example supplies candidate L0 features for future measurement: `liquidity_level_prior_sweep_count`, `reaction_strength_after_prior_sweeps`, `higher_priority_external_liquidity_remaining`, and whether the proposed reversal points against the current external-liquidity draw. Thresholds remain unresolved.

## Week 7 evidence-supported methodological findings

### A. Setup validity, setup quality and execution mode are distinct

Week 7 repeatedly contains the same contextual idea with different execution choices. Benjamin can regard an area as meaningful while preferring a confirmation candle to avoid a blind limit. Therefore the backtest must not collapse:

```text
setup_validity
pre_entry_quality
execution_variant
outcome
```

into one label.

### B. Confirmation count is not a literal probability formula

Benjamin repeatedly discusses structure, impulse+imbalance and candle formation, and says two or three confirmations can be used. More confluence is treated as better quality. Any numerical probability examples he gives in this discussion are illustrative, not measured estimates.

Do **not** encode `2 confirmations = X%` or `3 confirmations = Y%`.

### C. Structure is important but often additive/confluence rather than universally mandatory

Week 7 contains both clear-structure and mediocre-structure examples. Strong location/liquidity plus impulse/imbalance/candle evidence can remain interesting even when the structure break is less clean. This matches Module 12 and resolves the apparent conflict with a rigid "structure always required" interpretation.

### D. Confirmation candle is a real execution/filter variable

Two explicit examples contrast blind/direct limit entry with waiting for a directional reaction candle; Benjamin says the latter can avoid stops. This deserves an independent backtest after the Benjamin baseline is frozen:

- same L0/L1 setup;
- direct limit execution;
- confirmation-candle execution;
- compare fill rate, average entry, stop distance, missed trades, MAE/MFE and expectancy.

No P&L comparison is performed while learning the rule.

### E. Repeatedly swept liquidity can lose reversal relevance

The Friday losing trade supplies evidence that merely touching/taking a named level such as PDH is not enough. Repeated prior interaction without meaningful rejection and a stronger external draw can downgrade the reversal thesis. This is a candidate contextual feature, not yet a fixed numeric rule.

### F. Dynamic stop management remains structural, not fixed-R

Benjamin repeatedly moves/proposes moving stop/BE after favorable structure/liquidity progress. Week 7 strengthens the hypothesis that management is event-driven rather than a single universal `move_to_BE_at_XR` rule.

## v2 machine-measurement additions from Week 7

Retain/add these fields for subsequent OHLC reconstruction:

- `confirmation_count_pre_entry`
- `confirmation_components_pre_entry`
- `structure_quality_label_instructor`
- `direct_limit_candidate`
- `directional_confirmation_required_or_preferred`
- `confirmation_candle_event_time`, `confirmation_candle_known_time`
- `blind_limit_would_fill`
- `confirmation_variant_would_fill`
- `candidate_imbalance_count_at_decision`
- `selected_imbalance_rule_known_pre_entry`
- `liquidity_level_prior_sweep_count`
- `reaction_after_prior_sweep_available_pre_entry`
- `higher_priority_external_liquidity_remaining`
- `trade_against_external_draw_candidate`
- `stop_management_event_type`
- `management_event_time`, `management_known_time`

Counterfactual fill/outcome variables remain L2/L3 research fields and cannot change the historical L0/L1 label.

## Unresolved / deliberately not frozen

1. No exact numeric impulse threshold.
2. No exact numeric structure-quality threshold.
3. No universal rule for which of several simultaneous imbalances is the one Benjamin will use.
4. No fixed wick/body fraction for his preferred confirmation candle.
5. No fixed number of prior sweeps after which PDH/PDL becomes irrelevant.
6. No universal numeric BE/stop-move trigger.
7. No probability percentage attached to 2 vs 3 confirmations.
8. Exact prices/ATR/spread/slippage require later synchronized OHLC reconstruction rather than reading them from video screenshots.

## Week 7 consolidated baseline

```text
L0: prioritized liquidity + HTF/location + valid session/news context
-> wait for the liquidity condition Benjamin actually requires
L1: reaction + impulse creating imbalance
-> add candle formation and/or nearby structure as confirmation/quality
-> do not force a trade when the higher-priority liquidity condition remains unresolved
L2: choose direct imbalance execution OR wait for directional confirmation
-> structural initial stop
-> adapt protection after new favorable structure/liquidity events
L3: record 3R / BE / stop separately; never use outcome to relabel L0/L1
```

Week 7 is complete under the v2 evidence gate. Week 8 is the next permissible study item.