# 14 Trades Semanales Explicados — Semana 12

Status: **COMPLETE — v2 measurement gate passed**

## Evidence reviewed

- Full source duration: ~85m42s (`5142.0 s`).
- Full timestamped transcript reviewed chronologically (~749 timestamped segments/lines).
- Dense original-source visual evidence reviewed across the full video rather than outcome-selected intervals:
  - baseline: **5,142 frames at 1 fps** before contact-sheet consolidation;
  - focus: **10,284 frames at 2 fps** before contact-sheet consolidation.
- Transcript claims were cross-checked against chart/timeframe/annotation changes in the dense evidence, including the principal Monday, Tuesday, Wednesday, Thursday and Friday examples.
- Exact OHLC, several exact prices, broker-specific spread/slippage, some precise chart-clock timestamps and exact fill assumptions remain unresolved where the source does not establish them. They are not guessed from screenshots.
- Evidence is used to reproduce Benjamin's decision process. No detector threshold is selected from later P&L.

> Audit correction: an earlier progress message reported ~57m and 3,426/6,851 dense frames for Week 12. The actual generated evidence manifest records `5142.0 s`, 5,142 baseline frames and 10,284 focus frames. This file uses the manifest values.

## v2 information separation

- **L0 — pre-setup context:** HTF direction/target, PWH/PWL/PDH/PDL and Asia/Frankfurt/session liquidity, relevant imbalance/orderblock/rejection area, scheduled news, valid time window, target-side liquidity and whether the session manipulation has already occurred.
- **L1 — activation:** required liquidity event, reaction, decisive impulse, imbalance creation, candle formation, structure change/break when present, and retracement/confirmation available before entry.
- **L2 — execution:** direct imbalance/market entry versus confirmation-candle entry, aggressive versus conservative stop, scaling, movement-level risk, BE/partial decisions and realistic friction/fill uncertainty.
- **L3 — outcome:** later stop/BE/TP path, later availability of 3R, counterfactual survival without BE and subsequent price travel. L3 never upgrades or downgrades the original L0/L1 setup.

Week 12 is especially useful for **out-of-hours false positives, session-timed liquidity, impulse-quality discrimination, instructor-discretionary exceptions, target-dominance over stale zones, valid-BE versus counterfactual-TP separation, and imbalance relevance conditional on available liquidity**.

## Chronological trade / example / no-trade inventory

### 1. Opening HTF map — do not manufacture a setup by dropping timeframes (~0:00–10:30)

**Instructor-explicit + visual-confirmed.** Benjamin begins weekly -> daily -> 4H -> normally 1H, occasionally 15m only if needed. If no meaningful area exists, the answer is not to keep dropping timeframe until something can be traded.

He also distinguishes candle/location quality before any result exists. A candle that actually removes the prior candle/liquidity has more importance than one that stops halfway. A weekly area that has held price for weeks but fails to produce forceful rejection is treated as weaker/less consistent than an area that immediately produces decisive displacement.

Pre-entry variables supported here:

```text
prior_liquidity_swept_by_reference_candle
reaction_latency / prolonged_lateralization_at_zone
htf_location_relevance
forced_lower_timeframe_search = false/avoid
```

No numerical age, rejection-strength or candle-overlap threshold is frozen.

### 2. Monday London — recognizable geometry but rejected because the required PWH/time conditions are absent (~12:50–18:00)

**Instructor-explicit + visual-confirmed.** During London price takes Asia-side liquidity but does not take the nearby PWH that Benjamin is waiting for. He does not enter. A cleaner-looking pattern appears later with imbalance, structure change and acceptable candle formation, but it occurs outside his operating time.

Benjamin explicitly warns against turning an out-of-hours winner into a new rule simply because the chart later works.

v2 labels:

```text
LTF_geometry_present = true
required_PWH_sweep = false
valid_time = false for the later pattern
setup_geometry_validity = recognizable/possible
Benjamin_plan_eligibility = false
trade_taken = false
later_result = L3 only
```

This is strong negative evidence against outcome-selected exceptions.

### 3. Monday New York — first reaction lacks the activation quality he requires (~18:00–21:00)

At the first relevant zone interaction Benjamin sees a reaction, but the impulse is mediocre and there is no convincing structure activation. He does not treat mere zone contact/reaction as enough.

```text
location_present
-> reaction_present
-> decisive_impulse = weak/absent
-> usable_structure_confirmation = absent
-> no entry yet
```

The no-trade state is known before any later explosion.

### 4. Monday New York — valid long after minimum/liquidity event + decisive impulse (~21:00–31:30)

**Instructor-explicit + visual-confirmed.** The later move supplies the missing information: price interacts with the relevant imbalance/context, removes the pertinent minimum/liquidity, then produces a forceful directional impulse, structure change and two usable imbalances.

Ordered information available before execution:

```text
HTF/session context
-> relevant minimum/liquidity becomes available
-> minimum/liquidity removed
-> reaction
-> DECISIVE IMPULSE
-> structure change / force confirmation
-> imbalance(s) created
-> retracement or confirmation-entry choice
```

**Impulse and displacement are separate.** The decisive imbalance-producing burst is the activation impulse; the broader bullish leg that continues afterward is the displacement. The later extent of that displacement is not available when the entry is chosen.

Benjamin explicitly says nobody knows in advance which of the two imbalances will hold. Therefore a backtest must not retrospectively select the one that produced the best fill.

### 5. Monday execution — direct/confirmation entry and stop depth are L2 variants, not different L1 setups (~22:00–30:30)

Benjamin demonstrates multiple legitimate execution choices over the same activation:

- direct/market or imbalance execution;
- wait for a directional confirmation candle;
- use a nearer/aggressive structural stop;
- use a deeper/conservative invalidation stop.

He also notes that waiting an unnecessary extra candle out of fear can materially worsen stop geometry. The pip examples he gives are illustrative execution geometry, **not detector thresholds**.

```text
same L0/L1 setup
-> L2_direct
-> L2_confirmation
-> L2_aggressive_stop
-> L2_conservative_stop
```

Exact broker fill, spread and slippage are unresolved and must be modeled later rather than assumed frictionless.

### 6. Monday management/scaling — valid loss versus process error remains separate (~28:00–32:00)

Benjamin explicitly distinguishes two things:

- a setup that met the strategy and later loses = normal probability;
- an out-of-hours/FOMO entry that happens to win = process error / not plan-valid.

This is one of the cleanest anti-hindsight statements in the weekly corpus.

He allows scaling only with movement-level risk control/protection of prior positions. Later scale-ins are progressively worse located and more exposed. All such tickets therefore share a `same_underlying_move_group`; they are not independent trade samples.

Management/3R discussion is retained in L2/L3 and does not calibrate the entry detector.

### 7. Tuesday London — pre-window movement without a real session impulse is a no-trade (~32:30–38:30)

The relevant Frankfurt/Asia-side movement occurs before Benjamin's preferred London manipulation window and then price simply continues lower without the kind of in-session reaction/impulse he wants. A later reaction is also outside his operating time.

This reinforces:

```text
liquidity event timing matters
continuous directional drift != qualifying activation impulse
out_of_time reaction != plan entry
```

The visual path is not relabeled because of what happens later.

### 8. Tuesday New York — contextual adaptation from failed orderblock to liquidity/minimum event (~38:30–48:30)

**Instructor-explicit + visual-confirmed.** Benjamin shows that an orderblock not respected as a reversal area can still leave useful information: once that level/minimum becomes liquidity and is subsequently removed inside the broader 4H imbalance/context, he can reassess on lower timeframe.

The first attempt around the early NY window is lower quality: structure/impulse/candle formation are not clean enough. A later sequence is materially better:

```text
4H/contextual imbalance
-> relevant minimum becomes liquidity
-> minimum swept inside valid time
-> reaction
-> decisive impulse
-> structure change
-> first usable imbalance
-> candle formation / execution opportunity
```

Benjamin says he took this later trade and describes it as a good trade with multiple factors aligned.

This is adaptation based on newly known market information, not retrospective reinterpretation of a losing orderblock.

### 9. Tuesday management — BE is the observed L2/L3 result; later hypothetical TP is only a counterfactual (~45:00–49:30)

After the trade makes favorable structural progress and clears the next relevant area, Benjamin moves the position to breakeven because the lower area has already been mitigated and he sees less reason for price to revisit the entry.

The trade later removes him at BE. Benjamin then shows that if the stop had not been moved, price eventually would have reached the intended target.

Dataset requirement:

```text
actual_execution_result = BE under Benjamin's management
counterfactual_no_BE_result = later TP would have occurred
```

The counterfactual is not allowed to retroactively label the BE decision wrong, nor can it select a looser management threshold by P&L.

### 10. Wednesday — nearby weekly external liquidity dominates stale lower-timeframe zones (~49:00–56:30)

**Instructor-explicit + visual-confirmed.** Price is travelling aggressively toward obvious weekly external liquidity. The morning manipulation has largely happened before Benjamin's trading window and London offers no attractive fresh 15m reference; later news further degrades tradability.

He warns against giving excessive weight to old 1H zones while price is clearly targeting the nearby weekly maximum. Selling immediately before that obvious external target is described as a major FOMO/error state.

Pre-entry quality fields supported:

- `higher_priority_external_target_distance`;
- `stale_zone_age/context_relevance`;
- `session_manipulation_already_consumed`;
- `approach_quality = aggressive target-seeking / poor reversal context`.

No numeric dominance threshold is frozen.

### 11. Wednesday late reaction — wick/body structure details do not rescue a choppy, already-consumed setup (~55:00–57:00)

Near the end of the valid period price finally reaches the external target. A first structure candidate is wick-based; later a body-style break appears, but the usable imbalance is already mitigated and the tape is wick-heavy/choppy.

Benjamin rejects the trade as non-optimal/invalid for his plan and warns against repeated re-entry after being stopped in this type of regime.

This is a clean no-trade where individual LTF ingredients exist but the total known-time state is poor.

### 12. Thursday London — advanced direct-break sell is Benjamin-discretionary and explicitly not a student replication rule (~57:00–68:00)

**Instructor-explicit + visual-confirmed.** After the important weekly maximum has been removed Benjamin leans toward sells/retracement. Overnight liquidity has already been taken and the session setup is not textbook. Around the London opening a maximum is removed shortly before/around the window and price then breaks lower forcefully, creating imbalance.

Benjamin explains that, based on his own experience/backtesting, he sometimes enters directly on a very strong break without waiting for the ideal candle formation/retracement. He also explicitly says he **does not recommend this execution to students** because it is easier to confuse with FOMO and is not optimal.

Correct replication labels:

```text
location/context = supportive for sell
liquidity event = present near London opening
impulse/structure break + imbalance = present
ideal candle formation / retracement = incomplete
setup_quality_pre_entry = reduced
Benjamin_personal_trade_taken = true
recommended_student_rule = false
```

This advanced exception must not be promoted into the baseline detector merely because Benjamin took it.

### 13. Thursday advanced sell management — low risk + fast BE; later BE does not determine validity (~62:00–68:00)

Because the entry is aggressive/non-optimal, Benjamin uses lower risk and protects quickly once favorable force appears. Price later reverses and removes him at BE.

Again the causal direction is preserved:

```text
known lower-quality/discretionary execution
-> reduced risk / aggressive protection
-> later BE result
```

not:

```text
BE result -> therefore setup was poor
```

Benjamin also discusses a narrow London subwindow where his backtests have performed better. That statement is stored as **instructor performance claim / candidate hypothesis only**. Per protocol, no detector time threshold is selected from P&L clustering.

### 14. Thursday New York — straight trend without manipulation/retracement is explicitly inoperable (~68:00–71:00)

A sequence of strong same-direction candles gives neither side a good plan: chasing the continuation is exposed to a retracement, while fading the move fights aggression. Benjamin wants a meaningful minimum/liquidity or imbalance manipulation first; it does not occur.

```text
trend_strength = high
manipulation/retracement prerequisite = absent
trade_taken = false
no_trade_reason = raw continuation / no usable setup
```

### 15. Friday early London — buy idea exists but its pre-entry quality is lower (~71:00–75:30)

After the weekly maximum was removed, Benjamin's broader preference is still more pro-sell/retracement. Price nevertheless creates an Asia minimum and interacts with an unmitigated 1H imbalance, so buys are not forbidden if a real setup appears.

An initial reaction begins just before the desired London timing. Benjamin says the idea is possible, but lower quality because the relevant Frankfurt minimum itself may still be liquidity and because the broader context makes a long more aggressive.

This remains a `validity/quality` distinction before result:

```text
possible long thesis = true
pre_entry_quality = reduced
reason = broader sell bias + Frankfurt low not yet removed + early timing
```

### 16. Friday London — quality improves after Frankfurt minimum is actually swept (~75:00–80:30)

**Instructor-explicit + visual-confirmed.** Once the Frankfurt minimum is removed, the later London sequence is much cleaner:

```text
unmitigated 1H imbalance/context
-> Frankfurt minimum / liquidity swept
-> valid London time
-> reaction
-> decisive bullish impulse
-> structure change with force
-> first/second imbalance
-> candle formation
-> direct or confirmation execution
```

Benjamin emphasizes that the *quality of the break* — force, timing and the imbalance it creates — matters more than merely pointing to a structure line.

Impulse remains separate from the larger displacement: the first forceful imbalance-producing move is the L1 impulse; the later launch/continuation is the displacement and L3 path.

Conservative protection is placed beyond the meaningful structural/minimum invalidation rather than at an arbitrary fixed pip distance. Exact fill and spread remain unresolved.

### 17. Friday scaling/management — later entries degrade, and imbalance is secondary to available max/min liquidity (~77:00–83:45)

Benjamin again warns that the farther a trader joins after the original move, the more exposed the stop and the worse the entry geometry becomes. This supports `approach/chase_quality` and `distance/time_since_impulse` as outcome-blind fields.

He later moves to BE after a meaningful maximum is broken with force and says he does not keep chasing price with the stop once BE is set.

Most importantly, Benjamin explicitly states that his **principal objectives are maxima/minima**. An imbalance gains relevance when a meaningful available maximum/minimum/liquidity is associated with it; otherwise it is secondary confluence.

Candidate representation:

```text
primary_target_reference = meaningful max/min liquidity
imbalance_near_available_liquidity = added confluence
imbalance_without_relevant_liquidity = lower standalone importance
```

This is evidence-supported hierarchy, not a numeric weight.

The shown immediate path does not necessarily deliver 3R. That later result does not alter the original Friday setup quality.

### 18. Friday late short at Asia high — interesting location but outside time, therefore no trade (~83:45–84:15)

Price eventually reaches the Asia-high area where a short might otherwise be interesting, but Benjamin notes that it is already outside his permitted time. No counterfactual winner is added to the sample.

### 19. Closing weekly assessment — Monday/Tuesday strong; Wednesday/Thursday poor; Friday possible but risk-adjusted (~84:15–85:42)

Benjamin summarizes Monday and Tuesday as good/book-style opportunities, Wednesday as poor, Thursday as degraded by the week's conditions/news, and Friday's long as possible but more aggressive because his principal scenario was still sell / price was already high.

He says that when confidence/quality is lower, risk can be reduced. This is an execution/risk overlay; it must not be used to tune the market detector from eventual P&L.

The final uncertainty statement is explicit: once in a trade, the only thing directly controlled is planned loss/risk; the future path is probabilistic.

## Week 12 evidence-supported methodological findings

### A. Out-of-hours profitable geometry is not strategy-valid merely because it wins

Monday gives explicit anti-overfitting evidence: imbalance + structure + candle geometry can appear and later work, yet remain a no-trade because required liquidity/timing conditions were absent. Outcome cannot create a new exception.

### B. Liquidity timing is part of the event, not just the level identity

A PWH/Asia/Frankfurt/PDH-type level taken before the intended session does not carry the same meaning as the same liquidity event occurring during the active manipulation window. Record both `event_time` and `known_time`.

### C. Impulse quality is distinct from both generic reaction and later displacement

Monday, Tuesday and Friday show the same hierarchy: zone contact/reaction alone may be insufficient; the decisive force that creates usable imbalance is the activation impulse; the larger continuation after entry is displacement/outcome path.

### D. Setup validity, plan eligibility, pre-entry quality, trade-taken and result require separate labels

Week 12 contains all combinations: recognizable geometry that is plan-ineligible, a good trade that ends BE, an advanced Benjamin trade he does not recommend students replicate, a risky-but-possible Friday long, and multiple no-trades. Collapsing these into win/loss would destroy the instructor model.

### E. A later counterfactual TP cannot override actual management

Tuesday is explicit: Benjamin's executed management reaches BE; the chart later would have reached TP without that BE. Store both, but the counterfactual is not an observed strategy result and cannot tune BE policy by hindsight.

### F. Higher-priority external target can dominate stale lower-timeframe zones

Wednesday strengthens the target-side hierarchy: when price is aggressively approaching obvious weekly external liquidity, old 1H reversal references lose contextual weight. Measure target proximity, zone freshness and approach quality without freezing thresholds.

### G. Instructor-discretionary exceptions must be isolated from the baseline replication rule

Thursday's immediate strong-break sell is based on Benjamin's personal experience/backtesting and is explicitly not recommended to students. It belongs in an `instructor_discretionary_exception` class, not the baseline detector.

### H. Instructor performance claims do not license P&L-selected thresholds

Benjamin's comments about a narrower high-performing London time band are retained as hypotheses for outcome-blind measurement. The detector will not adopt that time boundary because historical winners clustered there.

### I. Imbalance relevance is conditional/contextual; maxima/minima/liquidity remain primary

Friday makes the hierarchy explicit: meaningful available maxima/minima are the principal draw/target; an imbalance is stronger when linked to such liquidity and is otherwise secondary confluence.

### J. Raw trend continuation without manipulation can be a first-class no-trade state

Thursday New York provides explicit negative evidence: several strong same-direction candles do not automatically create a continuation entry. Without retracement/manipulation/liquidity event, Benjamin considers the state inoperable.

### K. Scaled entries remain correlated and late scaling degrades entry geometry

All scale-ins on one movement share the same underlying group. Time/distance from original impulse, stop exposure and remaining target geometry are pre-entry quality variables for each L2 entry variant.

## v2 ordered-event / known-time requirements reinforced

For each main Week 12 sample, future reconstruction should preserve at minimum:

```text
context_known_time
relevant_liquidity_reference_known_time
liquidity_event_time
reaction_known_time
impulse_start / impulse_known_time
imbalance_created_time
structure_event_time (if present)
retracement / confirmation_known_time
entry_decision_time
order_submission_time / assumed fill model
management_event_time(s)
outcome_time(s)
```

If exact chart-clock time cannot be reconstructed from source/OHLC, store video-source time plus `market_time=unresolved`; never infer precision from contact sheets.

## Execution / fill realism

- Direct versus confirmation entries are separate L2 hypotheses over one L1 activation.
- Multiple imbalances created by one impulse are alternatives; do not hindsight-select the deepest/best one.
- Conservative and aggressive stop references must be tested separately.
- Spread, slippage, limit-touch fill and intra-candle ordering are unresolved where the source does not prove them.
- Multiple tickets from one movement share `same_underlying_move_group` and must not inflate independent sample count.
- Tuesday's later counterfactual target is not an actual fill/result under Benjamin's observed BE management.

## Unresolved / not frozen

- Exact OHLC reconstruction and exact broker fills/spread/slippage.
- Numerical definition of decisive/mediocre impulse.
- Numerical freshness/age limit for stale HTF zones.
- Numerical maximum distance to higher-priority external liquidity before a reversal setup is vetoed.
- Exact time boundaries for any claimed high-probability London subwindow; no P&L-selected cutoff is accepted.
- Exact geometry threshold separating a valid body/force structure break from marginal wick noise.
- Exact chase/late-entry threshold after the original impulse.
- Exact weight of imbalance when associated with a meaningful max/min versus standalone.

These remain measurement/calibration questions and are not guessed from Week 12 outcomes.

## Completeness gate

Week 12 passes the v2 gate because:

- the source transcript was reviewed chronologically;
- dense visual coverage spans the complete source video rather than outcome-selected clips;
- every principal trade/example/no-trade is represented;
- L0/L1 information is separated from L2 execution and L3 result;
- impulse and displacement are not conflated;
- known-time/event ordering is preserved where evidence supports it;
- approach quality and higher-priority target context are recorded ex ante;
- validity, pre-entry quality, Benjamin trade-taken status and result remain separate;
- realistic order/fill uncertainty is retained;
- correlated scale-ins are grouped rather than double-counted;
- unresolved fields remain unresolved;
- no detector threshold is chosen from P&L or later outcome.

**Week 12 status: COMPLETE — safe to proceed to Week 13 in published order.**
