# Principios Básicos — 4) Cuidado con las Noticias

## Status

**COMPLETE as a course lesson.** This is a calendar/filter lesson, not a chart trade-reconstruction lesson. Full transcript and the complete Forex Factory visual timeline were reviewed.

## Source

- Video: `2) Principios Básicos / 4) Cuidado con las Noticias.mp4`
- Duration: ~5.1 min.
- Tool shown: Forex Factory calendar.
- Trades demonstrated: 0.

## News source and impact hierarchy

Benjamin uses the **Forex Factory calendar** and checks the day/week before trading.

He describes the calendar impact colors as:

- yellow: low impact — he generally ignores it;
- orange: medium impact — he generally ignores it;
- red: high impact — important to his trading filter.

Because he trades EUR/USD, he says he focuses on events affecting **EUR or USD**.

Evidence class: **Instructor-explicit + visually confirmed calendar context**.

## High-impact news entry filter

Benjamin explicitly says:

- an entry **one hour before** a red news release can be acceptable in his judgment;
- **15 minutes before**, he would not enter;
- more generally, if **less than 30 minutes remain before the red news**, he does **not enter the market**;
- after the news has been released, he can evaluate trading again within the normal session/setup conditions.

Evidence class: **Instructor-explicit**.

### Operational interpretation

Strong candidate rule:

`block_new_entry = relevant_red_news and 0 < minutes_to_release < 30`

Important limits:

- Benjamin says **do not enter**; this lesson does not say that an already-open position must always be closed before news.
- He does not state a mandatory X-minute waiting period after the release. Therefore we must not invent one.
- The later trade examples must tell us whether he sometimes waits for post-news structure/confirmation before entering.

## USD bank holiday rule

Benjamin is categorical: when the **United States / USD is on bank holiday**, he does not trade that day and says he does not even look at the charts because he expects insufficient volume/volatility.

Evidence class: **Instructor-explicit**.

Candidate operational gate:

`usd_bank_holiday -> trading_day_allowed = false`

This is one of the clearest no-trade rules in the module.

## European-bank holiday rule

Benjamin distinguishes a single minor European bank holiday from a broad European holiday condition:

- one individual country/bank holiday (he uses Italy as an example) does not automatically stop him trading;
- when many important European banks/countries are on holiday, he avoids the **London session** because European participation is reduced;
- he says the **New York session can still be traded** in that situation.

Evidence class: **Instructor-explicit**.

### Threshold ambiguity

The wording is not numerically consistent enough to encode a precise count:

- in one passage he gives an example of **4 or 5 European banks** being on holiday;
- later he says if there are **more than 2 or 3 European banks** on holiday, he does not trade London.

Therefore the final rule is currently:

`broad_european_bank_holiday -> london_session_allowed = false`

The exact count/definition of “broad” is **UNRESOLVED**. We must not arbitrarily choose 3, 4 or 5 just to make a backtest work.

## Calendar pre-trade routine

Benjamin instructs students to check Forex Factory at the start of the trading day and inspect what is coming that day/week.

This creates a first-class **calendar filter layer** that must be evaluated before a technical setup is allowed to trigger an entry.

## What this lesson establishes

- Red/high-impact EUR or USD news is relevant to EUR/USD trading.
- New entries are blocked inside the final 30 minutes before relevant red news.
- Trading can be reconsidered after the release; no fixed post-release delay is stated here.
- USD bank holiday = no trading day.
- Broad European bank holiday condition = skip London; New York may remain tradable.
- Yellow/orange news is generally not used as a blocking filter by Benjamin in this lesson.

## What this lesson does NOT establish

- It does not tell us to close every open trade 30 minutes before news.
- It does not define slippage/spread limits around releases.
- It does not specify a mandatory post-news waiting period.
- It does not give an exact algorithmic threshold for the number of European bank holidays.
- It does not state whether every red event has equal importance beyond Forex Factory's high-impact classification.
- It does not override the session filter; both calendar and session conditions must eventually be combined.

## Lesson inventory gate

1. Full lesson reviewed: PASS.
2. All relevant visual segments located: PASS.
3. Trades/examples/no-trades counted: PASS — no chart trades; multiple explicit no-entry/no-trade calendar cases.
4. Timestamped content available: PASS.
5. Dense visual trade evidence required: NOT APPLICABLE — static calendar/filter lesson, no rapid chart sequence.
6. Benjamin’s explicit explanation linked: PASS.
7. Measurable variables recorded or unresolved: PASS.
8. No unexplained strategy-relevant visual sequence remains: PASS.

## Carry-forward variables

- `minutes_to_next_relevant_red_news`
- `relevant_red_news_currency ∈ {EUR, USD, other}`
- `block_new_entry_before_news: bool`
- `usd_bank_holiday: bool`
- `broad_european_bank_holiday: bool` — exact threshold unresolved
- `session_allowed_after_calendar_filter: bool`
