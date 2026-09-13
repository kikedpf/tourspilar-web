# 14 Trades Semanales Explicados — Semana 1

Status: **COMPLETE**

## Evidence reviewed

- Full video duration: ~46.2 min.
- 367 timestamped transcript segments.
- 47 periodic contact sheets (~5 s source-frame cadence) and 442 detected chart-state changes.
- Visual review included the EUR/USD/DXY opening, the London liquidity sweep, the imbalance-entry drawings, later examples, and trade-management section.

## Chronological evidence

### EUR/USD is primary; DXY is confirmation, not a substitute

**Instructor-explicit.** Around 00:30–01:18 Benjamin marks PDH/PDL on EUR/USD and DXY and explains the inverse relationship. DXY can confirm the EUR/USD idea, but EUR/USD itself must satisfy its own liquidity condition.

At ~03:17–03:34 he makes the veto explicit: even if DXY has already broken its relevant minimum, if EUR/USD has not liquidated the required maximum, **no EUR/USD entry** is allowed.

Operational consequence:

```text
DXY_confirmation = supportive evidence
EURUSD_required_liquidity_event = mandatory
DXY_confirmation cannot replace the EUR/USD liquidity event
```

### No anticipatory entry before the required liquidity sweep

**Instructor-explicit.** Around 02:02–02:23 price starts falling close to the marked maximum. Benjamin says they cannot enter because the maximum has not been broken/taken; if the move leaves without them, they accept missing it.

This is strong negative-example evidence against entering merely because price is near liquidity or because the expected direction has begun.

### Liquidity -> reaction/displacement -> imbalance entry area

**Instructor-explicit + visual-confirmed.** After the required high is liquidated, Benjamin waits for reaction/confirmation. Around 04:44–05:13 he notes both EUR/USD and DXY confluence, then identifies bearish structure/context and consecutive inefficiencies/imbalances created by the impulse.

At ~30:11–30:37 in another worked example, after liquidation and the first large reaction, he identifies the first imbalance and says the order can be placed at the start or around the midpoint while covering the relevant maximum, depending on backtesting/execution preference.

This supports the existing entry model but does **not** establish one universal fill percentage inside the imbalance.

### Stop placement / multiple-entry discretion

**Instructor-explicit.** Around 05:52–06:46 he discusses reducing stop distance by choosing a deeper part of a large imbalance, splitting risk between two possible imbalance entries, or using a more aggressive stop. These are presented as alternatives for backtesting, not one fixed rule.

Do not promote an exact pip stop or exact FVG fill fraction to the automated rule-set from this video.

### Trade management: BE is contextual, 3R remains the standard objective

**Instructor-explicit.** Around 44:52–45:39 Benjamin explains protecting the trade once price has moved away from the entry area. He presents either immediate BE or a slightly more conservative protected stop above nearby structure/wick. At ~45:17–45:39 he states that when price continues, he moves to BE and at 1:3 takes the profit, while warning not to move to BE mechanically too early because a normal retracement can tag it.

This validates:

- `target_R ~= 3R` as the recurring Trading Plan objective;
- `BE` is not a single fixed-R trigger in this evidence;
- local structure/liquidity can affect the protected-stop position.

## Calibration observations

Week 1 strongly reproduces the theory sequence:

```text
mark HTF/session liquidity
-> wait for EUR/USD's own liquidity event
-> use DXY only as confirmation
-> require reaction / displacement
-> identify created imbalance(s)
-> execute on retracement according to chosen entry variant
-> structurally protect risk
-> manage toward ~3R
```

## Unresolved / excluded from frozen rules

1. Exact wick-vs-close amount needed to declare the liquidity point taken is still not quantified.
2. Exact minimum displacement magnitude remains uncalibrated.
3. Exact imbalance entry fraction (edge vs midpoint vs split orders) is discretionary/backtest-dependent here.
4. Exact BE trigger is contextual; no fixed `R` threshold is justified from this week.
5. Week-level outcomes shown by Benjamin are examples, not independent expectancy statistics.