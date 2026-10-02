# DatePilot New Tools Implementation — Round 4

Date: 2026-10-02
Scope: 5 new tools, 1 new category hub, 2 content expansions, internal-link network, technical SEO, full test pass. Research decisions in `DATEPILOT-NEW-OPPORTUNITY-RESEARCH.md`; audit in `DATEPILOT-EXPANSION-AUDIT.md`.

## A. What shipped

| Tool | Route | Category | Target keywords (cluster) |
|------|-------|----------|---------------------------|
| Recurring Date Calculator | /calculators/recurring-date-calculator/ | Date | recurring date calculator, recurring dates calculator, date schedule generator |
| Deadline Calculator | /calculators/deadline-calculator/ | Date | deadline calculator (5,600/mo KD7), deadline date calculator, deadline planner, reverse deadline calculator |
| Quarter Calculator | /calendar/quarter-calculator/ | Calendar | quarter calculator (TP 34,000), quarter date calculator, fiscal quarter calculator |
| Day of Year Calculator | /calendar/day-of-year/ | Calendar | days left in year (600/mo), days remaining in year, day of year calculator |
| Date Format Converter | /converters/date-format-converter/ | Convert (new) | date format converter, iso date converter (TP 3,500), date format calculator, calendar date converter |
| Date Conversion hub | /converters/ | Convert (new) | category hub (navigation + internal link target) |

Content expansion (no new URL, per cannibalization rule): "How Many Business Days Are in a Year?" section on /calculators/working-days/ covering `work days in a year` (5,800/mo) + `business days in a year` (1,200/mo) with a verified 2024–2029 weekday table (2024: 262, 2025: 261, 2026: 261, 2027: 261, 2028: 260, 2029: 261 — computed programmatically, not assumed).

Rejected (from research doc): shift schedule calculator, payroll calendar calculator, standalone ICS generator page — ICS export ships inside the recurring tool instead.

## B. Recurring Date Calculator

- Inputs: first date; interval unit (days/weeks/months/years/selected weekdays); interval ≥1; 1–100 dates; optional stop date; month-end rule (clamp last day / skip month) for months & years; weekday checkbox picker (defaults Mon–Fri) for weekday mode.
- Every occurrence is computed from the original anchor (no cumulative drift). Month-end `skip` re-walks the anchor day until a month contains it (bounded by a 100-year guard).
- Outputs: scrollable date list with weekdays, first/last summary, and **Download CSV** (date,weekday) + **Download .ics** (valid VCALENDAR/VEVENT all-day events, UID/DTSTAMP/DTSTART/DTEND, escaping per RFC 5545 basics) built client-side.

## C. Deadline Calculator

- One page, two modes: forward (start + duration → deadline) and backward (deadline − duration → latest start).
- Count basis: calendar days or business days (shared Mon–Fri walk, holidays never assumed).
- Result shows the date with weekday plus the calendar-day span for business-day moves; buffer guidance in content.

## D. Quarter Calculator

- Mode 1 (date → quarter): fiscal start month (12 options), returns quarter number, fiscal-year label (year the quarter ends), start/end dates, total/elapsed/remaining days, % elapsed.
- Mode 2 (quarter → dates): quarter + fiscal year + start month → boundaries, day count, boundary weekdays.
- Math: `offset=(m-S+12)%12; q=floor(offset/3)+1; fyStart= m<S ? y-1 : y; start=Date(fyStart, S-1+(q-1)*3, 1); end=Date(fyStart, S-1+q*3, 0)` — verified for calendar, fiscal-October, and fiscal-April anchors.

## E. Day of Year Calculator

- Ordinal day, total (365/366), days remaining (date counted as used), % complete/remaining, leap status, and weekdays remaining after the date (exclusive of the date itself).

## F. Date Format Converter

- Accepts ISO, ISO datetime, compact YYYYMMDD, slash/dot/dash numerics, `Month D, Y`, and `D Month Y`.
- Explicit order control: auto / day-first / month-first / ISO-only. Auto resolves provable inputs (13/04, 04/13, equal numbers) and **flags ambiguity instead of guessing** (03/04/2026 → error asking for order; placeholder resolution is day-first, matching the en-GB site convention).
- Output: resolved long form + weekday, then a table of ISO 8601, US, European, year-first, compact, long, short, US month-name, and weekday-long variants. Invalid calendar dates (31 Feb) rejected, never rolled over.

## G. Shared code and wiring

- **New `src/dateUtils.ts`** — single source for existing helpers (moved verbatim from App.tsx: today/localDate/prettyDate/weekday/shiftDays/dayGap/unit/decompose/zoneOffset/zoneToUtc) plus new utilities: `isWeekday`, `addBusinessDays`, `countBusinessDays` (exclusive of start), `addMonthsClamped`, `generateOccurrences`, `quarterInfo`, `quarterDates`, `yearInfo`, `parseDateInput`/`formatVariants`, `toCsv`, `buildIcs`, `downloadText`.
- **New `src/NewTools.tsx`** — the five components, styled with the existing calculator/form/result classes plus four small CSS additions (`.date-list`, `.export-actions`, `.weekday-pick`, `.method-note`).
- **App.tsx** — 5 tools added to the `tools` array (22 total); `'Convert'` category added to the Tool type, `toolPath`, ToolIndex (title/explanation/breadcrumb), routeSeo (`/converters` hub entry), App route dispatch, header nav ("Converters"), footer Explore column; Calculator dispatch branches for the five slugs; `BusinessDateCalculator` now uses the shared `addBusinessDays` (behaviour unchanged, regression-tested).
- Route shells: 6 routes added to `scripts/generate-route-html.mjs` → **50 shells**; titles match `seoTitle` exactly, descriptions ≤160 chars.
- Sitemap: **50 URLs**; new entries lastmod 2026-10-02; content-touched pages bumped to 2026-10-02 (no future dates).

## H. Content and internal links

- Five new `ToolContent` entries (824–1,124 words each): recurring 1,124 · deadline 1,034 · quarter 899 · date-format 843 · day-of-year 824. Each has answer, intro, howTo, 6–7 sections (tables/examples/steps), 3 guides, 4 related tools, 5 FAQs. No `**bold**`; answers contain no markdown links.
- working-days expanded 1,221 → 1,569 words with the business-days-per-year section (2026/2027 = 261 weekdays stated with method: 52×5=260 + extra weekday-beyond-weeks rule; leap-year variability explained — 2028 is 260, not 262).
- Old → new backlinks added: date-calculator, days-between-dates, days-calculator, subtract-days (FAQ), countdown, working-days (section + related + guide), leap-year/week-number (related + guides), date-time-formats guide (toolSlugs), plus FAQ/schema untouched.
- New → old links in every new page (related arrays + "Related Tools" prose). Verified bidirectionally by QA (16 explicit pairs).

## I. Tests and verification (all green)

| Gate | Result |
|------|--------|
| `npm run lint` (oxlint) | pass (0 warnings) |
| `npx tsc -b` | pass |
| `npm run build` | pass — 50 shells, bundle 513 kB / 149 kB gzip |
| `verify-round4.mjs` (66 checks against the **real transpiled `src/dateUtils.ts`**) | ALL PASS — business-day walk, deadline both directions, recurrence (7 rule cases + stop date), quarter math (4 anchor cases), day-of-year incl. weekdays-remaining, parser (15 cases), format variants, CSV/ICS structure, helper regressions |
| `verify-round3.mjs` (26 checks, existing calculators) | ALL PASS — full regression of business-date, days-between, age-difference, work-hours, time-since result strings |
| `qa-content.mjs` | ALL PASS — 22 pages, new pages ≥800 words, working-days section gate, 16 bidirectional link checks, 0 broken links (33 unique targets), no markdown links in answers |
| `qa-shells.mjs` | ALL PASS — 50 unique titles/descriptions, all ≤160 chars, 22/22 seoTitle↔shell, 50/50 sitemap, hub shell, lastmod checks |

### Bugs found and fixed during testing

1. `inside()` stop-date comparison inverted in `generateOccurrences` — series ended after the first date (caught by the stop-date test).
2. `parseDateInput` explicit day-first/month-first orders were swapped — `03/04/2026` with day-first returned March 4 (caught by the parser tests; auto-detect was accidentally correct).
3. `yearInfo` double-subtracted the current weekday from weekdays-remaining (caught while deriving test expectations).
4. Month-end `skip` originally recursed on clamped dates (losing the anchor day, e.g. 31 Jan → 28 Feb → 28 Mar…) — rewritten to re-anchor every step.

## J. Files changed

- `src/dateUtils.ts` (new), `src/NewTools.tsx` (new)
- `src/App.tsx` (imports, tools, category, dispatch, nav/footer, ToolIndex/routeSeo)
- `src/App.css` (4 component blocks)
- `src/content/dates.ts` (+3 entries, 4 backlink edits), `src/content/calendar.ts` (+2 entries, 2 related swaps), `src/content/work.ts` (new section, FAQ, related), `src/content/time.ts` (countdown backlink + related), `src/content/guides.ts` (4 toolSlugs)
- `scripts/generate-route-html.mjs` (+6 routes), `public/sitemap.xml` (44 → 50)
- `docs/DATEPILOT-EXPANSION-AUDIT.md`, `docs/DATEPILOT-NEW-OPPORTUNITY-RESEARCH.md`, `docs/DATEPILOT-NEW-TOOLS-IMPLEMENTATION.md`

## K. Recommendations for the next round

1. Submit the 6 new URLs in GSC and monitor the `deadline calculator` cluster first (highest volume, KD 7).
2. Only if the day-of-year page ranks: split `days left in year` into its own page (currently one page, two intents).
3. Data-driven follow-ups from the same Ahrefs export: `days in a year calculator` (10/mo) is not worth a page; revisit shift/payroll only with better TP data.
4. Consider code-splitting the bundle (build warning at >500 kB) — the five new components are natural lazy-load candidates.
5. If holidays become a real request, a holiday-calendar toggle (region picker) would extend business-day tools without new URLs.
