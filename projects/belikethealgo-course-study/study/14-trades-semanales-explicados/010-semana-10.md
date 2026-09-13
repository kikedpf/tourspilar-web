# 14 Trades Semanales Explicados — Semana 10

Status: **COMPLETE — v2 measurement gate passed**

## Evidence reviewed

- Full source duration: ~57m32s (`3452.35 s`).
- 497 timestamped transcript segments reviewed chronologically.
- Dense original-source visual evidence reviewed and cross-checked around every identified trade/no-trade/management sequence:
  - baseline: 3,453 frames sampled at 1 fps before contact-sheet consolidation;
  - focus: 6,905 frames sampled at 2 fps before contact-sheet consolidation.
- The dense extraction spans the full video, rather than only outcome-selected intervals.
- Exact OHLC, spread, slippage and several precise entry/stop prices remain `pending_ohlc_reconstruction`; they are not guessed from screenshots.
- Evidence is used to reproduce Benjamin's decision process. No detector threshold is selected from later P&L.

## v2 information separation

- **L0 — pre-setup context:** Weekly/Daily/4H direction and zones, external/internal liquidity, PDH/PDL, Asia, session/time, news and target-side liquidity.
- **L1 — activation:** liquidity event, reaction, local impulse, imbalance, candle formation, structure break/change and retracement/confirmation available before entry.
- **L2 — execution:** direct imbalance entry versus confirmation-candle execution, chosen stop reference, split/alternative imbalance entries and management decisions.
- **L3 — outcome:** TP, BE, stop, later movement and whether a runner would have reached a farther objective. L3 does not relabel the original setup.

Week 10 is especially useful for the interaction between **HTF direction, valid session, countertrend risk, imbalance-touch semantics and execution choice**.

## Chronological trade / no-trade inventory

### 1. Opening lesson — higher timeframe must dominate the research context (~0:00–4:45)

**Instructor-explicit.** Benjamin opens by saying he wants to place more emphasis on higher timeframes. If 4H is in a bearish impulse toward external liquidity, shorts have the higher-probability context. Countertrend longs are still possible, but he says they should be shorter-duration, lower-risk and managed more aggressively.

Operational consequence:

```text
HTF_direction = L0 probability/context feature
countertrend_setup != automatically invalid
countertrend_setup -> reduced ambition/risk + more aggressive protection in Benjamin's plan
```

This is not evidence for a numeric countertrend penalty yet.

### 2. HTF imbalance versus full candle/orderblock — first imbalance touch activates interest; depth is unknowable (~4:45–10:20)

**Instructor-explicit + visual-confirmed.** Using Weekly and 4H examples, Benjamin repeatedly explains that price may touch only the imbalance and react, or penetrate through the whole imbalance into the associated candle/orderblock. He says this cannot be known beforehand.

Once price first enters/mitigates the imbalance, he considers directional setups eligible. If price reacts away after that first touch, the imbalance is no longer the untouched reference; the remaining unmitigated candle/zone can remain relevant separately.

Important separation:

```text
imbalance_first_touch = observable eligibility event
full_candle/orderblock_touch = deeper possible path, not a requirement known in advance
```

Do not optimize entry depth retrospectively from which depth later held.

### 3. Monday London — Asia-high manipulation + 5m reaction block / 1-3 formation; direct versus confirmation entry (~10:20–19:25)

**Instructor-explicit + visual-confirmed.** Benjamin starts from the HTF context, then notes that Asia high is liquidated before/around London. With little useful 15m structure he moves to 5m and marks a rejection/reaction area. He also highlights near-equal lows/external liquidity still available below.

Around the London preferred window he gets the familiar sequence: liquidity/location -> strong candle formation / impulse -> imbalance. He says that waiting for the formal 5m structure break is possible, but in this particular 5m context it can be too late because the structure target is itself close to the available downside liquidity.

Two L2 execution variants are shown:

- direct order when price returns to the imbalance;
- wait for an additional rejection/confirmation candle.

He explicitly notes the trade-off: more confirmation can mean a larger stop and worse available 3R geometry. He also warns against moving to BE too early because only limited internal liquidity had formed after the break.

Measurement fields reinforced:

- `working_tf` versus `htf_context_tf`;
- `formal_structure_distance`;
- `rr_to_working_tf_liquidity` known at decision time;
- `entry_mode`;
- `confirmation_wait_cost_R` — OUR METRIC;
- internal liquidity available before a BE decision.

Monday New York is an explicit no-trade for Benjamin: he says he did not see a coherent setup and did not force one.

### 4. Tuesday London — bearish setup after Asia/session liquidity; Benjamin enters, later loses (~19:25–23:15)

**Instructor-explicit + visual-confirmed.** Benjamin maps the continuing HTF zones, notes that some earlier imbalances were only partially touched without requiring full orderblock mitigation, and looks for a London sale after the relevant session/Asia-side liquidity interaction.

He waits for lower-timeframe structure/impulse and an imbalance and says this is the imbalance where he entered. He describes the trade as good ex ante. The target framework is the recurring 3R / Asia-side objective.

Price later retraces deeply and the trade does not work. That result is L3 and does not convert the earlier setup into an invalid one.

This is another independent anti-outcome-bias sample:

```text
setup_quality_pre_entry = Benjamin considered good
trade_taken = true
later_result = losing/adverse path
```

### 5. Tuesday New York — excellent HTF location but news destroys the desired execution; no Benjamin entry (~23:15–26:55)

Price reaches a 4H-relevant area and takes the visible maximum while also interacting with HTF imbalance context. Benjamin says the zone was very attractive, but the move/interaction occurred through scheduled news and therefore he did not take the trade.

He describes the trade he would have wanted: local liquidity -> imbalance -> lower-timeframe confirmation/continuation. Because the news created the event and the available stop would become very large, he declines it.

The later large move is L3 only. It is explicitly **not** evidence that the skipped trade should have been taken.

### 6. Tuesday later pattern — textbook geometry outside his valid time; no trade (~26:55–28:25)

Afterward price produces a familiar structure/imbalance/candle pattern. Benjamin says it is recognizable as one of their entry patterns, but it occurs around 16:34 / outside his permitted window, so he does not take it.

This is strong evidence that:

```text
pattern_present = true
session_eligible = false
=> trade_taken = false
```

He additionally explains that if such an off-plan position existed, subsequent structure progress could justify BE, but this management discussion must not turn the original out-of-session setup into an eligible trade.

### 7. Wednesday London — countertrend long after important low; wick-only break rejected, body break accepted (~28:25–34:10)

**Instructor-explicit + visual-confirmed.** The 4H context remains bearish, so Benjamin says any long is countertrend. Price takes a nearby important low just before London and produces a strong bullish impulse.

The first apparent structure change is only wick-based and Benjamin explicitly rejects it as a valid structure break. A later break closes with body and is accepted. He then identifies multiple imbalances and discusses entering at one or waiting for a small indecision/bullish confirmation candle.

Because the trade is countertrend, he recommends a smaller/more aggressive stop and more aggressive management. The recurring ~3R is achieved; a farther Asia objective is discussed as optional rather than guaranteed.

Strong detector calibration label:

```text
wick_only_structure_violation = rejected in this example
body_close + force/imbalance = accepted structure evidence
```

The exact universal penetration tolerance remains unresolved.

### 8. Wednesday risk aggregation — maximum risk is per underlying movement, not per scaled ticket (~31:50–33:20)

Benjamin answers a scaling question explicitly: multiple entries belonging to the same underlying movement should not each receive a full independent risk budget. He gives an example cap of roughly 1% total per movement.

For our dataset this strongly supports:

- `same_underlying_move_group`;
- aggregated risk by movement;
- never treating scaled tickets as independent statistical samples.

The exact percentage belongs to the risk overlay, not the market detector.

### 9. Wednesday later pattern outside session — technically recognizable, explicitly rejected by the Trading Plan (~34:10–38:50)

Benjamin shows another setup that produces the familiar structure/imbalance/confirmation geometry and could have offered a large move, but it occurs outside the permitted session. He repeatedly says he did not take it and stresses that violating the schedule once makes the Trading Plan meaningless.

Wednesday New York also contains volatility/news but no setup he considered worthwhile.

This is among the clearest corpus examples that **session is a hard plan gate even when LTF geometry later looks excellent**.

### 10. Thursday London — late 5m entry near the end of the window; taken, then stopped; Benjamin revises future behavior ex ante (~38:50–42:10)

Benjamin waits for Asia or another relevant maximum to be taken and then uses a 5m zone after a strong reaction. The trade is entered late in the London window, around 10:42 by his discussion. Price spends a long time ranging instead of expanding and eventually removes the stop by a small amount.

Crucially, Benjamin does not claim the pattern never existed. His lesson is about **lateness + lack of follow-through + time-window decay**: in future, if he is not already in by that late point, he is unlikely to initiate; if already in and price remains ranging outside the preferred time after having moved away from entry, he prefers protecting at BE rather than holding passively.

Candidate L0/L3 separation:

- `minutes_to_session_end_at_entry` — L0/L2;
- `entry_inside_preferred_subwindow` — L0;
- `post_entry_range_without_followthrough` — L3 management input only;
- future policy change must be validated on later held-out weeks, not fitted because this trade lost.

### 11. Thursday New York — countertrend long in second window; risky but valid enough for Benjamin, later reaches target (~42:10–47:00)

**Instructor-explicit + visual-confirmed.** Benjamin looks for a long despite the bearish HTF structure because a meaningful low had recently been taken and timing was good. He explicitly labels the idea risky/countertrend.

He rejects an earlier wick-only structure change and poor candle formation, then accepts a later forceful body break with imbalance during the proper second window. He shows several possible imbalance entries and a confirmation-candle alternative; stops can sit below a nearer created low or the larger invalidation point depending on execution.

He says that because this is countertrend, BE should be applied more aggressively after strong favorable progress. The trade later reaches the ~3R target, but that outcome is L3 and does not erase the pre-entry `countertrend/risky` label.

### 12. Friday London context — Asia high taken before Frankfurt; continuation sought toward 4H external liquidity (~47:00–49:30)

Benjamin finds little on 1H, moves down to 15m/5m, and notes that Asia high was already taken around 07:30 before Frankfurt. A strong bearish impulse then breaks through lower session references. He looks for continuation toward visible 4H external liquidity.

He identifies a 5m breaker/imbalance confluence and a nearby 5m maximum that could be taken before continuation.

This reinforces top-down state sequencing:

```text
HTF external-liquidity draw
-> session liquidity event
-> bearish impulse
-> 5m POI/imbalance + local liquidity
-> LTF entry search
```

### 13. Friday London candidate — valid-ish but explicitly not A+; missing preferred structure confluence (~49:30–52:35)

Price takes the local maximum in valid London time, enters the imbalance/breaker area and forms a rejection pattern. Benjamin says the trade is possible but repeatedly calls it risky/non-optimal because the preferred equal-high/structure confluence was not fully completed.

He discusses ~3R toward the nearby low and the larger external-liquidity objective. The later fall does not upgrade its ex-ante quality.

Important v2 label combination:

```text
strategy_geometry_present = true
setup_quality_pre_entry = downgraded / non-optimal
later_outcome = favorable
```

This complements Week 9's mediocre losing-trade evidence and is useful for learning quality independently of result.

### 14. Friday late-London reversal after 4H external liquidity — strong potential, but Benjamin does not take because timing is too late (~52:35–54:20)

After London finally takes the important 4H external liquidity, price gives a body-based structure change and an imbalance. Benjamin says the trade had large upside potential because external liquidity had been removed and internal liquidity above became a plausible draw.

However, he says the timing is around 10:41 / too close to the end of his preferred London window, so he does not take it.

Again:

```text
HTF thesis strength cannot override session/timing gate
```

### 15. Friday later-session short — structure + candle formation + imbalance; taken late/near boundary and reaches ~3R (~54:20–56:20)

Benjamin describes an actual late-session short after another important liquidity interaction and a valid-looking structure change with candle formation. He shows two possible imbalance entry zones or waiting for a directional confirmation candle, with structural protection above.

The ASR is ambiguous on the exact named period level being taken in this sequence, so the precise `liquidity_kind` is **unresolved pending visual/OHLC reconstruction** rather than guessed. The visual sequence confirms the marked structure/imbalance areas and trade construction.

Because it is Friday and price had been strongly directional, Benjamin frames the target conservatively around visible imbalance/5m area and ~3R. Price later reaches the 3R region and then retraces after interacting with a larger 5m imbalance. Those later facts are L3.

### 16. Closing lesson — once imbalance is touched, entries may be searched; full-zone depth is inherently uncertain (~56:20–57:32)

Benjamin closes by repeating the week's major conceptual point: after the 1–3 imbalance is first touched/mitigated, directional entries may be searched. Sometimes price barely touches it and reacts; sometimes it penetrates deeper into the imbalance or all the way to the larger candle/zone. He explicitly says they cannot know that depth beforehand.

This should be encoded as **alternative execution/depth hypotheses**, not one hindsight-selected entry fraction.

## Week 10 evidence-supported methodological findings

### A. HTF direction is a probability/management layer, not an unconditional directional veto

Benjamin explicitly allows countertrend trades but calls for smaller ambition/risk and faster protection. Therefore the baseline model should not encode `against_4h_direction => impossible`; it should preserve the context label and later measure Benjamin-replication behavior.

### B. First imbalance touch and full orderblock/candle mitigation are different events

The course repeatedly shows that price can react from shallow imbalance contact without touching the full candle/orderblock. The only knowable fact in real time is which boundary has actually been reached. Entry-depth variants must be tested separately without using future outcome.

### C. Working timeframe changes how useful a formal structure break is

On 5m, waiting for the full structural reference can consume most of the available move before nearby liquidity. Week 10 therefore strengthens the need to store `structure_reference_distance` and `rr_to_first_meaningful_target` rather than blindly demanding the same structure pattern on every timeframe.

### D. Wick-only versus body-based structure evidence gets another clean labeled pair

Wednesday and Thursday both contain wick-only candidate breaks Benjamin dislikes/rejects, followed by stronger body/force breaks he accepts. This is valuable calibration evidence for the structure detector, while the exact threshold remains unfrozen.

### E. Time-window decay is a real ex-ante variable

The Thursday loss and Friday skipped reversal both show that Benjamin treats a setup arriving near the end of the window differently from the same geometry earlier. This must be represented through exact decision time, not inferred from outcome.

### F. Risk aggregation must operate at underlying-move level

Benjamin explicitly warns against scaling several tickets from the same movement as if each had an independent risk budget. Our `same_underlying_move_group` is therefore not merely a statistical convenience; it also matters to the instructor's risk logic.

### G. Quality labels remain outcome-independent

Week 10 contains both directions of the anti-hindsight test:

- a Tuesday setup Benjamin liked that later failed;
- a Friday setup Benjamin explicitly calls non-optimal that later works.

That is strong evidence that a detector trained on Benjamin must predict his **pre-entry assessment**, not reconstruct quality from winners and losers.

## Unresolved / excluded from frozen rules

1. No numeric penalty is frozen for countertrend setups.
2. No universal imbalance fill fraction is accepted; shallow touch versus deeper mitigation remains execution-dependent.
3. No universal body-close penetration threshold is frozen for structure validity.
4. Exact preferred latest entry minute remains a behavioral rule to validate across later weeks; Thursday's ~10:42 discussion is not enough to invent a universal cutoff beyond the already taught session windows.
5. Exact BE trigger remains contextual; internal-liquidity/structure progress and countertrend status affect it.
6. The exact named period-liquidity label in the final Friday trade is unclear in ASR and remains unresolved pending exact chart/OHLC reconstruction.
7. Exact spread/slippage/fill behavior remains pending historical execution reconstruction.

## v2 completeness gate

- full video reviewed: **yes**;
- all transcript/chart segments inventoried: **yes**;
- trades/examples/no-trades timestamp-bounded: **yes**;
- dense full-video visual evidence available and inspected around all material sequences: **yes**;
- explicit explanation separated from visual confirmation: **yes**;
- L0/L1/L2/L3 separated: **yes**;
- impulse kept separate from displacement: **yes**;
- setup validity/quality/taken/result kept separate: **yes**;
- duplicate/correlation implications recorded where applicable: **yes**;
- unresolved quantities left unresolved: **yes**;
- no threshold chosen from P&L: **yes**.

Week 10 therefore passes the v2 gate and the study may proceed to the next published weekly item.