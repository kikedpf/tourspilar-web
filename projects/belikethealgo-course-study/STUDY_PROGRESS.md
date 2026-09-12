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

## 9) Liquidez del Mercado — NEXT

### 1) Dónde está la liquidez.mp4 — NEXT
- Next video in verified course order.
- Study questions: exact liquidity categories, how a liquidity point becomes identifiable without future information, wick/close semantics for taking liquidity, prominence/touch rules, and which levels Benjamin ignores.

### 2) Liquidez externa e interna.mp4 — PENDING
- Must be studied only after video 1 is COMPLETE.

### 3) Prioridad de la liquidez.mp4 — PENDING
- Must be studied only after video 2 is COMPLETE.
