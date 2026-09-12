# 05 Orderblocks — 01 Tipos de Orderblocks

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript (~11.25 min).
- Continuous visual timeline sampled every 5 s: 135 source frames.
- Additional visual-event evidence: 2 FFmpeg scene frames, 2 adaptive-scene frames and 7 chart-state-change frames.
- Contact sheets covering the complete lesson.
- Conceptual diagrams and real-chart examples for the classic orderblock, rejection block and breaker block.

The lesson is sufficiently explicit to define the conceptual taxonomy, but it does **not** give objective numerical thresholds for impulse/displacement strength or exact body-vs-wick boundaries for every orderblock type. Those details remain unresolved rather than invented.

## Core definition of an orderblock

Approx. 13–85 s.

Benjamin defines an orderblock as a candle from which the following candles generate a strong directional impulse. In the examples the orderblock candle is generally the **opposite colour/direction** to the subsequent impulse:

- bearish orderblock candidate: bullish candle before a strong bearish displacement;
- bullish orderblock candidate: bearish candle before a strong bullish displacement.

He repeatedly emphasizes that the relevant object is **one candle**, not a broad supply/demand range made from several neighboring candles.

The reason he selects that candle is qualitative: it is the candle that manipulated/liquidated positions and then originated the important displacement. Neighboring candles that did not perform that role are not automatically part of the zone.

### Important unresolved geometry

Benjamin says the orderblock is one candle, but this lesson does not define with enough precision whether the actionable price interval for a classic orderblock must always be:

- full candle high-low;
- candle body only;
- open-to-extreme;
- another sub-range.

Therefore the detector may identify a **candidate candle**, but exact classic-orderblock zone boundaries are not yet frozen.

## Inducement / liquidity before retest — major rule

Approx. 85–171 s and reinforced throughout the lesson.

Benjamin uses `inducement` / `trampa` to describe a maximum or minimum that represents liquidity before price reaches the orderblock.

His operating logic is:

```text
orderblock forms
-> price moves away strongly
-> before the later retest, a relevant max/min remains or forms
-> price takes that liquidity
-> price reaches the orderblock
-> lower-timeframe reaction may then be searched
```

He explicitly says that an orderblock without such prior liquidity has **less probability** for him. His preferred orderblocks are induced: there is a maximum/minimum to be liquidated before the orderblock is reached.

This is one of the strongest rules in the module and is later upgraded in video 3 from a probability preference to a practical validity filter in his own trading.

## Classic orderblock

Approx. 172–331 s.

The first type is the ordinary/classic orderblock.

Confirmed properties:

- one relevant candle rather than a multi-candle supply/demand area;
- the candle precedes a strong impulse in the opposite direction;
- Benjamin wants prior liquidity / inducement before the retest;
- the orderblock is a **point/zone of interest**, not the final entry trigger;
- once price reaches the area, he looks for a reaction/entry pattern on a lower timeframe.

The diagrams and examples show both bearish and bullish logic.

### Timeframes for the orderblock zone

Benjamin explicitly names:

- Daily;
- 4H;
- 1H;
- 30m;
- 15m as his minimum for this type of higher-timeframe point of interest.

He then drops to a smaller timeframe for the actual trade reaction. In this lesson he describes approximately 5m; the following lesson makes the LTF range explicit as roughly 1–5m.

## Rejection block — Benjamin's preferred type

Approx. 331–526 s.

Benjamin says this is the orderblock type that works best for him.

He defines the rejection block primarily through a **wick**:

1. the wick takes/liquidates the previous wick / previous candle extreme;
2. price then displaces strongly away;
3. the rejection-block wick must remain untouched/unmitigated until the intended retest.

The visual slide explicitly shows the wick sweeping the prior wick and labels the rejection-block wick as still unmitigated.

### Clean-state rule

This is explicit and strong for rejection blocks:

```text
state = CLEAN after creation

if price later touches the rejection-block wick/zone:
    state = TOUCHED / INVALID FOR FUTURE USE
```

Benjamin says that once the area has been touched, he removes it as a future point of interest.

The lesson shows both:

- positive examples: prior-wick sweep + untouched zone + later first retest -> reaction;
- negative example: the zone was already touched -> Benjamin says it no longer has relevance for him.

### Why the prior-wick sweep matters

Benjamin's explanation is that the wick represents liquidation/manipulation of traders on the lower timeframe before the strong move away. This is conceptual/instructor-explicit, not yet an objective lower-timeframe transaction detector.

### Additional inducement

Several rejection-block examples also leave a pending maximum/minimum before the return, so the later retest is preceded by another liquidity take. This is consistent with his broader inducement rule.

However, when he summarizes the rejection block itself, the two defining characteristics he stresses are:

- it liquidates the previous wick;
- it has not been touched afterward.

We therefore keep later inducement as a separate confluence/eligibility field instead of silently redefining the rejection block geometry.

## Breaker block — least used by Benjamin

Approx. 540–674 s.

Benjamin says this is the orderblock type he uses least.

The demonstrated idea is a role-reversal / broken prior point of interest:

- a prior orderblock / last point of interest existed;
- price moves through/breaks the structural side associated with it with strong displacement;
- price later returns to test that former area from the other side;
- the former area can act as a breaker block.

The conceptual slide explicitly shows price breaking the previous orderblock and later returning to test it.

Benjamin links this situation particularly to strong impulsive moves.

### Critical nuance

In one explanation he says that the prior orderblock involved would not have been a valid orderblock **for his normal rule** because it had no inducement. This means we must not treat breaker logic as proof that every broken candle automatically becomes a high-quality orderblock.

The breaker block is better represented as a separate structural/confluence pattern.

## Session requirement

Near the end of the lesson Benjamin states that the setup should occur in his valid London/New York trading hours and that he still waits for lower-timeframe reaction.

Therefore an orderblock retest outside the valid session is not enough by itself.

The exact session windows were already defined in module 2 and should be reused rather than duplicated with a new interpretation here.

## Operational representation after video 1

### Classic candidate

```text
candidate_candle_direction != subsequent_impulse_direction
AND strong directional move originates from/after candidate
```

But `strong directional move` remains qualitative until calibrated from instructor-labeled examples.

Eligibility/ranking fields:

```text
has_prior_inducement_before_retest
is_in_valid_session_at_retest
ltf_reaction_present
```

Exact zone boundaries remain unresolved.

### Rejection-block candidate

For a bearish-style rejection block at a local high, conceptually:

```text
current_wick_high > previous_wick_high
AND strong bearish displacement follows
AND no later price touch of rejection zone before intended retest
```

Bullish logic is symmetric at lows.

The exact wick-zone lower boundary and numerical displacement threshold remain unresolved.

### Breaker-block candidate

```text
prior_point_of_interest exists
AND price decisively breaks through the relevant structural side / prior POI role
AND strong displacement occurs
AND price later retests the former area from the opposite side
```

This is a candidate pattern only; exact structural reference and break-quality thresholds must reuse the Structure module and later evidence.

## What is confirmed

**Instructor-explicit / strongly supported**

- an orderblock is centered on one relevant candle, not a broad arbitrary supply/demand range;
- classic orderblock: opposite candle before a strong impulse;
- prior max/min liquidity (`inducement` / `trampa`) materially increases relevance and is Benjamin's preferred condition;
- orderblocks are higher-timeframe points of interest rather than standalone entries;
- context/orderblock timeframes: Daily, 4H, 1H, 30m, minimum 15m;
- lower-timeframe reaction is still required for entry search;
- rejection block sweeps the previous wick/extreme;
- rejection block must be untouched before the intended first retest;
- first touch invalidates that rejection block for future use under Benjamin's rule;
- rejection block is Benjamin's preferred orderblock type in this lesson;
- breaker block is the least-used type for him and is associated with a broken prior POI / strong move / later retest;
- valid London/New York trading hours still matter.

**Unresolved / deliberately not invented**

- numerical threshold for a "large/strong" impulse;
- exact classic-orderblock price boundaries (body vs full candle vs sub-range);
- exact rejection-wick zone boundaries;
- whether first-touch invalidation applies identically to every classic/breaker orderblock or is strongest only for rejection blocks;
- exact breaker structural-reference algorithm;
- whether inducement is mandatory vs only strongly preferred for every formal subtype — video 3 clarifies Benjamin's practical trading hierarchy further;
- exact LTF reaction trigger.

## Inventory gate

- complete transcript reviewed: yes;
- full coarse visual timeline reviewed: yes;
- classic orderblock diagram/examples reviewed: yes;
- rejection-block positive and touched/invalid examples reviewed: yes;
- breaker-block diagrams/examples reviewed: yes;
- timeframe/session statements indexed: yes;
- no objective thresholds invented: yes.

**Lesson status: COMPLETE.**
