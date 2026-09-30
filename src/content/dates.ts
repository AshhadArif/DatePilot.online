import type { ToolContent } from './types'

export const dateContent: Record<string, ToolContent> = {
  'date-calculator': {
    answer: 'A date calculator works out a new calendar date from any starting date and a number of days. Add days to move forward, enter a negative number to move back, and the calculator handles month lengths, leap years, and year boundaries for you.',
    intro: [
      'Most date questions come down to one of two things: what date is a certain number of days away, or how many days lie between two dates. This calculator answers the first question. Give it a starting date and a number of days, and it returns the exact calendar date — including the weekday — without you counting across February, 31-day months, or a new year.',
      'It also works backwards. Enter a negative number of days to find a date in the past, which is the quickest way to answer "what date was 30 days ago?" or to work back from a deadline.',
    ],
    howTo: [
      'Choose the starting date. It defaults to today.',
      'Enter the number of days to add. Use a negative number, such as -30, to subtract days instead.',
      'Select "Calculate result".',
      'Read the resulting calendar date. If you need the weekday as well, check the [Day of the Week calculator](/calendar/day-of-week).',
    ],
    sections: [
      {
        heading: 'What Is a Date Calculator?',
        blocks: [
          { type: 'p', text: 'A date calculator performs calendar arithmetic: it takes a known date, moves a whole number of days forward or backward, and returns the date it lands on. Unlike a stopwatch or a clock calculation, it works with calendar days — midnight to midnight — so the result is a date, not an amount of elapsed time.' },
          { type: 'p', text: 'That distinction matters more than it sounds. A calendar month is not 30 days, a calendar year is not exactly 365 days, and a calendar day is not always 24 elapsed hours when clocks change for daylight saving. A date calculator follows the calendar instead of an average, which is why its answer stays correct across February and the end of December.' },
        ],
      },
      {
        heading: 'How to Calculate a Date',
        blocks: [
          {
            type: 'ol',
            items: [
              'Identify the date you are starting from.',
              'Decide how many days you need to move, and in which direction.',
              'Count forward or backward through the calendar one month at a time, using the real length of each month.',
              'Arrive at the resulting date and check the month and year have rolled over correctly.',
            ],
          },
          { type: 'p', text: 'The calculator does all four steps at once. The manual version is easy to get wrong precisely at the points where it matters most: the end of a 30-day month, the end of February, and the last day of the year.' },
        ],
      },
      {
        heading: 'Add Days to a Date',
        blocks: [
          { type: 'p', text: 'To move forward, enter the starting date and a positive number of days. The result is the date that falls exactly that many calendar days later — the usual answer to "what date is 30 days from now?"' },
          { type: 'p', text: 'A simple worked case: 15 January 2026 plus 30 days. January has 31 days, so 16 more days reach 31 January; the remaining 14 days fall into February, giving 14 February 2026. Entering the same calculation in the calculator produces the same result without counting by hand.' },
          { type: 'p', text: 'For more examples of moving forward, including the common 7, 30, 60, 90, and 100-day spans, see [Add Days to Date](/calculators/add-days).' },
        ],
      },
      {
        heading: 'Subtract Days From a Date',
        blocks: [
          { type: 'p', text: 'To move backward, enter the same kind of calculation with a negative number of days. The calculator walks back through the calendar, borrowing from the previous month when the subtraction passes day 1, and borrows a year when it passes 1 January.' },
          { type: 'p', text: '5 January 2026 minus 10 days gives 26 December 2025, because the count crosses the year boundary. The result changes year as well as date — a detail that manual counting often misses.' },
          { type: 'p', text: 'The dedicated [Subtract Days From Date calculator](/calculators/subtract-days) covers this direction in more detail, including working back from deadlines.' },
        ],
      },
      {
        heading: 'Calculate a Date in the Future',
        blocks: [
          { type: 'p', text: 'Future dates are the most common use: a payment due 30 days after an invoice, a warranty that expires 365 days after purchase, a project milestone 60 days from kickoff. Enter today as the starting date, enter the number of days in the agreement, and read the calendar date the obligation falls on.' },
          { type: 'p', text: 'Two checks are worth doing on any future date. First, confirm the result is in the month you expected — if a "30-day" deadline lands in the following month, the start month must have had fewer than 30 days left. Second, confirm the weekday suits the task, because a date that lands on a weekend may not be a working day.' },
        ],
      },
      {
        heading: 'Calculate a Date in the Past',
        blocks: [
          { type: 'p', text: 'Past dates answer the same arithmetic in reverse: what date was 90 days ago, when did a period start, what was the date exactly one year before an event. Enter the reference date and a negative day count, or use the [Days Between Dates calculator](/calculators/days-between-dates) if you have both ends of the period already.' },
          { type: 'p', text: 'Working backwards is also how many people check a result: if 30 days from 1 January is 31 January, then 30 days before 31 January should return 1 January.' },
        ],
      },
      {
        heading: 'Calculate Dates Using Months and Days',
        blocks: [
          { type: 'p', text: 'Days, weeks, months, and years are not interchangeable, and choosing the wrong unit is the most common source of a wrong date.' },
          {
            type: 'table',
            headers: ['Unit', 'What it means', 'Example'],
            rows: [
              ['Days', 'Every calendar day, including weekends and holidays', '7 days is always 7 days'],
              ['Weeks', 'A multiple of 7 days', '2 weeks = 14 days'],
              ['Months', 'A calendar month, so 28 to 31 days', '1 month from 31 January is February, not 3 March'],
              ['Years', 'A calendar year, 365 or 366 days', '1 year from 29 February 2024 lands in a non-leap year'],
            ],
          },
          { type: 'p', text: 'This calculator works in days, so a "month" is never silently treated as 30 days. If you need to add calendar months or years instead, say "one month from today", the result depends on the length of that particular month, and you should check the [Date Calculator Examples](/calculators/add-days) or work it out month by month.' },
          { type: 'note', text: 'Adding weeks is the one shortcut that is always safe: adding 7, 14, or 21 days is exactly the same as adding 1, 2, or 3 weeks.' },
        ],
      },
      {
        heading: 'Date Calculator Examples',
        blocks: [
          {
            type: 'table',
            headers: ['Starting date', 'Days', 'Result'],
            rows: [
              ['15 March 2026', '+45', '29 April 2026 (Wednesday)'],
              ['15 January 2026', '+30', '14 February 2026 (Saturday)'],
              ['31 January 2026', '+1', '1 February 2026 (Sunday)'],
              ['20 December 2026', '+20', '9 January 2027 (Saturday)'],
              ['28 September 2026', '+100', '6 January 2027 (Wednesday)'],
              ['5 January 2026', '−10', '26 December 2025 (Friday)'],
              ['31 January 2026', '−31', '31 December 2025 (Wednesday)'],
            ],
          },
          { type: 'p', text: 'Two rows cross a year boundary and two cross February. Those are the cases worth checking by hand, because they are where a quick mental count most often goes wrong.' },
        ],
      },
      {
        heading: 'How Date Calculations Work',
        blocks: [
          { type: 'p', text: 'Internally the calculator takes the starting date, adds the number of days to its day-of-month value, and lets the calendar normalise the result. When the day value runs past the end of the month, it rolls into the next month; when it runs past December, it rolls into the next year. The same mechanism in reverse handles negative day counts.' },
          { type: 'p', text: 'Because the calculation is done on calendar dates rather than on clock timestamps, daylight saving transitions do not change the answer. A calendar day always counts as one day, whether that day lasted 23, 24, or 25 hours.' },
          { type: 'p', text: 'Everything here follows the Gregorian calendar, the standard civil calendar used worldwide. For the rules behind leap years and century years, see the [Leap Year Calculator](/calendar/leap-year).' },
        ],
      },
      {
        heading: 'Leap Years and Date Calculations',
        blocks: [
          { type: 'p', text: 'A leap year adds one day to the calendar — 29 February — which changes the answer to any date calculation that crosses it. From 1 March 2023 to 1 March 2024 the span contains 366 days, because February 2024 has 29 days. The same anniversary one year later, 1 March 2024 to 1 March 2025, contains 365.' },
          { type: 'p', text: 'Shorter spans follow the same rule: adding 30 days to 1 February 2024 gives 2 March 2024, while the identical count from 1 February 2025 gives 3 March 2025 — the same day count lands on a different date because one span passes through 29 February and the other does not.' },
          { type: 'p', text: 'The Gregorian calendar inserts a leap day in years divisible by four, except century years, which are leap years only when divisible by 400. So 2000 was a leap year and 2100 will not be. The calculator reads this from the browser Gregorian calendar automatically, so no manual adjustment is needed — but if you are checking a result by hand, February is the first place to look.' },
        ],
      },
      {
        heading: 'Common Date Calculation Mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              'Assuming every month has 30 days. February has 28 or 29, and four months have 31.',
              'Counting the starting date as day one. Adding 1 day to a date moves to the very next day; it does not include the start date in the count.',
              'Forgetting the year changes. Anything that crosses 31 December moves into the following year.',
              'Mixing up days and months. "30 days from now" and "one month from now" only agree when the start month happens to be 30 days long.',
              'Ignoring the weekday of the result. A date that lands on a Saturday or Sunday may need to move to the nearest working day — check it with the [Working Days calculator](/calculators/working-days) if the deadline is a business one.',
            ],
          },
        ],
      },
      {
        heading: 'Related Date Tools',
        blocks: [
          { type: 'p', text: 'If you already know both ends of a period, count it with [Days Between Dates](/calculators/days-between-dates). For a single direction, use [Add Days to Date](/calculators/add-days) or [Subtract Days From Date](/calculators/subtract-days). Business deadlines should be checked against [Working Days](/calculators/working-days), age questions against the [Age Calculator](/calculators/age-calculator), and planning questions against the [Day of the Week calculator](/calendar/day-of-week).' },
        ],
      },
    ],
    guideSlugs: ['date-calculations', 'add-subtract-days'],
    related: ['add-days', 'subtract-days', 'days-between-dates', 'working-days'],
    faqs: [
      ['What happens if I add days that cross February?', 'The calculator handles it automatically. 31 January 2026 plus 1 day is 1 February 2026, and if the year is a leap year February has 29 days instead of 28, so a span that crosses 29 February is one day longer than the same span in a common year.'],
      ['Can I subtract days instead of adding?', 'Yes. Enter a negative number of days, for example -30, and the calculator moves the date backward across month and year boundaries.'],
      ['Is adding days the same as adding hours?', 'No. This calculator works with calendar days, midnight to midnight. During a daylight saving change a calendar day can be 23 or 25 elapsed hours, so for time-based differences use the [Time Difference Calculator](/time/time-difference).'],
      ['How do I calculate a date without a calculator?', 'Break the interval at each month boundary: count the remaining days in the start month, add the full months in between, then add the days used in the final month. Always check whether the span crosses February and 31 December.'],
    ],
  },

  'days-between-dates': {
    answer: 'The days between dates calculator measures how many calendar days separate two dates. Enter a start date and an end date and it returns the elapsed day count, also called a date difference, using an exclusive count that does not include either named date.',
    intro: [
      'How many days are there between two dates? It is one of the most common date questions, and the answer depends on one decision: whether you count the first day, the last day, or neither. This calculator reports the elapsed gap — the number of midnights between the two dates — which is the convention used for time spans, project phases, and most general date difference questions.',
      'The tool also works in either direction, so the order of the two dates does not matter, and it counts real calendar days across February, 31-day months, and year boundaries. If you need weekdays only rather than every calendar day, see the section on calendar days versus working days below.',
    ],
    howTo: [
      'Enter the earlier date as the start date.',
      'Enter the later date as the end date.',
      'Select "Calculate result".',
      'Read the number of days. This is the elapsed gap: neither named date is counted as an extra day.',
      'If you need to include both dates in the count, add 1 to the result — the reason is explained below.',
    ],
    sections: [
      {
        heading: 'How Many Days Are Between Two Dates?',
        blocks: [
          { type: 'p', text: 'The number of days between two dates is the count of midnights that fall between them. From 1 January 2026 to 1 February 2026 there are 31 days, because January contains 31 days. From 1 January to 31 January there are 30 days, because the count runs from the first midnight after the start date up to the end date.' },
          { type: 'p', text: 'The same measurement is often called a date difference, a day counter, or simply "how many days between". All of them describe the same calculation, and the calculator above returns it for any pair of dates, past or future.' },
        ],
      },
      {
        heading: 'How the Days Between Dates Calculator Works',
        blocks: [
          { type: 'h3', text: 'Start date and end date' },
          { type: 'p', text: 'You supply two dates. The calculator converts each one to midnight on that calendar day, so the time of day you entered never affects the result.' },
          { type: 'h3', text: 'Calendar-day difference' },
          { type: 'p', text: 'The two midnights are compared and the difference is divided by the length of one calendar day. That gives a whole number of days, correct across any month or year boundary and unaffected by daylight saving.' },
          { type: 'h3', text: 'Order does not matter' },
          { type: 'p', text: 'The absolute difference is reported, so entering the later date first still returns a positive number. The calculator does not care which input is earlier.' },
        ],
      },
      {
        heading: 'How to Calculate the Number of Days Between Dates',
        blocks: [
          { type: 'p', text: 'To calculate the number of days between two dates by hand, break the interval at each month boundary: count the days left in the start month, add the complete months in between, then add the days used in the final month.' },
          { type: 'p', text: 'For example, 15 January to 15 March is 16 days in January, 28 days in February, and 15 days in March — 59 days in a common year, 60 in a leap year. The calculator does the same interval arithmetic on real calendar dates, so February length and the month rollover are never something you have to track.' },
          { type: 'p', text: 'One decision comes before any counting: whether the two named dates themselves are part of the count. The two conventions differ by exactly one day, and the next section explains which one applies.' },
        ],
      },
      {
        heading: 'How Many Days Since a Date?',
        blocks: [
          { type: 'p', text: 'To find how many days have passed since a historical date, enter that date as the start date and today as the end date. The calculator returns the elapsed days from that moment to today — the answer to "how many days since…?" for a birthday, an event, a launch, or a deadline.' },
          { type: 'p', text: 'Because the count is exclusive, today itself is not counted as an extra day. If you want the number of days that includes both the original date and today, add 1.' },
          { type: 'p', text: 'The reverse question — how many days until a date — uses the same calculation with the dates swapped. For a live countdown in days and hours, use the [Countdown Calculator](/time/countdown).' },
        ],
      },
      {
        heading: 'Days Between Dates Examples',
        blocks: [
          {
            type: 'table',
            headers: ['From', 'To', 'Elapsed days', 'Inclusive (+1)'],
            rows: [
              ['1 January 2026', '31 January 2026', '30', '31'],
              ['1 January 2026', '1 February 2026', '31', '32'],
              ['28 February 2026', '1 March 2026', '1', '2'],
              ['31 December 2025', '1 January 2026', '1', '2'],
              ['15 March 2026', '15 April 2026', '31', '32'],
              ['28 September 2026', '25 December 2026', '88', '89'],
              ['1 February 2024', '1 March 2024', '29', '30'],
              ['1 December 2025', '1 March 2026', '90', '91'],
            ],
          },
          { type: 'p', text: 'The rows cover the four cases worth practising: two dates in the same month, two dates in different months, two dates in different years, and a span across a leap February. The seventh row is the leap-year case — 1 February to 1 March 2024 covers all 29 days of February 2024 — while the third row shows the single-day gap at the end of a common-year February. The eighth row crosses both a year boundary and a 31-day month.' },
        ],
      },
      {
        heading: 'Inclusive vs Exclusive Date Counting',
        blocks: [
          { type: 'p', text: 'There are two correct answers to almost every "how many days between" question, and they differ by one day. Choosing the wrong one is the most common mistake in date arithmetic.' },
          {
            type: 'table',
            headers: ['Convention', 'What is counted', 'Mon 5 Jan to Fri 9 Jan'],
            rows: [
              ['Exclusive (elapsed gap)', 'Neither named date is counted as an extra day', '4 days'],
              ['Inclusive (schedule count)', 'Both the first and the last date are counted', '5 days'],
            ],
          },
          { type: 'p', text: 'The calculator uses the exclusive convention: it reports the elapsed gap, the number of midnights between the two dates. The inclusive count is always exactly one greater whenever the two dates differ.' },
          { type: 'h3', text: 'Which one do I need?' },
          {
            type: 'ul',
            items: [
              'Elapsed time, phases, and "how long between" — exclusive. A hotel stay from 1 January to 3 January is 2 nights.',
              'Schedules that include both ends — inclusive. Leave from Monday to Wednesday is 3 days away from work.',
              'Legal, tax, or contractual deadlines — check the wording of the rule itself, because jurisdictions differ on whether the first or last day is counted.',
            ],
          },
        ],
      },
      {
        heading: 'Calendar Days vs. Working Days',
        blocks: [
          { type: 'p', text: 'Every result on this page counts calendar days — Saturdays, Sundays, and public holidays included. That is the right answer for elapsed time, but it is usually the wrong answer for a business question.' },
          { type: 'p', text: 'A working day count excludes weekends, so the number is always lower. A business day count may also exclude public holidays, which differ by country, state, and industry. The two conventions produce different numbers from identical dates.' },
          {
            type: 'table',
            headers: ['Count type', 'Weekends', 'Holidays', 'Typical use'],
            rows: [
              ['Calendar days', 'Counted', 'Counted', 'Elapsed time, ages, countdowns'],
              ['Working days', 'Not counted', 'Not counted by default', 'Project schedules, delivery estimates'],
              ['Business days', 'Not counted', 'Varies by policy', 'Contracts, invoices, payment terms'],
            ],
          },
          { type: 'p', text: 'For weekday-only counting use the [Working Days Calculator](/calculators/working-days), which counts Monday to Friday across a range and states clearly that holidays are not removed automatically.' },
        ],
      },
      {
        heading: 'Common Mistakes When Counting Days',
        blocks: [
          {
            type: 'ul',
            items: [
              'Confusing inclusive and exclusive counts. If two people report answers that differ by one, this is almost always the reason.',
              'Counting the first day twice by hand, which silently turns an exclusive count into an inclusive one.',
              'Assuming February has 28 days without checking the year. A span crossing 29 February is one day longer.',
              'Assuming every month has 30 days when verifying a result.',
              'Reversing the dates. The calculator returns the same answer either way, but a manual count does not.',
              'Using calendar days for a deadline that is expressed in business days, or the other way round.',
            ],
          },
        ],
      },
      {
        heading: 'More Ways to Compare Two Dates',
        blocks: [
          { type: 'p', text: 'A day count is only one way to express a difference. Break the same span into weeks and days with the [Days Calculator](/calculators/days-calculator), find the weekday of either endpoint with the [Day of the Week calculator](/calendar/day-of-week), or compare two moments in clock time with the [Time Difference Calculator](/time/time-difference).' },
          { type: 'p', text: 'When the question runs in one direction instead — the date that falls before a deadline, a notice period worked backwards — the [Subtract Days From Date calculator](/calculators/subtract-days) and the [Add Days to Date calculator](/calculators/add-days) move from a date in a single step.' },
          { type: 'p', text: 'For the conventions behind endpoint counting and why two sources can disagree by a day, read [How to Calculate Days Between Dates](/guides/days-between-dates).' },
        ],
      },
    ],
    guideSlugs: ['days-between-dates', 'date-calculations', 'working-days'],
    related: ['date-calculator', 'days-calculator', 'working-days', 'add-days'],
    faqs: [
      ['Does the result include the start date and the end date?', 'No. The calculator reports an exclusive elapsed gap, so neither named date is added as an extra day. If you need a count that includes both dates — for leave, bookings, or a schedule — add 1 to the result.'],
      ['How do I calculate how many days have passed since a date?', 'Enter the past date as the start date and today as the end date. The result is the number of elapsed days between them. This is the same calculation used for "how many days since" questions.'],
      ['What if I enter the later date first?', 'The result is unchanged. The calculator reports the absolute difference, so the order of the two inputs does not matter.'],
      ['Does this count weekends and holidays?', 'Yes. Every calendar day counts, including Saturdays, Sundays, and public holidays. If you need to exclude weekends, use the [Working Days Calculator](/calculators/working-days).'],
      ['How does it handle leap years?', 'The calculation follows the Gregorian calendar, so February contributes 29 days in a leap year and 28 otherwise. Any span that crosses 29 February is counted correctly without adjustment.'],
    ],
  },

  'days-calculator': {
    answer: 'A days calculator works out dates from a day count: what date is a number of days from today, what date was a number of days ago, and how many days fall between two dates. Enter a reference date and a number of days to get the calendar date in both directions.',
    intro: [
      'A days calculator answers the everyday questions that come up constantly: how many days from today is a deadline, what date is 90 days from now, how many days ago was that, and how many days are left before an event. It is deliberately simpler than a full date calculator — you give it a number of days, and it tells you the dates it points to.',
      'The reference date defaults to today, so the calculator works straight away without any setup. Change it when you need the count to start from a different day, such as an invoice date or a project start.',
    ],
    howTo: [
      'Enter the number of days you want to count.',
      'Choose the reference date. It defaults to today.',
      'Select "Calculate result".',
      'Read both directions: the date that falls after the reference date and the date that falls before it, each with its weekday.',
      'For two dates you already have, use the [Days Between Dates calculator](/calculators/days-between-dates) instead.',
    ],
    sections: [
      {
        heading: 'What Is a Days Calculator?',
        blocks: [
          { type: 'p', text: 'A days calculator converts a number of days into calendar dates, and calendar dates back into a number of days. It is the general-purpose tool for day-based questions, while the more specific calculators handle one direction each: adding days, subtracting days, or measuring the gap between two dates.' },
          { type: 'p', text: 'It counts calendar days, meaning every day including weekends and holidays. If the question is about working days or business days, the count must exclude weekends, and the [Working Days Calculator](/calculators/working-days) is the right tool for that.' },
        ],
      },
      {
        heading: 'Calculate Days From Today',
        blocks: [
          { type: 'p', text: 'Leave the reference date on today and enter a positive number of days. The calculator returns the calendar date that falls that many days from now, along with the weekday it lands on. This is the fastest answer to "what date is 30 days from today?" or "when is 60 days from now?".' },
          { type: 'component', name: 'days-from-today' },
          { type: 'p', text: 'The table above recalculates every time you open the page, so it is never out of date. For a custom number, use the calculator above.' },
        ],
      },
      {
        heading: 'Calculate Days After a Date',
        blocks: [
          { type: 'p', text: 'To count from a date other than today, set the reference date and enter a positive day count. The result is the date that follows the reference date by exactly that many calendar days — useful for payment terms, notice periods, delivery estimates, and any deadline expressed as "N days after…"' },
          { type: 'p', text: 'The calculation crosses month and year boundaries on its own, so a 90-day count from a date in November lands in the following February without you adjusting for the length of each month.' },
        ],
      },
      {
        heading: 'Calculate Days Before a Date',
        blocks: [
          { type: 'p', text: 'A negative day count points backwards. The calculator shows the date that falls before the reference date, which answers "what date was 30 days ago?" and "N days before the hearing date" style questions.' },
          { type: 'p', text: 'Both directions are shown together so you can see the full window around the reference date — the kind of check people usually do when they are working out a return window, a notice period, or a lookback period.' },
        ],
      },
      {
        heading: 'Calculate Days Between Dates',
        blocks: [
          { type: 'p', text: 'When you already know both dates, the question changes from "what date is N days away" to "how many days are between these two dates". That is a measurement rather than an offset, and it belongs to the [Days Between Dates calculator](/calculators/days-between-dates), which reports the elapsed day count for any pair of dates.' },
          { type: 'p', text: 'The two tools share the same rules: calendar days only, and no counting of an extra day for either endpoint unless you add 1 for an inclusive count.' },
        ],
      },
      {
        heading: 'How Day Calculations Work',
        blocks: [
          { type: 'p', text: 'The calculator converts the reference date to a calendar day, adds the number of days you entered, and lets the calendar absorb any overflow into the following month or year. Going backwards uses the same mechanism with a negative count, borrowing days from the previous month when the subtraction passes day 1.' },
          { type: 'p', text: 'Because the arithmetic is done on calendar dates, daylight saving has no effect: a day always counts as one day even when clocks move forward or back. Leap years are handled automatically, so February contributes 29 days in a leap year.' },
          {
            type: 'ul',
            items: [
              '1 week = 7 days, always.',
              '1 month = 28, 29, 30, or 31 days, depending on the month and year.',
              '1 common year = 365 days; 1 leap year = 366 days.',
            ],
          },
        ],
      },
      {
        heading: 'Days Calculator Examples',
        blocks: [
          { type: 'p', text: 'Using 28 September 2026 as the reference date, these are the dates the calculator returns:' },
          {
            type: 'table',
            headers: ['Offset', 'Date', 'Weekday'],
            rows: [
              ['7 days after', '5 October 2026', 'Monday'],
              ['30 days after', '28 October 2026', 'Wednesday'],
              ['60 days after', '27 November 2026', 'Friday'],
              ['90 days after', '27 December 2026', 'Sunday'],
              ['100 days after', '6 January 2027', 'Wednesday'],
              ['30 days before', '29 August 2026', 'Saturday'],
              ['90 days before', '30 June 2026', 'Tuesday'],
            ],
          },
          { type: 'p', text: 'Notice the last two rows: the 100-day count crosses into the next year, and one of the backward counts lands on a Saturday. Weekends matter when the date is a deadline, which is what the working-day tools are for.' },
        ],
      },
      {
        heading: 'Common Questions About Day Counts',
        blocks: [
          { type: 'p', text: 'The three questions that come up most often are whether the starting day is counted, whether weekends are skipped, and what happens when a count crosses February. The starting day is never counted as day one — adding 1 day moves to the very next day. Weekends are always included in a plain day count. February contributes 28 or 29 days depending on the year, and the calculator checks that for you.' },
          { type: 'p', text: 'For the wider picture, [How Date Calculations Work](/guides/date-calculations) explains endpoint conventions, unit differences, and the edge cases that make two answers disagree by a day.' },
        ],
      },
    ],
    guideSlugs: ['date-calculations', 'add-subtract-days'],
    related: ['days-between-dates', 'date-calculator', 'add-days', 'subtract-days'],
    faqs: [
      ['What date is a number of days from today?', 'Enter the number of days and leave the reference date on today. The calculator returns the calendar date and weekday. The "Days From Today" table above already shows the most common offsets, updated each time you load the page.'],
      ['Does a days calculator include weekends?', 'Yes. Plain day counts include Saturdays, Sundays, and holidays. Only working-day or business-day calculations exclude weekends, and those are handled by the [Working Days Calculator](/calculators/working-days).'],
      ['Is a day count the same as a date difference?', 'They are two directions of the same measurement. A day count starts from a known date and asks which date you reach; a date difference starts from two known dates and asks how far apart they are. Use [Days Between Dates](/calculators/days-between-dates) for the second case.'],
      ['What happens when the count crosses a leap year?', 'February contributes 29 days in a leap year and 28 otherwise, so the calculator lands on the correct date without any manual adjustment.'],
    ],
  },

  'add-days': {
    answer: 'Add days to a date to find a future calendar date. Enter a starting date and the number of days to add, and the calculator returns the resulting date, handling month lengths, leap years, and year boundaries automatically.',
    intro: [
      'Adding days to a date is the most common piece of calendar arithmetic: a payment due 30 days after an invoice, a return window that closes 60 days after purchase, a project deadline 90 days from today. The arithmetic is simple in principle and easy to get wrong in practice, because the months in between do not all have the same number of days.',
      'Enter a starting date and a number of days, and this calculator returns the future date — including the weekday it falls on, so you can see straight away whether it lands on a weekend.',
    ],
    howTo: [
      'Select the starting date. It defaults to today.',
      'Enter a whole number of days to add.',
      'Select "Calculate result".',
      'Check the resulting month, year, and weekday, especially if the span crosses February or 31 December.',
      'If the date must be a working day, count business days instead with the [Working Days Calculator](/calculators/working-days).',
    ],
    sections: [
      {
        heading: 'How to Add Days to a Date',
        blocks: [
          {
            type: 'ol',
            items: [
              'Count the days remaining in the start month, up to and including its last day.',
              'Subtract that from the number of days you are adding.',
              'Step forward through the following months, using each month\'s real length, until the remainder is used up.',
              'The leftover days become the day of the month in the final month.',
            ],
          },
          { type: 'p', text: 'Take 15 January 2026 plus 30 days. January has 31 days, so 16 days reach 31 January and 14 days remain. Those 14 days fall into February, giving 14 February 2026. The calculator performs exactly this sequence.' },
        ],
      },
      {
        heading: 'How the Add Days Calculator Works',
        blocks: [
          { type: 'p', text: 'The calculator takes the starting date, adds the number of days to its day-of-month value, and normalises the result against the calendar. If the value runs past the end of the month it rolls into the next month; past December and it rolls into the next year.' },
          { type: 'p', text: 'Nothing is assumed about month length or leap years, because the calendar itself decides. The calculation works on calendar dates rather than clock timestamps, so daylight saving transitions do not shift the result by an hour.' },
        ],
      },
      {
        heading: 'Examples of Adding Days to a Date',
        blocks: [
          {
            type: 'table',
            headers: ['Starting date', 'Days added', 'Result', 'Weekday'],
            rows: [
              ['31 January 2026', '1', '1 February 2026', 'Sunday'],
              ['15 January 2026', '30', '14 February 2026', 'Saturday'],
              ['28 February 2026', '1', '1 March 2026', 'Sunday'],
              ['20 December 2026', '20', '9 January 2027', 'Saturday'],
              ['15 March 2026', '45', '29 April 2026', 'Wednesday'],
            ],
          },
          { type: 'p', text: 'The first row is the classic edge case: 31 January plus 1 day is 1 February, never "32 January". The second crosses February, and the fourth crosses a year boundary.' },
          { type: 'p', text: 'A quick way to sanity-check any of these results without redoing the calendar arithmetic: convert the span into weeks and days first. 45 days is 6 weeks and 3 days, so the weekday must land exactly three weekdays after the starting weekday — 15 March 2026 is a Sunday and 29 April 2026 is a Wednesday, three weekdays later. The same check works for 7 days (always the same weekday), 30 days (4 weeks and 2 days, so two weekdays later), and 100 days (14 weeks and 2 days).' },
        ],
      },
      {
        heading: 'Adding 7, 30, 60, 90, or 100 Days to a Date',
        blocks: [
          { type: 'p', text: 'These are the spans people ask for most often, and each has a slightly different behaviour worth knowing:' },
          {
            type: 'table',
            headers: ['Span', 'Equivalent', 'Typical use'],
            rows: [
              ['7 days', 'Exactly 1 week', 'A week from today, weekly recurring dates'],
              ['30 days', 'A short month, not always one calendar month', 'Payment terms, notice periods, trial periods'],
              ['60 days', 'Two short months', 'Longer notice periods, review cycles'],
              ['90 days', 'About three months', 'Quarterly deadlines, probation periods, warranty checks'],
              ['100 days', 'Just over three months', 'Project milestones, campaign periods'],
            ],
          },
          { type: 'p', text: 'None of these equals "one month" or "three months" in calendar terms. A 30-day span from 1 January reaches 31 January, while a one-month span reaches 1 February. Use days when the agreement specifies days, and calendar months when it specifies months.' },
          { type: 'component', name: 'days-from-today' },
        ],
      },
      {
        heading: 'Adding Days Across Months and Years',
        blocks: [
          { type: 'p', text: 'Crossing a month boundary is where manual counting fails. Months run from 28 to 31 days, so the same number of days lands in a different month depending on where you start. Two spans of 30 days beginning on 1 January and on 1 February reach completely different dates.' },
          { type: 'p', text: 'Crossing a year boundary changes the year as well as the date: 20 December 2026 plus 20 days is 9 January 2027. The calculator rolls the year automatically, which is the step most often forgotten when people count on their fingers.' },
          { type: 'p', text: 'The longest spans in the table above show the pattern clearly. 90 days is 12 weeks and 6 days, so it lands six weekdays after the starting weekday — Monday 28 September 2026 plus 90 days is Sunday 27 December 2026. 365 days is 52 weeks and 1 day, so a full common year always shifts the weekday by one: 28 September 2026 plus 365 days is Tuesday 28 September 2027. Only when the span crosses 29 February does a second weekday shift appear.' },
        ],
      },
      {
        heading: 'What Happens When the Calculation Crosses a Leap Year?',
        blocks: [
          { type: 'p', text: 'A leap year adds 29 February, so any span that crosses that day is one day longer than the same span in a common year. Adding 1 day to 28 February 2026 gives 1 March 2026; adding 1 day to 28 February 2028, a leap year, gives 29 February 2028.' },
          { type: 'p', text: 'You do not need to check anything yourself — the calculator reads the calendar for the year in question. But it is worth checking when you are verifying a result by hand or comparing two sources. The [Leap Year Calculator](/calendar/leap-year) tells you instantly whether a given year has 366 days.' },
        ],
      },
      {
        heading: 'Common Date Calculation Mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              'Assuming every month has 30 days, or that one month equals 30 days.',
              'Counting the starting date as day one, which pushes the result one day too far.',
              'Forgetting that February has 28 or 29 days when checking the answer manually.',
              'Missing the year change when the span crosses 31 December.',
              'Ignoring the weekday of the result — a deadline landing on a Saturday may need to move.',
            ],
          },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Move in the opposite direction with [Subtract Days From Date](/calculators/subtract-days), handle both directions in one place with the [Date Calculator](/calculators/date-calculator), measure a span you already have with [Days Between Dates](/calculators/days-between-dates), and check weekday-only deadlines with the [Working Days Calculator](/calculators/working-days).' },
        ],
      },
    ],
    guideSlugs: ['add-subtract-days', 'date-calculations'],
    related: ['subtract-days', 'date-calculator', 'days-between-dates', 'working-days'],
    faqs: [
      ['What if the starting date is 31 January and I add 1 day?', 'The result is 1 February, because January has only 31 days and the calendar rolls into the next month. There is no 32 January.'],
      ['Can I add a large number of days?', 'Yes. Any whole number works, including spans of several years. For very long spans it is often easier to read the result as a date and then check the weekday and the working-day count separately.'],
      ['Is adding 30 days the same as adding one month?', 'No. One calendar month is between 28 and 31 days depending on the month, while 30 days is always 30 days. From 1 January, 30 days later is 31 January, but one month later is 1 February.'],
      ['Does daylight saving affect the result?', 'No. The calculator works with calendar days rather than elapsed hours, so a 23-hour or 25-hour day still counts as exactly one day.'],
    ],
  },

  'subtract-days': {
    answer: 'Subtract days from a date to find a past calendar date. Enter a reference date and the number of days to take away, and the calculator returns the earlier date, crossing month and year boundaries correctly.',
    intro: [
      'Subtracting days from a date is how you answer questions like "what date was 30 days ago?", "when did this period start?", or "what is the latest filing date 30 days before the hearing?". The arithmetic runs backwards through the calendar, borrowing from the previous month whenever the count passes day 1.',
      'Enter a reference date and a positive number of days. The calculator returns the earlier date and the weekday it falls on, so the answer is unambiguous even when the count crosses February or the end of the year.',
    ],
    howTo: [
      'Select the reference date — the date you are counting backward from.',
      'Enter the number of days to subtract as a positive number.',
      'Select "Calculate result".',
      'Check the resulting month and year, since a backward count often crosses into the previous year.',
    ],
    sections: [
      {
        heading: 'How to Subtract Days From a Date',
        blocks: [
          {
            type: 'ol',
            items: [
              'Count backward from the reference date through the days remaining in its month.',
              'When the count passes day 1, continue into the previous month, using that month\'s real length.',
              'When the count passes 1 January, continue into the previous year.',
              'The remaining days give the day of the month in the final date.',
            ],
          },
          { type: 'p', text: 'For example, 31 January 2026 minus 31 days reaches 31 December 2025, because the count uses all of January and then the last day of December. The same calculation a year earlier gives a different month boundary, which is exactly why the tool is safer than mental arithmetic.' },
        ],
      },
      {
        heading: 'How the Subtract Days Calculator Works',
        blocks: [
          { type: 'p', text: 'The calculator applies a negative day offset to the reference date and normalises the result against the calendar. When the day value falls below 1 it borrows from the previous month, and below January it borrows from the previous year.' },
          { type: 'p', text: 'The calculation operates on calendar dates, so daylight saving does not affect it, and February is treated according to the year being crossed: 28 days in a common year, 29 in a leap year.' },
        ],
      },
      {
        heading: 'Examples of Subtracting Days',
        blocks: [
          {
            type: 'table',
            headers: ['Reference date', 'Days subtracted', 'Result', 'Weekday'],
            rows: [
              ['31 January 2026', '1', '30 January 2026', 'Friday'],
              ['1 March 2026', '1', '28 February 2026', 'Saturday'],
              ['5 January 2026', '10', '26 December 2025', 'Friday'],
              ['31 January 2026', '31', '31 December 2025', 'Wednesday'],
              ['28 September 2026', '30', '29 August 2026', 'Saturday'],
              ['28 September 2026', '90', '30 June 2026', 'Tuesday'],
            ],
          },
          { type: 'p', text: 'The second row is the leap-year check: 1 March 2026 minus 1 day gives 28 February 2026, while in 2028 it would give 29 February.' },
        ],
      },
      {
        heading: 'Days Before Today',
        blocks: [
          { type: 'p', text: 'To find a date in the recent past, set the reference date to today and subtract the number of days. The [Days Calculator](/calculators/days-calculator) shows both directions at once — the date before today and the date after today — which is usually faster when you are working around a fixed point such as a contract date or a report period.' },
          { type: 'p', text: 'Working backwards is also the natural way to find the start of a period. If you know a review covers the last 90 days and ends today, subtracting 90 gives the first day of the window.' },
        ],
      },
      {
        heading: 'Common Subtraction Mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              'Assuming all months have the same length, which changes the answer whenever the count crosses a 30-day or 31-day month.',
              'Forgetting that passing 1 January changes the year as well as the date.',
              'Treating the reference date as day zero and off-by-one-ing the result by a day.',
              'Not checking whether the span crosses 29 February in a leap year.',
              'Using a calendar-day count for a deadline that is defined in business days.',
            ],
          },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Move forward instead with [Add Days to Date](/calculators/add-days), handle both directions with the [Date Calculator](/calculators/date-calculator), measure an existing span with [Days Between Dates](/calculators/days-between-dates), and count weekdays only with the [Working Days Calculator](/calculators/working-days).' },
        ],
      },
    ],
    guideSlugs: ['add-subtract-days', 'date-calculations'],
    related: ['add-days', 'date-calculator', 'days-between-dates', 'days-calculator'],
    faqs: [
      ['What if I subtract more days than the number of days in the starting date?', 'The calculator continues into the previous month, and into the previous year if necessary. For example, 5 January 2026 minus 10 days is 26 December 2025.'],
      ['Can I use this to work back from a deadline?', 'Yes. If a filing is due 30 days before a hearing, enter the hearing date and subtract 30 to find the latest filing date. Check whether the rule counts calendar days or business days before relying on the result.'],
      ['Is subtracting days the same as entering a negative number of days?', 'Yes. Subtracting 30 days and adding -30 days produce the same date; both directions are handled by the same calendar arithmetic.'],
      ['How do I find what date it was a certain number of days ago?', 'Set the reference date to today and enter the number of days. For a list of common lookbacks in both directions, see the [Days Calculator](/calculators/days-calculator).'],
    ],
  },
}
