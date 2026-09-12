# Trading Plan measurement model — BeLikeTheAlgo

This document formalizes the module-12 Trading Plan without inventing market thresholds not taught by Benjamin.

## Separation of layers

### Core market strategy
Fields that can affect historical market-entry/exit logic:

- `session ∈ {london, new_york}`
- `session_eligible`
- `news_eligible`
- `holiday_eligible`
- `setup_family ∈ {induced_orderblock, direct_liquidity, other}`
- `htf_liquidity_event`
- `htf_poi_present`
- `target_side_liquidity_remaining`
- `ltf_tf ∈ {1m,2m,3m,5m}`
- `candle_formation_confirmed`
- `impulse_confirmed`
- `imbalance_created`
- `structure_change_confirmed`
- `entry_trigger`
- `entry_price`
- `stop_price`
- `target_price`
- `initial_RR`
- `three_R_reached`
- `partial_fraction_at_3R`
- `runner_to_BE`
- `realized_R`

### Funding-account overlay
Fields that must be simulated separately from the market edge:

- `account_state ∈ {challenge, funded}`
- `equity_from_start_pct`
- `drawdown_pct`
- `risk_pct_per_trade`
- `trades_today`
- `losses_today`
- `session_profit_today`
- `stop_for_day`
- `first_payout_pending`
- `challenge_fee_recovered`

## Daily trade gate

Instructor-supported state machine:

```text
if trades_today >= 3:
    block new trade

if losses_today >= 2:
    block new trade

if London produced sufficient profit and trader follows single-session preference:
    block New York
```

The absolute maximum of 3 and the two-loss stop are distinct. A third trade is not automatically allowed after two losses.

## Funding risk schedule

Provisional direct encoding of instructor examples:

```text
if equity_from_start_pct < -3%:
    risk_pct ≈ 0.30%
elif equity_from_start_pct < +2%:
    risk_pct ≈ 0.50%
else:
    risk_pct ∈ [0.70%, 1.00%]
```

If the account that had reached +2% falls back to approximately breakeven, revert toward 0.5% risk.

This schedule belongs to the **funding overlay**. Baseline strategy testing must also use a constant-risk model so market expectancy is not confused with money-management effects.

## Setup-family classification

### Induced orderblock

```text
relevant liquidity exists before POI
-> liquidity is taken/induced
-> orderblock/POI is subsequently interacted with
-> LTF confirmation occurs
```

### Direct liquidity

```text
relevant max/min liquidity is taken
-> no pre-existing orderblock is required
-> LTF confirmation occurs at/after the liquidity event
```

Keep both setup families separately labeled to compare expectancy.

## Confirmation vector

For each candidate entry:

```text
confirmation_vector = [
  candle_formation_confirmed,
  impulse_confirmed,
  imbalance_created,
  structure_change_confirmed
]
```

Module 12 supports the following hierarchy:

```text
essential core = candle formation + impulse creating imbalance
structure change = extra confluence when available
```

Because module 11 used a slightly different presentation (at least two of three, with impulse+imbalance mandatory), weekly-trade validation must measure which formulation best reproduces Benjamin's actual decisions.

No numerical impulse threshold is frozen yet.

## 3R management

For each executed trade calculate:

```text
R = abs(entry_price - stop_price)
three_R_price = entry_price ± 3 * R
```

Two instructor-approved branches:

```text
A) full_exit_at_3R = 100%
B) partial_at_3R ≈ 70%; remaining ≈30%; stop_remaining -> breakeven
```

Store both the plan and actual behavior:

- `planned_three_R_management`
- `actual_partial_fraction`
- `be_time`
- `runner_exit_price`
- `runner_realized_R`

## Reconciliation tests for weekly corpus

Measure at least:

1. fraction of Benjamin trades entered through induced-orderblock vs direct-liquidity setup;
2. frequency of candle formation before entry;
3. frequency of impulse + imbalance before entry;
4. frequency of structure change before entry;
5. frequency of valid entries lacking structure change;
6. initial RR distribution;
7. share of trades whose available next-liquidity target is below 3R;
8. actual partial-taking level and fraction;
9. actual BE trigger frequency and timing;
10. session distribution and whether second-session trading follows prior London outcome;
11. daily trade-count and loss-stop adherence when the weekly videos expose multiple trades from one day.

## Anti-lookahead requirements

- confirmation candles must be closed before they can be used;
- impulse metrics use only bars available by the entry decision;
- liquidity/POI must have `known_time <= decision_time`;
- the chosen target cannot be selected because price later reached it;
- runner justification must use only liquidity/context visible at 3R, not the final outcome.

## Backtest phases

Run separate result layers:

### A. Market-edge baseline
Constant risk per trade, no prop-firm equity-dependent sizing.

### B. Benjamin Trading Plan overlay
Daily trade caps + two-loss stop + 3R management.

### C. Funding challenge overlay
Adaptive risk schedule based on +2% cushion / drawdown state.

This prevents a good/bad risk-management overlay from being mistaken for a good/bad entry strategy.
