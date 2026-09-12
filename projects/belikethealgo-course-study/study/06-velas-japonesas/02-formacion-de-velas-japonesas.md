# 06 Velas Japonesas — 02 Formación de velas japonesas

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript: ~15.3 min, 145 segments.
- 184 periodic frames.
- 186 chart-state-change frames plus adaptive-scene evidence.
- Positive and negative real-chart examples visually reviewed.

## Main refinement: the 1–3 candle pattern

This lesson makes the preferred candle sequence more explicit. Benjamin repeatedly refers to a **“patrón 1-3”** and contrasts it with weaker formations.

For the examples shown, the useful sequence is:

```text
candle 1 = pre-reaction / reference candle
candle 2 = liquidity-taking / turning candle
candle 3 = confirmation / directional continuation candle
```

The key is not the labels themselves but the information encoded by the sequence: price takes the relevant liquidity and then reacts decisively away from it.

## Close relationship — important visual/verbal rule

In the bearish example around ~356–406 s Benjamin rejects a weaker sequence because the relevant later candle has **not closed below the prior/reference candle**, while the preferred example does. He says the third candle closes below the earlier candle and explicitly calls that the clean 1–3 pattern.

Bullish logic is mirrored: after taking a low, the confirming candle should close strongly back above the corresponding reference area.

This is stronger evidence than the looser “wick + impulse” description from lesson 1 and should be stored as a candidate measurable confirmation rule.

However, the exact reference boundary (body/open/close/extreme) must be derived from the source OHLC/examples before hard-coding because the video language is visual rather than a numerical formula.

## Liquidity is still the reason the pattern matters

Around ~616–644 s Benjamin explains why he likes the pattern: the move goes to collect the liquidity of the minimum and then reacts strongly. Therefore the pattern is not a generic candlestick formation to scan everywhere.

```text
valid location/liquidity event
-> 1–3 reaction pattern
-> stronger evidence of intended direction
```

A visually similar formation without the proper liquidity/context is lower-quality evidence.

## Negative examples are explicit

Benjamin shows formations he calls poor / not clean and compares them directly with the 1–3 pattern. The rejected examples lack the same clean liquidity-take + close/impulse sequence.

This is important for the later classifier: positive and negative candle formations must both be retained; a detector that labels every rejection wick as valid will overtrade.

## Interaction with rejection blocks and inducement

A later example combines:

- higher-timeframe rejection block;
- lower-timeframe preferred candle formation;
- an inducement / intermediate liquidity feature;
- subsequent reaction.

Benjamin explicitly says the structure change visible afterward can be used as **additional confluence**, but in that example it is not necessary once the preferred formation is present.

Therefore current evidence supports:

```text
preferred candle formation = possible LTF confirmation
structure change = optional extra confirmation in at least some examples
```

not a universal `structure_change_required = true` rule.

## Do not blindly enter the first imbalance

Around ~814–854 s Benjamin explicitly warns that the first imbalance seen after reaching a zone may be poor if the candle formation itself is poor. He prefers waiting for the higher-quality reaction sequence when available.

This refines the earlier imbalance module:

```text
first clean imbalance after POI touch
!= automatically best entry
```

Candle-formation quality can rank or veto an otherwise geometrically valid LTF imbalance.

## Limit vs confirmation entry

For a cleaner but more conservative execution Benjamin says one may avoid a blind limit and enter on the **first confirmation candle** after the setup. In one demonstrated example he mentions a ~2.6-pip confirmation entry and notes that the 1:3 target remains available.

Thus at least two execution modes remain supported:

- limit at a selected zone/imbalance;
- confirmation-candle market/close-based entry.

The strategy must preserve these as separate variants until later lessons/trade reviews show which is canonical or context-dependent.

## Trade management refinement

In the worked bearish example Benjamin discusses reducing risk after a strong favorable impulse and then moving to break-even after a very large impulse. His logic is qualitative: if price fully retraces a large move that should have confirmed the thesis, he no longer wants exposure.

He also describes moving the stop nearer the rejection wick before full break-even in some circumstances.

This is **not yet a universal mechanical BE trigger**. Store the event and later infer whether weekly examples reveal a repeatable threshold.

## Targets

He again references roughly **1:3** or the next definitive minimum/liquidity objective. This reinforces that target choice can be either R-multiple driven or liquidity driven, but does not yet prove one universal priority rule.

## Candidate machine representation

For three closed candles `(c1,c2,c3)` around a candidate liquidity event, store:

```text
direction
liquidity_swept_by_c2
c2_rejection_wick_ratio
c2_body_ratio
c3_directional_body_ratio
c3_range_atr
c3_close_vs_c1_body
c3_close_vs_c1_extreme
c3_close_vs_c2_body
c3_close_vs_c2_extreme
imbalance_created_by_sequence
follow_through_1_3_5_bars_atr
retracement_after_confirmation
structure_change_after_pattern
inducement_present
entry_mode
```

Do **not** yet define one binary `pattern_1_3` threshold from guessed wick percentages. The weekly trade corpus should calibrate the exact boundary.

## Strongest consolidated rule after module 6

```text
VALID LOCATION / LIQUIDITY
-> CLOSED rejection information
-> CLEAN directional candle sequence (preferred 1–3 form)
-> force / displacement, often with imbalance
-> entry candidate
```

The candle sequence is now a major LTF confirmation/ranking feature, but it still does not override session, liquidity, news or higher-timeframe context.

## Confirmed vs unresolved

### Confirmed
- Benjamin explicitly distinguishes clean 1–3 formations from poor formations;
- liquidity collection is the reason the formation has meaning;
- strong close/continuation away from the swept extreme is part of the preferred pattern;
- candle formation can make one LTF imbalance preferable to another and can justify not entering the first imbalance;
- structure change can be optional additional confirmation in at least one demonstrated setup;
- limit and confirmation-candle executions are both allowed;
- large favorable impulse can motivate stop reduction / break-even, but management remains discretionary at this stage.

### Unresolved
- exact OHLC inequality defining the 1–3 close relation;
- numerical wick/body thresholds;
- minimum displacement magnitude;
- when structure change becomes mandatory vs optional;
- exact objective BE threshold;
- whether R-multiple or liquidity target has universal priority.

**Lesson status: COMPLETE.**