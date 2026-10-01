# DatePilot New Page Implementation Report (Round 3)

Date: 2026-10-01
Scope: expand DatePilot.online with new date/time tools and SEO pages, strictly on justified keywords. Research and classification details live in `DATEPILOT-NEW-PAGE-RESEARCH.md`; the site baseline audit lives in `DATEPILOT-EXISTING-SITE-AUDIT.md`.

## Classification summary (A–J)

| ID | Candidate | Decision | Reason |
|----|-----------|----------|--------|
| A | business-date-calculator | BUILD | `business days calculator` 3,200/mo KD0, `calculate business days` 500/mo KD35 (Ahrefs 2026-09-28); distinct add/subtract job vs existing working-days count |
| B | days-until | DO NOT BUILD | Cannibalizes days-calculator (`days from today` 2,500/mo) and countdown; consolidation rules #41/#42 |
| C | weeks-between | DO NOT BUILD | `weeks between two dates` #14 in consolidation plan — folded into days-between as a result line + section |
| D | months-between | DO NOT BUILD | #15 consolidation — folded into days-between/date-calculator with an explicit ambiguity section |
| E | age-difference-calculator | BUILD | Two-DOB queries are unanswered by the single-person age calculator; no owned page targets the gap |
| F | time-since-calculator | BUILD | `how many days since` 11,000/mo parent cluster; live elapsed-time gap vs date-only days-between |
| G | date/time-diff | DO NOT BUILD | Covered by time-difference and days-between; would be a third URL for one intent |
| H | work-hours-calculator | BUILD | Shift-with-breaks job not covered by time-difference (`time between two times` 13,000/mo KD12 adjacent) |
| I | holiday-calendar | CONDITIONAL (deferred) | #25 — needs an owned holiday dataset before publishing; no thin-content stub shipped |
| J | days-from-today | DO NOT BUILD | days-calculator already answers it with a dedicated section |

Metrics marked "N/A" in the research doc were absent from the Ahrefs export and were never invented; E/F/H rest on SERP gap analysis plus cannibalization guards.

## Pages shipped (4 new tools, 4 new URLs)

| Route | SEO title (≤60 chars) | Words | H2s | FAQs |
|-------|----------------------|-------|-----|------|
| `/calculators/business-date-calculator/` | Business Date Calculator — Add or Subtract Business Days (55) | 1,318 | 8 | 5 |
| `/calculators/age-difference-calculator/` | Age Difference Calculator — Gap Between Two Birth Dates (55) | 1,373 | 8 | 5 |
| `/time/time-since-calculator/` | Time Since Calculator — Elapsed Time From a Date (48) | 1,116 | 8 | 5 |
| `/time/work-hours-calculator/` | Work Hours Calculator — Shift Duration With Breaks (49) | 1,396 | 8 | 5 |

All four exceed the 800-word target. Every page states its conventions in text (Mon–Fri, no holidays; anniversary-based gap; exclusive endpoints where relevant; unpaid breaks, overnight shifts) and carries a verified example table.

## Pages consolidated (existing URLs updated)

| Page | Change | Words after |
|------|--------|-------------|
| days-between-dates | New result lines (weeks+days, y/m/d, total months), new section "Weeks, Months, and Years Between Dates", new weeks FAQ (#14) | 2,002 |
| date-calculator | New section "Why 'Months Between Dates' Is Ambiguous" + months FAQ (#15) | 2,084 |
| working-days | Inline link to business-date-calculator, related-tools updated | 1,221 |
| countdown | Inline link to time-since-calculator, related updated | 1,277 |
| time-difference | Inline links to work-hours/time-since, related updated | 1,211 |
| age-calculator | Inline link to age-difference-calculator, related updated | 2,774 |

## Cannibalization guards implemented

- Business Date (move a date by weekdays) vs Working Days (count weekdays in a range) — cross-linked, different jobs stated on both pages.
- Time Since (live elapsed time from a past moment) vs Days Between (date-only gap) vs Time Difference (two fixed clock moments) — each page names the other two.
- Age Difference (two birth dates, either order) vs Age Calculator (one person to a target date).
- Work Hours (breaks, decimal hours, overnight) vs Time Difference.

## Verified calculation checks

Harness `%TEMP%\opencode\verify-round3.mjs` mirrors app logic — **ALL PASS (26 checks)**:

- Business date: 1 Oct 2026 +10 → Thu 15 Oct (span 14); −5 → Thu 24 Sep (span 7); Fri 30 Jan +1 → Mon 2 Feb (span 3); +0 → unchanged; 1 Jan +10 → Thu 15 Jan (span 14).
- Days between: 2023-06-23 → 2025-09-25 = 825 days = 117 weeks + 6 days = 2y 3m 2d = 27 months 2d; reversed/same-date/leap-span/year-boundary rows all match.
- Age difference: 1990-05-15 & 1995-09-28 = 5y 4m 13d, 1,962 days; leap-day 2024-02-29 & 2026-03-01 = 2y 0m 0d, 731 days.
- Work hours: 09:00–17:00 −30 = 7h30m (7.50); 22:00–06:00 overnight = 8.00; same-time and break≥shift rejected.
- Time since (fixed ref 1 Oct 2026 10:30): since 1 Sep 2026 = 1 month / 30 days 10h 30m; 10-year row = 3,652 days.

## Internal linking

27 unique internal link targets, **0 broken**. Each new page has at least one inline prose link and one `related`-array inbound:

- business-date-calculator ← working-days (inline + related)
- age-difference-calculator ← age-calculator (inline + related)
- time-since-calculator ← countdown (inline + related), days-between (related)
- work-hours-calculator ← time-difference (inline + related)

## Technical SEO

- `scripts/generate-route-html.mjs`: 4 new shells → **44 route HTML shells generated**; every title/description unique, ≤160 chars, and shell title matches the tools-array `seoTitle` (17/17).
- `public/sitemap.xml`: 40 → **44 URLs**; new entries dated 2026-10-01; touched pages (working-days, time-difference, countdown, `/time/`, `/calculators/`) bumped to 2026-10-01.
- Vercel/Apache catch-all rewrites unchanged — no per-route config needed.

## Tests performed

| Gate | Command | Result |
|------|---------|--------|
| Lint | `npm run lint` (oxlint) | PASS, no warnings |
| Types | `npx tsc -b` | PASS |
| Build + shells | `npm run build` | PASS, 44 shells, bundle 456.25 kB / 132.96 kB gzip |
| Calculation harness | `node verify-round3.mjs` | ALL PASS (26 checks) |
| Content QA | esbuild bundle + `qa-content.mjs` | 17 pages, all new pages ≥1,116 words, 0 broken links, no markdown in answers |
| Shell/sitemap QA | `qa-shells.mjs` | 9/9 PASS (unique titles/descriptions, ≤160 chars, seoTitle match, sitemap 44/44, new entries dated) |

## Intentionally not built

Days-until, weeks-between, months-between, date/time-diff, days-from-today (consolidation rules #14/#15/#41/#42 and existing coverage), holiday calendar (deferred until an owned holiday dataset exists).

## Recommendations

1. Submit the 4 new URLs in Google Search Console and monitor `business days calculator` (KD0 — fastest win) first.
2. Build a holiday dataset per target country before attempting candidate I; until then the working-days pages correctly state holidays are not removed.
3. If the time-since page ranks for `how many days since`, add Search Console sitelinks pointing at days-between to keep the two intents separated.
4. Round 4 candidates: expand work-hours into payroll/timesheet variants only if round-3 pages show impressions; revisit days-until only with a countdown-specific angle that cannot cannibalize days-calculator.
