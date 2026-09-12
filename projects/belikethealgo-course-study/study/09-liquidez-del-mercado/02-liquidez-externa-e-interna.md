# 09 Liquidez del Mercado — 02 Liquidez externa e interna

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript: ~1113.3 s / 18.6 min, 157 transcript segments.
- Full periodic frame set and detected visual changes reviewed.
- Opening schematic explicitly labeling **LIQUIDEZ EXTERNA** and **LIQUIDEZ INTERNA** visually confirmed.

## Core definitions

### Liquidez externa

Benjamin uses external liquidity for the important extremes outside/currently defining a range or impulse structure. Instructor examples include:

- the external high/low of the active range;
- Asia range extremes;
- PDH / PDL;
- important maximum/minimum that price is expected to attack as the next external objective.

### Liquidez interna

Internal liquidity is formed **inside** the active range/impulse by intermediate highs/lows created as price advances and retraces. In a bullish schematic, the rising/intermediate lows beneath price are internal liquidity; the logic is mirrored in bearish conditions.

The opening visual explicitly shows the external high at the range boundary and multiple internal levels within the range.

## Instructor preference

At ~01:55–02:28 Benjamin states that he personally prefers entries after **external liquidity** is taken because he finds it easier to capture the subsequent reversal/retracement. He nevertheless says internal-liquidity trades can work when aligned with the Daily/4H trend.

Therefore:

```text
external_liquidity_entry_preference = true
internal_liquidity_tradeable = true when context/trend supports it
```

This is a preference/probability statement, not proof that external-liquidity setups always outperform.

## Repeating market sequence taught

The lesson repeatedly presents this process:

```text
IMPULSE / RANGE EXPANSION
-> internal highs/lows accumulate inside the range
-> price reaches/takes external liquidity
-> retracement attacks internal liquidity
-> sufficient internal liquidity is collected
-> new impulse/displacement, often with imbalance
-> price attacks the next external liquidity
```

Examples around ~07:17–09:52 and ~13:37–15:28 visually and verbally repeat this cycle.

Benjamin sometimes uses absolute language such as “always”/“has to”; these statements are stored as instructor hypotheses, **not** accepted as deterministic market laws until measured on the weekly corpus.

## Entry timing implication

The internal/external distinction changes entry quality and stop risk:

- after an early valid entry, later internal liquidity may form beneath/above price;
- a late entry with a tight stop can be swept by that internal-liquidity retracement before the external target is reached;
- Benjamin explicitly warns that entering later in the move increases the amount of internal liquidity left behind that can be attacked.

Around ~15:28–16:53 he links this directly to knowing **when to enter and when to exit**.

## Exit / partial implication

A taken external high/low can precede a retracement. Benjamin therefore treats important external levels such as PDH/PDL/PWH/PWL or a major range extreme as places where:

- profit taking should be considered;
- a retracement may begin;
- a runner/stop decision should account for the newly created internal liquidity.

This is stronger than simply treating liquidity as an entry concept: liquidity maps both **entry risk and target/management risk**.

## Relationship to displacement / imbalance

Around ~13:51–14:44 Benjamin describes price taking internal lows, then creating an impulse and imbalance toward the external range. For the measurement model this makes the sequence itself a key event label:

`internal_sweep -> displacement -> imbalance -> external_target`

and the reverse sequence for bearish moves.

## Unresolved

1. “Sufficient internal liquidity” is qualitative; no minimum number of internal highs/lows or distance is specified.
2. External-vs-internal status is dynamic as a new impulse creates a new range. The exact algorithm for when a previously external level becomes internal must be inferred from more examples.
3. The course does not provide a numeric boundary for how deep a retracement must be before an internal level is considered the active target.
4. Statements that price must retrace after external liquidity are hypotheses requiring statistical validation, not deterministic backtest rules.