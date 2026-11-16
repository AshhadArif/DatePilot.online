import type { SourceLink } from './types'

export type ToolTrustExample = { input: string; result: string; note?: string }

export type ToolTrust = {
  formula: string
  assumptions: string[]
  examples: ToolTrustExample[]
  limits: string[]
  sources?: SourceLink[]
}

// Per-tool methodology, checked examples, and explicit limitations.
// The examples were computed with the same functions the calculator uses, so a
// visitor can enter the inputs and reproduce every result.
export const toolTrust: Record<string, ToolTrust> = {
  'date-calculator': {
    formula:
      'The start date is moved by the chosen unit. Days and weeks are added as calendar-day steps; months and years are added as whole calendar months, clamping to the last valid day when the target month is shorter. The result is then shown with its weekday.',
    assumptions: [
      'Dates are Gregorian calendar dates read in the visitor\'s local time zone.',
      'The start date is day zero: adding 1 day returns the next calendar date.',
      'A month means a calendar month (28 to 31 days), never a fixed 30-day span.',
      'Negative amounts move backward.',
    ],
    examples: [
      { input: '15 January 2026 + 30 days', result: '14 February 2026 (Saturday)', note: 'Crosses a 31-day month.' },
      { input: '31 January 2026 + 1 month', result: '28 February 2026 (Saturday)', note: 'Clamps to the last valid day.' },
      { input: '5 January 2026 − 10 days', result: '26 December 2025 (Friday)', note: 'Crosses a year boundary.' },
    ],
    limits: [
      'Does not add business days or skip public holidays.',
      'Does not apply time-of-day or time-zone changes; it works on calendar dates.',
      'Month-end results can differ from 30-day arithmetic by design.',
    ],
  },
  'age-calculator': {
    formula:
      'Age is counted in completed calendar anniversaries: whole years first, then whole months, then remaining days. When the target day is earlier than the birth day, days are borrowed from the real length of the relevant month.',
    assumptions: [
      'Both dates are local calendar dates with no time of day.',
      'The target date must be on or after the birth date.',
      'A new age begins on the anniversary of the birth date, not on day 365 of each year.',
    ],
    examples: [
      { input: 'Birth 15 March 1990; target 16 November 2026', result: '36 years, 8 months, 1 day' },
      { input: 'Birth 29 February 2000; target 28 February 2026', result: '25 years, 11 months, 30 days', note: 'Leap-day birth date handled by calendar anniversaries.' },
      { input: 'Birth 29 February 2000; target 1 March 2026', result: '26 years, 0 months, 0 days' },
    ],
    limits: [
      'Does not model legal age rules that depend on a time of birth or local law.',
      'Ignores the time of day.',
      'The month-and-day breakdown is not a decimal year.',
    ],
  },
  'age-difference-calculator': {
    formula:
      'The earlier birth date becomes the anchor. The gap is decomposed into completed years, months, and days using calendar anniversaries, and the same span is also reported as total calendar days.',
    assumptions: [
      'Either input order is accepted; the earlier date becomes the anchor.',
      'Both inputs are local calendar dates.',
      'The breakdown uses calendar anniversaries, not average month lengths.',
    ],
    examples: [
      { input: '10 January 1990 and 5 March 1995', result: '5 years, 1 month, 23 days · 1,880 total days' },
      { input: 'Same date entered twice', result: '0 years, 0 months, 0 days' },
    ],
    limits: [
      'Does not account for time of birth.',
      'Does not convert the gap to decimal years.',
      'For legal or medical age questions, verify the applicable rule.',
    ],
  },
  'days-between-dates': {
    formula:
      'Both dates are converted to calendar midnights and the absolute difference is taken. The result is the elapsed gap between the dates, excluding both named endpoints.',
    assumptions: [
      'Dates are Gregorian calendar dates in the visitor\'s local time zone.',
      'The gap is exclusive: 15 January to 15 March counts neither 15 January nor 15 March.',
      'Input order does not matter; the absolute gap is reported.',
    ],
    examples: [
      { input: '15 January 2026 to 15 March 2026', result: '59 days', note: 'January 16 + February 28 + March 15.' },
      { input: '10 February 2028 to 10 April 2028', result: '60 days', note: 'Leap February adds one day.' },
      { input: '1 January 2026 to 1 January 2027', result: '365 days' },
    ],
    limits: [
      'Does not count inclusive days; add 1 if both endpoints should be included.',
      'Does not skip weekends or holidays.',
      'Ignores the time of day.',
    ],
  },
  'days-calculator': {
    formula:
      'From the reference date, the entered number of days is added in one direction and subtracted in the other. Both resulting calendar dates and weekdays are returned.',
    assumptions: [
      'The reference date is day zero.',
      'The count is a whole number of calendar days.',
      'Both directions use the same absolute day count.',
    ],
    examples: [
      { input: 'Reference 15 March 2026; 30 days', result: 'After: 14 April 2026 (Tuesday) · Before: 13 February 2026 (Friday)' },
      { input: 'Reference 1 January 2026; 1 day', result: 'After: 2 January 2026 (Friday) · Before: 31 December 2025 (Wednesday)' },
    ],
    limits: [
      'Does not count business days or holidays.',
      'Does not accept fractional days.',
      'Ignores the time of day.',
    ],
  },
  'add-days': {
    formula:
      'Calendar days are added to the start date. Weeks are converted to 7-day steps; months and years use calendar-month addition with end-of-month clamping. The resulting weekday is shown with the date.',
    assumptions: [
      'The start date is day zero.',
      'The amount is a whole number; negative input moves backward.',
      'The weekday is formatted in the visitor\'s locale.',
    ],
    examples: [
      { input: '20 December 2026 + 20 days', result: '9 January 2027 (Saturday)', note: 'Crosses a year boundary.' },
      { input: '31 January 2026 + 1 day', result: '1 February 2026 (Sunday)' },
      { input: '15 January 2026 + 2 weeks', result: '29 January 2026 (Thursday)' },
    ],
    limits: [
      'Does not skip weekends or public holidays.',
      'Month and year units are calendar-based, not fixed durations.',
      'Ignores the time of day.',
    ],
  },
  'subtract-days': {
    formula:
      'Calendar days are subtracted from the start date. The calculator borrows from the previous month and year as needed. Weeks, months, and years use the same calendar rules as addition.',
    assumptions: [
      'The start date is day zero.',
      'A positive amount moves backward; a negative amount moves forward.',
      'Month-end results are clamped to the last valid day.',
    ],
    examples: [
      { input: '5 January 2026 − 10 days', result: '26 December 2025 (Friday)', note: 'Crosses a year boundary.' },
      { input: '1 March 2026 − 1 day', result: '28 February 2026 (Saturday)' },
      { input: '31 March 2026 − 1 month', result: '28 February 2026 (Saturday)', note: 'End-of-month clamp.' },
    ],
    limits: [
      'Does not skip weekends or public holidays.',
      'Month-end clamping can surprise: 31 March minus 1 month is 28 February, not 3 March.',
      'Ignores the time of day.',
    ],
  },
  'working-days': {
    formula:
      'The calculator counts Monday-to-Friday dates between the two endpoints, including both endpoints when they are weekdays. Saturday and Sunday are excluded.',
    assumptions: [
      'A working day is Monday through Friday.',
      'Both endpoints are included in the count if they are weekdays.',
      'Public holidays, regional holidays, and company shutdowns are not known to the calculator.',
    ],
    examples: [
      { input: 'Monday 5 January to Friday 9 January 2026', result: '5 working days' },
      { input: 'Friday 2 January to Monday 5 January 2026', result: '2 working days', note: 'Both endpoints are weekdays.' },
      { input: '1 January to 31 January 2026', result: '22 working days' },
    ],
    limits: [
      'Does not subtract public holidays.',
      'Does not model a six-day week, shift work, or regional weekends.',
      'For contract deadlines, confirm whether the start or end date is included.',
    ],
  },
  'business-date-calculator': {
    formula:
      'Starting from the entered date, the calculator steps one calendar day at a time, counting only Monday-to-Friday dates until the requested number of business days is reached.',
    assumptions: [
      'Business days are Monday through Friday.',
      'The start date is not counted; the first step is the next business day.',
      'Public holidays are not removed.',
    ],
    examples: [
      { input: 'Friday 2 January 2026 + 1 business day', result: 'Monday 5 January 2026' },
      { input: 'Monday 5 January 2026 − 1 business day', result: 'Friday 2 January 2026' },
      { input: 'Friday 2 January 2026 + 5 business days', result: 'Friday 9 January 2026' },
    ],
    limits: [
      'Does not know public holidays or company closures.',
      'Does not model regional working weeks.',
      'Large counts are capped for performance.',
    ],
  },
  'recurring-date-calculator': {
    formula:
      'The first date is the anchor. Each occurrence adds a fixed number of days, weeks, months, or years, or selects chosen weekdays within each interval. Month-end dates clamp to the last valid day or skip the month, depending on the selected rule.',
    assumptions: [
      'The first date is always included.',
      'Intervals are measured from the first date, not from the previous occurrence.',
      'Weekday mode counts whole weeks from the first date.',
      'Holidays are not applied.',
    ],
    examples: [
      { input: '31 January 2026, every 1 month, clamp', result: '31 Jan, 28 Feb, 31 Mar, 30 Apr 2026' },
      { input: '1 January 2026, every 2 weeks', result: '1 Jan, 15 Jan, 29 Jan 2026' },
      { input: 'Wednesday 7 January 2026, every week on Wednesday', result: '7, 14, 21 January 2026' },
    ],
    limits: [
      'Does not apply public holidays.',
      'Generates at most 100 dates per schedule.',
      'Month-end and leap-day behaviour is an explicit choice, not an automatic business rule.',
    ],
  },
  'deadline-calculator': {
    formula:
      'Forward mode adds the day count to the start date; backward mode subtracts it from the deadline. Calendar days and Monday-to-Friday business days are supported, and an optional safety buffer is applied in the chosen direction.',
    assumptions: [
      'Days are whole numbers, zero or greater.',
      'Calendar-day counts include weekends; business-day counts exclude them.',
      'The safety buffer is always measured in calendar days.',
      'Public holidays are not applied.',
    ],
    examples: [
      { input: 'Forward: start 1 January 2026, 10 calendar days, 2-day buffer', result: 'Deadline: 13 January 2026 (Tuesday)' },
      { input: 'Forward: start Friday 2 January 2026, 5 business days', result: 'Deadline: Friday 9 January 2026' },
      { input: 'Backward: deadline 31 January 2026, 10 calendar days', result: 'Latest start: 21 January 2026 (Wednesday)' },
    ],
    limits: [
      'Does not know statutory notice rules or public holidays.',
      'A buffer is not a substitute for legal or contractual review.',
      'Business-day mode uses a Monday-to-Friday week.',
    ],
  },
  'day-of-week': {
    formula:
      'The date is converted to a weekday using the proleptic Gregorian calendar. The weekday is a property of the calendar date, so it does not depend on the time of day or the visitor\'s time zone.',
    assumptions: [
      'Dates use the proleptic Gregorian calendar, including dates before 1582.',
      'The weekday is a property of the calendar date, not of a timestamp.',
      'Weekday names are shown in English.',
    ],
    examples: [
      { input: '1 January 2026', result: 'Thursday' },
      { input: '4 July 2026', result: 'Saturday' },
      { input: '29 February 2024', result: 'Thursday' },
    ],
    limits: [
      'Historical dates before the Gregorian reform may differ from the calendar a country used at the time.',
      'Does not account for local calendar systems.',
      'Ignores the time of day.',
    ],
  },
  'week-number': {
    formula:
      'ISO 8601 week numbering is used: weeks start on Monday, and week 1 is the week containing the first Thursday of the year. The calculator reports both the ISO week number and the ISO week-year.',
    assumptions: [
      'Weeks start on Monday.',
      'Week 1 contains 4 January and the first Thursday of the year.',
      'The ISO week-year can differ from the calendar year around New Year.',
    ],
    examples: [
      { input: '1 January 2026', result: 'ISO week 1, 2026' },
      { input: '31 December 2026', result: 'ISO week 53, 2026' },
      { input: '1 January 2027', result: 'ISO week 53, 2026', note: 'The ISO week-year is 2026.' },
    ],
    limits: [
      'Does not use US or other national week-numbering rules.',
      'Does not apply a custom first day of the week.',
      'Dates are Gregorian.',
    ],
  },
  'leap-year': {
    formula:
      'A year is a leap year when it is divisible by 4, except century years, which must also be divisible by 400. Leap years have 366 days and include 29 February.',
    assumptions: [
      'The Gregorian rule is applied to the entered year.',
      'Years are positive integers.',
      'The result is about the calendar year, not a fiscal or academic year.',
    ],
    examples: [
      { input: '2024', result: 'Leap year, 366 days' },
      { input: '2100', result: 'Not a leap year, 365 days', note: 'Century exception.' },
      { input: '2000', result: 'Leap year, 366 days', note: 'Divisible by 400.' },
    ],
    limits: [
      'Does not apply historical Julian calendar rules.',
      'Does not decide how a country or organisation labels the year.',
      'Does not handle year-zero conventions.',
    ],
  },
  'quarter-calculator': {
    formula:
      'Quarters are three calendar months measured from a chosen fiscal-year start month. The calculator finds the quarter containing a date, or the exact start and end dates of a chosen quarter, and counts elapsed and remaining days.',
    assumptions: [
      'Calendar quarters start in January; other fiscal starts are selectable.',
      'Quarter boundaries are calendar-month boundaries.',
      'Day counts include both the start and end date.',
    ],
    examples: [
      { input: '15 May 2026, January fiscal start', result: 'Q2 2026 · 1 April to 30 June 2026 · 45 of 91 days used (49.5%)' },
      { input: '15 May 2026, April fiscal start', result: 'Q1 FY2027 · 1 April to 30 June 2026 · 45 of 91 days used (49.5%)' },
      { input: 'Q2, fiscal year 2026 starting in April', result: '1 July 2025 to 30 September 2025', note: 'The fiscal-year label is the year in which it ends.' },
    ],
    limits: [
      'Does not model 4-4-5 retail calendars or 52/53-week fiscal years.',
      'Fiscal-year labels vary by organisation.',
      'Public holidays are not considered.',
    ],
  },
  'day-of-year': {
    formula:
      'The ordinal day is the number of calendar days from 1 January to the entered date, counting 1 January as day 1. Remaining days are the days after the date up to 31 December; the percentage is based on the year\'s total length.',
    assumptions: [
      'The year is a standard Gregorian calendar year.',
      'The ordinal count includes 1 January as day 1.',
      'Remaining days exclude the entered date.',
    ],
    examples: [
      { input: '1 March 2026', result: 'Day 60 of 365 · 305 days remaining (83.6%)' },
      { input: '1 March 2028', result: 'Day 61 of 366 · 305 days remaining (83.3%)', note: 'Leap year.' },
      { input: '31 December 2026', result: 'Day 365 of 365 · 0 days remaining' },
    ],
    limits: [
      'Does not model fiscal or academic years.',
      'Weekday-remaining counts exclude the entered date.',
      'Dates before 1 CE or after 9999 are rejected.',
    ],
  },
  'countdown': {
    formula:
      'The target date is set to 17:00 local time on the visitor\'s device. The calculator subtracts the current device time from that moment and reports whole days and hours remaining.',
    assumptions: [
      'The target moment is 17:00 local time, not midnight.',
      'The current time comes from the visitor\'s device clock.',
      'The result is calculated when the button is pressed; it does not tick automatically.',
    ],
    examples: [
      { input: 'At 14:00 on 15 September 2026, target 1 January 2027', result: '108 days, 3 hours', note: 'The target is 17:00 on 1 January.' },
      { input: 'Target date already past 17:00', result: 'The 17:00 target on that date has passed.' },
    ],
    limits: [
      'A wrong device clock produces a wrong countdown.',
      'Does not convert the target to another time zone.',
      'Not suitable for legal deadlines without verifying the official time source.',
    ],
  },
  'time-since-calculator': {
    formula:
      'The entered past date and time is subtracted from the current device time. The gap is displayed in years, months, and days, then in days, hours, minutes, and seconds, and refreshes every second.',
    assumptions: [
      'The entered moment is interpreted in the visitor\'s local time zone.',
      'The current time comes from the device clock.',
      'Future moments are reported as "not yet".',
    ],
    examples: [
      { input: 'Start 1 January 2026 00:00; check on 16 November 2026 12:00', result: '10 months, 15 days · 319 days, 12 hours', note: 'The exact seconds depend on when you check.' },
      { input: 'Start 1 January 2027 when today is 16 November 2026', result: 'That moment has not happened yet.' },
    ],
    limits: [
      'Depends on the device clock.',
      'Does not adjust for a different source time zone.',
      'Seconds are live and differ each time you look.',
    ],
  },
  'time-difference': {
    formula:
      'Each input is read as a local date and time. The calculator takes the absolute difference between the two timestamps, rounds to the nearest minute, and reports whole hours and minutes.',
    assumptions: [
      'Both values are interpreted in the visitor\'s local time zone.',
      'The result is always positive; the tool notes when the first input is later.',
      'The two times may fall on different dates.',
    ],
    examples: [
      { input: '09:00 to 17:30 on the same day', result: '8 hours, 30 minutes' },
      { input: '22:00 on 1 January to 02:00 on 2 January 2026', result: '4 hours, 0 minutes' },
      { input: '09:00 on 1 January to 08:00 on 2 January 2026', result: '23 hours, 0 minutes' },
    ],
    limits: [
      'Does not convert between time zones; use the Time Zone Converter for that.',
      'Rounds to the nearest minute.',
      'Does not account for leap seconds.',
    ],
  },
  'work-hours-calculator': {
    formula:
      'Clock-in and clock-out times are converted to minutes. If clock-out is earlier than clock-in, the shift is treated as overnight and 24 hours are added. The unpaid break is then subtracted to give net hours and decimal hours.',
    assumptions: [
      'Times are local clock times in 24-hour format.',
      'An end time earlier than the start time means the shift crosses midnight.',
      'Break minutes are unpaid and must be shorter than the shift.',
    ],
    examples: [
      { input: '09:00–17:00 with a 30-minute break', result: '7 hours 30 minutes · 7.50 decimal hours' },
      { input: '22:00–06:00 with no break', result: '8 hours 0 minutes · 8.00 decimal hours', note: 'Overnight shift.' },
      { input: '09:00–09:00', result: 'Error: start and end times are the same.' },
    ],
    limits: [
      'Does not apply overtime, shift differentials, or rounding rules.',
      'Does not know local labour-law break requirements.',
      'Does not handle multiple breaks in one shift.',
    ],
  },
  'time-zone-converter': {
    formula:
      'The entered local time is converted to a UTC instant using the source zone\'s offset for that date, then formatted in the destination zone using IANA time zone data. Daylight-saving rules are applied for the specific date.',
    assumptions: [
      'Zones are IANA names such as America/New_York or Europe/London.',
      'The source value is a local wall-clock time in the named source zone.',
      'The browser supplies the IANA time zone database and its historical rules.',
    ],
    examples: [
      { input: '1 January 2026 09:00 America/New_York to UTC', result: '1 January 2026 at 14:00', note: 'EST, UTC−5.' },
      { input: '1 July 2026 09:00 America/New_York to UTC', result: '1 July 2026 at 13:00', note: 'EDT, UTC−4.' },
      { input: '1 January 2026 09:00 Asia/Kolkata to America/New_York', result: '31 December 2025 at 22:30', note: 'The date changes.' },
    ],
    limits: [
      'Depends on the browser\'s time zone database version.',
      'Does not model future political changes that are not yet in the database.',
      'For legal or transport deadlines, verify with the official authority.',
    ],
  },
  'date-format-converter': {
    formula:
      'The input is parsed as ISO, compact, numeric, or named-month date. Numeric dates that could be day-first or month-first are flagged as ambiguous unless the day/month order is chosen. The resolved date is then rendered in nine common formats.',
    assumptions: [
      'Years are four digits; two-digit years are not guessed.',
      'A numeric date is ambiguous when both day and month are 12 or less and no order is selected.',
      'The output is a calendar date, not a time zone conversion.',
    ],
    examples: [
      { input: '03/04/2026, day-first', result: '3 April 2026 (Friday) · ISO 2026-04-03 · US 04/03/2026 · EU 03/04/2026' },
      { input: '03/04/2026, month-first', result: '4 March 2026 (Wednesday) · ISO 2026-03-04 · US 03/04/2026 · EU 04/03/2026' },
      { input: '2026-10-03', result: '3 October 2026 (Saturday)' },
      { input: '03/04/2026, auto', result: 'Ambiguous; choose day-first or month-first.' },
    ],
    limits: [
      'Does not expand two-digit years.',
      'Does not convert times or time zones.',
      'Ambiguous dates are intentionally not guessed.',
    ],
  },
}
