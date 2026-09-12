# 05 Orderblocks — 02 Ejemplos de Orderblocks

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript (~4.28 min).
- Continuous visual timeline sampled every 5 s: 51 source frames.
- Additional visual-event evidence: 1 adaptive-scene frame and 28 chart-state-change frames.
- Contact sheets covering all three worked examples.
- The chart annotations and the instructor's marked orderblock/rejection/breaker areas were cross-checked against the narration.

This lesson mainly validates and sharpens the rules from video 1. It does not introduce a new entry model.

## Example 1 — classic orderblock

Approx. 0–78 s.

Benjamin shows a classic bearish orderblock / point of interest after a strong displacement.

The important sequence is:

```text
orderblock / unmitigated POI exists
-> price initially moves without touching it
-> price forms a maximum / pending liquidity before the return
-> price later takes/reaches that liquidity
-> price enters the orderblock
-> bearish reaction follows
```

The strongest teaching point is the counterfactual he gives: if price had returned directly to the orderblock **before creating the inducement/liquidity**, he says the area would have had less relevance/probability for him.

Therefore the example visually confirms that his desired setup is not simply:

```text
price touches orderblock -> trade
```

but rather:

```text
relevant liquidity exists before the orderblock retest
-> liquidity is available/taken
-> orderblock becomes the higher-probability POI
-> lower-timeframe confirmation is still required
```

## Example 2 — rejection block

Approx. 78–178 s.

The rejection block again demonstrates the defining geometry from video 1:

- the rejection wick liquidates/takes the previous wick/extreme;
- the rejection area remains untouched before the intended return;
- a pending maximum/liquidity exists before the later retest;
- price takes the intermediate liquidity and then reaches the rejection block;
- price reacts away.

Benjamin again identifies the rejection block as the orderblock type that works best for him.

This second worked example reinforces that `clean/untouched` is not a cosmetic property. The rejection block is kept as a valid future POI specifically because it has not already been revisited.

## Timeframe workflow — explicit

Approx. 127–171 s.

Benjamin explicitly describes the orderblock as a higher-timeframe **point of interest**.

He names the zone/context timeframes:

- Daily;
- 4H;
- 1H;
- 30m;
- 15m.

Once price reaches that area, he drops to approximately **1–5m** and looks for a lower-timeframe reaction/entry confirmation.

This is important for the final architecture of the strategy:

```text
HTF/MTF POI selection
!=
LTF entry trigger
```

The two layers must remain separate in any backtest.

## Example 3 — breaker block with imbalance confluence

Approx. 178–256 s.

Benjamin shows price first taking lower liquidity/minima and then reacting very strongly upward. The move breaks through the last bearish point of interest. Price later retraces toward that former area.

He identifies the retested former POI as a breaker-block example.

Crucially, he also shows an **imbalance** in the same area and says this is the kind of situation in which the breaker adds interest as an extra confluence.

His own wording makes the hierarchy clear:

- he does not normally search aggressively for breaker blocks on their own;
- he would already have marked the imbalance as the main point of interest;
- seeing a breaker at the same location increases his interest/confidence.

Therefore the breaker block should not be modeled as a mandatory primary setup component.

## Cross-module integration confirmed

This lesson strengthens the following architecture:

```text
valid session
+ relevant liquidity / inducement
+ higher-timeframe POI (orderblock / rejection block / imbalance / confluence)
-> price reaches POI
-> lower-timeframe reaction/confirmation
-> possible entry
```

The module still does not specify the final exact lower-timeframe trigger; that remains for later confirmation/entry lessons.

## No-trade / lower-quality conditions confirmed

From the instructor's explicit counterexamples and comments:

- direct orderblock touch with no prior inducement/liquidity -> lower probability / not the setup he wants;
- already-touched rejection block -> no longer a valid future rejection-block POI;
- breaker block alone -> not a preferred standalone reason for him;
- merely reaching an orderblock on the higher timeframe -> not sufficient to enter without LTF reaction.

## What is confirmed after video 2

**Instructor-explicit / visual-confirmed**

- classic orderblock probability is improved materially by prior max/min inducement;
- rejection block requires prior-wick sweep and untouched state;
- rejection block is Benjamin's preferred subtype;
- context/orderblock zones are sought on Daily/4H/1H/30m/15m;
- actual entry search occurs on roughly 1–5m after price reaches the POI;
- breaker blocks can act as additional confluence;
- imbalance + breaker overlap is specifically shown as a stronger combined POI than breaker alone.

**Still unresolved**

- exact LTF reaction trigger;
- exact orderblock zone boundaries;
- numerical displacement threshold;
- objective rule for selecting one inducement when several maxima/minima exist;
- exact weighting of breaker vs imbalance confluence.

## Inventory gate

- classic example reconstructed: yes;
- inducement counterfactual indexed: yes;
- rejection-block example reconstructed: yes;
- HTF-to-LTF timeframe workflow indexed: yes;
- breaker + imbalance confluence example reconstructed: yes;
- negative/lower-quality conditions indexed: yes.

**Lesson status: COMPLETE.**
