# 14 Trades Semanales Explicados — Semana 8

Status: **COMPLETE — v2 measurement gate passed**

## Evidence reviewed

- Full source duration: ~65m25s (`3925.4 s`).
- 1,055 timestamped transcript segments reviewed chronologically.
- Dense original-source visual evidence generated and reviewed:
  - 1 fps baseline over the chart-review body: 3,681 extracted frames before contact-sheet consolidation.
  - 2 fps focus evidence over the main trade/no-trade, drawing and management intervals: 5,585 extracted frames before contact-sheet consolidation.
- Dense charts were cross-checked against the transcript for Monday through Friday, including rejected entries, London/New York examples, stop-management demonstrations and the news examples.
- Evidence is used to reproduce Benjamin's decision process. No detector threshold is selected from later P&L.

## v2 separation

- **L0 — context:** HTF direction/location, PDH/PDL/PWH/PWL, Asia range, session timing, news and already-resolved liquidity.
- **L1 — activation:** relevant liquidity event, reaction, impulse, imbalance, candle formation and structure information known before entry.
- **L2 — execution/management:** direct imbalance/limit versus confirmation-candle execution, stop placement, partials and later stop adaptation.
- **L3 — outcome:** stop, BE, 3R, runner or subsequent market path. L3 never changes the historical L0/L1 label.

No numeric impulse, displacement, structure, sweep, confirmation-candle or BE threshold is frozen from this week.

## Chronological trade / no-trade inventory

### 1. Monday — valid-looking bearish evidence outside time is rejected; later in-session short candidate (~432–780 s)

**L0/L1 negative example — instructor-explicit.** Around ~432–529 s Benjamin shows that the prior weekly high / PDH context plus a structure change, candle formation and breaker information can look bearish, but the move occurs outside his valid trading time. He explicitly does not enter because timing is wrong. The breaker is described as useful information/confluence rather than a mandatory direct-entry zone.

Once the valid time arrives, around ~565–670 s he waits for a lower-timeframe high to be liquidated, then asks for the familiar confirmation sequence: structure change, imbalance and preferably a confirmation candle on the retrace. Dense evidence confirms the liquidity mark and the later bearish decision/retrace are identified before the subsequent move.

Operational consequence:

```text
strong-looking LTF geometry outside valid time != Benjamin entry
valid time + relevant liquidity event + reaction/structure/imbalance = candidate
confirmation candle = extra execution/confluence option
```

This reinforces that time/session is an L0 gate, not a cosmetic feature.

### 2. Tuesday — manipulation already happened before London; market classified as inoperable (~783–840 s)

**Instructor-explicit no-trade.** Before Benjamin's normal London participation, both PDH and Asia have already been liquidated/manipulated. He calls this bad news because the manipulation happened before London/Frankfurt and describes the remaining action as wick-heavy, unclear and accumulating liquidity on both sides.

Label:

```text
pre_session_manipulation_already_resolved = true
market_state = unclear / wick-heavy
Benjamin_trade = false
```

This is stronger than merely saying “price was volatile”: the combination of already-consumed session liquidity and poor subsequent structure is a first-class no-trade state.

### 3. Tuesday later example — structure change + imbalance, optional confirmation candle, then structural risk reduction (~963–1141 s)

Benjamin identifies a forceful structure change and the first imbalance. He explicitly contrasts placing an order at the imbalance with waiting for the extra rejection/confirmation candle. The first area does not provide the preferred confirmation; a later imbalance touch does, creating a candidate entry with a wider stop because volatility is elevated.

**L2 management — instructor-explicit.** Around ~1036–1140 s he reduces the stop after price takes a minimum that had caused the prior upward move. His reasoning is not `move stop at X R`; it is structural invalidation/risk reduction. He explicitly accepts that this may sometimes stop a trade that later continues because the aim is lower long-run capital loss.

Measurement consequence:

- keep `management_structure_event` separate from `R_available_at_management`;
- record original and reduced risk distances;
- do not optimize the stop rule using the later path of this example.

### 4. Wednesday London — high-quality long candidate, flexible execution, ~3R baseline (~1393–1525 s)

**L0/L1 — instructor-explicit + visual-confirmed.** Benjamin likes an induced higher-timeframe area, then highlights strong candle formation at the correct London time after Asia liquidity has been resolved. He prefers an additional confirmation/reaction but allows either an imbalance-based order or a later structure/confirmation entry.

He discusses several possible stop placements depending on execution choice and risk tolerance. Therefore the setup and its execution variants must remain distinct:

```text
same contextual setup
-> direct imbalance / retrace entry
OR
-> wait for structure / confirmation candle
-> different entry and stop geometry
```

The main target is again around 3R in the baseline example. Exact fill fraction inside the imbalance remains unresolved.

### 5. Wednesday London — London-extreme runner hypothesis strengthened, but remains probabilistic (~1529–1600 s)

Benjamin explicitly says that when a good trade is captured during London it can sometimes be extended because London frequently creates the day's high or low after Asia accumulation/manipulation. He points to the week's London low as an example that was not revisited later.

He recommends taking partials rather than turning the whole position into an unrestricted runner. This is supporting evidence for the previously documented London-origin-extreme hypothesis, **not** a measured probability and not a guarantee.

Research label:

- `london_entry = true`
- `candidate_london_extreme_anchor = true`
- `runner_target_htf_liquidity`
- validate frequency over the corpus; do not assign probability from instructor wording.

### 6. Wednesday — explicit anti-bias lesson; missed long and a separate BE short (~1679–2025 s)

Benjamin says he became fixated on a bearish zone and missed a large long. He explicitly instructs students not to “marry” a direction: if the strategy produces the required configuration, buys and sells are both possible. He also rejects increasing risk simply because a trade looks exceptionally good.

A retrospective long study around ~1803–1889 s again shows the recurring sequence: relevant zone -> structure break -> impulse/imbalance -> optional bullish confirmation candle. Benjamin is clear that he did **not** take this long; it is a study example and must not be counted as an instructor trade.

His actual sell ended at BE. The outcome does not invalidate the pre-entry logic.

Around ~1954–2025 s he shows how the London long could have used 3R as the first management milestone and then left a partial runner toward PDH because the bullish structure, Asia-low liquidity event and London entry context were already visible. The later ~9R path is L3 and must not be used to invent the target retrospectively.

### 7. Wednesday New York — PDH sweep alone is explicitly insufficient for a short (~2048–2114 s)

**Strong no-trade evidence.** Benjamin addresses students who sold after PDH was liquidated. He says the strategy did not justify those shorts because there was no lower-timeframe structure change or equivalent bearish confluence; price kept forming higher lows and remained bullish.

This is one of the clearest weekly veto examples so far:

```text
important_liquidity_taken = true
BUT bearish LTF activation/confirmation absent
=> NO TRADE
```

It directly rejects an overly simple automated rule of `PDH swept -> short`.

### 8. Thursday — Asia must resolve externally; OB/structure without inducement/reaction is rejected (~2235–2400 s)

Benjamin reiterates that he does nothing while price remains unresolved inside the Asia range. He wants an external boundary such as Asia high/low to be taken before looking for the trade.

After an early Asia event and bullish context, he marks an orderblock/area but says structure alone is not what he trades: he wants a relevant point plus inducement/liquidity. The apparent area later fails to provide a structure break or imbalance; he explicitly says there should have been no entry.

This adds a clean negative chain:

```text
POI/orderblock present
+ possible directional idea
BUT no inducement/relevant liquidity creation
AND no valid LTF break/imbalance reaction
=> no entry
```

### 9. Thursday actual trade — confirmation after POI/imbalance touch; Asia/PDH targets; avoid over-trailing (~2541–2748 s)

Benjamin waits for the price to interact with the selected zone/imbalance and then examines the lower timeframe. The first imbalance touch gives no reaction; after further movement a large bullish reaction candle appears and he treats it as sufficient confirmation for the long.

He defines Asia range as the principal nearby target and PDH as a farther target, while retaining 3R/partial-taking logic. For a relevant London trade he again proposes taking a partial and allowing the remainder to run toward a meaningful session/HTF target.

**Management lesson.** He strongly warns against moving the stop behind every tiny fluctuation. The stop can be reduced after meaningful favorable structural progress, but over-tight trailing may remove the trader before the intended move. This creates two distinct L2 research variables:

- `risk_reduction_after_meaningful_structure`
- `over_tight_trailing_candidate`

No numeric trailing distance is provided.

### 10. Thursday later/news example — news wick can invalidate interest; no structure change means no new entry (~2854–2918 s)

Benjamin says he dislikes large news wicks. If already in a trade and a news wick materially disrupts the setup, he recommends exiting around BE/small loss rather than blindly remaining exposed.

After that event, price keeps rising and does not create the bearish structure change needed for a new short. He explicitly says there was no valid later trade. A hypothetical earlier area could have stopped, but that L3 counterfactual is not used to create the no-trade rule; the no-trade rule comes from the missing L1 activation.

### 11. Friday London — PDH + Asia liquidity, multi-timeframe structure/imbalance, optional refinement inside large 5m imbalance (~3000–3325 s)

**L0/L1 — instructor-explicit + visual-confirmed.** Benjamin waits for PDH/Asia liquidity to be resolved. The move happens before the formal London open, then he drops through 1m/2m/3m/5m to understand the structure and the large 5m imbalance.

He explicitly warns that students should not force every theoretically possible entry if the confluence is not clear. Within the 5m imbalance he shows how a lower-timeframe reaction/confirmation can refine execution: touch the 5m imbalance -> look for reaction/candle formation -> use a lower-timeframe imbalance/rejection structure as the candidate trigger once London is open.

This is evidence for hierarchical execution rather than “one universal timeframe”:

```text
HTF/session context
-> 5m POI/imbalance
-> 1m–3m reaction/structure/imbalance refinement
-> candidate execution
```

The exact lower-timeframe chosen is contextual and remains a field to measure rather than a fixed rule.

### 12. Friday management — stepwise structural protection, but not mechanical micro-trailing (~3284–3516 s)

Benjamin demonstrates moving protection after successive meaningful structure breaks and eventually moving to BE once he considers it safe. This must be reconciled with Thursday's warning not to trail every tiny move: the course distinction is **meaningful structural progress vs noisy micro-adjustment**, not `never trail` versus `always trail`.

The later lateralization occurs after London. Whether BE would or would not have been hit in the realized path is L3 only.

### 13. Friday New York — wait for body/force + impulse/imbalance; actual lower-timeframe entry example (~3516–3715 s)

Benjamin rejects wick-heavy early behavior and asks for a clearer body break / directional signal. Once price breaks with force, creates an impulse and imbalance and also shows a 2m structure break, he identifies an entry route on 1m/2m. This reinforces the separation of:

- `structure_break_by_body/force`;
- `impulse_event`;
- `imbalance_created`;
- `entry_retrace/confirmation`.

They are related but should not be collapsed into a single “displacement score.”

### 14. Friday pre-news pattern — technically recognizable pattern does not cancel the separate news rule (~3732–3785 s)

Benjamin notes that immediately before a scheduled news event the chart still produced the familiar structure-break + body/force + imbalance pattern and that price subsequently sold off. He uses this to illustrate that the market can display the same geometry around news.

Crucially, he says he was already in the prior trade and did not take a new operation for the news. Therefore this example **does not override** the established course rule against opening new trades too close to relevant high-impact news.

Operational separation:

```text
pattern_detected = true
news_entry_eligible = false / governed by prior news filter
new_trade_taken = false
```

Do not reinterpret the later collapse as evidence that pre-news entries should be allowed.

## Week 8 evidence-supported methodological findings

### A. Liquidity sweep is necessary context in many setups but never a sufficient reversal trigger

The Wednesday New York PDH example is explicit: liquidity can be taken and still there is no trade when price never produces the required lower-timeframe bearish change/confluence.

### B. Timing can veto otherwise attractive technical geometry

Monday provides a clear structure/candle/HTF-looking bearish sequence outside Benjamin's time window that he does not trade. This strengthens `session_eligible` as a genuine gate.

### C. “Manipulation already happened before London” deserves a measurable context field

Tuesday shows that if major Asia/PDH manipulation has already been consumed before the intended session and price becomes wick-heavy/ambiguous, Benjamin may treat the session as inoperable. Add candidate fields such as:

- `required_liquidity_resolved_before_session`
- `minutes_from_liquidity_event_to_session_open`
- `post_event_wickiness`
- `two_sided_liquidity_accumulation_candidate`

No hard threshold is frozen yet.

### D. Structure/confirmation and location are hierarchical, not interchangeable

Thursday shows an orderblock/structure idea without inducement/reaction being rejected; Wednesday New York shows a liquidity event without bearish activation being rejected. Neither POI nor liquidity nor structure alone is sufficient.

### E. Direct entry vs confirmation entry remains an execution choice with a real trade-off

Week 8 repeatedly says the confirmation candle can provide more confidence but increases stop distance / worsens entry and may miss trades. This must later be tested as an execution variant on the **same** L0/L1 setup rather than allowing P&L to redefine the setup.

### F. London runner logic has a pre-entry/contextual rationale

Benjamin's runner target is not simply “because price later went 9R.” In the worked London example he names the bullish structure, Asia-liquidity event and PDH as a visible target before using the runner argument. This makes the runner hypothesis measurable without lookahead.

### G. Management is event-driven but has an anti-overfitting constraint

Benjamin both reduces risk after meaningful structural progress and warns against following every micro swing with the stop. A future detector must distinguish significant structure events from noise; an arbitrary trailing distance would not reproduce the course faithfully.

### H. Directional bias must remain conditional

Benjamin explicitly says he missed a long because he became attached to a bearish idea. The automated strategy must therefore derive direction from current L0/L1 state rather than persist a discretionary prior bias after contradictory evidence emerges.

## v2 machine-measurement additions from Week 8

Retain/add for later OHLC reconstruction:

- `required_liquidity_resolved_before_session`
- `minutes_liquidity_event_to_session_open`
- `post_liquidity_wick_ratio_window`
- `two_sided_liquidity_accumulation_candidate`
- `liquidity_sweep_without_activation_no_trade`
- `poi_present_without_inducement`
- `poi_present_without_ltf_activation`
- `directional_bias_state_at_decision`
- `bias_invalidated_by_new_evidence`
- `runner_target_visible_at_entry`
- `runner_target_type`
- `london_extreme_anchor_candidate`
- `management_structure_significance_candidate`
- `over_tight_trailing_candidate`
- `news_pattern_present`
- `news_entry_eligible`
- `new_trade_blocked_by_news`

All later-path variables remain L3 and cannot alter the original labels.

## Unresolved / deliberately not frozen

1. Exact objective definition of “manipulation already happened too early” before London.
2. Exact wickiness/two-sided-liquidity threshold for an inoperable market.
3. Exact impulse magnitude and body/force thresholds.
4. Exact structure significance threshold for moving stops.
5. Exact geometry of the optional confirmation candle.
6. Exact rule for selecting among multiple nested 1m/2m/3m/5m imbalances.
7. Exact probability that a London high/low becomes the daily extreme.
8. Exact runner partial fraction as a universal strategy rule; funding/account state influences Benjamin's examples.
9. Exact spread/slippage/fill values require synchronized market data.

## Week 8 consolidated baseline

```text
L0: HTF/liquidity map + valid session/news state
-> reject attractive geometry outside valid time
-> note whether the key manipulation/liquidity event was already consumed before session
-> wait for relevant external/session liquidity resolution
L1: require reaction + impulse/imbalance and supporting candle/structure evidence
-> liquidity sweep alone is not enough
-> POI/orderblock alone is not enough
L2: direct retrace entry OR confirmation-candle refinement
-> structural stop
-> reduce risk after meaningful favorable structure, but do not micro-trail every swing
-> ~3R baseline, with London runner only when target/context was visible ex ante
L3: record stop/BE/runner path separately
```

Week 8 is complete under the v2 evidence gate. Week 9 is the next permissible study item.