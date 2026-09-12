# Principios Básicos — 2) Horarios y Sesiones del Algoritmo

## Status

**COMPLETE as a course lesson.** Full transcript/visual timeline reviewed and every chart-example segment from 368–500 s reconstructed with dense 2 fps source frames (265 frames). Ambiguities about daylight-saving-time handling and example-date wording are preserved explicitly.

## Source

- Video: `2) Principios Básicos / 2) Horarios y Sesiones del Algoritmo.mp4`
- Duration: ~8.9 min.
- Dense chart evidence: 368.0–500.0 s, 2 frames/s.
- Chart in examples: EUR/USD, visibly **1H**.

## Instrument scope

Benjamin says he personally uses **EUR/USD exclusively** here. He also states that the strategy/session logic can be transferred to other markets, even crypto.

Evidence class: **Instructor-explicit**.

Important research treatment: the claim of transferability to all markets is an instructor claim, not independently validated evidence. Our first reconstruction/backtest should remain on EUR/USD unless later course evidence justifies broadening it.

## Primary session rule

Benjamin focuses on two sessions and deprioritizes Asia because he says it normally has insufficient movement for his approach.

The visual slide explicitly shows:

| Session | Spain time | New York time |
|---|---:|---:|
| London | 09:00–11:00 | 03:00–05:00 |
| New York | 14:00–16:30 | 08:00–10:30 |

Evidence class: **Instructor-explicit + visually confirmed**.

He repeatedly describes these as the operating/trading hours and says time outside them is not useful for his strategy.

### Operational interpretation

At this stage, `session_ok` is a strong candidate for a **hard strategy gate**:

- London candidate only inside the stated London operating session.
- New York candidate only inside the stated New York operating session.

This is much stronger evidence than treating the preferred sub-windows below as a hard gate.

## Preferred time windows (“tramos horarios”)

The visual slide explicitly shows the following Spain-time sub-windows:

- London: **09:15–09:45**.
- London: **10:20–10:40**.
- New York: **14:30–15:00**.
- New York: **15:30–16:20**.

Benjamin describes these as periods where manipulation/distribution and good setups occur with particularly high probability. He tells the student to pay extra attention to them.

Evidence class: **Instructor-explicit + visually confirmed**.

### Critical distinction

Benjamin also explicitly says he trades the **entire session window**. Therefore the evidence supports:

- `session_ok`: hard eligibility gate;
- `preferred_tramo`: priority / higher-attention feature inside the session.

It does **not** support rejecting every setup inside the main session merely because it is outside one of the preferred tramos.

## Dense example inventory

### Example 1 — visually confirmed 17 Jul 2025, 14:00

- EUR/USD 1H.
- Dense source frame around 398 s visibly places the crosshair at **17 Jul 2025 14:00**.
- Benjamin marks a prior low and shows price trading through/taking it at the beginning of the New York operating window, followed by the reaction/expansion he wants the student to notice.
- Purpose of the example in this lesson: **timing**, not yet a full liquidity/entry model.

Evidence class: **Instructor-explicit + visual-confirmed**.

### Example 2 — visually confirmed 22 Jul 2025, 15:00

- EUR/USD 1H.
- Dense source frame around 413 s visibly places the crosshair at **22 Jul 2025 15:00**.
- Benjamin points to a marked low/liquidity area and the subsequent move.
- 15:00 is inside the New York session and at the end boundary of the 14:30–15:00 preferred tramo.

Evidence class: **Instructor-explicit + visual-confirmed**.

### Additional examples / explanatory segments

From ~416–436 s Benjamin discusses another 15:00 timing example while also pointing out a 1H imbalance. He explicitly tells the student **not to focus on the imbalance yet**, because it will be explained later. Therefore the imbalance must not be smuggled into the session rule at this stage.

From ~451–479 s he shows further marked high/low liquidity examples and verbally identifies events around **16:00** and **15:00**, again to demonstrate that the notable move begins inside the New York operating window. Dense frames preserve the marked levels and cursor progression. The exact cursor/date is not independently legible on every verbal event, so those individual dates are not elevated to exact visual facts here.

At the end Benjamin verbally summarizes the examples with dates **17, 22, 23 and 24 July** and describes them as four trades/examples.

## Evidence-quality warning: “four consecutive days”

Benjamin then describes these as occurring across “four days in a row.” Taken literally, the dates he himself names — 17, 22, 23 and 24 July — are not four consecutive calendar days. Therefore:

- the examples support the lesson’s qualitative timing demonstration;
- this sentence is **not accepted as performance evidence**;
- no win-rate, frequency or expected-value statistic is inferred from these hand-picked examples.

This discrepancy is retained intentionally rather than normalized away.

## Daylight-saving-time ambiguity

The slide gives fixed Spain and New York clock times. Spain and New York do not change daylight-saving time on exactly the same dates each year. The lesson does not explain how Benjamin handles the short transition periods when the usual offset differs.

Status: **UNRESOLVED**.

For a future historical backtest we must not silently encode a fixed UTC offset. Candidate implementations to test against later course examples are:

1. named local session clocks (`Europe/Madrid` / `America/New_York`), or
2. session definition anchored to the actual London/New York market open.

The final choice is deferred until more examples clarify Benjamin’s intended behavior.

## What this lesson establishes

- EUR/USD is Benjamin’s personal traded pair in this course context.
- London and New York are the relevant operating sessions.
- Main operating windows are explicitly defined.
- Four preferred intraday sub-windows are explicitly defined.
- Preferred tramos raise attention/probability in his explanation but do not replace the full session window.
- Session timing is a central filter in the strategy.

## What this lesson does NOT establish

- It does not yet define liquidity mathematically.
- It does not define the final entry trigger.
- It does not justify treating an imbalance as an entry rule yet.
- It does not provide verified historical performance statistics.
- It does not resolve DST-transition handling.
- It does not prove the strategy transfers to every market merely because Benjamin says it does.

## Lesson inventory gate

1. Full lesson reviewed: PASS.
2. All chart segments located: PASS.
3. All examples/no-trades inventoried: PASS for the lesson’s timing purpose.
4. Timestamp boundaries identified: PASS.
5. Dense chart evidence extracted: PASS — 2 fps, 368–500 s.
6. Benjamin’s explicit explanation linked: PASS.
7. Variables measurable or marked unresolved: PASS.
8. No unexplained chart segment remains relevant to the lesson’s stated objective: PASS.

## Carry-forward candidate variables

- `session ∈ {london, new_york, outside}`
- `session_ok: bool`
- `preferred_tramo ∈ {L1, L2, NY1, NY2, none}`
- `dst_mapping`: unresolved implementation detail

No performance weighting is assigned to the preferred tramos until the later example set is large enough to measure it without selection bias.
