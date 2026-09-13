# Measurement v2 Backfill Plan

## Objective

Ensure the whole BeLikeTheAlgo evidence corpus uses one compatible measurement standard before the Benjamin baseline strategy is frozen.

## New material

Starting with Weekly Trade 6, every newly studied trade/example/no-trade must follow:

- `ANALYSIS_PROTOCOL.md` — Mandatory Measurement Architecture v2 section;
- `docs/measurement_architecture_v2.md`;
- `docs/weekly_trade_event_schema_v2.md`;
- component-specific measurement documents.

A weekly lesson cannot be marked analytically COMPLETE under the new standard unless its examples satisfy the v2 completeness gate or unresolved fields are explicitly recorded.

## Weeks 1–5 backfill

The existing narrative analyses remain valid evidence summaries, but before strategy freeze each independent example must be backfilled with:

1. sample identity / duplicate fields;
2. L0 context fields;
3. linked liquidity objects;
4. ordered state sequence with `event_time` + `known_time`;
5. separate impulse and displacement objects;
6. approach-quality fields when applicable;
7. separate `setup_validity`, pre-entry quality, trade-taken and outcome;
8. L2 execution/fill assumptions;
9. L3 MFE/MAE/milestone fields once exact OHLC reconstruction is available;
10. current rulebook/schema version.

Week 2 remains `independent_sample=false` where it repeats Week 1 material.

## Modules 1–13

Do not rewrite every lesson into the full weekly schema. Instead:

- retain module files as rule/evidence sources;
- ensure each confirmed rule maps to one or more v2 measurable fields;
- unresolved concepts remain unresolved;
- if a module example becomes a calibration sample for a detector, assign it a canonical example ID and availability layers.

## Weeks 6 onward

Use v2 natively from the first pass so no second narrative-only pass is required.

## Timing of exact OHLC backfill

Some numerical fields (exact ATR-normalized distances, MFE/MAE, precise fills, exact structure prices) may require historical OHLC synchronized to the video chart.

When exact market data is not yet attached:

- record qualitative/instructor evidence now;
- mark exact numeric field `pending_ohlc_reconstruction` rather than guessing;
- preserve chart date/time/timeframe evidence needed to reconstruct later.

## Freeze gate

The original Benjamin strategy cannot be declared `BASELINE_FROZEN` until:

- Weeks 1–5 are backfilled to v2 for all independent examples;
- later weekly holdout examples are v2-native;
- all entry-driving fields are L0/L1 only;
- execution assumptions are frozen;
- detector replication performance is measured;
- unresolved discretionary concepts are either excluded or explicitly represented as discretionary;
- no threshold was selected from historical P&L.

## After baseline

Only after the baseline is frozen and independently backtested may controlled strategy variants be created. Each variant changes one conceptual component at a time and receives a new rulebook version.