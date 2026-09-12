# 11 Confirmaciones de Entrada a un Trade — 01 Confirmaciones de entrada

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript: ~1429.1 s / 23.8 min, 225 transcript segments.
- 286 periodic source frames at ~5 s intervals.
- 236 detected chart-state changes plus scene-change evidence.
- Periodic/state-change contact sheets reviewed around the three-confirmation explanation, worked valid entries, news exception, and explicit no-trade examples.

## Instructor-explicit confirmation set

After a meaningful liquidity point / POI has been liquidated and only in a valid trading window, Benjamin moves to roughly 1m–5m for entry confirmation. He explicitly lists three LTF confirmations:

1. **Cambio de estructura**.
2. **Impulso + imbalance**.
3. **Formación de velas**.

He does **not** give them equal weight.

### Mandatory core under normal conditions

At ~00:59–02:23 Benjamin states that at least **two of the three** should normally be present, and explicitly says the one he always wants is:

```text
impulso + imbalance
```

His preferred normal combination is:

```text
impulso + imbalance
+ cambio de estructura
```

If the structure change is absent, he says the alternative companion can be:

```text
impulso + imbalance
+ formación de velas
```

Therefore, under the evidence in this lesson:

```text
normal_entry_core_required = impulse_plus_imbalance
normal_entry_min_confirmations = 2 of the 3
```

This is **instructor-explicit**, not an inferred rule.

## Extra execution confirmation: directional candle

After an impulse creates the entry imbalance, Benjamin gives two execution modes:

```text
A) enter at market when price retraces into/touches the selected imbalance
B) wait for an extra confirmation candle inside/after the retracement
```

For sells he describes waiting for a bearish candle; for buys, a bullish candle. This extra candle is therefore an **optional execution refinement**, not a fourth universally mandatory setup condition.

The exact geometric definition of a valid confirmation candle is not fully solved in this video. Examples include rejection/directional candles, but no universal wick/body threshold is stated.

## Preconditions — LTF confirmation is invalid in isolation

Benjamin repeatedly warns that the confirmation set is not to be searched randomly on 1m/5m. Before looking for LTF confirmation, the setup requires context:

```text
relevant HTF / liquidity location
+ liquidity interaction/take
+ valid session/time
+ directional HTF context
-> only then search LTF confirmation
```

At ~20:38–23:40 he gives an explicit no-trade example: price reaches the area but gives no confirmation, so the correct action is no entry. He also warns against buying while 4H is clearly drawing toward unresolved lower external liquidity, even if small LTF bullish candles appear.

## Worked normal entry example

Around ~07:03–09:34 the demonstrated setup has:

- relevant minimum liquidated;
- valid New York timing around 15:00 Spain in the shown example;
- LTF body break / structure change;
- impulse creating imbalance;
- retracement to the imbalance;
- optional bullish confirmation candle;
- stop below the local invalidation structure;
- target framed by the next meaningful maximum/liquidity.

Benjamin calls the structure-change + impulse/imbalance pair the two principal confirmations; the candle formation is absent/less optimal in one example yet the trade remains valid.

## News exception — structure change can be waived conditionally

A major contextual exception is taught around ~14:08–19:58.

After high-impact news, displacement can be so large that waiting for the normal LTF structure-change level would delay the trade beyond the useful session. Benjamin allows omitting the structure-change confirmation **only when the surrounding context is unusually strong**, including the demonstrated combination of:

- important liquidity taken (example: PDH);
- very strong HTF POI/location (example: 4H rejection block);
- HTF directional alignment;
- valid time/session;
- candle formation;
- impulse + imbalance;
- optional directional confirmation candle.

He explicitly rejects applying this exception “in the middle of nowhere.”

Therefore this is not:

```text
news -> structure_change_not_required
```

It is:

```text
large_news_displacement
AND exceptional_HTF_location/liquidity/context
AND impulse+imbalance
AND other confirmation evidence
-> structure_change MAY be waived
```

Exact objective criteria for “exceptional” location remain a calibration problem.

## Higher-timeframe veto

The strongest no-trade statement in the lesson is that lower-timeframe confirmations must not override unresolved higher-timeframe directional structure/liquidity.

Benjamin explicitly says that if 4H is clearly seeking an external low, do not buy before that low is liquidated merely because 1m/5m shows bullish-looking candles or local structure. He states that the higher timeframe prevails over lower timeframes.

Operational candidate:

```text
if higher_priority_HTF_liquidity remains directly active against proposed trade
and instructor-style HTF direction is still unresolved:
    block counter-direction LTF entry
```

The precise detector for “clearly seeking” that liquidity remains unresolved and must be calibrated from weekly examples.

## Entry decision tree — current course evidence

```text
1. Map HTF direction + relevant POI/liquidity.
2. Wait for meaningful liquidity interaction/take.
3. Require valid trading session/time.
4. Move to 1m–5m execution timeframe.
5. Require impulse + imbalance.
6. Under normal conditions require one additional confirmation:
      - structure change (preferred), OR
      - candle formation.
7. Choose execution:
      - market/retracement entry at selected imbalance, OR
      - wait for directional confirmation candle.
8. Block trade if higher-timeframe unresolved liquidity/context contradicts it.
9. If no confirmation appears: no trade.
10. News exception may waive structure change only with unusually strong HTF/liquidity/location context.
```

## What this lesson does NOT prove

- No numeric displacement threshold.
- No fixed ATR/body threshold for a structure change.
- No universal geometry for the optional confirmation candle.
- No proof that every valid setup must contain a candle formation.
- No universal permission to ignore structure change after news.
- No evidence that LTF confirmation can override unresolved HTF external liquidity.

## Backtest implications

Store separately:

- `liquidity_precondition_met`;
- `session_eligible`;
- `htf_direction_aligned`;
- `htf_opposing_liquidity_unresolved`;
- `structure_change_confirmed`;
- `impulse_confirmed`;
- `entry_imbalance_created`;
- `candle_formation_confirmed`;
- `confirmation_count`;
- `extra_directional_candle_used`;
- `news_displacement_exception`;
- `entry_mode`;
- `no_trade_reason`.

The mandatory normal core currently supported by this video is **impulse + imbalance plus at least one of structure-change or candle-formation confirmation**, within correct HTF/liquidity/time context.
