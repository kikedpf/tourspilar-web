# 14 Trades Semanales Explicados — Semana 15

Status: **COMPLETE — v2 measurement gate passed**

## Evidence reviewed

- Published source: `15) Trades Semana 15.mp4`.
- Full source duration from dense-extraction manifest: **3149.35 s (~52m29s)**.
- Full timestamped transcript reviewed chronologically: **430 segments/lines**.
- Dense original-source visual evidence reviewed across the complete source, not outcome-selected intervals:
  - baseline: **3,150 frames at 1 fps**;
  - focus: **6,299 frames at 2 fps**;
  - 263 baseline contact sheets + 525 focus contact sheets.
- Monday–Friday chart states were cross-checked against dense evidence, including timeframe changes, POI/liquidity markings, entry/target illustrations and broker-feed comparison.
- Instrument is EUR/USD in the demonstrated workflow.
- Exact historical date, raw OHLC/ATR values, exact broker spread/slippage and exact fill prices are not recoverable from this source alone and remain `unresolved` / `pending_ohlc_reconstruction`.
- This record is for **instructor replication**. No detector threshold is selected from P&L.

## v2 information separation

- **L0:** HTF direction/POI, valid session/subwindow, news state, Asia/PDH/PDL/PWH/PWL and other liquidity already visible, broker-feed validity information already known.
- **L1:** liquidity take, reaction, local impulse, imbalance creation, structure/candle confirmation and retracement known before the decision.
- **L2:** market/confirmation execution, requested stop/target, BE decisions, broker spread/fill uncertainty and alternative execution variants.
- **L3:** later displacement, MFE/MAE, eventual stop/BE/TP, later counterfactual profitability.

Only L0+L1 may justify the original decision. `setup_validity`, `setup_quality_pre_entry`, `trade_taken` and result remain independent.

**Impulse and displacement remain separate.** A local forceful move that creates the entry imbalance / confirms intent is L1 `impulse`; the broader move after entry is `displacement` and never backfills the entry rationale.

---

## Chronological trade / example / no-trade inventory

### W15-E01 — Monday London: early rejection block before Frankfurt, but no London trade (~8:10–9:45)

**Identity:** `sample_id=W15-E01`; `same_market_day_group=W15-MON`; independent no-trade example.

**L0:** Benjamin sees a rejection block formed before Frankfurt, but Asia is positioned in the middle of the broader range and he considers the meaningful sell-side setup liquidity to be higher. A 30m area he inspects is explicitly rejected because it is not induced.

**Decision:** `trade_taken=false`; `setup_quality_pre_entry=poor/insufficient`; `no_trade_reason=poor_location_or_uninduced_poi`.

This is negative evidence against treating every visible orderblock/rejection block as actionable.

### W15-E02 — Monday New York first long: valid-time breakout/confirmation trade -> BE (~9:45–12:00)

Benjamin marks a 15m/30m rejection-block-style area for New York and explicitly says the area is only relevant to him when reached in the valid trading time. He enters around the narrated 14:20–14:22 Spain window.

**Ordered L1 sequence:**

```text
valid NY time + relevant marked area
-> LTF reaction
-> large bullish candle formation
-> structure break with force
-> multi-candle bullish impulse
-> nearby bearish 1m zone fails to hold
-> entry decision on breakout/confirmation candle
```

`impulse_confirmed=true`; `structure_change_confirmed=true` by instructor description; `trade_taken=true`.

**L2:** market/confirmation-style entry on the breakout candle; target is marked above. Exact fill/spread/slippage unresolved.

**L3:** price initially moves favorably; Benjamin moves to BE and the pullback removes him. The BE result does not weaken the original validity label.

### W15-E03 — Monday New York second long: lower-timeframe liquidity sweep + reaction (~12:00–13:25)

After the first trade, Benjamin moves through 5m/3m and finds an unmitigated bearish candle/zone. Around the narrated ~15:15 Spain time he waits on lower timeframe.

**Ordered L1 sequence:**

```text
valid NY time + unmitigated 3m area
-> small 1m low/liquidity swept
-> rejection
-> good candle formation
-> bullish decision candle covers the local orderblock/area
-> long entry
```

`trade_taken=true`; `setup_validity=valid`; `setup_quality_pre_entry=good/acceptable` by instructor narration.

**L2:** entry on the bullish confirmation candle; target above. Exact price and friction unresolved.

**L3:** strong favorable displacement follows. This later travel is not used to create the entry rule.

`same_underlying_move_group=W15-MON-NY-LONG-MOVE` is used for the Monday long sequence because the two entries participate in the same broader NY bullish idea and must not be treated as fully independent samples.

### W15-E04 — Monday late New York short: recognizable pattern, Benjamin skips it (~13:25–16:45)

Price removes a 15m high, later produces bearish structure/imbalance/candle evidence and the chart eventually offers a large favorable move. Benjamin explicitly says he did **not** take it.

Pre-entry reasons already known:
- activation is essentially at the end of his operating window (~16:30–16:31 Spain in narration);
- he would have preferred price to reach/liquidate PDH first;
- he calls it not the best trade.

```text
LTF geometry = recognizable
required/preferred higher liquidity = not reached
session quality = late
trade_taken = false
setup_quality_pre_entry = downgraded
```

The later illustrated ~1:9 potential is **L3 counterfactual only** and must never be used to reverse the skip decision or tune a detector.

### W15-E05 — Tuesday London: no-trade because desired Asia-high manipulation never occurs (~16:45–19:35)

Benjamin wants an Asia-high / upper-liquidity manipulation before considering the intended short. The move begins around London without giving him the required event; he says he saw nothing relevant and took nothing in London.

`required_liquidity_taken=false`; `trade_taken=false`; `no_trade_reason=required_liquidity_event_absent`.

This also reinforces that timing alone does not authorize a trade.

### W15-E06 — Tuesday New York news short: highly discretionary/risky execution -> BE (~19:35–25:58)

Benjamin first rejects the idea that price must reach an orderblock before reversing: the meaningful object is the nearby maximum/minimum liquidity. He states that imbalances without inducement / meaningful max-min liquidity are not relevant to him.

Around news, upper liquidity is swept and volatility expands. He enters a short on/around the second bearish candle after the sweep, while explicitly calling the entry **very risky** and saying it is not fulfilling the normal set of conditions beyond the liquidity/news-manipulation idea.

Correct storage:

```text
trade_taken = true
setup_validity = discretionary_exception / not normal baseline quality
setup_quality_pre_entry = poor/high-risk by instructor
news_volatility = high
liquidity_sweep = present
normal confirmation completeness = incomplete
```

**L2:** Benjamin advocates very rapid BE protection when uncertain and emphasizes low broker spread as materially relevant to whether BE survives. Exact spread/fill cannot be assumed.

**L3:** the observed trade is later removed at BE. That BE does not make the entry valid under the normal baseline, and the result is not used to select a rule.

### W15-E07 — Wednesday London primary short: HTF bearish bridge + induced 15m area + confirmation (~26:05–30:00)

**L0:** weekly/daily context is bearish; a 4H imbalance has been mitigated and Benjamin sees lower liquidity as a plausible draw. On 15m there is a pending orderblock/area with Asia low and inducement/liquidity available. Timing is inside London.

The first apparent break around narrated ~09:35 is rejected because it does not break with body and the bullish reaction gives him low confidence.

A later second attempt plus reaction provides enough evidence for the short.

**Ordered L1:**

```text
HTF bearish context + valid London time
-> induced 15m area / lower target liquidity visible
-> first wick-like break rejected
-> second downside attempt / repeated pressure
-> retracement to the available imbalance
-> bearish reaction candle that sweeps prior local candle and falls with force
-> short decision
```

**L2:** structural stop alternatives are shown; targets include Asia low / equal lows and a ~3R management framework. Exact fill and realized R unresolved.

### W15-E08 — Wednesday London continuation/re-entry: higher-skill same-move trade (~30:00–32:30)

Benjamin shows another opportunity from a 5m rejection-block context. He explicitly calls it more advanced/risky and says he still waits for confirmations rather than placing blind limit orders even when the zone looks good.

```text
continuation POI
-> reaction
-> structure/candle information
-> imbalance
-> confirmation entry
```

He moves to BE after a relevant low is broken. The re-entry belongs to `same_underlying_move_group=W15-WED-LON-SHORT-MOVE` with W15-E07; it is not an independent market sample.

### W15-E09 — Wednesday New York: wait for lower liquidity; activation arrives too late, so no trade (~32:30–36:32)

Benjamin refuses to buy merely because price appears to hold support/trendline structure. He requires the lower pending liquidity/minimum to be expelled first.

The required sweep takes too long. By roughly 16:15–16:26 Spain, no clean timely entry has formed and he explicitly says to close the chart rather than force a trade.

```text
required_liquidity_event = pending too long
preferred activation time = missed
trade_taken = false
no_trade_reason = no timely complete activation
```

This is a strong anti-FOMO example: later price movement is irrelevant to the ex-ante no-trade label.

### W15-E10 — Thursday London first long: taken but poor pre-entry quality -> stop (~36:33–39:10)

**L0:** daily imbalance area, previous-week-low context and a swept PDL support a bullish thesis; time is valid.

Benjamin enters after the PDL sweep/reaction, but explicitly says **before the result** that it is “not the best entry” because price is generating substantial liquidity around the setup.

```text
context_gate_passed = true
trade_taken = true
setup_quality_pre_entry = poor/downgraded by instructor
approach_new_liquidity = high qualitatively
```

Price then remains lateral for a long time. Benjamin says he should have protected/exited at BE during that prolonged accumulation, but he did not.

**L3:** the trade is stopped. The stop is not the reason for the poor-quality label; the quality downgrade existed pre-entry. The missed BE action is stored as management-process evidence.

### W15-E11 — Thursday London second long: more liquidity first, then strong bullish impulse (~39:10–41:10)

Benjamin continues to prefer buys because the daily-imbalance + PDL + timing context remains favorable, but he waits for a new low/liquidity event before re-entering.

**L1:** new low/liquidity is taken, price accumulates, then a strong bullish impulse appears. Benjamin notes that the move did not give the ideal body break he would normally prefer, but he accepts the aggregate confluence and waits for a reaction candle at his imbalance.

`setup_validity=valid_with_instructor_discretion`; `setup_quality_pre_entry=good_but_structure_imperfect`; `trade_taken=true`.

**L2:** confirmation/reaction entry, structural stop, target toward Asia/rejection-block liquidity. Exact friction unresolved.

**L3:** large favorable displacement follows. It cannot be used to justify relaxing the body-break requirement generally.

The Thursday London buys share `same_underlying_move_group=W15-THU-LON-LONG-MOVE` for dependence control.

### W15-E12 — Thursday post-news short: induced upper liquidity + reaction (~41:10–42:45)

News creates artificial liquidity/positioning; Benjamin sells after the manipulation in a context that includes inducement/Asia plus an induced 1H rejection-block area.

He explicitly presents two execution variants:
1. enter on touch of the imbalance;
2. wait for a reaction/confirmation candle.

These are **L2 execution alternatives**, not separate setup labels and not candidates to choose retrospectively by P&L. A more conservative stop above the wick is also shown. Spread/slippage around the news remain unresolved and must be simulated realistically later.

### W15-E13 — Thursday post-news long: valid example Benjamin did not take (~42:45–45:10)

Benjamin says he did not take this buy, although some students did. The sequence he describes is:

```text
lower liquidity sweep
-> candle formation
-> large bullish impulse
-> structure change
-> imbalance
-> retracement / optional confirmation
-> long candidate
```

A large news-generated imbalance creates multiple L2 choices: direct imbalance entry, confirmation after entry into the zone, or deeper full-candle/zone mitigation. Stop distance is materially wider due to news volatility.

`trade_taken=false`; `setup_validity=valid/recognized example`; `missed_trade=true` for instructor-replication accounting.

This is important for recall: a valid setup is not required to have been personally executed by Benjamin.

### W15-E14 — Friday feed-discrepancy no-trade: rejection block valid on Forex.com but invalid on FXCM (~45:20–48:00)

This is Week 15's most important data-engineering finding. A rejection block appears valid on **Forex.com**, but Benjamin switches to **FXCM** and shows that the equivalent zone is already touched/invalid there.

His explicit instruction is to analyze with Forex.com and validate the zone with FXCM; if the zone is not valid on both, remove it.

```text
broker_feed_agreement_required_for_this_POI = true (instructor-explicit Week 15)
Forex.com_zone_valid = yes
FXCM_zone_valid = no
final_Poi_status = reject
```

This must not be turned into an arbitrary universal multi-broker threshold without further course evidence, but automated reconstruction **must record data-provider dependence**. A pattern that exists only because of one vendor's OHLC cannot be silently treated as canonical.

Benjamin did not take the initial Friday buy shown in this discussion.

### W15-E15 — Friday HTF direction: daily imbalance favors buys but does not categorically ban sells (~48:00–49:30)

Benjamin explicitly says that with price reacting inside a daily imbalance after previous-week-low/PDL context, buys have greater probability. He also says sells can still be taken, but with awareness that they are lower-probability against the higher-timeframe context.

This is stored as a **probability/quality layer**, not a hard directional veto and not a P&L-derived threshold.

### W15-E16 — Friday post-NFP short: 4H high sweep + confirmation, discretionary BE -> BE (~49:30–52:20)

After the NFP expansion, Benjamin says he wants upper/equal-high liquidity removed before searching for a short. A 4H maximum is swept during the second NY window, then bearish structure information appears.

He says he did not enter on the earliest structure event; because price had been rising strongly, he waited for a clearer large bearish confirmation candle.

**Ordered state:**

```text
post-NFP state + valid second NY window
-> equal/upper liquidity requirement
-> 4H maximum swept
-> bearish structure change / local impulse
-> imbalance available
-> extra bearish confirmation chosen by Benjamin
-> short fill
```

Alternative earlier entries at the impulse-created imbalance or later structure+imbalance confirmation are L2 counterfactual variants only.

Benjamin moves to BE after a large favorable impulse because he is uncertain. Price subsequently removes him at BE and later resumes upward reaction from the daily imbalance.

Correct separation:
- original entry evidence = L0/L1 above;
- chosen extra confirmation + BE = L2 management/execution;
- BE result and later rise = L3.

`trade_taken=true`; `final_exit_reason=BE`; exact realized R/spread unresolved.

---

## Week 15 methodological findings

1. **Liquidity remains primary over isolated orderblock/imbalance geometry.** Tuesday is explicit: an imbalance with no inducing maximum/minimum/liquidity is not relevant enough by itself.
2. **Timing remains a true L0 gate.** Monday's late short and Wednesday NY no-trade show that complete-looking geometry does not override a missed operating window.
3. **Validity, quality, action and result are distinct.** Thursday's first long is taken but already labeled poor quality before it loses; Thursday's post-news long is recognized as valid although Benjamin does not take it.
4. **Approach-generated liquidity matters pre-entry.** Thursday provides explicit instructor evidence that heavy new liquidity/accumulation around the entry can downgrade the setup before outcome.
5. **Body-break preference is not an absolute rule in every discretionary example.** Wednesday rejects the first wick-like break; Thursday later accepts a long despite admitting the ideal body break is missing because the broader confluence is unusually strong. This remains an instructor-discretion case, not permission to loosen the detector from P&L.
6. **News materially changes L2 realism.** Tuesday/Thursday/Friday include wider candles, larger stops and explicit broker-spread concerns; ideal frictionless fills are not assumed.
7. **Broker/feed disagreement is a first-class measurement problem.** Friday explicitly rejects a rejection block that is valid on Forex.com but not FXCM. Source-feed identity must be retained in any OHLC reconstruction.
8. **HTF direction changes probability, not necessarily eligibility.** Friday again supports a graded directional prior rather than an unconditional countertrend ban.
9. **BE is partly discretionary in the source.** Tuesday and Friday explicitly tie fast BE to uncertainty; these examples cannot be converted into a universal profitable BE threshold by looking at later outcome.
10. **Multiple tickets/entries on the same move are correlated.** Monday, Wednesday and Thursday variants are grouped and cannot inflate sample size.

## Detector / schema consequences

### Instructor-replication candidates reinforced

- `required_liquidity_event` must be identified before LTF activation.
- POI relevance should retain whether the area is induced by meaningful max/min liquidity.
- timing/session eligibility is evaluated before entry confirmation.
- `approach_new_liquidity_count/prominence` and prolonged pre-entry accumulation remain first-class features to measure.
- `impulse_confirmed` and `structure_change_confirmed` stay separate.
- `source_feed/broker` and cross-feed POI agreement must be retained where Benjamin explicitly uses it.
- direct imbalance, confirmation-candle and deeper-zone entries are separate L2 variants over one L1 setup.

### Still unresolved / forbidden to guess

- numeric threshold for “enough” inducement or proximity between POI and liquidity;
- exact numeric body/penetration threshold for a valid structure break;
- exact numeric approach-liquidity amount that makes a setup poor;
- whether two-feed validation applies to all POI types or only the rejection-block workflow shown here;
- exact spread/slippage during NFP/news;
- exact fill prices, ATR-normalized distances, MFE/MAE and realized R without historical OHLC reconstruction;
- a universal BE trigger from the instructor's discretionary uncertainty comments.

## v2 completeness gate

- [x] source interval known for each indexed example;
- [x] L0 context recorded;
- [x] relevant liquidity linked descriptively where visible/verbalized;
- [x] activation sequence reconstructed chronologically;
- [x] impulse separated from displacement;
- [x] structure reference/status explicit or marked imperfect/unresolved;
- [x] entry/no-trade decision stored before outcome;
- [x] L2 order/fill realism and news/broker uncertainty recorded;
- [x] L3 isolated from entry justification;
- [x] duplicate/day/week/same-move dependence documented;
- [x] unresolved fields preserved without guessing.

**Week 15 passes the v2 completeness gate.**
