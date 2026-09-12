# 03 Estructura — 01 Estructura V1

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript (~15.4 min).
- Dense visual extraction at 2 fps over 0–663 s and 693–925 s: 1,792 source frames.
- Periodic frames and OpenCV/PySceneDetect evidence from the full module-processing artifact.
- All conceptual drawings, 4H examples and the lower-timeframe example were reviewed in chronological order.

## Terminology used by Benjamin

Benjamin distinguishes two ideas:

1. **Rompimiento de estructura**: continuation in the current trend, e.g. bullish price continues printing higher highs and higher lows.
2. **Cambio de estructura**: transition from the current directional structure to the opposite one by breaking the relevant last structural point that created the impulse.

Do not silently replace these labels with outside terminology. If later lessons introduce other names, map them only after direct evidence.

## Core structure rule — instructor explicit

In a bullish structure, Benjamin keeps a bullish bias while price continues to respect the relevant structural low and create higher highs / higher lows. He says the higher-probability focus remains buys until that structure actually changes. The bearish case is symmetric.

For a bullish-to-bearish **cambio de estructura**, the reference is described as the most recent / important low responsible for creating the bullish impulse. He repeatedly says that internal smaller lows are not automatically the change-of-structure level.

Approximate verbal evidence:
- 88–127 s: bullish structure remains valid until the relevant last low is broken.
- 143–166 s: change occurs when price breaks the last low that created the impulse.
- 201–237 s: after a failed continuation, breaking the most recent important structural low changes the bullish structure to bearish.

## Wick is NOT sufficient — instructor explicit and visual confirmed

Benjamin explicitly rejects a wick-only violation as a valid structure change.

At ~237–282 s he states that the change must occur **with body**. A large wick through the level followed by rejection can instead represent a liquidity take, not a structure change.

Operational implication already supported by this lesson:

- `wick_through(reference_level) = true` by itself is **not** enough for a structure change.
- A valid candidate requires the candle body / close to establish price beyond the reference structural level.

What is NOT yet fixed:
- minimum body penetration;
- whether *any* close beyond is sufficient or whether a material close distance is required;
- exact handling of a candle whose body straddles the level;
- any ATR threshold.

Those remain measurement questions, not invented rules.

## "Con cuerpo y con fuerza" — instructor explicit, quantitative threshold unresolved

Benjamin repeatedly describes the valid break as occurring **con cuerpo y con fuerza**.

This is qualitatively clear but not yet numerically defined. Therefore the quantitative model must measure, rather than assume:

- `close_penetration_atr`;
- candle `body_range_ratio = abs(close-open)/(high-low)`;
- break-candle range relative to local ATR;
- directional range expansion;
- pre-break and post-break directional efficiency;
- follow-through after the break;
- overlap with prior candles;
- whether an imbalance is created.

No threshold is accepted from Estructura V1 alone.

## Real 4H example A — wick liquidity take vs true structure change

Approx. 293–455 s. EUR/USD 4H is visually shown.

Sequence reconstructed from dense frames:

1. Price is bullish.
2. Benjamin identifies the structural low that created the following bullish impulse.
3. Price later trades below a nearby low with a wick.
4. Because the move is wick/rejection rather than a body close with strength, Benjamin labels it as liquidity collection and keeps the structure bullish.
5. Price subsequently rallies and takes highs, visually confirming the continuation interpretation.
6. Benjamin then points to a later structural low whose loss would make price bearish. He explicitly notes that one can choose a more aggressive or a more conservative structural reference; he personally prefers the more conservative low in this example.
7. Later price breaks the relevant low with body and force; Benjamin then treats the structure as bearish.

This example is direct negative evidence against the rule `low pierced => bearish structure`.

## Aggressive vs conservative reference swing — important ambiguity

Around ~395–407 s Benjamin says the bearish change could be placed at either of two nearby lows and explicitly calls one choice more conservative.

A similar ambiguity appears in the lower-timeframe example around ~804–827 s, where he points to an aggressive vs conservative high for the bullish change-of-structure trigger.

Therefore the course itself does **not** support a single naive rule such as "always use the nearest swing".

For future measurement we must preserve at least two candidate selectors:

- `reference_aggressive`: nearer qualifying swing;
- `reference_conservative`: more structurally significant swing / previous impulse origin.

The course examples must decide when each selector is used and whether Benjamin's final strategy standardizes one of them later.

## Real 4H example B — internal movement does not invalidate external structure

Approx. 476–663 s.

Sequence:

1. Price is in a bullish 4H structure.
2. Benjamin marks the structural low created after the major bullish impulse as the relevant change-of-structure point.
3. Inside that larger range, price repeatedly sweeps smaller lows / collects liquidity.
4. He explicitly says these are **internal** to the structure and are not the structural low that would change the trend.
5. Until the larger structural low is broken, he continues to assign higher probability to bullish continuation.
6. He describes the internal accumulation/liquidity behavior as occurring *inside* the valid bullish structure rather than as proof of a bearish reversal.

This creates an important hierarchy:

`internal swing/liquidity event != automatically structural reversal point`

The exact internal/external liquidity detector is deferred to the liquidity module.

## Higher-timeframe structure

Instructor explicit at ~663–684 s and ~870–924 s:

Higher-timeframe structure is used for location / directional context.

Benjamin names:
- Weekly
- Daily
- 4H
- 1H

The goal is to know the larger directional structure before searching for entries.

## Lower-timeframe structure for entries

Instructor explicit at ~693–925 s:

Benjamin searches entries on 1–5 minute timeframes:
- 1m
- 2m
- 3m
- 4m
- 5m

He recommends 3–5m for newer students and says he personally uses 1m with more experience.

Dense visual evidence confirms an EUR/USD **1-minute** chart in the demonstrated lower-timeframe example (17 Nov 2023 visible on the chart).

Sequence shown:

1. Wait for a relevant liquidity low to be taken.
2. Move to lower timeframe.
3. Identify the opposite structural high that must be broken for the local structure to turn bullish.
4. Benjamin again shows aggressive vs conservative candidate highs.
5. Only after the lower-timeframe structure changes does he say he would begin to plan a trade.

Important: this lesson does **not** yet provide a complete entry model, stop, target, imbalance rule or order type. Structure change is a component / confirmation, not a complete strategy by itself.

## First operational representation supported by V1

For a bullish HTF state, a provisional state machine can be written without inventing thresholds:

```text
state = BULLISH
reference_low = structurally_relevant_impulse_low(...)

if wick_below(reference_low) and no_confirmed_body_break:
    state stays BULLISH
    event = liquidity_take_candidate

if confirmed_body_break_below(reference_low) and qualitative_force_condition:
    state = BEARISH_CANDIDATE
```

The symmetric rule applies for bearish-to-bullish structure.

`structurally_relevant_impulse_low(...)`, `confirmed_body_break` and `qualitative_force_condition` are deliberately unresolved functions to be calibrated from later examples.

## Mathematical measurements to collect from every later labeled structure event

Using `docs/measurement_model.md`, every Benjamin-labeled valid and invalid break should record:

- timeframe;
- direction before and after;
- candidate aggressive reference;
- candidate conservative reference;
- reference formation time and `known_time`;
- wick penetration;
- close penetration;
- `penetration_atr`;
- `close_penetration_atr`;
- break-candle body/range ratio;
- close position within the candle;
- break-candle range / ATR;
- pre-break displacement metrics;
- post-break displacement metrics;
- imbalance creation;
- follow-through in k bars;
- pullback depth after break;
- whether Benjamin calls it liquidity collection instead;
- internal vs external structural context.

## What is confirmed after V1

**Instructor-explicit / strong:**
- Higher highs + higher lows define the bullish structure example; opposite for bearish.
- Bias should generally follow structure until structure changes.
- The relevant structural point is tied to the swing responsible for the impulse, not every internal swing.
- Wick-only violation is not a valid change of structure.
- Benjamin requires body and qualitatively "force" for the change.
- Internal liquidity can be taken without changing the larger structure.
- HTF structure: weekly/daily/4H/1H for context.
- LTF: 1–5m for entry search; beginners 3–5m, Benjamin personally often 1m.
- A lower-timeframe structure change is used as part of the entry-confirmation process after liquidity is taken.

**Still unresolved:**
- exact algorithm for selecting the aggressive vs conservative structural point;
- minimum body-close distance;
- numerical definition of "force";
- whether imbalance is mandatory for every valid structure change;
- exact relationship between liquidity sweep and structure change in the final entry model;
- how HTF disagreements are resolved across weekly/daily/4H/1H;
- whether beginners' 3–5m guidance affects the canonical algorithm or only pedagogy.

## Inventory gate

- Full video reviewed: yes.
- All conceptual chart segments located: yes.
- Real 4H examples reviewed densely: yes.
- Lower-timeframe example reviewed densely: yes.
- Valid vs invalid structure-break examples indexed: yes.
- Explicit explanation linked to examples: yes.
- Measurable variables recorded / unresolved variables named: yes.
- No skipped unexplained chart sequence relevant to structure remains: yes.

**Lesson status: COMPLETE.**
