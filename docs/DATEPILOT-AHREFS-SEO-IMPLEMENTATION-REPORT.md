# DatePilot Ahrefs SEO Implementation Report

Date: 2026-09-28
Source keyword data: Ahrefs Google US export `google_us_add-days-to-a-date-age-in_overview_2026-09-28_23-05-32.csv` (58 rows)
Keyword-to-page plan: `docs/DATEPILOT-AHREFS-CONTENT-MAP.md`

## Summary

All 13 tool pages now target their Ahrefs primary keyword with an intent-matched title, a rewritten H1/meta structure, and substantially expanded explanatory content (785–1,657 words per tool page). One new page was created (`/calculators/days-calculator`, 32K volume / 556K traffic potential). Seven calculation or rendering defects were corrected as minimum necessary technical fixes. Five live components add always-current data (popular countdowns, days from today, today's weekday, current ISO week, leap-year status). No calculator's stated conventions were changed: days-between remains exclusive, working days remain Monday–Friday without holidays, the countdown still measures to 17:00 local.

Build status: `npm run lint` (oxlint) clean, `npx tsc -b` clean, `npm run build` successful — 40 static route shells generated.

## What changed, by file

| File | Change |
| --- | --- |
| `src/content/types.ts` | New content model: `Block` (p, h3, ol, ul, table, note, component), `Section`, `ToolContent` (answer, intro, howTo, sections, guideSlugs, related, faqs), `GuideContent`, `DynamicBlockName`. |
| `src/content/age.ts` | Age Calculator content (1,657 words, 8 H2s, 5 FAQs). |
| `src/content/dates.ts` | Date Calculator, Days Between Dates, **Days Calculator (new)**, Add Days, Subtract Days content. |
| `src/content/work.ts` | Working Days content (consolidated business-days intent). |
| `src/content/time.ts` | Countdown, Time Difference, Time Zone Converter content (UTC/GMT consolidated here). |
| `src/content/calendar.ts` | Day of the Week, Week Number, Leap Year content. |
| `src/content/guides.ts` | 14 guide pages migrated, two factual corrections applied (see below). |
| `src/content/index.ts` | Aggregates tool/guide content; `import … from './content'` unchanged for all consumers. |
| `src/content.ts` | **Deleted** (split into the `src/content/` folder). |
| `src/DynamicBlocks.tsx` | **New**: `popular-countdowns`, `days-from-today`, `today-weekday`, `current-week`, `leap-year-status`. |
| `src/App.tsx` | `seoTitle` per tool, new tool entry, rich block renderer, `RichText` internal-link parser, FAQ JSON-LD link stripping, seven technical corrections, `key={tool.slug}` on `ToolPage`. |
| `src/App.css` | `.seo-content h3/ul`, `.table-wrap` (scrollable data tables), `.note`, `.live-note`, multi-line result support. |
| `scripts/generate-route-html.mjs` | Titles aligned to the new `seoTitle` values; new `/calculators/days-calculator` shell (40 routes total). |
| `public/sitemap.xml` | New days-calculator URL; `lastmod` bumped to 2026-09-28 for every changed page. |
| `public/robots.txt`, `public/.htaccess`, `vercel.json` | `/docs/` disallowed, blocked from serving, and marked `noindex` (mirrors the existing `internal/` handling) so planning documents are never indexed. |

## Titles and meta descriptions

Titles are `seoTitle` (used for `<title>`, `document.title`, `og:title`, `twitter:title`); H1 remains the tool name; meta description is the page's direct answer (first ~150–190 characters).

| Page | New title |
| --- | --- |
| `/calculators/date-calculator` | Date Calculator — Add or Subtract Days From a Date |
| `/calculators/age-calculator` | Age Calculator — Calculate Exact Age in Years, Months, Days |
| `/calculators/days-between-dates` | Days Between Dates — Date Difference Calculator |
| `/calculators/days-calculator` (new) | Days Calculator — Days From Today, Before & Between Dates |
| `/calculators/add-days` | Add Days to Date — Calculate a Future Date in Days |
| `/calculators/subtract-days` | Subtract Days From Date — Calculate a Date in the Past |
| `/calculators/working-days` | Working Days Calculator — Count Business Days Between Dates |
| `/calendar/day-of-week` | Day of the Week Calculator — What Day Was or Will Be |
| `/calendar/week-number` | Week Number Calculator — Current ISO Week Number |
| `/calendar/leap-year` | Leap Year Calculator — Is This Year a Leap Year? |
| `/time/countdown` | Countdown Calculator — How Many Days Until a Date |
| `/time/time-difference` | Time Difference Calculator — Time Between Two Times |
| `/time/time-zone-converter` | Time Zone Converter — Convert Time Zones & UTC Offsets |

Static shell titles in `dist/**/index.html` were aligned with the client-side `routeSeo` values so crawlers that do not execute JavaScript see the same title as browsers.

## Page content and internal links

Each tool page now renders: direct answer (lead) → calculator → intro + "How to Use" steps → rich sections (paragraphs, subheadings, ordered/unordered lists, comparison tables, notes, live components) → related calculators → related guides → FAQs.

Word counts (including answer, intro, steps, all section text, tables, and FAQs):

| Page | Words | H2 sections | Tables | FAQs | Live components |
| --- | ---: | ---: | ---: | ---: | --- |
| age-calculator | 1,657 | 8 | 1 | 5 | 1 |
| date-calculator | 1,543 | 11 | 2 | 4 | — |
| days-between-dates | 1,344 | 8 | 3 | 5 | — |
| time-zone-converter | 1,333 | 9 | 1 | 5 | — |
| working-days | 1,136 | 7 | 2 | 5 | — |
| time-difference | 1,124 | 8 | 1 | 5 | — |
| days-calculator (new) | 1,107 | 8 | 1 | 4 | 1 |
| countdown | 1,189 | 7 | 1 | 5 | 1 |
| add-days | 1,189 | 8 | 2 | 4 | 1 |
| week-number | 905 | 6 | 2 | 5 | 1 |
| day-of-week | 872 | 6 | 1 | 4 | 1 |
| leap-year | 831 | 6 | 1 | 5 | 1 |
| subtract-days | 785 | 6 | 1 | 4 | — |

Internal linking: 38 contextual `[label](path)` links across 21 unique target URLs, all validated against the live route set — **0 broken**. Links are rendered as `.inline-link` anchors in body copy and FAQ answers, and stripped to plain text for FAQ JSON-LD so schema output contains no markup.

## Live components

| Component | Page(s) | Behaviour |
| --- | --- | --- |
| `popular-countdowns` | /time/countdown | Table of days until Christmas Day, New Year's Day, Valentine's Day, Independence Day (US), computed from the current date (next occurrence after today). |
| `days-from-today` | /calculators/days-calculator, /calculators/add-days | Offsets +7, +30, +60, +90, +100, +365 from today with date and weekday. |
| `today-weekday` | /calendar/day-of-week, /calculators/age-calculator | Today's weekday and date (frames "how old am I today" with the current date). |
| `current-week` | /calendar/week-number | Live ISO week number, week-year, and Monday–Sunday range. |
| `leap-year-status` | /calendar/leap-year | Current year leap status, day count, and next leap year. |

These cover the seasonal and "current" search intents (notably `days until christmas`, 95K) without creating event pages, as required by `internal/docs/KEYWORD-RESEARCH.md`.

## Technical corrections

Documented as minimum necessary fixes; each was verified against the calculator's own algorithms before and after the change.

1. **Age calculator — negative days edge case.** A single borrow produced negative day values (e.g. birth day 30/31 with a target in March returned "41 years, 1 months, -2 days"). Replaced with a bounded multi-borrow loop that takes days from successive previous months. Now returns "41 years, 0 months, 29 days"; all other tested results unchanged.
2. **Week number — ISO week off-by-one / "week 0".** `Math.ceil((dayGap(Jan 4, thursday)+1)/7)` returned week 0 for early-January dates and one week too low for others (28 Sep 2026 → 39). Replaced with `Math.floor(dayGap(Jan 1, thursday)/7) + 1`. Verified: 2026-01-01 → week 1 of 2026; 2026-09-28 → week 40; 2026-12-31 and 2027-01-01 → week 53 of 2026; 2025-12-29 → week 1 of 2026; 2026-06-15 → week 25.
3. **Time difference — minutes remainder.** `minutes % 6` displayed wrong minutes: 108 minutes returned "1 hours, 0 minutes" instead of "1 hours, 48 minutes", and 119 minutes returned "1 hours, 5 minutes" instead of "1 hours, 59 minutes". Now `minutes % 60`.
4. **Time zone converter — source zone was ignored.** Inputs were parsed as browser-local, so the "Source time zone" selector had no effect. Added `zoneOffset`/`zoneToUtc` (IANA `formatToParts` with a two-pass offset probe). Verified conversions: New York 09:00 → London 14:00 (Jan) and Tokyo 22:00 (Jul); London 09:00 GMT → Kolkata 14:30; London 09:00 BST → Kolkata 13:30; New York 22:00 → London 03:00 next day; identity preserved when source zone equals the device zone.
5. **Countdown — dead input removed.** The unused "Start date" field is gone; the remaining field is labelled "Target date". Measurement target unchanged (17:00 local on the target date) and now documented explicitly in the content.
6. **Working days — reversed range returned 0.** The weekday walk only ran forward from the first input. The range is now normalised (earlier/later), so date order no longer matters; the inclusive both-endpoints convention itself was left unchanged and documented.
7. **Tool state leaking between pages.** `ToolPage` is now keyed by tool slug, so calculator inputs no longer persist when navigating from one tool to another.
8. **Rich internal links — renderer bug.** The markdown-link splitter used `index % 4` instead of `index % 3`, which mis-linked the second and later links in a paragraph. Corrected and verified on multi-link, adjacent-link, and link-free text.

Content corrections (factual, not behavioural):

- `guides/how-to-calculate-age` claimed the calculator uses 28 February as the leap-day reference in common years. The calculator reaches the next birthday on 1 March (verified: 2000-02-29 → 2026-03-01 = 26 years, 0 months, 0 days; → 2026-02-28 = 25 years, 11 months, 30 days). The guide now states the 1 March behaviour and notes that other conventions differ by a day.
- Same guide: "35 years … roughly 12,775 to 12,776 days" corrected to 12,783–12,784 days (35 × 365 + 8 or 9 leap days).

## Structured data

- FAQ JSON-LD emitted for every tool page with FAQs (all 13), with markdown links stripped from answers.
- Existing guide HowTo, site-level FAQ, and BreadcrumbList graphs retained; breadcrumbs now derive clean names from the new titles (e.g. "Working Days Calculator").
- Canonical URLs unchanged in form (`https://datepilot.online/<path>/`).

## Validation performed

1. `npm run lint` (oxlint) — clean after every change batch.
2. `npx tsc -b` — clean (strict flags: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`).
3. `npm run build` — succeeds; 40 route shells generated, including `/calculators/days-calculator/`.
4. Static shell spot-checks — correct `<title>` (including em dash), canonical, and meta description for the new and retitled pages.
5. Logic test suites (42 assertions) — age examples (incl. leap-day and month-end fixes), ISO week examples, working-day counts (incl. reversed range), days-calculator offsets, time-difference durations, and 12 time-zone conversions: **all pass**.
6. Link audit over `src/content/*.ts` — 38 instances, 21 unique targets, **0 broken**.
7. Content QA — every tool page meets its word target (1,100–1,700 for the seven priority pages; 785–1,333 elsewhere); no markdown syntax leaks into `answer` fields used for meta/schema.

## Deliberately not done

- No seasonal or event pages (`days until christmas`, `days until new year`) — covered dynamically on `/time/countdown`, per `internal/docs/KEYWORD-RESEARCH.md`.
- No individual number-permutation pages (`56 days from today`) — the days calculator answers any number interactively.
- No separate business-days, UTC, GMT, or "time between two times" pages — consolidated as planned in the content map.
- Countdown target value (17:00 local) and the exclusive day-gap / inclusive weekday conventions were left as designed; they are now documented on-page rather than changed.

## Suggested next steps

1. Deploy and request indexing for `/calculators/days-calculator/` plus the retitled pages.
2. Re-export Ahrefs data in 4–6 weeks to check movement on the consolidated head terms.
3. Consider adding `FAQPage` rich results validation in Search Console once the pages are indexed.
