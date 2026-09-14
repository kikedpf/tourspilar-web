# BeLikeTheAlgo Study Progress

## Ordering rule
Study strictly in published order: folder 1 -> folder 2 -> ... -> last folder. Within each folder, video 1 -> video 2 -> ... . Do not mark a video complete until all trades/examples/no-trades and relevant visual explanations are indexed.

## 1) Bienvenido a la Formación — MODULE COMPLETE

### 1) Bienvenido a la Formación.mp4 — COMPLETE
- Introductory video; no technical trading rules or chart trades.
- Benjamin states that the training explains his trading method and includes a large weekly-trade archive.

## 2) Principios Básicos — MODULE COMPLETE

### 1) Divergencias.mp4 — COMPLETE
- EUR/USD is the primary pair; DXY is contextual confirmation.
- EUR/USD and DXY are generally treated inversely.
- DXY conflict / unfinished opposing liquidity can filter an EUR/USD setup.
- Detailed record: `study/02-principios-basicos/01-divergencias.md`.

### 2) Horarios y Sesiones del Algoritmo.mp4 — COMPLETE
- Main windows: London 09:00–11:00 Spain / 03:00–05:00 New York; New York 14:00–16:30 Spain / 08:00–10:30 New York.
- Preferred subwindows are higher-attention periods, not proof that every setup elsewhere in the valid session is invalid.
- DST handling remains mandatory for backtest implementation.
- Detailed record: `study/02-principios-basicos/02-horarios-y-sesiones.md`.

### 3) Calcula el Riesgo por Operación.mp4 — COMPLETE
- Recommended trade risk: 0.5%–1%.
- Position size derives from percentage risk and actual stop distance, not fixed lots.
- Detailed record: `study/02-principios-basicos/03-calcula-el-riesgo.md`.

### 4) Cuidado con las Noticias.mp4 — COMPLETE
- No new market entry with <30 minutes before relevant red EUR/USD news.
- USD/US bank holiday: no trading day.
- Broad European-bank holiday condition can cancel London while New York may remain available.
- Detailed record: `study/02-principios-basicos/04-cuidado-con-las-noticias.md`.

## 3) Estructura — MODULE COMPLETE

### 1) Estructura V1.mp4 — COMPLETE
- Continuation structure break vs directional structure change distinguished.
- Relevant swing is structural, not every internal swing.
- Wick-only violation can be liquidity; valid change requires body break + force.
- Aggressive and conservative structural references both exist.
- HTF context: weekly/daily/4H/1H; LTF execution search: 1–5m.
- Detailed record: `study/03-estructura/01-estructura-v1.md`.

### 2) Estructura V2.mp4 — COMPLETE
- External vs internal liquidity integrated into structure.
- LTF break quality requires body/force/impulse; slow or wick-only breaks are rejected.
- Imbalance creation, clean candle formation and follow-through help rank confirmations.
- HTF structure changes probability/priority, not necessarily an absolute directional ban.
- Detailed record: `study/03-estructura/02-estructura-v2.md`.

## 4) Imbalances — MODULE COMPLETE

### 1) Imbalances Vol 1.mp4 — COMPLETE
- Three-candle geometry: candle 1 and candle 3 must not touch/overlap.
- Used as HTF zones and LTF entry tools.
- Untouched/clean status matters; first later touch mitigates the zone for Benjamin's clean-use logic.
- Liquidity confluence raises relevance but is not universally mandatory.
- Detailed record: `study/04-imbalances/01-imbalances-vol-1.md`.

### 2) Imbalances Vol 2.mp4 — COMPLETE
- Integrated workflow: valid session -> HTF zone -> LTF structure/reaction -> first usable LTF imbalance -> entry candidate.
- Limit-at-imbalance and candle-confirmation execution are both shown.
- Stop is structural/RR-aware rather than fixed-pip.
- Example targets next liquidity and illustrates ~2R; not accepted as universal expectancy.
- Detailed record: `study/04-imbalances/02-imbalances-vol-2.md`.

## 5) Orderblocks — MODULE COMPLETE

### 1) Tipos de Orderblocks.mp4 — COMPLETE
- Classic, rejection block and breaker block distinguished.
- Rejection block requires prior-wick sweep + strong displacement + untouched first-retest state and is Benjamin's preferred subtype.
- Breaker is mainly extra confluence.
- Detailed record: `study/05-orderblocks/01-tipos-de-orderblocks.md`.

### 2) Ejemplos de Orderblocks.mp4 — COMPLETE
- Worked classic/rejection/breaker examples indexed.
- Direct touch before inducement is lower probability than Benjamin's preferred classic sequence.
- Breaker overlapping an imbalance adds confluence rather than replacing the imbalance POI.
- Detailed record: `study/05-orderblocks/02-ejemplos-de-orderblocks.md`.

### 3) Las Orderblocks funcionan.mp4 — COMPLETE
- Core hierarchy made explicit: liquidity + valid timing + LTF reaction > orderblock.
- `orderblock_required_for_trade = false` under current course evidence.
- An orderblock without prior relevant liquidity can itself become liquidity.
- Detailed record: `study/05-orderblocks/03-las-orderblocks-funcionan.md`.

### Module 5 consolidated rule

```text
LIQUIDITY + VALID SESSION + LTF REACTION
> ORDERBLOCK
```

## 6) Importancia de las Velas Japonesas — MODULE COMPLETE

### 1) Importancia de las velas japonesas.mp4 — COMPLETE
- Candle shape is contextual, not autonomous.
- Do not judge/enter from an unfinished candle; closed-candle information only.
- Rejection wick alone is insufficient without clean directional decision/displacement.
- Preferred sequence: relevant liquidity/POI -> rejection -> strong decision/displacement -> often imbalance.
- Detailed record: `study/06-velas-japonesas/01-importancia-de-las-velas-japonesas.md`.

### 2) Formación de velas japonesas.mp4 — COMPLETE
- Benjamin explicitly teaches the preferred **patrón 1-3**.
- Candle 2 collects/creates the relevant extreme; candle 3 gives the decisive directional reaction.
- Similar geometry at irrelevant location is not equivalent.
- Not every rejection wick or first imbalance deserves entry.
- Detailed record: `study/06-velas-japonesas/02-formacion-de-velas-japonesas.md`.

### Module 6 consolidated rule

```text
VALID LOCATION / LIQUIDITY + VALID TIME
-> CLOSED rejection information
-> CLEAN 1-3-style reaction / displacement
-> often imbalance
-> entry candidate
```

Candidate candle measurements: `docs/candlestick_measurement_model.md`.

## 7) Rango de Asia — MODULE COMPLETE

### 1) AMD + Indicador Asia Session.mp4 — COMPLETE
- Duration: ~11.0 min; 81 transcript segments; 132 periodic frames plus visual-event evidence.
- AMD = **Acumulación -> Manipulación -> Distribución**.
- Asia accumulation interval is taught in **New York local time**, approximately 19:00–00:00. The `00:01` TradingView setting is explicitly an indicator-display workaround, not a conceptual extra minute.
- Asia high and low are treated as liquidity/confluence.
- Benjamin says not to search for entries merely while price remains unresolved inside the Asia box; he first wants one side liquidated/resolved.
- Worked example combines Asia liquidity + London timing + induced POI/orderblock + LTF rejection/imbalance execution.
- Exact wick-vs-close definition of an Asia boundary being `taken` remains unresolved pending liquidity calibration.
- Detailed record: `study/07-rango-de-asia/01-amd-indicador-asia-session.md`.

### 2) Tipos de escenarios (Judas y Retest).mp4 — COMPLETE
- Duration: ~25.2 min; 192 transcript segments; 303 periodic frames; 269 chart-state changes.
- Two instructor-explicit scenarios: **Asian Break Retest** and **Judas**.
- Judas: one side of Asia liquidity is manipulated/taken and price reacts in the opposite direction; Benjamin explicitly prefers this model.
- Asian Break Retest: an Asia boundary breaks first, price later retests the Asia/boundary area and then continues in the break direction.
- Repeated heuristic: a pre-London break makes a London retest worth watching, but a course example breaks early and never retests; therefore it is not deterministic.
- Correct timing matters: similar geometry around Frankfurt/too early is lower relevance for Benjamin than a valid London-window event.
- Negative evidence includes news-distorted days, early moves with no later entry, a break with no retest, and a Judas reaction that fails to complete through the opposite Asia boundary.
- Partial-profit management is advocated in a failed-follow-through example, but no objective partial percentage or trigger is specified.
- Detailed record: `study/07-rango-de-asia/02-tipos-de-escenarios-judas-y-retest.md`.

### Module 7 consolidated rule

```text
BUILD ASIA RANGE (New York local time)
-> treat Asia high/low as liquidity
-> wait for post-Asia resolution in/around valid session
-> classify context as Judas vs Break-Retest candidate
-> require POI/timing/LTF-reaction evidence before entry
```

Benjamin's phrases such as “most days”, “almost every day” or “always” are hypotheses, **not measured probabilities**. They must be tested over the weekly corpus. Candidate detectors and failure labels are defined in `docs/asia_range_measurement_model.md`.

## 8) Importancia de la Sesión de Londres — MODULE COMPLETE

### 1) London Killzone.mp4 — COMPLETE
- Duration: ~13.0 min; 113 transcript segments; 156 periodic frames; 84 detected chart-state changes.
- Benjamin teaches a probabilistic tendency: Asia accumulates and London often provides the manipulation/decisive move that establishes a high or low which survives through the rest of the trading day.
- This is explicitly not guaranteed: the lesson includes a Friday counterexample where New York later breaks the London minimum.
- London timing remains a confluence, not an autonomous entry trigger; valid liquidity, structure/location and LTF reaction evidence remain required.
- The lesson does not cleanly redefine a new Killzone interval beyond the earlier verified session schedule; later-than-preferred moves are described as riskier.
- Funding-account management suggestion: for a high-quality London trade while at breakeven/profit, around 3R Benjamin suggests taking a smaller ~30–40% partial and allowing a larger runner; this is conditional management advice, not a universal exit rule.
- Claims that London creates the daily high/low "most of the time" remain hypotheses to measure over the weekly corpus, not accepted probabilities.
- Detailed record: `study/08-sesion-de-londres/01-london-killzone.md`.
- Quantitative research specification: `docs/london_session_measurement_model.md`.

### Module 8 consolidated rule

```text
ASIA CONTEXT
-> LONDON RESOLUTION / MANIPULATION AROUND VALID TIMING
-> require liquidity + structure/location + LTF entry evidence
-> treat London extreme as a candidate same-day anchor, never a guaranteed daily high/low
-> conditionally allow a larger runner when trade quality and account state justify it
```

## 9) Liquidez del Mercado — MODULE COMPLETE

### 1) Dónde está la liquidez.mp4 — COMPLETE
- Duration: ~21.5 min; 178 transcript segments plus full periodic/state-change visual evidence.
- Liquidity is mapped around relevant highs/lows, repeated/consecutive highs/lows and trendline/staircase structures.
- A POI/orderblock in the middle of nowhere is insufficient; Benjamin wants it induced by/tied to meaningful liquidity.
- Liquidity is mapped top-down and the actual entry still requires valid timing plus LTF rejection/imbalance/confirmation.
- Detailed record: `study/09-liquidez-del-mercado/01-donde-esta-la-liquidez.md`.

### 2) Liquidez externa e interna.mp4 — COMPLETE
- Duration: ~18.6 min; 157 transcript segments plus full visual evidence.
- External liquidity = meaningful range/structure boundary or important prior/session extreme; internal liquidity = intermediate highs/lows formed inside the active range/impulse.
- Benjamin explicitly prefers entries after external liquidity is taken, while internal-liquidity trades remain possible when aligned with Daily/4H trend.
- Repeated course sequence: external liquidity -> internal retracement/liquidity -> renewed impulse/imbalance -> next external liquidity. This is stored as a hypothesis to measure, not a deterministic law.
- Late-entry risk increases when more internal liquidity has accumulated behind price.
- Detailed record: `study/09-liquidez-del-mercado/02-liquidez-externa-e-interna.md`.

### 3) Prioridad de la liquidez.mp4 — COMPLETE
- Duration: ~10.5 min; 86 transcript segments plus full visual evidence.
- Instructor hierarchy: **Weekly > Daily > 4H > 1H > 15m**; for intraday Benjamin particularly favors 4H/1H and says 1H works best for him.
- Critical qualification: timeframe label alone does not make a level relevant. PWH/PWL/PDH/PDL can be ignored when they sit inside a larger range instead of at the meaningful structural/range extreme.
- For beginners, if no relevant liquidity is visible on 1H or above, Benjamin recommends not forcing 15m levels; the session can simply be no-trade.
- High-priority liquidity taken outside valid trading hours is not an entry trigger.
- Detailed record: `study/09-liquidez-del-mercado/03-prioridad-de-la-liquidez.md`.

### Module 9 consolidated rule

```text
MAP LIQUIDITY CANDIDATES
-> rank nominally by Weekly > Daily > 4H > 1H > 15m
-> require structural/range relevance, not just a named period level
-> classify external vs internal
-> wait for relevant liquidity interaction in valid session
-> require POI + reaction/displacement/entry confirmation
-> use remaining liquidity to frame targets and late-entry risk
```

Exact equality tolerance, wick-vs-close sweep semantics and dynamic range/external-internal transitions remain calibration problems. Research specification: `docs/liquidity_measurement_model.md`.

## 10) Trades de Alta Probabilidad — MODULE COMPLETE

### 1) Ejemplo de trade.mp4 — COMPLETE
- Duration: ~16.5 min; 191 transcript segments; 198 periodic frames; 53 detected chart-state changes.
- Module 10 is a probability-ranking layer, not a new standalone entry model.
- Benjamin explicitly ranks a setup higher when meaningful liquidity remains available in the intended trade direction and lower when the approach has already consumed most nearby target-side liquidity.
- Preferred approach into an LTF imbalance is corrective/liquidity-building; an aggressive approach with little remaining target-side liquidity is downgraded because it may continue through/manipulate the apparent reversal setup.
- Normal valid-session and LTF confirmation requirements remain mandatory.
- Nearest meaningful target-side liquidity is repeatedly used as a first management milestone and candidate BE trigger, pending validation as a universal rule.
- Lower-quality trades may justify reduced risk/size, but this must be reconciled with the earlier 0.5–1% risk framework and later Trading Plan material.
- Detailed record: `study/10-trades-de-alta-probabilidad/01-ejemplo-de-trade.md`.
- Quantitative research specification: `docs/high_probability_trade_measurement_model.md`.

### Module 10 consolidated rule

```text
START with an otherwise valid setup
-> measure remaining target-side liquidity
-> measure liquidity consumed during approach
-> prefer corrective/liuuidity-building approach into LTF entry area
-> require valid time + normal LTF confirmation
-> rank higher when meaningful target-side liquidity remains
-> rank lower when target-side liquidity is scarce/already consumed, especially after impulsive approach
-> treat nearest meaningful liquidity as candidate first-management milestone
```

No numeric threshold for “much/little liquidity” or “corrective/impulsive” is accepted yet; those are calibration problems for the weekly corpus.

## 11) Confirmaciones de Entrada a un Trade — MODULE COMPLETE

### 1) Confirmaciones de entrada.mp4 — COMPLETE
- Duration: ~23.8 min; 225 transcript segments; 286 periodic frames; 236 detected chart-state changes.
- Benjamin explicitly teaches three LTF confirmations after relevant liquidity/location: **cambio de estructura**, **impulso + imbalance**, and **formación de velas**.
- They are not equally weighted. Under normal conditions, `impulso + imbalance` is the mandatory core and Benjamin asks for at least two of the three confirmations.
- Preferred normal pair: `impulso + imbalance + cambio de estructura`; alternative pair: `impulso + imbalance + formación de velas`.
- After retracement into the selected imbalance, execution can be direct/market at the zone or delayed until an extra directional confirmation candle. That candle is an execution refinement, not a fourth universally mandatory setup confirmation.
- LTF confirmation is invalid in isolation: HTF location/direction, meaningful liquidity interaction and valid session/time must already support the setup.
- Explicit no-trade evidence: if price reaches the area but gives no confirmation, do not enter; lower-timeframe bullish/bearish signals must not override unresolved higher-priority HTF external liquidity.
- Conditional news exception: a very large news impulse can make the normal structure-change level impractically distant; Benjamin allows operating without waiting for structure change only when HTF location/liquidity/direction and the other confirmation evidence are exceptionally strong. This is not a generic news exemption.
- Detailed record: `study/11-confirmaciones-de-entrada/01-confirmaciones-de-entrada.md`.
- Quantitative research specification: `docs/entry_confirmation_measurement_model.md`.

### Module 11 consolidated rule

```text
RELEVANT HTF LOCATION + LIQUIDITY EVENT + VALID SESSION
-> move to 1m–5m
-> require IMPULSE + IMBALANCE
-> normally require at least one more confirmation:
     STRUCTURE CHANGE (preferred) OR CANDLE FORMATION
-> optional extra directional candle for execution refinement
-> block trade if unresolved higher-priority HTF liquidity/context contradicts it
-> if no confirmation: NO TRADE
```

Exact impulse threshold, structure-break threshold, confirmation-candle geometry and objective HTF-draw detector remain calibration problems for the weekly corpus.

## 12) Trading Plan — MODULE COMPLETE

### 1) Mi trading plan explicado.mp4 — COMPLETE
- Duration: ~16.3 min; 248 transcript segments; 196 periodic frames plus visual-event evidence.
- Two strategy setup families are explicitly allowed: induced-orderblock setups and direct relevant max/min liquidity setups; orderblock is not mandatory for every trade.
- Lower-timeframe confirmation hierarchy is refined: candle formation + impulse that creates imbalance form the essential core; structure change is additional confluence when available, not universally mandatory.
- Valid LTF confirmation timeframe can be 1m, 2m, 3m or 5m; Benjamin explicitly tells students to backtest which works best for them.
- Trading Plan daily control: maximum 3 trades/day, conservative option 2; explicitly stop after two losses rather than revenge-trading into another session.
- Funding-challenge risk overlay: ~0.5% risk/trade until about +2% cushion; then ~0.7–1%; reduce toward ~0.30% in material drawdown and revert lower again near breakeven.
- Trading Plan minimum intended R:R is explicitly 1:3. At 3R either close the full trade or take ~70% and move the remaining ~30% to breakeven as a runner.
- Funding-account payout/fee-recovery advice is stored separately from the market strategy because it is prop-firm/company specific.
- Detailed record: `study/12-trading-plan/01-mi-trading-plan-explicado.md`.
- Quantitative specification: `docs/trading_plan_measurement_model.md`.

### Module 12 consolidated rule

```text
PRE-SESSION FILTERS
-> HTF structure + prioritized liquidity + POI/context
-> EITHER induced-orderblock setup OR direct relevant-liquidity setup
-> valid session/time
-> move to 1m–5m
-> require candle formation + impulse creating imbalance
-> structure change when available as extra confirmation
-> enter with structural/invalidation-aware stop
-> Trading Plan objective >= ~3R
-> at 3R: close all OR ~70% partial + remaining ~30% to BE
-> stop day after two losses; never exceed three trades/day
```

Funding-account equity-dependent sizing is an overlay and must be tested separately from the market edge.

## 13) BeLikeTheAlgo 2.0 — MODULE COMPLETE

- Eight videos in verified course order.
- This module is primarily funding/challenge/risk/news/consistency material.
- Study objective: isolate any genuinely new market-strategy rule from prop-firm-specific operational rules; do not let challenge mechanics contaminate the core market backtest.

## 14) Trades Semanales Explicados — IN PROGRESS

### Weeks 1–5 — COMPLETE
- Week 1 (~46.2 min): independent weekly review fully analyzed. Confirms EUR/USD liquidity event is mandatory while DXY is secondary confirmation; no anticipatory entry before the sweep; displacement/imbalance entry sequence; contextual BE management; recurring ~3R objective. Detailed record: `study/14-trades-semanales-explicados/001-semana-1.md`.
- Week 2 (~46.2 min): published duplicate of Week 1 (`se_repite`). Marked `independent_sample=false`; do not double-count in probability/expectancy estimates. Detailed record: `study/14-trades-semanales-explicados/002-semana-2-repetida.md`.
- Week 3 (~27.0 min): confirms holiday/NFP/FOMC no-trade filtering, rejects candle pattern without clear impulse, validates Asia sweep + confirmation logic, and independently supports liquidity-building approach into POI. Detailed record: `study/14-trades-semanales-explicados/003-semana-3.md`.
- Week 4 (~41.5 min): includes a valid losing setup (important anti-outcome-bias evidence), proposes 09:15–09:45 Spain London subwindow as a probability feature to backtest, reinforces HTF context > isolated LTF structure, and shows adaptive BE/stop protection. Detailed record: `study/14-trades-semanales-explicados/004-semana-4.md`.
- Week 5 (~70.3 min): independently confirms no trading unresolved inside Asia, local/reaction-relevant structure references, HTF imbalance context, active stop management and ~3R baseline. Detailed record: `study/14-trades-semanales-explicados/005-semana-5.md`.

### Batch 1 calibration result

```text
HTF/session liquidity map
-> wait for relevant liquidity event
-> valid location + timing
-> candle/impulse/imbalance evidence
-> nearby structure confirmation when available
-> retracement/confirmation entry
-> structural initial stop
-> adaptive protection as new structure/liquidity appears
-> ~3R / meaningful-liquidity objective
```

No new numeric threshold for displacement, structure penetration, imbalance fill or BE timing is frozen from Weeks 1–5. Losing and BE examples remain labeled as valid when Benjamin considered them valid; outcome must not leak into setup classification.

### Week 6 — SOURCE MISSING / VERIFIED GAP
- The published Module 14 source was checked directly after the batch-02 downloader skipped Week 6.
- A dedicated recovery/verification workflow found **zero Week 6 MP4 files** in the MEGA source; this is a source gap, not a processing failure.
- Explicit record: `study/14-trades-semanales-explicados/006-semana-6-no-disponible.md`.
- `source_gap=true`; `independent_sample=false`; exclude Week 6 from statistical denominators and never fabricate a trade label for it.
- Sequential study may therefore continue with the next available published item: Week 7.

### Week 7 — COMPLETE (v2)
- Full ~42m18s video reviewed with 377 timestamped transcript segments plus original-source dense visual evidence.
- Dense evidence gate: 2,313 baseline 1 fps frames + 3,184 focus 2 fps frames generated before contact-sheet consolidation.
- Setup validity, pre-entry quality and execution mode are kept separate; Benjamin repeatedly contrasts direct imbalance/limit execution with waiting for directional confirmation.
- Two/three-confirmation language is confluence/quality guidance; illustrative percentages are explicitly invented and are not measured probabilities.
- Structure is often additive confluence rather than universally mandatory when liquidity/location + impulse/imbalance/candle evidence are strong.
- Friday losing PDH trade remains an instructor trade; repeated prior sweeps/no reaction plus stronger external liquidity are candidate pre-entry downgrade variables, never a post-loss relabel.
- Dynamic stop/BE management is again tied to favorable structure/liquidity progress rather than a frozen R threshold.
- Detailed v2 record: `study/14-trades-semanales-explicados/007-semana-7.md`.

### Week 8 — COMPLETE (v2)
- Full ~65m25s video reviewed with 1,055 timestamped transcript segments plus original-source dense visual evidence.
- Dense evidence gate: 3,681 baseline 1 fps frames + 5,585 focus 2 fps frames generated before contact-sheet consolidation.
- Strong veto evidence: a PDH/important-liquidity sweep alone does not justify reversal; without lower-timeframe activation/structure/confluence Benjamin explicitly rejects the trade.
- Timing is a real L0 gate: technically attractive structure/candle evidence outside Benjamin's valid trading time is rejected.
- Tuesday adds a candidate context state where key manipulation/liquidity is already consumed before London and subsequent price is wick-heavy/two-sided; this remains measurable but unquantified.
- Direct imbalance entry versus confirmation-candle entry remains an execution trade-off; confirmation can improve confidence but increases stop distance / may miss fills.
- London-runner logic has an ex-ante rationale (London context + visible HTF/session target), but its frequency/probability remains to be measured.
- Management remains structural/event-driven and explicitly warns against micro-trailing every small swing.
- Detailed v2 record: `study/14-trades-semanales-explicados/008-semana-8.md`.

### Week 9 — COMPLETE (v2)
- Full ~35m35s video reviewed with 322 timestamped transcript segments plus original-source dense visual evidence.
- Dense evidence gate: 1,976 baseline 1 fps frames + 3,693 focus 2 fps frames generated before contact-sheet consolidation.
- Week 9 strongly separates strategy validity, pre-entry quality, Benjamin trade-taken status and outcome; several valid/possible setups are explicitly downgraded before their result is known.
- Wednesday provides a first-class no-trade market-state example: London can be open yet remain too overlapping/ranging/noisy, with no clear impulse or clean imbalance.
- Thursday adds explicit internal-liquidity logic: after a vertical impulse with little/no internal liquidity, the first pullback may become inducement before a later liquidity-collecting candle creates a more meaningful protected-extreme candidate.
- Nearest meaningful target/Asia liquidity constrains setup quality ex ante; attractive confirmation is insufficient when usable R before the first meaningful target is too small.
- BE remains contextual/event-driven and intentionally biased toward capital protection when confidence is low.
- Benjamin explicitly reports Week 9 as a losing/uncomfortable week; it is retained as an independent anti-selection sample, not optimized away.
- Detailed v2 record: `study/14-trades-semanales-explicados/009-semana-9.md`.

### Week 10 — COMPLETE (v2)
- Full ~57m32s video reviewed with 497 timestamped transcript segments plus dense full-video visual evidence.
- Dense evidence gate: 3,453 baseline 1 fps frames + 6,905 focus 2 fps frames generated before contact-sheet consolidation.
- HTF direction is reinforced as a probability/management layer rather than an unconditional directional veto: Benjamin allows countertrend trades but reduces ambition/risk and protects them more aggressively.
- First imbalance touch and full orderblock/candle mitigation are explicitly separate events; deeper fill cannot be known in advance and must not be hindsight-selected.
- Wick-only structure violations are rejected in multiple examples while later body/force breaks are accepted, strengthening structure-detector calibration without freezing a numeric threshold.
- Time-window decay is first-class ex-ante information: late-window setups can be skipped or managed more defensively even when LTF geometry is otherwise valid.
- Risk scaling is explicitly capped at the underlying-move level rather than treating multiple tickets as independent risk/trade samples.
- Week 10 contains both a setup Benjamin liked that later failed and a non-optimal setup that later worked, strongly reinforcing outcome-independent quality labels.
- Detailed v2 record: `study/14-trades-semanales-explicados/010-semana-10.md`.

### Week 11 — COMPLETE (v2)
- Full ~39m06s video reviewed chronologically with the complete timestamped transcript plus dense full-video visual evidence.
- Dense evidence gate: 2,346 baseline frames at 1 fps + 4,692 focus frames at 2 fps generated before contact-sheet consolidation.
- Conditional news exception documented without threshold fitting: when an unusually large news impulse makes formal structure impractically distant, Benjamin may accept relevant liquidity/location + candle formation + impulse/imbalance, while declining the trade remains valid.
- Setup validity, pre-entry quality, Benjamin trade-taken status and L3 result are kept separate; Monday/Thursday provide explicit skipped-but-recognizable/valid examples.
- Aggressive vs conservative stop and direct vs confirmation entry are L2 execution alternatives over the same L1 setup; their later P&L cannot select the detector.
- Thursday New York supplies a clean no-trade label because the required liquidity was not taken.
- Late-entry degradation is explicit after the original impulse has travelled too far: stop/remaining-target geometry worsens even when directional thesis remains intact.
- Spread/rollover/broker conditions are retained as execution uncertainty rather than assumed frictionless fills.
- Scaled tickets from the same movement remain one correlated `same_underlying_move_group`.
- Detailed v2 record: `study/14-trades-semanales-explicados/011-semana-11.md`.

### Week 12 — COMPLETE (v2)
- Full ~85m42s video reviewed chronologically with ~749 timestamped transcript segments/lines plus dense full-video visual evidence.
- Dense evidence gate (manifest-audited): 5,142 baseline frames at 1 fps + 10,284 focus frames at 2 fps before contact-sheet consolidation. Earlier 3,426/6,851 reporting was corrected from the actual manifest.
- Monday supplies explicit anti-overfitting evidence: recognizable/ultimately profitable LTF geometry remains plan-ineligible when required PWH/timing conditions are absent.
- Monday/Tuesday/Friday reinforce `reaction != decisive impulse != later displacement`; the imbalance-producing force is stored separately from the broader subsequent leg.
- Tuesday observed management ends at BE although the later chart would have reached TP without BE; that counterfactual is L3 only and cannot retrospectively tune management.
- Wednesday shows nearby weekly external liquidity can dominate stale lower-timeframe reversal zones; target proximity, freshness and approach quality are pre-entry variables.
- Thursday contains a Benjamin-personal immediate-break execution explicitly not recommended to students; it is isolated as an instructor-discretionary exception rather than promoted into the replication baseline.
- Benjamin's claimed high-performing London subwindow is retained as a hypothesis only; no detector cutoff is selected from P&L clustering.
- Friday makes the hierarchy explicit: meaningful maxima/minima/liquidity are primary; imbalance is secondary confluence whose relevance rises when linked to available liquidity.
- Scaled entries remain grouped by `same_underlying_move_group`; spread/slippage/fill precision and unresolved thresholds are not guessed.
- Detailed v2 record: `study/14-trades-semanales-explicados/012-semana-12.md`.

### Week 13 — COMPLETE (v2)
- Full ~51m24s video reviewed chronologically with 405 timestamped transcript segments plus dense full-video visual evidence.
- Dense evidence gate: 3,084 baseline frames at 1 fps + 6,168 focus frames at 2 fps before contact-sheet consolidation.
- Monday contains a rare instructor self-audit: Benjamin took a trade that ended at BE but, on backtesting, explicitly says it should not have been taken because of pre-entry evidence (late timing, poor candle formation/liquidity-like clustering and distant structure). This is stored as `trade_taken=true` but `setup_validity=invalid`, without using L3 to justify the relabel.
- Tuesday/Thursday reinforce that a wick liquidity violation is not automatically a structure change; body/force confirmation is separate and no numeric threshold is frozen.
- Multiple simultaneous 1m imbalances are treated as an ambiguity state; Benjamin suggests reacting only to observed respect or moving to a higher LTF, never hindsight-selecting the best later fill.
- Tuesday New York cleanly separates good POI/location from bad news-spike executability; execution realism remains an independent L2 gate.
- Wednesday New York includes a valid setup Benjamin missed live and found in backtesting; it remains `valid + missed_trade`, preserving replication recall rather than selecting only executed trades.
- Wednesday/Thursday management keeps post-entry accumulation, partials and BE in L2/L3 rather than retroactively changing L0/L1 setup quality.
- Exact OHLC/ATR, spread/slippage, MFE/MAE and unresolved chart-clock fields remain pending rather than guessed.
- Detailed v2 record: `study/14-trades-semanales-explicados/013-semana-13.md`.

### Week 14 — COMPLETE (v2)
- Full ~59m03s video reviewed chronologically with 610 timestamped transcript segments plus dense full-video visual evidence.
- Dense evidence gate: 3,543 baseline frames at 1 fps + 7,086 focus frames at 2 fps before contact-sheet consolidation.
- Monday is strong negative evidence: visually attractive liquidity/POI reactions remain no-trades when the day/session is blocked by major London/NY news in an FOMC week; later successful movement does not create a hindsight exception.
- Tuesday and Friday keep multiple 1m–5m imbalance/confirmation choices in L2; exact deeper fills cannot be hindsight-selected, and scaled/re-entry tickets from one move remain one correlated `same_underlying_move_group`.
- Wednesday shows that downstream LTF structure/imbalance cannot repair a failed L0 HTF-location gate: if the required HTF zone was not touched, Benjamin says not to enter even when the later pattern looks perfect.
- Thursday separates valid losing setups from rule violations and shows that a large news-driven displacement outside valid time is not automatically a valid L1 impulse/activation.
- Benjamin's claim that first London / second New York outperform second London is retained only as an instructor probability hypothesis; he still trades second London, so no detector threshold is selected from P&L.
- Friday's fear-driven manual BE exit and same-move re-entry are stored as L2 management/process events; the later favorable path is L3 and cannot justify the original entry.
- Exact OHLC/ATR, spread/slippage, realized R and broker-specific sub-pip outcomes remain unresolved rather than guessed.
- Detailed v2 record: `study/14-trades-semanales-explicados/014-semana-14.md`.

### Week 15 — COMPLETE (v2)
- Full ~52m29s video reviewed chronologically with 430 timestamped transcript segments/lines plus dense full-video visual evidence.
- Dense evidence gate: 3,150 baseline frames at 1 fps + 6,299 focus frames at 2 fps before contact-sheet consolidation.
- Monday and Wednesday reinforce timing as a true L0 gate: technically recognizable geometry is skipped when required liquidity/location or the operating window is missing/late.
- Tuesday explicitly prioritizes max/min liquidity over isolated orderblock/imbalance geometry; an imbalance without meaningful inducement/liquidity is downgraded.
- Thursday cleanly separates pre-entry quality from result: Benjamin takes a long he already calls poor because it is generating too much liquidity, then it later stops; the stop is not used to create the poor-quality label.
- Thursday also contains a valid post-news long Benjamin did not take, preserving `valid + missed_trade` for replication recall rather than executed-trade selection.
- Friday introduces an important feed-dependence rule: a rejection block visible on Forex.com is rejected when the equivalent FXCM feed shows it already touched; broker/source-feed identity must be retained during OHLC reconstruction.
- HTF direction remains probabilistic rather than an absolute veto; direct imbalance/confirmation/deeper-zone entries remain separate L2 variants and are never selected retrospectively from P&L.
- Tuesday/Friday BE decisions are explicitly linked to uncertainty and news/execution conditions, so no universal profitable BE threshold is inferred.
- Exact OHLC/ATR, spread/slippage, MFE/MAE, realized R and the general scope of two-feed validation remain unresolved rather than guessed.
- Detailed v2 record: `study/14-trades-semanales-explicados/015-semana-15.md`.

### Week 16 — COMPLETE (v2)
- Full ~40m22s video reviewed chronologically with 362 timestamped transcript segments plus dense full-video visual evidence.
- Dense evidence gate: 2,422 baseline frames at 1 fps + 4,844 focus frames at 2 fps.
- Monday NY provides negative evidence that a liquidity sweep plus local impulse is insufficient when confirmation is incomplete and the structure reference would be forced.
- Tuesday reinforces timing as L0: the early pre-London candidate is skipped/degraded before outcome; Benjamin's historical performance comments remain hypotheses, never P&L-selected detector thresholds.
- Thursday London cleanly separates quality from result: Benjamin takes an entry he already dislikes because the approach has generated too much liquidity; it later stops, but the stop is not the reason for the pre-entry downgrade.
- Aggressive/conservative stops, direct/confirmed entries and repeated BE choices are stored as L2 execution/management variants; later outcomes never select L0/L1 thresholds.
- Friday shows that an Asia-side sweep before London does not permanently invalidate the session: a later in-window setup can still be recognized, so ordered state/event times matter.
- Exact OHLC/ATR, spread/slippage, MFE/MAE, exact fills, some realized R values and personal execution status for several recognized examples remain unresolved rather than guessed.
- Detailed v2 record: `study/14-trades-semanales-explicados/016-semana-16.md`.

### NEXT
- Process and study Week 17 next, strictly before Week 18.
- Apply `ANALYSIS_PROTOCOL.md`, `docs/measurement_architecture_v2.md`, and `docs/weekly_trade_event_schema_v2.md`.
- Backfill Weeks 1–5 to v2 before freezing the Benjamin baseline, following `docs/v2_backfill_plan.md`.
- Do not freeze the Benjamin baseline until that backfill passes the v2 completeness gate.
- Do not start module 15 until all available module-14 weekly videos are fully reviewed and all source gaps are explicitly recorded.