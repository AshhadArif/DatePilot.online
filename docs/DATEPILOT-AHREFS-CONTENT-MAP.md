# DatePilot Ahrefs Content Map

Source: Ahrefs Google US keyword export, file `google_us_add-days-to-a-date-age-in_overview_2026-09-28_23-05-32.csv` (58 rows, exported 2026-09-28).

Metrics are Ahrefs estimates for the US market:

- **Volume** = estimated average monthly searches
- **KD** = keyword difficulty
- **TP** = traffic potential of the current top-ranking result for that keyword
- **Parent** = Ahrefs parent topic, used to decide which keywords belong on the same page

Rules applied when building this map:

1. One primary keyword per page. Everything else is supporting coverage on the same page when the Ahrefs parent topic matches and the search intent is the same.
2. A keyword only gets a new page when the intent is materially different from every existing page and the page can carry substantial unique value.
3. No keyword is added to a page just because it exists in the export.
4. Volumes, KD and traffic potential are copied from the export. Nothing is estimated or invented.

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

## Keyword-to-page map

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

Order follows the Ahrefs opportunity (volume × traffic potential × difficulty) inside each cluster:

1. Age Calculator
2. Days Between Dates
3. Days Calculator (new)
4. Date Calculator
5. Add Days to Date
6. Working Days / Business Days Calculator
7. Countdown Calculator
8. Day of the Week Calculator
9. Week Number Calculator
10. Leap Year Calculator
11. Time Difference Calculator
12. Subtract Days From Date
13. Time Zone Converter
