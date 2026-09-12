# Quantitative research model — high-probability trade ranking

This document operationalizes Module 10 without inventing instructor thresholds.

## Purpose

Module 10 adds a ranking layer to already-valid setups. It does not create a new standalone trigger.

For each candidate trade, calculate only information known at the candidate entry time.

## Base eligibility

Before quality ranking, candidate must preserve the previously learned fields:

- valid session/time;
- relevant HTF/structural liquidity or POI;
- required LTF reaction / structure event;
- usable imbalance/orderblock if required by that setup;
- entry trigger known without future bars.

## Target-side liquidity map

At candidate entry time, identify liquidity in the intended trade direction.

Store:

- `target_side_liquidity_count`;
- `target_side_external_count`;
- `target_side_internal_count`;
- `target_side_types[]`;
- `first_target_liquidity_price`;
- `first_target_liquidity_distance_atr`;
- `next_external_liquidity_distance_atr`;
- `rr_to_first_target_liquidity`;
- `rr_to_next_external_liquidity`.

Do not count a level that was already swept before entry as still available.

## Approach-consumption measurements

Measure the path from the latest relevant origin / swing toward the POI or entry zone.

Store:

- number of intermediate liquidity points identifiable before approach;
- number consumed during approach;
- number still intact at entry;
- `approach_liquidity_retention_ratio = intact / identifiable_before` (**OUR METRIC**);
- sequence and timestamps of sweeps;
- whether the approach repeatedly takes lows/highs in the eventual target direction.

The ratio is exploratory only. No threshold is currently a Benjamin rule.

## Approach geometry

Classify descriptively using raw measurements rather than a hardcoded label:

- candle count;
- net move / ATR;
- directional efficiency;
- median and maximum range / ATR;
- body dominance;
- overlap ratio;
- wick ratio;
- directional consistency;
- local range expansion;
- FVG creation during approach;
- intermediate swing / stop-cluster creation.

Candidate labels for analysis:

- `corrective_liquidity_building`;
- `impulsive_liquidity_consuming`;
- `mixed`.

These labels remain provisional until the weekly corpus shows reproducible separation.

## Post-trigger displacement

After the entry trigger, record the existing displacement feature set:

- time to first target liquidity;
- favorable excursion before first meaningful pullback;
- net move / ATR;
- efficiency;
- range expansion;
- body dominance;
- overlap;
- FVG generation;
- pullback depth.

This will test Benjamin's claim that the correct location with available liquidity tends to produce rapid movement.

## First-liquidity management event

Record:

- `first_liquidity_hit`;
- `first_liquidity_hit_time`;
- R available when hit;
- whether BE would have been possible;
- subsequent maximum favorable excursion;
- subsequent maximum adverse excursion;
- whether price reverses before the larger target.

The goal is to test the candidate rule:

```text
nearest meaningful liquidity taken -> move stop to BE
```

Do not enforce it in final backtesting until validated across later course material.

## Quality labels

Where Benjamin explicitly labels an example:

- `instructor_quality = high | low | other`;
- timestamp/source;
- reasons stated verbally;
- visual evidence features.

Train/calibrate no score yet. First collect labeled examples.

## Negative evidence

Explicitly label candidates with:

- little/no target-side liquidity;
- wrong time;
- target-side liquidity already consumed on approach;
- highly impulsive approach into entry area with no remaining target-side stops;
- poor RR to first meaningful liquidity;
- valid-looking POI but absent downstream liquidity.

## Future calibration

After enough weekly examples:

1. freeze feature definitions;
2. compare instructor high/low labels;
3. estimate which features materially separate them;
4. test held-out videos;
5. only then consider a composite quality score.

Any composite score must be labeled **OUR METRIC**, not Benjamin terminology.