# DatePilot New Page and Tool Research

**Date:** 2026-10-01
**Purpose:** Classify expansion candidates A–J from the new-tool brief as BUILD / CONDITIONAL / DO NOT BUILD, using live SERP evidence, the site's Ahrefs exports, and the decision rules already registered in `internal/docs/KEYWORD-RESEARCH.md`.

## 1. Method and data sources

- **Live SERP checks (2026-10-01):** six searches covering business date calculators, age difference calculators, months between dates, work hours calculators, time-since/elapsed calculators, and weeks between dates. Result: which result types dominate (dedicated tool pages vs feature-of-another-tool) and how competitors frame inputs/outputs.
- **Ahrefs exports (US, in `~/Downloads`):**
  - `google_us_add-days-to-date-age-calcu_overview_2026-09-28` and `google_us_add-days-to-a-date-age-in_overview_2026-09-28` — keyword overview rows with Difficulty/Volume/Parent.
  - `all_categories-age_calculator-en-us-10-08-2026` — related-terms export (age cluster).
  - Metrics not present in any export are recorded as **N/A (not in export)** — never invented.
- **Governing decision rules** (`internal/docs/KEYWORD-RESEARCH.md`): create a page only for a distinct user problem with original value; consolidate synonyms into one canonical page; reject pages that differ only by keyword synonym.

## 2. Candidate classification (A–J)

| # | Candidate | Decision | Evidence |
| --- | --- | --- | --- |
| A | **Business Date Calculator** (add/subtract N business days from a date) | **BUILD** | Real metric: `business days calculator` **KD 0, 3,200/mo US** (Ahrefs overview 2026-09-28); supporting: `calculate business days` KD 35/500, `working days calculator` KD 36/1,500. SERP shows a distinct tool type — timeanddate runs a dedicated *Business Date Calculator* separate from its count-only *Business Days* page, plus niche sites (calcbusinessdays.com). DatePilot's working-days tool only **counts**; no page answers "what date is 10 business days from 1 March?" → distinct unsolved problem. |
| B | Days until a date | **DO NOT BUILD** | Already served by `/time/countdown`; KEYWORD-RESEARCH #41/#42 explicitly consolidate to countdown. SERP check unnecessary — internal rule decisive. |
| C | Weeks between two dates | **DO NOT BUILD (consolidate)** | KEYWORD-RESEARCH #14: "Add unit explanation to existing page" → `/calculators/days-between-dates`. SERP agrees: weeks appear as an **alternative unit inside duration calculators** (timeanddate duration page, planetcalc, thecalculatorsite "divide days by 7"), not as a separate product problem. |
| D | Months between two dates | **DO NOT BUILD (consolidate)** | KEYWORD-RESEARCH #15: consolidate to `/calculators/date-calculator`, "Clarify calendar-month ambiguity". SERP: omnicalculator/monthscalculator.com exist, but timeanddate serves the need as an alternative unit of its duration result ("Or 27 months, 2 days"). Competing approaches disagree (average-month seconds vs calendar borrow), proving the ambiguity is an **explanation problem**, not a missing-tool problem. |
| E | **Age Difference Calculator** (two birth dates → gap) | **BUILD** | SERP is dominated by dedicated two-DOB tools (omnicalculator, minutecalc, gigacalculator) with worked examples (e.g. 1990-05-15 & 1995-09-28 → 5 years 4 months 13 days). Distinct problem: order-independent inputs, older/younger identification, "gap" framing — the Age Calculator is single-person vs one target and its copy/UI assumes that frame. Metric: N/A (not in export); age cluster overall is the site's largest (`age calculator` 379,000 KD 48). |
| F | **Time Since Calculator** (live elapsed from a past moment) | **BUILD** | SERP shows a distinct intent: dedicated "how long ago"/elapsed tools with a **live ticking** result (miniwebtool, visualtimer, jcalculator). DatePilot's time-difference takes two fixed datetimes and returns hours+minutes only — no live "now", no calendar-unit breakdown. Metric: `how many days since` 11,000/mo KD 50 exists (parent: `days between dates`) → cannibalization guardrail required (see §4). |
| G | Date/time difference calculator | **DO NOT BUILD** | `/time/time-difference` already accepts two full datetime-local values and returns elapsed hours+minutes. A separate page would duplicate capability and split the same intent. |
| H | **Work Hours Calculator** (shift duration, breaks, decimal hours) | **BUILD** | SERP is full of dedicated shift tools (shiftcalculator.com, workhours-calculator.com, time-card-calculator.org, calcduck, breathehr) all running the same problem shape: `net = end − start − break`, overnight +24h, decimal output for timesheets. No DatePilot tool does this (time-difference is date-anchored, outputs h/m only, no break or decimal concept). Metric: N/A (not in export). |
| I | Holiday-aware working-day calendar | **CONDITIONAL — not built this round** | Requires an owned holiday dataset (country/region/year scope). KEYWORD-RESEARCH #25 already flags "Requires explicit holiday input/data scope", and the working-days page promises holidays are never assumed. Shipping a half-curated list would violate the site's own accuracy posture. Revisit only with a data source. |
| J | Days from today | **DO NOT BUILD** | Covered by `/calculators/days-calculator` (seoTitle already leads with "Days From Today") plus add-days/subtract-days; KEYWORD-RESEARCH #3/#4 consolidate there. Metric `days from today` 2,500/mo KD 55 is served by existing pages. |

**Approved for build:** A, E, F, H (four new tools, four new URLs). **Consolidations:** C, D onto existing pages. **Rejected:** B, G, J. **Deferred:** I.

## 3. Keyword clusters for approved pages

Only metrics that exist in the site's own Ahrefs exports are shown.

| Target page (URL) | Primary keyword | Volume | KD | Supporting keywords (in export) |
| --- | --- | ---: | ---: | --- |
| Business Date Calculator (`/calculators/business-date-calculator`) | business days calculator | 3,200 | 0 | calculate business days (500 / 35); business days between dates (40 / 18); working days calculator (1,500 / 36 — served by existing page) |
| Age Difference Calculator (`/calculators/age-difference-calculator`) | age difference calculator | N/A (not in export) | N/A | age cluster context: age calculator 379,000 / 48; exact age calculator 800 / 40 |
| Time Since Calculator (`/time/time-since-calculator`) | time since calculator | N/A (not in export) | N/A | how many days since 11,000 / 50 (intent overlap risk → guardrails §4); time difference calculator 12,000 / 65 (different intent: two fixed moments) |
| Work Hours Calculator (`/time/work-hours-calculator`) | work hours calculator | N/A (not in export) | N/A | time between two times 13,000 / 12 (parent: time duration calculator — near-intent, differentiated by shift/break framing) |

**Consolidation targets (no new page):**

| Keyword | Ruled page | Action |
| --- | --- | --- |
| weeks between two dates (#14) | `/calculators/days-between-dates` | Result gains weeks breakdown; new section explains the ÷7 method |
| months between two dates (#15) | `/calculators/date-calculator` | New section clarifies calendar-month ambiguity ("6 months from a date" variants) |
| months/years as alternative units of a date gap | `/calculators/days-between-dates` | Result gains years+months+days and total-months lines (timeanddate pattern) |

## 4. Cannibalization guardrails

1. **Business Date vs Working Days:** Working Days = *count weekdays in a range* (inclusive). Business Date = *move N business days forward/back* (returns a date). Titles diverge accordingly ("Add or Subtract Business Days" vs "Count Business Days Between Dates"); each page links the other as the complementary operation.
2. **Time Since vs Days Between vs Time Difference:** Days Between keeps "how many days since a date" (date-only, its H2 already exists). Time Since is framed around a **date-and-time moment with a live ticking result** — copy explicitly routes date-only questions to Days Between. Time Difference keeps "between two fixed moments".
3. **Age Difference vs Age Calculator:** Age Difference takes two birth dates (no "target date" semantics, order-independent, reports gap + total days + who is older). Copy on both pages cross-links with distinct use-case framing.
4. **Work Hours vs Time Difference:** Work Hours is clock-time shifts with break deduction and decimal output; Time Difference is date-anchored elapsed time. Cross-linked with explicit "which tool" guidance.
5. **Title tags:** every new `seoTitle` ≤ 60 characters, em dash format, keyword-lead, and unique against all 40 existing titles.
6. **New tools are additive to navigation:** they appear automatically on home, category indexes, search, and breadcrumbs once added to the `tools` array — no hub changes required beyond content links.

## 5. Rejected/deferred summary

- **B (days until), J (days from today):** existing tools already own the intent; per internal research rules, consolidation beats duplication.
- **G (date/time difference):** exact capability duplicate of time-difference.
- **C (weeks), D (months):** served as explanations/alternative units on canonical pages per #14/#15.
- **I (holiday calendar):** CONDITIONAL — blocked on an owned holiday data source; do not ship a guessed list.
