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
    ],
    guideSlugs: ['day-of-week', 'calendar-systems', 'week-numbers'],
    related: ['week-number', 'leap-year', 'days-between-dates', 'working-days'],
    faqs: [
      ['How do I know what day of the week a date was?', 'Enter the date in the calculator above. It returns the full weekday name for any past or future date in the Gregorian calendar.'],
      ['Is the weekday the same in every time zone?', 'Yes. A calendar date has one weekday worldwide. A moment near midnight can be a different date in another zone, but each of those dates keeps its own fixed weekday.'],
      ['Why does my birthday fall on a different weekday every year?', 'A common year has 365 days — 52 weeks and 1 day — so the anniversary moves forward one weekday. In the year after a leap year it can move by two.'],
      ['What about dates before the Gregorian calendar was adopted?', 'This calculator works proleptically, applying Gregorian rules to all dates. For dates before a country switched calendars, the historical weekday may differ by several days.'],
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
    ],
    guideSlugs: ['week-numbers', 'iso-week-date', 'day-of-week'],
    related: ['day-of-week', 'quarter-calculator', 'leap-year', 'day-of-year'],
    faqs: [
      ['How do I find the current week number?', 'The "Current Week Number" panel above shows the live ISO week, its week-year, and the Monday that starts it. For a past or future date use the calculator at the top of the page.'],
      ['What is the difference between the calendar year and the week-year?', 'They usually match, but not always. A week belongs to the year whose Thursday falls in it, so days in early January can belong to the previous week-year and days in late December to the next one.'],
      ['Why does my date show week 53?', 'Because its year has 53 ISO weeks, which happens when 1 January is a Thursday, or a Wednesday in a leap year. 2026 is such a year.'],
      ['Do weeks start on Sunday or Monday?', 'In ISO 8601, Monday. Some regional calendars start on Sunday, which produces different week numbers near year boundaries.'],
      ['What does ISO week 2026-W40 mean?', 'It is the ISO week-date format: year, W for week, and the week number — here week 40 of 2026, which runs from Monday 28 September to Sunday 4 October 2026.'],
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
        ],
      },
      {
        heading: '29 February and Leap-Day Birthdays',
        blocks: [
          { type: 'p', text: '29 February appears only in leap years, roughly four times per century. People born on it have a real birthday only in leap years; in other years the date does not exist.' },
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
    ],
    guideSlugs: ['leap-years', 'calendar-systems', 'how-to-calculate-age'],
    related: ['age-calculator', 'day-of-year', 'week-number', 'day-of-week'],
    faqs: [
      ['How do I know if a year is a leap year?', 'Check divisibility: divisible by 4 means leap year, unless it is a century year divisible by 100, which is a leap year only when also divisible by 400. The calculator above applies this automatically.'],
      ['Is 2026 a leap year?', 'No. 2026 is not divisible by 4, so it has 365 days. The next leap year is 2028.'],
      ['Why are century years not leap years?', 'Because the solar year is slightly shorter than 365.25 days. Dropping three century leap years every four centuries keeps the calendar aligned with the seasons.'],
      ['How many days are in a leap year?', '366. The extra day is 29 February.'],
      ['Does a leap year happen every 4 years?', 'Almost always — with the exception of century years that are not divisible by 400, such as 1900 and 2100.'],
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
          { type: 'p', text: 'Fiscal year labels follow the year in which the quarter ends, so fiscal year 2027 starting in October 2026 covers1 October 2026 to 30 September 2027 — the standard convention for October-anchored fiscal years.' },
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
          { type: 'p', text: 'Q1 is always the shortest in common years and Q2 the longest in leap years, because February sits inside it. Anything that promises equal 91-day quarters is rounding.' },
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
          { type: 'p', text: 'Because a quarter is just three calendar months, it inherits all the usual month-boundary behaviour: quarters in leap years gain a day in Q1, and quarter boundaries never fall on the same weekday twice in a row.' },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Check the year itself with the [Leap Year Calculator](/calendar/leap-year), find ordinal dates with the [Day of Year Calculator](/calendar/day-of-year), and build repeating quarterly schedules with the [Recurring Date Calculator](/calculators/recurring-date-calculator).' },
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
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Group the remainder of the year into reporting periods with the [Quarter Calculator](/calendar/quarter-calculator), confirm the weekday with [Day of the Week](/calendar/day-of-week), and check the year length with [Leap Year](/calendar/leap-year).' },
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
    ],
  },
}
