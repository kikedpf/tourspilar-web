# 14 Trades Semanales Explicados — Semana 11

Status: **COMPLETE — v2 measurement gate passed**

## Evidence reviewed

- Full source duration: ~39m06s (`2345.717 s`).
- Full timestamped transcript reviewed chronologically (~344 segments).
- Dense original-source visual evidence reviewed across the full video rather than outcome-selected intervals:
  - baseline: 2,346 frames sampled at 1 fps before contact-sheet consolidation;
  - focus: 4,692 frames sampled at 2 fps before contact-sheet consolidation.
- Transcript claims were cross-checked against chart/timeframe/annotation changes in the dense evidence.
- Exact OHLC, several exact prices, broker-specific spread/slippage and some precise calendar labels remain unresolved or pending OHLC reconstruction. They are not guessed from screenshots.
- Evidence is used to reproduce Benjamin's decision process. No detector threshold is selected from later P&L.

## v2 information separation

- **L0 — pre-setup context:** HTF direction/zones, prioritized external/internal liquidity, PDH/PDL and Asia/session state, holiday/news eligibility, time window, DXY/context when shown, target-side liquidity and account/plan overlays where relevant.
- **L1 — activation:** liquidity event, reaction, local impulse, imbalance, candle formation, structure break/change and retracement/confirmation available before entry.
- **L2 — execution:** direct imbalance entry versus confirmation-candle entry, aggressive versus conservative stop, split/scaled entries, realistic spread/fill assumptions and management choices.
- **L3 — outcome:** later stop/BE/TP path, whether 3R was reached, later runner behavior and post-entry structure. L3 never relabels the original setup or selects detector thresholds.

Week 11 is particularly useful for **news-induced impulse exceptions, setup-versus-execution separation, realistic stop/fill variants, no-trade liquidity gates and late-entry degradation**.

## Chronological trade / example / no-trade inventory

### 1. Opening HTF map — weekly bullish context, nearer 4H bearish leg (~0:00–4:20)

**Instructor-explicit + visual-confirmed.** Benjamin begins top-down. Weekly structure remains bullish and an old upper maximum is still relevant, but the immediate 4H context is bearish after external liquidity was taken and a previously identified 4H rejection area was mitigated.

For the near-term intraday plan he therefore favors shorts after appropriate upper-side liquidity is taken/rejected. He can identify potential bullish breaker areas, but explicitly says he does not see an optimal/key long zone at that point.

v2 interpretation:

```text
weekly_direction = bullish context
working_4h_direction = bearish immediate context
htf_direction = probability/context state, not outcome label
```

No numeric weight is assigned to the timeframe conflict.

### 2. Monday news setup — unusually large impulse can make formal structure too distant (~4:20–9:40)

**Instructor-explicit + visual-confirmed.** Before the scheduled red news event, price is ranging and Benjamin has no entry. The news then produces a very large directional candle/impulse. He explains that, in such an exceptional move, the normal structure-change reference can become impractically distant.

After PDH/upper liquidity is taken in the relevant bearish HTF area, he identifies candle formation plus an impulse that creates the first usable imbalance. He presents two legitimate instructor choices:

- execute from the imbalance/candle evidence without waiting for formal structure;
- decline the trade if the trader does not accept that aggressiveness.

This is a **conditional exception**, not evidence that structure can generally be ignored.

Ordered information available before execution:

```text
relevant HTF bearish area
-> scheduled-news impulse
-> PDH / upper liquidity taken
-> reaction + candle formation
-> impulse creates imbalance
-> formal structure reference remains unusually far
-> direct/confirmation execution decision
```

Fields reinforced:

- `liquidity_event_time/known_time`;
- `impulse_*` separately from the full displacement leg;
- `structure_reference_distance` / impractical structure distance as a candidate observable feature;
- `entry_mode` and `trade_taken` separately from `setup_validity`.

No numeric definition of “huge news impulse” is frozen.

### 3. Monday management — structural protection, rollover/spread awareness (~8:30–10:00)

Benjamin does not automatically move to BE on the first favorable movement. He warns that premature BE can be removed by normal mitigation and instead reduces risk as additional favorable structure/liquidity progress appears.

Near the Asia/session rollover he prefers closing available profit rather than exposing a trade to spread expansion/swap while sleeping. This is L2/L3 management evidence, not an entry rule.

Execution realism:

```text
spread_model != universally zero
rollover_spread_expansion = relevant execution/management state
exact broker/session spread = unresolved pending broker/OHLC reconstruction
```

### 4. Monday London geometry present, but no Benjamin entry because location is not good enough (~9:40–12:10)

**Instructor-explicit + visual-confirmed.** Around London, recognizable candle/structure/imbalance geometry develops and Benjamin demonstrates a body-based structure break, first/second imbalance alternatives and possible protective stops.

However, he explicitly says he did **not** take the earlier London pattern because he did not see a sufficiently relevant zone/breaker/location. This is first-class negative evidence:

```text
LTF_geometry_present = true
pre_entry_location_quality = insufficient for Benjamin
trade_taken = false
```

A later sale is described as his actual position. He takes profit and explains that although ~3R only became available later, he closes positions before Asia/rollover rather than carrying them simply because the eventual chart would have paid more.

Later 3R availability is L3 only.

### 5. Tuesday — USD holiday, explicit no-trade day (~12:10–12:50)

**Instructor-explicit.** Benjamin states that USD holidays are not traded because he expects poorer volume/force and more range/manipulation.

```text
holiday_eligible = false
trade_taken = false
no_trade_reason = USD holiday
```

This is a plan gate independent of subsequent price movement.

### 6. Wednesday London context — shorts favored, but liquidity sweep alone is insufficient (~12:50–17:00)

The immediate 4H structure remains bearish after Monday's reaction and Benjamin maps external liquidity below. He favors shorts and marks nearby upper-side candidates including Asia high / PDH-style references.

Price takes one marked maximum without useful reaction and later takes additional/Asia-side liquidity. Benjamin repeatedly reinforces:

```text
liquidity_taken != automatic entry
```

He still waits for reaction/impulse/imbalance/candle/structure evidence according to context.

### 7. Wednesday London — pre-structure entry is possible but explicitly riskier (~15:30–18:50)

Around the valid London period, Benjamin identifies candle formation and an initial imbalance after important liquidity/location interaction. The first imbalance is mitigated. He explains that one **can** enter before formal structure when candle formation + impulse/imbalance are strong enough, but calls this riskier and says he personally prefers the structure break when practical.

A later imbalance provides another execution opportunity.

This reinforces the hierarchy already taught in the Trading Plan:

```text
strategy core can be:
liquidity/location + candle formation + impulse creating imbalance
structure change = valuable additional confluence when available
```

The news-driven Monday exception and this Wednesday example must not be collapsed into a universal “structure unnecessary” rule; their contexts differ.

### 8. Wednesday London — aggressive versus conservative stop is an L2 choice (~17:00–20:10)

Benjamin explicitly compares stop placement variants:

- aggressive protection above the nearer local maximum: smaller stop / better nominal R, but vulnerable to a small sweep;
- conservative protection above the larger invalidation/reference: wider stop / poorer nominal R, but survives deeper retracement.

He also shows an optional confirmation-candle entry after imbalance mitigation.

Critical separation:

```text
same L1 setup
-> multiple L2 execution hypotheses
-> different fill/stop paths
```

The later winning/losing path of a particular stop cannot be used to redefine the setup itself.

### 9. Wednesday scaling — multiple tickets belong to one underlying movement (~18:30–20:30)

Benjamin says additional entries should be added only when the prior position is protected/in profit or the total risk has already been split. He explicitly warns against assigning a full independent risk budget to each entry and gives roughly 1% maximum total risk per movement as his example/plan guidance.

Dataset consequence:

- all scale-ins belonging to this move share `same_underlying_move_group`;
- they are not independent statistical samples;
- risk aggregation belongs to execution/risk overlay, not market-detector calibration.

### 10. Wednesday London management — next structural/liquidity area is a known-time protection milestone (~20:00–22:10)

As price reaches the next meaningful 15m minimum/structural area, Benjamin discusses partials or moving protection because retracement risk increases there.

This management decision is justified by a level visible before the subsequent reaction. It is therefore suitable as a known-time L2/L3 management input, but not a reason to claim the original entry was better after the fact.

### 11. Wednesday New York — induced/rejection-block setup with clear LTF activation (~22:10–27:40)

**Instructor-explicit + visual-confirmed.** Benjamin marks an unmitigated 15m rejection/orderblock context with inducement/local liquidity that should be taken first. Around the New York window, price reaches the area, takes the relevant local/minimum liquidity and reacts rapidly.

At first there is no usable imbalance; subsequently one/two imbalances form. He shows:

- direct imbalance execution;
- waiting for a rejection/confirmation candle;
- aggressive versus conservative stops.

Observed sequence:

```text
HTF/15m area + inducement
-> local liquidity taken
-> reaction
-> impulse
-> imbalance becomes known
-> retracement / optional confirmation
-> entry
```

Impulse and displacement are stored separately: the instructor labels the decisive directional force/imbalance event, while the broader leg continues beyond it.

### 12. Wednesday New York — realistic fill/stop assumptions matter (~24:00–28:30)

The demonstrated path shows that a very tight/aggressive stop would be removed by a small excursion while the wider structural invalidation survives. That difference is **execution**, not a post-hoc quality label.

Benjamin also references broker conditions described as zero/very low spread in the example. We preserve the instructor statement but do **not** encode universal zero spread:

- `spread_model = broker/session-specific, unresolved for reconstruction`;
- `slippage_model = unresolved`;
- exact fill price is not guessed from the video.

A participant's imbalance entry is described by Benjamin as a textbook rejection-block setup around the New York period. Multiple displayed entries/stop alternatives remain one correlated underlying market move.

### 13. Wednesday New York management — structural stop reduction, then ~3R partial/runner (~26:00–29:20)

After favorable structure progress Benjamin reduces risk. Depending on the exact entry, an immediate BE can be too tight while a reduced structural stop remains valid.

Near ~3R he discusses taking the majority of the position and leaving a smaller runner toward nearby liquidity/lows. This agrees with the previously documented Trading Plan overlay. Approximate percentages mentioned in speech are not converted into a new detector threshold.

### 14. Thursday — Benjamin does not trade; weak candidate lacks prior relevant liquidity (~28:45–31:00)

Benjamin says he did not find a compelling personal trade Thursday. He criticizes one candidate candle/setup because it lacks prior relevant liquidity and a meaningful maximum/reference; nearby PDH/context also reduces confidence.

This is a negative example where candle shape alone is insufficient.

### 15. Thursday EUR theoretical setup — valid opportunity, but not Benjamin's taken trade (~30:00–34:10)

Benjamin reviews a EUR London opportunity he says could be valid even though he did not take it. Prior-week/day external liquidity is removed; a 1H imbalance and 15m rejection-block area provide context, with a prior wick/liquidity event and an unmitigated zone.

On 1m the first structure change is visually/verbally described as not clean or tangled. Benjamin recommends waiting for additional imbalance/confirmation rather than forcing a questionable first signal.

Again:

```text
setup_validity = possible/valid according to instructor review
trade_taken_by_Benjamin = false
later_result = separate L3 field
```

### 16. Thursday EUR — entry lateness after displacement degrades a still-correct directional idea (~32:00–35:00)

After early entry opportunities are missed, Benjamin eventually identifies a last acceptable imbalance. Beyond that point the market has travelled too far from the original impulse, the protective stop becomes long and achieving the intended ~3R geometry deteriorates.

This is important pre-entry quality evidence for the approach/late-entry layer:

- distance/time from original impulse;
- displacement already consumed before entry;
- stop distance required at decision time;
- remaining distance to first meaningful target;
- late/chase status.

No numeric maximum lateness is frozen yet.

The replay later reaches the target region, but that L3 outcome does not upgrade Benjamin's original `trade_taken=false` status or justify looser chase rules.

### 17. Thursday New York — required liquidity never taken, therefore no trade (~34:00–35:00)

With news in the session, Benjamin identifies the specific liquidity point he would need removed before considering the trade. Price does **not** liquidate it, so he does not enter.

This is a clean boolean no-trade label:

```text
required_liquidity_taken = false
entry_trigger_eligible = false
trade_taken = false
```

The counterfactual “I would consider it if that point were taken” is retained as instructor logic, not as an executed sample.

### 18. Friday — news/context create possible shorts, but limited follow-through (~35:00–37:10)

After relevant upper-side/PDH context is dealt with, Benjamin discusses possible bearish executions around a rejection block / 1m confirmation or an imbalance after the news movement.

One confirmation-style execution requires a relatively large stop (he verbally references about ten pips in the example) and the shown path does not deliver the standard ~3R. Another imbalance execution can be protected after the next minimum breaks and tends toward BE/limited result in the reviewed path.

The important methodological label is not “bad because it failed”; it is:

- news/impulse context known before entry;
- entry/stop geometry known at decision time;
- later failure to reach 3R = L3 only.

### 19. Closing lesson — strong days/weeks can justify stopping; confirmation discussion remains contextual (~37:10–39:06)

Benjamin highlights Wednesday as the standout trading day and advises that after a strong day/week a trader can simply stop, especially in funding-account contexts. This is capital-protection/behavioral overlay and must not contaminate the market edge detector.

He again addresses why some entries can occur before formal structure and points toward the interaction among the three confirmations. Week 11 therefore strengthens the requirement to store which confirmations were actually available at decision time rather than forcing every trade into one fixed sequence.

## Week 11 evidence-supported methodological findings

### A. News-induced no-structure execution is a conditional exception, not a generic rule

When a scheduled-news impulse is exceptionally large, formal structure can be too distant to be practical. Benjamin may accept liquidity/location + candle formation + impulse/imbalance without waiting for that structure. No numerical news-impulse threshold is yet evidence-supported.

### B. `setup_validity`, `setup_quality_pre_entry`, `trade_taken` and `result` must remain four separate labels

Week 11 contains recognizable geometry Benjamin skips for poor location, a Thursday EUR setup he later says was valid although he did not take it, and Friday/other examples whose outcomes differ. These cannot be collapsed into winner/loser labels.

### C. Stop placement belongs to L2 and creates distinct execution paths over the same L1 setup

Aggressive near-stop, conservative invalidation-stop and confirmation-candle execution can produce different fills/stops/R without changing the underlying setup identity. P&L from those variants must never choose the detector.

### D. Required liquidity is a true pre-entry gate

Thursday New York provides explicit negative evidence: the liquidity Benjamin required was not taken, so there was no trade. This is stronger calibration evidence than retrospectively choosing whatever level price later respected.

### E. Late-entry/chase quality must be measured from the original impulse and remaining geometry

Thursday EUR shows that after the move has travelled too far, later imbalances can become poor entries even if directional thesis remains correct. Store time/distance since impulse, required stop and remaining target distance; do not invent a threshold yet.

### F. Execution realism includes spread regime and session rollover

Monday rollover management and Wednesday broker-spread discussion mean a future replication/backtest cannot assume frictionless fills. Broker-specific spread/slippage must be reconstructed or modeled explicitly, and ambiguous values remain unresolved.

### G. Scaled tickets from one move are correlated, not independent samples

Week 11 again explicitly supports `same_underlying_move_group` and total movement-level risk aggregation.

### H. Impulse and displacement remain separate observables

Benjamin labels the decisive force/imbalance-producing activation, while the broader directional leg can start earlier or continue later. The dataset must preserve both rather than equating a long displacement leg with the confirmation impulse.

## v2 timing / known-time requirements reinforced

For every Week 11 sample, reconstruction must preserve the ordering that was knowable in real time:

```text
HTF/session context known
-> required liquidity object known
-> liquidity event occurs and becomes known
-> reaction becomes observable
-> impulse becomes confirmable
-> imbalance / candle / structure confirmation becomes known
-> decision
-> order/fill
-> management events
-> outcome
```

Where the transcript/video cannot establish an exact chart timestamp, the relative order is retained and the absolute field remains `unresolved`; it is not back-filled from later candles.

## Unresolved / excluded from frozen rules

1. No numeric threshold for an “exceptionally large” news impulse is frozen.
2. No universal maximum structure-reference distance is frozen for the news exception.
3. No universal aggressive/conservative stop buffer is frozen.
4. No universal zero-spread assumption is accepted from the broker example.
5. Exact spread/slippage/fill values require broker/OHLC reconstruction.
6. Exact maximum lateness from the original impulse is not yet solved.
7. Exact partial/BE trigger remains contextual beyond the already documented Trading Plan guidance.
8. Some precise named liquidity levels/prices in fast transcript passages remain unresolved rather than inferred.
9. Account-state/funding advice remains an overlay and is not part of the market detector.

## Completeness gate

Week 11 passes the v2 completeness gate because:

- the complete transcript was reviewed chronologically;
- dense evidence spans the full video at 1 fps and 2 fps rather than selected winners;
- demonstrated trades, skipped trades, no-trades and management examples are indexed;
- L0/L1, L2 and L3 information are separated;
- impulse and displacement are explicitly separate;
- event/known-time ordering is preserved and unresolved absolute times are not guessed;
- setup validity, pre-entry quality, trade-taken status and result are separated;
- realistic execution uncertainty is retained;
- correlated/scaled entries are grouped conceptually;
- no detector threshold was selected from P&L.

**Week 11 is complete under v2.** The next sequential weekly item is Week 12.