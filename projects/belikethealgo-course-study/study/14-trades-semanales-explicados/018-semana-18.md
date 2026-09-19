# 14 Trades Semanales Explicados — Semana 18

Status: **COMPLETE — v2 measurement gate passed**

## Evidence reviewed

- Published source: `18) Trades Semana 18.mp4`.
- Full source duration: **1758.95 s (~29m19s)**.
- Full timestamped transcript reviewed chronologically.
- Full-video dense evidence reviewed at **1 fps (1,759 frames)** and **2 fps (3,518 frames)** with timestamped contact sheets, including all identified trade/example/no-trade intervals.
- Instructor replication is kept separate from P&L optimization. No L0/L1 detector threshold is selected from outcome.
- Exact historical date/DST alignment, raw OHLC/ATR, broker spread/slippage, exact fills, MFE/MAE and several exact realized-R values remain `unresolved` / `pending_ohlc_reconstruction`.

## v2 event inventory

### W18-E01 — Monday: no Benjamin trade; later NY sell examples are recognizable but not personally executed

**L0 known before activation:** weekly/daily rejection-block context is discussed, but Benjamin notes the weekly area lacks ideal prior liquidity. During Monday, price leaves the area before his preferred NY timing; he wanted a relevant maximum/PDH-style liquidity event in the operating window.

**Ordered information:**

```text
HTF area/context
-> move begins too early relative to preferred NY window
-> later valid NY windows show bearish structure/imbalance reactions
-> possible sell examples
```

`trade_taken=false`; Benjamin explicitly says he did not trade Monday and did not see it clearly enough. The later fall cannot upgrade his original decision. Potential Asia-low target is L2 planning, not entry evidence.

### W18-E02 — Tuesday London short: canonical recognized trade after liquidity + structure + impulse

**L0:** PDH/other upper liquidity is available; Frankfurt action is treated as manipulation/noise rather than the preferred entry window. London must be open before Benjamin accepts the sequence.

**Ordered L1:**

```text
upper liquidity available
-> Frankfurt manipulation / no accepted activation
-> London opens
-> liquidity is resolved
-> structure change
-> strong bearish impulse
-> multiple imbalances created
-> retracement/reaction at imbalance
-> short activation
```

`setup_validity=valid`; `setup_quality_pre_entry=high/recognized`; this is the only Tuesday trade Benjamin says he saw.

**Impulse vs displacement:** the forceful bearish move that changes structure and creates imbalances is L1 `impulse`; the much larger continuation later in the day is L3 `displacement` and is not used to justify entry.

**L2:** direct touch vs reaction-candle entry and aggressive vs conservative stop are explicitly separate execution variants. Benjamin discusses ~0.4 pip difference between two stop placements and an even more aggressive ~2.5-pip illustration. These are not detector thresholds. Partial-taking and runner management are also L2.

**L3:** later continuation reaches very large illustrated R multiples and lower liquidity. Those outcomes remain outcome/counterfactual evidence only.

### W18-E03 — Wednesday New York long: Benjamin takes valid setup and is stopped

London is largely lateral after an earlier news event. Benjamin waits for New York and for a relevant 5m minimum to be liquidated before considering buys.

**Ordered L1:**

```text
NY context after earlier liquidity/structure resolution
-> selected 5m minimum available
-> minimum swept
-> strong bullish local impulse
-> imbalances created
-> long activation
```

`trade_taken=true`; `setup_validity=valid/recognized`; `setup_quality_pre_entry=acceptable_but_degraded` because Benjamin explicitly says he did not like the accumulation forming near the entry.

**L2:** exact fill/spread/slippage unresolved. His projection was materially higher, but target ambition is execution/planning information.

**L3:** the trade is stopped. The stop does not create the quality downgrade; the accumulation concern was already known before result. Price later makes the broader bullish change, but Benjamin does not re-enter. This later move cannot be used to relabel the stopped entry.

### W18-E04 — Thursday London: no trade because manipulation occurred too early

Benjamin sees the relevant manipulation roughly two hours before London open and explicitly calls the would-be setup invalid for his process because he would not be watching/trading then.

`trade_taken=false`; `setup_validity=invalid_for_baseline_timing`; `no_trade_reason=liquidity_manipulation_too_early_before_london`.

This is strong L0 negative evidence: visually similar later geometry does not repair an event that occurred outside the required operating state.

### W18-E05 — Thursday New York long: Benjamin executes after lower liquidity/POI interaction

Benjamin contrasts two imbalances: one has something meaningful to manipulate beforehand and the other does not. He attempts a buy after the relevant lower-side interaction and enters on a 5m imbalance during the NY window.

**Ordered L1:**

```text
NY valid time + 1H imbalance/location
-> relevant lower liquidity available
-> liquidity interaction/manipulation
-> local bullish reaction/impulse
-> 5m imbalance available
-> long activation
```

`trade_taken=true`; `setup_validity=valid/recognized`.

**Approach quality:** the key ex-ante distinction is not simply “imbalance present”; Benjamin explicitly prefers the zone that has prior liquidity to manipulate. Exact quantitative approach efficiency/overlap remains unresolved.

**L2:** confirmation-candle entry is shown as an alternative. Benjamin takes partials/protection near a 5m maximum aligned with the 1H imbalance because he views it as extreme liquidity. Exact partial fraction/fill is unresolved.

### W18-E06 — Thursday New York sell-at-imbalance idea rejected until liquidity is created/taken

Benjamin explicitly rejects selling merely because price reaches the upper imbalance: the first apparent sell area has **nothing prior to liquidate**. He waits for price to create/manipulate upper liquidity and only then describes the bearish reaction as actionable.

```text
upper imbalance touch alone
-> no prior liquidity to take
-> immediate sell = invalid / insufficient
-> liquidity is created and then swept
-> bearish reaction + first mitigated imbalance / structure information
-> short candidate
```

This is first-class negative evidence that `POI/imbalance touch != valid entry` without the liquidity sequence.

**L2:** aggressive vs conservative structure reference, confirmation entry and imbalance entry are separate variants. A PDL/previous-low target and illustrated ~4.5R belong to planning/outcome layers, not L1.

### W18-E07 — Friday post-news long: Benjamin takes trade after 4H minimum sweep

**L0:** market is bearish but Benjamin explicitly allows counter-direction buys if a relevant minimum is broken/manipulated. There is scheduled news around 10:00 Spain, so he waits until after the release rather than entering into it.

**Ordered L1:**

```text
news pending -> no pre-news activation
-> news released
-> 4H-relevant minimum swept
-> local bullish structure/intent
-> first respected imbalance
-> strong confirmation candle / bullish impulse
-> long activation
```

`trade_taken=true`; `setup_validity=valid/recognized`; `setup_quality_pre_entry=good` in instructor narration.

**L2:** Benjamin shows aggressive vs conservative stop placement around the last impulse/structure. Minimum target is a 15m/Asia maximum; partials can be taken earlier depending on execution. These are management choices.

**L3:** Benjamin lets his position run to Asia liquidity and then closes the whole remaining operation. The favorable result is not used to define the entry detector.

## Methodological findings from Week 18

1. **Timing remains a real L0 gate.** Monday and Thursday show that attractive geometry outside Benjamin's operating state is not repaired by later price action.
2. **Liquidity must precede the POI/activation logic.** Thursday's paired imbalance examples explicitly distinguish a zone with something to manipulate from one with nothing prior to liquidate.
3. **Impulse and displacement are observably different.** Tuesday's entry impulse creates structure/imbalances; the later all-day selloff is downstream displacement and cannot calibrate the entry impulse threshold.
4. **Validity, pre-entry quality and result remain independent.** Wednesday is valid/taken but already carries an accumulation concern before it stops.
5. **News is stateful rather than a simplistic outcome filter.** Friday waits for the release, then uses post-news liquidity/confirmation; Wednesday's earlier news leaves London lateral and shifts attention to NY.
6. **Execution aggressiveness is L2.** Tuesday/Thursday/Friday repeatedly compare direct vs confirmed entries and aggressive vs conservative stops. Benjamin even links aggressiveness to account state/backtesting; this is execution research only and must never select L0/L1 detector thresholds from P&L.
7. **Large later R multiples are not independent evidence for the setup.** Tuesday's long continuation is retained in L3 only.

## Dependence / correlation controls

- Day clusters: `W18-MON`, `W18-TUE`, `W18-WED`, `W18-THU`, `W18-FRI`.
- Thursday long and later short belong to the same evolving NY session and must not be treated as fully independent validation samples.
- Multiple entry/stop variants shown for one underlying move are execution variants, not separate trades.
- No duplicate published source is identified for Week 18.

## Unresolved / pending reconstruction

- exact historical date and DST/session-clock mapping;
- exact OHLC/ATR and quantitative impulse/displacement measurements;
- exact approach efficiency/overlap/body-dominance metrics;
- exact decision/order/fill prices, spread and slippage;
- exact MFE/MAE and milestone timestamps;
- exact realized R and partial fractions;
- synchronized DXY state where not visible;
- whether every instructor-described possible Monday entry should be labeled baseline-valid versus merely illustrative.

Nothing is guessed to close these fields.

## v2 completeness gate

- full transcript reviewed chronologically: **PASS**;
- full-video dense visual coverage: **PASS**;
- positive + negative/no-trade inventory: **PASS**;
- ordered event/known-time logic: **PASS**;
- impulse separated from displacement: **PASS**;
- L0/L1 separated from L2/L3: **PASS**;
- validity vs pre-entry quality vs action vs result: **PASS**;
- approach quality recorded without P&L threshold invention: **PASS**;
- realistic execution variants recorded; unknown fills not guessed: **PASS**;
- duplicate/correlation groups recorded: **PASS**;
- unresolved fields explicitly retained: **PASS**.

**Week 18 is closed under v2. Week 19 is the next permitted material. Benjamin baseline remains unfrozen until Weeks 1–5 are backfilled under `docs/v2_backfill_plan.md`.**