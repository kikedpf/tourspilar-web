# 14 Trades Semanales Explicados — Semana 14

Status: **COMPLETE — v2 measurement gate passed**

## Evidence reviewed

- Published source: `14) Trades Semana 14`.
- Full source duration: **3542.917 s (~59m03s)**.
- Full timestamped transcript reviewed chronologically: **610 segments**.
- Dense original-source visual evidence reviewed across the complete video, not outcome-selected intervals:
  - baseline: **3,543 frames at 1 fps**;
  - focus: **7,086 frames at 2 fps**;
  - 296 baseline contact sheets + 591 focus contact sheets, covering the source from 0 s through the final seconds.
- Monday–Friday chart states were cross-checked against the dense evidence: timeframe changes, session shading, liquidity/POI markings, imbalances, structure references and shown risk/reward boxes.
- Instrument is EUR/USD in the demonstrated workflow. DXY appears only as secondary contextual support in a Friday re-entry; it is not promoted into a mandatory trigger.
- Exact historical date, exact OHLC values, ATR-normalized distances, broker spread/slippage and exact epoch timestamps are not established by the source. Those fields remain `pending_ohlc_reconstruction` / `unresolved`.
- This is an **instructor-replication** record. No detector threshold is selected because it improves P&L.

## v2 information separation

- **L0:** session/time, news/FOMC state, HTF direction/POI, PDH/PDL/PWH/PWL/Asia liquidity, remaining target-side liquidity and synchronized DXY information already available.
- **L1:** required liquidity event, reaction, local decisive impulse, imbalance creation, candle formation, structure information and retracement/confirmation known before entry.
- **L2:** order style, fill uncertainty, stop choice, scale-in, cancellation/re-entry, BE/partial decisions and broker-specific execution.
- **L3:** later path, displacement, stop/BE/target outcome and all counterfactual survival/TP observations.

Only L0+L1 can justify the original entry. `trade_taken`, `setup_validity`, `setup_quality_pre_entry` and result remain separate variables.

**Impulse and displacement are separate objects.** Benjamin's local forceful move that establishes entry evidence / creates an imbalance is L1 `impulse`. The broader travel that follows is `displacement`; later extension never backfills the original impulse label.

## Global Week 14 context — FOMC/news week and session-subwindow claims

Benjamin describes the week as unusually news-heavy and difficult, with FOMC plus EUR/USD news. His operational response is to be more conservative and wait for relevant news releases rather than treating volatility as an entry signal.

He also repeats a personal empirical preference for the **first London subwindow** and **second New York subwindow**, while saying the second London subwindow has performed worse in his own backtesting. This is stored as:

```text
instructor_probability_hypothesis = true
detector_threshold_from_PnL = forbidden
second_london_absolute_veto = false
```

This qualification is important because he **still takes second-London setups** during Week 14. Any later decision to remove that window belongs to independent research after the Benjamin replication rulebook is frozen.

---

## Chronological trade / example / no-trade inventory

### W14-E01 — Monday London: red-news collision at the opening makes the direct setup inoperable (~6:20–8:15)

**Identity:** `sample_id=W14-E01`; `same_market_day_group=W14-MON`; independent no-trade example; no duplicate.

**L0 known before decision:** important EUR news is scheduled at/around the London open; PDH and a relevant HTF area are visible. Benjamin explicitly says he does not trade this type of direct news interaction.

**Ordered state:**

```text
PDH / HTF area visible
-> London opens with relevant red news
-> price reaches/takes liquidity into the area during the news impulse
-> direct execution blocked by news
```

`news_eligible=false` for the direct spike; `trade_taken=false`; `no_trade_reason=news_collision_at_session_open`.

The later selloff is L3 and is **not** evidence that the direct news entry should have been taken. Exact spread/slippage are unresolved but expected execution conditions are explicitly adverse.

### W14-E02 — Monday post-news London: later structure information arrives too late (~8:15–8:47)

After the news move, Benjamin looks for a normal reaction/continuation. The meaningful structure reference becomes actionable only around the late part of London (he narrates roughly 11:00 Spain).

**L0:** news has already occurred, but `session_eligible=false/out_of_preferred_time` at the eventual activation.

**L1:** later reaction/structure exists, but it is not used to rewrite the earlier news event.

**Decision:** `trade_taken=false`; `no_trade_reason=activation_too_late`. Any subsequent movement is L3 only.

### W14-E03 — Monday later news/POI interaction: visually attractive reaction remains no-trade (~9:10–10:48)

Benjamin shows a later reaction around a 30m-style area/imbalance and notes that price can still respect algorithmic zones around news. He nevertheless states that **he took nothing Monday** because the day was saturated with London/NY news in an FOMC week.

```text
location/reaction evidence = present
day/news eligibility = blocked for Benjamin
trade_taken = false
result = irrelevant to eligibility
```

This prevents a backtest from cherry-picking the visually successful Monday reactions while ignoring the instructor's day-level no-trade label.

### W14-E04 — Tuesday London primary short: Asia-high liquidity -> bearish activation -> taken trade (~11:55–21:13)

**Instructor-explicit + visual-confirmed.** Benjamin explicitly says this is a sell he took.

**L0 before entry:** bearish context; PDL and Asia low remain available below. Asia high / a relevant 15m maximum is taken before/around London. A nearby POI is available, but Benjamin treats prior news-created zones as lower quality.

**Ordered L1 sequence:**

```text
Asia high / relevant upper liquidity available
-> upper liquidity swept
-> bearish reaction / first structure information
-> strong local "algo candle" / decisive bearish impulse
-> imbalance(s) created
-> candidate POI/rejection area
-> first immediate entry declined because inducement/confirmation is unclear
-> later reaction inside area
-> additional structure/imbalance evidence
-> refined sell decision
```

**Impulse vs displacement:** the local force creating the bearish imbalance is L1 impulse. The continued fall toward PDL/Asia low is later displacement and cannot justify the entry retrospectively.

**Approach quality:** Benjamin calls the location/structure less clean than ideal and therefore becomes *more selective* about the entry area. Crucially, he says that if price does not reach the refined area, he accepts missing the trade rather than taking whichever imbalance later proves best.

**L2:** he enters at the refined area and uses a structural stop above the relevant imbalance/structure. The narrated ~6.4 pip illustration is not a detector threshold. He discusses direct/confirmation and 1m/2m/3m alternatives as execution representations of the **same underlying move**, not independent samples.

`same_underlying_move_group=W14-TUE-LON-SHORT-01`.

**Management/L3:** after favorable progress/local-low removal he discusses protection/partial/aggressive management; PDL/Asia low remain natural targets. Exact realized R, spread and fill price remain unresolved from the source.

### W14-E05 — Tuesday second London: recognizable geometry but late/mediocre; Benjamin skips it (~22:47–24:58)

Upper liquidity is removed with a strong candle, followed by structure/imbalance evidence. Benjamin says an entry could be constructed around ~10:32 Spain, but he **did not take it** because the preferred window was effectively over and the target was far.

```text
setup_geometry = recognizable
session/time quality = degraded
setup_quality_pre_entry = poor/mediocre by instructor
trade_taken = false
no_trade_reason = late_window + weak target geometry
```

Later favorable movement cannot upgrade the pre-entry label. His comments about second-London historical win rate stay outside the detector.

### W14-E06 — Tuesday New York: structurally plausible but ~16:36 Spain and therefore rejected (~24:58–28:10)

A later minimum is taken while price reacts around a 4H context; Benjamin can draw a hypothetical structure break, imbalance, entry and 1:3 box. He explicitly says he did **not** enter because it was already around 16:36 Spain.

**Decision:** `setup_validity=invalid_for_plan_time`; `trade_taken=false`; hypothetical entry/stop/target belongs to an illustrative L2 variant only.

This example again shows that a complete-looking LTF pattern does not override L0 timing.

### W14-E07 — Wednesday London/FOMC: noisy tape, unclear impulse and PDH not taken (~29:30–30:45)

**L0:** FOMC day; Benjamin is unusually selective. A nearby PDH / upper liquidity is still available.

**L1:** on 1m Benjamin explicitly sees noise rather than a clear decisive impulse/candle. PDH is approached but not actually taken.

**Decision:** no trade.

```text
required_liquidity_taken = false
impulse_confirmed = false/unclear
setup_validity = invalid
trade_taken = false
```

No later move is allowed to convert the near-touch into a sweep.

### W14-E08 — Wednesday early New York: downstream LTF pattern cannot substitute for missing HTF-zone touch (~30:45–32:33)

Benjamin had marked a 1H imbalance / lower-timeframe HTF area. Several students took a trade when LTF structure/imbalance appeared, but the required higher-timeframe zone was **not actually mitigated/touched**.

He states the rule explicitly: if price does not enter the marked zone, *do not enter even if the later scenario looks perfect*.

```text
htf_poi_required = true
htf_poi_touched = false
downstream_LTF_confirmation = present
context_gate_passed = false
trade_taken_by_Benjamin = false
```

This is strong negative evidence for the state machine: later L1 geometry cannot repair a failed L0 location gate.

### W14-E09 — Wednesday New York ~15:42: valid short/example; later BE management is L3 (~32:33–35:33)

**Instructor-explicit + visual-confirmed.** A relevant low/liquidity cluster is swept, price reacts, then a forceful bearish move breaks the meaningful structure and creates a small imbalance. Benjamin calls ~15:42 Spain a good time and describes the setup as possible/valid with good liquidity, zone, confirmations and management.

**Ordered sequence:**

```text
relevant liquidity / POI context
-> local lows swept / "algo candle" reaction
-> reaction develops
-> decisive bearish impulse
-> body/force structure break
-> imbalance created
-> retracement / optional confirmation
-> short candidate
```

**L2:** direct imbalance entry or waiting for a confirmation reaction are both shown; aggressive and more conservative structural stops are alternatives. Exact live order/fill status is **unresolved** from the narration and is not guessed.

**L3:** Benjamin describes moving to BE after favorable impulse/news-related progress and says the illustrated 1:3 was missed by little before BE. This path is stored as management/outcome evidence only. It does not create the original validity label.

### W14-E10 — Thursday London: valid but downgraded second-window/news-zone sell; Benjamin enters and is stopped (~36:20–39:28)

**Instructor-explicit + visual-confirmed.** Asia high is removed. Price supplies a body structure break, imbalance and bearish reaction.

Pre-entry negatives are already known:
- the POI derives from / sits inside a news-created wick area Benjamin dislikes;
- a larger Monday/news maximum remains unresolved;
- activation occurs in the second London window, which Benjamin personally rates lower.

He nevertheless says the setup creates his parameters and **he enters**.

```text
setup_validity = valid
setup_quality_pre_entry = downgraded
trade_taken = true
result = stop (L3)
```

The stop does not retroactively make the setup invalid. Conversely, the fact that Benjamin personally dislikes the zone must not be erased because the formal confirmations existed.

### W14-E11 — Thursday outside-session news impulse: force alone is not an entry (~39:28–40:55)

After the prior setup, an unresolved maximum is swept **outside Benjamin's session** and price falls with extreme force driven by news. On 15m he sees good candle formation/imbalance, but says the meaningful structure was not broken and emphasizes the timing/news problem.

```text
liquidity_event = present
large_move = present
news_impulse = present
session_eligible = false
structure_change_confirmed = false
trade_taken = false
```

This is important calibration evidence: **large displacement is not automatically the L1 impulse/activation Benjamin wants**. Time, location and required structure information still matter.

### W14-E12 — Thursday later relevant-low sweep: good-hour valid setup that loses (~40:55–43:44)

Benjamin then shows a separate candidate after a meaningful low is liquidated. He describes good time, good reaction and a usable entry/imbalance, and explicitly says the trade leads to stop.

```text
setup_validity = valid
setup_quality_pre_entry = good/acceptable by instructor
trade_taken/example execution = supported
result = stop (L3)
```

He uses the example to state a core methodological rule: a correctly executed valid setup can lose simply because trading is probabilistic. A loss caused by violating time/confluence rules is different from a valid setup that stops.

This is one of Week 14's strongest anti-outcome-bias observations.

### W14-E13 — Friday London long: valid setup, emotional manual exit, same-move re-entry (~46:00–53:10)

**Instructor-explicit + visual-confirmed.** By Friday a 4H low has been removed and price is reacting from an induced 4H POI. Benjamin expects at least a retracement higher.

At ~10:00 Spain, liquidity is removed in the second London window. He explicitly says he **still trades this window** despite his lower historical preference.

**Ordered activation:**

```text
4H low swept / induced HTF POI active
-> relevant LTF liquidity removed
-> bullish structure information
-> several imbalances created
-> price enters candidate imbalance
-> confirmation reaction
-> long entry
```

Benjamin explains why he often waits for confirmation **after price enters an imbalance** rather than requiring an exact deepest limit fill: the exact deeper imbalance may never fill. These are L2 execution alternatives; the backtest may not choose whichever later produces best P&L.

**Observed L2:** Benjamin enters, later manually exits around BE because price becomes lateral/accumulative and he fears a stop, then **re-enters the same underlying move** after stronger structure/imbalance evidence appears before his session ends. DXY/3m clarity provides secondary context for the re-entry.

All tickets belong to:

`same_underlying_move_group=W14-FRI-LON-LONG-01`

They are not independent trades for model statistics.

**L3:** price eventually travels higher. Benjamin explicitly calls the first manual exit emotion/fear-driven and says it left him worse positioned when he re-entered. The later favorable path cannot be used to optimize a “never cancel” rule from P&L; the evidence-supported replication finding is narrower: fear alone is not a planned exit condition.

### W14-E14 — Friday post-news sell: wait for release -> bearish execution; stop variants remain L2 (~53:10–57:05)

Benjamin waits for the large scheduled news candle to finish/release before trading. Afterward, price presents bearish structure/imbalance evidence and he states that **he entered the sell**.

Dense visual evidence confirms a short risk/reward box and substantial favorable travel after the entry. The source then compares several stop placements above the imbalance/candle/structure and explains that changing stop distance changes whether a fixed-R target would be reached.

Correct storage:

```text
trade_taken = true
direction = sell
post_news_wait = true
entry_imbalance = evidenced
stop_variant = unresolved/multiple instructor-supported L2 choices
be_protection_after_favorable_drop = instructor-discussed
exact_realized_R = unresolved
```

A later hypothetical long from a 15m rejection block is explicitly **not** Benjamin's trade. Broker-specific survival of an extremely close stop is also unresolved; Benjamin himself says different brokers may differ by fractions of a pip.

No execution variant is selected from later P&L.

---

## Week 14 methodological findings

1. **Day/session eligibility can dominate attractive chart geometry.** Monday is explicit: several visually clean reactions exist, but Benjamin labels the news-saturated day as no-trade.
2. **HTF location is a real context gate.** Wednesday shows that perfect-looking LTF confirmations do not authorize a trade if the required HTF zone was not reached.
3. **Large news displacement is not equivalent to a valid L1 impulse.** Thursday's outside-session news fall is forceful but lacks the required timing/structure state.
4. **Validity, quality and result remain independent.** Thursday contains valid setups that lose; the loss is not used to relabel them invalid.
5. **Second-London underperformance is an instructor hypothesis, not a rule threshold.** Benjamin still trades the window. Any exclusion must be studied later without P&L leakage into replication.
6. **Entry refinement is conditional, not hindsight selection.** Tuesday/Friday show 1m–5m and multiple imbalance alternatives; the chosen L2 execution must be determined by evidence available at the time.
7. **Manual exit/re-entry can be a process error without invalidating the original setup.** Friday's fear-driven BE exit is an L2 management event; the later move is L3 and cannot justify the original entry.
8. **Correlation control is mandatory.** Scales/re-entries on Tuesday/Friday are grouped by underlying move and cannot inflate sample count.

## Unresolved fields / deferred reconstruction

Across Week 14, unless explicitly visible/narrated:

- historical market date / UTC epoch;
- exact OHLC and ATR-normalized sweep/impulse/approach metrics;
- exact structure prices and imbalance boundaries;
- exact spread, slippage and commissions;
- exact order submission/fill timestamps;
- exact realized R where Benjamin does not state it;
- broker-specific sub-pip stop survival;
- exact numeric definition of “good impulse”, “bad/noisy zone”, or “too late” beyond already published plan/timing evidence.

These remain `unresolved` / `pending_ohlc_reconstruction`; none are inferred from pixels.

## v2 completeness gate

All Week 14 material passes the required review gate:

- [x] source interval known;
- [x] L0 context recorded for every meaningful candidate/no-trade;
- [x] relevant liquidity/POI relationship recorded;
- [x] activation sequences reconstructed chronologically;
- [x] impulse separated from displacement;
- [x] structure reference stated or marked unresolved;
- [x] entry/no-trade decision recorded independently of outcome;
- [x] L2 order/fill uncertainty and execution variants separated;
- [x] L3 outcomes/counterfactuals isolated from L0/L1;
- [x] duplicate/correlation groups populated conceptually;
- [x] unresolved fields explicitly retained rather than guessed;
- [x] no detector threshold chosen because of P&L.

**Week 14 status: COMPLETE — v2 measurement gate passed.**

The Benjamin baseline remains **NOT FROZEN**. Weeks 1–5 still require the planned v2 backfill before baseline freeze.
