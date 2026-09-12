# 05 Orderblocks — 03 Las Orderblocks funcionan

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript (~5.81 min).
- Continuous visual timeline sampled every 5 s: 70 source frames.
- Additional visual-event evidence: 1 adaptive-scene frame and 9 chart-state-change frames.
- Full conceptual drawing sequence comparing orderblock vs liquidity logic.
- Instructor's explicit hierarchy statements were cross-checked against the visual diagrams.

This is the most strategically important video in the module because Benjamin explicitly downgrades orderblocks from a central setup requirement to a **secondary confluence**.

## Benjamin's hierarchy — explicit

Approx. 0–68 s and repeated through the lesson.

Benjamin says that orderblocks have been oversold as if they were the most important element. His own view is that the key elements are:

1. **maxima/minima = liquidity**;
2. **valid trading time/session**;
3. lower-timeframe reaction/confirmation;
4. orderblock only as an additional confluence if present.

He even says he practically no longer needs to use orderblocks except when one is obvious.

This statement changes how the strategy must be formalized. We must not build a backtest where every trade requires an orderblock merely because module 5 teaches them.

## Why an orderblock without prior liquidity is weak/invalid for him

Approx. 68–117 s.

Benjamin's logic is explicit:

- an orderblock itself is also located around a maximum/minimum;
- if there is no other liquidity before price reaches it, the stops/liquidity around the orderblock can become the liquidity that price seeks;
- therefore price may trade through the orderblock instead of reacting from it;
- for an orderblock to have higher probability / practical validity in his method, he wants liquidity available before the orderblock is touched.

The diagrams visually show a marked orderblock above price and intermediate swing highs/minima being used as the preferred liquidity source before the zone.

This is the clearest module-level rule:

```text
orderblock present
AND no relevant prior liquidity/inducement
=> do not rely on the orderblock as a valid standalone POI
```

## Session requirement remains mandatory

Approx. 121–146 s.

Benjamin says the relevant liquidity/POI interaction must occur inside his London or New York valid trading hours. He explicitly rejects the idea that simply touching the marked orderblock outside the proper time is enough.

The exact windows must reuse the session definitions already extracted from module 2 rather than inventing new hours here.

## Valid trade can exist with NO orderblock

Approx. 146–283 s.

This is instructor-explicit and important.

Benjamin gives the conceptual case:

```text
price takes relevant minima/maxima
+ the event occurs in the valid session
+ lower-timeframe reaction appears
+ no orderblock exists at the location
```

He says the trade can still be valid and can be entered under his method.

Therefore:

```text
orderblock_required_for_trade = false
```

Orderblock is not a universal boolean gate for the final strategy.

## Reverse case: orderblock but NO liquidity

Approx. 283–327 s.

Benjamin then gives the opposite case:

```text
valid session
+ orderblock exists
+ no relevant max/min liquidity available before it
```

He says he does not want that setup because the orderblock itself can be the liquidity that gets taken.

His summary is essentially:

```text
liquidity can be valid without an orderblock
orderblock is not valid/reliable for him without liquidity
```

This asymmetry is central and must be preserved in code.

## Formal strategy implication

After module 5, the relationship between liquidity and orderblocks should be represented as:

```text
liquidity_event = primary market condition
session_eligible = primary timing condition
ltf_reaction = execution condition
orderblock = optional confluence / POI enhancer
```

not:

```text
orderblock = mandatory setup root
```

A future trade decision tree should therefore be able to produce a valid setup when:

```text
liquidity_event == true
AND session_eligible == true
AND ltf_confirmation == true
AND orderblock_present == false
```

provided later modules confirm the exact lower-timeframe confirmation logic.

Conversely an orderblock should **not** rescue a setup where the required liquidity logic is missing.

## Probability vs hard-rule nuance

In earlier module-5 wording Benjamin sometimes says an orderblock without inducement has "less probability". In this final video he is stronger and says that for his own practical approach an orderblock needs prior liquidity and that he can trade without orderblocks altogether.

For formalization we keep both facts:

- descriptive taxonomy: an orderblock pattern can visually exist even without inducement;
- Benjamin-style actionable POI filter: do not treat it as a high-quality/eligible orderblock setup without prior liquidity.

This avoids confusing geometric detection with trade eligibility.

## What is confirmed after video 3

**Instructor-explicit / strongly supported**

- liquidity at maxima/minima is more important than orderblocks;
- valid London/New York timing is more important than simply having an orderblock;
- orderblocks are an optional confluence rather than a universal requirement;
- Benjamin says he can trade a liquidity + timing + LTF-reaction setup even with no orderblock;
- an orderblock without prior liquidity/inducement is not a setup he wants to rely on;
- if an obvious orderblock coincides with the liquidity setup, it increases confluence/probability;
- lower-timeframe reaction remains necessary for execution.

**Still unresolved**

- exact algorithm that decides which max/min is the relevant inducement when many exist;
- exact minimum distance between inducement and orderblock;
- exact sweep geometry for inducement (wick vs close/tolerance), to be solved in the Liquidity module;
- exact LTF confirmation trigger;
- numerical probability contribution of an orderblock;
- objective weighting between classic orderblock, rejection block, breaker and imbalance.

## Module-level no-trade / lower-quality rules

After all three videos, the following filters are supported:

```text
IF orderblock_retest AND no_prior_relevant_liquidity:
    reject orderblock-as-primary-POI / classify lower quality

IF rejection_block_already_touched:
    reject that rejection block for future first-touch use

IF POI_interaction_outside_valid_session:
    do not enter merely because of the POI touch

IF breaker_block_only AND no stronger contextual confluence:
    do not treat it as Benjamin's preferred standalone setup
```

## Inventory gate

- complete transcript reviewed: yes;
- conceptual hierarchy drawings reviewed: yes;
- valid-without-orderblock case indexed: yes;
- invalid/weak-orderblock-without-liquidity case indexed: yes;
- session requirement indexed: yes;
- orderblock-as-confluence conclusion formalized: yes;
- no-trade implications written without invented thresholds: yes.

**Lesson status: COMPLETE.**

## Module 5 conclusion

Module 5 is complete. The most important result is not a new mandatory pattern; it is a hierarchy correction:

```text
LIQUIDITY + VALID TIME + LTF REACTION
> ORDERBLOCK
```

Orderblocks remain useful as location/confluence tools, especially clean rejection blocks, but the course evidence does not support forcing them into every trade.
