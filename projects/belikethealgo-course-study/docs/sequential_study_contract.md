# Sequential Study Contract

## Course order

Study the course strictly in the order it is published in MEGA: folder 1, then folder 2, then folder 3, and so on until the final folder. Inside each folder, process videos in their published numeric order. Do not skip ahead merely because a later module looks more relevant.

## Completeness requirement

Every video must be reviewed in full. Every trade, trade example, hypothetical trade, chart replay, near-entry, rejected setup and no-trade example shown or discussed in the video must be indexed. A video is not considered studied until this inventory is complete.

For each detected trade/example record at minimum:
- video + exact timestamp interval;
- instrument;
- visible date/time and timezone if available;
- all timeframes shown or referenced;
- higher-timeframe context;
- liquidity points present before the setup;
- liquidity taken and liquidity still pending;
- structural points and exact structure break(s);
- displacement before and after liquidity/structure events;
- imbalance/orderblock and how Benjamin validates it;
- entry trigger and exact reason for entry;
- reason for not entering when applicable;
- stop, target and management;
- result if shown;
- all annotations/drawings Benjamin uses;
- any ambiguity that prevents exact measurement.

## Visual fidelity gate

A 5-second periodic frame sample is only a navigation/indexing layer. It is NOT sufficient evidence for final trade reconstruction.

For every trade/example identified, return to the source video and extract a dense sequence covering the setup from before the first relevant context event until after the entry/invalidating event. Default dense sampling should be at least 1 frame per second, and increase to 2-4 frames per second when Benjamin draws, moves the chart, changes timeframe, marks a level, or demonstrates a fast execution sequence.

If cursor movement, drawing evolution, candle identity, timeframe, price/date labels or order placement cannot be read reliably, extract the original-resolution frame(s) at exact timestamps. Do not infer missing visual information from a coarse contact sheet.

## Audio/transcript fidelity

Transcription is an index and evidence aid, not the sole source. Important rules, exceptions and trade decisions must be checked against the corresponding audio/video context. Trading terminology mis-transcribed by ASR must be corrected in the project glossary rather than silently accepted.

## Trade inventory gate

Before moving from one video to the next, create a video-level checklist:
1. full video reviewed;
2. all chart segments located;
3. all trades/examples/no-trades counted;
4. each item has timestamp boundaries;
5. dense visual evidence extracted for each item;
6. Benjamin's explicit explanation linked to the item;
7. measurable variables recorded or marked unresolved;
8. no unexplained skipped chart sequence remains.

Only after all eight checks pass is the lesson marked COMPLETE.

## Measurement rule

The goal is not to reproduce what happened after seeing the outcome. The goal is to build detectors capable of finding the same liquidity, structure, displacement and entry conditions from market data available at that moment. Any rule that depends on information only visible after the setup is rejected as look-ahead.

## No threshold invention

Mathematical measurements may include slope, directional efficiency, body/range ratios, overlap, expansion, retracement, continuation, volatility normalization, distance and timing. These are OUR METRICS unless Benjamin explicitly uses them. Their thresholds are learned/calibrated from Benjamin-labeled examples and tested on held-out examples; thresholds are never chosen merely because they make the backtest look good.
