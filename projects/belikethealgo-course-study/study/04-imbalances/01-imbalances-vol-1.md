# 04 Imbalances — 01 Imbalances Vol 1

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript (~12.22 min).
- Dense full-video extraction at ~2 fps: 1,528 timestamped source frames over 0–733 s.
- Periodic, state-change and dense visual evidence.
- Conceptual three-candle diagrams, multiple 1H examples, 4H clean/mitigated examples, and the 15m -> 1m entry-use example were reviewed.

## Exact conceptual definition — instructor explicit and visual confirmed

Benjamin defines an imbalance / inefficient price using **three consecutive candles**:

- candle 1;
- candle 2;
- candle 3.

An efficient price is shown when the wick/range of candle 1 and the wick/range of candle 3 touch or overlap.

An inefficient price / imbalance is shown when the wick/range of candle 1 and the wick/range of candle 3 **do not touch**, leaving a price gap between them. The middle candle is the impulsive candle in the illustrated construction.

He demonstrates the geometry in both bullish and bearish directions.

### Mathematical representation — OUR FORMALIZATION of Benjamin's geometry

For consecutive candles `c1, c2, c3`:

**Bullish imbalance candidate**

```text
if high(c1) < low(c3):
    zone_low  = high(c1)
    zone_high = low(c3)
    gap_size  = low(c3) - high(c1)
```

**Bearish imbalance candidate**

```text
if low(c1) > high(c3):
    zone_low  = high(c3)
    zone_high = low(c1)
    gap_size  = low(c1) - high(c3)
```

If the candle-1 and candle-3 ranges touch/overlap, `gap_size <= 0`, so there is no imbalance under the definition shown in this lesson.

Important: Benjamin gives **no minimum pip, ATR or percentage gap-size threshold** in Vol. 1. We therefore do not invent one.

## Relation to impulse

Benjamin repeatedly illustrates imbalances as the consequence of a strong/large impulse: price moves sufficiently fast that candle 1 and candle 3 do not overlap.

However, this lesson defines the imbalance geometrically by the three-candle gap. It does not provide a separate numerical impulse threshold that must be passed before the gap counts.

For later research we should record both:

- the binary geometric imbalance condition;
- the strength/displacement metrics of the move that created it.

This lets us test whether larger / cleaner displacement changes subsequent reaction quality without changing Benjamin's base definition.

## Two distinct uses

Benjamin explicitly teaches two uses for imbalances:

1. **Higher-timeframe zone of interest** — mark an untouched imbalance on a context timeframe and wait for price to reach it.
2. **Lower-timeframe entry tool** — once price reacts inside a higher-timeframe area, use new lower-timeframe imbalances as part of locating/entering the trade.

These must not be collapsed into one timeframe-independent rule.

## Higher-timeframe hierarchy for zones

Benjamin names the following context/zone timeframes:

- Weekly
- Daily
- 4H
- 1H
- 15m as his minimum when necessary

For newer students he recommends using Daily / 4H / 1H for zones and not going below 1H.

He explicitly gives higher-timeframe imbalances more importance than lower-timeframe ones, e.g. Daily > 4H > 1H, and describes descending through timeframes when no suitable higher-timeframe imbalance is available.

This is a **hierarchy / priority rule**, not evidence that every lower-timeframe imbalance is invalid.

## 1H examples — visual confirmed

Approx. 266–344 s.

Benjamin shows several real EUR/USD 1H examples with the same sequence:

```text
strong directional impulse
-> three-candle imbalance remains
-> price later returns to/test the imbalance
-> price reacts/continues in the illustrated direction
```

In one example he describes mitigation as occurring by only a very small amount before price departs strongly. This matters because the required interaction is a touch/entry into the zone, not a requirement that the full gap be filled.

The examples demonstrate usefulness; they are not accepted as statistical proof of win rate.

## Confluence with highs/lows / liquidity

Approx. 345–411 s.

Benjamin says an imbalance has **higher probability** when combined with a relevant maximum/minimum/liquidity event, but explicitly clarifies that the imbalance can still be useful without such a maximum/minimum.

The 4H example visually shows:

- a clean untouched imbalance;
- a pending high above/near the route toward the imbalance;
- price takes/liquidates that high and then touches the imbalance.

Therefore:

```text
liquidity_confluence = probability enhancer
```

not:

```text
no liquidity confluence => imbalance invalid
```

The exact liquidity detector remains delegated to the later liquidity module.

## Clean / mitigated imbalance — strong binary rule

Approx. 411–499 s. This is one of the strongest rules in the lesson.

Benjamin explicitly says that for an imbalance to retain relevance for him it must be **clean**, meaning price has not touched it after formation.

If any later candle has already touched the imbalance, he describes it as **mitigated**, says it no longer makes sense for his purpose, and says he would delete it.

He demonstrates:

- first touch of a clean imbalance -> reaction;
- later second return to the already-touched area -> no longer treated as relevant;
- another untouched clean imbalance -> relevant first interaction.

### State-machine representation

```text
state = CLEAN at formation

if any subsequent candle touches/intersects the zone:
    state = MITIGATED

if state == MITIGATED:
    exclude the zone from the pool of Benjamin-style clean imbalance zones
```

### Touch geometry — OUR FORMALIZATION

For a zone `[zone_low, zone_high]`, a later candle touches/intersects it when its price interval overlaps the zone:

```text
touched = high(k) >= zone_low and low(k) <= zone_high
```

For a bullish imbalance being revisited from above, the first contact usually occurs when `low(k) <= zone_high`.
For a bearish imbalance being revisited from below, first contact usually occurs when `high(k) >= zone_low`.

Because Benjamin uses the language of a touch and visually counts wick interaction, no close-inside requirement is imposed.

Unresolved edge case: exact equality at the boundary should be treated conservatively as a touch unless later course evidence says otherwise.

## Full fill is NOT required for mitigation

Vol. 1 does not require the whole zone to be filled before it becomes mitigated. Benjamin's language and examples treat **first touch** as enough to consume the clean status.

Therefore we should keep two different measurements:

- `first_touch` / clean-state invalidation;
- `fill_fraction` — how deeply price penetrates the zone (OUR METRIC, potentially useful later).

Do not redefine Benjamin's clean/mitigated rule using a 50% or 100% fill convention unless a later lesson explicitly introduces one.

## 15m -> 1m entry-use example

Approx. 533–733 s, visually reconstructed.

### Higher-timeframe / zone step

On EUR/USD 15m Benjamin shows:

1. price manipulates/takes prior highs;
2. price falls strongly;
3. that bearish displacement leaves a clean 15m imbalance;
4. he marks that imbalance as the zone of interest because it has not yet been retested.

The chart shows the 15m zone clearly and the timeframe is visually confirmed.

### Lower-timeframe step

He then changes to EUR/USD 1m and waits for price to enter the marked 15m imbalance.

Inside the HTF zone, the 1m sequence demonstrates:

- new lower-timeframe inefficiencies/imbalances are created;
- price tests/mitigates some of them;
- local structure changes;
- another still-clean lower-timeframe imbalance remains available;
- Benjamin says one can place a limit order at that clean imbalance **or** wait for a candle confirmation;
- the target shown/discussed is the next low / liquidity area.

The lower-timeframe chart around 09:18 on 29 Nov 2023 is visually confirmed in dense evidence.

Important: this is an educational example of how imbalances participate in the workflow, not yet a fully specified canonical entry algorithm. Order type, stop placement, confirmation candle rules and universal target selection are intentionally deferred.

## Relationship to Structure module

The example materially links the two modules:

```text
HTF clean imbalance / area
-> price enters area
-> LTF reaction/displacement creates imbalances
-> LTF structure change
-> use remaining clean LTF imbalance as possible entry location
-> target liquidity
```

This is strong evidence that an imbalance is not an isolated magic level. It appears inside a multi-factor sequence.

## Mathematical fields to add for every imbalance

For each candidate three-candle imbalance we should store:

```text
direction
timeframe
c1_time, c2_time, c3_time
known_time = close/availability of candle 3
zone_low
zone_high
gap_size
gap_size_atr = gap_size / ATR_ref          # OUR METRIC
middle_candle_range_atr                    # OUR METRIC
middle_candle_body_ratio                   # OUR METRIC
creation_displacement_efficiency            # OUR METRIC
clean_state ∈ {clean, mitigated}
first_touch_time
bars_until_first_touch
fill_fraction_on_first_touch               # OUR METRIC
max_penetration_before_reaction             # OUR METRIC
reaction_distance_atr                       # OUR METRIC
liquidity_confluence
structure_context
HTF/LTF_role ∈ {zone, entry}
```

`known_time` must not precede candle 3 becoming available; otherwise the backtest would look ahead.

## Candidate detector with no invented thresholds

```text
for each closed candle triplet (c1,c2,c3):
    if high(c1) < low(c3):
        create bullish imbalance [high(c1), low(c3)]
    elif low(c1) > high(c3):
        create bearish imbalance [high(c3), low(c1)]

for each created zone:
    keep eligible only while no later candle has touched/intersected it
```

This captures the rule actually taught in Vol. 1. Ranking by timeframe, liquidity confluence, displacement quality and other variables comes after detection.

## What is confirmed after Vol. 1

**Instructor-explicit / strongly supported**
- imbalance uses three candles;
- candle-1 and candle-3 wicks/ranges must not touch;
- bullish and bearish versions exist;
- efficient overlap is not the condition Benjamin wants;
- imbalances are used both as HTF zones and LTF entry tools;
- higher timeframes have greater contextual importance;
- clean/untouched status is mandatory for the type of imbalance Benjamin wants to use;
- first touch mitigates/removes that clean status;
- full-zone fill is not required before Benjamin calls the area touched/mitigated;
- max/min/liquidity confluence increases probability but is not universally mandatory;
- entry workflow can combine HTF imbalance, LTF reaction, LTF structure change and a clean LTF imbalance;
- limit at imbalance vs candle confirmation are both mentioned entry approaches, not yet finalized universally.

**Still unresolved**
- whether later lessons introduce minimum gap size;
- whether candle 2 must satisfy a quantitative displacement criterion beyond the geometric gap;
- exact boundary/equality convention for a touch;
- exact ranking formula for Daily vs 4H vs 1H vs 15m;
- degree of penetration/fill that predicts better reaction;
- exact lower-timeframe entry imbalance selection when several coexist;
- stop placement;
- confirmation-candle definition;
- final target hierarchy;
- invalidation rules beyond prior touch/mitigation.

## Inventory gate

- Full video reviewed: yes.
- Dense full-video visual evidence reviewed: yes.
- Conceptual bullish/bearish/efficient diagrams reviewed: yes.
- 1H examples inventoried: yes.
- 4H liquidity-confluence example reviewed: yes.
- clean vs previously mitigated negative example reviewed: yes.
- 15m HTF zone -> 1m entry-use example reconstructed: yes.
- mathematical representation written without threshold invention: yes.
- ambiguities isolated for later validation: yes.

**Lesson status: COMPLETE.**
