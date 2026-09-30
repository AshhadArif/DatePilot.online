# DatePilot SEO Implementation Report

Round 2 — Ahrefs-driven content expansion of the five priority keyword clusters.
Date: 2026-10-01. Branch: `main`.

## Data source

The brief's file path pointed at `google_us_best-phones-best-products_overview_2026-09-29_00-11-45.csv`, which contains phone/product-comparison keywords only. The file whose September 2026 values match the brief exactly (15,079 / 11,485 / 590 / 307 / 267) is `my_1ecd991ba21f408e8dc2a22bdd341b64_search-volume-history_2026-10-01_01-42-31.csv`, a monthly US volume history for October 2025 – September 2026. That file was used for all cluster volumes and trends below. Related-keyword metrics (KD, traffic potential, parent topic) come from the real DatePilot overview export `google_us_add-days-to-a-date-age-in_overview_2026-09-28_23-05-32.csv`. No metric was invented; anything absent from the history file is recorded as N/A in the content map.

## Pages audited

- All 13 tool pages, 14 guide pages, 4 index pages, 6 trust/legal pages, home and FAQ — 40 routes, each checked for title, meta description, H1, canonical, sitemap presence, and internal links.
- Deep content audit against the brief's required structures for the three priority pages: `/calculators/age-calculator`, `/calculators/date-calculator`, `/calculators/days-between-dates`.
- Existing SEO titles, meta descriptions, H1/H2/H3 hierarchy, FAQ sections, related-tool rails, breadcrumb and structured data reviewed as-is.

## Pages changed

| Page | File | Change |
| --- | --- | --- |
| /calculators/age-calculator | `src/content/age.ts` | 4 new H2 sections, 1 renamed, 1 merged, 3 new mistake bullets, internal links expanded |
| /calculators/date-calculator | `src/content/dates.ts` | New "Leap Years and Date Calculations" H2 section |
| /calculators/days-between-dates | `src/content/dates.ts` | Inclusive/exclusive split into its own H2, 2 new example rows, Subtract/Add links added |
| docs/DATEPILOT-AHREFS-CONTENT-MAP.md | — | Priority-cluster table with the brief's required columns + 12-month history table |
| docs/DATEPILOT-SEO-IMPLEMENTATION-REPORT.md | — | This report (new file) |

No calculator logic, layout, or route was modified. No new pages were created.

## Keywords mapped

| Keyword | Latest volume (Sep 2026) | Trend (Oct 2025 → Sep 2026) | Target page | Action taken |
| --- | ---: | --- | --- | --- |
| age calculator | 15,079 | +8.2% | /calculators/age-calculator | Expanded (Priority 1) |
| date calculator | 11,485 | −2.1% | /calculators/date-calculator | Expanded (Priority 2) |
| age calculator by date of birth | 590 | +220.7% | /calculators/age-calculator | Dedicated H2 section, no new page |
| days between dates | 307 | −3.5% | /calculators/days-between-dates | Expanded (Priority 3) |
| calculate age | 267 | +23.6% | /calculators/age-calculator | Integrated naturally, no new page |

Cluster total: 28,426 (Sep 2026), +5.8% vs Oct 2025. Full monthly history and per-keyword notes are in `docs/DATEPILOT-AHREFS-CONTENT-MAP.md`.

## Content added

### Age Calculator (1,657 → 2,757 words; 11 content H2s + auto "How to Use" + FAQ)

- **New:** "What Is an Age Calculator?" — concept, real use cases, the two inputs.
- **New:** "Calculate Age From Date of Birth" — 4 numbered steps plus edge cases: future birth date (exact error message quoted from the code: "The target date must be after the birth date"), leap-day birthdays, historical dates, partial dates.
- **New:** "Age Calculation and Leap Years" — Gregorian leap rules, 29 February birthdays, why day-count shortcuts drift (9 or 10 leap days per 40-year span), links to the Leap Year tool and guide.
- **New:** "Exact Age vs Approximate Age" — definitions, both common shortcuts with worked reasoning, when each is acceptable; absorbs the previous "Age in Years, Months, and Days" section to avoid duplication.
- **Renamed:** "How the Age Calculator Works" → "How Age Is Calculated" (matches the brief's structure; methodology content unchanged).
- **Common Mistakes:** added date-format ambiguity (03/04/2026), mistyped birth year, and future birth date bullets.
- Page word count 2,757 — the strongest page on the site, per Priority 1.

### Date Calculator (1,543 → 1,811 words; 12 content H2s)

- **New:** "Leap Years and Date Calculations" — 366 vs 365 day spans (1 Mar 2023 → 1 Mar 2024 = 366 days; 1 Mar 2024 → 1 Mar 2025 = 365), the +30-days-from-1-February examples (2 Mar 2024 vs 3 Mar 2025), century rule (2000 leap, 2100 not).
- Required structure items "What Is a Date Calculator?", "How the Date Calculator Works", "How to Use", after/before-days sections, examples, common mistakes, FAQs and related tools already existed and were verified rather than duplicated.

### Days Between Dates (1,344 → 1,610 words; 9 content H2s)

- **New H2:** "Inclusive vs Exclusive Date Counting" — the convention table and "which one do I need?" guidance moved out of the how-to section into their own section after the examples, as the brief requires.
- **Examples:** now 8 rows covering all four required categories — same month, different months, different years, leap year — including the two new rows (1 Feb 2024 → 1 Mar 2024 = 29 days; 1 Dec 2025 → 1 Mar 2026 = 90 days), all verified against the actual algorithm.
- **Links:** added Subtract Days From Date and Add Days to Date to "More Ways to Compare Two Dates".

## Title and meta description changes

None were needed; the existing titles were audited and kept:

| Page | Title (in `seoTitle` and the static shell) | Chars |
| --- | --- | ---: |
| age-calculator | Age Calculator — Calculate Exact Age in Years, Months, Days | 59 |
| date-calculator | Date Calculator — Add or Subtract Days From a Date | 50 |
| days-between-dates | Days Between Dates — Date Difference Calculator | 47 |

The brief's example titles ("Age Calculator — Calculate Your Exact Age", etc.) were deliberately not copied: the current titles already front-load the primary keyword, carry the secondary terms the examples drop (years/months/days; add/subtract; date difference), and are identical between the 40 static shells and the runtime `routeSeo` (verified: all 13 tool seoTitles match the generator's strings, all 40 shell titles and 40 descriptions unique).

Meta descriptions remain the per-page `answer` strings — unique on every page, primary topic in the first sentence, no markdown links (verified across all 13 tools). They double as the visible lead paragraph under each H1, which is why they are kept at 1–2 full sentences rather than trimmed to 155 characters.

## Internal-link improvements

- Age Calculator now links in content to all seven targets the brief lists: Date Calculator, Days Between Dates, Add Days to Date, Subtract Days From Date, Working Days, Day of Week, Week Number (plus countdown and two guides). Related-tool cards switched to `[date-calculator, days-between-dates, add-days, working-days]` (the rail renders four).
- Days Between Dates now also links Subtract Days From Date and Add Days to Date.
- Date Calculator already linked all five required targets; unchanged.
- Audit result: 22 unique internal link targets across all tool content, **0 broken** (checked against the 40 generated route shells), no markdown links leaking into meta descriptions.

## Technical SEO verification

- Titles, meta descriptions, canonicals: 40 unique titles, 40 unique descriptions across the 40 static shells; all match the runtime values.
- H1: one per page, the tool name; no page changed its H1.
- Sitemap: 40 URLs, exactly matching the 40 generated routes (no changes this round — no new URLs).
- Robots: no noindex on any tool or guide page; `/docs/` remains blocked in `robots.txt`, `.htaccess`, and `vercel.json`.
- Structured data: FAQ JSON-LD and WebApplication JSON-LD unchanged and link-free (plain text after stripping).
- Mobile responsiveness, page speed, and accessibility: no CSS or component changes this round; nothing to re-audit.

## Duplicate / cannibalization issues found and handled

- `age calculator by date of birth` and `calculate age` received **no pages** — both are the same intent as `age calculator`. The DOB intent now has its own H2 section; `calculate age` appears naturally in the intro, how-to, methodology, and FAQ.
- "Exact Age vs Approximate Age" replaced a near-duplicate section ("Age in Years, Months, and Days") whose content overlapped it almost entirely.
- The year-only-birth-date bullet was removed from the new DOB section because "How Old Am I?" already covers it with a worked example.
- No keyword-permutation pages, no seasonal pages, no `/age-calculator-2026/`-style URLs exist or were created.

## Issues intentionally not changed

- **H1 of Days Between Dates** — the brief suggests "Days Between Dates Calculator"; the H1 stays "Days Between Dates" because the tool name drives the nav label, breadcrumbs, and related-card labels across the site, and the title tag already carries "Calculator" ("… — Date Difference Calculator"). Changing the H1 would churn the UI for no ranking gain.
- **Calculator behavior** — exclusive endpoint counting, Mon–Fri inclusive working days, and the countdown's 17:00 local convention all remain as documented in the previous round's report; the content explains the conventions rather than altering them.
- **Thin programmatic pages** — still intentionally not created (see the content map's "Pages not created, and why" table).

## Tests performed

| Check | Result |
| --- | --- |
| `npm run lint` (oxlint) | Pass, no warnings |
| `npx tsc -b` | Pass, no errors |
| `npm run build` (tsc + vite + shell generation) | Pass, 40 route shells generated |
| Content QA script (esbuild-bundled content import) | Age 2,757 / Date 1,811 / Days Between 1,610 words; 22 unique links; 0 broken; no markdown in answers |
| Example verification (Node, UTC-safe) | All 8 days-between rows + inclusive column; leap spans 366/365; 90-day and 29-day rows; +30-day leap examples; all 7 weekday claims in the date-calculator table |
| Title/description uniqueness (40 shells) | 40 unique titles, 40 unique descriptions |
| seoTitle ↔ shell title match | 13/13 tool titles identical |
| Calculator regression | No calculator code changed this round; the previous round's 42-assertion suite and manual test results still apply |

## Remaining recommendations

1. Merge the open PRs (`bazminoadsense/DatePilot.online#4`, `AshhadArif/DatePilot.online#1`), deploy, then submit `https://datepilot.online/sitemap.xml` in Search Console and request indexing for the priority URLs.
2. Track the five cluster terms in Search Console over the next 4–8 weeks; `age calculator by date of birth` grew +220.7% year-over-year and may deserve a FAQ entry expansion if impressions stall.
3. Optional: extend the FAQ set on `/calculators/date-calculator` from 4 to 5 questions if PAA data surfaces new unaddressed questions.
