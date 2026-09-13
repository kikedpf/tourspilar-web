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

---

# Mandatory v2 weekly-trade labeling contract

From Weekly Trade 6 onward, and retroactively before the Benjamin baseline is frozen, each example must satisfy `docs/measurement_architecture_v2.md` and `docs/weekly_trade_event_schema_v2.md`.

Additional completion requirements:

9. `setup_validity`, pre-entry `setup_quality`, `trade_taken` and final outcome are stored separately;
10. impulse and displacement are recorded as separate objects/fields;
11. ordered event sequence is reconstructed with `event_time` and `known_time` for all decision-relevant events;
12. every feature is assigned to L0/L1/L2/L3 or inherits an unambiguous layer;
13. no L3/post-entry variable is used to explain why the original entry was valid;
14. approach quality into the entry zone is measured when an approach exists;
15. order/fill assumptions are explicit for every taken or simulated trade;
16. duplicate/repeated/correlated-sample fields are populated;
17. the example is linked to the current `rulebook_version` and `measurement_schema_version`;
18. any field that cannot be established from evidence is marked `unresolved`, never guessed.

A weekly video cannot be marked COMPLETE merely because its narrative summary exists. Its trades, rejected setups and no-trades must be reconstructable chronologically under the v2 schema.

## Calibration separation

Weekly examples used to invent or adjust a detector are **discovery/calibration data**. Later weekly examples reserved to test that detector are **instructor holdout data**.

A holdout example that causes us to change the rule ceases to be holdout data. A new untouched chronological block must replace it.

Detector thresholds are selected to reproduce Benjamin's labels/actions, not to maximize trade profit.

## Candidate-day principle for later OHLC backtesting

The course corpus teaches the method but must not be assumed to contain every market opportunity or every losing day. Once the Benjamin rulebook is frozen, historical evaluation must scan every eligible day/session in independent OHLC data and record both detected setups and no-setup/no-trade days.

## Controlled improvements after baseline

Only after the original Benjamin strategy is learned, frozen and backtested may we make small changes. Each change must be isolated, versioned and compared against the unchanged baseline. No bundle of simultaneous tweaks is accepted as evidence of improvement.