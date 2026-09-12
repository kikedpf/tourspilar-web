# 09 Liquidez del Mercado — 03 Prioridad de la liquidez

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript: ~631.9 s / 10.5 min, 86 transcript segments.
- Full periodic frame set and detected visual changes reviewed.
- Instructor's on-screen hierarchy visually confirmed:

```text
PWH / PWL
PDH / PDL
4H
1H
15MIN
```

## Instructor-explicit hierarchy

Benjamin states that liquidity priority is strongly related to timeframe:

```text
Weekly > Daily > 4H > 1H > 15m
```

For intraday trading he says he especially likes 4H and 1H liquidity, and describes 1H as the timeframe that works best for him intraday.

For beginners he explicitly recommends **not** marking 15m liquidity initially. If nothing relevant is visible on 1H, he says the session/day may simply be a no-trade rather than forcing lower-timeframe levels.

### Evidence timestamps

- ~00:00–02:40: hierarchy and novice guidance.
- ~00:45–01:24: weekly and prior-day high/low mapping routine.
- ~01:32–02:40: 4H/1H/15m hierarchy and intraday preference.

## Critical qualification — timeframe alone is NOT enough

This lesson materially changes a naive implementation of the hierarchy.

Benjamin repeatedly says that a PWH/PWL or PDH/PDL can be **irrelevant** if it lies in the middle of a larger structure/range rather than at the meaningful structural extreme.

Examples:

- ~03:41–05:01: a previous weekly level located in an arbitrary part of the structure is ignored; Benjamin instead marks the true structural/range extreme.
- ~05:35–06:34: a PDH is relevant because it coincides with an important maximum and has absorbed liquidity.
- ~08:15–10:29: even a named PDH/PDL is ignored if the meaningful manipulation level is the end/extreme of the wider range.

Therefore the operational priority cannot be:

```text
highest_timeframe_label wins automatically
```

It must be closer to:

```text
candidate liquidity level
-> assess timeframe priority
-> assess whether level coincides with a meaningful structural/range extreme
-> assess whether it is still unswept/relevant
-> require valid session timing
-> only then treat it as actionable liquidity
```

## Structural relevance / range endpoint

Benjamin's repeated visual criterion is the **end of the structure/range**. A named prior-day/week level located before the true extreme may not represent the manipulation he wants.

This creates a second dimension of liquidity priority:

1. **timeframe rank**;
2. **structural/range relevance**.

A lower nominal label at the actual range extreme may matter more operationally than blindly using a higher-period marker located in the middle of the structure.

## Valid session remains mandatory

Around ~06:02–06:34 Benjamin explicitly says that even if PDH/PDL or another strong liquidity zone is taken, he does not care about it for an entry if it occurs outside his valid trading hours.

Thus:

```text
high_priority_liquidity + wrong_time != valid_trade
```

Liquidity priority is a confluence filter, not an autonomous trigger.

## No-trade implication

Instructor-explicit novice rule:

```text
if no relevant liquidity is identifiable on 1H or above
-> do not force a 15m level
-> session can be NO TRADE
```

This is important for preventing overfitting and overtrading in the automated model.

## Unresolved

1. “Relevant structural/range extreme” is visually clear in examples but not yet fully algorithmic; swing/range endpoint detection needs calibration.
2. No numeric rule is provided for when a named prior-day/week level is close enough to the true structural extreme to count as the same liquidity pool.
3. The hierarchy is qualitative. No probability weights are supplied for Weekly vs Daily vs 4H vs 1H.
4. 15m liquidity is permitted for experienced use, but exact conditions for promoting a 15m point over a nearby 1H candidate remain unresolved.

These questions must be tested against the weekly trade corpus before a final scoring/ranking rule is frozen.