# 14 Trades Semanales Explicados — Semana 16

Status: **COMPLETE — v2 measurement gate passed**

## Evidence reviewed

- Published source: `16) Trades Semana 16.mp4`.
- Full source duration from dense extraction: **2421.65 s (~40m22s)**.
- Full timestamped transcript reviewed chronologically: **362 segments**.
- Full-video dense visual evidence reviewed without outcome-selected sampling:
  - baseline: **2,422 frames at 1 fps**;
  - focus: **4,844 frames at 2 fps**;
  - 202 baseline contact sheets + 404 focus contact sheets.
- Monday–Friday chart states were cross-checked against the dense sequence around all identified trade/example/no-trade events.
- This record is for **instructor replication**, not P&L optimization. No detector threshold is selected from trade outcome.
- Exact historical date, raw OHLC/ATR, broker-specific spread/slippage, exact fills, exact MFE/MAE and several exact realized-R values are not recoverable from this source alone and remain `unresolved` / `pending_ohlc_reconstruction`.

## v2 separation

- **L0:** HTF direction/location, existing liquidity, session/subwindow, news state, Asia/previous-period extremes and POIs already knowable before activation.
- **L1:** liquidity take, reaction, local impulse, imbalance creation, structure/candle confirmation and retracement known before the entry decision.
- **L2:** decision/order time, market/confirmation/zone execution, requested stop/target, aggressive vs conservative stop, BE/partial choices and fill friction.
- **L3:** subsequent displacement, MFE/MAE, BE/stop/TP outcome, later continuation and counterfactual profitability.

Only L0+L1 may justify the original entry. `setup_validity`, `setup_quality_pre_entry`, `trade_taken` and result are stored independently.

**Impulse and displacement remain separate:** the local confirmation move that creates/validates an imbalance is L1 `impulse`; the broader directional travel after activation/entry is `displacement`, and cannot be used to backfill the entry rationale.

---

## Chronological trade / example / no-trade inventory

### W16-E01 — Monday London long: recognized valid opportunity Benjamin did not take (~04:46–07:15)

**Identity:** `canonical_example_id=W16-E01`; `same_market_day_group=W16-MON`; independent recognized opportunity.

**L0:** price reaches the previously marked area during London. Benjamin rejects one apparent trap/orderblock-style object because it lacks inducement; location alone is therefore insufficient.

**Ordered L1:**

```text
valid London context
-> relevant area reached
-> local liquidity/reaction
-> structure change
-> good candle formation
-> bullish impulse creates/validates imbalance
-> retracement/mitigation of the imbalance
-> long candidate
```

`setup_validity=valid`; `trade_taken=false`; `missed_trade=true` for replication accounting. Benjamin later explicitly calls this a valid trade he did not take.

**L2:** aggressive and wider structural stop alternatives are shown. Once a meaningful minimum is broken with force, BE/protection becomes a management option. Exact fill and friction remain unresolved.

**L3:** later favorable movement is retained only as outcome/path evidence and does not create the validity label.

### W16-E02 — Monday New York first reaction: liquidity + impulse but insufficient confirmation, so no immediate entry (~07:25–08:20)

Upper liquidity is swept and a local impulse appears, but Benjamin explicitly rejects the first reaction as incomplete: there is no adequate confirmation candle and the proposed structure change would be forced because there is no clean accumulation/range to justify that reference.

```text
liquidity_sweep = true
local_impulse = present
confirmation_candle = insufficient
structure_reference = forced/weak
entry_activation = false at this stage
```

This is important negative evidence: **liquidity sweep + an impulse-like move is not automatically a complete entry**.

### W16-E03 — Monday New York short: later complete activation, Benjamin takes it -> BE (~08:20–09:50)

After the second New York window becomes relevant, Benjamin remains interested in sells. A cleaner bearish reaction appears in valid time and the imbalance can be used for execution.

**Ordered L1:**

```text
valid NY time + upper liquidity already resolved
-> bearish reaction
-> usable structure/candle information
-> local bearish impulse
-> imbalance available
-> rejection/confirmation at the entry area
-> short activation
```

`trade_taken=true`; `setup_validity=valid/recognized`; `setup_quality_pre_entry=acceptable`.

**L2:** Benjamin shows aggressive versus conservative stop placement. He explicitly discusses using backtesting to compare stop variants. Under v2 this is stored as **execution-variant research only**; it cannot choose L0/L1 detector thresholds. After a forceful minimum break he protects at BE.

**L3:** Benjamin states that his more conservative management produced **break-even**. Any counterfactual in which another stop placement would have produced a different result remains L3/L2-variant analysis, not a reason to relabel the entry.

### W16-E04 — Tuesday early London candidate: skipped/degraded because activation arrives too early and preferred liquidity is incomplete (~09:56–11:55)

Benjamin wanted additional accumulated liquidity to be swept; only one maximum had been removed. The reaction occurs around ~08:39–08:40 Spain, before his normal London operating start.

He says he is not a fan of trading before 09:00 and would require an unusually clear setup closer to ~08:50–08:55. By London open, much of the move is already gone.

`trade_taken=false`; `setup_quality_pre_entry=downgraded`; `no_trade_reason=too_early_plus_incomplete_preferred_liquidity`.

His comments that pre-09:00 trades have historically produced worse results are retained as an **instructor probability/performance hypothesis**, not converted into a P&L-selected detector threshold.

### W16-E05 — Tuesday New York long example: full confirmation stack in valid time (~13:54–16:25)

Around the later New York window Benjamin identifies relevant liquidity and then narrates a complete confirmation stack.

**Ordered L1:**

```text
valid NY time + relevant liquidity/context
-> liquidity interaction
-> bullish reaction
-> structure change
-> good bullish impulse
-> good candle formation
-> imbalance created
-> retracement/entry area
-> long activation
```

Benjamin explicitly names **cambio de estructura + buen impulso + buena formación de velas + imbalances**. `setup_validity=valid/recognized`.

Whether Benjamin personally executed this exact example is not stated cleanly enough in the reviewed evidence, so `trade_taken=unresolved` rather than guessed.

**L2:** aggressive/conservative stop alternatives are shown; target is framed toward the next higher liquidity/1H area. Exact fill/spread/slippage unresolved.

**L3:** the very large later R-multiple he illustrates is counterfactual/outcome evidence only and is forbidden from selecting entry thresholds.

### W16-E06 — Wednesday London long: taken after liquidity absorption + impulse/imbalance (~18:27–23:40)

Benjamin says he entered around London open after price reached the expected area.

**L0:** upper-side context/POI and London timing are already known. During the approach, price creates substantial local liquidity; Benjamin interprets the large wick/behavior as absorption/liquidity information rather than treating the zone touch alone as sufficient.

**Ordered L1:**

```text
London context + candidate area
-> local liquidity builds during approach
-> liquidity absorption / wick event
-> structure change
-> first usable imbalance
-> bullish impulse / candle confirmation
-> long activation
```

`trade_taken=true`; `setup_validity=valid/recognized`.

**Approach quality:** not stored as a profitable numeric threshold. The approach is qualitatively liquidity-building/absorptive according to Benjamin's narration; exact efficiency/overlap/body-dominance metrics remain `pending_ohlc_reconstruction`.

**L2:** structural stop and roughly 3R target illustration are shown. Benjamin strongly prefers moving to BE after a meaningful minimum/structure milestone rather than tolerating many full stops. This is his management preference and remains L2.

**L3:** whether BE later removes an otherwise winning trade is irrelevant to original validity. Benjamin explicitly acknowledges this trade-off.

### W16-E07 — Wednesday New York long candidate: upper liquidity sweep + aggressive bullish confirmation (~23:48–26:35)

Benjamin waits for accumulated/London-session upper liquidity to be removed. After the sweep he observes bullish intent and an aggressive structure interpretation.

```text
upper liquidity target present
-> liquidity swept
-> bullish reaction
-> local bullish impulse
-> imbalance
-> aggressive structure-change interpretation
-> long candidate
```

The structure reading is explicitly more aggressive/forced than ideal, so `setup_quality_pre_entry` is downgraded/uncertain rather than silently promoted by the later path. Exact personal execution status is not cleanly recoverable and remains `trade_taken=unresolved`.

### W16-E08 — Wednesday New York bearish opportunity after the long-side sequence: Benjamin does not take it (~26:35–28:20)

A later bearish change/impulse and imbalance appear around good timing. Benjamin explicitly says he did **not** take the sale.

`trade_taken=false`; `same_market_day_group=W16-WED`; `same_underlying_move_group=W16-WED-NY-SEQUENCE` with the immediately preceding NY idea because both belong to the same evolving session structure.

Aggressive/conservative stop and BE alternatives are L2. Heavy accumulated liquidity lowers Benjamin's confidence and is stored as pre-entry/management context, not as an outcome-derived filter.

### W16-E09 — Thursday London short: Benjamin takes a weak-quality entry -> stop (~28:20–31:10)

Benjamin wanted PDH/upper liquidity resolution and a reaction lower, but he already disliked the amount of liquidity accumulated during the approach and preferred more of it to be swept first.

He nevertheless enters after London opens, price changes structure and returns to the imbalance.

```text
trade_taken = true
context_gate_passed = true
approach_generated_liquidity = high qualitatively
preferred_liquidity_resolution = incomplete
setup_quality_pre_entry = downgraded by instructor
```

Price then accumulates further. Benjamin notes that BE protection would have been reasonable. He later describes the entry as not a good/best entry.

**L3:** the trade stops. The stop does **not** create the poor-quality label; the quality concerns existed before the outcome.

### W16-E10 — Thursday New York post-news long: taken after manipulation + second-window reaction (~31:14–33:25)

**L0:** news event, valid marked zone, inducement/liquidity and the later preferred New York timing are visible before activation.

News manipulates/touches the zone while leaving relevant trendline/local liquidity. Near the second preferred window (~15:27–15:28 Spain in narration), that liquidity is swept and price reacts.

**Ordered L1:**

```text
news/zone context + inducement
-> news manipulation into zone
-> remaining local liquidity
-> sweep in preferred NY subwindow
-> reaction
-> candle formation / local bullish impulse
-> long activation
```

`trade_taken=true`; `setup_validity=valid/recognized`.

**L2:** Benjamin shows a slightly different entry variant that would cover the nearby orderblock more fully; this remains a separate execution choice. He later takes partial/protection actions. Exact partial fraction, fill, spread and slippage are unresolved.

**L3:** subsequent ranging/fall and realized management result are outcome data only.

### W16-E11 — Thursday later short candidate: structurally plausible, Benjamin skips because he is not clear (~33:25–34:10)

Price touches a rejection-block-style area, removes liquidity, changes structure and later falls. Benjamin explicitly says he did not see it clearly enough and did not enter.

`trade_taken=false`; `setup_validity=unresolved/recognized_possible`; `no_trade_reason=instructor_uncertainty`.

Because the evidence does not establish whether this should be a baseline-valid setup or a discretionary near-entry, it remains unresolved rather than using the later drop to upgrade it.

### W16-E12 — Friday London short: early Asia-side sweep, but later in-window setup remains actionable (~34:10–38:40)

Benjamin dislikes that the Asia high was swept before London open, but he does **not** treat that earlier timing as permanently invalidating the entire session. Around ~10:44 Spain there is still time left in the London window and he recognizes a less-common but actionable short sequence.

**L0:** London still open; large 15m imbalance/area and substantial trendline liquidity are visible; Asia low/lower liquidity remains available as objective.

**Ordered L1:**

```text
early Asia-high sweep occurred before London
-> later valid London timing remains
-> 15m area / local POI interaction
-> local liquidity/rejection-block reaction
-> bearish local impulse
-> small usable imbalance
-> optional reaction-candle confirmation
-> short candidate
```

`setup_validity=valid/recognized`; personal execution is not stated clearly enough, so `trade_taken=unresolved`.

**L2:** Benjamin shows aggressive (~3.9 pip) versus wider (~4.9 pip) stop illustrations and optional reaction-candle confirmation. These are execution variants, not detector thresholds.

**L3:** later target/partial discussion is management evidence. The later favorable path cannot retroactively make the early sweep timing universally acceptable.

### W16-E13 — Friday New York: no clear trade; news fragments both operating windows (~38:40–40:22)

Benjamin says he sees little of interest in New York. Relevant news around the first and later NY windows disrupts the session structure and he does not identify a clear entry.

`trade_taken=false`; `no_trade_reason=news_fragmented_session_plus_no_clear_complete_activation`.

This is first-class no-trade evidence: a day can contain visible volatility and chart structure yet still provide no baseline entry.

---

## Week 16 methodological findings

1. **Liquidity + local impulse is not sufficient by itself.** Monday NY explicitly rejects the first reaction because confirmation is incomplete and the proposed structure change is forced.
2. **Execution variants must stay out of detector calibration.** Across Monday, Tuesday, Wednesday and Friday Benjamin contrasts aggressive/conservative stops and aggressive/confirmed entries. These are L2 variants; their later P&L cannot choose L0/L1 thresholds.
3. **Timing is an L0 state, not a hindsight statistic.** Tuesday's ~08:39–08:40 candidate is skipped/degraded before London. Benjamin's historical-performance comments remain hypotheses, not threshold-selection evidence.
4. **Approach-generated liquidity is genuine pre-entry information.** Thursday London is a clean example: Benjamin takes the trade but already dislikes the accumulating liquidity before the later stop.
5. **Validity/quality/action/result remain distinct.** Monday London is valid but not taken; Thursday London is taken but poor quality; Thursday later short is skipped despite a later favorable move; none of those labels are derived from L3.
6. **News can be contextual rather than automatically binary.** Thursday post-news manipulation can feed a later valid second-window setup, while Friday's news placement fragments New York enough that Benjamin sees no clear trade. No universal news exception is invented beyond the explicit course rules.
7. **An early liquidity sweep does not necessarily invalidate the rest of the session forever.** Friday's pre-London Asia-high sweep is disliked, yet a later in-window setup is still recognized. Event order and current state must therefore be stored explicitly.
8. **BE preference is management policy, not entry evidence.** Benjamin repeatedly accepts that aggressive BE can remove trades that later travel; those later paths are L3 and cannot justify the original entry or select a detector.

## Dependence / duplicate controls

- `W16-MON`, `W16-TUE`, `W16-WED`, `W16-THU`, `W16-FRI` are day clusters.
- Multiple entries/near-entries from the same New York sequence are assigned a `same_underlying_move_group` where appropriate and are not counted as independent validation samples.
- No exact duplicated published video was identified for Week 16.

## Unresolved / pending OHLC reconstruction

- exact historical date/time alignment and DST verification;
- exact OHLC, ATR and all candidate quantitative impulse/displacement measurements;
- exact approach efficiency/overlap/body-dominance metrics;
- exact decision/order/fill prices, spread and slippage;
- exact MFE_R/MAE_R and milestone times;
- exact realized R/partial fractions for several managed trades;
- synchronized DXY state where it is not visible in the source;
- personal execution status for some recognized Tuesday/Wednesday/Friday examples where Benjamin does not state it unambiguously.

Nothing above is guessed to close those fields.

## v2 completeness gate

- full transcript reviewed: **PASS**;
- full-video dense visual coverage: **PASS**;
- positive + negative/no-trade inventory: **PASS**;
- ordered event/known-time logic preserved at source resolution: **PASS**;
- impulse separated from displacement: **PASS**;
- L0/L1 separated from L2/L3: **PASS**;
- validity vs pre-entry quality vs action vs result separated: **PASS**;
- approach quality recorded without P&L threshold invention: **PASS**;
- execution variants/realism recorded and unresolved fills not guessed: **PASS**;
- duplicate/correlation groups recorded: **PASS**;
- unresolved fields explicitly retained: **PASS**;
- instructor replication separated from P&L optimization: **PASS**.

**Week 16 is therefore complete under measurement schema v2.** Week 17 may be processed next, but the Benjamin baseline remains unfrozen until Weeks 1–5 are backfilled to v2 under `docs/v2_backfill_plan.md`.