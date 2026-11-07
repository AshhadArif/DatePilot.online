import type { ToolContent } from './types'

export const calendarContent: Record<string, ToolContent> = {
  'day-of-week': {
    answer: 'A day of the week calculator tells you whether a date falls on a Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday — for a date in the past or the future.',
    intro: [
      'What day of the week was 1 January 2000? What day will my birthday fall on next year? What day of the week is it today? The answer always comes from the same seven-day cycle, but working it out by hand means counting across years of leap days.',
      'Enter any date and this calculator names the weekday instantly, using the Gregorian calendar rules that apply to every date after October 1582 — and, by extension, to proleptic dates before it.',
    ],
    howTo: [
      'Choose the date you want to check.',
      'Select "Calculate result".',
      'Read the full weekday name, for example "Wednesday".',
      'To count forward or backward to another date first, use the [Date Calculator](/calculators/date-calculator).',
    ],
    sections: [
      {
        heading: 'What Day of the Week Is It?',
        blocks: [
          { type: 'p', text: 'The weekday of any date is fixed. Once a date is set on the calendar, its day of the week never changes — which is why historical dates can be verified and future dates can be planned.' },
          { type: 'component', name: 'today-weekday' },
          { type: 'p', text: 'The figure above always reflects the current date. For a different date, use the calculator at the top of the page.' },
        ],
      },
      {
        heading: 'How to Find the Day of the Week Manually',
        blocks: [
          { type: 'p', text: 'The practical manual method uses nothing more than the fact that weekdays repeat every seven days:' },
          {
            type: 'ol',
            items: [
              'Start from a date whose weekday you already know.',
              'Count the total number of days between that date and your target date.',
              'Divide by 7 and keep the remainder.',
              'Step forward or backward that many weekdays from the known one.',
            ],
          },
          { type: 'p', text: 'For example, if 1 January 2026 is a Thursday, then 8 January, 15 January, and every subsequent multiple of 7 is also a Thursday. A date 10 days later is Thursday plus 10, which wraps around the seven-day cycle to Sunday.' },
          { type: 'p', text: 'The hard part is step one — total days — because February and the 31-day months vary. Calendar algorithms such as Zeller\'s congruence solve it arithmetically, and this calculator uses the equivalent date-based approach.' },
          { type: 'h3', text: 'Worked example' },
          { type: 'p', text: 'Take 7 November 2026. From Thursday 1 January 2026 the date is the 311th day of the year, so 310 days separate the two dates. 310 ÷ 7 leaves a remainder of 2, so step forward two weekdays from Thursday: Friday, Saturday. 7 November 2026 is a Saturday.' },
          { type: 'p', text: 'Verification matters as much as the calculation. Three strategies catch almost every mistake: compare against a weekday you already trust, such as today\'s date read from a clock; run the method a second way — the remainder approach above, the doomsday method below, or a printed calendar — and require both answers to agree; and apply the sanity rules, which never fail: adding 7 days never changes a weekday, adding 1 day always moves to the next one, and any date that exists in both years falls on the same weekday exactly 400 years apart.' },
        ],
      },
      {
        heading: 'How the Calculator Works',
        blocks: [
          { type: 'p', text: 'The calculator reads the date\'s position in the Gregorian calendar and maps it to a weekday using the standard seven-day cycle, in which Monday is day 1 through Sunday day 7 for ISO purposes and Sunday is day 0 in the JavaScript representation it uses internally.' },
          { type: 'p', text: 'Because the calculation is performed on calendar dates rather than clock timestamps, the time of day and the time zone of your device do not change the result. A date is the same weekday everywhere in the world at the same moment.' },
          { type: 'p', text: 'One caveat applies to very early dates: countries adopted the Gregorian calendar on different days in the 16th to 20th centuries. Dates before a country\'s adoption are conventionally computed proleptically — as if the rule had always applied — which is what this tool does.' },
        ],
      },
      {
        heading: 'Examples: What Day Was That Date?',
        blocks: [
          {
            type: 'table',
            headers: ['Date', 'Weekday'],
            rows: [
              ['28 September 2026', 'Monday'],
              ['1 January 2026', 'Thursday'],
              ['4 July 1998', 'Saturday'],
              ['29 February 2024', 'Thursday'],
              ['25 December 2026', 'Friday'],
              ['1 January 2000', 'Saturday'],
            ],
          },
          { type: 'p', text: 'Two of these dates test the edge cases: a leap-day birthday and a date in the middle of a holiday period. Entering either into the calculator returns the same weekday shown here.' },
        ],
      },
      {
        heading: 'Weekdays for Planning and Schedules',
        blocks: [
          { type: 'p', text: 'Knowing the weekday of a date is usually the first step in a schedule. A deadline that lands on a Saturday needs moving, a project start on a Monday behaves differently from one on a Friday, and a booking spanning a weekend has fewer working days than the calendar count suggests.' },
          { type: 'p', text: 'Chain the weekday check together with the other date tools: find the date with [Add Days to Date](/calculators/add-days), then check its weekday here, then count only weekdays with the [Working Days Calculator](/calculators/working-days).' },
          { type: 'p', text: 'Weekday cycles also underpin week numbering, which has its own rules — see the [Week Number Calculator](/calendar/week-number).' },
        ],
      },
      {
        heading: 'Why Weekdays Never Change',
        blocks: [
          { type: 'p', text: 'The seven-day week has cycled without interruption for centuries, so the weekday of a date is a matter of arithmetic rather than convention. Adding 7 days never changes it; adding 1 day always moves to the next one.' },
          { type: 'p', text: 'That continuity is why a birthday falls on a different weekday each year — 365 days is 52 weeks plus 1 day, so a common-year anniversary advances by one weekday, and a leap-year anniversary advances by two before correcting itself.' },
          { type: 'p', text: 'The calendar rules behind this, including which century years are leap years, are set out in the [Leap Year Calculator](/calendar/leap-year).' },
        ],
      },
      {
        heading: 'The 400-Year Gregorian Cycle',
        blocks: [
          { type: 'p', text: 'Weekday patterns repeat because the Gregorian calendar itself repeats. A 400-year span contains exactly 146,097 days: 400 × 365 ordinary days plus 97 leap days, because every 400-year cycle contains 97 leap years — one every four years, minus the three century years that are not divisible by 400.' },
          { type: 'p', text: '146,097 ÷ 7 = 20,871 weeks with no remainder, so four centuries are a whole number of weeks. Every date therefore returns to the same weekday after 400 years: 1 January 2000 was a Saturday, so 1 January 2400 is a Saturday too, and 1 January 1600 was a Saturday as well. The same total defines the average Gregorian year, 146,097 ÷ 400 = 365.2425 days.' },
          { type: 'p', text: 'A shorter 28-year repeat also holds inside stretches of years with no skipped century leap year — 1901 to 2099 is the classic example, where 1 January 1998 and 1 January 2026 are both Thursdays. The rule you can rely on anywhere, though, is the 400-year cycle: two dates exactly 400 years apart that exist in both years always share a weekday.' },
        ],
      },
      {
        heading: 'The Doomsday Method: Anchor Days',
        blocks: [
          { type: 'p', text: 'The fastest manual method is John Conway\'s doomsday algorithm. Each year has one "doomsday" weekday shared by an easy-to-remember list of dates: the last day of February (28 February in a common year, 29 February in a leap year), 4/4, 6/6, 8/8, 10/10, 12/12, 5/9, 9/5, 7/11 and 11/7 — written as month/day.' },
          {
            type: 'ol',
            items: [
              'Find the century anchor: the 1900s anchor is Wednesday, the 2000s Tuesday, the 2100s Sunday, the 2200s Friday, the 2300s Wednesday and the 2400s Tuesday — a pattern that repeats every 400 years (the 1600s anchor is Tuesday as well).',
              'Add the year\'s last two digits and the number of complete fours inside them, then take the remainder on division by 7.',
              'Count that many days forward from the anchor; that weekday is the year\'s doomsday.',
              'Move to the nearest doomsday date on a calendar and count day by day to the date you want.',
            ],
          },
          { type: 'p', text: 'Worked example, 2026: 26 + 6 = 32, and 32 ÷ 7 leaves 4. Tuesday plus 4 days is Saturday, so every doomsday date in 2026 falls on a Saturday — including 11 July (7/11) and 7 November (11/7).4 July is exactly one week before 11 July, so Independence Day 2026 is a Saturday too, which is a quick way to check the whole year.' },
          { type: 'p', text: 'Worked example across centuries, 4 July 1776: the 1700s share their anchor with the 2100s, because anchors repeat every 400 years, so the anchor is Sunday. 76 + 19 = 95, and 95 ÷ 7 leaves 4; Sunday plus 4 days is Thursday. That makes 11 July 1776 a Thursday and 4 July 1776 a Thursday as well — matching the historical record for the declaration of independence.' },
        ],
      },
      {
        heading: 'Worked Examples Across the Centuries',
        blocks: [
          { type: 'p', text: 'The same rules cover proleptic dates from before the Gregorian reform and dates centuries apart. Each row can be re-derived from an anchor day:' },
          {
            type: 'table',
            headers: ['Date', 'Weekday', 'Cross-check'],
            rows: [
              ['4 July 1776', 'Thursday', 'Doomsday of 1776 is Thursday; 4 July is one week before 7/11'],
              ['20 July 1969', 'Sunday', 'Apollo 11 landing, a widely documented Sunday'],
              ['1 January 1900', 'Monday', '28 February 1900 was a Wednesday; 58 days earlier is Monday'],
              ['1 January 2000', 'Saturday', '29 February 2000 was a Tuesday; 59 days earlier is Saturday'],
              ['1 January 2100', 'Friday', '28 February 2100 is a Sunday; 58 days earlier is Friday'],
              ['1 January 2400', 'Saturday', 'Exactly 400 years after 1 January 2000'],
            ],
          },
          { type: 'p', text: 'Two rows also test the century leap rule: 1900 and 2100 are common years with no 29 February, while 2000 and 2400 are leap years. Whether the year contains that day is exactly what the [Leap Year Calculator](/calendar/leap-year) decides, and it is the input every method here depends on.' },
        ],
      },
    ],
    guideSlugs: ['day-of-week', 'calendar-systems', 'week-numbers'],
    related: ['week-number', 'leap-year', 'days-between-dates', 'working-days'],
    faqs: [
      ['How do I know what day of the week a date was?', 'Enter the date in the calculator above. It returns the full weekday name for any past or future date in the Gregorian calendar.'],
      ['Is the weekday the same in every time zone?', 'Yes. A calendar date has one weekday worldwide. A moment near midnight can be a different date in another zone, but each of those dates keeps its own fixed weekday.'],
      ['Why does my birthday fall on a different weekday every year?', 'A common year has 365 days — 52 weeks and 1 day — so the anniversary moves forward one weekday. In the year after a leap year it can move by two.'],
      ['What about dates before the Gregorian calendar was adopted?', 'This calculator works proleptically, applying Gregorian rules to all dates. For dates before a country switched calendars, the historical weekday may differ by several days.'],
      ['What is the doomsday method?', 'A mental shortcut devised by John Conway. Each year has one "doomsday" weekday shared by memorable dates such as the last day of February, 4/4, 6/6, 8/8, 10/10 and 12/12. You derive it from the century anchor plus a small sum, then count day by day to your target date.'],
      ['Do weekdays repeat on a cycle?', 'Yes. The Gregorian calendar repeats exactly every 400 years — 146,097 days, which is 20,871 whole weeks — so any date that exists in both years falls on the same weekday 400 years apart. Inside periods with no skipped century leap year, such as 1901–2099, the pattern also repeats every 28 years.'],
    ],
    sources: [
      ['US Naval Observatory — Julian Date Converter', 'https://aa.usno.navy.mil/data/JulianDate'],
      ['US Naval Observatory — Introduction to Calendars', 'https://aa.usno.navy.mil/faq/calendars'],
      ['Royal Museums Greenwich — Why seven days in a week?', 'https://www.rmg.co.uk/stories/time/why-12-months-year-seven-days-week-or-60-minutes-hour'],
    ],
  },

  'week-number': {
    answer: 'A week number calculator returns the current ISO 8601 week number and its week-year. Weeks start on Monday, and week 1 is the week that contains the first Thursday of the year.',
    intro: [
      'Week numbers are how businesses, fiscal calendars, and international standards label time: "week 40 of 2026", "the week starting 28 September". The numbering follows ISO 8601, and its rules are slightly different from a simple count of Mondays since 1 January — which is why week numbers are easy to get wrong at the start and end of a year.',
      'Enter a date to get its ISO week number and the week-year it belongs to, or scroll down for the current week.',
    ],
    howTo: [
      'Choose the date you want the week number for.',
      'Select "Calculate result".',
      'Read the week number and its week-year, for example "ISO week 40, 2026".',
      'Check the week-year as well as the number: dates in early January can belong to the previous year, and dates in late December to the next one.',
    ],
    sections: [
      {
        heading: 'Current Week Number',
        blocks: [
          { type: 'p', text: 'The current ISO week updates whenever the page loads, together with the current weekday and week start:' },
          { type: 'component', name: 'current-week' },
          { type: 'p', text: 'For any other date, use the calculator at the top of this page.' },
        ],
      },
      {
        heading: 'What Is the ISO Week Number?',
        blocks: [
          { type: 'p', text: 'ISO 8601 week numbering is the international standard for labeling weeks. Its three rules define everything:' },
          {
            type: 'ol',
            items: [
              'Weeks start on Monday and end on Sunday.',
              'Week 1 of a year is the week containing the first Thursday of that year — equivalently, the week containing 4 January.',
              'A date near a year boundary can belong to the previous or next year\'s numbering.',
            ],
          },
          { type: 'p', text: 'The Thursday rule exists so that every week belongs to exactly one year. Because the week containing 4 January always includes a Thursday in that year, the week-year and the calendar year agree for almost every date.' },
        ],
      },
      {
        heading: 'Why the Week-Year Can Differ From the Calendar Year',
        blocks: [
          { type: 'p', text: 'A year has 52 or 53 ISO weeks. It has 53 when 1 January falls on a Thursday, or on a Wednesday in a leap year. 2026 starts on a Thursday, so it is a 53-week year.' },
          {
            type: 'table',
            headers: ['Date', 'Calendar year', 'ISO week-year', 'Week'],
            rows: [
              ['1 January 2026', '2026', '2026', 'Week 1'],
              ['28 December 2026', '2026', '2026', 'Week 53'],
              ['31 December 2026', '2026', '2026', 'Week 53'],
              ['1 January 2027', '2027', '2026', 'Week 53'],
              ['3 January 2027', '2027', '2026', 'Week 53'],
            ],
          },
          { type: 'p', text: 'Read the third row carefully: 1 January 2027 falls in week 53 of 2026, because the week it belongs to started on Monday 28 December 2026 and its Thursday is 31 December 2026. Conversely, 1 January 2026 — a Thursday — is already week 1 of 2026.' },
          { type: 'note', text: 'When you report a week number, always include the week-year. "Week 1" on its own is ambiguous in the first days of January.' },
        ],
      },
      {
        heading: 'How to Calculate the ISO Week Number',
        blocks: [
          {
            type: 'ol',
            items: [
              'Find the Thursday of the week your date falls in. Monday maps forward 3 days, Tuesday 2, and so on.',
              'Take that Thursday\'s calendar year as the week-year.',
              'Count the days from 1 January of that year to the Thursday.',
              'Divide by 7, round down, and add 1. That is the week number.',
            ],
          },
          { type: 'p', text: 'For 28 September 2026 — a Monday — the Thursday of the week is 1 October 2026, which is the 274th day of 2026. 273 days after 1 January, divided by 7, is 39; add 1 and the answer is week 40.' },
          { type: 'p', text: 'The fourth step is where off-by-one errors appear. A count that starts from 4 January instead of 1 January, or that rounds instead of flooring, reports week 0 or a week one too low for dates early in the year.' },
        ],
      },
      {
        heading: 'Week Number Examples',
        blocks: [
          {
            type: 'table',
            headers: ['Date', 'ISO week', 'Week-year'],
            rows: [
              ['1 January 2026', '1', '2026'],
              ['4 January 2026', '1', '2026'],
              ['15 June 2026', '25', '2026'],
              ['28 September 2026', '40', '2026'],
              ['20 December 2026', '51', '2026'],
              ['31 December 2026', '53', '2026'],
              ['30 December 2025', '1', '2026'],
            ],
          },
          { type: 'p', text: 'The last row shows the other boundary case: late December already belongs to the following year\'s week numbering when its week contains 4 January.' },
        ],
      },
      {
        heading: 'What Week Numbers Are Used For',
        blocks: [
          { type: 'p', text: 'Weekly reporting, sprint planning, fiscal calendars, broadcast schedules, and international standards all label time by week number because it gives every week a unique year-and-number identity regardless of date.' },
          { type: 'p', text: 'A week number says nothing about weekdays inside it: week 40 always starts on a Monday, so pairing it with the [Day of the Week calculator](/calendar/day-of-week) or a date calculator gives the actual dates covered.' },
          { type: 'p', text: 'The deeper rules, including the ISO week-date format 2026-W40-1, are explained in [ISO week date](/guides/iso-week-date).' },
        ],
      },
      {
        heading: '52-Week and 53-Week Years',
        blocks: [
          { type: 'p', text: 'Every year has 52 or 53 ISO weeks, and the rule is short: a year has 53 weeks when 1 January falls on a Thursday, or on a Wednesday in a leap year. 1 January 2026 is a Thursday, so 2026 has 53 weeks; 1 January 2027 is a Friday, so 2027 has only 52.' },
          {
            type: 'table',
            headers: ['Year', '1 January falls on', 'ISO weeks'],
            rows: [
              ['2020', 'Wednesday (leap year)', '53'],
              ['2025', 'Wednesday', '52'],
              ['2026', 'Thursday', '53'],
              ['2027', 'Friday', '52'],
              ['2032', 'Thursday', '53'],
            ],
          },
          { type: 'p', text: 'The long-run average is 52.1775 weeks per year: 400 years contain exactly 20,871 weeks, and 71 of those 400 years are 53-week years. A 53-week year simply extends at the end, so its final week runs from late December into early January — which is exactly why 1 January 2027 sits in week 53 of 2026 while still being day 1 of 2027.' },
        ],
      },
      {
        heading: 'Spreadsheet Pitfalls: WEEKNUM vs ISOWEEKNUM',
        blocks: [
          { type: 'p', text: 'Spreadsheets ship two different week-numbering systems behind similar-looking functions. Excel\'s WEEKNUM defaults to "system 1": the week containing 1 January is week 1, and weeks start on Sunday. ISO 8601 numbering — Monday start, week 1 is the week containing the year\'s first Thursday — comes from ISOWEEKNUM, or from WEEKNUM with return type 21.' },
          {
            type: 'table',
            headers: ['Formula', 'Returns for 1 January 2027', 'What it means'],
            rows: [
              ['=WEEKNUM(DATE(2027,1,1))', '1', 'Week 1 of system 1 — the week containing 1 January'],
              ['=ISOWEEKNUM(DATE(2027,1,1))', '53', 'ISO week 53 of week-year 2026'],
              ['=WEEKNUM(DATE(2027,1,1),21)', '53', 'The same ISO answer via return type 21'],
            ],
          },
          { type: 'p', text: 'The gap between 1 and 53 at a year boundary is the classic off-by-one: default WEEKNUM never moves a January date into the previous year, so it disagrees with every ISO-based report during the first days of January — and again in late December, when ISO numbering has already crossed into the next week-year. A second trap is grouping rows by calendar year plus week number: 1 January 2027 belongs to week-year 2026, so group on the week-year returned here, not on the date\'s calendar year.' },
          { type: 'note', text: 'When a dashboard and this calculator disagree at New Year, check which system the dashboard uses before assuming either one is wrong.' },
        ],
      },
      {
        heading: 'Fiscal Weeks and Retail Calendars',
        blocks: [
          { type: 'p', text: 'Some organisations ignore month lengths entirely and count the year in whole weeks: 52 weeks, or 364 days, with a 53rd week added occasionally to keep the calendar aligned. The best-known example is the retail 4-5-4 calendar, whose months run four, five and four weeks so that comparable months always contain the same number of weekends.' },
          { type: 'p', text: 'In that layout each quarter is exactly 13 weeks — 91 days — so four quarters total 364 days, and the leftover day forces a 53rd week roughly every five to six years; the National Retail Federation lists 2017 and 2023 as recent 53-week retail years. Fiscal weeks like these are a different system from ISO weeks: a date can sit in ISO week 1 of 2027 while still being inside fiscal week 52 of a retail year that began in late January or February.' },
          { type: 'p', text: 'Whichever system you use, label the year as well as the number. The [Week Number Calculator](/calendar/week-number) at the top of this page returns both, and the [Day of the Week calculator](/calendar/day-of-week) gives the weekday inside any week you pick.' },
        ],
      },
    ],
    guideSlugs: ['week-numbers', 'iso-week-date', 'day-of-week'],
    related: ['day-of-week', 'quarter-calculator', 'leap-year', 'day-of-year'],
    faqs: [
      ['How do I find the current week number?', 'The "Current Week Number" panel above shows the live ISO week, its week-year, and the Monday that starts it. For a past or future date use the calculator at the top of the page.'],
      ['What is the difference between the calendar year and the week-year?', 'They usually match, but not always. A week belongs to the year whose Thursday falls in it, so days in early January can belong to the previous week-year and days in late December to the next one.'],
      ['Why does my date show week 53?', 'Because its year has 53 ISO weeks, which happens when 1 January is a Thursday, or a Wednesday in a leap year. 2026 is such a year.'],
      ['Do weeks start on Sunday or Monday?', 'In ISO 8601, Monday. Some regional calendars start on Sunday, which produces different week numbers near year boundaries.'],
      ['What does ISO week 2026-W40 mean?', 'It is the ISO week-date format: year, W for week, and the week number — here week 40 of 2026, which runs from Monday 28 September to Sunday 4 October 2026.'],
      ['Why does Excel show a different week number?', 'Excel\'s WEEKNUM defaults to a system where the week containing 1 January is week 1 and weeks start on Sunday. ISO 8601 uses Monday-start weeks anchored on the year\'s first Thursday. Use ISOWEEKNUM, or WEEKNUM(date, 21), to match this calculator.'],
      ['Are there always 52 weeks in a year?', 'No. A year has 52 or 53 ISO weeks — 53 when 1 January is a Thursday, or a Wednesday in a leap year. Across 400 years the average is 52.1775 weeks, and exactly 71 of those 400 years contain 53 weeks.'],
    ],
    sources: [
      ['ISO — ISO 8601 date and time format', 'https://www.iso.org/iso-8601-date-and-time-format.html'],
      ['ISO — ISO 8601-1:2019 Date and time', 'https://www.iso.org/standard/70907.html'],
      ['Microsoft Support — WEEKNUM function', 'https://support.microsoft.com/en-us/excel/functions/weeknum-function'],
      ['Microsoft Support — ISOWEEKNUM function', 'https://support.microsoft.com/en-us/excel/functions/isoweeknum-function'],
      ['National Retail Federation — 4-5-4 Calendar', 'https://nrf.com/resources/4-5-4-calendar'],
    ],
  },

  'leap-year': {
    answer: 'A leap year calculator checks whether a year has 366 days. A year is a leap year when it is divisible by 4, except century years, which must also be divisible by 400.',
    intro: [
      'Is 2026 a leap year? Is 2100 a leap year? The rule is short and the exceptions are the whole difficulty: every year divisible by 4 is a leap year, except every year divisible by 100 — unless it is also divisible by 400.',
      'Enter a year to see whether it is a leap year and how many days it contains, or check the current year below.',
    ],
    howTo: [
      'Enter the calendar year you want to check.',
      'Select "Calculate result".',
      'Read whether the year is a leap year with 366 days, or a common year with 365.',
      'For the number of days between two dates that include a leap day, use the [Days Between Dates calculator](/calculators/days-between-dates).',
    ],
    sections: [
      {
        heading: 'Is This Year a Leap Year?',
        blocks: [
          { type: 'p', text: 'Leap status for the current year, checked the moment the page loads:' },
          { type: 'component', name: 'leap-year-status' },
          { type: 'p', text: 'The nearest future leap years are 2028, 2032, and 2036; the last one before now was 2024.' },
        ],
      },
      {
        heading: 'The Leap Year Rules',
        blocks: [
          { type: 'p', text: 'There are three rules, applied in order:' },
          {
            type: 'ol',
            items: [
              'A year divisible by 4 is a leap year.',
              'Unless it is divisible by 100 — then it is not a leap year.',
              'Unless it is also divisible by 400 — then it is a leap year again.',
            ],
          },
          {
            type: 'table',
            headers: ['Year', 'Divisible by 4', 'By 100', 'By 400', 'Leap year?'],
            rows: [
              ['2024', 'Yes', 'No', 'No', 'Yes'],
              ['2026', 'No', 'No', 'No', 'No'],
              ['2028', 'Yes', 'No', 'No', 'Yes'],
              ['1900', 'Yes', 'Yes', 'No', 'No'],
              ['2000', 'Yes', 'Yes', 'Yes', 'Yes'],
              ['2100', 'Yes', 'Yes', 'No', 'No'],
            ],
          },
          { type: 'p', text: 'The century exceptions exist because a solar year is about 365.2422 days, not exactly 365.25. Skipping three century leap years every four centuries brings the calendar back in line with the seasons.' },
        ],
      },
      {
        heading: 'How the Leap Year Calculator Works',
        blocks: [
          { type: 'p', text: 'The calculator applies the three rules above in a single expression: a year is a leap year when it is divisible by 400, or divisible by 4 and not by 100. That covers every case, including the year 0 and years before the common era, because the arithmetic does not depend on the calendar reform.' },
          { type: 'p', text: 'The result also states the day count — 366 for a leap year, 365 otherwise — which is the difference the extra day makes.' },
        ],
      },
      {
        heading: 'Why Leap Years Matter',
        blocks: [
          { type: 'p', text: 'Without the extra day, the calendar would drift about 6 hours relative to the seasons each year, and dates would eventually land in the wrong season within a few centuries. The leap day keeps the calendar aligned with the solar year.' },
          { type: 'p', text: 'Practically, a leap year changes date arithmetic for anything that crosses 29 February:' },
          {
            type: 'ul',
            items: [
              'A span from January to March is one day longer in a leap year.',
              'Ages calculated across February shift by a day for people born on 29 February.',
              '"365 days from today" lands a different date depending on whether a leap day is crossed.',
              'Working-day counts that include 29 February gain one extra weekday.',
            ],
          },
          { type: 'p', text: 'All of the site\'s calculators handle this automatically — see the [Age Calculator](/calculators/age-calculator) and [Days Between Dates](/calculators/days-between-dates) for the two most common cases.' },
          { type: 'p', text: 'Worked example: the span from 1 January 2000 to 1 January 2001 is 366 days because it crosses 29 February 2000, while 1 January 1900 to 1 January 1901 is only 365 days, because 1900 had no leap day. That single-day difference is what makes age, contract, and interval calculations drift when a leap day sits inside the range.' },
        ],
      },
      {
        heading: '29 February and Leap-Day Birthdays',
        blocks: [
          { type: 'p', text: '29 February appears only in leap years, about 24 times every century, because leap years come roughly every four years with century exceptions. People born on it have a real birthday only in leap years; in other years the date does not exist.' },
          { type: 'p', text: 'Conventions differ for what happens on 28 February or 1 March in a non-leap year, and the answer depends on the rule being applied — a legal jurisdiction, an employer, or a calculator\'s own convention. The [Age Calculator](/calculators/age-calculator) documents the convention it uses: in a non-leap year the next birthday is reached on 1 March, so on 28 February the reported age is one day short of the next whole year.' },
          { type: 'p', text: 'Whether a given year contains that birthday at all is exactly what this calculator answers.' },
        ],
      },
      {
        heading: 'Common Leap Year Questions',
        blocks: [
          {
            type: 'ul',
            items: [
              'Is 2100 a leap year? No — it is divisible by 100 but not by 400.',
              'Is 2000 a leap year? Yes — divisible by 400.',
              'Is 2026 a leap year? No — not divisible by 4.',
              'How often do leap years occur? Every 4 years, with century exceptions.',
            ],
          },
          { type: 'p', text: 'For the calendar system these rules belong to, including how other cultures structure their years, see [Calendar Systems](/guides/calendar-systems).' },
        ],
      },
      {
        heading: 'The Century Exception in Numbers',
        blocks: [
          { type: 'p', text: 'The three-rule test is arithmetic bookkeeping for the solar year. A tropical year is approximately 365.2422 days long, so a calendar that adds a leap day every four years averages 365.25 days — about 0.0078 days too long each year. Over a century that surplus is a little more than three quarters of a day, which is why the Julian calendar was roughly ten days out of step by 1582.' },
          { type: 'p', text: 'The Gregorian average is 365 + 1/4 − 1/100 + 1/400 = 365.2425 days: add a day every four years, skip three every four centuries, and the leftover fraction comes to 365.2425. Set against the approximate tropical year of 365.2422 days, the residual is about 0.0003 days per year — on the order of one day every few thousand years, far slower than any civil drift that matters.' },
          { type: 'p', text: 'In practice the century rule deletes three leap days every 400 years: 1700, 1800 and 1900 were skipped, 2100, 2200 and 2300 will be, while 2000 and 2400 keep theirs. That is the entire difference between the Julian and Gregorian leap-year rules.' },
        ],
      },
      {
        heading: 'Worked Examples: 1900, 2000, 2100, 2400',
        blocks: [
          { type: 'p', text: 'Run each year through the rules in order — divisible by 4, then by 100, then by 400 — and the pattern is clear:' },
          {
            type: 'table',
            headers: ['Year', '÷ 4', '÷ 100', '÷ 400', 'Result', 'Checked fact'],
            rows: [
              ['1900', 'Yes', 'Yes', 'No', 'Common year, 365 days', '28 February 1900 was a Wednesday; there was no 29 February'],
              ['2000', 'Yes', 'Yes', 'Yes', 'Leap year, 366 days', '29 February 2000 was a Tuesday'],
              ['2100', 'Yes', 'Yes', 'No', 'Common year, 365 days', '1 March 2100 falls on a Monday'],
              ['2400', 'Yes', 'Yes', 'Yes', 'Leap year, 366 days', '29 February 2400 falls on a Tuesday'],
            ],
          },
          { type: 'p', text: '2100 is the next year the exception changes anything: it is the first skipped leap year since 1900, so 29 February 2100 never happens and 1 March arrives one weekday later than a leap-year calendar would place it. 2400 restores the pattern at the close of the 400-year cycle, and the whole sequence then repeats.' },
        ],
      },
      {
        heading: 'From Julian to Gregorian',
        blocks: [
          { type: 'p', text: 'The Julian calendar, established by Julius Caesar in 46 BCE, intercalated a leap day every fourth year for an average of 365.25 days — simple, but about 0.0078 days per year longer than the tropical year. Centuries of that surplus pushed the seasons away from their dates until, by the sixteenth century, the calendar ran around ten days ahead of the equinox.' },
          { type: 'p', text: 'Pope Gregory XIII\'s reform of 1582, announced in the papal bull Inter gravissimas, fixed both problems at once: it dropped ten calendar days and added the century rule. In the papal states, Thursday 4 October 1582 under the Julian calendar was followed immediately by Friday 15 October 1582 under the Gregorian one — ten dates vanished, but the weekdays themselves never broke, because the days ran continuously through the jump.' },
          { type: 'p', text: 'Adoption then spread slowly across Europe and the world: Catholic countries in 1582, Britain and its colonies in 1752 with an eleven-day drop (Wednesday 2 September was followed by Thursday 14 September), Russia in 1918, and Greece in 1923. Through every switch the seven-day week continued uninterrupted — see the [Day of the Week calculator](/calendar/day-of-week) — and the leap-day rule settled into the three-step test above.' },
        ],
      },
    ],
    guideSlugs: ['leap-years', 'calendar-systems', 'how-to-calculate-age'],
    related: ['age-calculator', 'day-of-year', 'week-number', 'day-of-week'],
    faqs: [
      ['How do I know if a year is a leap year?', 'Check divisibility: divisible by 4 means leap year, unless it is a century year divisible by 100, which is a leap year only when also divisible by 400. The calculator above applies this automatically.'],
      ['Is 2026 a leap year?', 'No. 2026 is not divisible by 4, so it has 365 days. The next leap year is 2028.'],
      ['Why are century years not leap years?', 'Because the solar year is slightly shorter than 365.25 days. Dropping three century leap years every four centuries keeps the calendar aligned with the seasons.'],
      ['How many days are in a leap year?', '366. The extra day is 29 February.'],
      ['Does a leap year happen every 4 years?', 'Almost always — with the exception of century years that are not divisible by 400, such as 1900 and 2100.'],
      ['When does the century rule matter next?', 'In 2100. It is divisible by 100 but not by 400, so it will be a common year of 365 days and 29 February 2100 will not exist. The previous skipped leap years were 1900, 1800 and 1700; the next century years that will count are 2400 and 2800.'],
      ['How accurate is the Gregorian leap year rule?', 'The calendar averages 365.2425 days against an approximate tropical year of 365.2422 days. The gap of about 0.0003 days per year adds up to roughly one day every few thousand years — accurate enough for civil purposes for millennia, so no further adjustment is planned.'],
    ],
    sources: [
      ['US Naval Observatory — Leap Years', 'https://aa.usno.navy.mil/faq/leap_years'],
      ['US Naval Observatory — Introduction to Calendars', 'https://aa.usno.navy.mil/faq/calendars'],
      ['NIST — Leap Seconds FAQs', 'https://www.nist.gov/pml/time-and-frequency-division/leap-seconds-faqs'],
      ['Royal Museums Greenwich — Which years are leap years?', 'https://www.rmg.co.uk/stories/time/which-years-are-leap-years-can-you-have-leap-seconds'],
      ['Britannica — Gregorian calendar', 'https://www.britannica.com/topic/Gregorian-calendar'],
    ],
  },
  'quarter-calculator': {
    answer: 'Find which quarter any date falls in, or get the exact start and end dates of any calendar or fiscal quarter. Set the fiscal year start month, see the days elapsed and remaining in the quarter, and switch between reading a date and reading a quarter.',
    intro: [
      'Quarters divide a year into four three-month blocks. For calendar quarters those blocks are fixed: January to March, April to June, July to September, October to December. Many organisations instead run fiscal quarters anchored to a different month — a company whose year starts in April gets fiscal quarters beginning in April, July, October, and January, and a US federal fiscal year begins in October.',
      'The Quarter Calculator handles both. Give it a date and it reports the quarter, the fiscal year it belongs to, the quarter\'s date range, and how much of the quarter has been used. Give it a quarter instead and it returns the start date, end date, weekday of each boundary, and total day count — useful for reporting windows, invoice periods, and schedule planning.',
    ],
    howTo: [
      'Choose the mode: which quarter is this date in, or which dates are in this quarter.',
      'Set the fiscal year start month — January for calendar quarters, or any month your organisation uses.',
      'Enter a date (first mode) or pick the quarter and fiscal year (second mode).',
      'Select "Calculate quarter" and read the range, day counts, and progress.',
    ],
    sections: [
      {
        heading: 'Calendar Quarters vs Fiscal Quarters',
        blocks: [
          {
            type: 'table',
            headers: ['Fiscal year starts', 'Q1', 'Q2', 'Q3', 'Q4'],
            rows: [
              ['January (calendar)', 'Jan–Mar', 'Apr–Jun', 'Jul–Sep', 'Oct–Dec'],
              ['April', 'Apr–Jun', 'Jul–Sep', 'Oct–Dec', 'Jan–Mar'],
              ['July', 'Jul–Sep', 'Oct–Dec', 'Jan–Mar', 'Apr–Jun'],
              ['October', 'Oct–Dec', 'Jan–Mar', 'Apr–Jun', 'Jul–Sep'],
            ],
          },
          { type: 'p', text: 'The quarter number always counts from the fiscal year start, so "Q1" means different months depending on the anchor. When someone says Q3 without qualification, they almost always mean July to September — but a fiscal Q3 can land anywhere, which is why the calculator states the dates rather than only the label.' },
        ],
      },
      {
        heading: 'How the Quarter Calculator Works',
        blocks: [
          {
            type: 'ol',
            items: [
              'The fiscal start month is set (January by default).',
              'The month offset from that start determines the quarter: months 1–3 of the fiscal year are Q1, 4–6 are Q2, and so on.',
              'The quarter\'s start is the first day of its first month; its end is the last day of its third month.',
              'Day counts are calendar days including both endpoints; elapsed and remaining days are measured against the date you entered.',
            ],
          },
          { type: 'p', text: 'Fiscal year labels follow the year in which the quarter ends, so fiscal year 2027 starting in October 2026 covers 1 October 2026 to 30 September 2027 — the standard convention for October-anchored fiscal years.' },
        ],
      },
      {
        heading: 'Calendar Quarter Boundaries for 2026',
        blocks: [
          {
            type: 'table',
            headers: ['Quarter', 'Start', 'End', 'Days'],
            rows: [
              ['Q1 2026', '1 January 2026 (Thursday)', '31 March 2026 (Tuesday)', '90'],
              ['Q2 2026', '1 April 2026 (Wednesday)', '30 June 2026 (Tuesday)', '91'],
              ['Q3 2026', '1 July 2026 (Wednesday)', '30 September 2026 (Wednesday)', '92'],
              ['Q4 2026', '1 October 2026 (Thursday)', '31 December 2026 (Thursday)', '92'],
            ],
          },
          { type: 'p', text: 'In a common year Q1 is the shortest quarter at 90 days, because February sits inside it; in a leap year that extra day brings Q1 up to 91, level with Q2. The longest quarters are Q3 and Q4 at 92 days in either case. Anything that promises four equal quarters is rounding.' },
        ],
      },
      {
        heading: 'Days Remaining and Quarter Progress',
        blocks: [
          { type: 'p', text: 'The first mode reports elapsed and remaining days for the quarter containing your date, plus the percentage used. That is the number behind questions like "how long is left in the quarter to hit the target?" — with the remaining count including the rest of the current day\'s quarter, excluding today itself.' },
          { type: 'p', text: 'Quarter progress pairs naturally with weekday counting: [Working Days](/calculators/working-days) tells you how many Monday-to-Friday days are actually left to work in the quarter.' },
        ],
      },
      {
        heading: 'Quarters, Months, and Weeks Compared',
        blocks: [
          { type: 'p', text: 'Quarters are the coarsest of the three. For week-level planning, the [Week Number Calculator](/calendar/week-number) reports the ISO week and week-year — including the split that happens when a new year begins mid-week. For monthly arithmetic, the [Date Calculator](/calculators/date-calculator) adds calendar months directly. Quarters matter when reporting, billing, and review cycles are quarterly by policy.' },
          { type: 'p', text: 'Because a quarter is just three calendar months, it inherits all the usual month-boundary behaviour: quarters in leap years gain a day in Q1, and consecutive boundaries can repeat the same weekday — 1 April and 1 July 2026 are both Wednesdays — because a three-month span shifts by 90, 91, or 92 days rather than a fixed step.' },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Check the year itself with the [Leap Year Calculator](/calendar/leap-year), find ordinal dates with the [Day of Year Calculator](/calendar/day-of-year), and build repeating quarterly schedules with the [Recurring Date Calculator](/calculators/recurring-date-calculator).' },
        ],
      },
      {
        heading: 'Worked Example: A Fiscal Year Starting in April',
        blocks: [
          { type: 'p', text: 'Set the fiscal start month to April and the calculator rebuilds the year around that anchor. For a fiscal year whose first quarter begins on 1 April 2026:' },
          {
            type: 'table',
            headers: ['Quarter', 'Start', 'End', 'Days'],
            rows: [
              ['Q1', '1 April 2026 (Wednesday)', '30 June 2026 (Tuesday)', '91'],
              ['Q2', '1 July 2026 (Wednesday)', '30 September 2026 (Wednesday)', '92'],
              ['Q3', '1 October 2026 (Thursday)', '31 December 2026 (Thursday)', '92'],
              ['Q4', '1 January 2027 (Friday)', '31 March 2027 (Wednesday)', '90'],
            ],
          },
          { type: 'p', text: 'The four quarters total 365 days, but they are not equal: Q4 is short because 2027 is a common year with a 28-day February, and Q1 is long because it contains 30-day June instead of February. Fiscal labelling then varies by convention — the United States federal fiscal year runs 1 October to 30 September and is named for the calendar year in which it ends. If an April-anchored organisation labels the same way, the quarter above belongs to fiscal year 2027, the year ending 31 March 2027, even though it starts in 2026. Always state the dates, not just the label.' },
        ],
      },
      {
        heading: 'Day Counts per Quarter and the 91-Day Assumption',
        blocks: [
          { type: 'p', text: 'Calendar quarters are never all the same length. February alone makes Q1 the shortest, and the leap day sometimes repairs it:' },
          {
            type: 'table',
            headers: ['Quarter', 'Common year', 'Leap year'],
            rows: [
              ['Q1 (Jan–Mar)', '90', '91'],
              ['Q2 (Apr–Jun)', '91', '91'],
              ['Q3 (Jul–Sep)', '92', '92'],
              ['Q4 (Oct–Dec)', '92', '92'],
            ],
          },
          { type: 'p', text: 'The most common planning mistake is assuming every quarter has 91 days. Four quarters of 91 days total 364 — one day short of a common year and two short of a leap year — so any schedule built on 91-day quarters drifts behind the real quarter ends year after year. The second mistake is comparing periods of unequal length without normalising: a 92-day Q3 carries about two percent more calendar days than a 90-day Q1, which visibly distorts per-day revenue, utilisation, and run-rate figures.' },
          { type: 'p', text: 'Use the calculator\'s actual day counts for any per-day metric, or convert the totals to a daily rate before comparing quarters.' },
        ],
      },
      {
        heading: 'How Quarter Boundaries Shift Reporting',
        blocks: [
          { type: 'p', text: 'Quarter ends move through the week: 31 March 2026 is a Tuesday, 31 March 2027 is a Wednesday, and the date shifts again the year after. Each shift changes how many working days sit inside the close window, how long a quarter-end review takes, and whether a cut-off lands on a weekend.' },
          { type: 'p', text: 'Boundaries also move across holidays and month-length patterns, so "the same quarter last year" is not automatically comparable. Q1 2026 has 90 days and Q1 2027 has 90 as well, but Q1 2028 — which contains a leap-day February — has 91. Year-over-year comparisons should therefore be normalised per day or aligned to equal-length windows.' },
          { type: 'p', text: 'Organisations that report by week anchor these windows to Monday or Sunday instead, which is where [ISO week numbers](/calendar/week-number) and the [Working Days Calculator](/calculators/working-days) come in: count the business days between the boundaries the calculator hands you.' },
        ],
      },
    ],
    guideSlugs: ['calendar-systems', 'week-numbers'],
    related: ['week-number', 'day-of-year', 'leap-year', 'working-days'],
    faqs: [
      ['What quarter is October 2026 in?', 'In calendar quarters, October is the first month of Q4 2026. With a fiscal year starting in October, it is the first month of fiscal Q1 2027.'],
      ['How many days are in a quarter?', 'Calendar quarters run 90, 91, 92, or 92 days in a common year (Q1 to Q4). Leap years add one day to Q1.'],
      ['What is the difference between calendar and fiscal quarters?', 'Calendar quarters always start in January. Fiscal quarters start in whatever month the organisation\'s financial year begins — April, July, October, or another month.'],
      ['How do I know which quarter a past date was in?', 'Enter the date in the first mode. The calculator returns the quarter label, its full date range, and how much of it had elapsed.'],
      ['Does the calculator count business days in the quarter?', 'No — it counts calendar days. For the working days inside a quarter, enter the quarter start and end dates in the [Working Days Calculator](/calculators/working-days).'],
      ['Why is Q1 shorter than the other quarters?', 'Because February sits inside it. In a common year, January plus February plus March give Q1 only 90 days, against 91, 92 and 92 for Q2 to Q4. A leap year adds 29 February and lifts Q1 to 91 days — the same length as Q2.'],
      ['Can a fiscal quarter be exactly 13 weeks?', 'Yes — 13 weeks is 91 days. Week-based calendars, such as the retail 4-5-4 calendar, build quarters from whole weeks: 13 weeks times four is 52 weeks, or 364 days, so a 53rd week is added roughly every five to six years to keep the year aligned.'],
    ],
    sources: [
      ['USAGov — The federal budget process', 'https://www.usa.gov/federal-budget-process'],
      ['US Treasury — Accounting and Budget FAQs', 'https://home.treasury.gov/subfooter/faqs/accounting-budget-faqs'],
      ['National Retail Federation — 4-5-4 Calendar', 'https://nrf.com/resources/4-5-4-calendar'],
      ['Congressional Research Service — Basic Federal Budgeting Terminology', 'https://www.congress.gov/crs-product/98-410'],
    ],
  },
  'day-of-year': {
    answer: 'See which day of the year any date is — its ordinal number out of 365 or 366 — together with the days remaining in that year, the percentage complete, leap-year status, and how many weekdays are left after the date.',
    intro: [
      'The ordinal day, or day of the year, numbers every date from 1 January to 31 December: 1 January is day 1, 1 March is day 60 in a common year, 31 December is day 365. It is the natural answer to "what day number is today?", and it is the basis of ordinal dates in ISO 8601 and of Julian dates used in astronomy and logistics.',
      'The same screen answers the closely related question: how many days are left in this year. Enter a date and you get the ordinal position, the days still remaining after it, the share of the year already gone, whether the year is a leap year, and the number of weekdays after the date — handy for counting working days to the year end.',
    ],
    howTo: [
      'Enter the date you want to place in the year.',
      'Select "Calculate day of year".',
      'Read the ordinal day out of the year total, the days remaining, and the percentage complete.',
      'Use the weekday count for working-day planning to 31 December.',
    ],
    sections: [
      {
        heading: 'What the Ordinal Day Number Means',
        blocks: [
          { type: 'p', text: 'Ordinal position is simply the date\'s distance from 1 January, counting the start date as day 1. Because the count starts at 1, the ordinal is always one more than the number of days that have fully passed.' },
          {
            type: 'table',
            headers: ['Date', 'Common year (365)', 'Leap year (366)'],
            rows: [
              ['1 January', '1', '1'],
              ['1 March', '60', '61'],
              ['1 October', '274', '275'],
              ['31 December', '365', '366'],
            ],
          },
          { type: 'p', text: 'The only difference between leap and common years appears after February: from 1 March onward, every ordinal in a leap year is one higher than in a common year.' },
        ],
      },
      {
        heading: 'Days Left in the Year',
        blocks: [
          { type: 'p', text: 'Days remaining counts from the day after your date to 31 December, so a date\'s own day is treated as used rather than remaining. On 31 December the count is zero; on 1 January it is 364 in a common year and 365 in a leap year.' },
          { type: 'p', text: 'For counting toward a fixed year-end moment rather than a calendar date, the [Countdown Calculator](/time/countdown) runs a live timer to a target date and time, and [Days Between Dates](/calculators/days-between-dates) measures any two dates against each other.' },
        ],
      },
      {
        heading: 'Leap Years Change the Count',
        blocks: [
          { type: 'p', text: 'A leap year has 366 days, so it has one extra day to run out and one higher ordinal everywhere after 29 February. The calculator checks the Gregorian rule — divisible by 4, except centuries unless divisible by 400 — and states which kind of year it found.' },
          { type: 'p', text: '2026 and 2027 are common years with 365 days. 2028 is a leap year with 366. For the full rule, see the [Leap Year Calculator](/calendar/leap-year).' },
        ],
      },
      {
        heading: 'Weekdays Remaining in the Year',
        blocks: [
          { type: 'p', text: 'Alongside the calendar count, the result reports how many Monday-to-Friday dates fall after your date up to 31 December. That is the honest number for year-end work: statutory holidays are not removed, so subtract those yourself or check against your local calendar.' },
          { type: 'p', text: 'Weekday counts of this kind use the same convention as the [Working Days Calculator](/calculators/working-days) and the [Business Date Calculator](/calculators/business-date-calculator).' },
        ],
      },
      {
        heading: 'Where Ordinal Dates Appear',
        blocks: [
          { type: 'ul', items: [
            'ISO 8601 ordinal dates write the year and day number together, such as 2026-275 for the 275th day of 2026.',
            'Logistics and file naming use day-of-year to keep batches in chronological sort order without month names.',
            'Astronomy and publishing use Julian day numbers, a continuous count that is related but not identical to the calendar ordinal.',
          ] },
          { type: 'p', text: 'None of these require the slash-format ambiguity that the [Date Format Converter](/converters/date-format-converter) resolves — ordinal dates carry the year and a single unambiguous number.' },
          { type: 'h3', text: 'File naming and log sorting in practice' },
          { type: 'p', text: 'A daily export named report_2026-115.csv sorts before report_2026-275.csv in any alphabetical listing, because fixed-width numbers sort the same way the digits they stand for do. Daily log and backup files work the same way — backup_2026_275.log lands in date order without anyone parsing its name. Two details matter: pad the ordinal to three digits, so day 5 is 005 and not 5, and always keep the year in the name, because the ordinal alone restarts at 001 every January.' },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Group the remainder of the year into reporting periods with the [Quarter Calculator](/calendar/quarter-calculator), confirm the weekday with [Day of the Week](/calendar/day-of-week), and check the year length with [Leap Year](/calendar/leap-year).' },
        ],
      },
      {
        heading: 'ISO 8601 Ordinal Dates (YYYY-DDD)',
        blocks: [
          { type: 'p', text: 'ISO 8601 allows a date to be written as the year followed by the day number: a four-digit year, a hyphen, and a three-digit ordinal padded with leading zeros. 1 January is 001, 31 December is 365 in a common year and 366 in a leap year.' },
          {
            type: 'table',
            headers: ['Ordinal', 'Date', 'Year type'],
            rows: [
              ['2026-001', '1 January 2026', 'Common'],
              ['2026-115', '25 April 2026', 'Common'],
              ['2026-275', '2 October 2026', 'Common'],
              ['2026-365', '31 December 2026', 'Common'],
              ['2028-060', '29 February 2028', 'Leap'],
            ],
          },
          { type: 'p', text: 'Because every value is the same width, ordinal dates sort in true chronological order as plain text — 2026-115 comes before 2026-275 with no date parsing — and they carry no month/day ambiguity at all, which is the problem the [Date Format Converter](/converters/date-format-converter) exists to solve. The basic form drops the hyphen (2026115) but keeps the same fixed width.' },
        ],
      },
      {
        heading: 'Worked Examples: Counting Day of Year by Hand',
        blocks: [
          { type: 'p', text: 'Add the lengths of all preceding months, then the day of the month. For 15 June 2026: 31 (January) + 28 (February) + 31 (March) + 30 (April) + 31 (May) = 151, plus 15 = day 166. For 4 July 2026 the six-month total is 181, so the date is day 185.' },
          { type: 'p', text: 'In a leap year every ordinal from 1 March onward gains one day: 4 July 2028 is day 186. Two popular reference points move with that shift — day 100 falls on 10 April in a common year but 9 April in a leap year, and Christmas is day 359 in a common year and day 360 in a leap year.' },
          { type: 'p', text: 'The reverse direction works as well: January through August 2026 total 243 days, so day 271 is 271 − 243 = 28 September — the Monday that starts ISO week 40 of 2026.' },
        ],
      },
      {
        heading: 'Day of Year vs Week Number',
        blocks: [
          { type: 'p', text: 'Ordinal day and ISO week number answer different questions. The ordinal counts from 1 January with no reference to weeks at all; the week number follows the first-Thursday rule and can belong to an entirely different year.' },
          {
            type: 'ul',
            items: [
              '1 January 2027 is day 1 of 2027 but ISO week 53 of 2026 — the ordinal resets while the week-year has not.',
              'Week 40 of 2026 runs from Monday 28 September (day 271) to Sunday 4 October (day 277): seven consecutive ordinal days, always.',
              '31 December 2026 is day 365 and week 53, whereas 1 January 2026 was day 1 and week 1 — the extreme ends of the ordinal scale inside one week-year\'s numbering.',
            ],
          },
          { type: 'p', text: 'Use ordinal dates when you need a position within the year; use the [Week Number Calculator](/calendar/week-number) when you need reporting weeks. Mixing the two up is the usual reason a "week 1" appears to show up in December.' },
        ],
      },
    ],
    guideSlugs: ['calendar-systems', 'leap-years'],
    related: ['leap-year', 'quarter-calculator', 'countdown', 'week-number'],
    faqs: [
      ['What is the day of year for today?', 'Enter today\'s date above. In 2026, 2 October is the 275th day of the year, with 90 days remaining after it.'],
      ['Does the day of year count include 1 January?', 'Yes. 1 January is day 1, not day 0.'],
      ['How do I calculate day of year by hand?', 'Add the days of all preceding months, then add the day of the month. After February, remember to add one extra day in a leap year.'],
      ['What is the difference between days left and days remaining?', 'They are the same count: the days from tomorrow through 31 December. The date you enter counts as used, not remaining.'],
      ['Does this count working days to the end of the year?', 'The result includes a Monday-to-Friday count after your date. Public holidays are not removed; use the [Working Days Calculator](/calculators/working-days) when you need to check a specific range.'],
      ['What is the ISO ordinal date for 25 April 2026?', '2026-115. The format is the year, a hyphen, and the three-digit day number: 25 April is the 115th day of 2026, because January through March total 90 days. In a leap year the same date would be day 116.'],
      ['What day of the year is Christmas?', 'Day 359 in a common year and day 360 in a leap year. The first eleven months total 334 days in a common year and 335 in a leap year, so 334 + 25 = 359 — with the leap day pushing it to 360.'],
    ],
    sources: [
      ['ISO — ISO 8601 date and time format', 'https://www.iso.org/iso-8601-date-and-time-format.html'],
      ['ISO — ISO 8601-1:2019 Date and time', 'https://www.iso.org/standard/70907.html'],
      ['NIST — Timekeeping and clocks FAQs', 'https://www.nist.gov/pml/time-and-frequency-division/timekeeping-and-clocks-faqs'],
      ['US Naval Observatory — Julian Date Converter', 'https://aa.usno.navy.mil/data/JulianDate'],
    ],
  },
}
