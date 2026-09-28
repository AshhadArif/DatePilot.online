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
    related: ['day-of-week', 'leap-year', 'days-between-dates', 'working-days'],
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
    related: ['age-calculator', 'days-between-dates', 'week-number', 'day-of-week'],
    faqs: [
      ['How do I know if a year is a leap year?', 'Check divisibility: divisible by 4 means leap year, unless it is a century year divisible by 100, which is a leap year only when also divisible by 400. The calculator above applies this automatically.'],
      ['Is 2026 a leap year?', 'No. 2026 is not divisible by 4, so it has 365 days. The next leap year is 2028.'],
      ['Why are century years not leap years?', 'Because the solar year is slightly shorter than 365.25 days. Dropping three century leap years every four centuries keeps the calendar aligned with the seasons.'],
      ['How many days are in a leap year?', '366. The extra day is 29 February.'],
      ['Does a leap year happen every 4 years?', 'Almost always — with the exception of century years that are not divisible by 400, such as 1900 and 2100.'],
    ],
  },
}
