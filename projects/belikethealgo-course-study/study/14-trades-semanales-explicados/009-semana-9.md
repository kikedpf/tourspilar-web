# 14 Trades Semanales Explicados — Semana 9

Status: **COMPLETE — v2 measurement gate passed**

## Evidence reviewed

- Full source duration: ~35m35s (`2134.8 s`).
- 322 timestamped transcript segments reviewed chronologically.
- Dense original-source visual evidence reviewed:
  - 1 fps baseline: 1,976 extracted frames before contact-sheet consolidation.
  - 2 fps focus evidence: 3,693 extracted frames before contact-sheet consolidation.
- Dense chart evidence was cross-checked against the transcript for Tuesday through Friday, including no-trade sequences, member/hypothetical trades, Benjamin's actual trades, entry variants and management examples.
- Monday is explicitly excluded by Benjamin because it was a holiday; the ASR rendered this word inconsistently, but the surrounding context is unambiguous.
- Exact OHLC, spread, slippage and some execution prices remain `pending_ohlc_reconstruction`; they are not guessed from screenshots.
- Evidence is used to reproduce Benjamin's decision process. No detector threshold is selected from later P&L.

## v2 separation

- **L0 — context:** HTF location/direction, Daily zone, PDH/PDL, Asia range, Frankfurt/London/New York timing, news and unresolved external/internal liquidity.
- **L1 — activation:** liquidity event, reaction, impulse, imbalance, candle formation and nearby structure known before entry.
- **L2 — execution/management:** direct imbalance entry versus confirmation candle, stop geometry, partials and BE/protection changes.
- **L3 — outcome:** stop, BE, 3R or later path. L3 never changes historical L0/L1 validity/quality labels.

Week 9 is especially useful because Benjamin repeatedly distinguishes **a setup being inside the strategy** from **the setup being clear/high probability** and from **the trade later winning or losing**.

## Chronological trade / no-trade inventory

### 1. Week-level context — holiday + dense news schedule + unclear market = reduce participation (~0–143 s)

**Instructor-explicit.** Benjamin opens by calling the week difficult, with many important news events and Monday a holiday. He says some possible trades were inside the method but were not clear/easy/high-probability. He explicitly normalizes not trading when the market does not look clean.

Operational separation:

```text
strategy_compatible_candidate != high_quality_candidate
high_news_density / unclear_market = quality/risk context
no clear setup = acceptable no-trade
```

This is not evidence for a numeric weekly-news threshold. It is evidence that market clarity and calendar context are first-class pre-entry fields rather than excuses invented after losses.

### 2. Tuesday London — apparent bearish setup rejected because EUR/USD never takes PDH (~159–219 s)

**Instructor-explicit + visual-confirmed.** Benjamin says he did not sell around the open because price stopped roughly a pip short of PDH and created an odd double-support/ranging sequence. An apparent bearish opportunity existed, but the required liquidity event had not occurred.

This independently reinforces the Week-1 rule:

```text
expected direction / apparent LTF setup
BUT required EURUSD liquidity not taken
=> Benjamin does not enter
```

The later decline is L3 and must not be used to relabel the skipped entry as a mistake.

### 3. Tuesday New York — strategy-compatible short, but Benjamin downgrades it and does not take it (~221–496 s)

Benjamin discusses a zone that a student/colleague traded. The POI has a rejection-wick character and inducement, and a local maximum is later taken before a retrace in the New York window. He nevertheless calls the sale unclear/overly aggressive because:

- the relevant zone/liquidity interaction occurred before his intended time rather than naturally resolving into the session;
- the preceding bullish impulse was strong;
- price took a long time to retrace;
- Benjamin personally still wanted PDH to be taken before committing to the bearish idea.

He says the trade is **valid for the strategy** but not clear/high quality. This is strong v2 evidence for keeping these labels separate:

- `setup_validity = valid/compatible`
- `setup_quality_pre_entry = downgraded`
- `Benjamin_trade_taken = false`
- later outcome remains L3.

### 4. Tuesday confirmation/execution discussion — structure can be distant; do not collapse all confirmations into one trigger (~313–408 s)

Benjamin reiterates that the ideal combination can include structure break, candle formation and imbalance, with an extra confirmation/pause candle at the imbalance when available. If the formal structure reference is far away, he allows a more aggressive candidate based on the local reaction/behavior, but explicitly calls it riskier than waiting for all confluences.

He says he increasingly likes seeing at least a pause/reaction candle when price reaches the imbalance before executing. Stop and target geometry depend on the chosen execution; ~3R remains a baseline management reference.

Measurement consequence:

```text
formal_structure_distance = separate variable
impulse + imbalance = separate activation evidence
confirmation/pause candle = execution/confidence refinement
aggressive execution != redefinition of the setup
```

No universal confirmation-candle shape is frozen.

### 5. Tuesday unresolved Asia-side liquidity creates directional conflict (~428–489 s)

Benjamin notes that Asia high had already been taken while Asia low remained untouched. That makes a prospective long difficult because unresolved opposite-side Asia liquidity remains available below. He therefore keeps the day in a low-clarity state rather than forcing the directional idea.

Add/retain:

- `asia_upper_resolved`
- `asia_lower_resolved`
- `opposing_session_liquidity_unresolved`
- `directional_liquidity_conflict`

This remains contextual rather than a universal absolute veto until calibrated across held-out weeks.

### 6. Wednesday London — attractive HTF/POI idea rejected because opening action is noisy and has no clear impulse/imbalance (~506–665 s)

**Strong no-trade evidence.** Benjamin starts with a bearish Daily/HTF context and a rejection-block area above Asia. Asia is liquidated and price reaches the area close to London, but he does not enter because the lower-timeframe action is heavily mitigated/noisy, lacks a clear impulse and lacks a clean imbalance.

He explicitly says that if London has been open for roughly half an hour to nearly an hour and price remains slow/ranging in the same area, the trader should be willing to leave rather than manufacture a setup.

Dense visuals support the described range/noise state and later delayed movement.

Candidate fields:

- `minutes_since_session_open`
- `session_open_range_compression`
- `post_liquidity_overlap/noise`
- `clear_impulse_present`
- `clean_entry_imbalance_present`

No numeric “half-hour = always quit” rule is frozen yet; this is an instructor quality heuristic to validate across the corpus.

### 7. Wednesday late candidate — POI touch at ~10:33, first entry possibility ~10:41: too late / wide / weak (~665–891 s)

Benjamin says the zone is touched around 10:33 and the first possible entry arrives around 10:41. He dislikes it because the session is already ending for his preferred window, the protective stop would be relatively wide if it covers the relevant maximum, and the sequence did not create an attractive setup.

This reinforces `maximum_lateness/chase` as an L0/L1 execution gate and confirms that the same geometric zone can become non-actionable because information arrives too late.

New York later contains red news and no clean setup; PDH is eventually taken outside Benjamin's valid time. The later PDH event is not retroactively an entry.

### 8. Thursday London — pre-session POI touch invalidates Benjamin's interest in that exact zone (~1030–1118 s)

Benjamin marks a small induced orderblock/area linked to Asia, but price touches it before Frankfurt/opening time. He explicitly discards it and instead waits for fresh liquidity resolution/confirmation closer to the session.

Operationally:

```text
POI_interacted_before_valid_time = true
clean_session_POI_interest = false for that exact area
wait_for_new_liquidity_event / new confirmation
```

This is distinct from saying every old zone is mathematically invalid forever; it records Benjamin's actual session logic.

### 9. Thursday pre-London candidate — liquidity taken but no reaction/confirmation; no entry (~1118–1165 s)

After a local minimum is taken before Frankfurt/London, Benjamin describes how one could monitor the imbalance, but price provides no useful reaction/confirmation and simply drops with wick-heavy behavior. He waits for the next liquidity event closer to London.

This is another clean negative example:

```text
liquidity_event = true
imbalance_area exists
BUT reaction/confirmation absent
=> no entry
```

### 10. Thursday London — strong impulse after Frankfurt liquidity, multiple imbalances, timeframe selection and entry trade-off (~1165–1408 s)

Near London price takes the next/Frankfurt liquidity and then produces a much stronger impulse. Benjamin explicitly contrasts it with the previous weaker move. Dense evidence shows the sharp directional expansion and subsequent discussion of multiple nested imbalances.

He checks 1m/2m/3m because one-minute price leaves several imbalances. He prefers price to retrace at least toward the larger/more meaningful imbalance rather than blindly using the first tiny one, while acknowledging that waiting too deep may miss the trade.

This strengthens the need to measure, not hard-code:

- `impulse_event` separately from full-segment displacement;
- number and nesting of imbalances created in the impulse;
- imbalance timeframe;
- imbalance relative size/context;
- retracement depth requested versus actually available;
- `missed_trade_risk` as an execution consequence, not a setup label.

### 11. Thursday London — vertical impulse with no internal liquidity: first pullback may become inducement (~1408–1545 s)

**Important methodological finding.** Benjamin explains that after a nearly vertical rise, there is effectively no internal liquidity generated behind price. Therefore the first apparent pullback/low can itself become inducement: traders entering immediately with a stop below that first wick can be swept before continuation.

He highlights a later candle that collects that liquidity and treats its low as more meaningful/protected because the candle **did something** — it removed the prior liquidity. He then shows possible continuation entries from later imbalances/reactions.

This is strong evidence that “approach/formation quality” must include liquidity generated **inside the move**, not merely target-side liquidity.

Candidate sequence:

```text
vertical impulse
-> little/no internal liquidity behind price
-> first pullback creates internal liquidity / inducement candidate
-> later liquidity-collecting candle
-> protected-low candidate + continuation POI
```

Do not yet freeze a mechanical definition of “protected low”; learn it from more instructor-labeled examples.

### 12. Thursday London — valid geometry can still be a poor trade because available RR to Asia is too small (~1328–1576 s)

Benjamin repeatedly checks how much R is available before Asia / the nearest meaningful target area. Several candidate entries are called too stretched, difficult or “rebuscadas” because only roughly 1–2R may be available before the nearby liquidity/range objective; he says he would prefer roughly 2.5–3R available in this context.

This is evidence for a **pre-entry reward-space / target-liquidity constraint**, not permission to choose a target after seeing the outcome.

Store:

- `nearest_meaningful_target_visible_at_entry`
- `rr_to_nearest_meaningful_target`
- `baseline_3R_available_before_target`
- `setup_quality_rr_constraint`

The exact universal minimum remains unresolved because earlier course material contains different example values and execution choices.

### 13. Thursday New York — do not force a reversal against a vertical move with no meaningful manipulation point (~1585–1669 s)

After Asia high is taken, Benjamin warns not to invent a sell simply because price has moved a lot. If price is rising vertically and there is no meaningful high/liquidity point being manipulated, the reversal idea lacks the location event he wants.

Operational consequence:

```text
large/vertical move alone != reversal location
meaningful liquidity/manipulation point still required
```

A pre-session zone that had already been interacted with is again discarded.

### 14. Thursday New York — news-degraded short candidate, confirmation execution and event-driven BE (~1669–1816 s)

Benjamin identifies a later bearish candidate after a local maximum is taken and an imbalance is created. Because news is involved he calls the setup less attractive. He prefers waiting for the familiar lower-timeframe rejection/confirmation rather than placing a blind limit.

For management, he says that once the nearest recent minimum is taken he would protect at BE because a large retrace back toward the entry would make continuation less convincing. He explicitly says he prefers BE over converting uncertainty into a full loss.

This adds support for:

- `be_trigger_reference = meaningful liquidity/structure event`
- `be_trigger_not_fixed_R`
- `news_degraded_quality`

The later 3R path is L3 only.

### 15. Thursday later New York — technically possible but explicitly low-probability/mediocre (~1816–1871 s)

Benjamin reviews another maximum manipulation + imbalance around a valid New York time. He says it could be constructed as a trade but explicitly labels it mediocre / low probability and says it should not have been taken as a high-probability setup.

Again:

```text
strategy_geometry_present = true
quality_high = false
```

This week therefore provides multiple independent examples proving that binary “pattern present” is insufficient for reproducing Benjamin's decisions.

### 16. Friday London — two actual attempts end at BE; outcome does not rewrite the setup (~1871–1973 s)

After news-driven movement and a higher-timeframe minimum/liquidity event, Benjamin waits for a reaction at an imbalance. He describes an initial entry and later moving to BE after favorable candles/progress. Price then reverses and removes him at BE.

He enters again after a later candle that he considers important because it collected previous lows/liquidity; after a subsequent high break/progress he again moves to BE and is removed again.

These are **actual Benjamin trades/attempts**, not hypothetical examples. The BE results are L3 and must not change the original L0/L1 labels.

The sequence gives more evidence that his protection is event-driven and aggressive when he lacks confidence rather than based on one universal R multiple.

### 17. Friday New York — large 15m imbalance refined on 5m; actual mediocre short, confirmation candle entry, loss after stop reduction (~1973–2105 s)

Benjamin marks a large 15m imbalance and refines the relevant area on 5m. He explicitly calls the trade non-optimal/mediocre and says he is searching for something he probably should not force. He dislikes the double-resistance/ranging behavior after the liquidity interaction; his preferred picture would be a clean liquidation followed by decisive selling.

He nevertheless waits for price to enter the zone and then for a rejection candle before entering. He places the stop above the relevant imbalance/zone and frames ~3R as the first target before a more ambitious lower minimum/trendline objective.

After price moves in his favor he tightens/reduces the stop to save risk; price then removes him. That later stop-out is L3. The important pre-entry label is that Benjamin himself already regarded the trade as mediocre.

This is unusually valuable anti-hindsight evidence:

```text
pre_entry_quality = mediocre
trade_taken = true
result = loss/stop after protection
```

The quality label existed **before** the outcome.

### 18. Week close — Benjamin reports a losing/uncomfortable week and recommends less trading, not rule-fitting (~2105–2135 s)

Benjamin closes by saying he finished the week losing and did not feel comfortable because of the holiday/news-heavy/unclear conditions. His recommendation is to trade less in weeks like this and keep backtesting.

This is not a license to modify thresholds until the historical week becomes profitable. For our project, Week 9 must remain part of the instructor-replication dataset precisely because it contains losing and ambiguous examples.

## Week 9 evidence-supported methodological findings

### A. Validity, pre-entry quality, trade-taken status and outcome are four different labels

Week 9 contains all combinations needed to enforce this in the dataset:

- strategy-compatible but Benjamin skips because quality is poor;
- technically possible but explicitly mediocre/low-probability;
- actual Benjamin trades that end at BE;
- an actual trade Benjamin already calls mediocre before it later loses.

This strongly validates the v2 architecture.

### B. “Clean session behavior” is more than elapsed time

Wednesday shows that London can open without providing the expected clarity/volume. Heavy overlap, repeated mitigation, slow range behavior and absence of clean impulse/imbalance are reasons to stand aside. Future OHLC work should measure these components separately rather than invent one `market_clean_score` prematurely.

### C. Internal liquidity generation behind an impulse is a first-class feature

Thursday's vertical-move example gives explicit instructor reasoning for why the first pullback can be inducement when the impulse has generated no internal liquidity. This is stronger than a generic “wait for retracement” rule and should be preserved as an ordered sequence.

### D. The nearest meaningful liquidity/target constrains entry quality before the trade

Benjamin repeatedly asks whether enough R exists before Asia/nearby liquidity. A visually good confirmation can still be poor if the first meaningful target is too close. This belongs to L0/L1 quality ranking and must be calculated using only targets visible at decision time.

### E. Confirmation candles are increasingly a preferred execution refinement, not a fourth universal setup rule

Across Tuesday, Thursday and Friday Benjamin repeatedly prefers seeing a pause/rejection/confirmation at the selected imbalance, especially when the setup is uncertain or news-degraded. Direct limits remain conceptually possible, so the two execution modes must later be tested on identical L0/L1 setups.

### F. BE usage is explicitly asymmetric toward capital protection

Benjamin states that when he is uncertain he would rather be removed at BE than allow the trade to return to full loss. His triggers are tied to meaningful price events / progress and confidence, not a fixed R. This means the baseline may need a contextual management state rather than one numeric BE threshold.

### G. A news-heavy losing week must remain in the learning corpus

The instructor himself reports a losing week. Excluding it because it damages apparent expectancy would be selection bias. It is useful precisely because it contains poor-quality trades, skips, BE attempts and a loss.

## v2 machine-measurement additions from Week 9

Retain/add for later OHLC reconstruction:

- `setup_validity`
- `setup_quality_pre_entry`
- `Benjamin_trade_taken`
- `required_eurusd_liquidity_missing`
- `poi_interacted_before_valid_time`
- `formal_structure_distance_atr`
- `session_open_range_compression`
- `post_liquidity_overlap_ratio`
- `minutes_since_session_open`
- `clean_impulse_present`
- `clean_entry_imbalance_present`
- `imbalance_count_in_impulse`
- `imbalance_nesting/timeframe`
- `internal_liquidity_generated_during_impulse`
- `first_pullback_inducement_candidate`
- `liquidity_collecting_candle`
- `protected_extreme_candidate`
- `nearest_meaningful_target_visible_at_entry`
- `rr_to_nearest_meaningful_target`
- `baseline_3R_available_before_target`
- `vertical_move_without_meaningful_manipulation_point`
- `news_degraded_quality`
- `be_trigger_reference_event`
- `market_clarity_instructor_label`

All future/outcome variables remain L3 and cannot alter historical validity/quality.

## Unresolved / deliberately not frozen

1. Exact objective threshold for a London-open market being too slow/ranging/noisy to trade.
2. Exact quantitative distinction between Benjamin's weak impulse and strong/clear impulse.
3. Exact hierarchy for choosing among multiple nested 1m/2m/3m imbalances.
4. Exact definition and durability of a “protected minimum/maximum” created by a liquidity-collecting candle.
5. Exact amount of internal liquidity needed before the first pullback ceases to be an inducement risk.
6. Universal minimum RR to nearest meaningful target; Week 9 supports a preference around 2.5–3R in specific examples, not a frozen global threshold.
7. Exact confirmation-candle geometry.
8. Exact BE trigger; Benjamin's behavior remains contextual/event-driven.
9. Exact news-density / week-quality rule; do not create one from this losing week alone.
10. Exact spread/slippage/fill prices require synchronized historical market data.

## Week 9 consolidated baseline

```text
L0: map HTF/session liquidity + timing + news + target space
-> reject/discount POIs already consumed before valid time
-> require the relevant liquidity event on EUR/USD
-> assess whether session action is clean enough to support a setup
-> L1: reaction + impulse + imbalance + optional structure/candle confluence
-> account for internal-liquidity generation and approach quality
-> verify meaningful target space before entry
-> L2: choose direct/retrace vs confirmation-candle execution without redefining L0/L1
-> manage protection from meaningful events/confidence, not a fitted fixed-R trigger
-> L3: record BE/stop/3R/later path without relabeling the setup
```

Week 9 is an **independent weekly sample** (`independent_sample = true`), subject to later day/trade correlation grouping. It is a particularly important anti-selection sample because Benjamin explicitly reports the week as losing and uncomfortable.
