# DatePilot Existing Site Audit

**Audit date:** 2026-10-01
**Scope:** Full inventory of datepilot.online before the new-tool expansion round (candidates A–J classified in `DATEPILOT-NEW-PAGE-RESEARCH.md`).
**Method:** Direct repository inspection, production build (`npm run build`), route-shell comparison, and the content QA script (word counts, section structure, internal-link audit).

## 1. Stack and architecture

| Area | Finding |
| --- | --- |
| Framework | Vite 8 + React 19 + TypeScript 6 single-page app, client-side routing via `history.pushState` |
| Commands | `npm run dev`, `npm run lint` (oxlint), `npx tsc -b`, `npm run build` (`tsc -b && vite build && node scripts/generate-route-html.mjs`) |
| Rendering | Every route gets a static HTML shell from `scripts/generate-route-html.mjs` (title, meta description, OG/Twitter, canonical); runtime `updateSeo()` in `src/App.tsx` re-applies the same tags plus JSON-LD (`WebApplication` for tools, `Article` for guides, `FAQPage` when FAQs exist, `BreadcrumbList` on all non-home pages) |
| Content model | `src/content/*.ts` — `ToolContent` (answer, intro, howTo, sections with blocks, guideSlugs, related, faqs); rendered by `renderBlocks`/`RichText` |
| Tool model | Single `tools` array in `src/App.tsx` (`slug`, `title`, `seoTitle`, `category: Date | Calendar | Time`, `summary`, `method`); `toolPath()` maps category to `/calculators/`, `/calendar/`, `/time/` |
| Calculator components | `Calculator` (date-based tools, per-slug branch), `EnhancedCalculator` (datetime-local tools: time-difference, time-zone-converter) |
| Sitemap | `public/sitemap.xml` — 40 URLs, UTF-8 without BOM, one `<lastmod>` per URL |

## 2. Live tool inventory (13 tools)

| URL | Tool | Inputs | Output | Category |
| --- | --- | --- | --- | --- |
| `/calculators/date-calculator` | Date Calculator | start date + N days (signed) | resulting date | Date |
| `/calculators/age-calculator` | Age Calculator | birth date + target date | years, months, days | Date |
| `/calculators/days-between-dates` | Days Between Dates | two dates | total days (exclusive gap) | Date |
| `/calculators/days-calculator` | Days Calculator | reference date + N days | date after and date before | Date |
| `/calculators/add-days` | Add Days to Date | start date + N days | future date | Date |
| `/calculators/subtract-days` | Subtract Days from Date | start date + N days | past date | Date |
| `/calculators/working-days` | Working Days Calculator | two dates | weekday count (inclusive, Mon–Fri) | Date |
| `/calendar/day-of-week` | Day of the Week Calculator | one date | weekday name | Calendar |
| `/calendar/week-number` | Week Number Calculator | one date | ISO week + week-year | Calendar |
| `/calendar/leap-year` | Leap Year Calculator | year | leap-year verdict | Calendar |
| `/time/countdown` | Countdown Calculator | target date | days + hours to 17:00 local | Time |
| `/time/time-difference` | Time Difference Calculator | two datetime-local values | hours + minutes | Time |
| `/time/time-zone-converter` | Time Zone Converter | datetime + source/zone selects | converted local time | Time |

Category index pages: `/calculators` (8 tools), `/calendar` (3), `/time` (3). Plus 14 guides, `/faq`, and 7 trust/legal pages.

## 3. Content state (post priority-cluster round)

Word counts and H2 structure measured 2026-10-01:

| Page | Words | H2 sections | FAQs |
| --- | ---: | ---: | ---: |
| age-calculator | 2,757 | 11 | 5 |
| date-calculator | 1,811 | 12 | 4 |
| days-between-dates | 1,610 | 9 | 5 |
| time-zone-converter | 1,413 | — | — |
| add-days | 1,266 | — | — |
| countdown | 1,253 | — | — |
| working-days | 1,196 | — | — |
| time-difference | 1,189 | — | — |
| days-calculator | 1,168 | — | — |
| week-number | 965 | — | — |
| day-of-week | 933 | — | — |
| leap-year | 886 | — | — |
| subtract-days | 826 | — | — |

All 13 tool pages exceed the 800-word floor; the three priority pages (age, date, days-between) exceed 1,500. No `answer` field contains a markdown link (meta-description safety rule holds). Internal links: 22 unique targets, 0 broken against the 40 built route shells.

## 4. Technical SEO state

- **40 route shells** generated; **40 sitemap URLs**; shell count equals sitemap count.
- **Unique titles and descriptions:** 40/40 unique; tool `seoTitle` values match shell `<title>` values 13/13 (em dash U+2014 in both code paths).
- **Canonical:** every shell and runtime update uses trailing-slash canonical (`https://datepilot.online/…/`).
- **Schema:** `WebApplication` + optional `FAQPage` on tool pages; `Article` + `HowTo` on guides; `BreadcrumbList` everywhere except home; `SearchAction` on home.
- **Title lengths:** longest live tool title 59 characters (age-calculator); all ≤ 60.
- **Indexable set:** 13 tools + 14 guides + 3 category indexes + home + FAQ + 7 trust pages = 40.

## 5. Internal-linking architecture

- Every tool page: Related Calculators (max 4, from `related`), Related Guides (from `guideSlugs`), inline links inside section prose.
- Home and category indexes link all tool cards; Header links the three category hubs; Footer links hubs + FAQ + trust pages.
- Search ("Find a tool") matches `title + summary` — new tools automatically searchable once in the `tools` array.

## 6. Registered conventions (must not silently change)

| Convention | Where stated |
| --- | --- |
| Days Between = exclusive elapsed gap (endpoints excluded) | tool method, `Inclusive vs Exclusive` section, FAQ |
| Working days = inclusive weekday count, both endpoints, holidays NOT removed | working-days content, `Working Days Explained` guide, FAQ |
| Countdown target = 17:00 device-local time | countdown method line |
| Time difference = absolute value, hours + minutes only, datetime-local inputs | time-difference method |
| Age = calendar anniversaries (borrow algorithm), not days ÷ 365 | age content |

## 7. Gap analysis (capability, not copy)

Compared against the expansion candidate list (A–J):

| Capability | Present? | Evidence |
| --- | --- | --- |
| Count working days between dates | Yes | working-days tool |
| **Add/subtract N business days from a date** | **No** | No branch computes a target date by walking weekdays |
| **Age gap between two birth dates** | **No** | age-calculator is single-person vs one target; two-DOB gap needs re-ordered inputs and older/younger framing |
| **Shift hours with break deduction, decimal output** | **No** | time-difference outputs hours+minutes between datetimes only; no break/decimal handling |
| **Live elapsed "time since" (Y/M/D + ticking clock)** | **No** | time-difference is two fixed datetimes, no live now, no calendar-unit breakdown |
| Days until a date | Yes | countdown (satisfies keyword-research items #41/#42) |
| Days from today / before a date | Yes | days-calculator + add/subtract-days (#3/#4) |
| Weeks between dates | Partial | days-between returns total days only; unit explanation owed per #14 |
| Months between dates | Partial | no months output anywhere; calendar-month ambiguity owed per #15 |
| Holiday-aware working-day counting | No (by design) | requires holiday dataset; keyword item #25 flagged "requires explicit holiday input/data scope" |

**Conclusion:** the site's copy and technical SEO are in strong shape after two content rounds. The remaining gap is functional — four user problems with no implementation — plus two consolidation items (#14 weeks, #15 months) that belong on existing pages. Decisions and evidence: `DATEPILOT-NEW-PAGE-RESEARCH.md`.
