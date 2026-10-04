# DatePilot.online — AdSense Pre-Application Final Audit

**Site:** https://datepilot.online
**Audit date:** 4 October 2026
**Scope:** full pre-application audit of the site as built from this repository, remediation of every issue that could reasonably be fixed in code/content, re-test, and final scoring.
**Companion document:** `docs/ADSENSE-CURRENT-POLICY-SOURCES.md` (official Google sources, URLs, date checked, requirement, application to this site, limitations).

> **This document does not estimate, imply, or invent any AdSense approval probability.** The score below is an *internal engineering and editorial readiness score* invented for this project's own use. Google publishes no score, no numeric thresholds (no minimum word count, page count, or traffic figure), and no pre-approval review. See section 9 for what the score excludes.

---

## 1. Verdict

**Internal readiness score: 89 / 100**

| # | Area | Weight | Score | Reason for deduction |
|---|------|--------|-------|----------------------|
| 1 | Content quality and originality | 25 | 22 | 22 tool pages (≈824–1,000+ words each) and 14 guides (≈240–460 words each) of original copy; factual errors corrected. Guides remain moderately short; no audience/engagement evidence exists (no analytics installed) to demonstrate the eligibility requirement that content "attracts an audience". |
| 2 | Technical SEO and indexability | 20 | 18 | Per-route titles/descriptions/canonicals/OG tags, static JSON-LD on 50/50 routes, sitemap generated from a single source of truth, real `404` via `ErrorDocument`. Deduction: soft-404 removal and redirect behaviour verified locally/config-side only — must be re-verified on the live host after deployment; sitemaps not yet submitted to Google/Bing (property ownership/API not available in this session). |
| 3 | Navigation and user experience | 15 | 14 | Header + footer menus, breadcrumbs, related tools/guides, tool search with `?query=` deep links, ⌘K/Ctrl+K, live result counts, mobile menu, skip link, working 404 with recovery links. Deduction: no usage data to validate findability; keyboard flows spot-checked only. |
| 4 | Trust, transparency, policy pages | 15 | 13 | Privacy Policy, Cookie Policy, Terms, Disclaimer, About (incl. accuracy method), Contact, Report an Error, FAQ — all rewritten to describe actual current behaviour (no cookies, no analytics, no ads, local processing, self-hosted fonts), plus visible "Last reviewed" dates. Deduction: contact mailbox existence cannot be verified from the repo; policies will require updating the moment ad code or analytics are added. |
| 5 | Performance and assets | 10 | 8 | Fonts self-hosted (10 subsets, 121 kB), 1200×630 social image, no third-party runtime requests at all, CSS 4.0 kB gzip. Deduction: single JS chunk of 509.7 kB raw / 146.8 kB gzip (no route-level code splitting); server compression and cache headers live outside the repo and are unverified here. |
| 6 | Accessibility | 10 | 9 | Computed-contrast audit across 6 page types: **401 text elements checked, 0 WCAG AA failures** (worst ratio 4.70), skip link, labelled inputs, `aria-live` results and result counts, `aria-expanded` menu, `tabIndex="-1"` mains, `prefers-reduced-motion` support. Deduction: no automated axe-core run; manual/programmatic checks only. |
| 7 | Automated verification | 5 | 5 | 19 passing tests (`npm test`), `oxlint` clean, `tsc` build clean, 40/40 rendered-page assertions passing, 50/50 JSON-LD blocks parse. |
| | **Total** | **100** | **89** | |

---

## 2. What was fixed in this session

### 2.1 Critical / high impact

| Issue | Fix | Where |
|-------|-----|-------|
| **Soft 404**: unknown URLs returned HTTP 200 with the homepage shell | SPA fallback removed; `ErrorDocument 404 /404.html` added; `dist/404.html` generated with `noindex`, no canonical, no `og:url`, branded title and recovery links | `.htaccess`, `public/.htaccess`, `scripts/generate-route-html.mjs` |
| `vercel.json` catch-all rewrite re-introduced 200 soft-404s (harmless on Hostinger, still wrong) | `rewrites` emptied; HTTPS redirect + headers kept | `vercel.json` |
| `today()` returned the **UTC** date, not the visitor's local date | local calendar date, zero-padded `YYYY-MM-DD` | `src/dateUtils.ts` |
| Recurring-date weekday mode ignored the interval field | whole-week spacing (`week % interval === 0`), interval always visible in the UI, method note explains week-based spacing for weekday mode | `src/dateUtils.ts`, `src/NewTools.tsx` |
| Privacy Policy / Cookie Policy described behaviour the site did not have | rewritten to current reality (no cookies, no analytics, no ads; local processing; self-hosted fonts; hosting request logs; conditional third-party/advertising disclosures incl. `policies.google.com/privacy/partners`) | `src/App.tsx` (TrustPage) |
| No social preview image | 1200×630 `og-image.png` generated and wired into `index.html` + client SEO (PNG refs, width/height/alt, `twitter:image:alt`) | `public/og-image.png`, `index.html`, `src/App.tsx` |
| Google Fonts `@import` = third-party request on every load | fonts self-hosted (10 woff2 subsets) with `@font-face` CSS; preconnects removed | `public/fonts/`, `src/fonts.css`, `src/index.css`, `index.html` |
| 7 guide `toolSlugs` pointed at non-existent tools | replaced with real tool slugs; guards added so invalid `relatedTools` can never render | `src/content/guides.ts`, `src/App.tsx` |
| **Encoding corruption (mojibake)** introduced into `index.html`, `src/App.tsx`, `scripts/generate-route-html.mjs` by an ANSI-encoded write | repaired to byte-identical content vs `HEAD` (verified by non-ASCII character-set comparison); zero mojibake across all of `dist/` | those three files |

### 2.2 Functional and usability

- `add-days`, `subtract-days`, and `date-calculator` now validate `NaN` input, negate correctly for subtraction, **support a Days/Weeks/Months/Years unit selector** with end-of-month clamping, and print the resulting weekday.
- Deadline Calculator gained a **safety-buffer (calendar days)** input, applied in the chosen direction and shown as a third result line.
- Tool index pages gained **search** (`type="search"`, `?query=` deep links, live filtering, always-visible `aria-live` result count, empty-state help) and **⌘K/Ctrl+K** to jump to it.
- Countdown result now states its target explicitly ("…until 17:00 on 4 October 2026, your local time"), validates the input, and no longer reports "That date has passed" when only the 17:00 target has passed.
- `<Calculator key={tool.slug}>` prevents result/form state leaking between tool pages; `go()` strips `?query` for routing while keeping the URL for the search field.
- Header "Find a tool" and hero finder are labelled, with the finder marked `type="search"` and given an `aria-label`.
- Visible **"Last reviewed: 4 October 2026"** line on tool, guide, index, and legal/trust pages.
- Contact details corrected to what the operator actually controls: Contact and Report an Error now display **`bazminoadsense2@gmail.com`** (as a `mailto:` link) instead of the previously hard-coded `support@datepilot.online`, the advertised mailbox is defined once in code (`CONTACT_EMAIL`), and the About page states who operates the site (**Fahad**) so the site identifies its publisher to visitors and reviewers.

### 2.3 Content accuracy corrections (examples verified by recomputation)

- "four months have 31 days" → **seven**.
- "15 October 2026 (Wednesday)" → **Thursday** (verified: 1 Oct 2026 is a Thursday).
- Leap-day frequency "roughly four times per century" → **about 24 times every century** (97 leap years per 400-year cycle, ≈24.25 per century).
- Quarter-length claim corrected (Q1 is 90 days in a common year, 91 in a leap year; Q3 and Q4 are 92 in both) and the false "quarter boundaries never repeat a weekday" claim corrected (1 April and 1 July 2026 are both Wednesdays, because a three-month span shifts by 90, 91, or 92 days).
- Missing-space typo fixed ("covers1 October 2026").
- "roughly two fifths of the calendar days" → "about two days in seven".
- Duplicated Age Calculator how-to replaced with the manual calculation method; duplicated working-day FAQ answers differentiated per tool.
- Deadline/date-calculator "how to" text rewritten to match the new unit selector and weekday result.
- Recurring-date example reworded so the weekday filter is described accurately.
- Four thinnest guides gained a genuinely useful extra section (UTC/GMT and UK summer time, machine-readable timestamps, the anchor method for weekdays, the international date line).

### 2.4 Metadata, structured data, sitemap

- Single source of truth `src/content/lastmod.ts` (50 routes) drives: **static JSON-LD** emitted into every shell (`WebApplication` / `Article` / `WebPage` + `dateModified` + `WebSite`/`SearchAction` on home), the visible "Last reviewed" line, and the generated `dist/sitemap.xml`. A test fails if any route lacks a date or the sitemap drifts from the map.
- `public/sitemap.xml` (hand-maintained, prone to drift) removed; the build now writes `dist/sitemap.xml`.
- Static `404.html` no longer emits JSON-LD, canonical, or `og:url`; client-side SEO adds `noindex, follow` on unknown paths and `index, follow` + canonical otherwise.
- Guide meta descriptions are now unique per guide (14 descriptions) instead of a shared fallback.
- `index.html` gained `og:image:width/height/alt`, `twitter:image:alt`, and a `<noscript>` block with the site description and links to five sections plus trust pages.

### 2.5 Design, performance, cleanup

- Accent colour split: `--accent-ink: #b04a24` for text/links (5.22 on paper, 5.45 on white, 4.57 on footer), `--accent` retained for decorative strokes; hero eyebrow on yellow overridden to teal (6.05).
- Unused assets deleted: `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`; `og-image.svg` kept as a source file but no longer deployed.
- Footer claim reworded to a statement that stays true after ads are added ("Your inputs stay in your browser").
- `dateModified` added to structured data; robots.txt verified (`Allow: /`, `Disallow: /internal/`, `Disallow: /docs/`, sitemap line).

---

## 3. Verification evidence (all run 4 October 2026)

| Check | Command / method | Result |
|-------|------------------|--------|
| Type check + build | `npm run build` | ✅ 50 route shells + `404.html` + `sitemap.xml` |
| Lint | `npm run lint` (oxlint) | ✅ 0 errors |
| Unit + integrity tests | `npm test` (19 tests: date maths, timezone-correct `today()`, content link integrity, slug integrity, robots, route shells, sitemap sync) | ✅ 19/19 |
| Rendered-page assertions (6 page types, Chrome headless `--dump-dom`) | titles, canonicals, robots, unit selector, search + `aria-live`, "Last reviewed", `dateModified`, `dateModified`, noscript, OG image, 404 semantics | ✅ 40/40 |
| Computed contrast (CDP, alpha-composited backgrounds) | 6 page types | ✅ 401 text elements, **0** WCAG AA failures, worst 4.70 |
| Structured data | parse every `application/ld+json` in `dist/` | ✅ 50/50 valid, 0 invalid |
| Mojibake scan | all `dist/**.{html,css,js,xml,txt}` | ✅ 0 occurrences |
| Third-party runtime requests | external URL scan of built JS/CSS/HTML | ✅ none (only `schema.org`, `datepilot.online`, W3C namespace, React doc link in strings) |
| Placeholder content | lorem/TODO/coming-soon scan of source | ✅ none |
| External anchors | `<a href="http…">` in all built HTML | ✅ none (site is fully internal-linked) |
| Bundle | sizes | 509.7 kB JS raw / **146.8 kB gzip**; CSS 21.5 kB raw / 4.0 kB gzip; fonts 121 kB; OG image 36.7 kB |

---

## 4. Verified live in an earlier pass (pre-fix baseline; re-verify after deploy)

- `http → https` (301), `www → non-www` (301), no-slash → trailing slash (301) all correct.
- `/docs/` and `/internal/` return **403**; source files are not publicly served.
- Soft-404 behaviour (unknown path → 200 homepage shell) **was confirmed** — this is what the `.htaccess` change fixes; it is not yet confirmed fixed on the live host because the repository changes have not been deployed.

---

## 5. Deliberately not done (and why)

- **No comment section.** Google's readiness guidance says to "consider" one; it is explicitly optional and would add moderation and UCC-style obligations with no proven benefit here.
- **No `ads.txt`.** The AdSense publisher ID does not exist yet; a placeholder would be invalid and misleading.
- **No AdSense/snippet code inserted.** Applying before the owner decides is an owner action; inserting invented codes is impossible and forbidden.
- **No fabricated statistics.** No traffic, approval odds, review times, or Google requirements were invented anywhere. Where a number is stated (bundle size, contrast ratios, word counts, test counts) it was measured in this session.
- **No `noindex` used as a shortcut.** The only `noindex` is on the 404 page, where it is correct.
- **No analytics installed.** Adding a tracker is an owner decision with privacy-policy consequences; the policies currently state honestly that none exists.

---

## 6. Owner actions required (in order)

1. **Deploy** these changes to datepilot.online (Hostinger: publish `dist/` including `.htaccess`, or push to the connected Git deploy).
2. **Re-verify live:** unknown URL must return **HTTP 404** (not 200); `https://datepilot.online/sitemap.xml` must return the new 50-URL sitemap; canonical/redirect checks from section 4.
3. **Confirm the advertised mailbox** `bazminoadsense2@gmail.com` receives mail (shown on Contact and Report an Error as a `mailto:` link; the address was supplied by the operator, but receipt cannot be tested from this repository).
4. **Search Console + Bing Webmaster:** add/verify the property (this session's GSC tool timed out, so no data was read), submit `https://datepilot.online/sitemap.xml`, request indexing of the homepage and key tool pages.
5. **Content:** consider expanding the 14 guides if the owner wants more depth; the current lengths (≈240–460 words) are honest but modest.
6. **Submit the AdSense application** only after steps 1–4 are live and the owner has confirmed eligibility (18+, own content, able to edit `<head>`).
7. **After approval, before enabling ads:** add the real `ads.txt`, update Privacy/Cookie policies from "no advertising today" to the actual advertising/cookie behaviour, review ad placement against Google's ad-interference rules and Better Ads Standards, and add EU consent tooling if visitors include the EEA/UK.

---

## 7. Remaining risks (stated as unknowns, not predictions)

| Risk | Status |
|------|--------|
| "Content must attract an audience" | **Cannot be assessed** — no analytics exist, so there is no traffic or engagement evidence in this audit. |
| Applicant age (18+), accurate account details | Owner's responsibility; not verifiable from the repository. |
| Contact mailbox existence | Address supplied by the operator (`bazminoadsense2@gmail.com`) and now published on the site; confirming that it actually receives mail remains a manual check (6.3). |
| Live-server behaviour after deploy | Config is correct locally; final confirmation requires the deployed host (6.2). |
| Future ad placement quality | Not applicable until ad code exists; must be re-audited then (7 of section 6). |
| Guide depth | Modest relative to long-form competitors; functional and original, but not exhaustive. |

---

## 8. Files changed in this session (summary)

Modified: `.htaccess`, `public/.htaccess`, `vercel.json`, `index.html`, `package.json`, `scripts/generate-route-html.mjs`, `src/App.tsx`, `src/App.css`, `src/index.css`, `src/NewTools.tsx`, `src/dateUtils.ts`, `src/content/{dates,age,work,calendar,guides}.ts`.

Added: `public/og-image.png`, `public/fonts/` (10 files), `src/fonts.css`, `src/content/lastmod.ts`, `tests/date-utils.test.ts`, `tests/content-links.test.ts`, `docs/ADSENSE-CURRENT-POLICY-SOURCES.md`, this document.

Removed: `public/sitemap.xml` (now generated), `public/icons.svg`, `public/og-image.svg` (moved to `src/assets/`), `src/assets/{hero.png,react.svg,vite.svg}`.

---

## 9. What the 89/100 score is and is not

- **It is** an internal, checkable summary of how thoroughly this site was audited against the official requirements listed in `docs/ADSENSE-CURRENT-POLICY-SOURCES.md`, with every deduction traceable to a specific missing or unverified item.
- **It is not** a Google score, an approval probability, a guarantee, or a prediction of any review outcome.
- **Excluded from the score entirely:** the applicant's age, account accuracy, traffic and audience quality, review timing, and any Google decision — none of which this audit can observe.
- Policy pages change. Re-check every URL in the companion sources document immediately before submitting.
