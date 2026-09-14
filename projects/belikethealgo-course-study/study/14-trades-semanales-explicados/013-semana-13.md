# 14 Trades Semanales Explicados — Semana 13

Status: **COMPLETE — v2 measurement gate passed**

## Evidence reviewed

- Published source: `13) Trades Semana 13` / Vimeo `1094328045`.
- Full source duration: **3083.817 s (~51m24s)**.
- Full timestamped transcript reviewed chronologically: **405 segments**.
- Dense original-source visual evidence reviewed across the complete video, not outcome-selected intervals:
  - baseline: **3,084 frames at 1 fps**;
  - focus: **6,168 frames at 2 fps**;
  - both passes cover the source from 0 s through the final seconds and were consolidated only after extraction into chronological contact sheets.
- Principal Monday, Tuesday, Wednesday, Thursday and Friday examples were cross-checked against the dense chart evidence: timeframe changes, session markings, highlighted imbalance/orderblock areas, drawn liquidity, entry/stop/target boxes and subsequent chart state.
- Exact historical date, several exact prices, exact ATR-normalized distances, broker spread/slippage and exact epoch timestamps are not established by this source. Those fields are `pending_ohlc_reconstruction` / `unresolved`, never inferred from pixels.
- Instrument is EUR/USD in the demonstrated chart workflow. DXY is not used as a decision input in the shown Week 13 examples; synchronized DXY fields therefore remain `not_evidenced_in_source`, not silently assumed.
- This record is an **instructor-replication** document. No detector threshold is selected because it improves historical P&L.

## v2 information separation

- **L0 — pre-setup context:** weekly/daily/4H/1H directional context, PDH/PDL/Asia/session liquidity, HTF imbalance/orderblock/rejection area, news state, session/subwindow and still-available target/opposing liquidity.
- **L1 — activation:** required liquidity event, reaction, local decisive impulse, imbalance creation, body/force structure break when required, candle formation and retracement/confirmation known before entry.
- **L2 — execution:** direct imbalance/market execution versus additional confirmation, aggressive/conservative structural stop, BE/partial handling, order/fill uncertainty and movement-level risk.
- **L3 — outcome:** later BE/stop/target path, later displacement, subsequent sweep/manipulation and counterfactual survival. L3 is never allowed to justify the original L0/L1 decision.

**Impulse and displacement remain separate objects.** The local forceful move that Benjamin uses as entry confirmation and that creates an imbalance is L1 `impulse`. The larger directional travel that follows is `displacement`; its later extent is unavailable at entry.

## Global Week 13 context — external weekly liquidity changes the preferred direction, not into an absolute ban (~2:15–7:40)

**Instructor-explicit + visual-confirmed.** Price has spent multiple weeks ranging and has now removed an important weekly high after fully mitigating a prior imbalance. Benjamin says that once such a major high is taken, his *optimal* expectation is for a retracement and therefore sells, because important max/min liquidity is commonly followed by reaction/retracement.

He explicitly qualifies the idea: a buy may still be considered after a meaningful lower-timeframe/session low is taken in a good time window. Therefore this is a probability/context layer, not `buy_forbidden=true`.

Candidate L0 representation:

```text
weekly_external_high_taken = true
preferred_direction_after_major_high = sell/retracement
countertrend_buy_absolute_veto = false
countertrend_buy_requires_new_relevant_liquidity_and_valid_time = true
```

Benjamin repeatedly warns against selling *through* a major low immediately after it is swept merely because a prior example happened to work. His argument is stated before discussing later outcomes and is retained as instructor probability logic, not as measured expectancy.

---

## Chronological trade / example / no-trade inventory

### W13-E01 — Monday London: nearby PDH makes the lower 1H area non-preferred (~6:20–7:40)

**Sample identity:** `W13-E01`; independent example; `same_market_day_group=W13-MON`; `same_underlying_move_group=null`; duplicate none. Exact market date unresolved.

**L0:** a lower unmitigated 1H area exists, but PDH is very close above it. Benjamin says he would rather wait for PDH to be removed than reverse from the lower area. `approach_quality` is therefore downgraded by unresolved nearby external/session liquidity before any LTF outcome is known.

**Decision:** `setup_validity=invalid_for_plan_at_that_location`; `trade_taken=false` for the lower 1H area; reason = nearby higher-priority PDH still available.

**Ordered known state:** `1H area visible -> nearby PDH known and unresolved -> lower area rejected as entry location`.

No L2 order exists. L3 is irrelevant to the rejection. Exact PDH price/distance = `pending_ohlc_reconstruction`.

### W13-E02 — Monday London: Benjamin's taken short later self-audited as invalid (~7:40–12:20)

**Instructor-explicit + visual-confirmed.** Benjamin says he and others waited for PDH to be touched, then searched lower timeframe for a sell. This is a particularly valuable self-audit because he later says the trade he personally took should not have been taken.

**L0 known before entry:** PDH/liquidity has been reached; London is already late relative to his preferred first window. Benjamin gives chart-clock references around **09:57** for the liquidity event and around **10:12** for the eventual candidate execution area. He says his preferred high-probability London activity is concentrated earlier, approximately 09:00–09:45/09:50 Spain time. This time claim remains an instructor hypothesis; no cutoff is selected from P&L.

**L1:** an imbalance exists, but Benjamin describes the candle formation as poor. The apparent local move is a cluster of small candles/liquidity rather than the clear directional impulse he wants. The meaningful structure reference is too far away; price has not supplied the clean body/force structure evidence he would prefer.

```text
PDH taken
-> reaction exists
-> local small-candle accumulation / liquidity
-> no clean decisive impulse label
-> poor candle formation
-> meaningful structure reference distant
-> candidate entry nevertheless taken by Benjamin
```

**Impulse vs displacement:** the small-candle cluster must **not** be labeled an impulse simply because price later moves. `impulse_confirmed=false/poor` at decision time; later movement is L3 displacement only.

**L2:** Benjamin entered the sell; exact order type, fill, spread and slippage unresolved. A shown ~1:3 box is illustrative geometry, not a detector threshold beyond the previously documented Trading Plan objective. He later moved to BE after price progressed/broke lower.

**L3:** result = **BE** under his management. Crucially, the invalidity is not inferred from BE. Benjamin's stated reasons are all pre-entry: late time, poor candle formation/liquidity-like cluster and distant structure.

```text
setup_validity = invalid (Benjamin retrospective process audit based on L0/L1)
setup_quality_pre_entry = poor
trade_taken = true
result = BE (L3)
```

This example is first-class evidence that `trade_taken_by_instructor` is not identical to `replication_rule_valid`.

### W13-E03 — Monday later London: cleaner structure/impulse appears, but outside time (~12:20–14:35)

**Visual-confirmed + instructor-explicit.** After the earlier BE, price creates a cleaner sequence: liquidity, reaction/rejection, a clearer break of structure and imbalance. Benjamin says this would be materially better than E02 **if it had occurred earlier**, but it appears outside his trading time.

**L0:** `session_eligible=false/out_of_time` by Benjamin's plan at the relevant activation.

**L1:** better reaction, impulse/imbalance and structure than E02. The visual evidence confirms a cleaner directional chart sequence.

**Decision:** `setup_geometry_validity=recognizable/high`; `Benjamin_plan_eligibility=false`; `trade_taken=false`; `no_trade_reason=out_of_time`.

Later price behavior cannot create a timing exception.

### W13-E04 — Monday New York: PDL sweep -> valid long activation (~14:40–18:35)

**Instructor-explicit + visual-confirmed.** Benjamin says several of them took this setup after PDL was liquidated. He identifies New York chart time around **15:43 Spain** as a good time.

**L0:** weekly context prefers retracement/sells overall, but the newly swept PDL provides the lower-side liquidity event that permits a counter-context long. This is the qualification described in the opening weekly map.

**Ordered L1 sequence:** 

```text
PDL / relevant low available
-> PDL swept in valid NY time
-> reaction begins
-> first opposing/bearish imbalance is not respected
-> bullish candle formation improves
-> decisive bullish impulse creates multiple imbalances
-> retracement/response at candidate imbalance
-> long entry candidate
```

With several LTF imbalances available, Benjamin says one cannot know in advance which will hold. He allows reacting to the first respected one or choosing a higher timeframe when the 1m chart contains too many candidates. A backtest therefore must not retrospectively select the best imbalance fill.

**Impulse vs displacement:** the force that creates the bullish imbalance(s) is the L1 impulse; the larger move away afterward is displacement/L3.

**L2:** Benjamin discusses direct execution after the imbalance reacts versus waiting for confirmation. He prefers a structural stop below the meaningful low, while acknowledging a more aggressive stop variant. Exact fill/spread/slippage unresolved. These are execution variants on one L0/L1 activation, not independent setup samples.

**Management:** as the trade leaves the active session, Benjamin recommends BE/protective stop logic and closing exposure by the end of New York because spread/swap can worsen. Those are L2/L3 management rules, not entry features.

**Correlation:** all entry variants belong to `same_underlying_move_group=W13-MON-NY-PDL-LONG-01`.

### W13-E05 — Tuesday London: wick-only liquidity violation is not structure change (~18:45–23:40)

**Instructor-explicit + visual-confirmed.** Tuesday begins after PDH and Asia-side liquidity have already been removed. Benjamin steps down through 1H/30m/15m; much of the higher-timeframe material is already mitigated and an Asia minimum makes one candidate area unattractive.

On 1m, price violates a level **with wick only**. Benjamin explicitly says this is not the structure change he is waiting for.

**Ordered L1 state:** 

```text
relevant area/liquidity context
-> wick-only sweep / apparent break
-> NO structure-change confirmation yet
-> liquidity/trendline forms
-> later body + force break
-> decisive impulse creates several imbalances
```

He tells students not to enter merely because the first wick touched/took the level. The valid structure information becomes known only after body/force confirmation.

By the time the cleaner body/force impulse appears, numerous 1m imbalances exist; Benjamin moves conceptually to 2m/3m/5m to avoid hindsight-selecting one. In the reviewed path the higher-timeframe entry area is not revisited and he does not force an entry. Around **09:51** he considers the meaningful London move essentially spent.

**Decision:** initial wick candidate = `invalid`; later activation = `valid/recognizable but unfilled/missed`; `trade_taken=false`. Exact hypothetical fill is not invented.

### W13-E06 — Tuesday New York news spike at POI: location can be good while execution is inoperable (~23:40–25:10)

**Instructor-explicit.** Price approaches a 30m rejection/orderblock-style area with inducement, but a scheduled news event creates the actual spike into it.

Benjamin says the location/inducement would have been attractive on a normal day, but the news wick itself is effectively impossible/unadvisable to execute because spread, commissions and jump risk are elevated.

```text
location_quality = good
inducement_present = true
news_eligible_for_direct_spike_entry = false
trade_taken = false for spike execution
order/fill realism = adverse/unreliable
```

He explicitly discourages an aggressive guess during the news move. This is a clean separation between market-location validity and L2 executability.

### W13-E07 — Tuesday New York later valid sell; actual result BE, later move is counterfactual only (~25:10–27:15)

**Instructor-explicit + visual-confirmed.** After the news-distorted touch, a later breaker/rejection area becomes usable. Price reaches it, changes/turns lower and creates imbalances. Benjamin says the first created imbalance could be used directly and a second gives an additional confirmation-candle style execution.

**Ordered known sequence:** 

```text
relevant NY POI / induced context
-> later non-spike interaction
-> reaction
-> bearish decision/structure information
-> imbalance #1 created
-> optional extra confirmation / imbalance #2
-> sell entry
```

**L2 observed path:** Benjamin says he took the trade. When price moved through the next local minimum but he did not feel comfortable with the scenario, he moved to **BE**. Exact fill and initial stop prices unresolved.

**L3:** price removed him at BE, then around a later favorable time (~15:41 Spain per narration) removed internal liquidity and sold off. Benjamin notes that without BE the trade likely would have traveled farther.

Correct storage:

```text
setup_validity = valid
trade_taken = true
actual_execution_result = BE
counterfactual_without_BE = later favorable travel (L3 only)
```

The later selloff may be used in management research but cannot select a looser BE rule by P&L.

### W13-E08 — Wednesday London long after PDL sweep: valid location, degraded by indecisive accumulation (~27:15–33:45)

**Instructor-explicit + visual-confirmed.** Benjamin marks a higher-timeframe rejection/orderblock area with inducement. PDL is swept forcefully **outside** the session; he strongly warns against immediately selling through such a major low because the low sweep raises retracement probability. He then waits for the London retracement into his area.

Around **09:37–09:42 Spain**, price reaches the area and LTF imbalance/reaction information becomes available. Benjamin says an entry could be taken.

**Approach/quality:** after entry the tape fails to produce a clean immediate impulse and instead accumulates/overlaps. Benjamin explicitly contrasts this with decisive movement. This does not retrospectively invalidate the original liquidity/location; it is newly known post-entry/management information and degrades confidence.

**L2 variants:**
- structural/wider stop, roughly illustrated as ~9 pips in the source;
- tighter stop variant with smaller planned risk exposure;
- move to BE/protective stop when the market remains indecisive.

The pip/risk examples are execution illustrations, not detector thresholds.

**L3:** price eventually manipulates accumulated liquidity and later travels upward as the session gets late. The later direction does not justify choosing a stop variant ex post.

`same_underlying_move_group=W13-WED-LON-PDL-RETRACE-LONG-01` for all shown stop/management variants.

### W13-E09 — Wednesday New York early sell candidate: technically interesting but poor 3R geometry (~33:45–36:20)

**Instructor-explicit + visual-confirmed.** Benjamin observes a 15m rejection-area context and waits for inducement / a maximum to be taken in New York. An early candidate generates a forceful move and an imbalance, but the confirmation/stop geometry would require roughly **8 pips** while the intended 1:3 target would demand excessive travel.

He rejects this candidate *before* relying on its outcome.

```text
location/context = present
liquidity/inducement concept = present
impulse/imbalance = present
execution_geometry = poor
setup_validity_for_plan = invalid/non-viable
trade_taken = false
```

Exact R-to-nearest-liquidity must later be reconstructed from OHLC. The cited pip distance is instructor illustration only.

### W13-E10 — Wednesday New York later 15:40–15:50 short: valid missed trade (~36:20–40:20)

**Instructor-explicit + visual-confirmed.** Benjamin later notices in backtesting that price remains inside the same 15m area and removes an available maximum around **15:40 Spain**. This occurs in what he calls one of his best New York time windows. He then shows lower-timeframe reaction, imbalance/structure information and optional extra confirmation; by about **15:50** the sequence is actionable.

**Ordered known sequence:** 

```text
15m rejection-area context
-> available local maximum/liquidity
-> maximum swept in preferred NY time
-> bearish reaction
-> impulse / imbalance(s)
-> structure confirmation
-> first-candle entry OR wait for stronger confirmation candle
-> sell candidate
```

Benjamin says he did **not see this entry live**. Therefore:

```text
setup_validity = valid
setup_quality_pre_entry = high relative to earlier E09
trade_taken_by_Benjamin = false
missed_trade = true
```

Later selloff is L3 only. The time-window preference is stored as an instructor replication feature/hypothesis, not calibrated against P&L.

### W13-E11 — Thursday London: Benjamin-taken sell after 1H imbalance + local max liquidity (~40:25–45:00)

**Instructor-explicit + visual-confirmed.** Thursday starts with a bearish higher-timeframe/retracement context: overnight liquidity has been taken and Benjamin expects PDL to be a likely draw. He sees an available local maximum aligned with a small 1H imbalance and waits for price to trade higher into that context.

At roughly **09:09 Spain** he is in his preferred London timing but still waits because structure/activation is not yet complete. Price first performs a wick/liquidity event, builds a small range/trendline-liquidity state, then removes the relevant maximum. Benjamin identifies the later candle as the actual liquidity-collecting event; afterward price breaks/changes lower and creates bearish imbalances.

**Ordered L1 sequence:** 

```text
bearish HTF draw / PDL below
-> 1H imbalance + local maximum known
-> valid London time
-> first wick event: insufficient by itself
-> small range / internal liquidity forms
-> local maximum taken
-> bearish reaction
-> structure change / force
-> imbalance(s) created
-> retracement/confirmation
-> short entry
```

**Impulse vs displacement:** the imbalance-producing bearish move is the L1 impulse. The large later selloff is displacement/L3 and is not used to justify the entry.

**L2:** Benjamin says this is the entry he personally took. Exact order/fill, spread/slippage and exact stop price unresolved; the visible stop/target boxes confirm a planned short with structural invalidation. A nearby alternative entry shown in the same movement is correlated, not independent.

### W13-E12 — Thursday London management: 80% partial + BE remainder is factual L2/L3, not entry evidence (~44:30–45:30)

Benjamin states that he took roughly **80% partials** on the Thursday position and the remaining portion was later removed at **BE** as price reversed.

This is stored exactly as an observed management path:

```text
partial_taken = true
partial_fraction ≈ 0.80 (instructor stated)
remaining_runner -> BE
final blended R = unresolved without exact fill/partial prices
```

The partial percentage is not promoted to a universal optimization rule from this single outcome.

### W13-E13 — Thursday New York first POI touch: no inducement, therefore no entry (~45:30–47:00)

**Instructor-explicit + visual-confirmed.** Benjamin highlights an algo-candle / liquidity-collecting candle inside the broader 1H context. In New York price returns to it, but he says he would have preferred the nearby liquidity to be induced/removed first. That does not happen; price simply touches the area.

`trade_taken=false`; `no_trade_reason=required inducement/liquidity not completed before touch`.

Later movement cannot turn the direct touch into a valid planned entry.

### W13-E14 — Thursday New York after PDL touch: impulse exists, but timing/candle/imbalance state remains poor (~46:40–50:50)

After PDL is reached Benjamin again warns not to chase continuation through the just-swept major low. Lower timeframe later shows some impulse and a wick-based break before the preferred New York open; the body/force evidence is incomplete at that point.

He then reviews possible imbalances across 1m/3m/5m. The 5m imbalance has already been mitigated; the 1m/3m candidates are either already touched before the relevant break or coupled with poor candle formation. One possible stop would be roughly 12.5 pips, which he explicitly does not recommend.

A later range lasts roughly twenty minutes and Benjamin interprets it as liquidity accumulation/retail-style structure before a manipulation and sharp fall.

Correct classification:

```text
liquidity_event = PDL touch/sweep
reaction = present
some impulse = present
initial structure break = wick/incomplete
entry_imbalance_clean_at_decision = poor/mitigated depending TF
candle_formation = poor
execution_geometry = poor
trade_taken = false
setup_validity = invalid / doubtful for baseline replication
```

The later fall is L3 displacement and must not upgrade the candidate.

### W13-E15 — Friday London: no setup (~50:50–51:24)

Benjamin closes by stating that Friday London produced **nothing** and, at recording time, New York had not yet supplied a setup.

```text
sample_id = W13-E15
session = Friday London
trade_taken = false
setup_validity = no candidate / no-trade
no_trade_reason = no qualifying setup observed
outcome = not applicable / source ends before later NY information
```

Do not infer what happened after the video ended.

---

## Week 13 evidence-supported methodological findings

### A. Instructor trade-taking and baseline-rule validity are separate labels

Monday E02 is unusually strong evidence. Benjamin took the trade and got BE, then explicitly says during review that he should not have taken it. The reasons are available without looking at the BE result: late time, poor candle formation/liquidity-like microstructure and distant structure. Dataset design must therefore include both `trade_taken_by_instructor` and `setup_validity_under_instructor_review`.

### B. A wick liquidity event is not automatically a structure change

Tuesday London and Thursday London/New York repeatedly distinguish wick-only interaction from a body/force break. The detector must preserve:

```text
liquidity sweep by wick
!=
structure change by body/force
```

No numerical penetration/body threshold is frozen yet.

### C. Many 1m imbalances create an ambiguity state; do not hindsight-select the winner

Monday NY and Tuesday London both contain multiple LTF imbalances. Benjamin's solution is either to react to the first one actually respected or move to a higher LTF (2m/3m/5m) for a clearer area. `multiple_entry_imbalances_available` should be represented explicitly; backtesting may not select the zone that later gives the best P&L.

### D. Session timing is a pre-entry quality variable, but Benjamin's favorite subwindows remain replication hypotheses

Week 13 repeatedly emphasizes an early London window and a later preferred NY window. Benjamin even cites outside performance material while discussing them. Those statements may calibrate **what Benjamin calls high quality**, but no time cutoff may be chosen because it maximizes P&L. The broad course session rules remain separate from these preferred-subwindow labels.

### E. News can preserve location quality while destroying execution quality

Tuesday NY gives a clean example: induced HTF location may be excellent, yet the actual news spike is not realistically executable because spread/jump/commission conditions are adverse. This supports keeping `context_gate` and `execution_eligible` separate.

### F. Major max/min sweeps have directionally important retracement information

The opening weekly high, Monday PDL, Wednesday PDL and Thursday PDL examples all support Benjamin's repeated teaching that immediately chasing through a just-removed important max/min is low quality. This remains instructor logic to replicate; its empirical edge must later be tested independently.

### G. Indecisive accumulation after entry is management information, not retroactive entry invalidation

Wednesday London shows that post-entry overlap/small-candle accumulation can justify protection/BE. Because that state becomes known after entry, it belongs to L2/L3 management and cannot be used to rewrite the original L0/L1 validity.

### H. Missed valid setups must remain in the replication corpus

Wednesday NY E10 is a setup Benjamin identifies only in backtesting. It is retained as `valid + missed_trade`, not deleted because he did not execute it. This matters for later precision/recall measurement of the baseline detector.

---

## v2 completeness / unresolved-field audit

All independent Week 13 examples have:

- canonical sample identity and same-day/same-move grouping where relevant;
- L0 context and relevant max/min/session liquidity recorded;
- chronological L1 activation/no-activation state reconstructed from transcript + dense charts;
- `event_time` recorded at the instructor-stated chart clock where available (09:57, 10:12, 15:43, 09:37–09:42, 15:40–15:50, ~09:09) and otherwise explicitly unresolved pending OHLC synchronization;
- `known_time` represented as the close/confirmation point Benjamin says had to be awaited; exact epoch = `pending_ohlc_reconstruction` where not visible with certainty;
- impulse kept distinct from later displacement;
- structure reference recorded conceptually and marked `pending_ohlc_reconstruction` when exact swing price cannot be established;
- approach quality recorded where Benjamin explicitly labels accumulation, poor candle formation, inducement or late timing;
- validity, pre-entry quality, trade-taken status and result separated;
- L2 execution variants separated from L1 setup identity;
- idealized fills prohibited: exact fill/spread/slippage remain unresolved unless instructor evidence exists;
- later BE/partial/target/displacement information isolated to L3;
- duplicate/correlation handling populated; alternate entries/stops on one move are not counted as independent trades;
- no unresolved numeric value guessed from the screenshots.

Fields requiring synchronized OHLC reconstruction before a machine backtest can fill them numerically include exact zone prices, ATR-normalized sweep/impulse/approach/displacement measures, exact MFE/MAE, exact R milestones, fill price before/after costs and exact event-to-event seconds where the chart clock is not established.

## Replication vs optimization lock

Nothing in Week 13 changes the research separation:

1. use this evidence to reproduce Benjamin's labels/actions;
2. calibrate detector definitions against those labels, never against trade P&L;
3. freeze a baseline only after the required Weeks 1–5 v2 backfill and execution assumptions are complete;
4. only then measure market edge on independent OHLC data.

Week 13 therefore **does not freeze** a new time threshold, impulse threshold, structure-body threshold, stop distance, BE trigger or partial percentage.