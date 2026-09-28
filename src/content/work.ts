import type { ToolContent } from './types'

export const workContent: Record<string, ToolContent> = {
  'working-days': {
    answer: 'A working days calculator counts the weekdays between two dates, excluding Saturdays and Sundays. It answers how many business days fall in a period — useful for deadlines, project schedules, and delivery estimates.',
    intro: [
      'Counting weekdays between two dates is simple in principle and tedious in practice: you have to skip every Saturday and Sunday, handle partial weeks at each end, and remember that a "business day" sometimes excludes public holidays as well. This calculator does the counting for you.',
      'The same tool covers the two names people use interchangeably — working days and business days. They count Monday through Friday the same way; the only difference is that a strict business-day count may also exclude public holidays, which vary by country and company and are not applied here.',
    ],
    howTo: [
      'Enter the starting date. The calculator works with either order — if you enter the later date first it still counts the same range.',
      'Enter the ending date.',
      'Select "Calculate result".',
      'Read the number of weekdays in the range. The calculator counts Monday through Friday and excludes both weekend days.',
      'If your deadline must also exclude holidays, remove those dates manually from the total.',
    ],
    sections: [
      {
        heading: 'What Counts as a Working Day?',
        blocks: [
          { type: 'p', text: 'A working day is any day that is not a weekend day: Monday, Tuesday, Wednesday, Thursday, and Friday. Weekends are excluded because they are the standard non-working days in most of the world, including the United States and Europe.' },
          { type: 'p', text: 'A business day is usually the same set of days, but in a contract or a financial context it may be defined as "a day on which banks are open", which removes public holidays too. This calculator applies the standard Monday-to-Friday rule and states clearly that it does not remove holidays automatically — so the number you get is a weekday count, not a guaranteed holiday-adjusted count.' },
          {
            type: 'table',
            headers: ['Term', 'Weekends', 'Holidays', 'What this tool returns'],
            rows: [
              ['Calendar days', 'Included', 'Included', 'Not this tool'],
              ['Working days', 'Excluded', 'Not excluded by default', 'This tool'],
              ['Business days', 'Excluded', 'Excluded if the agreement says so', 'This tool, minus holidays you remove'],
            ],
          },
          { type: 'note', text: 'Public holidays are country- and state-specific, so they are never assumed here. Subtract them yourself if your calculation requires it.' },
        ],
      },
      {
        heading: 'How the Working Days Calculator Works',
        blocks: [
          { type: 'p', text: 'The calculator walks the calendar from the first date to the second, counting a day only when its weekday falls between Monday and Friday. Saturday and Sunday are skipped. Both endpoints are counted when they are weekdays, so a range that runs from Monday to Friday contains 5 working days, and one that runs from Monday to the following Monday contains 6.' },
          { type: 'p', text: 'Because it walks real calendar dates, month lengths, leap years, and year boundaries need no adjustment from you. A range that crosses February or 31 December is handled the same as any other range. If you enter the dates in the later-first order, the calculator counts the same range rather than returning nothing.' },
        ],
      },
      {
        heading: 'How to Count Working Days Between Two Dates',
        blocks: [
          { type: 'p', text: 'The manual method is straightforward once you break the range into whole weeks and a remainder:' },
          {
            type: 'ol',
            items: [
              'Count the total calendar days between the two dates.',
              'Divide by 7 to find the number of complete weeks. Each complete week contains exactly 5 weekdays.',
              'Count the remaining days one at a time, adding each one that falls Monday to Friday.',
              'Add the two figures together.',
            ],
          },
          { type: 'p', text: 'A range of 14 consecutive calendar days contains exactly 10 weekdays, always — two full weeks of five. A range of 10 calendar days is not fixed, because it depends on which weekday the range starts on.' },
          { type: 'p', text: 'One convention detail matters when you check the answer: this calculator counts both endpoints. A range from Monday to Friday is 5 working days, not 4. If you need the elapsed duration that excludes the starting day — the way a duration is usually defined — subtract 1 when the first date is a weekday.' },
        ],
      },
      {
        heading: 'Working Days Examples',
        blocks: [
          {
            type: 'table',
            headers: ['Range', 'Calendar days (inclusive)', 'Working days'],
            rows: [
              ['5 January 2026 – 9 January 2026', '5', '5'],
              ['5 January 2026 – 12 January 2026', '8', '6'],
              ['28 September 2026 – 2 October 2026', '5', '5'],
              ['1 September 2026 – 30 September 2026', '30', '22'],
              ['25 December 2026 – 1 January 2027', '8', '6'],
            ],
          },
          { type: 'p', text: 'The first row is a complete Monday-to-Friday week, so every calendar day counts. The second row adds a weekend and a Monday, so only one more weekday is added. The last row spans the year end: six of its eight days are weekdays, because holidays themselves are not removed from a weekday count.' },
        ],
      },
      {
        heading: 'Working Days vs. Calendar Days',
        blocks: [
          { type: 'p', text: 'Calendar days count everything; working days count only weekdays. The difference grows with the length of the range: over a month, roughly two fifths of the calendar days are weekend days, so a 30-day period typically contains about 22 working days.' },
          { type: 'p', text: 'Choose calendar days for elapsed time, ages, and countdowns — the [Days Between Dates calculator](/calculators/days-between-dates) is the right tool. Choose working days for delivery estimates, project durations, notice periods, and anything where people are not expected to work on weekends.' },
          { type: 'p', text: 'Mixing the two conventions is the most common source of a wrong deadline. If a contract says "within 10 business days", a calendar-day answer will always be too early.' },
        ],
      },
      {
        heading: 'Common Mistakes When Counting Working Days',
        blocks: [
          {
            type: 'ul',
            items: [
              'Using a calendar-day count for a deadline defined in business days.',
              'Assuming a two-week range always has 10 weekdays — it does if it starts on a Monday, but a range that starts midweek can have 9 or 11.',
              'Forgetting that holidays are not excluded by default.',
              'Double-counting the start date when the period is meant to exclude it.',
              'Ignoring that different countries observe different holidays on different dates.',
            ],
          },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Count every calendar day with [Days Between Dates](/calculators/days-between-dates), find the weekday of any single date with the [Day of the Week calculator](/calendar/day-of-week), and check which week a deadline falls in with the [Week Number Calculator](/calendar/week-number).' },
        ],
      },
    ],
    guideSlugs: ['working-days', 'days-between-dates', 'day-of-week'],
    related: ['days-between-dates', 'day-of-week', 'date-calculator', 'week-number'],
    faqs: [
      ['Does this calculator exclude public holidays?', 'No. It counts Monday through Friday and excludes weekends only. Public holidays are specific to each country, state, and employer, so they must be removed manually if your calculation requires it.'],
      ['Are Saturdays and Sundays working days?', 'In the standard convention used here, no. Saturday and Sunday are weekend days and are not counted. If your schedule uses different non-working days, the weekday count should be adjusted manually.'],
      ['Does this calculator count the first and last date?', 'Yes. Both endpoints are counted when they are weekdays, so Monday to Friday returns 5 working days. For an elapsed duration that excludes the starting day, subtract 1 from the result.'],
      ['Is a working day the same as a business day?', 'For weekday counting, yes — both mean Monday to Friday. In a legal or banking context a business day may additionally exclude public holidays, which this tool does not remove automatically.'],
      ['Why does my answer differ by one day from another source?', 'Endpoint convention. One count includes the first date, the other excludes it. Compare whether each source counts both endpoints, and adjust by one day to match.'],
    ],
  },
}
