# 07 Rango de Asia — 01 AMD + Indicador Asia Session

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript (~11.0 min; 81 segments).
- 132 periodic frames plus scene/state-change evidence.
- Introductory AMD diagram and full TradingView indicator/configuration walkthrough reviewed.
- Worked EUR/USD example around the London window reviewed.

## AMD definition — instructor explicit

Benjamin defines:

- **A = acumulación**
- **M = manipulación**
- **D = distribución**

The conceptual diagram shows a range/acumulation, a false directional push/manipulation, and then a larger move/distribution in the opposite direction.

He says accumulation commonly occurs during Asia because activity/volatility is lower; manipulation is commonly associated with the London window; distribution is the subsequent directional move. These are course claims to test later, not accepted statistical frequencies.

## Asia range time window

Approx. 127–267 s.

Benjamin configures the TradingView Asia-session indicator using **New York time** and explicitly sets the accumulation interval approximately as:

```text
19:00 New York -> 00:00 New York
```

In the indicator he enters `19:00 -> 00:01`, explaining that the extra minute is a TradingView/indicator workaround so the box displays correctly. The extra minute is therefore **not evidence that his conceptual Asia range is fundamentally 19:00–00:01**.

### Backtest requirement

Session boundaries must be generated in `America/New_York` local time with historical DST handling. Do not hard-code one fixed UTC offset.

## Asia high / low are liquidity

Approx. 267–288 s and repeated later.

Benjamin explicitly treats the upper and lower boundaries of the Asia accumulation box as liquidity. His operational instruction is not to search for an entry while price remains trapped inside the accumulation range; he wants price to liquidate/breach one side first.

Provisional state representation:

```text
asia_high = max(high) during Asia window
asia_low  = min(low) during Asia window

before either side is taken:
    asia_range_unresolved = true
```

This defines the range mechanically; the later liquidity module may refine exactly what counts as a valid `taken` event.

## Relationship to trading windows

In the worked example Benjamin waits for the London trading period rather than entering simply because an Asia boundary exists. He reiterates that the Asia box is **confluence/location**, not an autonomous entry trigger.

The example combines:

```text
Asia-range liquidity
+ valid London timing
+ induced/clean orderblock below the Asia range
+ lower-timeframe rejection / imbalance execution
```

This is consistent with the hierarchy learned earlier: liquidity and time first, then reaction/execution evidence.

## Worked example

Benjamin refers to Thursday 13 April and moves from 1H to 30m/15m. Visual evidence confirms the blue Asia box and a marked higher-timeframe POI below it.

He identifies an induced orderblock below the Asia range, waits for the lower side to be liquidated in/near the London window, and then discusses two execution variants already seen in earlier modules:

- rejection/confirmation candle;
- entry from a newly formed imbalance.

He illustrates roughly 1:3 as achievable in the example. This is not promoted into a universal RR rule from this video alone.

## Important negative rule

Instructor-explicit:

```text
Do not search for the trade merely inside the Asia accumulation box.
Wait for one side of the range to be taken / resolved and then evaluate the reaction with the other confirmed filters.
```

This prevents a future detector from treating `price inside Asia range` as an entry condition.

## What is confirmed

- AMD terminology and directional schematic.
- Asia accumulation box is measured in New York time.
- Course configuration: approximately 19:00–00:00 New York (00:01 only as indicator display workaround).
- Asia high and Asia low are treated as liquidity/confluence.
- Benjamin generally waits for one boundary to be liquidated before searching for the inverse/reaction setup.
- Asia range is a context/confluence tool, not sufficient by itself for entry.
- POI/orderblock, valid session and LTF reaction remain relevant.

## Still unresolved

- Exact OHLC definition of `Asia boundary taken` (wick vs close/tolerance), deferred to liquidity evidence.
- Whether every day must have a valid Asia box or whether abnormal/news days should be excluded.
- Quantitative definition of unusually large/small Asia range.
- Statistical frequency of AMD; Benjamin's verbal frequency claims require validation rather than acceptance.
- Exact interaction with Frankfurt vs London will be refined by video 2 and later London module.

**Lesson status: COMPLETE.**
