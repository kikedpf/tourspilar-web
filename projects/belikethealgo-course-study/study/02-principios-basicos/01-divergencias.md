# Principios Básicos — 1) Divergencias

## Status

**COMPLETE as a course lesson.** The two chart examples have been inventoried and reconstructed with dense visual evidence at 2 fps from 150 s through the end of the video. Concepts that Benjamin leaves qualitative remain explicitly unresolved rather than being converted into invented rules.

## Source

- Video: `2) Principios Básicos / 1) Divergencias.mp4`
- Duration: ~5.2 min.
- Dense evidence interval: 150.0–313.6 s.
- Dense sampling: 2 frames/s, 328 timestamped source frames.
- Charts visually confirmed in both examples: `EURUSD · 1h · FOREX.com` and `DXY · 1h · TVC`.

## What Benjamin explicitly establishes

### Instrument relationship

- Benjamin trades **EUR/USD** as his principal pair in this lesson.
- **DXY is a supporting/context market**, not the instrument on which he seeks the lower-timeframe entry.
- He explicitly lists DXY analysis on **15m, 1h, 4h, daily and weekly**.
- His working relationship is inverse: when EUR/USD rises, DXY generally falls, and vice versa.

Evidence class: **Instructor-explicit**.

### Function of DXY

Before accepting an EUR/USD idea, Benjamin checks whether the DXY location/context supports it. An otherwise attractive EUR/USD idea can be rejected if DXY is in an unfinished or poor opposing location.

Evidence class: **Instructor-explicit**.

Important limitation: this video does **not** yet provide a measurable definition of a “good/bad DXY zone,” relevant DXY liquidity, or the exact tolerance for simultaneity. Those items are deferred until the later liquidity/structure material defines them.

## Example A — 17 Nov 2023 London open

### Visible / stated context

- EUR/USD chart: **1H**.
- DXY chart: **1H**.
- Benjamin identifies the event at approximately **17 Nov 2023, 09:00 Spain / 03:00 New York**.
- On EUR/USD, the 09:00 candle is visibly below / through the previously marked horizontal low: a low-liquidity event in Benjamin’s explanation.
- On DXY, Benjamin marks the opposing high as the corresponding liquidity event.
- He also marks an **ascending trendline below DXY price** as liquidity still pending beneath price.

### Interpretation supported by the lesson

The combination supports an EUR/USD bullish idea / DXY bearish move: EUR/USD has taken downside liquidity while DXY has taken upside liquidity and still has downside liquidity available.

Evidence classes:
- instruments/timeframe/date and marked levels: **Visual-confirmed** plus transcript alignment;
- inverse-confirmation interpretation: **Instructor-explicit**.

This is a confirmation/context example, not a fully specified trade entry. The lesson does not define an entry trigger, stop or target here.

## Example B — 10 Nov 2023 London open

### Visible / stated context

- EUR/USD chart: **1H**.
- DXY chart: **1H**.
- EUR/USD crosshair visibly identifies **10 Nov 2023, 09:00** on the candle that trades through the marked prior low.
- Benjamin then switches to DXY and shows the opposing high being reached/taken in the same illustrated London-open context.
- He draws the expected inverse direction on the two markets.

### Interpretation supported by the lesson

This is a second example of the same contextual confirmation: EUR/USD downside liquidity and DXY upside liquidity are used together to support the expectation of EUR/USD strength / DXY weakness.

Evidence classes:
- EUR/USD date/time and timeframe: **Visual-confirmed**;
- DXY opposing-high relationship and inverse interpretation: **Instructor-explicit / Visual-confirmed**.

The exact DXY cursor timestamp is not legible/placed on the event in the dense sequence, so it must not be claimed as independently visually timestamped to the same minute/hour merely from the screenshot.

## No-trade / rejection rule present in the lesson

Benjamin gives a qualitative rejection condition: if EUR/USD appears attractive but DXY is in a location that does not support the idea or still has relevant unfinished liquidity in the conflicting direction, he can reject the EUR/USD setup.

Evidence class: **Instructor-explicit**.

This rule is strategically important but **not yet automatable** from this video alone.

## Operational representation at this stage

The following is an **OUR PROVISIONAL OPERATIONAL PLACEHOLDER**, not Benjamin’s final algorithm:

`dxy_context_ok(direction, time) -> unresolved boolean`

Candidate bullish EUR/USD interpretation:
- EUR/USD is at / has just taken a relevant downside liquidity point; and
- DXY is at / has just taken an opposing upside liquidity point; and
- DXY context leaves plausible downside room/liquidity rather than conflicting strongly with the EUR/USD idea.

Bearish interpretation is symmetric.

This placeholder is deliberately excluded from final backtests until later lessons define the liquidity points and acceptable timing/location relationship well enough to avoid look-ahead or subjective chart reading.

## What this lesson does NOT establish

- It does not define an oscillator divergence.
- It does not prove that every EUR/USD low sweep must coincide exactly candle-for-candle with a DXY high sweep.
- It does not define a numerical simultaneity window.
- It does not define how far DXY must move after the event.
- It does not define the exact liquidity hierarchy or how trendline liquidity is algorithmically detected.
- It does not provide a standalone entry, stop-loss or take-profit model.
- It does not justify trading DXY directly.

## Lesson inventory gate

1. Full lesson indexed: PASS.
2. All chart segments located: PASS.
3. Trades/examples/no-trades counted: PASS — 2 positive contextual examples; qualitative rejection condition; no executed trade entry demonstrated.
4. Timestamp boundaries identified: PASS.
5. Dense visual evidence extracted: PASS — 2 fps, 150 s to end.
6. Benjamin’s explanation linked to examples: PASS.
7. Measurable variables recorded or explicitly unresolved: PASS.
8. No unexplained chart sequence remains: PASS.

## Carry-forward facts

- Primary traded market: EUR/USD.
- DXY: high-timeframe/context confirmation tool.
- DXY timeframes explicitly named here: 15m / 1h / 4h / D / W.
- Core relationship: inverse EUR/USD ↔ DXY.
- DXY can veto an EUR/USD setup.
- Exact DXY liquidity/context detector remains unresolved pending later lessons.
