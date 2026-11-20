import type { Block } from './types'

export type ContentPageSection = { heading: string; blocks: Block[] }

export type ContentPageData = {
  title: string
  eyebrow: string
  lead: string
  sections: ContentPageSection[]
  faqs?: [string, string][]
  showAuthor?: boolean
}

// Editorial, methodology, changelog, advertising, and author pages. These are
// the trust layer of the site: they explain who makes the content, how it is
// checked, how it is kept current, and how advertising is separated from it.
export const contentPages: Record<string, ContentPageData> = {
  'editorial-policy': {
    title: 'Editorial standards and review process',
    eyebrow: 'HOW DATEPILOT IS MADE',
    lead:
      'DatePilot is an independent reference site. This page explains who is responsible for the content, how the material is researched and checked, how advertising is kept separate, and how to report an error.',
    showAuthor: true,
    sections: [
      {
        heading: 'Who is responsible for this site',
        blocks: [
          {
            type: 'p',
            text:
              'DatePilot is written, built, and maintained by Fahad, the site\'s founder and editor. There is no separate newsroom and no anonymous content team. The same person who writes the explanations also maintains the calculators, reviews corrections, and decides what gets published. You can read more on the [about the editor](/about/author) page.',
          },
          {
            type: 'p',
            text:
              'DatePilot is independent. It is not owned by a calendar company, a payroll provider, or an advertising network. DatePilot has applied to Google AdSense and is awaiting review; no ads are currently displayed. If advertising is enabled after approval, it will remain separate from editorial decisions. See the [advertising policy](/advertising-policy) for the current status and commitments.',
          },
        ],
      },
      {
        heading: 'What we publish',
        blocks: [
          {
            type: 'p',
            text:
              'DatePilot publishes two kinds of page: calculators that perform a date or time calculation, and guides that explain the rules behind those calculations. Every page is built around a real question a visitor may need to answer. We do not publish pages only to fill a category, and we do not publish a page until its calculator works and its explanation is reviewed.',
          },
          {
            type: 'ul',
            items: [
              'Calculator pages state the purpose, inputs, method, assumptions, worked examples, limitations, and related tools.',
              'Guide pages explain a standard or rule, show worked examples, and link to the primary sources used.',
              'Trust pages explain who runs the site, its current advertising status, how data is handled, and how to report a problem.',
              'Pages are not published automatically. The editor is responsible for deciding what goes live and for checking the published page.',
            ],
          },
        ],
      },
      {
        heading: 'How we research a page',
        blocks: [
          {
            type: 'p',
            text:
              'Research starts with the rule, not with a list of keywords. For a calendar question we go to the definition: the Gregorian leap-year rule, the ISO 8601 week-numbering rule, the IANA time zone database, or the relevant national guidance. We prefer primary sources over summaries because summaries often omit the exception that matters at a month end or a year boundary.',
          },
          {
            type: 'p',
            text:
              'Every tool and guide links the standards and reference works it relies on. We do not cite a source we have not opened, and we do not present a number as official when it is our own calculation. When a rule changes — a new time zone boundary, a leap-second decision, or a revised standard — the affected page is reviewed and dated again.',
          },
          {
            type: 'links',
            items: [
              ['ISO 8601 — date and time format', 'https://www.iso.org/iso-8601-date-and-time-format.html'],
              ['IANA — Time Zone Database', 'https://www.iana.org/time-zones'],
              ['BIPM — time metrology', 'https://www.bipm.org/en/time-metrology'],
              ['NIST — time and frequency division', 'https://www.nist.gov/pml/time-and-frequency-division'],
              ['IERS — Earth rotation and leap seconds', 'https://www.iers.org/'],
              ['Unicode CLDR — date and time patterns', 'https://cldr.unicode.org/'],
            ],
          },
        ],
      },
      {
        heading: 'How we write',
        blocks: [
          {
            type: 'p',
            text:
              'Date questions are usually ambiguous before they are difficult. "One month from today" is not 30 days; "days between" can mean an elapsed gap or an inclusive count; "working days" depends on which days a country works. Our writing rule is to name the convention before giving the answer, then show a worked example where the convention changes the result.',
          },
          {
            type: 'ul',
            items: [
              'Define the unit and the endpoint convention next to the result.',
              'Use worked examples with real dates, including a boundary case.',
              'State limitations plainly instead of implying false precision.',
              'Link to the related calculator or guide when the next question is predictable.',
              'Avoid claims we cannot verify, invented statistics, and false certainty.',
            ],
          },
        ],
      },
      {
        heading: 'How calculations are verified',
        blocks: [
          {
            type: 'p',
            text:
              'Each calculator is checked against fixed inputs whose answers can be reproduced by hand. The examples shown on tool pages are the same cases used in review, and they deliberately include the places where simple arithmetic fails: 29 February, century years, the end of a 30-day month, the ISO week-year boundary, daylight-saving transitions, and overnight shifts.',
          },
          {
            type: 'p',
            text:
              'The code is covered by automated tests for date arithmetic, business-day counting, recurring schedules, quarters, and local-date handling. A separate integrity test checks that every internal link, related tool, and guide reference resolves to a real page. The [methodology page](/methodology) lists the test types and the known limitations in more detail.',
          },
        ],
      },
      {
        heading: 'Review cycle and maintenance',
        blocks: [
          {
            type: 'p',
            text:
              'Every content page shows a "Last reviewed" date for its most recent editorial check. Reviews are triggered by a material edit, a confirmed correction, or a source or rule change that affects the page. We do not claim a fixed review interval for every page. Material changes are recorded on the [changelog](/changelog).',
          },
          {
            type: 'p',
            text:
              'The date is a record of the last editorial review, not an automated timestamp. If a page has not changed, the date stays the same. If a source link no longer resolves, the link is replaced or removed and the page is dated again.',
          },
        ],
      },
      {
        heading: 'Automation and AI',
        blocks: [
          {
            type: 'p',
            text:
              'Automation may assist with drafting, consistency checks, and test generation. A human editor is responsible for deciding what is published and for reviewing the page, its examples, and its cited sources. Automated checks can catch regressions, but they do not replace checking the underlying rule or source.',
          },
          {
            type: 'p',
            text:
              'If a page uses a calculator-generated table or a live value such as today\'s date, that behaviour is labelled on the page. We do not present generated values as hand-written facts, and we do not use automation to create pages without a real user question behind them.',
          },
        ],
      },
      {
        heading: 'Corrections',
        blocks: [
          {
            type: 'p',
            text:
              'If you find an incorrect calculation, an inaccurate explanation, a broken source link, or an accessibility problem, please report it through the [Report an error](/report-an-error) page or email bazminoadsense2@gmail.com. Include the page URL, the inputs you used, the result you expected, and the result the site gave you.',
          },
          {
            type: 'p',
            text:
              'Reports are reviewed as they are received; response time can vary. Confirmed calculation errors are prioritised. When a correction changes a published answer, the page is updated and dated, and the change is recorded on the changelog.',
          },
        ],
      },
      {
        heading: 'Independence and advertising',
        blocks: [
          {
            type: 'p',
            text:
              'DatePilot has applied to Google AdSense and is awaiting review. No ads are currently displayed and the site is not yet funded by advertising. If approved, advertisers will not see articles before publication, request changes, or buy recommendations. DatePilot does not accept paid reviews, sponsored articles, or paid links. The [advertising policy](/advertising-policy) explains the current status and editorial commitments.',
          },
          {
            type: 'p',
            text:
              'If advertising ever creates a conflict with editorial accuracy, the editorial answer wins. If that ever changes, the change will be disclosed here before it happens.',
          },
        ],
      },
      {
        heading: 'What DatePilot is not',
        blocks: [
          {
            type: 'p',
            text:
              'DatePilot is not a law firm, an accountant, a payroll provider, a medical service, or a government authority. The calculators provide general-purpose date and time arithmetic. For legal, financial, medical, employment, tax, travel, or contractual decisions, verify the result with the responsible authority and the applicable rules. See the [disclaimer](/disclaimer) for the full statement.',
          },
        ],
      },
    ],
    faqs: [
      ['Who writes DatePilot content?', 'Fahad, the founder and editor, writes and reviews the content and maintains the calculators. There is no anonymous content team. The about the editor page describes the role and the review process.'],
      ['Does DatePilot use AI to write pages?', 'Automation may assist with drafting, consistency checks, and test generation. A human editor decides what is published and reviews the page, examples, and cited sources. Automated checks do not replace checking the underlying rule.'],
      ['How often is content reviewed?', 'Pages are reviewed when materially edited, when a relevant source or rule changes, or when a correction is confirmed. DatePilot does not claim a fixed review interval for every page. Material changes are listed on the changelog.'],
      ['Can advertisers influence the content?', 'No ads are currently displayed because DatePilot is awaiting Google AdSense review. If the site is approved, advertising will remain separate from editorial decisions. DatePilot does not accept paid reviews, sponsored articles, or paid links. See the advertising policy for details.'],
    ],
  },

  'methodology': {
    title: 'How DatePilot builds and verifies its calculators',
    eyebrow: 'METHODOLOGY',
    lead:
      'Every calculator is built from a stated rule and checked against boundary cases. This page explains what "verified" means here, how the tests work, and what the tools deliberately do not do.',
    showAuthor: true,
    sections: [
      {
        heading: 'What "verified" means on this site',
        blocks: [
          {
            type: 'p',
            text:
              '"Verified" is not a guarantee. On DatePilot it means four things: the method is written down, the worked examples are reproducible, the calculator passes its automated tests, and the page links the sources behind the rule. It also means a human editor has reviewed the page and recorded the review date.',
          },
          {
            type: 'p',
            text:
              'We do not describe a result as official, certified, or error-free. No date calculator can know the rules of a particular contract, employer, court, or country. The tools calculate a stated convention accurately; applying that convention to a consequential decision remains the user\'s responsibility.',
          },
        ],
      },
      {
        heading: 'The calculation pipeline',
        blocks: [
          {
            type: 'ol',
            items: [
              'Parse: read the input as a calendar date or a local date-time, rejecting impossible dates such as 31 February.',
              'Validate: check required fields, whole-number limits, and whether the end date is after the start date where the tool requires it.',
              'Calculate: apply the stated rule, using calendar arithmetic rather than average month or year lengths.',
              'Format: show the result with its weekday, unit, or time zone so the answer can be read in context.',
              'Explain: state the method, assumptions, and limitations beside the result and in the page methodology.',
            ],
          },
          {
            type: 'p',
            text:
              'The same rule is used in the calculator and in the worked examples. That is deliberate: if an example and the tool ever disagree, one of them is wrong, and the discrepancy is a bug to be fixed.',
          },
        ],
      },
      {
        heading: 'Test strategy',
        blocks: [
          {
            type: 'table',
            headers: ['Test type', 'What it covers', 'Example case'],
            rows: [
              ['Date arithmetic', 'Day, week, month, and year shifts; forward and backward movement', '31 January + 1 month clamps to 28 February in a common year'],
              ['Leap and century rules', '29 February; years divisible by 4, 100, and 400', '2024 and 2000 are leap years; 2100 is not'],
              ['Business-day rules', 'Monday-to-Friday counting in both directions', 'Friday + 1 business day is Monday'],
              ['Week numbering', 'ISO week 1, week 53, and the week-year boundary', '1 January 2027 is ISO week 53 of 2026'],
              ['Time zones', 'Named zones, UTC offsets, and daylight-saving transitions', 'New York is UTC−5 in January and UTC−4 in July'],
              ['Recurring schedules', 'Month-end clamping, skipping, and weekday intervals', '31 January monthly clamps through February'],
              ['Format conversion', 'Ambiguous numeric dates and explicit day/month order', '03/04/2026 is flagged instead of guessed'],
              ['Integrity', 'Internal links, related tools, guide references, sitemap, and route shells', 'Every internal link resolves to a built page'],
            ],
          },
          {
            type: 'p',
            text:
              'The repository runs these checks with the project test command and the production build. The build also validates that every route has a metadata entry and that the sitemap matches the route list, so a page cannot silently disappear from navigation or search.',
          },
        ],
      },
      {
        heading: 'Worked examples are reproducible',
        blocks: [
          {
            type: 'p',
            text:
              'Each tool page includes reproducible examples with fixed inputs and expected results. Enter the same inputs in the calculator and compare the output. These examples make the stated convention visible; they do not prove that every possible input has been tested. Report a mismatch through the [Report an error](/report-an-error) page and include the inputs you used.',
          },
          {
            type: 'p',
            text:
              'Examples are chosen to include a boundary case, not just an easy one. A day-count example crosses February. A month example lands on a 31st. A time-zone example crosses a daylight-saving change. A business-day example starts on a Friday. These are the cases where a plausible but wrong method gives a different answer.',
          },
        ],
      },
      {
        heading: 'Known limitations',
        blocks: [
          {
            type: 'ul',
            items: [
              'Device clock: countdown and time-since tools read the visitor\'s device clock, which may be unsynchronised.',
              'Time zone data: conversions use the browser\'s IANA database; a future political change may not yet be in that version.',
              'Holidays: working-day and business-day tools do not apply public holidays, regional holidays, or company closures.',
              'Legal and contractual rules: statutory notice periods, court deadlines, payroll rounding, and tax rules are not modelled.',
              'Time of birth: age tools use calendar dates and do not model legal age rules that depend on the time of day.',
              'Historical calendars: weekday and date tools use the proleptic Gregorian calendar, which may differ from the calendar a country used before its reform.',
              'Leap seconds: day counts use calendar midnights, not the sub-second adjustments that affect UTC timestamps.',
              'No professional advice: DatePilot is not a substitute for legal, financial, medical, or official advice.',
            ],
          },
        ],
      },
      {
        heading: 'Versioning and maintenance',
        blocks: [
          {
            type: 'p',
            text:
              'Content and calculator changes are recorded on the [changelog](/changelog). Each content page carries a last-reviewed date, and the structured data on the page carries the same date as dateModified. When a source changes or a correction is confirmed, the page is updated and the date moves with it.',
          },
          {
            type: 'p',
            text:
              'The review is not a claim that every conceivable case has been tested. It is a claim that the stated method is documented, the included cases pass, and the limitations are disclosed. If you rely on a result for something important, reproduce it with the worked example and, where the stakes are legal or financial, verify it with the responsible authority.',
          },
        ],
      },
      {
        heading: 'How to reproduce or challenge a result',
        blocks: [
          {
            type: 'ol',
            items: [
              'Open the tool page and find its "Verified examples" table.',
              'Enter the same inputs exactly as written, including the unit and direction.',
              'Compare the result with the expected result in the table.',
              'If they differ, check the convention: endpoint inclusion, business-day basis, time zone, or month-end rule.',
              'If the difference remains, report the page URL, inputs, expected result, and actual result through the Report an error page.',
            ],
          },
        ],
      },
      {
        heading: 'Tool-by-tool verification focus',
        blocks: [
          {
            type: 'table',
            headers: ['Tool', 'Primary verification focus'],
            rows: [
              ['Date Calculator', 'Month-end clamping; year boundaries; negative amounts'],
              ['Age Calculator', 'Leap-day birthdays; month borrowing; completed anniversaries'],
              ['Age Difference Calculator', 'Input order; anniversary decomposition; total days'],
              ['Days Between Dates', 'Exclusive counting; February; leap years'],
              ['Days Calculator', 'Both directions; whole-day validation'],
              ['Add Days / Subtract Days', 'Month and year overflow; weekends; clamping'],
              ['Working Days', 'Inclusive endpoints; Monday-to-Friday rule'],
              ['Business Date Calculator', 'Weekend skipping in both directions; start-date exclusion'],
              ['Recurring Date Calculator', 'Month-end clamp/skip; weekday intervals; limit handling'],
              ['Deadline Calculator', 'Forward and backward modes; calendar vs business days; buffers'],
              ['Day of the Week', 'Gregorian weekday lookup; leap day'],
              ['Week Number', 'ISO week 1, week 53, and week-year changes'],
              ['Leap Year', 'Divisibility by 4, 100, and 400'],
              ['Quarter Calculator', 'Calendar and custom fiscal starts; inclusive day totals'],
              ['Day of Year', 'Common vs leap years; remaining days and percentages'],
              ['Countdown', '17:00 local target; device clock; passed targets'],
              ['Time Since', 'Local past date-time; future input; live refresh'],
              ['Time Difference', 'Cross-midnight spans; minute rounding; direction note'],
              ['Work Hours', 'Overnight shifts; unpaid breaks; decimal hours'],
              ['Time Zone Converter', 'IANA zones; daylight-saving offsets; date changes'],
              ['Date Format Converter', 'Ambiguity handling; explicit day/month order; output variants'],
            ],
          },
        ],
      },
    ],
    faqs: [
      ['Are DatePilot calculators tested?', 'Yes. Date arithmetic, leap years, business days, week numbers, time zones, recurring schedules, and format conversion are covered by automated tests, and each tool page publishes fixed examples that can be reproduced in the calculator.'],
      ['Why do some results differ from other websites?', 'Usually because the conventions differ: exclusive versus inclusive counting, calendar months versus 30-day months, Monday-to-Friday versus a local working week, or a different time zone database. Each DatePilot tool states its convention beside the result.'],
      ['Can I rely on a DatePilot result for a legal deadline?', 'No. DatePilot provides general-purpose calculations, not legal or official advice. Verify legal, financial, employment, tax, and contractual deadlines with the responsible authority.'],
      ['How do I report a wrong result?', 'Use the Report an error page and include the page URL, the inputs, the result you expected, and the result the site gave you. Confirmed calculation errors are prioritised.'],
    ],
  },

  'changelog': {
    title: 'DatePilot changelog',
    eyebrow: 'SITE AND CONTENT HISTORY',
    lead:
      'A dated record of material changes to the calculators, guides, sources, and trust pages. This page is updated when a page changes in a way that affects how a result should be read.',
    showAuthor: true,
    sections: [
      {
        heading: 'How to read this changelog',
        blocks: [
          {
            type: 'p',
            text:
              'Dates are the date of the change, not the date of an automated deployment. Editorial changes, calculation fixes, source updates, and policy changes are listed. Minor typo fixes are not listed individually unless they change a stated result. The last-reviewed date at the top of each page is the authoritative record for that page.',
          },
        ],
      },
      {
        heading: '2026',
        blocks: [
          {
            type: 'ul',
            items: [
              '20 November 2026 — Corrected advertising and privacy disclosures to match the current AdSense review status. Added worked examples to the homepage showing how DatePilot handles calendar-month clamping, ISO week-years, and leap-day birthdays.',
              '20 November 2026 — Clarified the editorial review and correction-reporting descriptions so they do not promise a fixed review cycle or response time. Clarified that reproducible examples cover named cases, not every possible input.',
              '20 November 2026 — Reorganized the guide directory around the problems its articles solve, expanded the general FAQ with concrete calendar and time-zone edge cases, and added task-specific questions to the calculator directories.',
              '16 November 2026 — Editorial transparency update. Added this changelog, editorial standards, methodology, author information, and an advertising policy. Added per-tool methodology, assumptions, worked examples, and limitations. Added author and publisher information to structured data. Added static HTML rendering so page content is available without JavaScript.',
              '10 November 2026 — Internal links, pushState URLs, canonical tags, and breadcrumb structured data now use trailing-slash URLs consistently.',
              '7 November 2026 — Split the combined guides into individual guide pages, added source lists to every tool page, and fixed broken glossary links.',
              '6 November 2026 — Added ads.txt with the Google AdSense publisher ID.',
              '28 October 2026 — Added the Google AdSense site verification snippet.',
              '4 October 2026 — Pre-application audit: real 404 responses, local-date handling for "today", self-hosted fonts, content corrections (quarter lengths, leap-day frequency, weekday examples), and trust-page accuracy.',
              '2 October 2026 — Added the business date, age difference, time since, work hours, recurring date, deadline, quarter, day of year, and date format converter tools.',
              '1 October 2026 — Expanded the age, date, and days-between content clusters with worked examples and endpoint conventions.',
              '29 September 2026 — Added the days calculator and the first SEO content expansion.',
              '25 September 2026 — Fixed www-to-non-www redirects, trailing-slash canonicals, and sitemap URL alignment.',
              '22 September 2026 — DatePilot launched with the first calculators, guides, and trust pages.',
            ],
          },
        ],
      },
      {
        heading: 'What counts as a material change',
        blocks: [
          {
            type: 'ul',
            items: [
              'A change to a calculation rule, convention, or default.',
              'A corrected date, weekday, leap-year, week-number, or time-zone result.',
              'A new or removed tool, guide, or trust page.',
              'A change to a cited standard or a replacement of a source.',
              'A change to privacy, cookie, advertising, or terms wording.',
              'A change to the author, publisher, or review process.',
            ],
          },
        ],
      },
      {
        heading: 'Corrections',
        blocks: [
          {
            type: 'p',
            text:
              'If you find a problem that is not listed here, report it through the [Report an error](/report-an-error) page. Confirmed corrections are added to this changelog when they change a published answer or a policy statement.',
          },
        ],
      },
    ],
  },

  'advertising-policy': {
    title: 'Advertising status and editorial independence',
    eyebrow: 'ADVERTISING STATUS',
    lead:
      'DatePilot has applied to Google AdSense and is awaiting review. No ads are currently displayed and the site is not yet funded by advertising. This page explains the current setup and the commitments that will apply if ads are enabled.',
    showAuthor: true,
    sections: [
      {
        heading: 'Who serves the ads',
        blocks: [
          {
            type: 'p',
            text:
              'DatePilot has applied to Google AdSense and is awaiting review. The AdSense review script is installed, but no ads are currently displayed and there are no active ad placements. Loading Google-hosted code may send technical request data, such as an IP address and browser information, to Google. If approved and enabled, Google and its partners may use data or cookies to select, deliver, measure, and limit ads. DatePilot does not sell advertising space directly or choose individual ads.',
          },
          {
            type: 'p',
            text:
              'The current data-handling description is in the [privacy policy](/privacy-policy) and [cookie policy](/cookie-policy). Those pages will be updated if advertising is enabled after approval.',
          },
        ],
      },
      {
        heading: 'Editorial independence',
        blocks: [
          {
            type: 'ul',
            items: [
              'Advertisers do not review, approve, or request changes to content before publication.',
              'There are no paid reviews, sponsored articles, paid rankings, or paid links on DatePilot.',
              'A calculator result or guide recommendation cannot be bought.',
              'Advertising placement does not change the method, examples, sources, or conclusions of a page.',
              'If a future commercial relationship ever creates a conflict, it will be disclosed on the affected page before publication.',
            ],
          },
          {
            type: 'p',
            text:
              'The editorial standards that govern content are published separately on the [editorial standards](/editorial-policy) page. The methodology used to verify calculators is published on the [methodology](/methodology) page.',
          },
        ],
      },
      {
        heading: 'Ad placement standards',
        blocks: [
          {
            type: 'p',
            text:
              'If ads are enabled after approval, they must remain clearly distinguishable from editorial content and must not interfere with the calculators. DatePilot will not disguise ads as navigation, buttons, or download links, ask visitors to click ads, or place ads so they obstruct the tools. There are no active ad placements at this time.',
          },
          {
            type: 'ul',
            items: [
              'No pop-ups, overlays, or interstitials that block the calculator or the page content.',
              'No ads that imitate the site\'s navigation or the calculator controls.',
              'No encouragement, incentive, or instruction to click an ad.',
              'No ads on the 404 page or on pages that exist only to display ads.',
            ],
          },
        ],
      },
      {
        heading: 'Cookies and personalised advertising',
        blocks: [
          {
            type: 'p',
            text:
              'If ads are enabled, Google may use cookies or similar technologies to serve, measure, or personalise ads. Before serving personalised ads to users in the EEA, UK, or Switzerland, DatePilot will configure a Google-certified consent management platform. Until that setup is active, the site will not enable personalised advertising for those users. Google Ads Settings and the Digital Advertising Alliance provide additional advertising preference controls.',
          },
          {
            type: 'links',
            items: [
              ['Google Ads Settings', 'https://adssettings.google.com/'],
              ['Digital Advertising Alliance opt-out', 'https://optout.aboutads.info/'],
              ['Google — how it uses data in advertising', 'https://policies.google.com/technologies/ads'],
              ['Google Publisher Policies', 'https://support.google.com/publisherpolicies/answer/10502938'],
            ],
          },
        ],
      },
      {
        heading: 'Report an ad problem',
        blocks: [
          {
            type: 'p',
            text:
              'If advertising is enabled and you see an ad that is misleading, inappropriate, or interferes with the page, report it to Google using the AdChoices icon and contact DatePilot at bazminoadsense2@gmail.com with the page URL and a description. We will review reports and use available controls to address the issue.',
          },
        ],
      },
    ],
    faqs: [
      ['Does DatePilot sell sponsored content?', 'No. DatePilot does not accept paid reviews, sponsored articles, paid rankings, or paid links. The site is awaiting Google AdSense review; no ads are currently displayed.'],
      ['Can I use DatePilot without personalised ads?', 'No ads are currently displayed. If advertising is enabled, the available choices will depend on your region; before personalised ads are served in the EEA, UK, or Switzerland, DatePilot will configure a Google-certified consent management platform.'],
      ['Why does DatePilot show ads?', 'DatePilot has applied to Google AdSense but is awaiting review, so no ads are currently displayed. If approved, advertising may help support the free calculators and guides.'],
    ],
  },

  'about/author': {
    title: 'About the editor',
    eyebrow: 'AUTHOR AND EDITOR',
    lead:
      'Fahad is the founder and editor of DatePilot. He builds and maintains the calculators, writes and edits the explanations, and reviews corrections and sources.',
    showAuthor: false,
    sections: [
      {
        heading: 'Role at DatePilot',
        blocks: [
          {
            type: 'p',
            text:
              'Fahad founded DatePilot and remains its editor. The role covers the whole site: designing the calculators, writing the explanations, choosing and checking sources, reviewing corrections, and deciding what is published. DatePilot is an independent project, not a division of a larger media company or a calendar vendor.',
          },
          {
            type: 'p',
            text:
              'The editorial process is published on the [editorial standards](/editorial-policy) page, and the calculator checks are described on the [methodology](/methodology) page. Material changes are recorded on the [changelog](/changelog).',
          },
        ],
      },
      {
        heading: 'Areas of focus',
        blocks: [
          {
            type: 'ul',
            items: [
              'Calendar arithmetic: day, week, month, and year shifts; inclusive versus exclusive counting; month-end clamping.',
              'Calendar rules: the Gregorian leap-year rule, ISO 8601 week numbering, quarter and ordinal-date conventions.',
              'Time standards: UTC, GMT, the IANA time zone database, daylight-saving transitions, and leap seconds.',
              'Everyday applications: deadlines, payroll and shift calculations, age and anniversary questions, and date-format ambiguity.',
            ],
          },
        ],
      },
      {
        heading: 'How the work is done',
        blocks: [
          {
            type: 'p',
            text:
              'Each page starts with the rule, not the keyword. Fahad reads the primary standard or reference work, writes the method in plain language, builds the calculator, and checks the result against boundary cases such as 29 February, 31 January, ISO week 53, a daylight-saving change, and an overnight shift. The worked examples on the page are the cases used in review.',
          },
          {
            type: 'p',
            text:
              'Automation assists with drafting, consistency checks, and test generation, but the final text, examples, and sources are reviewed by a human editor before publication. AI is not credited as an author and does not publish pages on its own.',
          },
        ],
      },
      {
        heading: 'What the editor is not',
        blocks: [
          {
            type: 'p',
            text:
              'Fahad is not a lawyer, accountant, payroll specialist, medical professional, or government official, and DatePilot does not provide legal, financial, medical, or official advice. The tools calculate a stated convention; for a consequential deadline or decision, verify the result with the responsible authority. See the [disclaimer](/disclaimer) for the full statement.',
          },
        ],
      },
      {
        heading: 'Contact and corrections',
        blocks: [
          {
            type: 'p',
            text:
              'Correction reports, accessibility issues, privacy questions, and advertising concerns are welcome. Email bazminoadsense2@gmail.com or use the [Contact](/contact) page. Include the page URL, the inputs you used, the result you expected, and the result the site gave you. Response time can vary; confirmed calculation errors are prioritised.',
          },
        ],
      },
    ],
  },
}
