import type { GuideContent } from './types'

export const guideContent: Record<string, GuideContent> = {
  'date-calculations': {
    answer: 'Date calculations become reliable only when you define the calendar system, endpoint convention, units, and assumptions before doing the arithmetic. Without those definitions, two people can get different answers from the same question.',
    sections: [
      ['Elapsed days versus calendar arithmetic', 'An elapsed-day calculation measures the physical distance between calendar midnights. Adding a calendar month is different: it must account for the varying lengths of months. For example, 31 January + 30 elapsed days = 2 March, but 31 January + "one calendar month" = 28 or 29 February (depending on leap year) or 28 February (non-leap). The distinction matters when someone asks "what date is 30 days from now" versus "what date is one month from now."'],
      ['Inclusive and exclusive counting', 'The most common source of confusion in date calculations is whether the start date, end date, or both are included in the count. An exclusive count measures the gap between dates (like the number of nights in a hotel stay). An inclusive count includes both named dates (like the number of calendar days you are away). For example, Monday to Friday is 4 exclusive days but 5 inclusive days. Always state which convention you are using.'],
      ['Month and year boundaries', 'Crossing February, December, or a year boundary is where manual counting most often fails. February has 28 or 29 days. December has 31. Year boundaries change the year in the result. When doing manual verification, break the interval at each month boundary and sum the days in each segment. For example, from 15 January to 15 March: January has 16 remaining days (15-31), February has 28 days, March has 15 days. Total: 59 days (non-leap) or 60 days (leap).'],
      ['Leap days and the February effect', 'February 29 exists only in leap years. Any date calculation that crosses February 29 must account for this. A date difference from 1 February to 1 March is 28 days in a non-leap year but 29 days in a leap year. This is why automated calculators are more reliable than mental math for date arithmetic across February.'],
      ['Time zones and DST', 'A calendar day is not always exactly 24 elapsed hours. During daylight-saving transitions, a day can be 23 or 25 hours. For most date-only calculations, this does not matter because the calculation works with calendar midnights. But for time-sensitive deadlines or duration calculations, always state the timezone and check whether DST is active.'],
      ['Practical workflow', 'Define the question clearly: what are the start and end dates, what unit do you need (days, months, years), and what counting convention applies? Calculate, then verify the result by testing it around a known boundary such as February, December 31, or a weekday. Use a calculator for accuracy, but understand the convention it uses.'],
    ],
    toolSlugs: ['date-calculator', 'days-between-dates', 'add-days', 'subtract-days'],
  },
  'how-to-calculate-age': {
    answer: 'Calendar age is calculated by counting completed anniversaries, then the remaining months and days. It is not simply dividing total days by 365, because months have different lengths and leap years add extra days.',
    sections: [
      ['Step-by-step method', 'Step 1: Compare the target year with the birth year. Step 2: If the target month/day comes before the birth month/day, subtract one year and adjust months. Step 3: If the target day comes before the birth day, subtract one month and add the days in the previous month. This three-step method counts completed anniversaries first, giving you the precise calendar age.'],
      ['Worked example: age on a specific date', 'Born: 15 March 1990. Target: 10 January 2026. Step 1: 2026 - 1990 = 36. Step 2: January (1) is before March (3), so subtract 1 year: 35 years. Step 3: From 15 March 2025 to 10 January 2026: March has 16 remaining days (15-31), April through December = 9 months, January = 10 days. Result: 35 years, 9 months, 26 days.'],
      ['Leap-day birthdays', 'If you were born on 29 February, the date 29 February does not exist in common years. This calculator reaches the next birthday on 1 March in a non-leap year, so on 28 February the reported age is one day short of the next whole year. Other conventions use 28 February as the reference instead, and legal rules vary by jurisdiction — so a calculator and a government record can legitimately differ by a day.'],
      ['Month-end edge cases', 'If you were born on 31 January, what happens in February? February has only 28 or 29 days, so a completed month is not counted until the day of the month is reached again — on 28 February the calculator reports the days since the anniversary rather than a whole month. If born on 28 February in a leap year, the birthday is 28 February in common years and 29 February in leap years.'],
      ['Age versus total days', 'A person who is "35 years old" has lived through 35 calendar years, which includes 8 or 9 leap years (roughly 12,783 to 12,784 days). Dividing total days by 365 gives approximately 34.99, which rounds to 35, but this approximation hides the calendar complexity. Calendar age respects the actual structure of the calendar.'],
      ['Common mistakes', 'Using today\'s date without checking it is the intended target. Assuming age = year difference without checking month and day. Not verifying the result with a known birthday. Forgetting that someone born on 29 February only has a "real" birthday every 4 years.'],
    ],
    toolSlugs: ['age-calculator', 'days-between-dates'],
  },
  'days-between-dates': {
    answer: 'To calculate the days between two dates, first decide whether you need an elapsed gap (exclusive) or a schedule count (inclusive). The convention you choose changes the answer by one or more days.',
    sections: [
      ['Exclusive versus inclusive counting', 'An exclusive elapsed gap measures the distance between two dates without counting either named date. An inclusive count includes both the start and end dates. For example, a hotel stay from Monday to Wednesday: exclusive = 2 nights (Tuesday, Wednesday), inclusive = 3 days (Monday, Tuesday, Wednesday). The difference matters for bookings, leave requests, and project timelines.'],
      ['Manual calculation method', 'To calculate manually: (1) Count the remaining days in the start month. (2) Add full months between the start and end. (3) Add the days in the end month up to the target date. (4) Sum all parts. For example, from 15 January to 15 March: January has 16 remaining days (15-31), February has 28 days, March has 15 days. Total: 59 days (non-leap).'],
      ['Handling February and leap years', 'February has 28 days in common years and 29 days in leap years. When your interval crosses February, the day count depends on whether the year is a leap year. A date difference from 1 February to 1 March is 28 days (non-leap) or 29 days (leap). Always account for this when verifying manually.'],
      ['When the convention matters', 'For leave requests, use inclusive counting (both the first and last day of leave count). For project timelines, use exclusive counting (the number of days between milestones). For legal deadlines, check the specific jurisdiction\'s convention. For hotel bookings, the standard is to count nights (exclusive).'],
      ['Common mistakes', 'The most common errors are: reversing the dates (the calculator handles this), counting the first day twice (double-counting), and ignoring leap years when verifying manually. Always test your result against a known reference point.'],
    ],
    toolSlugs: ['days-between-dates', 'date-calculator', 'working-days'],
  },
  'add-subtract-days': {
    answer: 'Adding or subtracting days means moving through calendar dates while respecting month lengths and year boundaries. The key distinction is that calendar arithmetic follows the rules of the Gregorian calendar, not simple arithmetic.',
    sections: [
      ['Future dates with addition', 'When you add days, the result moves forward through the calendar. The starting date is not counted as day one: 1 January plus 1 day is 2 January, not 1 January. The calculator handles month overflow automatically: 31 January plus 1 day is 1 February, not 32 January.'],
      ['Past dates with subtraction', 'When you subtract days, the result moves backward. 1 February minus 1 day is 31 January. 1 January minus 1 day is 31 December of the previous year. The calculator handles month and year underflow automatically.'],
      ['Month-boundary behavior', 'Different months have different numbers of days. Adding 31 days to 1 January gives 1 February, not 31 January + 1 = 32 January. The key insight is that "31 days from 1 January" is not the same as "one month from 1 January." Calendar addition works with days, not months.'],
      ['Year boundaries', 'When subtracting days crosses a year boundary, the year changes. For example, 1 January 2026 minus 1 day is 31 December 2025. The calculator handles this correctly because JavaScript\'s Date object manages year overflow and underflow.'],
      ['Calendar days versus hours', 'A calendar day is not always exactly 24 elapsed hours. During daylight-saving transitions, a day can be 23 or 25 hours. This calculator works with calendar dates (midnight to midnight), not elapsed hours. For hour-precise calculations, use the Time Difference Calculator.'],
    ],
    toolSlugs: ['add-days', 'subtract-days', 'date-calculator'],
  },
  'working-days': {
    answer: 'Working-day calculations require three explicit decisions: the weekend rule, the endpoint convention, and the holiday policy. Without these definitions, "business days" and "working days" can mean different things to different people.',
    sections: [
      ['The weekday rule', 'DatePilot\'s default rule counts Monday through Friday as working days. This is the standard in most Western countries, but it is not universal. In many Middle Eastern countries, the working week is Sunday through Thursday. In some industries, Saturday is a half-day. Always state your weekend rule.'],
      ['Endpoint inclusion', 'Whether the start date and end date are counted depends on the convention. DatePilot counts both the start and end dates if they are weekdays. For example, Monday to Friday = 5 working days (both Monday and Friday are counted). This is the most common convention for project timelines and leave calculations.'],
      ['Holidays are separate', 'Public holidays fall on weekdays but are not working days in most business contexts. DatePilot does not include holiday data by default because holiday calendars vary by country, state, and industry. For accurate business-day calculations, you need to subtract holidays separately. For example, if Christmas Day falls on a Wednesday, a Monday-to-Friday week has only 4 working days that week.'],
      ['Regional variations', 'The standard working week varies by region: Monday-Friday (most of Europe, Americas), Sunday-Thursday (Middle East), Monday-Saturday (some Asian countries). Some countries have half-day Saturdays. Religious and cultural holidays also affect the working calendar.'],
      ['Practical workflow', 'Define your weekend rule, check for holidays in your region, then use the calculator. For example: "How many working days from 1 January to 31 January 2026, excluding New Year\'s Day (1 January) and assuming Monday-Friday weekends?" First calculate total weekdays, then subtract the holidays that fall on weekdays.'],
      ['Common mistakes', 'Calling weekdays "business days" without checking holidays. Not verifying whether the start and end dates are weekdays. Forgetting that different countries have different weekend days. Not accounting for regional holidays when the calculation is for business purposes.'],
    ],
    toolSlugs: ['working-days', 'days-between-dates', 'add-days', 'deadline-calculator'],
  },
  'leap-years': {
    answer: 'The Gregorian leap-year rule adds February 29 to keep the calendar aligned with the solar year. Without leap days, the calendar would drift about one day every four years, eventually placing summer in December.',
    sections: [
      ['The complete rule', 'A year is a leap year if: (1) it is divisible by 4, AND (2) it is NOT a century year (divisible by 100) UNLESS it is also divisible by 400. This gives three cases: 2024 = leap (divisible by 4, not a century year). 1900 = not leap (divisible by 100, not by 400). 2000 = leap (divisible by 400).'],
      ['Why the century exception exists', 'The tropical year (one complete orbit of the Earth around the Sun) is approximately 365.2422 days. A simple leap year every 4 years gives 365.25 days. The century exception (no leap year in 1900, 2100, etc.) brings the average to 365.2425 days, which is much closer to the tropical year.'],
      ['Examples across centuries', '2024: leap year. 2025: not. 2026: not. 2027: not. 2028: leap. 2100: not leap (century exception). 2200: not leap. 2300: not leap. 2400: leap (divisible by 400). These examples demonstrate both the 4-year rule and the century exception.'],
      ['Impact on date calculations', 'Leap days affect age calculations (someone born on 29 February has a birthday every 4 years), date differences (a span crossing 29 February is one day longer), and annual planning (February has 29 days instead of 28). Any calculation crossing February should account for whether the year is a leap year.'],
      ['Historical context', 'The Julian calendar (used before the Gregorian reform) had a simpler rule: every 4 years is a leap year. This created an error of about 11 minutes per year, which accumulated to 10 days by the 1500s. The Gregorian reform corrected this with the century exception. Different countries adopted the Gregorian calendar at different times.'],
    ],
    toolSlugs: ['leap-year', 'days-between-dates', 'calendar-systems', 'day-of-year'],
  },
  'week-numbers': {
    answer: 'Week numbers organize dates into seven-day periods, but the result depends entirely on which convention you use. DatePilot uses ISO 8601, the international standard for week numbering.',
    sections: [
      ['The ISO 8601 convention', 'ISO weeks start on Monday. Week 1 of any year is the week containing the first Thursday. This means: (1) Every ISO year has either 52 or 53 weeks. (2) The week-year can differ from the calendar year. (3) Dates in late December can belong to week 1 of the next year.'],
      ['The first-Thursday rule', 'The first Thursday of the year determines week 1. For example, if January 1 is a Thursday, it is in week 1. If January 1 is a Friday, it is in the last week (52 or 53) of the previous year. This rule ensures every year starts on a Monday (or close to one) and avoids short partial weeks.'],
      ['52-week and 53-week years', 'Most years have 52 weeks. A year has 53 weeks when: (1) January 1 falls on a Thursday, or (2) it is a leap year starting on a Wednesday. This happens approximately every 5-6 years. The extra week affects scheduling, payroll, and financial reporting.'],
      ['December/January boundary', 'The most confusing part of ISO week numbering is the year boundary. Example: 29 December 2025 (Monday) through 4 January 2026 (Sunday) is all in ISO week 1 of 2026. The Thursday of this week is 1 January 2026. So 29 December 2025 is in week 1 of 2026, not week 52 of 2025.'],
      ['When to use ISO weeks', 'ISO weeks are used in business, manufacturing, software development, and financial reporting. They provide a consistent way to reference weeks across years. If your team or industry uses a different convention (e.g., weeks starting on Sunday), make sure everyone uses the same system.'],
    ],
    toolSlugs: ['week-number', 'day-of-week', 'iso-week-date', 'quarter-calculator'],
  },
  'iso-week-date': {
    answer: 'ISO week dates provide a complete date representation using a week-year, week number, and weekday. The system is designed for consistent week-based scheduling and reporting.',
    sections: [
      ['The three components', 'An ISO week date has three parts: the week-year (the year that contains the Thursday), the week number (1-52 or 53), and the weekday (1=Monday through 7=Sunday). For example, 2026-W01-1 means Monday of week 1 in week-year 2026.'],
      ['Week-year versus calendar year', 'The ISO week-year is the year that contains the Thursday of the current week. This means the week-year can differ from the calendar year. Example: 31 December 2025 is a Wednesday. Its Thursday is 1 January 2026. So the week-year is 2026, not 2025. The date belongs to week 1 of 2026.'],
      ['First Thursday rule in detail', 'Week 1 is the week containing January 4 (or equivalently, the week containing the first Thursday of the year). If January 1 is a Monday, Tuesday, Wednesday, or Thursday, it is in week 1. If January 1 is a Friday, Saturday, or Sunday, it is in the last week of the previous year.'],
      ['Practical uses', 'ISO week dates are used in: business scheduling (weekly reports, payroll periods), manufacturing (production schedules), software development (sprint planning, release cycles), financial reporting (fiscal weeks), and logistics (delivery schedules). The key advantage is consistency across years.'],
      ['Converting to calendar date', 'To find the calendar date from an ISO week date: (1) Find the Thursday of the ISO week. (2) That Thursday is always in the correct week-year. (3) Count backward to Monday (day 1) or forward to Sunday (day 7). This conversion is what the Week Number Calculator automates.'],
    ],
    toolSlugs: ['week-number', 'calendar-systems'],
  },
  'day-of-week': {
    answer: 'Finding a weekday is a straightforward calendar lookup, but the year always matters because the same month and day falls on different weekdays in different years.',
    sections: [
      ['Why the year matters', 'The Gregorian calendar repeats in 400-year cycles (146,097 days = exactly 20,871 weeks). Within that cycle, the same calendar repeats. But year-to-year, the weekday shifts: common years shift by 1 day, leap years shift by 2 days. So 1 January 2025 was a Wednesday, 1 January 2026 is a Thursday, and 1 January 2027 will be a Friday.'],
      ['Verification with known dates', 'Check your result against known reference dates: 4 July 1776 was a Thursday. 1 January 2000 was a Saturday. 29 February 2024 was a Thursday. These can be verified with any historical calendar.'],
      ['Historical dates and calendar systems', 'For dates before the Gregorian calendar was adopted (1582 in Catholic countries, 1752 in Britain, 1918 in Russia), the proleptic Gregorian result may differ from the historical weekday. If you need the historical weekday, use the calendar system that was in effect at that time and place.'],
      ['Using weekday results for planning', 'Weekday information helps with: scheduling recurring meetings (e.g., "every third Wednesday"), calculating working days (weekdays only), understanding historical events (e.g., "what day of the week was the battle?"), and planning events on specific days.'],
      ['Related calculations', 'The weekday is the foundation for several other calculations: working days (counting weekdays), week numbers (ISO weeks start on Monday), and date arithmetic (knowing when a weekday falls helps plan around weekends).'],
    ],
    toolSlugs: ['day-of-week', 'working-days', 'calendar-systems'],
  },
  'time-zones': {
    answer: 'A time zone is not just a UTC offset — it is a set of rules that govern how a region represents instants of time locally, including historical changes and daylight-saving transitions.',
    sections: [
      ['Named zones versus raw offsets', 'UTC-5 describes an offset at one moment. "America/New_York" describes a complete set of rules including: current offset, historical changes, DST transitions, and future changes. Named zones are always more informative than raw offsets for scheduling and conversion.'],
      ['The IANA timezone database', 'The IANA timezone database (also called the tz database or zoneinfo) is maintained by the internet community and updated regularly. It contains timezone rules for every region, including historical changes. DatePilot uses your browser\'s built-in copy of this database.'],
      ['Date changes across time zones', 'Converting a late local time can move the result into the next (or previous) calendar day. For example, 23:00 in New York (UTC-5) is 04:00 the next day in London (UTC+0 during winter). This matters for deadlines, meetings, and travel schedules.'],
      ['Daylight-saving transitions', 'DST rules change local clock readings twice a year. In spring, clocks move forward (e.g., 2:00 AM becomes 3:00 AM), losing one hour. In autumn, clocks move back (e.g., 2:00 AM becomes 1:00 AM), gaining one hour. These transitions affect scheduling and elapsed-time calculations.'],
      ['Common pitfalls', 'Using a city\'s current offset for a date in another season. Forgetting that the calendar date can change. Not checking whether DST is active on the specific date. Assuming "GMT" and "UTC" are interchangeable in all contexts. Using fixed offsets instead of named zones for scheduling.'],
    ],
    toolSlugs: ['time-zone-converter', 'time-difference', 'utc-vs-gmt'],
  },
  'utc-vs-gmt': {
    answer: 'UTC (Coordinated Universal Time) is the modern time standard. GMT (Greenwich Mean Time) is a historical term often used informally to mean the same zero offset. For technical purposes, use UTC.',
    sections: [
      ['Definitions', 'UTC is the international standard for time, maintained by atomic clocks and coordinated internationally. GMT is the mean solar time at the Royal Observatory in Greenwich, London. In practice, UTC and GMT give the same time for civil purposes, but they are technically different concepts.'],
      ['When to use UTC', 'Use UTC for: software timestamps, data exchange between systems, scientific measurements, international scheduling where precision matters, and any context where ambiguity could cause problems. UTC is the correct identifier for the modern standard.'],
      ['When to use GMT', 'GMT is commonly used in: broadcast media, civil time references in the UK and some other countries, and informal conversations. Do not use "GMT" as a timezone identifier in software — use "Etc/UTC" or a named IANA zone instead.'],
      ['Offsets are not time zones', 'A fixed offset (like UTC+5) does not include daylight-saving rules or historical changes. A named timezone (like "Asia/Karachi") includes the full rule set. For scheduling, always use named zones, not fixed offsets.'],
      ['Practical example', 'When arranging an international meeting: (1) Record the named local timezone for each participant. (2) Convert to UTC for the reference instant. (3) Convert back to each participant\'s local time for the specific date. This avoids ambiguity during DST transitions.'],
    ],
    toolSlugs: ['time-zone-converter', 'time-difference', 'daylight-saving-time'],
  },
  'daylight-saving-time': {
    answer: 'Daylight-saving rules change local clock readings in many regions, typically twice a year. They can make a local hour repeat or disappear, even though time itself continues to move forward.',
    sections: [
      ['How DST transitions work', 'In spring ("spring forward"), clocks move forward by 1 hour, typically at 2:00 AM. The hour from 2:00-3:00 AM does not exist. In autumn ("fall back"), clocks move back by 1 hour, typically at 2:00 AM. The hour from 1:00-2:00 AM repeats. These transitions affect scheduling and elapsed time.'],
      ['Why DST exists', 'DST was originally introduced to make better use of daylight during summer months. By shifting clock readings, people can have more daylight in the evening during summer. Not all regions observe DST: most of the tropics do not, and some regions have abolished it.'],
      ['Impact on meetings', 'When scheduling recurring meetings across DST transitions, always use named timezones, not fixed offsets. A meeting at "10:00 New York time" will occur at different UTC times before and after the spring transition. The IANA timezone database handles this correctly.'],
      ['The "missing hour" problem', 'During the spring transition, the hour from 2:00-3:00 AM is skipped. A meeting scheduled for 2:30 AM during this transition either does not occur or moves to 3:30 AM, depending on the local rules. This is why scheduling around DST transitions requires care.'],
      ['The "repeated hour" problem', 'During the autumn transition, the hour from 1:00-2:00 AM occurs twice. A meeting at 1:30 AM during this period happens twice. Software that uses named timezones handles this correctly, but manual scheduling can cause confusion.'],
      ['Practical advice', 'Always use named timezones (e.g., "America/New_York") rather than fixed offsets (e.g., "UTC-5") for scheduling. Check the specific date of the event, not today\'s offset. Use the Time Zone Converter to verify conversions across DST boundaries.'],
    ],
    toolSlugs: ['time-zone-converter', 'time-difference', 'countdown'],
  },
  'date-time-formats': {
    answer: 'Unambiguous date and time formats prevent miscommunication. The key principle is: always include enough information that the reader cannot misinterpret the date or time.',
    sections: [
      ['Why format ambiguity is dangerous', '03/04/2026 can mean 3 April (European format) or March 4 (US format). 04/03/2026 can mean 4 March (European) or April 3 (US). This ambiguity can cause missed deadlines, incorrect bookings, and scheduling errors. The solution is to use an unambiguous format.'],
      ['ISO 8601: the safest format', 'ISO 8601 (YYYY-MM-DD) is unambiguous and sorts correctly. 2026-04-03 always means 3 April 2026, regardless of the reader\'s locale. Use ISO 8601 for: data exchange, filenames, databases, and any context where ambiguity could cause problems.'],
      ['Written months for human readability', 'For human-facing text, use written months: "3 April 2026" or "April 3, 2026." This removes ambiguity without requiring the reader to know ISO 8601. Avoid pure numeric formats (03/04/2026) in international contexts.'],
      ['Time format considerations', 'Use the 24-hour clock for precision: 14:30 is unambiguous, while 2:30 PM requires the reader to check AM/PM. Include the timezone for remote audiences: "14:30 UTC" or "14:30 Eastern Time." For international scheduling, always include the timezone abbreviation or offset.'],
      ['Choosing a format for your project', 'Pick one format and document it in your team\'s style guide. Use the same format consistently across all documents, calendars, and communications. For data, use ISO 8601. For human text, use written months with the 24-hour clock.'],
    ],
    toolSlugs: ['date-calculator', 'time-zone-converter', 'utc-vs-gmt', 'date-format-converter'],
  },
  'calendar-systems': {
    answer: 'A calendar system defines how dates are named and arranged. DatePilot uses the proleptic Gregorian calendar, which is the standard civil calendar used by most of the world today.',
    sections: [
      ['The Gregorian calendar', 'The Gregorian calendar uses variable month lengths (28-31 days) and a leap-year rule that adds February 29. It was introduced in 1582 by Pope Gregory XIII to correct the drift of the Julian calendar. Most countries adopted it within a few centuries.'],
      ['The leap-year rule', 'Years divisible by 4 are leap years, except for century years (divisible by 100), unless the century is also divisible by 400. This gives an average year length of 365.2425 days, which is very close to the tropical year (365.2422 days).'],
      ['Historical calendar adoption', 'Different countries adopted the Gregorian calendar at different times: Catholic countries in 1582, Britain in 1752, Russia in 1918, Greece in 1923. Before adoption, they used the Julian calendar, which had a simpler leap-year rule (every 4 years). This means historical dates may differ between calendar systems.'],
      ['The proleptic Gregorian calendar', 'DatePilot uses the proleptic Gregorian calendar, which extends the current calendar backward to cover historical dates. This means: 4 July 1776 is calculated using Gregorian rules, even though it was originally recorded under the Julian calendar in Britain. The result may differ from the historical record.'],
      ['Other calendar systems', 'Many cultures use other calendar systems: Islamic (Hijri), Hebrew, Chinese, Indian national, Persian, and others. These systems have different rules for month lengths, leap years, and epoch dates. DatePilot focuses on the Gregorian calendar, which is the most widely used civil calendar worldwide.'],
    ],
    toolSlugs: ['leap-year', 'day-of-week', 'date-calculator'],
  },
}
