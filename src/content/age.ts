import type { ToolContent } from './types'

export const ageContent: Record<string, ToolContent> = {
  'age-calculator': {
    answer: 'An age calculator finds how old someone is between a birth date and a target date, reported in completed years, months, and days. Enter a date of birth and DatePilot works out the exact calendar age, including leap days and different month lengths.',
    intro: [
      'Ask "how old am I?" and the answer depends on more than subtracting two years. A person born on 4 July 1998 is 28 years old on 28 September 2026, but only once their birthday has passed that year — before 4 July they were still 27. This calculator counts completed anniversaries first, then the months and days left over, so the result matches the age you would celebrate rather than a rough estimate.',
      'The target date defaults to today, so a birth date alone answers "how old am I right now". Change the target date to check an age on a past date, such as a wedding or a graduation, or on a future date, such as a retirement or a milestone birthday.',
    ],
    howTo: [
      'Enter the date of birth in the first field. Use the date picker or type the date directly.',
      'Check the target date. It is set to today, so leave it if you want your age right now, or choose another date.',
      'Select "Calculate result".',
      'Read the age as completed years, then completed months, then the remaining days.',
      'Change only the target date to compare the same person at different points in time.',
    ],
    sections: [
      {
        heading: 'How to Calculate Your Age',
        blocks: [
          { type: 'p', text: 'Working out an age by hand takes three steps. The method below is exactly what the calculator does, so you can check any result yourself.' },
          {
            type: 'ol',
            items: [
              'Count the completed years. If the target date has reached the birth month and day, the difference between the two years is the age. If it has not, subtract one year.',
              'Count the completed months from the most recent birthday to the target date.',
              'Count the days left over after the last completed month.',
            ],
          },
          { type: 'p', text: 'For example, take a birth date of 15 March 1990 and a target date of 10 January 2026. The year difference is 36, but January comes before March, so only 35 years are complete — the 36th birthday is 15 March 2026. From 15 March 2025 to 10 January 2026 is 9 full months and 26 days, giving 35 years, 9 months, and 26 days.' },
          { type: 'note', text: 'Dividing the total number of days by 365 gives a close approximation, but it drifts. A 36-year span contains 9 leap days, so the day count divided by 365 lands just short of a whole year.' },
        ],
      },
      {
        heading: 'How the Age Calculator Works',
        blocks: [
          { type: 'h3', text: 'Birth date and target date' },
          { type: 'p', text: 'The birth date is the starting point. The target date is the moment you are measuring the age on, and it defaults to today. The calculator refuses a target date earlier than the birth date, because an age cannot be negative.' },
          { type: 'h3', text: 'Completed years first' },
          { type: 'p', text: 'Years only count once a full anniversary has passed. Between birthdays the age in years stays the same, which is why a simple year subtraction is often one year too high in the months before a birthday.' },
          { type: 'h3', text: 'Months and days after the last birthday' },
          { type: 'p', text: 'After the completed years are settled, the calculator counts complete months from the most recent birthday, then the days that are still left over. The month count uses real calendar months, not a fixed 30-day month.' },
          { type: 'h3', text: 'Leap years and month lengths' },
          { type: 'p', text: 'February has 28 days in a common year and 29 in a leap year, and the months around it have 30 or 31. The calculator uses the browser Date object, which follows the Gregorian calendar, so an age that crosses 29 February or a 31-day month is counted correctly without you adjusting anything.' },
        ],
      },
      {
        heading: 'Calculate Your Exact Age',
        blocks: [
          { type: 'p', text: '"Exact age" means the calendar age: whole years, whole months, and days. This is the format used on official forms, in medical and school settings, and in most everyday conversations about age.' },
          {
            type: 'ul',
            items: [
              'Years — completed anniversaries since the birth date.',
              'Months — complete calendar months after the last birthday.',
              'Days — the days remaining after the last completed month.',
            ],
          },
          { type: 'p', text: 'If you need the same span expressed as a single number of days, use the [Days Between Dates calculator](/calculators/days-between-dates) with the birth date as the start date: it reports the elapsed calendar days between two dates without breaking them into years and months.' },
        ],
      },
      {
        heading: 'How Old Am I?',
        blocks: [
          { type: 'p', text: 'To find out how old you are today, enter your date of birth and leave the target date as it is. The calculator compares your birth date with today and returns your age in years, months, and days as of this moment.' },
          { type: 'p', text: 'The result changes during the day only if you cross midnight or reach a birthday. On the birthday itself the year count increases, even though the months and days reset to zero.' },
          { type: 'component', name: 'today-weekday' },
          { type: 'p', text: 'If you only know the birth year and not the full date, you can still get an approximate age, but the exact answer needs the day and month: someone born in 1998 is either 27 or 28 on any given day in 2026, depending on whether their birthday has already passed.' },
        ],
      },
      {
        heading: 'Age Calculation Examples',
        blocks: [
          { type: 'p', text: 'These examples use real calendar dates so you can follow the arithmetic. Each row shows a birth date, a target date, and the age the calculator returns.' },
          {
            type: 'table',
            headers: ['Birth date', 'Target date', 'Age'],
            rows: [
              ['15 March 1990', '10 January 2026', '35 years, 9 months, 26 days'],
              ['4 July 1998', '28 September 2026', '28 years, 2 months, 24 days'],
              ['15 June 2010', '28 September 2026', '16 years, 3 months, 13 days'],
              ['31 December 2020', '1 January 2026', '5 years, 0 months, 1 day'],
              ['29 February 2000', '1 March 2026', '26 years, 0 months, 0 days'],
              ['Same day', 'Same day', '0 years, 0 months, 0 days'],
            ],
          },
          { type: 'p', text: 'The third row shows a birthday that has already happened in the target year, so the year count is complete. The second row shows the opposite case: 4 July comes after 28 September, so the 2026 birthday has not occurred yet and the age is still 28, not 29.' },
        ],
      },
      {
        heading: 'Age in Years, Months, and Days',
        blocks: [
          { type: 'p', text: 'Subtracting the birth year from the current year is the most common shortcut, and it is the reason people are often a year out. The subtraction ignores the month and the day, so it treats someone born in December as the same age as someone born in January as soon as the new year arrives.' },
          { type: 'p', text: 'A second shortcut is just as risky: assuming every year is 365 days. Ten years contain either 3,652 or 3,653 days depending on how many leap days fall in the span, and the number of months between two dates is never simply "days divided by 30".' },
          { type: 'p', text: 'The years, months, and days format avoids both problems because it follows the calendar rather than an average. It is also the format that matches how birthdays are actually experienced: one year at a time, on the same date each year.' },
        ],
      },
      {
        heading: 'Common Age Calculation Mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              'The birthday has not happened yet this year. If the birthday falls later in the calendar than the target date, the age is one year lower than the plain year difference suggests.',
              'Leap-day birthdays. Someone born on 29 February reaches each birthday on 1 March in non-leap years with this calculator, so on 28 February the age is still one day short of the next year.',
              'Different month lengths. Counting a month as 30 days, or a year as exactly 12 × 30, drifts away from the calendar within a few months.',
              'The wrong reference date. Age measured on a past date and age measured today are different answers. Check which date the target field holds before quoting a result.',
              'Rounding an approximation. Days divided by 365 is close, but it hides leap days and never gives the months and days most forms ask for.',
            ],
          },
          { type: 'p', text: 'If a result looks wrong, verify it against the last birthday: count the completed years to that date, then add the months and days since. The three parts should always add up to the age you expect.' },
        ],
      },
      {
        heading: 'Related Date Questions',
        blocks: [
          { type: 'p', text: 'Age questions usually come with a second question: how long until something, or how far apart two dates are. The [Days Between Dates calculator](/calculators/days-between-dates) counts the calendar days between any two dates, the [Countdown Calculator](/time/countdown) shows the time remaining until a target date, and the [Day of the Week calculator](/calendar/day-of-week) tells you which weekday a birthday or anniversary falls on.' },
          { type: 'p', text: 'For the rules behind the arithmetic itself — endpoint conventions, leap days, and why two calculators can disagree — read [How to Calculate Age](/guides/how-to-calculate-age).' },
        ],
      },
    ],
    guideSlugs: ['how-to-calculate-age', 'days-between-dates', 'leap-years'],
    related: ['date-calculator', 'days-between-dates', 'day-of-week', 'leap-year'],
    faqs: [
      ['How old am I today?', 'Enter your date of birth and leave the target date on today. The calculator returns your age in completed years, months, and days as of the current date on your device.'],
      ['How is exact age calculated?', 'Exact age counts completed years since the birth date first, then complete months from the most recent birthday, then the days left over. It never divides a day count by 365, so leap days and 30-day and 31-day months are handled by the calendar itself.'],
      ['Can I calculate my age on a past or future date?', 'Yes. Change the target date to any date before or after today. This is useful for working out an age at a past event, or how old someone will be on a future date. The target date only needs to be after the birth date.'],
      ['Can I calculate age in months and days only?', 'The result is always given in years, months, and days together, because that is the form that stays unambiguous. If you want a single total, ask the [Days Between Dates calculator](/calculators/days-between-dates) for the days between the birth date and the target date.'],
      ['How are leap-day birthdays handled?', 'In a leap year the birthday is 29 February. In a non-leap year this calculator reaches the next birthday on 1 March, so on 28 February the reported age is one day short of the next whole year. The same day-of-month rule applies to anyone born on the 30th or 31st: a completed month is only counted once the day of the month has been reached again.'],
    ],
  },
}
