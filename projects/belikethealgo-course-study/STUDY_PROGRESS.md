# BeLikeTheAlgo Study Progress

## Ordering rule
Study strictly in published order: folder 1 -> folder 2 -> ... -> last folder. Within each folder, video 1 -> video 2 -> ... . Do not mark a video complete until all trades/examples/no-trades and relevant visual explanations are indexed.

## 1) Bienvenido a la Formación

### 1) Bienvenido a la Formación.mp4 — COMPLETE
- Duration: ~2.7 min.
- Visual review: talking-head presentation throughout the sampled timeline; no chart examples or trades detected.
- Trades/examples: 0.
- Strategy rules: no technical entry/structure/liquidity rules introduced.
- Relevant course-method statement: Benjamin says the training contains his way of trading/strategy and more than 120 weekly trades explained step by step, updated with recent examples.
- Status: complete as an introductory video.

## 2) Principios Básicos — MODULE COMPLETE

### 1) Divergencias.mp4 — COMPLETE
- Duration: ~5.2 min.
- Dense visual evidence: 2 fps from 150 s to end; 328 timestamped frames covering all chart examples.
- Benjamin's primary pair: EUR/USD.
- Supporting market: DXY, used as confirmation/context rather than for lower-timeframe entries.
- Explicit DXY timeframes: 15m, 1h, 4h, daily, weekly.
- Explicit concept: EUR/USD and DXY generally move inversely.
- Explicit filtering idea: an EUR/USD setup can be rejected when DXY location/context conflicts or relevant DXY liquidity remains unfinished in the opposing direction.
- Example A: 17 Nov 2023 London open; EUR/USD 1H takes a marked low while DXY 1H takes the opposing high; Benjamin also marks pending ascending-trendline liquidity below DXY, supporting EUR/USD up / DXY down.
- Example B: 10 Nov 2023 09:00 visible on EUR/USD 1H; EUR/USD takes a marked low and Benjamin shows the corresponding opposing-high context on DXY 1H.
- Inventory: 2 positive contextual examples; 1 qualitative rejection/no-trade condition; no complete entry/stop/target trade model taught in this video.
- Unresolved by design: measurable definition of DXY 'good/bad zone', exact relevant-liquidity detector, timing tolerance/simultaneity, and trendline-liquidity algorithm. These must be learned later rather than invented now.
- Detailed evidence record: `study/02-principios-basicos/01-divergencias.md`.

### 2) Horarios y Sesiones del Algoritmo.mp4 — COMPLETE
- Duration: ~8.9 min.
- Full session slide visually verified.
- Dense chart evidence: 2 fps from 368–500 s; 265 timestamped source frames.
- Main operating windows: London 09:00–11:00 Spain / 03:00–05:00 New York; New York 14:00–16:30 Spain / 08:00–10:30 New York.
- Preferred Spain-time tramos: London 09:15–09:45 and 10:20–10:40; New York 14:30–15:00 and 15:30–16:20.
- Important interpretation: main session is the eligibility window; preferred tramos are higher-attention periods inside it, not evidence for rejecting every setup elsewhere inside the valid session.
- Dense example 1 visually confirms EUR/USD 1H at 17 Jul 2025 14:00 taking a marked low and reacting inside New York session.
- Dense example 2 visually confirms EUR/USD 1H at 22 Jul 2025 15:00 at a marked liquidity area inside New York session.
- Further examples demonstrate events verbally identified around 15:00/16:00. Benjamin tells students not to focus yet on the imbalance he points out in one example.
- Evidence-quality warning: Benjamin names 17, 22, 23 and 24 July then calls them 'four days in a row'; those dates are not literally four consecutive calendar days, so this is not accepted as performance evidence.
- Unresolved: DST-transition handling between Spain and New York; final backtest must not silently assume one fixed UTC offset.
- Detailed evidence record: `study/02-principios-basicos/02-horarios-y-sesiones.md`.

### 3) Calcula el Riesgo por Operación.mp4 — COMPLETE
- Duration: ~4.8 min.
- Recommended risk per trade: 0.5%–1%.
- Visually confirmed sizing example: EUR/USD, $10,000 account, 1% risk, 5-pip stop -> $100 monetary risk -> 2 lots / 200,000 units.
- Position size is derived from percentage risk and actual stop distance; fixed lot sizing is not the rule.
- Myfxbook is shown as a free calculator; MetaTrader/MQL Trade Assistant as Benjamin's convenience tool.
- Benjamin says he personally often enters at market, especially with candle confirmations, but this is logged as execution preference rather than a mandatory strategy rule until later entry lessons validate it.
- Detailed evidence record: `study/02-principios-basicos/03-calcula-el-riesgo.md`.

### 4) Cuidado con las Noticias.mp4 — COMPLETE
- Duration: ~5.1 min.
- Forex Factory calendar used as pre-trade calendar filter.
- Relevant high-impact filter for EUR/USD: red EUR/USD news.
- Explicit rule: no new market entry with less than 30 minutes remaining before relevant red news; after release Benjamin can re-evaluate trading.
- No evidence here that every open position must be closed before news, and no fixed post-news waiting delay is stated.
- Explicit no-trade rule: USD/US bank holiday -> no trading that day.
- Broad European-bank holiday condition -> skip London; New York may remain tradable.
- Exact European-bank count is unresolved because Benjamin gives inconsistent wording ('4 or 5' in one example, later 'more than 2 or 3').
- Detailed evidence record: `study/02-principios-basicos/04-cuidado-con-las-noticias.md`.

## 3) Estructura — MODULE COMPLETE

### 1) Estructura V1.mp4 — COMPLETE
- Duration: ~15.4 min.
- Dense visual evidence: 1,792 timestamped frames at 2 fps over all relevant teaching/example intervals.
- Benjamin distinguishes continuation `rompimiento de estructura` from directional `cambio de estructura`.
- Relevant change-of-structure reference is tied to the last structurally important swing that created the impulse, not every internal swing.
- Wick-only violation is explicitly insufficient: it can be a liquidity take while the larger structure remains intact.
- Valid change is described as breaking the relevant reference **with body and with force**; the qualitative "force" threshold remains intentionally unquantified.
- Real 4H example confirms wick sweep -> bullish structure preserved -> later body/force break of the relevant low -> bearish structure.
- Second 4H example confirms repeated internal liquidity sweeps can occur without breaking the larger bullish structural low.
- Benjamin explicitly allows aggressive vs conservative candidate structural references; this is a parameter to learn, not something we will collapse into a naive nearest-swing rule.
- HTF structure for context: weekly, daily, 4H, 1H.
- Entry-search LTF: 1–5m; beginners are advised 3–5m, Benjamin says he personally uses 1m with experience.
- Lower-timeframe example visually confirms EUR/USD 1m and uses liquidity take -> local structure change as part of trade planning, but no complete entry/SL/TP model is yet defined.
- Quantitative measurements queued: close penetration/ATR, body/range, range expansion, directional efficiency, follow-through, pullback, aggressive/conservative reference selector, internal/external context.
- Detailed evidence record: `study/03-estructura/01-estructura-v1.md`.

### 2) Estructura V2.mp4 — COMPLETE
- Duration: ~15.65 min.
- Dense full-video evidence: 1,879 timestamped frames at 2 fps.
- External liquidity is mapped to the structural range endpoints; smaller eligible highs/lows inside are internal liquidity.
- HTF 4H structure changes trade priority/probability rather than imposing an absolute directional ban: with-trend setups are preferred, counter-trend retracements remain possible.
- LTF confirmation is stricter: body break + force/impulse + imbalances are strongly supported; wick-only or slow multi-candle/grinding breaks are rejected.
- Clean candle formation, immediate internal-liquidity take and a later confirmation candle act as additional/preferred confirmations rather than proven universal requirements.
- Negative 1m example is explicitly rejected for poor body break, poor candle formation and lack of force/confirmation.
- Aggressive vs conservative structural references are reinforced. An aggressive level can be used earlier when break quality is strong and an imbalance is created/respected.
- Additional confirmation has a cost: later entry, wider/more compromised stop and worse R:R.
- Counter-trend 1m example confirms more conservative management when 4H context opposes the trade, including more defensive break-even behavior.
- V2 provides the first strong basis for a quantitative break-quality vector: close penetration, body/range, candles-to-break, directional efficiency, expansion, overlap, imbalance creation/size and follow-through.
- Detailed evidence record: `study/03-estructura/02-estructura-v2.md`.

## 4) Imbalances — MODULE COMPLETE

### 1) Imbalances Vol 1.mp4 — COMPLETE
- Duration: ~12.22 min.
- Dense full-video evidence: 1,528 timestamped frames at ~2 fps.
- Exact base geometry: three candles; an imbalance exists when candle 1 and candle 3 ranges/wicks do not touch, leaving a gap. Bullish and bearish forms are visually confirmed.
- No minimum pip/ATR/percentage gap-size threshold is taught in this lesson.
- Two distinct roles: higher-timeframe zone of interest and lower-timeframe entry tool.
- HTF zone hierarchy is explicit: Weekly, Daily, 4H, 1H, with 15m as Benjamin's minimum when necessary; beginners are advised not to go below 1H for zones.
- Multiple 1H examples show strong impulse -> imbalance -> later first touch/mitigation -> reaction. These examples are evidence of the pattern, not statistical proof of expectancy.
- Liquidity/max-min confluence increases probability but is explicitly not mandatory for an imbalance to have relevance.
- Strong clean-state rule: the imbalance Benjamin wants to use must be untouched. First later touch makes it mitigated; he says he would delete it and not treat a second return as the same relevant clean zone.
- Full fill is not required for mitigation; first touch is enough under the wording/examples in Vol. 1.
- 15m -> 1m example: mark clean 15m bearish imbalance after high manipulation/displacement, wait for price to enter it, observe 1m imbalances + structure change, then use a still-clean LTF imbalance as possible limit/confirmation entry location toward next low/liquidity.
- Mathematical detector and clean/mitigated state machine added to `docs/measurement_model.md`, including gap size/ATR and penetration/reaction metrics without invented thresholds.
- Detailed evidence record: `study/04-imbalances/01-imbalances-vol-1.md`.

### 2) Imbalances Vol 2.mp4 — COMPLETE
- Duration: ~9.74 min.
- Dense full-video evidence: 1,169 timestamped frames at 2 fps.
- This lesson integrates the earlier theory into one near-complete EUR/USD trade example rather than introducing a new geometric imbalance definition.
- Explicit search order: valid session -> HTF liquidity/imbalance zone -> LTF entry search.
- For beginners Benjamin recommends zones at 1H or above; 15m zone selection is presented as an advanced refinement. Entry search remains 1–5m.
- Liquidity (max/min) coinciding with an imbalance is described as a very strong/“combo perfecto” confluence but is not yet proven mandatory for every trade.
- Example date/time visually confirmed: EUR/USD, 30 Nov 2023, New York session, TradingView timezone UTC-5; 1m chart around 08:20–08:40.
- Benjamin explicitly waits for the 08:30 news event before evaluating the LTF execution.
- Entry sequence in the example: price reaches HTF zone -> 1m change of structure -> no entry imbalance initially -> first LTF imbalance forms -> candidate entry.
- Two allowed execution paths are shown: limit order at the entry imbalance or later candle confirmation.
- Stop is not chosen from a fixed pip count. Benjamin balances structural protection with R:R and rejects an unnecessarily wide stop that would collapse the trade toward ~1:1.
- Target is tied to the next relevant minimum/liquidity. Benjamin repeatedly states a minimum target framework of roughly 1:2 R:R for this example/approach.
- Final position tool visually shows approximately 9.2-pip stop, 19-pip target and ~2.07R. This is one example, not an expectancy claim.
- Break-even management is introduced around interaction with the next max/min/liquidity, but no universal BE algorithm is accepted yet.
- Detailed evidence record: `study/04-imbalances/02-imbalances-vol-2.md`.

## 5) Orderblocks — NEXT / PROCESSING

### 1) Tipos de Orderblocks.mp4 — NEXT
- Module 5 verified directly from the MEGA course inventory.
- Coarse processing pipeline has been launched: transcription + periodic frames + visual-event extraction.
- Study questions: Benjamin's exact orderblock definition(s), candle/range geometry, bullish/bearish variants, creation conditions, mitigation/invalidation, timeframe role, interaction with liquidity/structure/imbalance, and whether every displayed orderblock is actionable.

### 2) Ejemplos de Orderblocks.mp4 — PENDING
- Must be studied after video 1 is COMPLETE.

### 3) Las Orderblocks funcionan.mp4 — PENDING
- Must be studied after video 2 is COMPLETE.
