# Principios Básicos — 3) Calcula el Riesgo por Operación

## Status

**COMPLETE as a course lesson.** This is a risk-sizing/tool lesson rather than a chart/trade-example lesson. Full transcript and periodic visual sequence were reviewed; the calculator example is visually confirmed.

## Source

- Video: `2) Principios Básicos / 3) Calcula el Riesgo por Operación.mp4`
- Duration: ~4.8 min.
- Primary visual tools shown: Myfxbook Position Size Calculator and MetaTrader/MQL Trade Assistant.
- Trades demonstrated: 0.

## Explicit risk rule

Benjamin recommends risking **0.5% to 1% of account equity/balance per operation**.

Evidence class: **Instructor-explicit**.

At this stage this should be preserved as a risk-policy range, not optimized retrospectively to whichever value produces the best backtest.

## Visually confirmed calculator example

Benjamin demonstrates the following Myfxbook position-size calculation:

- Pair: EUR/USD.
- Account currency: USD.
- Account size: **$10,000**.
- Risk: **1%**.
- Stop-loss: **5 pips**.
- Monetary risk: **$100**.
- Position size result: **2 lots** (200,000 units shown by the calculator).

Evidence class: **Instructor-explicit + visually confirmed**.

The arithmetic is internally consistent for the example shown.

## Risk-sizing principle

The position size changes with:

1. account size;
2. chosen percentage risk;
3. stop-loss distance;
4. pair / pip value / account currency.

Therefore the strategy must not use a fixed lot size. The operational object is the **fixed percentage risk**, with lot size derived from the actual stop distance.

Candidate implementation:

`risk_cash = account_equity * risk_fraction`

`position_size = position_size_for_stop(pair, account_currency, risk_cash, stop_distance)`

This mathematical implementation is **OUR IMPLEMENTATION of Benjamin’s explicit risk rule**, not a new strategy criterion.

## Tools Benjamin shows

### Free option

Benjamin uses the Myfxbook Position Size Calculator as a free way to calculate lot size.

### Paid/convenience option

He shows a MetaTrader/MQL marketplace product called **Trade Assistant** and says he personally uses it to calculate and execute risk more quickly inside MetaTrader.

The product price and review counts visible/stated in the old course video are historical product information and are **not strategy rules** and should not be treated as current purchasing information.

## Execution preference versus strategy rule

Benjamin says he personally tends to enter **at market**, particularly when waiting for candle confirmations, and therefore finds Trade Assistant useful. He contrasts this with limit-order execution, where the free/manual calculation is easier to prepare in advance.

Evidence class: **Instructor-explicit personal execution preference**.

Important: this lesson does **not** establish that every valid setup must be entered at market. Final market-vs-limit rules must come from the later entry lessons/examples.

## What this lesson establishes

- Recommended per-trade risk: 0.5%–1%.
- Risk should be sized from stop distance, not by a fixed lot size.
- 10k / 1% / 5 pip example = $100 monetary risk and 2 lots EUR/USD.
- Benjamin uses a risk calculator/tool to avoid manual sizing errors.

## What this lesson does NOT establish

- It does not establish the final stop-placement logic.
- It does not define when 0.5% versus 1% should be chosen.
- It does not make market entry mandatory.
- It does not define daily/weekly maximum loss, maximum number of trades, drawdown limits, partials or break-even rules.
- It does not justify changing risk after wins/losses unless later lessons explicitly do so.

## Lesson inventory gate

1. Full lesson reviewed: PASS.
2. All relevant visual segments located: PASS.
3. Trades/examples/no-trades counted: PASS — no chart trades; one numerical sizing example.
4. Timestamped content available: PASS.
5. Dense visual trade evidence required: NOT APPLICABLE — no fast chart/trade reconstruction; static calculator/tool screens are clearly captured by periodic evidence.
6. Benjamin’s explanation linked: PASS.
7. Measurable variables recorded or unresolved: PASS.
8. No unexplained strategy-relevant visual sequence remains: PASS.

## Carry-forward variables

- `risk_fraction ∈ [0.005, 0.01]` — explicit allowed/recommended range from this lesson.
- `stop_distance` — supplied by later strategy logic, not invented here.
- `position_size` — derived from risk fraction and stop distance.
- `execution_type` — unresolved; later entry lessons decide market vs limit conditions.
