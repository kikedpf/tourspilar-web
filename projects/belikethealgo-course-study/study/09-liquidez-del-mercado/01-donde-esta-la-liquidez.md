# 09 Liquidez del Mercado — 01 Dónde está la liquidez

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript: ~1288.9 s / 21.5 min, 178 transcript segments.
- Periodic 5 s frames across the full lesson plus detected chart-state/scene changes.
- Opening six-pattern liquidity diagram visually reviewed and later chart examples cross-checked against the transcript.

## Instructor-explicit liquidity locations

Benjamin states that liquidity is found around **maxima and minima** and illustrates six symmetric shapes in the opening diagram. The evidence supports these operational families:

1. isolated/relevant swing minimum;
2. isolated/relevant swing maximum;
3. two consecutive lows that have not swept one another / double-bottom-like liquidity;
4. two consecutive highs that have not swept one another / double-top-like liquidity;
5. rising-low / trendline-style liquidity;
6. falling-high / trendline-style liquidity.

The labels “support”, “resistance”, “double top/bottom” and “trendline” are used descriptively; the trading interpretation is that stops/orders cluster around the associated highs/lows.

### Evidence timestamps

- ~00:16–02:59: opening explanation of the six liquidity shapes and why maxima/minima and repeated/trendline structures contain liquidity.
- ~00:53–01:29: an orderblock is considered better when it has first liquidated one of these structures; a block in the middle of nowhere is not enough.
- ~02:59–03:59: Benjamin explicitly links these liquidity forms to whether an orderblock is properly induced.

## Orderblock / liquidity relationship

Instructor-explicit sequence:

```text
VISIBLE LIQUIDITY / INDUCEMENT
-> liquidity is taken
-> relevant untouched orderblock/rejection area
-> valid Killzone timing
-> LTF reaction/confirmation
-> entry candidate
```

Benjamin explicitly rejects treating an orderblock that is “in the middle of nowhere” as sufficient. The POI should have done something meaningful, particularly taken/absorbed liquidity.

This reinforces Module 5: orderblocks are secondary to liquidity + timing + reaction.

## Multi-timeframe liquidity scan

Benjamin describes a practical top-down routine:

- macro/context: Daily and 4H;
- intraday liquidity/context: 1H, 30m, 15m;
- LTF execution/confirmation: 1m in the worked examples.

He also marks prior period/session extremes such as PDH/PDL and weekly highs/lows as part of the liquidity map, while warning that lower timeframes contain too many apparent liquidity points and can create noise.

### Evidence timestamps

- ~07:09–09:15: H1/15m/30m intraday scan, Daily/4H macro, PDH/PDL/weekly levels and the search for induced POIs.
- ~11:06–13:06: preference for reading H1/15m/30m instead of drowning in 5m liquidity; map what price may reach inside the two-hour session.

## Entry activation evidence

The lesson provides explicit examples of liquidity being a prerequisite/context rather than the complete entry trigger:

- liquidity is identified first;
- price reaches/takes the level during the valid Killzone;
- Benjamin then looks for rejection block / rejection candle / imbalance or LTF confirmation;
- an aggressive rejection entry is distinguished from waiting for an imbalance.

At ~15:27 he explicitly says he would not enter merely because a minimum was liquidated if there is “nothing” supporting the entry. Around ~18:17–19:42 he demonstrates waiting for rejection or an imbalance after the maximum is taken.

## Targets / management

Liquidity points are also used as objectives. In worked examples Benjamin discusses:

- taking a large partial around 3R–4R;
- leaving a runner toward the next HTF minimum/maximum liquidity;
- using the next relevant liquidity rather than an arbitrary fixed-price target.

These are examples/management guidance, not yet a universal partial-taking formula.

## Negative evidence / no-trade conditions

- Liquidity taken outside the correct session does not automatically justify an entry.
- Liquidity without a meaningful POI/reaction is insufficient.
- Relevant news can invalidate an otherwise geometrically plausible setup.
- A lower-timeframe “liquidity everywhere” interpretation is explicitly discouraged because it creates noise.

## Unresolved

1. Exact wick-vs-close rule for declaring a liquidity level “taken” is still not universalized in this lesson. Many examples visually use wick sweeps, but no single tolerance rule is stated.
2. The exact quantitative tolerance between “consecutive/equal” highs or lows is not given.
3. How far a trendline-style set of highs/lows may deviate while still being one liquidity pool is not quantified.
4. The lesson says the POI should be “induced”, but no single mathematical threshold defines how close/strong the inducement must be.

These remain calibration targets for the weekly corpus rather than invented thresholds.