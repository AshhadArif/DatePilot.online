# DatePilot Ahrefs Content Map

Sources:

1. `my_1ecd991ba21f408e8dc2a22bdd341b64_search-volume-history_2026-10-01_01-42-31.csv` — monthly US search-volume history for the five priority keywords, October 2025 to September 2026 (primary table below).
2. Ahrefs Google US keyword export, file `google_us_add-days-to-a-date-age-in_overview_2026-09-28_23-05-32.csv` (58 rows, exported 2026-09-28) — broader keyword metrics (Volume, KD, traffic potential, parent topic) in the second table.

Metrics in the overview export are Ahrefs estimates for the US market:

- **Volume** = estimated average monthly searches (12-month average)
- **KD** = keyword difficulty
- **TP** = traffic potential of the current top-ranking result for that keyword
- **Parent** = Ahrefs parent topic, used to decide which keywords belong on the same page

Rules applied when building this map:

1. One primary keyword per page. Everything else is supporting coverage on the same page when the Ahrefs parent topic matches and the search intent is the same.
2. A keyword only gets a new page when the intent is materially different from every existing page and the page can carry substantial unique value.
3. No keyword is added to a page just because it exists in the export.
4. Volumes, KD and traffic potential are copied from the export. Nothing is estimated or invented. Missing metrics are recorded as N/A.

## Priority clusters — September 2026 volume history

"Latest volume" is the September 2026 monthly value from the history file. "Trend" is the change from October 2025 to September 2026, the earliest and latest months in the file. The file contains exactly these five keywords and a monthly total; metrics not in the file (KD, traffic potential, parent topic) are N/A here and are taken from the overview export where available.

| Keyword | Current/Latest Volume | Trend | Intent | Target Page | Primary/Supporting | Action | Notes |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| age calculator | 15,079 | +8.2% (13,937 → 15,079, Oct 2025 → Sep 2026) | Informational, calculator | /calculators/age-calculator | Primary | Expand (Priority 1) | Largest cluster term; 12-month range 13,591–15,196. Overview export: Volume 379,000, KD 48, TP 173,000, parent `how old am i`. |
| date calculator | 11,485 | −2.1% (11,729 → 11,485, Oct 2025 → Sep 2026) | Informational, calculator | /calculators/date-calculator | Primary | Expand (Priority 2) | Stable; 12-month range 10,972–11,857. Overview export: Volume 186,000, KD 60, TP 84,000, parent `date`. |
| age calculator by date of birth | 590 | +220.7% (184 → 590, Oct 2025 → Sep 2026; peak 879 in May 2026) | Informational, calculator | /calculators/age-calculator | Supporting | Expand existing page, no new page | Fastest-growing cluster term. Covered by the dedicated "Calculate Age From Date of Birth" section; a separate page would cannibalize the primary page. KD/TP: N/A in history file. |
| days between dates | 307 | −3.5% (318 → 307, Oct 2025 → Sep 2026) | Informational, calculator | /calculators/days-between-dates | Primary | Expand (Priority 3) | 12-month range 257–324. Overview export: Volume 59,000, KD 0, TP 220,000, parent `days between dates`. |
| calculate age | 267 | +23.6% (216 → 267, Oct 2025 → Sep 2026) | Informational, calculator | /calculators/age-calculator | Supporting | Expand existing page, no new page | Same intent as `age calculator`; integrated naturally into the intro, how-to, methodology and FAQ instead of a duplicate page. KD/TP: N/A in history file. |

Cluster total (five keywords): 28,426 in September 2026, +5.8% versus October 2025 (26,864).

Monthly history from the same file:

| Month | age calculator | date calculator | age calculator by date of birth | days between dates | calculate age | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 2025-10 | 13,937 | 11,729 | 184 | 318 | 216 | 26,864 |
| 2025-11 | 13,987 | 11,267 | 171 | 314 | 218 | 26,520 |
| 2025-12 | 13,591 | 10,972 | 218 | 257 | 266 | 26,018 |
| 2026-01 | 14,783 | 11,658 | 352 | 289 | 327 | 28,312 |
| 2026-02 | 15,103 | 11,724 | 264 | 296 | 211 | 28,296 |
| 2026-03 | 14,860 | 11,857 | 663 | 324 | 261 | 28,585 |
| 2026-04 | 14,658 | 11,688 | 727 | 309 | 321 | 28,491 |
| 2026-05 | 15,196 | 11,435 | 879 | 298 | 326 | 29,024 |
| 2026-06 | 14,883 | 11,185 | 573 | 295 | 270 | 28,372 |
| 2026-07 | 15,148 | 11,663 | 577 | 295 | 277 | 29,035 |
| 2026-08 | 14,957 | 11,502 | 578 | 315 | 263 | 27,931 |
| 2026-09 | 15,079 | 11,485 | 590 | 307 | 267 | 28,426 |

## Consolidation decisions made before implementation

| Question | Decision | Evidence |
| --- | --- | --- |
| Do `days between dates`, `how many days between`, `calculate days between dates`, `number of days between dates`, `date difference calculator` and `how many days since` each need a page? | No. All six map to `/calculators/days-between-dates`. | All share Ahrefs parent `days between dates` or `date to date calculator` / `day counter`, and the intent is the same two-date difference query. |
| Do `business days calculator` and `working days calculator` need separate pages? | No. Both map to `/calculators/working-days`. | Both share Ahrefs parent `business day calculator`. The tool counts the same Monday–Friday days for both queries. |
| Does `utc time converter` / `gmt time converter` need standalone pages? | No. Both map to `/time/time-zone-converter`. | The converter already converts to and from UTC. Separate pages would duplicate an existing tool, and the export shows low traffic potential (2K and 600). |
| Does `days calculator` need a page? | Yes — new page `/calculators/days-calculator`. | Volume 32K, KD 46, TP 556K, parent `day counter`. Intent is "what date is N days from today / ago", which no existing page answers directly. |
| Do `days until christmas` and `days until new year` need seasonal pages? | No. Dynamic coverage added to `/time/countdown`. | Internal decision in `internal/docs/KEYWORD-RESEARCH.md` forbids one page per event date; the SERP is answered by AI Overviews and live countdown widgets. |
| Do `how many days until` and date-specific `how many days until <date>` variants need pages? | No. Covered by `/time/countdown`. | Ahrefs parent is date-specific (`how many days until april 25th`), so the head term has almost no traffic potential of its own (TP 200). |
| Does `time between two times` need its own page? | No. Covered by `/time/time-difference`. | Its parent is `time duration calculator`, the same parent as `time difference calculator`. One tool answers both. |

## Keyword-to-page map (broader overview export, 2026-09-28)

| Keyword | Volume | KD | Traffic potential | Target page | Primary/Supporting | Action |
| --- | ---: | -: | ---: | --- | --- | --- |
| age calculator | 379,000 | 48 | 173,000 | /calculators/age-calculator | Primary | Expand |
| how old am i | 54,000 | 21 | 186,000 | /calculators/age-calculator | Supporting | Expand |
| exact age calculator | 800 | 40 | 160,000 | /calculators/age-calculator | Supporting | Expand |
| age in years months days | 10 | — | — | /calculators/age-calculator | Supporting | Expand |
| date calculator | 186,000 | 60 | 84,000 | /calculators/date-calculator | Primary | Expand |
| calculate a date | 100 | 42 | 286,000 | /calculators/date-calculator | Supporting | Expand |
| date calculator with days | — | — | — | /calculators/date-calculator | Supporting | Expand |
| date calculator months days | — | — | — | /calculators/date-calculator | Supporting | Expand |
| date after number of days | — | — | — | /calculators/add-days | Supporting | Expand |
| date before number of days | — | — | — | /calculators/subtract-days | Supporting | Expand |
| date in the future | — | 11 | 700 | /calculators/date-calculator | Supporting | Expand |
| date in the past | 10 | — | — | /calculators/date-calculator | Supporting | Expand |
| days between dates | 59,000 | 0 | 220,000 | /calculators/days-between-dates | Primary | Expand |
| how many days since | 11,000 | 50 | 549,000 | /calculators/days-between-dates | Supporting | Expand |
| how many days between | 4,400 | 0 | 375,000 | /calculators/days-between-dates | Supporting | Expand |
| date difference calculator | 7,300 | 47 | 492,000 | /calculators/days-between-dates | Supporting | Expand |
| calculate days between dates | 900 | 0 | 617,000 | /calculators/days-between-dates | Supporting | Expand |
| number of days between dates | 500 | 28 | 378,000 | /calculators/days-between-dates | Supporting | Expand |
| days calculator | 32,000 | 46 | 556,000 | /calculators/days-calculator | Primary | Create new page |
| days from today | 2,500 | 55 | 24,000 | /calculators/days-calculator | Supporting | Create new page |
| days after today | 10 | — | — | /calculators/days-calculator | Supporting | Create new page |
| days before today | — | — | — | /calculators/days-calculator | Supporting | Create new page |
| add days to date | 6,000 | 37 | 82,000 | /calculators/add-days | Primary | Expand |
| add days to a date | 300 | 0 | 286,000 | /calculators/add-days | Supporting | Expand |
| subtract days from date | 200 | 50 | 84,000 | /calculators/subtract-days | Primary | Expand |
| subtract days from a date | 10 | 31 | 266,000 | /calculators/subtract-days | Supporting | Expand |
| business days calculator | 3,200 | 0 | — | /calculators/working-days | Primary | Expand (consolidated) |
| working days calculator | 1,500 | 36 | 29,000 | /calculators/working-days | Primary | Expand (consolidated) |
| calculate business days | 500 | 35 | 29,000 | /calculators/working-days | Supporting | Expand |
| calculate working days | 250 | 28 | 29,000 | /calculators/working-days | Supporting | Expand |
| business days between dates | 40 | 18 | 30,000 | /calculators/working-days | Supporting | Expand |
| weekdays between dates | 20 | 3 | 28,000 | /calculators/working-days | Supporting | Expand |
| working days between dates | 20 | 12 | 28,000 | /calculators/working-days | Supporting | Expand |
| countdown calculator | 1,400 | 75 | 292,000 | /time/countdown | Primary | Expand |
| countdown to date | 4,300 | 0 | — | /time/countdown | Supporting | Expand |
| how many days until | 19,000 | 0 | 200 | /time/countdown | Supporting | Expand |
| days until christmas | 95,000 | 41 | 419,000 | /time/countdown | Supporting | Dynamic section, no new page |
| days until new year | 150 | 2 | 64,000 | /time/countdown | Supporting | Dynamic section, no new page |
| day of the week calculator | 350 | 53 | 13,000 | /calendar/day-of-week | Primary | Expand |
| what day of the week | 1,000 | 52 | 16,000 | /calendar/day-of-week | Supporting | Expand |
| what day was | 1,100 | 47 | 16,000 | /calendar/day-of-week | Supporting | Expand |
| what day will be | — | — | — | /calendar/day-of-week | Supporting | Expand |
| what day is it | — | — | — | /calendar/day-of-week | Supporting | Expand |
| current week number | 3,500 | 0 | 17,000 | /calendar/week-number | Primary | Expand |
| what week of the year | 200 | 0 | 22,000 | /calendar/week-number | Supporting | Expand |
| ISO week number | 200 | 55 | 18,000 | /calendar/week-number | Supporting | Expand |
| week number calculator | 40 | 2 | 2,400 | /calendar/week-number | Primary | Expand |
| is this year a leap year | 4,000 | 0 | 6,700 | /calendar/leap-year | Supporting | Expand |
| what is a leap year | — | — | — | /calendar/leap-year | Supporting | Expand |
| leap year calculator | 150 | 6 | 450 | /calendar/leap-year | Primary | Expand |
| time between two times | 13,000 | 12 | 90,000 | /time/time-difference | Primary | Expand |
| time difference calculator | 12,000 | 65 | 108,000 | /time/time-difference | Primary | Expand |
| time difference between two times | 70 | 28 | 131,000 | /time/time-difference | Supporting | Expand |
| time duration calculator | — | — | — | /time/time-difference | Supporting | Covered by same page (Ahrefs parent) |
| time zone converter | 77,000 | 88 | 80,000 | /time/time-zone-converter | Primary | Expand carefully |
| convert time zones | 350 | 77 | 35,000 | /time/time-zone-converter | Supporting | Expand |
| time zone difference | 300 | 87 | 13,000 | /time/time-zone-converter | Supporting | Expand |
| utc time converter | 1,600 | 66 | 2,000 | /time/time-zone-converter | Supporting | Expand (consolidated) |
| gmt time converter | 400 | 41 | 600 | /time/time-zone-converter | Supporting | Expand (consolidated) |

## Pages not created, and why

| Keyword or group | Why no new page |
| --- | --- |
| days until christmas, days until new year, how many days until christmas | Seasonal event pages are excluded by `internal/docs/KEYWORD-RESEARCH.md` (cluster rule: "Pages for Christmas, New Year, or every event date" must not be created), the SERP is satisfied by AI Overviews and live countdown widgets, and a single event page would open the door to hundreds of near-identical pages. The countdown page now answers these with dynamic, always-current values. |
| how many days until, how many days until april 25th and other date-specific variants | Ahrefs parent is a specific date, not a topic. Traffic potential for the head term is 200. Covered by the "How Many Days Until a Date?" section on `/time/countdown`. |
| calculate days between dates, number of days between dates, how many days between, date difference calculator | Same intent and same parent topic as `days between dates`. Consolidated onto `/calculators/days-between-dates`. |
| business days calculator | Same parent topic (`business day calculator`) as `working days calculator`. A second page would target an identical intent with an identical tool. |
| utc time converter, gmt time converter | The time zone converter already converts to and from UTC/GMT. Standalone pages would repeat the same tool. Covered by a dedicated section on `/time/time-zone-converter`. |
| time between two times | Same parent topic (`time duration calculator`) as `time difference calculator`; both are answered by one tool. |
| 56 days from today, 90 days ago and other single-number permutations | Individual number pages are indexable input permutations, which the SEO plan forbids. `/calculators/days-calculator` answers any number interactively and lists the most common offsets dynamically. |

## Implementation priority

Order follows the brief's priority clusters first (Age Calculator → Date Calculator → Days Between Dates), then the Ahrefs opportunity (volume × traffic potential × difficulty):

1. Age Calculator (cluster: age calculator, calculate age, age calculator by date of birth)
2. Date Calculator (cluster: date calculator)
3. Days Between Dates (cluster: days between dates)
4. Days Calculator (new)
5. Add Days to Date
6. Working Days / Business Days Calculator
7. Countdown Calculator
8. Day of the Week Calculator
9. Week Number Calculator
10. Leap Year Calculator
11. Time Difference Calculator
12. Subtract Days From Date
13. Time Zone Converter
