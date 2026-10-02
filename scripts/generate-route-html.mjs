import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const templatePath = path.join(dist, 'index.html')
const siteUrl = 'https://datepilot.online'
const routes = {
  '/': ['DatePilot — Date, Calendar, and Time Tools', 'Free date calculators, calendar tools, and time utilities. Calculate dates, age, working days, week numbers, and time zones with clear explanations.'],
  '/calculators': ['Date and Time Calculators', 'Use DatePilot calculators to add or subtract days, count working days, find age, and calculate date differences with clear methodology.'],
  '/calendar': ['Calendar Tools — Weekdays, Week Numbers, Leap Years', 'Check weekdays, ISO week numbers, and leap years using DatePilot calendar tools with clearly stated conventions.'],
  '/time': ['Time Tools — Countdown, Time Difference, Time Zone Converter', 'Count down to a date, compare elapsed time, and convert between time zones using DatePilot time tools.'],
  '/guides': ['Date and Time Guides — Calculations, Calendars, Time Zones', 'Practical explanations for date calculations, calendar rules, time zones, and date formats.'],
  '/faq': ['Frequently Asked Questions — DatePilot', 'Answers about DatePilot calculations, endpoint conventions, privacy, and how date tools work.'],
  '/calculators/date-calculator': ['Date Calculator — Add or Subtract Days From a Date', 'Add or subtract any number of days from a starting date. The calculator handles month lengths, leap years, and year boundaries automatically.'],
  '/calculators/age-calculator': ['Age Calculator — Calculate Exact Age in Years, Months, Days', 'Calculate calendar age from a birth date to any target date. Learn why age differs from total days divided by 365.'],
  '/calculators/days-between-dates': ['Days Between Dates — Date Difference Calculator', 'Count the elapsed calendar days between two dates. Understand exclusive versus inclusive counting and endpoint conventions.'],
  '/calculators/days-calculator': ['Days Calculator — Days From Today, Before & Between Dates', 'Work out dates from a day count: what date is a number of days from today, what date was a number of days ago, and the days between dates.'],
  '/calculators/add-days': ['Add Days to Date — Calculate a Future Date in Days', 'Add days to a date to find the resulting future calendar date and weekday across month and year boundaries.'],
  '/calculators/subtract-days': ['Subtract Days From Date — Calculate a Date in the Past', 'Subtract days from a date to find an earlier calendar date, borrowing correctly across month and year boundaries.'],
  '/calculators/working-days': ['Working Days Calculator — Count Business Days Between Dates', 'Count weekdays between two dates. Understand the Monday–Friday rule and why holidays are separate.'],
  '/calculators/business-date-calculator': ['Business Date Calculator — Add or Subtract Business Days', 'Move any date forward or backward by a set number of weekdays. Monday to Friday only; public holidays are not removed automatically.'],
  '/calculators/age-difference-calculator': ['Age Difference Calculator — Gap Between Two Birth Dates', 'Compare two birth dates and read the gap in years, months, and days plus total calendar days, in either input order.'],
  '/calendar/day-of-week': ['Day of the Week Calculator — What Day Was or Will Be', 'Find the weekday for any past or future Gregorian date. Understand why the year matters for weekday lookup.'],
  '/calendar/week-number': ['Week Number Calculator — Current ISO Week Number', 'Find an ISO 8601 week number and week-year. Learn how week-years differ from calendar years around New Year.'],
  '/calendar/leap-year': ['Leap Year Calculator — Is This Year a Leap Year?', 'Check whether a year has 365 or 366 days. Understand the century exception and why 1900 is not a leap year.'],
  '/time/countdown': ['Countdown Calculator — How Many Days Until a Date', 'Count the days and hours remaining until a target date, measured from your device clock.'],
  '/time/time-difference': ['Time Difference Calculator — Time Between Two Times', 'Calculate the elapsed time between two dates and times in hours and minutes, including intervals that cross midnight.'],
  '/time/time-zone-converter': ['Time Zone Converter — Convert Time Zones & UTC Offsets', 'Convert a local date and time between named time zones using UTC offsets and daylight saving rules for the specific date.'],
  '/time/time-since-calculator': ['Time Since Calculator — Elapsed Time From a Date', 'Watch elapsed time since any past date and time tick by in years, months, days, hours, minutes, and seconds.'],
  '/time/work-hours-calculator': ['Work Hours Calculator — Shift Duration With Breaks', 'Total a work shift with unpaid breaks, decimal hours, and overnight support. Enter start, end, and break length.'],
  '/converters': ['Date Conversion Tools — Formats Made Clear', 'Convert dates between ISO 8601, US, and European formats with an explicit day and month order so ambiguous dates stay clear.'],
  '/converters/date-format-converter': ['Date Format Converter — ISO 8601, US, and EU Dates', 'Convert any readable date into ISO, US month-first, and European day-first formats at once, with ambiguity flagged instead of guessed.'],
  '/calculators/recurring-date-calculator': ['Recurring Date Calculator — Generate a Schedule of Dates', 'Generate a schedule of repeating dates by days, weeks, months, years, or selected weekdays, with month-end rules and CSV or ICS export.'],
  '/calculators/deadline-calculator': ['Deadline Calculator — Forward and Reverse Deadline Planning', 'Plan a deadline forward from a start date or backward from a due date, using calendar days or Monday-to-Friday business days.'],
  '/calendar/quarter-calculator': ['Quarter Calculator — Calendar and Fiscal Quarters', 'Find the quarter for any date or the exact dates of any calendar or fiscal quarter, with fiscal year start month and day counts.'],
  '/calendar/day-of-year': ['Day of Year Calculator — Ordinal Date and Days Left in Year', 'See the ordinal day of the year, days remaining, percentage complete, leap-year status, and weekdays left after any date.'],
  '/about': ['About DatePilot — Our Approach to Date Calculations', 'Learn how DatePilot builds date and time tools, explains its methods, and checks calculation accuracy.'],
  '/contact': ['Contact DatePilot — Report Issues and Corrections', 'Report incorrect calculations, broken links, accessibility issues, or other problems with DatePilot.'],
  '/privacy-policy': ['Privacy Policy — How DatePilot Handles Your Data', 'DatePilot calculators run in your browser. Read how we handle calculator inputs, cookies, and any analytics.'],
  '/cookie-policy': ['Cookie Policy — Which Cookies DatePilot Uses', 'Learn about essential, analytics, and advertising cookies used by DatePilot when enabled.'],
  '/terms': ['Terms of Use — DatePilot', 'Read the terms governing use of DatePilot date and time calculation tools.'],
  '/disclaimer': ['Disclaimer — DatePilot', 'DatePilot provides general calculations, not official or legal advice. Read important disclaimers.'],
  '/report-an-error': ['Report an Error — DatePilot', 'Found an incorrect calculation, broken link, or accessibility problem? Report it to DatePilot.'],
}

const guideTitles = {
  'date-calculations': 'How Date Calculations Work',
  'how-to-calculate-age': 'How to Calculate Age',
  'days-between-dates': 'How to Calculate Days Between Dates',
  'add-subtract-days': 'How to Add or Subtract Days From a Date',
  'working-days': 'Working Days Explained',
  'leap-years': 'Leap Years Explained',
  'week-numbers': 'How Week Numbers Work',
  'iso-week-date': 'ISO Week Date System Explained',
  'day-of-week': 'How to Find the Day of the Week',
  'time-zones': 'Time Zones Explained',
  'utc-vs-gmt': 'UTC and GMT Explained',
  'daylight-saving-time': 'Daylight Saving Time Explained',
  'date-time-formats': 'Date and Time Formats',
  'calendar-systems': 'Calendar Systems Explained',
}
for (const [slug, title] of Object.entries(guideTitles)) {
  routes[`/guides/${slug}`] = [
    `${title} — DatePilot Guide`,
    `${title}. Practical explanation with examples, assumptions, and related DatePilot tools.`
  ]
}

const template = fs.readFileSync(templatePath, 'utf8')
for (const [route, [title, description]] of Object.entries(routes)) {
  const canonical = `${siteUrl}${route === '/' ? '/' : `${route}/`}`
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
  const target = route === '/' ? dist : path.join(dist, route.slice(1))
  fs.mkdirSync(target, { recursive: true })
  fs.writeFileSync(path.join(target, 'index.html'), html)
}
console.log(`Generated ${Object.keys(routes).length} route HTML shells in dist/`)
