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
        heading: 'What Is an Age Calculator?',
        blocks: [
          { type: 'p', text: 'An age calculator converts two dates — a date of birth and the date you are measuring on — into an age expressed in completed years, months, and days. It answers the question "how old is someone?" using the calendar itself, so the result matches the birthdays a person has actually reached rather than an estimate based on average year lengths.' },
          { type: 'p', text: 'The same tool serves many routine decisions: filling in a date of birth on a form, checking whether a child has reached a school entry age, confirming how much of a probation or notice period has passed, or working out how old someone will be at a future event such as a wedding, a graduation, or a retirement date.' },
          { type: 'p', text: 'An age calculation needs two inputs. The date of birth never changes; the second date — called the target date here — is the moment you are measuring on, and it defaults to today. Move that second date backwards to reconstruct an age at a past event, or forwards to plan around a future milestone.' },
        ],
      },
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
        heading: 'Calculate Age From Date of Birth',
        blocks: [
          { type: 'p', text: 'Calculating an age from a date of birth is the main use of this tool. The date of birth is the fixed anchor; everything else in the result is measured from that day forward.' },
          {
            type: 'ol',
            items: [
              'Enter the date of birth in the first field, using the date picker or by typing the date directly.',
              'Check the target date. It is set to today, which gives the age right now — change it only if you are measuring on a different date.',
              'Select "Calculate result".',
              'Read the result as completed years, completed months, and remaining days, in that order.',
            ],
          },
          { type: 'p', text: 'The order matters. The years are counted first because they are complete anniversaries of the birth date; the months and days are what has happened since the most recent of those anniversaries. This is why the result never exceeds the number of whole years between the two dates, and why it changes only when a birthday or a month boundary passes.' },
          {
            type: 'ul',
            items: [
              'Birth date in the future? With the target date on today, a date of birth later than the target date is rejected with the message "The target date must be after the birth date". Set the target date beyond the birth date if you are measuring an age on a planned future date.',
              'Born on 29 February? In a leap year the birthday is 29 February itself; in common years this calculator reaches the next birthday on 1 March, so on 28 February the age is one day short of the next whole year.',
              'Historical dates? Every year is calculated on the Gregorian calendar — the same rules the calculator applies to today — so birth dates from the early twentieth century and earlier are handled the same way as current ones.',
            ],
          },
        ],
      },
      {
        heading: 'How Age Is Calculated',
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
        heading: 'Age Calculation and Leap Years',
        blocks: [
          { type: 'p', text: 'Leap years are the reason two people of the same "year difference" can be different ages to the day. A leap year has 366 days, with 29 February inserted, and the Gregorian calendar adds one in years divisible by four — except century years, which are leap years only when divisible by 400. That makes 2000 a leap year while 2100 will not be.' },
          { type: 'p', text: 'For age calculation this shows up in two places. First, the birthday itself: someone born on 29 February celebrates on 29 February during leap years and, with this calculator, reaches the next birthday on 1 March in common years. Second, the month count after the last birthday: when February has 29 days, the same birth-day-of-month arrives one day later in the calendar than it would in a 28-day February.' },
          { type: 'p', text: 'Leap days also break shortcut math. Any span that contains 29 February is one day longer than the same dates in a common year, which is why dividing a total day count by 365 drifts further away from the true age with every leap day passed — a 40-year span contains 9 or 10 of them.' },
          { type: 'p', text: 'None of this requires adjusting the inputs: the calculator reads the real calendar for both dates. For the full leap-year rules, including century years, see the [Leap Year Calculator](/calendar/leap-year) and the [Leap Years guide](/guides/leap-years).' },
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
        heading: 'Exact Age vs Approximate Age',
        blocks: [
          { type: 'p', text: 'An exact age is the calendar age: whole years, whole months, and days, counted from the birth date itself. That is what this calculator returns, and it is the form used on official forms, in medical and school settings, and in most everyday conversations about age.' },
          { type: 'p', text: 'An approximate age is any shortcut that skips the calendar. Subtracting the birth year from the current year is the most common shortcut, and it is the reason people are often a year out: it ignores the month and the day, so it treats someone born in December as the same age as someone born in January as soon as the new year arrives.' },
          { type: 'p', text: 'A second shortcut is just as risky: assuming every year is 365 days. Ten years contain either 3,652 or 3,653 days depending on how many leap days fall in the span, and the number of months between two dates is never simply "days divided by 30".' },
          { type: 'p', text: 'Both approximations are fine when the question is loose — "she will be about thirty", a rough retirement year, a life-stage estimate. They are not fine when a rule depends on the exact date: school entry cut-offs, age-restricted eligibility, notice periods, and most forms ask for the completed date, not a rounded year. When precision matters, read the exact age and check it against the last birthday — the completed years, months, and days should always add up to the age you expect.' },
          { type: 'p', text: 'The years, months, and days format avoids both shortcut problems because it follows the calendar rather than an average. It also matches how birthdays are actually experienced: one year at a time, on the same date each year.' },
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
              'Date format confusion. 03/04/2026 means 3 April in much of the world and 4 April in the United States. Typing a date in the wrong order silently moves the birthday by months — use the date picker and check the field shows the day you expect.',
              'A mistyped birth date. The year carries the most weight — entering 1989 instead of 1998 changes the answer by nine years. If the result looks implausible, re-check the year first.',
              'A birth date in the future. With the target date on today, a birth date after today is rejected: "The target date must be after the birth date." Move the target date if you are planning around an expected date rather than reporting an age.',
            ],
          },
          { type: 'p', text: 'If a result looks wrong, verify it against the last birthday: count the completed years to that date, then add the months and days since. The three parts should always add up to the age you expect.' },
        ],
      },
      {
        heading: 'Related Date Questions',
        blocks: [
          { type: 'p', text: 'Age questions usually come with a second question: how long until something, or how far apart two dates are. When both dates are birth dates, the [Age Difference Calculator](/calculators/age-difference-calculator) reports the gap between two people directly. The [Days Between Dates calculator](/calculators/days-between-dates) counts the calendar days between any two dates, the [Date Calculator](/calculators/date-calculator) finds the date a birthday or deadline falls on, and the [Countdown Calculator](/time/countdown) shows the time remaining until a target date.' },
          { type: 'p', text: 'To place a birthday on the calendar, the [Day of the Week calculator](/calendar/day-of-week) tells you which weekday it falls on and the [Week Number Calculator](/calendar/week-number) gives the ISO week number of that date. For schedules — notice periods, delivery windows, working time between two dates — use the [Subtract Days From Date](/calculators/subtract-days), [Add Days to Date](/calculators/add-days), or [Working Days](/calculators/working-days) calculators.' },
          { type: 'p', text: 'For the rules behind the arithmetic itself — endpoint conventions, leap days, and why two calculators can disagree — read [How to Calculate Age](/guides/how-to-calculate-age).' },
        ],
      },
    ],
    guideSlugs: ['how-to-calculate-age', 'days-between-dates', 'leap-years'],
    related: ['age-difference-calculator', 'days-between-dates', 'date-calculator', 'add-days'],
    faqs: [
      ['How old am I today?', 'Enter your date of birth and leave the target date on today. The calculator returns your age in completed years, months, and days as of the current date on your device.'],
      ['How is exact age calculated?', 'Exact age counts completed years since the birth date first, then complete months from the most recent birthday, then the days left over. It never divides a day count by 365, so leap days and 30-day and 31-day months are handled by the calendar itself.'],
      ['Can I calculate my age on a past or future date?', 'Yes. Change the target date to any date before or after today. This is useful for working out an age at a past event, or how old someone will be on a future date. The target date only needs to be after the birth date.'],
      ['Can I calculate age in months and days only?', 'The result is always given in years, months, and days together, because that is the form that stays unambiguous. If you want a single total, ask the [Days Between Dates calculator](/calculators/days-between-dates) for the days between the birth date and the target date.'],
      ['How are leap-day birthdays handled?', 'In a leap year the birthday is 29 February. In a non-leap year this calculator reaches the next birthday on 1 March, so on 28 February the reported age is one day short of the next whole year. The same day-of-month rule applies to anyone born on the 30th or 31st: a completed month is only counted once the day of the month has been reached again.'],
    ],
  },
  'age-difference-calculator': {
    answer: 'An age difference calculator finds the gap between two birth dates in years, months, and days, and reports the total calendar days between them. Enter any two dates of birth — the order does not matter — to see who is older and by exactly how much.',
    intro: [
      'The age gap between two people shows up everywhere: siblings comparing birthdays, couples, classmates and cohorts, colleagues with different start dates, and anyone working out how many years apart two events fall. The question is always the same — how much older is one person than the other — but the arithmetic hides leap days, unequal month lengths, and the fact that a "5 year gap" is not always 1,825 days.',
      'This calculator takes two birth dates and returns the difference twice: once the way people say it (years, months, and days) and once the way spreadsheets like it (total calendar days). It also tells you which of the two dates is the earlier one, so the direction of the gap is never guesswork.',
    ],
    howTo: [
      'Enter the first birth date.',
      'Enter the second birth date. The order does not matter — the calculator works out which date is earlier.',
      'Select "Calculate result".',
      'Read the gap in years, months, and days on the first line.',
      'The second line gives the same gap in total calendar days, and the third line states which birth date is older.',
      'If the dates are the same, the calculator reports a zero gap.',
    ],
    sections: [
      {
        heading: 'What Is an Age Difference Calculator?',
        blocks: [
          { type: 'p', text: 'An age difference calculator measures the interval between two birth dates. Unlike the [Age Calculator](/calculators/age-calculator), which asks "how old is this one person at this date", this tool asks "how far apart are these two people". Both use the same calendar-anniversary arithmetic, but the inputs and the framing are different: here both fields are birth dates, neither field is a "today" reference, and you can enter them in either order.' },
          { type: 'p', text: 'Two answers come out. The calendar answer breaks the gap into completed years, then completed months, then leftover days — the form people use in conversation. The total-days answer counts every calendar day between the dates, including leap days — the form that works in formulas and comparisons.' },
        ],
      },
      {
        heading: 'Age Difference vs Age Calculator',
        blocks: [
          {
            type: 'table',
            headers: ['Question', 'Inputs', 'Tool'],
            rows: [
              ['How old am I today?', 'One birth date, target defaults to today', 'Age Calculator'],
              ['How old will I be on my graduation date?', 'One birth date, one target date', 'Age Calculator'],
              ['How far apart are these two people?', 'Two birth dates, any order', 'Age Difference Calculator'],
              ['How many days are between these dates?', 'Two dates of any kind', 'Days Between Dates'],
            ],
          },
          { type: 'p', text: 'If you find yourself entering the same date twice — once as a birth date and once as a target — you are probably asking the age-gap question, and this is the page for it.' },
        ],
      },
      {
        heading: 'How the Age Difference Calculator Works',
        blocks: [
          { type: 'p', text: 'The calculator first orders the two dates: the earlier one is treated as the older person. It then counts completed years from the earlier date to the later one, complete months from the last anniversary, and the days remaining after that. Finally it measures the straight calendar-day distance between the two dates for the total-days line.' },
          { type: 'p', text: 'The month-counting rule is deliberately conservative: a month only counts once the day-of-month has been reached again. From 31 January to 28 February that means the month is not yet complete, because February never reaches day 31. Different tools make different choices here, which is why an age gap can differ by a day between websites — the section on leap-day birthdays below shows the other common edge case.' },
        ],
      },
      {
        heading: 'Age Difference Examples',
        blocks: [
          {
            type: 'table',
            headers: ['First birth date', 'Second birth date', 'Gap', 'Total days'],
            rows: [
              ['15 May 1990', '28 September 1995', '5 years, 4 months, 13 days', '1,962'],
              ['1 January 1990', '1 January 1995', '5 years, 0 months, 0 days', '1,826'],
              ['29 February 2024', '1 March 2026', '2 years, 0 months, 0 days', '731'],
              ['10 June 2010', '10 June 2010', '0 years, 0 months, 0 days', '0'],
            ],
          },
          { type: 'p', text: 'The first row shows a gap that does not divide evenly: five years and change, which is why the total-days figure matters when precision counts. The second row shows a clean five-year gap that still contains 1,826 days — one more than 5 × 365 — because 1992 was a leap year. The rows are the same in either input order; only the "who is older" line changes.' },
        ],
      },
      {
        heading: 'Age Gap in Days vs Years, Months, and Days',
        blocks: [
          { type: 'p', text: 'Both lines describe the same interval, but they answer slightly different questions. "5 years, 4 months, 13 days" tells you where the two people stand relative to their birthdays: both have had five birthdays, one has had four more months of anniversaries. "1,962 days" tells you the raw distance, which is what you need for formulas, averages, or comparisons across many pairs.' },
          { type: 'p', text: 'Never divide the day count by 365 to get the calendar gap — leap days make that wrong. From 1 January 1990 to 1 January 1995 the raw count is 1,826 days, but the calendar gap is exactly 5 years, because the extra day belongs to 1992 and does not move either anniversary.' },
          { type: 'note', text: 'For the pure day count between two dates that are not birth dates — project ranges, deadlines, event spans — use [Days Between Dates](/calculators/days-between-dates) instead; it reports the same total-days figure with endpoint conventions explained.' },
        ],
      },
      {
        heading: 'Leap Day Birth Dates',
        blocks: [
          { type: 'p', text: 'A 29 February birthday only has a true anniversary in leap years. DatePilot reaches the next birthday on 1 March in non-leap years, the same rule the [Age Calculator](/calculators/age-calculator) uses, so from 29 February 2024 to 1 March 2026 the gap reports as 2 years, 0 months, 0 days — two anniversaries have passed under the reached-day rule, with no leftover days.' },
          { type: 'p', text: 'Other tools may report 2 years and 1 day for the same pair, anchoring the anniversary differently. Neither is wrong; they are different stated conventions. DatePilot shows its rule beside the result so you can adjust by a day when you are matching another source.' },
        ],
      },
      {
        heading: 'Common Mistakes When Comparing Ages',
        blocks: [
          {
            type: 'ul',
            items: [
              'Dividing total days by 365 to get years — leap days and anniversary dates break that shortcut.',
              'Assuming a 5-year gap is always 1,825 days — it is 1,826 when a leap day falls inside the span.',
              'Entering the dates in a fixed order and discarding the answer when it looks backwards — order does not matter here.',
              'Comparing results from two tools that use different month-borrow conventions without checking their stated rule.',
              'Using a birth-date gap for a schedule question — notice periods and deadlines belong to the working-day tools.',
            ],
          },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Check one person\'s age at any date with the [Age Calculator](/calculators/age-calculator), count days between arbitrary dates with [Days Between Dates](/calculators/days-between-dates), find the weekday of a birthday with the [Day of the Week calculator](/calendar/day-of-week), and read the underlying rules in [How to Calculate Age](/guides/how-to-calculate-age).' },
        ],
      },
    ],
    guideSlugs: ['how-to-calculate-age', 'days-between-dates', 'leap-years'],
    related: ['age-calculator', 'days-between-dates', 'date-calculator', 'day-of-week'],
    faqs: [
      ['Which person is older?', 'The earlier birth date is the older person. You can enter the dates in either order — the calculator orders them internally and states which side is older in the result.'],
      ['How is this different from the Age Calculator?', 'The Age Calculator measures one person from a birth date to a target date (today by default). This tool measures the distance between two birth dates, with no "today" involved. If both of your dates are birthdays, use this page.'],
      ['Why does another calculator differ by a day?', 'Usually the leap-day or month-borrow convention. DatePilot counts a month only once the day-of-month is reached again, and reaches 29 February birthdays on 1 March in non-leap years. Check the other tool\'s stated rule and adjust by one day if needed.'],
      ['Does the total-days line include leap days?', 'Yes. Every calendar day between the two dates is counted, including 29 February. That is why a five-year gap can total 1,826 days rather than 1,825.'],
      ['Can I enter dates in the future?', 'Yes. Both fields are plain calendar dates, so the tool works for planned dates too — for example, the gap between two expected dates. The earlier date is always reported as the older side.'],
    ],
  },
}
