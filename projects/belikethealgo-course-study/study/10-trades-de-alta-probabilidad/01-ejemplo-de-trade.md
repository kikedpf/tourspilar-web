# 10 Trades de Alta Probabilidad — 01 Ejemplo de trade

Status: **COMPLETE**

## Evidence reviewed

- Full video: ~991.8 s / 16.5 min.
- 191 timestamped transcript segments.
- 198 periodic frames at ~5 s intervals.
- 53 detected chart-state changes plus adaptive scene evidence.
- All 17 periodic contact sheets and state-change sheets reviewed, including instructor-drawn high/low-probability schematics and the later chart examples.

## Main rule — instructor explicit

Benjamin opens the lesson by calling **liquidity the most important thing in the market** and contrasts two otherwise similar setups:

1. a POI/liquidity interaction where substantial opposing/target-side liquidity remains available;
2. a POI interaction where price has already consumed most nearby liquidity while approaching the area.

His preferred, higher-probability case is the first.

```text
relevant POI / liquidity manipulation
+ valid session
+ normal LTF confirmations
+ substantial liquidity still available in trade direction
= higher-probability candidate
```

This is a probability-ranking rule, not a deterministic entry signal.

## High-probability schematic

### Instructor-explicit sequence

Around 00:00–04:43 Benjamin repeatedly draws and explains the preferred structure:

```text
price approaches relevant liquidity / POI
while leaving/creating visible liquidity behind or toward the future target
-> liquidity/POI is manipulated
-> valid LTF confirmation is required
-> ideally price retraces toward the LTF imbalance in a corrective/liquidity-building manner
-> trade has a nearby first liquidity objective and larger downstream liquidity objectives
```

Examples of relevant POIs he names include PDH/important high, an induced orderblock, and other previously taught relevant zones.

### Liquidity available in the trade direction

For a short, Benjamin wants meaningful liquidity below price; for a long, meaningful liquidity above price. In the schematic he repeatedly uses staircase/trendline/equal-high/equal-low style accumulation as evidence of stops remaining available.

The visual diagrams explicitly mark these stop clusters with `$` and compare them with a path where the approach has already liquidated the intermediate extrema.

### Corrective approach into the LTF imbalance

Benjamin says the setup gains probability when price approaches the entry imbalance **correctively**, creating additional liquidity during the retracement. That gives an intermediate liquidity objective which can serve as the first management milestone.

This is currently stored as:

```text
corrective_liquidity_building_approach = probability enhancer
```

not as a required condition for every valid trade.

## Lower-probability schematic — instructor explicit

Around 04:48–08:55 Benjamin contrasts the same POI with an approach that has already liquidated the intermediate lows/highs.

```text
approach consumes nearby target-side liquidity
-> little liquidity remains in the intended trade direction
-> reaction can still happen
-> but Benjamin assigns lower probability
```

He is explicit that **lower probability does not mean forbidden**. He suggests considering less risk / smaller size or requiring a better corrective approach before committing.

A particularly weak case is:

```text
little target-side liquidity remains
+ price drives very aggressively into the entry imbalance/POI
```

Benjamin warns that this may represent a continuation/manipulation rather than the expected reversal.

## Worked chart examples

### Example A — induced/relevant orderblock with stop accumulation

Around 08:55–10:08 the chart shows a relevant orderblock/area after liquidation of a prior high. Price then stalls and creates a pattern Benjamin interprets as retail stop accumulation below the local lows. He ranks the prospective short more highly because there is visible liquidity below to target.

### Example B — Friday PDH -> London short -> Asia/trendline liquidity

Around 10:08–12:00 Benjamin shows a Monday example where Friday's PDH is liquidated during London timing. The proposed short is attractive because below price remain:

- Asia low;
- trendline/staircase-style stop liquidity.

He explicitly frames Asia / the lower trendline region as minimum/likely liquidity objectives.

The later chart then shows a New York-window reversal after those stops are cleared; this is useful negative evidence against assuming that reaching one liquidity objective guarantees continuation.

### Example C — long after low manipulation with PDH / trendline liquidity above

Around 12:00–13:35 he shows the mirror case: a low is manipulated during New York timing while PDH and trendline-style liquidity remain above. He calls a long with the previously taught confirmations a very high-probability candidate.

### Speed / displacement after correct location

Around 12:45–13:35 Benjamin states that when the market is at the right location it often moves quickly because stop holders should not be given time to protect at breakeven. The chart visually shows a sharp directional expansion after the manipulation.

Accepted status:

- **Instructor-explicit:** Benjamin associates correct location / available stop liquidity with fast movement.
- **Not yet accepted as numeric rule:** there is no threshold for how fast is “fast”.
- Measure with the existing displacement metrics and validate later.

### Example D — low-probability short with no liquidity below

Around 14:44–16:10 Benjamin shows a short idea after a rapid rise where price has not built meaningful liquidity below. He explicitly says the trade is lower probability and also notes the shown entry is outside the valid time window. Price mitigates the imbalance and resumes upward instead of continuing lower.

This is strong no-trade / low-quality evidence:

```text
wrong time
+ little/no target-side liquidity
= reject or sharply downgrade
```

## Entry activation

This lesson **does not replace the existing LTF entry model**. Benjamin repeatedly says the usual confirmations must still appear and timing must be valid.

Therefore liquidity availability is a setup-quality layer above the existing trigger:

```text
HTF/relevant liquidity or POI
-> valid session
-> LTF structure/reaction/imbalance confirmation
-> entry trigger
```

The module adds:

```text
+ evaluate target-side liquidity remaining
+ evaluate how much liquidity was consumed during approach
+ evaluate approach quality into the LTF imbalance
```

## Management — instructor explicit but contextual

Benjamin repeatedly uses the nearest created/remaining liquidity as a first milestone. Once that nearby liquidity is taken, he describes moving the stop to **break-even** to protect the trade, while larger downstream liquidity remains the potential target.

This is evidence for an event-based BE candidate:

```text
first meaningful target-side liquidity taken
-> BE candidate
```

It is **not yet promoted to a universal BE rule**, because other course modules may use different triggers and exact execution semantics remain to be calibrated.

## Risk adjustment — instructor explicit, requires later policy reconciliation

For lower-probability setups Benjamin suggests:

- smaller risk / smaller lot size;
- thinking twice before entering;
- potentially more aggressive stop management.

For higher-probability setups he verbally suggests higher size relative to lower-probability ones.

This must **not** override the earlier 0.5%–1% risk framework. Until the Trading Plan / funding modules clarify the allowed scheme, store this only as:

```text
setup_quality_can_modulate_risk_within_allowed_risk_policy = hypothesis / pending reconciliation
```

## Measurable features to add

For every entry candidate record:

- `target_side_liquidity_count`;
- `target_side_liquidity_types`;
- `distance_to_first_target_liquidity_atr`;
- `distance_to_next_external_liquidity_atr`;
- `liquidity_consumed_during_approach_count`;
- `approach_liquidity_retention_ratio` (**OUR METRIC**);
- `approach_mode ∈ {corrective_liquidity_building, impulsive_liquidity_consuming, mixed}`;
- displacement metrics during approach;
- displacement metrics after trigger;
- nearest-liquidity BE event and realized reaction afterward;
- valid-session flag;
- setup-quality label used by instructor where available.

## Unresolved / calibration items

1. No numeric threshold defines “much” vs “little” liquidity.
2. Exact algorithmic grouping of trendline/staircase liquidity still needs tolerance rules.
3. Exact minimum distance to available liquidity required for acceptable RR is not specified here.
4. “Corrective” versus “too impulsive” approach has no fixed numeric threshold yet.
5. Risk scaling by setup quality must be reconciled with the earlier fixed-percentage risk guidance and later Trading Plan module.
6. BE-after-first-liquidity is strongly illustrated but not yet proven universal.

## Module 10 decision rule

```text
START with previously valid setup
-> inspect remaining liquidity in intended trade direction
-> inspect whether approach preserved/created or already consumed that liquidity
-> prefer corrective/liquidity-building approach into LTF entry area
-> require normal valid-session + LTF confirmation
-> rank setup higher when meaningful target-side liquidity remains
-> rank setup lower when little target-side liquidity remains, especially after an impulsive approach
-> use nearest meaningful liquidity as a candidate first management milestone
```

This module is a **probability/ranking layer**, not a standalone entry model.