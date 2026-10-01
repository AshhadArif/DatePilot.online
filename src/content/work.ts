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
          { type: 'p', text: 'Mixing the two conventions is the most common source of a wrong deadline. If a contract says "within 10 business days", a calendar-day answer will always be too early — and when the question is the date you land on rather than a count, move a date by weekdays with the [Business Date Calculator](/calculators/business-date-calculator).' },
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
    related: ['business-date-calculator', 'days-between-dates', 'date-calculator', 'day-of-week'],
    faqs: [
      ['Does this calculator exclude public holidays?', 'No. It counts Monday through Friday and excludes weekends only. Public holidays are specific to each country, state, and employer, so they must be removed manually if your calculation requires it.'],
      ['Are Saturdays and Sundays working days?', 'In the standard convention used here, no. Saturday and Sunday are weekend days and are not counted. If your schedule uses different non-working days, the weekday count should be adjusted manually.'],
      ['Does this calculator count the first and last date?', 'Yes. Both endpoints are counted when they are weekdays, so Monday to Friday returns 5 working days. For an elapsed duration that excludes the starting day, subtract 1 from the result.'],
      ['Is a working day the same as a business day?', 'For weekday counting, yes — both mean Monday to Friday. In a legal or banking context a business day may additionally exclude public holidays, which this tool does not remove automatically.'],
      ['Why does my answer differ by one day from another source?', 'Endpoint convention. One count includes the first date, the other excludes it. Compare whether each source counts both endpoints, and adjust by one day to match.'],
    ],
  },
  'business-date-calculator': {
    answer: 'A business date calculator moves a date forward or backward by a set number of working days, skipping every Saturday and Sunday, and returns the resulting calendar date. It answers questions like "what date is 10 business days from today?" for deadlines, contracts, and delivery estimates.',
    intro: [
      'Counting weekdays and moving a date by weekdays are two different jobs. The [Working Days Calculator](/calculators/working-days) tells you how many weekdays fall inside a range; this calculator does the reverse — you give it a starting date and a number of business days, and it returns the date you land on.',
      'Every step of the walk skips Saturdays and Sundays, so month lengths, year boundaries, and holiday weekends take care of themselves. The result always shows the weekday of the new date, so you can see at a glance whether you have landed on a working day.',
    ],
    howTo: [
      'Enter the start date — the deadline, ship date, or sign date you are counting from.',
      'Enter the number of business days to move.',
      'Choose the direction: "After" moves forward, "Before" moves backward.',
      'Select "Calculate result".',
      'Read the resulting date, its weekday, and how many calendar days the move spanned.',
      'If the period must also exclude public holidays, remove those dates yourself — this calculator applies the Monday-to-Friday rule only.',
    ],
    sections: [
      {
        heading: 'What Is a Business Date Calculator?',
        blocks: [
          { type: 'p', text: 'A business date calculator answers a scheduling question: given this date, what date falls a fixed number of working days away? Contracts phrase it as "payment due within 10 business days of the invoice date", delivery pages say "ships in 3 to 5 business days", and project plans count "5 working days after sign-off". In every case you need a calendar date, not a count.' },
          { type: 'p', text: 'The calculation cannot be done with simple multiplication. Ten business days is 14 calendar days when the window contains two full weekends, but the same count started on a weekend lands a day earlier, and a window that swallows a long weekend spans more calendar days than you would expect. Walking the calendar one day at a time is the only way to get it right.' },
        ],
      },
      {
        heading: 'Business Days vs Calendar Days',
        blocks: [
          { type: 'p', text: 'Calendar days include every day — Saturdays, Sundays, and holidays. Business days include only Monday through Friday. When a deadline is written in business days, a calendar-day answer will always be too early, and when you use a business-day answer for an elapsed-time question, it will be too late.' },
          {
            type: 'table',
            headers: ['Question', 'Unit', 'Right tool'],
            rows: [
              ['What date is 10 business days after 1 October 2026?', 'Business days', 'This calculator'],
              ['What date is 10 calendar days after 1 October 2026?', 'Calendar days', 'Add Days to Date'],
              ['How many weekdays are between two dates?', 'Business days (count)', 'Working Days Calculator'],
              ['How many total days are between two dates?', 'Calendar days', 'Days Between Dates'],
            ],
          },
          { type: 'p', text: 'The third and fourth rows are counting questions; the first two return a date. Mixing them up is the most common source of a wrong deadline — see the [Working Days Calculator](/calculators/working-days) for the counting side of the same rule.' },
        ],
      },
      {
        heading: 'How the Business Date Calculator Works',
        blocks: [
          { type: 'p', text: 'The calculator starts on your date and moves one calendar day at a time — forward or backward, depending on the direction you chose. Each time it lands on a weekday (Monday through Friday) it uses up one unit of the count. Weekends are stepped over without being counted. The walk stops when the count reaches zero, and the date it is standing on is your answer.' },
          { type: 'p', text: 'Because it walks real calendar dates, February lengths, leap years, and the December-to-January boundary need no special handling. The second line of the result reports how many calendar days the walk spanned, which is usually the number you need when you also want to know how much real time passes.' },
        ],
      },
      {
        heading: 'How to Add Business Days to a Date Manually',
        blocks: [
          { type: 'p', text: 'To add business days by hand, break the count into whole weeks first:' },
          {
            type: 'ol',
            items: [
              'Divide the number of business days by 5 to find whole weeks and a remainder (for example, 12 business days = 2 weeks and 2 days).',
              'Add the whole weeks to the start date — each one advances the calendar by exactly 7 days.',
              'Move forward one day at a time for the remainder, counting only Monday through Friday.',
              'Check the weekday of the result; if it is a Saturday or Sunday, you have counted a weekend day by mistake.',
            ],
          },
          { type: 'p', text: 'To subtract business days, move backward with the same rule: step back one day at a time and count only weekdays. Starting from Thursday, 1 October 2026, counting back 5 business days lands on Thursday, 24 September 2026 — the two weekend days in between are skipped, so the walk spans 7 calendar days.' },
        ],
      },
      {
        heading: 'Business Date Examples',
        blocks: [
          {
            type: 'table',
            headers: ['Start date', 'Move', 'Result', 'Calendar days spanned'],
            rows: [
              ['Thursday, 1 October 2026', '10 business days after', 'Thursday, 15 October 2026', '14'],
              ['Thursday, 1 October 2026', '5 business days before', 'Thursday, 24 September 2026', '7'],
              ['Friday, 30 January 2026', '1 business day after', 'Monday, 2 February 2026', '3'],
              ['Thursday, 1 January 2026', '10 business days after', 'Thursday, 15 January 2026', '14'],
              ['Thursday, 1 October 2026', '0 business days', 'Thursday, 1 October 2026', '0'],
            ],
          },
          { type: 'p', text: 'The first row starts on a weekday, so 10 business days equals exactly two calendar weeks (14 days). The third row is the interesting one: a single business day from Friday crosses the weekend and lands on Monday, three calendar days later. The fifth row shows the boundary case — a count of zero returns the start date unchanged.' },
          { type: 'note', text: 'These examples count Monday through Friday only. If a public holiday falls inside your window, subtract it manually from the result when your contract or policy requires holiday-free days.' },
        ],
      },
      {
        heading: 'Common Mistakes When Moving Dates by Business Days',
        blocks: [
          {
            type: 'ul',
            items: [
              'Adding the business-day count as calendar days (10 business days is not always 10 calendar days later).',
              'Assuming every 10-business-day window is 14 calendar days — from a weekend start it is shorter.',
              'Forgetting that the starting day itself is not counted; the walk begins on the next day.',
              'Using a weekday walk for a deadline that the contract defines in calendar days.',
              'Ignoring holidays, which are not removed automatically because holiday calendars differ by country and employer.',
            ],
          },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Count the weekdays inside an existing range with the [Working Days Calculator](/calculators/working-days), add ordinary calendar days with [Add Days to Date](/calculators/add-days), check the total gap with [Days Between Dates](/calculators/days-between-dates), and read the underlying rules in the [Working Days Explained](/guides/working-days) guide.' },
        ],
      },
    ],
    guideSlugs: ['working-days', 'days-between-dates', 'add-subtract-days', 'date-calculations'],
    related: ['working-days', 'days-between-dates', 'add-days', 'date-calculator'],
    faqs: [
      ['Does this calculator exclude public holidays?', 'No. It counts Monday through Friday only, exactly like DatePilot\'s other working-day tools. Holidays are specific to each country, state, and employer, so remove them manually when your calculation requires it.'],
      ['Does it count the start date?', 'No. The walk begins on the day after your start date (or the day before, when subtracting). The start date is the reference point, not part of the count. This differs from the Working Days Calculator, which counts both endpoints of a range.'],
      ['What if the start date falls on a weekend?', 'The count simply begins with the next weekday in the chosen direction. Starting on Saturday and adding 1 business day lands on Monday, because Saturday and Sunday are never counted as steps.'],
      ['Is 10 business days always 14 calendar days?', 'No. It is 14 calendar days when you start on a weekday and the window contains two full weekends. Start on a Saturday or Sunday and the same count spans fewer calendar days. The result reports the exact span every time.'],
      ['How is this different from the Working Days Calculator?', 'That tool answers "how many weekdays are in this range?" and returns a count. This tool answers "which date do I land on if I skip weekends?" and returns a date. Use whichever direction your question points.'],
    ],
  },
}
