# BeLikeTheAlgo Analysis Protocol

## Objective

Reverse-engineer the course into an explicit, measurable and reproducible trading rule-set before any historical backtest is accepted.

The standard is not "this looks similar". Every concept must be tied to evidence, converted into an operational definition, tested on unseen course examples and revised when it fails.

## Terminology policy

Use Benjamin's own terminology as the primary vocabulary for the strategy. Terms such as **liquidity, structure break / quiebre de estructura, displacement / desplazamiento, imbalance, orderblock, sessions, entry, stop and target** must be defined exactly as he uses them in the course.

If we introduce an auxiliary concept that Benjamin does not explicitly name, it must be labeled **OUR METRIC** or **OUR AUXILIARY TERM**, immediately defined in plain language, and never presented as if it were part of Benjamin's method.

## Evidence hierarchy

Every extracted rule is tagged as one of:

1. **Instructor-explicit** — stated verbally or written/drawn directly by the instructor.
2. **Visual-confirmed** — repeatedly observable in instructor examples but not fully verbalized.
3. **Provisional inference** — our hypothesis. Never used in final backtests until validated.
4. **Unresolved/ambiguous** — insufficient evidence; excluded from automated rules.

Every rule keeps source video, timestamp, timeframe, chart context and supporting screenshots.

## Multi-pass video analysis

### Pass A — semantic map
- Transcribe with timestamps.
- Detect all references to timeframe, session, liquidity, structure, displacement, imbalance/FVG, orderblock, entry, stop, target, invalidation, news and risk.
- Build a glossary using the instructor's own definitions.

### Pass B — dense visual analysis
- Coarse frames only locate events.
- Around every relevant transcript timestamp, extract dense timestamped frames before, during and after the event.
- Preserve chart timeframe, symbol, date/time, price scale, annotations, cursor position and before/after state whenever visible.
- For structure breaks and entries, capture the setup sequence rather than one isolated screenshot.

### Pass C — event labeling
For every demonstrated or taken trade, label chronologically:
1. higher-timeframe context;
2. important liquidity points available before the trade;
3. liquidity taken or left untouched;
4. structural swings before the break;
5. displacement before the break;
6. exact break event;
7. displacement after the break;
8. imbalance/FVG/orderblock creation and validation;
9. retracement or confirmation;
10. exact entry trigger;
11. entry price/area if visible;
12. stop logic;
13. target/liquidity objective;
14. management (BE/partial/TP);
15. result;
16. reasons the setup was valid;
17. conditions that would have invalidated it.

Negative examples and "do not trade" examples are labeled with the same depth.

## Structure / break-of-structure research

Never assume what constitutes a swing or a break.

For every instructor-labeled structure break record:
- timeframe;
- bullish/bearish direction;
- exact reference swing high/low;
- how that swing was selected;
- wick vs close requirement;
- candle close beyond level;
- penetration distance;
- number of candles involved;
- whether liquidity was swept first;
- whether displacement is required;
- whether an imbalance is created;
- relationship to higher-timeframe structure;
- what happens immediately before the break;
- what happens immediately after the break;
- whether the event is BOS, CHoCH/MSS or another term used by the instructor.

Candidate measurable features include close distance normalized by ATR, candle range/ATR, body/range ratio, consecutive directional candles and FVG creation. No threshold becomes a rule merely because it is convenient: thresholds are derived from instructor-labeled examples and validated on held-out examples.

## Displacement

Measure displacement both **before and after** important liquidity events and structure events.

Record:
- number of candles;
- total directional move;
- slope / inclination normalized by local volatility;
- largest candle range;
- median/mean candle range;
- body-to-range ratios;
- move normalized by ATR or recent local volatility;
- directional efficiency (net move divided by total path travelled) — **OUR METRIC**;
- overlap between consecutive candles;
- wick proportions;
- directional consistency;
- local expansion versus preceding candles;
- FVG/imbalance generated;
- time required for the move;
- distance from origin to broken structure;
- continuation after the break before retracement;
- immediate retracement depth;
- whether the displacement occurred immediately after taking liquidity, before a structure break, after a structure break, or in another sequence used by Benjamin.

We do not create a final "displacement score" until enough Benjamin-labeled examples exist to determine which measurements actually distinguish his valid displacements from ordinary price movement.

## Liquidity map

For every timeframe the instructor actually uses, build a separate liquidity layer. Do not pre-impose timeframes that are not supported by the course.

Potential categories are only accepted after evidence:
- previous day/week/session highs and lows;
- swing highs/lows;
- equal highs/lows;
- clustered highs/lows;
- Asia range highs/lows;
- London/New York session extremes;
- internal vs external liquidity;
- old highs/lows;
- inducement or intermediate liquidity;
- target-side and opposing-side liquidity.

For each liquidity point record:
- timeframe of origin;
- formation timestamp;
- **known timestamp**: first moment it could have been identified without future information;
- price;
- category;
- number of touches;
- tolerance between equal levels;
- prominence relative to neighboring swings;
- age in candles/time;
- whether it has already been swept;
- whether a close through it invalidates it;
- distance from current price;
- priority assigned by the instructor;
- interaction with higher/lower-timeframe liquidity;
- price behavior while approaching it;
- exact reaction immediately after it is taken.

The objective is an algorithm that can detect the same liquidity points on raw OHLC data without seeing the future.

## Entry model

For every entry or near-entry record:
- instrument;
- date/time and timezone;
- session;
- all active timeframes;
- directional bias and how it was derived;
- required liquidity event;
- required structure event;
- required displacement and where in the sequence it occurs;
- required imbalance/orderblock;
- confirmation sequence;
- exact trigger candle/event;
- market vs limit entry;
- permitted entry zone;
- maximum lateness/chase conditions;
- stop placement and buffer;
- initial target;
- minimum RR if the instructor uses one;
- cancellation/invalidation conditions;
- news restrictions;
- session/time restrictions;
- management rules.

A setup is not considered defined until it can be expressed as an ordered decision tree with boolean/measurable conditions.

## When NOT to trade

Create a first-class no-trade rule set, not an afterthought.

Extract every example or statement involving:
- wrong session/time;
- high-impact news;
- unclear/contradictory higher-timeframe bias;
- insufficient displacement;
- weak/invalid structure break;
- liquidity not yet taken;
- wrong liquidity point or lower-priority liquidity still active;
- target already consumed;
- poor RR;
- entry too late;
- invalidated orderblock/FVG;
- excessive volatility or dead market;
- daily loss/risk limits;
- any instructor-specific exclusion.

Each exclusion must state exactly what observable condition blocks the trade.

## Measurement-before-interpretation rule

Knowing retrospectively that an event occurred is not enough. Every concept must have a measurable detector that can identify it from raw market data using only information available at that time.

For every detected event keep both:
- **event_time** — where it appears on the chart;
- **known_time** — when it became objectively detectable.

A rule that cannot reproduce Benjamin's labels on unseen examples is not considered solved, even if a human can explain the chart afterward.

## Rule calibration and correction loop

1. **Collect examples** without deciding thresholds too early.
2. **Define candidate rule** from explicit statements + repeated visual evidence.
3. **Freeze the candidate definition temporarily.**
4. **Test it on course examples not used to create it**, especially weekly trade reviews.
5. Compare our predicted labels/entries with the instructor's actual labels/actions.
6. Every mismatch is investigated as one of:
   - visual-reading error;
   - transcription/context error;
   - incomplete rule;
   - wrong threshold;
   - hidden higher-timeframe dependency;
   - instructor inconsistency/discretion;
   - data ambiguity.
7. Revise and retest.
8. A rule is not promoted to backtesting until its reproducibility is high and remaining exceptions are explicitly documented.

For automated detectors track at least precision, recall, false positives, false negatives and detection timing relative to Benjamin-labeled events.

## Anti-lookahead discipline

All future backtesting must calculate features using only information available at that candle/time.

Forbidden:
- defining swings using future bars unless the rule explicitly waits for confirmation;
- choosing liquidity because price later reacted there;
- choosing the "correct" orderblock after seeing the outcome;
- changing thresholds after seeing test-period P&L without a new out-of-sample test.

## Backtesting phases

### Phase 1 — course replication
Reproduce instructor examples from historical charts with the formal rule-set.

### Phase 2 — held-out course trades
Use weekly trade-review videos not used to build the rules. Predict setup/no-setup and entry before comparing to instructor behavior.

### Phase 3 — historical out-of-sample test
Run the frozen rule-set on independent multi-year OHLC data with exact session/timezone conventions, spread/slippage assumptions and risk rules.

### Phase 4 — robustness
Test years, instruments, sessions, volatility regimes and parameter sensitivity separately. Report failures, not only averages.

## Required outputs

Maintain:
- glossary of exact instructor definitions;
- rulebook with version numbers;
- dataset of instructor-labeled events;
- screenshot/timestamp evidence index;
- machine-readable trade/event table;
- unresolved ambiguity log;
- mismatch/correction log;
- frozen backtest specification;
- final backtest code and results.

No discretionary concept will be disguised as an objective rule. If something cannot be measured reliably after studying the full evidence, it remains explicitly discretionary and is excluded from a supposedly automated backtest until solved.

---

# Mandatory Measurement Architecture v2

The following rules are mandatory for all analysis from Weekly Trade 6 onward and must also be backfilled to earlier examples before the initial strategy is frozen. Canonical specification: `docs/measurement_architecture_v2.md`. Canonical per-example field checklist: `docs/weekly_trade_event_schema_v2.md`.

## Separate instructor replication from market optimization

There are two distinct research objectives:

1. **Instructor replication** — learn thresholds/definitions that reproduce Benjamin's labels and decisions. Optimize agreement metrics such as precision, recall, false positives/negatives and timing. **P&L must not choose these thresholds.**
2. **Market-edge testing** — only after a rule-set is frozen, test expectancy on independent historical OHLC data containing all eligible market days, not only course examples.

A parameter changed after seeing historical P&L requires a new untouched out-of-sample period.

## Availability layers

Every variable must belong to one layer:

- **L0 Context** — available before the setup;
- **L1 Activation** — becomes available before the entry decision;
- **L2 Execution** — order/fill information;
- **L3 Post-entry/outcome** — MFE, MAE, management evolution, final result and all future-path information.

Only L0 and L1 may decide whether to enter. L2 controls realistic execution. L3 is forbidden as an original entry feature.

## Validity, quality and outcome must never be conflated

Store independently:

- setup validity under the current frozen rules;
- pre-entry setup quality/confluence;
- whether Benjamin took the trade;
- final trade result.

A valid trade may lose. A winner may violate the rule-set. No outcome may retroactively relabel setup validity.

## Ordered state-machine requirement

A setup must be reconstructed as ordered events, not only as an unordered feature vector. Record event/known times and elapsed bars/seconds between transitions. Candidate families may differ, but sequence itself is measurable evidence.

Normal candidate chain to test against evidence:

`context -> liquidity event -> reaction -> impulse -> imbalance -> structure/candle confirmation -> retracement -> activation -> order -> fill -> management -> exit`

## Impulse and displacement are separate research objects

From now on:

- **Impulse** = local decision/confirmation event, commonly responsible for an imbalance and immediate intent.
- **Displacement** = quality of the broader directional leg/travel.

Do not use one boolean as a synonym for both. Preserve separate measurements and instructor labels.

## Approach quality is first-class

For every approach into a candidate POI/entry zone, measure speed/efficiency, overlap, body dominance, expansion, internal pullbacks, newly generated liquidity, target-side liquidity consumed and opposing liquidity created. Preserve Benjamin's qualitative label when explicit. Do not invent a profitable numeric threshold.

## Execution realism is mandatory

Do not assume every ideal limit order fills. Record decision time, order time, requested price, entry zone, fill/no-fill, fill time, spread, slippage, cancellation and split orders. Instructor-supported execution variants must be tested as separate variants rather than selected retrospectively by best P&L.

## Post-entry path metrics

For every filled trade record at least MFE_R, MAE_R, time to 0.5R/1R/2R/3R, retracement after milestones, new adverse/favorable liquidity/structure, BE/partial decisions and realized R. These are L3 variables and cannot justify the original entry.

## Duplicate/dependence controls

Every example must identify duplicates, repeated videos and same-day/same-move correlations. Exact repeats count once. Validation uncertainty should be clustered by trading day and, when appropriate, week.

## Chronological validation only

Final validation uses chronological holdouts, never a random train/test split. If a holdout example influences a rule revision, it becomes development data and a new untouched holdout is required.

## Ablation comes after the Benjamin baseline is frozen

Only after the initial strategy reproduces Benjamin acceptably and is frozen may we test controlled removals/changes such as DXY, structure, candle confirmation, orderblock confluence, preferred timing, approach-quality filtering or execution variants. Each modification creates a new strategy version.