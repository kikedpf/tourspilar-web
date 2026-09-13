# Measurement Architecture v2 — BeLikeTheAlgo

Status: **canonical research architecture after Modules 1–13 and Weekly Trades 1–5**.

This document does not replace Benjamin's terminology. It defines how we measure the strategy without look-ahead, outcome leakage or P&L-driven rule invention. Component formulas remain in the existing measurement documents; this file defines the orchestration and separation of layers.

## 1. Two different research problems

The project must never collapse these into one optimization problem.

### A. Instructor-replication problem

Goal: reproduce Benjamin's decisions and labels.

Questions:
- Which liquidity does he consider relevant?
- What does he call impulse/displacement?
- Which structure point does he use?
- Which confirmations activate an entry?
- Which setups does he reject?

Thresholds are calibrated against instructor labels/actions, **not against trade P&L**.

Primary metrics:
- precision;
- recall;
- false-positive rate;
- false-negative rate;
- detection delay;
- entry-price difference versus instructor execution when visible;
- agreement on trade/no-trade labels.

### B. Market-edge problem

Only after a rule-set version is frozen, test it on independent OHLC data, including every eligible day rather than only course examples.

Goal: estimate expectancy and robustness.

Primary metrics:
- expectancy in R;
- hit rate;
- payoff ratio;
- drawdown;
- trade frequency;
- return distribution;
- parameter sensitivity;
- regime/session/year stability.

**Never choose a detector threshold because it produces the best historical P&L.** If a detector threshold is changed after looking at market P&L, a new untouched out-of-sample period is mandatory.

## 2. Four strict information layers

Every variable must belong to exactly one availability layer.

### L0 — Context available before setup

Examples:
- session/time;
- news/holiday state;
- HTF structure;
- HTF POI;
- existing liquidity map;
- Asia range;
- DXY state available at the same timestamp;
- target-side and opposing liquidity already identifiable.

### L1 — Activation information available before entry

Examples:
- relevant liquidity sweep/take;
- rejection/reaction;
- impulse;
- imbalance creation;
- structure change/break;
- candle formation;
- retracement into entry zone;
- entry confirmation candle if used.

Only **L0 + L1** may determine whether a trade is entered.

### L2 — Execution information

Examples:
- decision time;
- order submission time;
- order type;
- requested entry price;
- fill time;
- actual/simulated fill price;
- spread;
- slippage;
- partial fill;
- cancelled/unfilled order;
- stop/target known at order time.

### L3 — Post-entry / outcome information

Examples:
- MFE;
- MAE;
- time to 1R/2R/3R;
- future structure/liquidity created after entry;
- BE/partial events;
- final P&L;
- later reaction after target liquidity.

L3 is for management research, diagnostics and outcome analysis. It is **forbidden as an input to the original entry decision**.

Every machine-readable feature must include `availability_layer ∈ {L0,L1,L2,L3}` or inherit an unambiguous layer from its table/schema.

## 3. Validity, quality and result are different variables

For every candidate setup store separately:

- `setup_validity ∈ {valid, invalid, unresolved}`;
- `setup_quality ∈ {A, B, C, unresolved}` or a later evidence-derived scale;
- `trade_taken`;
- `trade_result_R`.

A stopped trade may be valid. A winning trade may be invalid under the frozen rules. Outcome must never retroactively determine validity or quality.

Until Benjamin provides an explicit numerical quality score, A/B/C is an **OUR AUXILIARY TERM** and must be derived only from pre-entry evidence.

## 4. Strategy as an ordered state machine

The canonical detector is a state machine, not an unordered feature vector.

Candidate normal sequence:

```text
S0 CONTEXT_READY
 -> S1 LIQUIDITY_EVENT
 -> S2 REACTION
 -> S3 IMPULSE
 -> S4 IMBALANCE_CREATED
 -> S5 STRUCTURE/CANDLE CONFIRMATION
 -> S6 RETRACEMENT_TO_ENTRY_AREA
 -> S7 ENTRY_ACTIVATED
 -> S8 ORDER_SUBMITTED
 -> S9 FILLED
 -> S10 MANAGED
 -> S11 EXITED
```

Not every valid setup needs every optional state; the course evidence determines which transitions are mandatory by setup family.

For every transition store:
- `event_time`;
- `known_time`;
- source timeframe;
- price/zone;
- transition reason;
- evidence tag;
- elapsed bars and elapsed seconds from previous state.

Sequence order is a feature. `liquidity -> impulse -> imbalance` is not equivalent to `impulse -> liquidity -> imbalance`.

## 5. Impulse and displacement are separated

### Impulse

Benjamin's local decision event used as a confirmation concept, commonly associated with creation of an imbalance.

Candidate measurements — **OUR METRICS**:
- number of candles in impulse event;
- range/ATR of constituent candles;
- body/range ratio;
- directional candle fraction;
- gap/imbalance created;
- time from liquidity event to impulse;
- immediate structure interaction.

`impulse_confirmed` remains an instructor-label calibration target; no numeric threshold is frozen yet.

### Displacement

Quality of the broader directional leg/travel.

Continue measuring:
- net move/ATR;
- directional efficiency;
- inclination;
- body dominance;
- overlap;
- directional consistency;
- relative range expansion;
- duration;
- retracement profile.

An impulse may initiate displacement, but they are stored as separate objects and tested separately.

## 6. Approach-quality object

Repeated course evidence indicates that how price approaches a POI/imbalance matters.

For every approach into a candidate entry area store:

- `approach_start_time`;
- `approach_end_time`;
- `approach_duration_bars`;
- `approach_net_move_atr`;
- `approach_efficiency` — **OUR METRIC**;
- `approach_overlap_ratio` — **OUR METRIC**;
- `approach_body_dominance` — **OUR METRIC**;
- `approach_range_expansion` — **OUR METRIC**;
- number of internal pullbacks;
- number of newly formed liquidity candidates;
- prominence/distance of those candidates;
- target-side liquidity consumed during approach;
- opposing liquidity created behind price;
- `approach_label_by_instructor ∈ {corrective/liquidity_building, impulsive, neutral, unresolved}` when evidence allows.

No P&L-based threshold may define "corrective" or "impulsive".

## 7. Execution realism

A backtest is not allowed to assume every ideal limit price fills.

For each intended order store:

- `decision_time`;
- `order_time`;
- `entry_mode`;
- `requested_entry_price`;
- `entry_zone_low/high`;
- `fill_rule_version`;
- `filled`;
- `fill_time`;
- `fill_price_before_costs`;
- `spread_at_fill` or stated spread model;
- `slippage` or stated slippage model;
- `fill_price_after_costs`;
- `cancel_time/reason`;
- `missed_trade` if price never fills;
- split-order fractions when applicable.

For imbalance entries, test instructor-supported variants separately (edge, midpoint, split, directional-candle confirmation) rather than silently choosing whichever works best.

## 8. Path analysis after entry

For every filled trade calculate without feeding these values back into original entry eligibility:

- `MFE_R` — maximum favorable excursion in R;
- `MAE_R` — maximum adverse excursion in R;
- `time_to_0_5R`, `time_to_1R`, `time_to_2R`, `time_to_3R`;
- maximum retracement after first reaching 1R/2R;
- first meaningful target-side liquidity reached;
- time of newly formed opposing liquidity;
- time of new favorable/adverse structure;
- BE time and reason;
- partial time/fraction/price;
- runner result;
- final realized R.

This is the dataset used to infer management rules. We do not infer a BE rule merely from final winners and losers.

## 9. Liquidity graph rather than a flat list

Keep the existing liquidity candidate fields and add relationships:

- `parent_range_id`;
- `contained_by_liquidity_id`;
- `same_pool_group_id`;
- `higher_priority_competing_id`;
- `target_for_setup_id`;
- `opposing_for_setup_id`;
- `created_during_approach_to_setup_id`.

This allows external/internal state and timeframe hierarchy to change dynamically while preserving what was knowable at each timestamp.

## 10. DXY synchronization

EUR/USD remains the traded instrument in the current strategy evidence; DXY is contextual confirmation.

Every DXY feature must be synchronized to the EUR/USD decision timestamp:

- `dxy_feature_time <= eurusd_decision_time`;
- store the source timeframe and known time;
- never use a DXY candle that had not closed/formed at the EUR/USD decision time;
- record divergence/conflict as context, not a substitute for EUR/USD's required liquidity event.

## 11. Candidate/no-trade inventory

Do not create a dataset containing only trades Benjamin took.

For each eligible session/day, eventually store:

- every candidate setup detected under the current rule version;
- Benjamin trade/no-trade decision when course evidence exists;
- failure state/reason for rejected candidates;
- whether no candidate existed;
- whether the session/day was blocked by news/holiday/risk rules.

This is essential to estimate false positives and selection bias.

## 12. Duplicate and dependence controls

Each course sample must store:

- `canonical_example_id`;
- `duplicate_of`;
- `independent_sample`;
- `same_market_day_group`;
- `same_week_group`;
- `same_underlying_move_group`.

Exact repeats count once for model statistics. Multiple trades/examples from the same market move are not treated as fully independent observations.

Confidence intervals and validation summaries should be clustered at least by trading day and, when appropriate, by week.

## 13. Chronological calibration and holdout

Random train/test splits are prohibited for the final validation.

Use chronological partitions:

- **Discovery/calibration block** — early course examples/weeks used to construct candidate definitions.
- **Instructor holdout block** — later untouched weekly examples used to test replication.
- **Historical development period** — only after instructor replication is frozen.
- **Final historical out-of-sample period** — untouched until the strategy version is frozen.

If an untouched block is used to revise a rule, it becomes development data and a new untouched block must replace it.

## 14. Threshold policy

For an unresolved concept such as impulse, sweep tolerance, equal-high tolerance or structural prominence:

1. define several candidate measurement features without thresholds;
2. label instructor-positive and instructor-negative examples;
3. estimate ranges that separate labels using discovery data;
4. choose the simplest threshold/decision rule that reproduces instructor labels;
5. freeze it;
6. test on chronological holdout;
7. report sensitivity around the chosen value.

P&L is not part of steps 1–6.

## 15. Ablation only after strategy freeze

Once a strategy version reproduces Benjamin acceptably and is frozen, run ablations:

- remove DXY confirmation;
- remove structure confirmation;
- remove candle formation;
- remove orderblock confluence;
- remove preferred subwindow feature;
- remove approach-quality filter;
- alter liquidity-priority layers;
- compare entry execution variants.

The purpose is to discover which components add independent market edge. Ablation findings create a **new strategy version**; they do not rewrite the original Benjamin-replication model silently.

## 16. Versioning

Every formal strategy/backtest carries:

- `rulebook_version`;
- `measurement_schema_version`;
- `data_version`;
- `execution_model_version`;
- `risk_model_version`.

Current measurement schema: **v2**.

No old backtest is directly comparable to a new version unless the changed components are stated.

## 17. Definition of done before optimization

We do not begin "small strategy improvements" until:

1. the full course is studied in published order;
2. weekly-trade corpus is indexed with positive and negative evidence;
3. major concepts have reproducible detectors or are explicitly marked discretionary;
4. instructor-replication holdout performance is measured;
5. entry features are proven free of L3/outcome leakage;
6. execution assumptions are frozen;
7. the initial Benjamin rulebook version is frozen.

Only then do we backtest the original strategy and make one controlled change at a time.