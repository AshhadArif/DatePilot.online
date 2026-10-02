# DatePilot New Opportunity Research

Date: 2026-10-02
Method: 20 candidate keywords checked against (a) real Ahrefs exports in `~/Downloads` — `google_us_business-days-in-a-year-ca_overview_2026-10-02` (21 rows, covers all 20 candidates) and `google_us_add-business-days-to-date_overview_2026-10-02` (51 rows) — and (b) live SERP review. Metrics marked *unavailable* were absent from the exports; nothing is invented. Site baseline: `DATEPILOT-EXPANSION-AUDIT.md`.

## Data source

- US volume / KD / CPC / Parent / Global volume / Traffic potential: Ahrefs export columns, 2026-10-02.
- SERP intent: manual review of current results (2026-10-02).
- Extra anchor keyword from export #2: `deadline calculator` — 5,600/mo, KD 7, global 6,000, TP 6,300, parent `deadline calculator`.

## Keyword clusters

| Cluster | Members | Target |
|---------|---------|--------|
| A Recurring dates | recurring date calculator, recurring dates calculator, date schedule generator (+ ICS export as feature) | `/calculators/recurring-date-calculator/` |
| B Deadlines | deadline date calculator (30/KD6), deadline planner (10), reverse deadline calculator (unavailable), parent `deadline calculator` (5,600/KD7) | `/calculators/deadline-calculator/` — one page, forward + reverse modes |
| C Quarters | quarter calculator (90/KD0, TP 34,000), quarter date calculator (global 10), fiscal quarter calculator (unavailable) | `/calendar/quarter-calculator/` — calendar + fiscal modes |
| D Date formats | date format converter (20), iso date converter (70/KD48, TP 3,500), calendar date converter (global 30), date format calculator (unavailable) | `/converters/date-format-converter/` |
| E Year days | days left in year (600/KD18, TP 6,000), days remaining in year (40/KD3, TP 4,000), day of year calculator (200/KD42) | `/calendar/day-of-year/` |
| E2 Business days per year | work days in a year (5,800/KD9, TP 10,000), business days in a year (1,200/KD0, TP 8,700) | CONTENT EXPANSION on `/calculators/working-days/` |
| F Scheduling/payroll | shift schedule calculator (20/KD4, TP 10), payroll calendar calculator (20/KD10, TP 150), ics calendar generator (20) | not built as pages; ICS export ships inside cluster A |

## Per-candidate decisions

### 1. recurring date calculator — **BUILD NEW TOOL**
- Ahrefs: *unavailable* (export row empty). Parent: *unavailable*.
- SERP: at least six dedicated recurring-date tools (interval days/weeks/months/years, weekday selection, occurrence/end limits, month-end rules, CSV/ICS export). Clear tool intent; no big-domain domination.
- Existing coverage: none (add-days moves one date; prose only).
- URL: `/calculators/recurring-date-calculator/` · Cluster A · Cannibalization risk: low (guard against add-days/days-calculator overlap by keeping series logic here).
- Complexity: high (recurrence engine, month-end rules, exports). SEO rationale: cluster has three same-intent variants to cover on one page; priority #1 in brief.

### 2. recurring dates calculator — **MERGE INTO EXISTING TOOL**
- Ahrefs: *unavailable*. Same intent as #1 → same page, natural variant phrasing in intro/FAQ. No separate URL.

### 3. date schedule generator — **MERGE INTO EXISTING TOOL**
- Ahrefs: *unavailable*. SERP overlaps recurring generators → cluster A page covers it ("schedule generator" phrasing in content). No separate URL.

### 4. deadline planner — **BUILD NEW TOOL**
- Ahrefs: 10/mo, CPC $1.30, global 40. Parent *unavailable*.
- SERP: dedicated planners exist; dominant pattern is **two directions** (forward: start+duration → deadline; backward: deadline−duration → latest start).
- URL: shared with #5/#6 → `/calculators/deadline-calculator/` · Cluster B.

### 5. deadline date calculator — **BUILD NEW TOOL** (same page)
- Ahrefs: 30/mo, KD 6, parent `legal date calculator`, TP 2,800.
- SERP: calculator expected. Forward mode covers it.

### 6. reverse deadline calculator — **BUILD NEW TOOL** (same page, reverse mode)
- Ahrefs: *unavailable*. SERP: backward work-back schedulers are a recognized tool type. One page with an explicit mode switch matches intent better than three thin pages (brief §4: decide by SERP intent).
- Cannibalization: must not compete with subtract-days (single-step −N days) — deadline page owns "duration + buffer + business-day" planning; cross-link both ways.
- Complexity: medium (reuses shared business-day walk). SEO rationale: parent `deadline calculator` 5,600/mo KD 7 is the strongest keyword of all 20.

### 7. quarter calculator — **BUILD NEW TOOL**
- Ahrefs: 90/mo, KD 0, TP 34,000 (largest traffic potential in the set), parent `money calculator`.
- SERP: dedicated tools with date→quarter, quarter→dates, fiscal start month, days remaining/progress.
- Existing coverage: none. URL `/calendar/quarter-calculator/` · Cluster C · Complexity: medium.

### 8. quarter date calculator — **MERGE INTO EXISTING TOOL** (same page, quarter→dates mode)
- Ahrefs: global 10 only. Mode on #7's page.

### 9. fiscal quarter calculator — **MERGE INTO EXISTING TOOL** (same page, fiscal-year start selector)
- Ahrefs: *unavailable*. SERP shows fiscal start month is the differentiator, not a separate product. One page, both modes — no second URL.

### 10. date format converter — **BUILD NEW TOOL**
- Ahrefs: 20/mo, global 100.
- SERP: many dedicated converters; core user problem is the 03/04/2026 ambiguity with explicit order control.
- Existing coverage: guide `/guides/date-time-formats` explains formats but converts nothing.
- URL: `/converters/date-format-converter/` (new Date Conversion hub) · Cluster D · Complexity: medium (parser + formatter + copy).

### 11. date format calculator — **MERGE INTO EXISTING TOOL**
- Ahrefs: *unavailable*. Same intent → cluster D page.

### 12. iso date converter — **MERGE INTO EXISTING TOOL**
- Ahrefs: 70/mo, KD 48, parent `time converter`, TP 3,500. ISO 8601 is an output row of #10; KD 48 argues against a dedicated page. Same URL.

### 13. calendar date converter — **MERGE INTO EXISTING TOOL**
- Ahrefs: global 30. Same intent → cluster D page.

### 14. days remaining in year — **BUILD NEW TOOL**
- Ahrefs: 40/mo, KD 3, parent `how many days left in the year`, TP 4,000.
- SERP: tool pages (dedicated days-left calculators and day-of-year calculators).
- URL: `/calendar/day-of-year/` · Cluster E.

### 15. days left in year — **BUILD NEW TOOL** (same page)
- Ahrefs: 600/mo, KD 18, parent `how many days left in 2026`, TP 6,000.
- Same intent as #14 plus ordinal day, % of year, leap-year status → one tool page. Cannibalization guard: countdown counts to a chosen target; this is year-scoped.

### 16. business days in a year — **CONTENT EXPANSION ONLY**
- Ahrefs: 1,200/mo, KD 0, TP 8,700, SERP features incl. AI Overview + PAA.
- SERP: informational answer pages (260/261/262 weekday tables), not a dedicated calculator.
- Decision: add a verified "Business days in a year" section to the existing working-days page (261 weekdays in 2026 and 2027; 262 in leap 2024 — verified programmatically). No new URL (avoids cannibalizing working-days).

### 17. work days in a year — **CONTENT EXPANSION ONLY**
- Ahrefs: 5,800/mo, KD 9, TP 10,000 — largest volume in the set, parent `how many work days in a year`.
- Same intent as #16 → same section, natural variant phrasing. New URL rejected: would duplicate the section's answer.

### 18. shift schedule calculator — **DO NOT BUILD**
- Ahrefs: 20/mo, KD 4, TP **10** (traffic potential below volume), parent `roster calculator`.
- SERP: specialist shift apps/rota generators (presets, ICS, payroll) — a different product category; DatePilot has no scheduling/payroll topical authority.
- Complexity high, evidence weak → out of scope. Revisit only with better data.

### 19. payroll calendar calculator — **DO NOT BUILD**
- Ahrefs: 20/mo, KD 10, TP 150, parent `pay period calculator`.
- SERP: payroll-domain tools; jurisdiction/pay-period conventions risk unverifiable claims. Evidence below threshold.

### 20. ics calendar generator — **DO NOT BUILD as a page** (feature instead)
- Ahrefs: 20/mo, KD *unavailable*, global 40.
- SERP: ICS generation lives *inside* shift/recurring/event tools, not as a standalone page.
- Decision: ship a real `.ics` download inside the recurring date tool (cluster A) — actual functionality, no thin standalone page. Standalone `/ics-generator/` deferred with clusters F.

## Decisions at a glance

| # | Keyword | Decision | URL |
|---|---------|----------|-----|
| 1 | recurring date calculator | BUILD NEW TOOL | /calculators/recurring-date-calculator/ |
| 2 | recurring dates calculator | MERGE (cluster A) | same |
| 3 | date schedule generator | MERGE (cluster A) | same |
| 4 | deadline planner | BUILD NEW TOOL | /calculators/deadline-calculator/ |
| 5 | deadline date calculator | MERGE (cluster B) | same |
| 6 | reverse deadline calculator | MERGE (cluster B, reverse mode) | same |
| 7 | quarter calculator | BUILD NEW TOOL | /calendar/quarter-calculator/ |
| 8 | quarter date calculator | MERGE (cluster C, quarter→dates mode) | same |
| 9 | fiscal quarter calculator | MERGE (cluster C, fiscal selector) | same |
| 10 | date format converter | BUILD NEW TOOL | /converters/date-format-converter/ |
| 11 | date format calculator | MERGE (cluster D) | same |
| 12 | iso date converter | MERGE (cluster D output row) | same |
| 13 | calendar date converter | MERGE (cluster D) | same |
| 14 | days remaining in year | BUILD NEW TOOL | /calendar/day-of-year/ |
| 15 | days left in year | MERGE (cluster E) | same |
| 16 | business days in a year | CONTENT EXPANSION | /calculators/working-days/ (section) |
| 17 | work days in a year | CONTENT EXPANSION | same section |
| 18 | shift schedule calculator | DO NOT BUILD | — |
| 19 | payroll calendar calculator | DO NOT BUILD | — |
| 20 | ics calendar generator | DO NOT BUILD (ICS export inside cluster A) | feature of recurring tool |

**Net result: 5 new tools, 5 new URLs + 1 new hub (/converters/), 2 content expansions, 3 candidates rejected.**

## Cannibalization guardrails

1. Deadline page = duration planning (forward/backward, buffers, business days); subtract-days stays "−N days in one step"; cross-link.
2. Day-of-year page = year-scoped ordinal counts; countdown stays target-date based; days-calculator stays "N days from a reference".
3. Date format converter = conversion; the date-time-formats guide stays explanation; link both ways.
4. Quarter page owns quarter/quarterly queries; week-number owns week/ISO-week queries.
5. Recurring page owns series/schedule/repeat queries; add-days/days-calculator own single-date moves.
6. Working-days page absorbs "business/work days in a year" as a section — no second page with the same answer.
