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

## 3) Estructura

### 1) Estructura V1.mp4 — NEXT / IN ANALYSIS
- Coarse transcript, periodic frames and state-change evidence already available.
- Priority questions: exact swing/reference-point selection; body-close versus wick requirement; strength/displacement requirement; HTF vs LTF hierarchy; internal/external liquidity references; and every visual example demonstrating valid/invalid structure breaks.
- Completion requires dense reconstruction around each structure drawing/break example before an operational BOS/structure algorithm is accepted.
