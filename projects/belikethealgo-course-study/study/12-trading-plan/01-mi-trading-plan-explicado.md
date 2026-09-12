# 12 Trading Plan — 01 Mi trading plan explicado

Status: **COMPLETE**

## Evidence reviewed

- Full timestamped transcript: ~979.7 s / 16.3 min, 248 transcript segments.
- 196 periodic frames at ~5 s intervals.
- Visual review of all 17 periodic contact sheets plus adaptive/state-change evidence.
- The on-screen plan was visually cross-checked against the transcript: horarios, orderblocks inducidas y máximos/mínimos, confirmaciones, and riesgo-beneficio are written on screen.

## Scope warning: strategy vs funding-account management

This lesson is explicitly framed as **"Cómo gestionar una cuenta de fondeo"**. It contains two different layers that must not be merged:

1. **market strategy / trade-selection rules**, which can inform the core strategy and historical backtest;
2. **funding-account challenge / payout management**, which depends on the rules and psychology of prop-firm accounts and must be evaluated separately.

The market strategy layer is eligible for the core strategy specification. Funding-account rules are stored as an execution/risk overlay, not as evidence that the market edge itself changes.

## Session choice and daily stopping rules — instructor explicit

Benjamin says London and New York are both tradable and can alternate in quality from week to week. He personally prefers London often because New York tends to have more news, but does not claim London is universally superior.

His preferred behavioral rule is to choose one session where possible. If trading both, he imposes limits:

- maximum **3 trades per day**;
- he says **2 trades is even better** for someone who wants a tighter limit;
- if two trades are lost, close the session/day rather than continuing to recover losses;
- if London already produced a good profit, he recommends closing the chart rather than forcing New York;
- if roughly 1% has already been lost through two trades, he explicitly says he would not continue into New York because recovery-seeking distorts judgment.

These are instructor rules/recommendations, but the exact universal stopping implementation should remain configurable because he presents both a 3-trade maximum and a more conservative 2-trade option.

## Two accepted setup families — instructor explicit

Benjamin explicitly permits two main ways of trading the strategy:

### A. Induced orderblock setup

The orderblock has a relevant maximum/minimum to liquidate before price enters/retests the area.

```text
relevant liquidity / max-min
-> inducement / liquidation
-> orderblock interaction
-> LTF confirmation
-> entry
```

### B. Direct relevant max/min liquidity setup

Price may liquidate a relevant maximum/minimum (including PDH/PDL or an important 1H high/low) without necessarily travelling into a pre-selected orderblock. The liquidity event itself can become the location from which the lower-timeframe entry is evaluated.

Benjamin says both forms are valid and tells students to backtest which gives them the higher win rate/probability. Therefore:

```text
orderblock_required_for_every_trade = false
```

This reinforces the module-5 conclusion rather than contradicting it.

## Lower-timeframe confirmation hierarchy — instructor explicit

Once price reaches the zone or liquidates the intended max/min, Benjamin moves to a lower timeframe. He explicitly allows **1m, 2m, 3m or 5m**, saying the student should backtest which gives the best confidence/probability.

He lists three confirmation components:

1. **Formación de velas** — described as fundamental.
2. **Impulso + imbalance** — price reacts away from the area with a directional impulse and creates an imbalance; also described as essential.
3. **Cambio de estructura** — useful extra confluence, but placed last and explicitly not something Benjamin considers as important as the first two.

He later states the optimum is to have all three, but that structure change can be absent when the reaction impulse is so large that the structural reference is very far away. In that case he reiterates that candle formation + impulse/imbalance are the essential core.

This refines module 11. The safest consolidated interpretation after module 12 is:

```text
VALID HTF LOCATION / LIQUIDITY + VALID TIME
-> LTF candle formation
-> LTF impulse that creates imbalance
-> structure change if available as extra confirmation
-> entry candidate
```

Module 11 contains language asking for at least two of three and strongly favoring impulse+imbalance; module 12 further emphasizes candle formation + impulse/imbalance as the essential pair and de-emphasizes structure change. We therefore do **not** make structure change universally mandatory.

## Risk per trade and adaptive funding-account risk — instructor explicit

For funding challenges Benjamin gives a state-dependent risk schedule:

### Starting / neutral account

- risk **0.5% per trade** until approximately **+2% account profit**.

### Cushion reached

- once approximately +2% is achieved, increase to roughly **0.7%–1% per trade**;
- if the account falls back to breakeven, revert to the smaller risk.

### Drawdown state

- around **-3% to -5% drawdown**, he says risk should be reduced materially;
- explicit example: use about **0.30%** risk while recovering toward breakeven.

This is a **funding-account overlay**, not proof that expectancy changes with account equity. For the core market backtest we should test a constant-risk baseline and then separately simulate Benjamin's adaptive challenge-risk policy.

## Trade count and risk interaction

The lesson repeatedly combines:

```text
max 3 trades/day
preferred conservative option = 2 trades/day
starting risk ≈ 0.5%/trade
```

A two-loss stopping rule at 0.5% naturally limits the common losing day to roughly -1% before slippage/fees, which matches his verbal example of stopping after around 1% loss.

Do not silently assume the third trade is allowed after two consecutive losses: his explicit advice is to stop after two losses even though the absolute daily trade cap is three.

## Minimum risk-reward and management — strong instructor-explicit rule

Benjamin calls risk-reward essential and says his **minimum is 1:3** in this Trading Plan lesson.

At **+3R**, he offers two valid management paths:

### Path A — close full position

```text
at 3R -> close 100%
```

### Path B — partial + runner

```text
at 3R
-> close ~70%
-> move remaining ~30% to breakeven
-> allow runner to continue if the trade still has potential
```

He says he personally takes partials around 1:3 frequently and therefore has relatively few full winners that run untouched to the final target.

Important reconciliation with earlier material:

- Imbalances Vol. 2 illustrated ~2R as a minimum desired framework in that example.
- London Killzone showed conditional account/trade-quality management where only ~30–40% may be taken around 3R to leave a larger runner.
- Trading Plan is the later, more explicit general plan and therefore has greater weight: **3R is the stated minimum in this plan**, with either full close or ~70% partial + BE.

The weekly corpus must determine how consistently this is actually followed in practice.

## Theoretical win-rate statement — arithmetic, not empirical performance

Benjamin states that with a 1:3 risk-reward, roughly 3 winners out of 10 can be profitable. This is arithmetic intuition, not measured course performance and must not be logged as an observed 30% win rate.

## Funding challenge objective — instructor recommendation

Benjamin emphasizes patience over speed because the example prop firm has no maximum challenge days. He explicitly discourages starting at 1% risk before building a cushion because a 3–4 loss streak can create a large psychological and account drawdown.

This is psychological/risk-process guidance, not a market-entry feature.

## First payout / fee-recovery policy — funding-specific

For a newly passed funded account, Benjamin recommends:

- achieve the minimum profit needed for the first payout in his example (he mentions $50 and a 14-day first payout window for the firm being discussed);
- then stop trading that account until the first payout/fee reimbursement is received;
- only after recovering the challenge fee does he view the trader as economically "risk free" with respect to the initial fee.

This policy is **company-specific and temporally contingent**. It is excluded from the core strategy backtest and retained only in a prop-account operations layer.

## Consolidated decision tree after modules 1–12

The lesson allows the prior modules to be assembled into a first explicit operational skeleton:

```text
1. PRE-SESSION FILTERS
   - relevant session/time is open
   - news/holiday rules permit trading
   - daily trade/loss limit not reached

2. HTF CONTEXT
   - map structure and prioritized liquidity
   - identify relevant clean POI if one exists
   - determine remaining target-side liquidity

3. LOCATION EVENT
   EITHER
   A) relevant liquidity induces an orderblock/POI
   OR
   B) relevant max/min liquidity is directly taken

4. LTF CONFIRMATION (1m–5m)
   - closed-candle formation/rejection evidence
   - directional impulse
   - impulse creates imbalance
   - structure change = extra confirmation when available
   - block entry if higher-priority HTF liquidity/context contradicts trade

5. ENTRY
   - entry at valid LTF area / direct execution / confirmation-candle refinement
   - stop remains structural/invalidation-aware, not fixed pips

6. INITIAL MANAGEMENT
   - Trading Plan minimum intended RR: ~3R
   - at 3R either close all OR take ~70% and move remainder to BE
   - runner only if context/remaining liquidity justifies continuation

7. DAILY CONTROL
   - hard maximum 3 trades/day
   - conservative preference: 2
   - stop after two losses / around -1% at 0.5% risk
   - avoid revenge/recovery trading into a second session
```

## Key unresolved/calibration items

Even after the Trading Plan, the following remain intentionally unresolved for machine execution:

- exact quantitative candle-formation detector;
- impulse/displacement threshold;
- minimum imbalance size/quality threshold beyond geometric existence;
- exact structure-change threshold and whether it is necessary under different setup classes;
- objective HTF directional draw detector;
- exact liquidity sweep tolerance (wick/equality/close semantics);
- precise stop buffer around structural invalidation;
- when a runner is justified beyond 3R;
- whether the 3R minimum is obeyed consistently in weekly trades or adapted to available liquidity;
- whether direct max/min setups and induced-orderblock setups have materially different expectancy;
- whether 1m/2m/3m/5m produce materially different signal quality.

These are to be calibrated on held-out weekly trades, not guessed.

## Inventory gate

- Full transcript reviewed: yes.
- Full periodic visual evidence reviewed: yes.
- On-screen Trading Plan verified: yes.
- Session rules indexed: yes.
- Setup-family rules indexed: yes.
- Confirmation hierarchy indexed: yes.
- Risk-state rules indexed: yes.
- 3R/partial/BE management indexed: yes.
- Funding-specific vs market-strategy rules separated: yes.
- Contradictions/reconciliations with earlier modules documented: yes.

**Lesson status: COMPLETE.**
