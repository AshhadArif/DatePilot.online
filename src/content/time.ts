import type { ToolContent } from './types'

export const timeContent: Record<string, ToolContent> = {
  countdown: {
    answer: 'A countdown calculator shows how much time is left between now and a future date. Pick a target date and it returns the remaining days and hours, measured from your device clock.',
    intro: [
      'How many days until Christmas? How many days until my birthday? How many days until the exam? Countdown questions are among the most searched date questions on the web, and they all reduce to the same calculation: the gap between this moment and a target date.',
      'Set a target date and the calculator reports what remains in days and hours. The result depends on the current time, so it is a different number every time you check it — which is exactly what makes a countdown a countdown.',
    ],
    howTo: [
      'Choose the target date — the event you are counting down to.',
      'Select "Calculate result".',
      'Read the remaining time in days and hours.',
      'Check again later for an updated figure; the countdown is measured at the moment you press the button.',
    ],
    sections: [
      {
        heading: 'How Many Days Until...?',
        blocks: [
          { type: 'p', text: 'The most common countdown targets are holidays, birthdays, deadlines, and the start of something. The table below recalculates every time the page loads, so it always shows the current figure.' },
          { type: 'component', name: 'popular-countdowns' },
          { type: 'p', text: 'For any other date, use the calculator at the top of this page. If you only need whole calendar days rather than days and hours, the [Days Between Dates calculator](/calculators/days-between-dates) gives the same gap as a plain day count.' },
        ],
      },
      {
        heading: 'What Is a Countdown Calculator?',
        blocks: [
          { type: 'p', text: 'A countdown calculator measures the remaining duration between right now and a future moment. It is a live measurement rather than a fixed number: the same target gives a different answer each minute because the starting point — the current time — keeps moving.' },
          { type: 'p', text: 'That distinguishes it from a date calculation. "How many days until 1 January" measured on 1 December and the same question measured on 20 December have different answers, while "how many days between 1 December and 1 January" never changes. The first is a countdown; the second is a date difference.' },
        ],
      },
      {
        heading: 'How the Countdown Works',
        blocks: [
          { type: 'p', text: 'The calculator takes the target date, sets it to 17:00 local time on your device — the end of a typical working day — and subtracts the current device time from that moment. The remainder is displayed as whole days plus whole hours.' },
          { type: 'p', text: 'Three consequences follow from that design:' },
          {
            type: 'ul',
            items: [
              'The result depends on your device clock, so a device with an incorrect time shows an incorrect countdown.',
              'The target is 17:00 local to you, not midnight. A countdown reading "0 days, 3 hours" means three hours before 17:00 on the target date.',
              'The figure does not tick down on its own. Press "Calculate result" again to refresh it.',
            ],
          },
          { type: 'p', text: 'If you need the count to a precise time of day instead — a deadline at midnight, a launch at noon — count calendar days with the [Days Between Dates calculator](/calculators/days-between-dates) or compare exact moments with the [Time Difference Calculator](/time/time-difference).' },
        ],
      },
      {
        heading: 'Worked Example: Counting Down to a Target',
        blocks: [
          { type: 'p', text: 'Suppose the current time is 14:00 on 15 September 2026 and the target date is 1 January 2027. The target moment is 1 January 2027 at 17:00 local time.' },
          { type: 'p', text: 'From 14:00 on 15 September to 14:00 on 1 January is 108 days; from 14:00 to 17:00 on the target date adds 3 more hours. The countdown therefore shows 108 days and 3 hours remaining. Check the same target an hour later and it shows 108 days and 2 hours.' },
          { type: 'p', text: 'The day count itself can be verified with a date calculation: the gap from 15 September 2026 to 1 January 2027 is 108 days, because September contributes 15 remaining days, October 31, November 30, December 31, and 1 January 1.' },
        ],
      },
      {
        heading: 'Daylight Saving and Time Zone Effects on Countdowns',
        blocks: [
          { type: 'p', text: 'A countdown measures elapsed time, so clock changes matter. When daylight saving starts or ends, the local clock jumps forward or back by an hour, and the remaining time to the target shifts with it. The calculator works from timestamps rather than from clock labels, so it reports the true elapsed hours.' },
          { type: 'p', text: 'Time zones matter for the target itself. A countdown to a date measured against your local 17:00 is not the same moment as the same date measured in another country. If the event happens at a specific time in a specific place — a midnight release, a broadcast — convert that moment to your own zone first with the [Time Zone Converter](/time/time-zone-converter).' },
          { type: 'note', text: 'For critical deadlines, verify the result against the official time source for the relevant time zone rather than relying on a single device clock.' },
        ],
      },
      {
        heading: 'Countdowns and Whole Calendar Days',
        blocks: [
          { type: 'p', text: 'Countdown answers are often compared with calendar-day answers, and the two can differ. A countdown to 17:00 on the target date includes part of the target day, while an exclusive date difference stops at the previous midnight.' },
          { type: 'p', text: 'Use whole days when the question is "what date is it", "how many days are left", or "how many days since" — the [Days Calculator](/calculators/days-calculator) and [Days Between Dates](/calculators/days-between-dates) cover those. Use hours and minutes when the question is "how long until", which is what this tool answers. For the past-pointing version of the same live measurement — how long since a moment, ticking on screen — use the [Time Since Calculator](/time/time-since-calculator).' },
          { type: 'p', text: 'Countdowns to annual events restart themselves. Once a date has passed, choosing the same day and month in the following year starts a fresh countdown to the next occurrence — the tool does not remember whether you have counted down before. Events tied to a weekday rather than a fixed day and month behave differently: they move with the calendar, so the target date should be checked each year instead of assumed.' },
          { type: 'p', text: 'Counting down is also usually only half of the planning question. Once the target is set, the next steps are checking its weekday with the [Day of the Week calculator](/calendar/day-of-week) and counting the weekdays that remain with the [Working Days Calculator](/calculators/working-days), because a deadline that lands on a Saturday rarely behaves like one that lands midweek.' },
        ],
      },
      {
        heading: 'Common Countdown Mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              'Treating the displayed figure as fixed. It changes continuously; recalculate when you need an update.',
              'Assuming the countdown reaches zero at midnight. It reaches zero at 17:00 local on the target date.',
              'Forgetting the time zone of the event itself, especially for deadlines that are defined in another country.',
              'Trusting a device clock that is not synchronized.',
              'Mixing up "days until" with an inclusive day count, which differs by one.',
            ],
          },
        ],
      },
    ],
    guideSlugs: ['time-zones', 'daylight-saving-time', 'date-calculations'],
    related: ['time-since-calculator', 'days-between-dates', 'time-difference', 'days-calculator'],
    faqs: [
      ['How do I count the days until a date?', 'Choose the target date and press "Calculate result". The answer is given in days and hours from the current moment. For a plain calendar-day count, use the [Days Between Dates calculator](/calculators/days-between-dates).'],
      ['Does the countdown update automatically?', 'No. The result is measured when you press the button. Press it again whenever you want a refreshed figure.'],
      ['Why does the countdown reach zero in the afternoon?', 'The target moment is 17:00 local time on the chosen date, not midnight. The countdown ends at the end of a typical working day on that date.'],
      ['How does daylight saving affect a countdown?', 'A clock change moves the local clock by an hour, so the elapsed time to the target shifts accordingly. The calculation uses timestamps, so the reported hours remain accurate.'],
      ['Is a countdown the same as a day difference?', 'No. A countdown is a live duration measured from now, while a day difference is the fixed gap between two dates. The countdown changes every minute; the date difference does not.'],
    ],
  },

  'time-difference': {
    answer: 'A time difference calculator measures the duration between two date and times. Enter two moments and it returns the elapsed time in hours and minutes, in either direction.',
    intro: [
      'The time difference between two clocks is one of the most common time questions: how long between two shifts, how many hours between two meetings, how much time is left on a timer, what is the duration between two timestamps. It is also the calculation that gets miscounted most often, because it has to cross hour, day, and sometimes year boundaries without losing or duplicating an hour.',
      'Enter two date-and-time values and this calculator returns the elapsed time in hours and minutes. The answer is always positive, and the tool tells you when the first input is the later of the two.',
    ],
    howTo: [
      'Enter the first date and time.',
      'Enter the second date and time.',
      'Select "Calculate result".',
      'Read the duration in hours and minutes. If the result says the first value is later, the second input was the earlier moment.',
      'For differences between named time zones rather than two moments, use the [Time Zone Converter](/time/time-zone-converter).',
    ],
    sections: [
      {
        heading: 'What Is a Time Difference?',
        blocks: [
          { type: 'p', text: 'A time difference is the elapsed duration between two instants: the number of hours and minutes you would count on a clock if you started at the first moment and stopped at the second. It is a measurement of time, not of dates — although the dates are what make the measurement non-trivial when the interval runs past midnight.' },
          { type: 'p', text: 'The same quantity is called a time gap, a duration between two times, or simply the difference between two times. All of them describe one number: how much time separates the two moments.' },
        ],
      },
      {
        heading: 'How to Calculate Time Between Two Times',
        blocks: [
          {
            type: 'ol',
            items: [
              'Convert both moments to the same measure — hours and minutes since an agreed starting point.',
              'Subtract the earlier moment from the later one.',
              'Convert the result back into hours and minutes.',
              'If the interval crosses midnight, add 24 hours rather than arriving at a negative figure.',
            ],
          },
          { type: 'p', text: 'The manual version fails most often at the midnight step. From 22:00 to 06:30 the next day the elapsed time is 8 hours and 30 minutes, not minus 15 hours 30 minutes. The calculator handles the crossing by working with the full date and time, not just the clock labels.' },
          { type: 'p', text: 'Doing it by hand is easy for short, same-day intervals: subtract the start hours and minutes from the end hours and minutes, borrowing 60 minutes if the minutes would go negative. Anything longer than a day is easier to count as full days plus the remaining hours.' },
        ],
      },
      {
        heading: 'How Elapsed Duration Is Calculated',
        blocks: [
          { type: 'p', text: 'Each input is interpreted as a moment in time, and the two are compared as timestamps. The absolute difference in minutes is then divided into whole hours and the leftover minutes, so the result is always reported as "X hours, Y minutes".' },
          { type: 'p', text: 'Because the calculation runs on real timestamps, a daylight saving transition inside the interval is counted correctly: the hour that the clocks skip or repeat appears exactly once in the elapsed time.' },
          { type: 'note', text: 'The result is reported in hours and minutes rather than converted into days. A week-long interval therefore shows as 168 hours, and a 30-day interval as 720 hours.' },
        ],
      },
      {
        heading: 'Worked Example: Comparing Two Date-Times',
        blocks: [
          {
            type: 'table',
            headers: ['First value', 'Second value', 'Difference'],
            rows: [
              ['15 January 2026, 09:00', '15 January 2026, 17:00', '8 hours, 0 minutes'],
              ['15 January 2026, 09:00', '15 January 2026, 17:30', '8 hours, 30 minutes'],
              ['15 January 2026, 22:00', '16 January 2026, 06:30', '8 hours, 30 minutes'],
              ['15 January 2026, 09:00', '22 January 2026, 09:00', '168 hours, 0 minutes'],
            ],
          },
          { type: 'p', text: 'Rows two and three have the same duration despite one crossing midnight, which is exactly the check people get wrong by hand. The last row shows a full week expressed in hours rather than days.' },
        ],
      },
      {
        heading: 'Time Difference vs. Time Zone Difference',
        blocks: [
          { type: 'p', text: 'These two are easily confused. A time difference is a duration between two moments. A time zone difference is the offset between two places — a fixed number of hours that describes where their clocks stand relative to each other.' },
          { type: 'p', text: 'Both matter when you are comparing times across places. A meeting at 09:00 in one city and 14:00 in another has a duration of 5 hours if they happen on the same day, but the gap between the two local clocks is what tells you whether that is a 5-hour time zone offset — and daylight saving can change it.' },
          { type: 'p', text: 'To translate a time from one named zone to another, use the [Time Zone Converter](/time/time-zone-converter). The rules behind zone names and offsets are explained in [Time Zones explained](/guides/time-zones).' },
        ],
      },
      {
        heading: 'Daylight Saving Time and Duration',
        blocks: [
          { type: 'p', text: 'Daylight saving moves local clocks forward by an hour in spring and back by an hour in autumn. The elapsed time between two moments does not change — an hour is still an hour — but the clock labels on either side of the interval shift.' },
          { type: 'p', text: 'That means a duration that "should" be 8 hours can show a different wall-clock difference around a transition. Because this calculator measures timestamps rather than subtracting clock labels, it reports the true elapsed duration.' },
          { type: 'p', text: 'Dates when the clocks change differ by country, and many places do not observe daylight saving at all. Check [Daylight Saving Time explained](/guides/daylight-saving-time) before assuming a transition applies.' },
        ],
      },
      {
        heading: 'Common Mistakes When Comparing Times',
        blocks: [
          {
            type: 'ul',
            items: [
              'Subtracting clock labels without adding 24 hours when the interval crosses midnight.',
              'Ignoring that the times belong to different dates, not just different hours.',
              'Confusing a duration with a time zone offset.',
              'Assuming both times are in the same zone when one is local and the other was taken from a schedule in another country.',
              'Forgetting that a long duration is reported in hours, so a week reads as 168 hours.',
            ],
          },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Total a shift with breaks using the [Work Hours Calculator](/time/work-hours-calculator), measure how long since a past moment with the [Time Since Calculator](/time/time-since-calculator), convert between zones with the [Time Zone Converter](/time/time-zone-converter), count calendar days with [Days Between Dates](/calculators/days-between-dates), and see remaining time to an event with the [Countdown Calculator](/time/countdown).' },
        ],
      },
    ],
    guideSlugs: ['time-zones', 'daylight-saving-time', 'date-time-formats'],
    related: ['work-hours-calculator', 'time-since-calculator', 'countdown', 'time-zone-converter'],
    faqs: [
      ['How do I calculate the time between two times?', 'Convert both moments to a common measure, subtract the earlier from the later, and add 24 hours if the interval crosses midnight. The calculator does this for you and returns the answer in hours and minutes.'],
      ['Does the calculator count in days as well as hours?', 'No. The result is reported as hours and minutes, so a week shows as 168 hours. For day counts use the [Days Between Dates calculator](/calculators/days-between-dates).'],
      ['What happens when the interval crosses midnight?', 'The date part of each value is taken into account, so an interval from 22:00 to 06:30 the next day correctly returns 8 hours and 30 minutes.'],
      ['Does daylight saving change the answer?', 'The elapsed duration between two real moments is unaffected by clock changes, and the calculation works from timestamps. The clock labels on either side may shift by an hour around a transition.'],
      ['What if the first value is later than the second?', 'The result is still reported as a positive duration, with a note that the first value is the later moment.'],
    ],
  },

  'time-zone-converter': {
    answer: 'A time zone converter translates a date and time from one named zone to another using each zone\'s UTC offset and daylight saving rules. Enter a local time, choose the source and destination zones, and read the converted time.',
    intro: [
      'Time zone conversion is the everyday problem of scheduling across borders: what time is the call in my zone, when does the release go live, what date does the flight land. The arithmetic is a simple offset, but real time zones are not simple offsets — they shift with daylight saving, several share the same abbreviation, and some differ from UTC by 30 or 45 minutes rather than a whole hour.',
      'Enter the local date and time, then choose where it is happening and where you want it expressed. The converter applies the correct offset for those specific dates, including any daylight saving rule in force at the time.',
    ],
    howTo: [
      'Enter the date and time as it is written in the source zone.',
      'Choose the source zone — the zone the time belongs to.',
      'Choose the destination zone — the zone you want the answer in.',
      'Select "Calculate result".',
      'Check the date as well as the time: a conversion can cross midnight into the next or previous day.',
    ],
    sections: [
      {
        heading: 'What Is a Time Zone Converter?',
        blocks: [
          { type: 'p', text: 'A time zone converter takes a moment expressed in one zone and restates it in another. The underlying rule is fixed: every zone is described by its offset from Coordinated Universal Time, and converting means moving to UTC and then out to the destination offset.' },
          { type: 'p', text: 'What makes it more than addition is that offsets are not constant. Zones observe daylight saving rules that change the offset twice a year, and different zones switch on different dates — so the correct offset depends on the date you are converting, not just on the zone name.' },
        ],
      },
      {
        heading: 'How Named Zones Differ From UTC Offsets',
        blocks: [
          { type: 'p', text: 'A UTC offset is a fixed number of hours from UTC: UTC+0, UTC−5, UTC+5:30. A named zone is an identifier such as America/New_York or Europe/London that carries a history of offsets and a rule for future ones.' },
          {
            type: 'table',
            headers: ['Zone', 'Offset in winter', 'Offset in summer', 'Notes'],
            rows: [
              ['UTC', '+00:00', '+00:00', 'Reference point for all conversions'],
              ['Europe/London', '+00:00', '+01:00', 'British Summer Time runs late March to late October'],
              ['America/New_York', '−05:00', '−04:00', 'Eastern time, DST from March to November'],
              ['Asia/Kolkata', '+05:30', '+05:30', 'No daylight saving; half-hour offset'],
              ['Australia/Sydney', '+10:00', '+11:00', 'Southern hemisphere: summer offsets apply in December'],
            ],
          },
          { type: 'p', text: 'Because of this, abbreviations are unreliable. "EST" is often used for a zone that is actually on Eastern Daylight Time in summer, and several zones share the same three letters. Named zones remove the ambiguity, which is why the converter uses them.' },
        ],
      },
      {
        heading: 'How to Convert Time Between Zones',
        blocks: [
          {
            type: 'ol',
            items: [
              'Identify the named zone the original time belongs to.',
              'Find its offset on that specific date, including whether daylight saving is in effect.',
              'Move the time to UTC by applying that offset.',
              'Apply the destination zone\'s offset for the same date to get the converted time.',
              'Check whether the result has crossed midnight.',
            ],
          },
          { type: 'p', text: 'The calculator performs all five steps. The manual version usually goes wrong at step 2, because people quote the wrong half of the year, and at step 5, because the date change is easy to overlook.' },
        ],
      },
      {
        heading: 'Worked Example: Converting Between New York and London',
        blocks: [
          { type: 'p', text: 'A meeting is scheduled for 09:00 on 20 January 2026 in New York, and you are in London. In January New York is on Eastern Standard Time (UTC−5) and London is on Greenwich Mean Time (UTC+0), a difference of 5 hours, so the meeting is at 14:00 London time on the same date.' },
          { type: 'p', text: 'The same 09:00 meeting on 20 July 2026 is still 14:00 in London — but only because both zones have moved their clocks forward by an hour. Take London against a zone that does not observe daylight saving, such as Kolkata (UTC+5:30), and the offset changes with the season: 09:00 GMT is 14:30 in Kolkata, while 09:00 BST is 13:30 in Kolkata.' },
          { type: 'p', text: 'This is why a fixed offset copied from a table is only correct for part of the year.' },
        ],
      },
      {
        heading: 'When the Calendar Date Changes',
        blocks: [
          { type: 'p', text: 'A conversion often crosses midnight. 22:00 in New York on 20 January is 03:00 in London on 21 January — the same instant, but a different date on the calendar.' },
          { type: 'p', text: 'Any time difference of more than a few hours can move the date, and the direction depends on which way you are converting. Moving east makes the local time later, so late-evening times push into the next day; moving west makes it earlier, so early-morning times can fall back into the previous day.' },
          { type: 'p', text: 'Always read the date in a conversion result. For a countdown or deadline defined in another zone, convert the event moment first and then compare dates with the [Days Between Dates calculator](/calculators/days-between-dates).' },
        ],
      },
      {
        heading: 'Why DST Rules Matter for Scheduling',
        blocks: [
          { type: 'p', text: 'Daylight saving does not switch everywhere at once. North America and Europe change on different weekends, much of Asia and Africa never change at all, and the southern hemisphere changes in the opposite half of the year. For two or three weeks a year the offsets between zones are unusual, and a meeting time that worked last month can be an hour out.' },
          { type: 'p', text: 'Converting the actual date rather than assuming a standing offset avoids this entirely. The converter evaluates the rule for the date you enter, so a date inside a transition window is handled correctly.' },
          { type: 'p', text: 'The background to these rules, including why some countries abandoned the practice, is covered in [Daylight Saving Time](/guides/daylight-saving-time).' },
        ],
      },
      {
        heading: 'UTC and GMT: What Is the Difference?',
        blocks: [
          { type: 'p', text: 'UTC (Coordinated Universal Time) is the international time standard that the world\'s clocks are set against. GMT (Greenwich Mean Time) is the historic zone based on the prime meridian at Greenwich, and in modern usage it is effectively UTC+0 with no daylight saving.' },
          { type: 'p', text: 'In practice the two are interchangeable as a reference for offsets: converting through UTC is the same as converting through GMT for zones that do not change their clocks. Where they differ is that GMT is a zone with seasonal rules for the places that use it, while UTC is a standard that never changes.' },
          { type: 'p', text: 'Any zone conversion can be written as two steps through UTC — source to UTC, UTC to destination — which is exactly how this calculator works. The full comparison is set out in [UTC vs GMT](/guides/utc-vs-gmt).' },
        ],
      },
      {
        heading: 'Common Time Zone Conversion Mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              'Using a fixed offset year-round and forgetting daylight saving.',
              'Relying on abbreviations such as EST or BST, which are ambiguous and shared across zones.',
              'Converting the time but not the date, then missing a midnight crossing.',
              'Assuming every zone is a whole number of hours from UTC — India is UTC+5:30, Nepal UTC+5:45.',
              'Forgetting that both zones may change their clocks, so the difference between them can change twice a year.',
            ],
          },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Measure the duration between two moments with the [Time Difference Calculator](/time/time-difference), count the days between dates with [Days Between Dates](/calculators/days-between-dates), and see how long is left with the [Countdown Calculator](/time/countdown).' },
        ],
      },
    ],
    guideSlugs: ['time-zones', 'utc-vs-gmt', 'daylight-saving-time'],
    related: ['time-difference', 'countdown', 'days-between-dates', 'day-of-week'],
    faqs: [
      ['How do I convert a time to another time zone?', 'Enter the date and time as written in the source zone, select the source and destination zones, and calculate. The converter applies each zone\'s offset for that specific date, including daylight saving.'],
      ['What is the difference between UTC and GMT?', 'UTC is the international time standard and never changes. GMT is the historic Greenwich zone, effectively UTC+0 but subject to seasonal rules in the places that use it. As a reference for conversions they behave the same way.'],
      ['Why can a converted time fall on a different date?', 'Zones can differ by several hours, so a late-evening time converted east crosses midnight into the next day, and an early-morning time converted west can fall into the previous day.'],
      ['Does daylight saving affect the conversion?', 'Yes. The offset for a zone changes when its clocks move, and zones change on different dates. The converter evaluates the rule for the date you enter rather than assuming a fixed offset.'],
      ['Why is my zone not a whole number of hours from UTC?', 'Some zones are offset by 30 or 45 minutes — India is UTC+5:30, for example. Named zones handle this correctly, which is why abbreviations and rough offsets should not be used for conversion.'],
    ],
  },

  'time-since-calculator': {
    answer: 'A time since calculator shows how much time has passed from a past date and time until now, updating every second. It reports the elapsed time in calendar years, months, and days, plus total days, hours, minutes, and seconds.',
    intro: [
      '"How long has it been since..." is one of the most natural time questions there is — since a birthday, since an event, since a project started, since a date that matters. The answer is not fixed: it grows by the second, which is why a live measurement beats a static number.',
      'Enter a date and time in the past and this calculator keeps counting for you. The first line breaks the span into calendar years, months, and days — the way people say it. The second line gives the raw elapsed time down to the second — the way stopwatches say it. Both refresh every second while the page is open.',
    ],
    howTo: [
      'Enter the past date and time you want to measure from.',
      'Results appear immediately — there is no calculate button to press.',
      'Read the calendar line (years, months, days) for the human-readable span.',
      'Read the total line (days, hours, minutes, seconds) for the precise elapsed time.',
      'The bottom line confirms the exact start moment being measured from.',
      'Press "Reset" to return the input to the start of today.',
    ],
    sections: [
      {
        heading: 'What Is a Time Since Calculator?',
        blocks: [
          { type: 'p', text: 'A time since calculator measures elapsed time from a past moment to right now. It is the past-facing twin of the countdown: a countdown looks forward to a target, a time-since looks backward to an anchor. Both are live measurements — leave the page open and the numbers keep moving.' },
          { type: 'p', text: 'The tool reports the answer in two forms because one span genuinely has two descriptions. "Three years since we started" describes anniversaries; "1,096 days, 4 hours, 12 minutes" describes clock time. Neither replaces the other, so the calculator shows both.' },
        ],
      },
      {
        heading: 'Time Since vs Days Between vs Time Difference',
        blocks: [
          {
            type: 'table',
            headers: ['Question', 'Tool', 'Updates live?'],
            rows: [
              ['How long since this moment (down to the second)?', 'Time Since Calculator', 'Yes, every second'],
              ['How many calendar days between these two dates?', 'Days Between Dates', 'No — fixed dates'],
              ['How many hours and minutes between two fixed moments?', 'Time Difference Calculator', 'No — fixed moments'],
              ['How long until a future date?', 'Countdown Calculator', 'Recalculate on press'],
            ],
          },
          { type: 'p', text: 'The rule of thumb: if one end of your question is "right now", this is the page. If both ends are fixed dates, use [Days Between Dates](/calculators/days-between-dates); if both ends are fixed date-and-times and you only need hours and minutes, use the [Time Difference Calculator](/time/time-difference).' },
        ],
      },
      {
        heading: 'How the Time Since Calculator Works',
        blocks: [
          { type: 'p', text: 'The calculator takes the moment you entered and subtracts it from the current device clock. The raw difference is decomposed into days, hours, minutes, and seconds for the total line. In parallel it walks the calendar from the start date to today — counting completed years to each anniversary, then months, then leftover days — for the calendar line. The clock refreshes once a second.' },
          { type: 'p', text: 'Because it reads your device clock, an unsynchronized device shows an unsynchronized answer. Nothing is sent anywhere: the calculation runs entirely in your browser, exactly like every other DatePilot tool.' },
          { type: 'note', text: 'Enter a moment in the future and the calculator says so instead of showing a negative count — elapsed time only runs one way.' },
        ],
      },
      {
        heading: 'Worked Example: Time Since Three Different Starts',
        blocks: [
          { type: 'p', text: 'Read at 1 October 2026, 10:30 local time:' },
          {
            type: 'table',
            headers: ['Time since', 'Calendar line', 'Total line'],
            rows: [
              ['1 January 2020, 00:00', '6 years, 9 months, 0 days', '2,465 days, 10 hours, 30 minutes'],
              ['1 October 2016, 00:00', '10 years, 0 months, 0 days', '3,652 days, 10 hours, 30 minutes'],
              ['1 September 2026, 00:00', '0 years, 1 month, 0 days', '30 days, 10 hours, 30 minutes'],
            ],
          },
          { type: 'p', text: 'The middle row is the leap-day check: ten calendar years containing 3,652 days, two more than 10 × 365, because 2020 and 2024 were leap years. The third row shows how a short span still gets a full calendar description — one month crossed on 1 October, plus the days since.' },
        ],
      },
      {
        heading: 'Why the Two Lines Can Disagree',
        blocks: [
          { type: 'p', text: 'The calendar line counts whole calendar dates; the total line counts raw clock time. When the start time is late in the day, the two views genuinely differ. Start at 18:00 on 30 September and read the result at 10:30 on 1 October: the calendar line reports 1 day (30 September to 1 October is one calendar date apart), while the total line reports 16 hours 30 minutes — not yet a full 24 hours.' },
          { type: 'p', text: 'Neither is wrong. The calendar line answers "which dates have we passed"; the total line answers "how much time has ticked by". Use anniversaries when you are thinking in birthdays and deadlines, and the raw total when you are thinking in durations.' },
        ],
      },
      {
        heading: 'Common Mistakes When Measuring Time Since',
        blocks: [
          {
            type: 'ul',
            items: [
              'Dividing total days by 365 to get years — leap days and the day-of-anniversary rule make that answer wrong.',
              'Comparing a live "time since" figure with a fixed date-difference figure; they are measured from different anchors.',
              'Forgetting the time of day — "since 1 January" means something different at 00:00 and at 23:59.',
              'Trusting a device clock that is not synchronized.',
              'Using a countdown for a past moment, or this tool for a future one — direction matters.',
            ],
          },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Count forward to an event with the [Countdown Calculator](/time/countdown), measure two fixed moments with the [Time Difference Calculator](/time/time-difference), count calendar days with [Days Between Dates](/calculators/days-between-dates), and read how date arithmetic works in [How Date Calculations Work](/guides/date-calculations).' },
        ],
      },
    ],
    guideSlugs: ['days-between-dates', 'date-calculations', 'date-time-formats'],
    related: ['countdown', 'time-difference', 'days-between-dates', 'age-calculator'],
    faqs: [
      ['Does the result update on its own?', 'Yes. The elapsed time refreshes every second while the page is open, measured from your device clock. Press "Reset" to return the input to the start of today.'],
      ['What does the calendar line mean?', 'It counts completed years, months, and days from the start date to today using calendar anniversaries — the same rule the Age Calculator uses. The total line below it counts raw elapsed days, hours, minutes, and seconds.'],
      ['Why do the two lines sometimes disagree?', 'The calendar line counts whole calendar dates crossed; the total line counts clock time. If the start time is late in the day, one calendar date may have passed without 24 hours having elapsed.'],
      ['Can I measure time until a future date?', 'No — that is a countdown. Use the [Countdown Calculator](/time/countdown) for future targets; it reports the time remaining instead of time passed.'],
      ['Does it count leap days?', 'Yes. The total line counts every elapsed day, including 29 February, and the calendar line counts anniversaries rather than dividing by 365.'],
    ],
  },

  'work-hours-calculator': {
    answer: 'A work hours calculator totals a shift from clock-in and clock-out times, subtracts an unpaid break, and reports hours worked in hours and minutes and as a decimal for timesheets. Overnight shifts that pass midnight are handled automatically.',
    intro: [
      'Every timesheet starts with the same three numbers: when the shift started, when it ended, and how long the unpaid break was. From those three, the hours actually worked fall out — but only if the arithmetic survives lunch breaks, shifts that cross midnight, and the decimal format payroll systems expect.',
      'Enter the clock-in time, the clock-out time, and the break length. The calculator returns the net hours in hours and minutes for people and in decimal form for spreadsheets, and it tells you whether the shift ran overnight.',
    ],
    howTo: [
      'Enter the clock-in time (for example 09:00).',
      'Enter the clock-out time (for example 17:00).',
      'Enter the unpaid break in minutes — use 0 when the break is paid.',
      'Select "Calculate result".',
      'Read the net hours worked on the first line and the decimal figure in brackets.',
      'The second line shows the gross shift length, the break deducted, and whether the shift ran overnight.',
    ],
    sections: [
      {
        heading: 'What Is a Work Hours Calculator?',
        blocks: [
          { type: 'p', text: 'A work hours calculator converts clock-in and clock-out times into hours actually worked. It answers the question every hourly worker, freelancer, and manager asks at the end of a shift: how many hours do I put on the timesheet? The answer is the shift length minus any unpaid break, expressed both as hours and minutes and as a decimal number.' },
          { type: 'p', text: 'It is deliberately narrower than a full payroll system. No hourly rates, no overtime thresholds, no tax — just the time arithmetic, done correctly, so the number you carry into those other calculations is right.' },
        ],
      },
      {
        heading: 'The Work Hours Formula',
        blocks: [
          { type: 'p', text: 'The whole calculation is one line:' },
          { type: 'p', text: 'Hours worked = (clock out − clock in) − unpaid break' },
          { type: 'p', text: 'Subtract the clock-in time from the clock-out time to get the gross shift length, then take off the break. If the clock-out is earlier than the clock-in, the shift crossed midnight: add 24 hours before subtracting, which is exactly what the calculator does.' },
          {
            type: 'table',
            headers: ['Clock in', 'Clock out', 'Break', 'Gross', 'Worked'],
            rows: [
              ['09:00', '17:00', '0 min', '8h 00m', '8h 00m (8.00)'],
              ['09:00', '17:00', '30 min', '8h 00m', '7h 30m (7.50)'],
              ['08:30', '17:45', '45 min', '9h 15m', '8h 30m (8.50)'],
              ['22:00', '06:00', '0 min', '8h 00m', '8h 00m (8.00) overnight'],
            ],
          },
        ],
      },
      {
        heading: 'How to Calculate Work Hours by Hand',
        blocks: [
          {
            type: 'ol',
            items: [
              'Write both times in 24-hour format (5:30 PM becomes 17:30).',
              'Subtract the clock-in time from the clock-out time, borrowing 60 minutes if the minutes would go negative.',
              'If the result is negative, the shift crossed midnight — add 24 hours.',
              'Subtract the unpaid break in minutes.',
              'Convert to decimal by dividing the minutes by 60 for timesheet entry.',
            ],
          },
          { type: 'p', text: 'The manual version fails most often at step 3 — a 22:00 to 06:00 shift looks like minus 16 hours until you remember it runs into the next day — and at step 4, when a lunch break is remembered after the timesheet is filled in.' },
        ],
      },
      {
        heading: 'Work Hours Examples',
        blocks: [
          {
            type: 'table',
            headers: ['Scenario', 'Inputs', 'Result'],
            rows: [
              ['Standard 9-to-5, unpaid lunch', '09:00–17:00, 30 min break', '7 hours 30 minutes (7.50)'],
              ['9-to-5, paid break', '09:00–17:00, 0 min break', '8 hours 0 minutes (8.00)'],
              ['Early finish with long break', '08:30–17:45, 45 min break', '8 hours 30 minutes (8.50)'],
              ['Night shift across midnight', '22:00–06:00, 0 min break', '8 hours 0 minutes (8.00)'],
              ['Short evening block', '19:25–19:45, 0 min break', '0 hours 20 minutes (0.33)'],
            ],
          },
          { type: 'p', text: 'The 9-to-5 comparison is the one people meet most often: without a break the shift is a clean 8 hours; with a 30-minute unpaid lunch it is 7.50 — the difference between an 8-hour and a 7.5-hour timesheet entry from the same clock times.' },
          { type: 'note', text: 'The calculator rejects a break that is longer than the shift and times where the clock-in equals the clock-out, because both cases usually mean a mistyped time rather than a real schedule.' },
        ],
      },
      {
        heading: 'Overnight Shifts',
        blocks: [
          { type: 'p', text: 'When the clock-out time is numerically earlier than the clock-in time, the shift belongs to the next day: 22:00 to 06:00 is a standard 8-hour night shift, not a negative duration. The calculator adds the missing 24 hours automatically and flags the result as overnight.' },
          { type: 'p', text: 'A midnight crossing also changes the date on a timesheet. If your records include dates as well as times, remember that a shift started on Friday at 22:00 and ended on Saturday at 06:00 belongs to Friday\'s shift for reporting purposes, even though the clock-out fell on Saturday.' },
        ],
      },
      {
        heading: 'Decimal Hours for Timesheets',
        blocks: [
          { type: 'p', text: 'Spreadsheets and payroll systems usually want decimal hours rather than hours and minutes: 7 hours 30 minutes becomes 7.50, 8 hours 30 minutes becomes 8.50, and 20 minutes becomes 0.33. The conversion is minutes ÷ 60 — 30 ÷ 60 = 0.5, 45 ÷ 60 = 0.75.' },
          { type: 'p', text: 'Decimal hours add cleanly, which is why they are the payroll standard: five shifts of 7.50 total 37.50 hours, a figure you can multiply by a rate directly. Rounded to two decimal places, the calculator\'s decimal figure matches the format most timesheet columns expect.' },
        ],
      },
      {
        heading: 'Paid and Unpaid Breaks',
        blocks: [
          { type: 'p', text: 'Only subtract breaks that are genuinely unpaid. Many jurisdictions require short rest breaks (typically 5 to 20 minutes) to be paid, while meal breaks of 30 minutes or more are commonly unpaid — but the rules differ by country, state, and contract. Enter the break your employer actually deducts, not the break you technically take.' },
          { type: 'p', text: 'If every break at your workplace is paid, enter 0 and the calculator returns the full gross shift. The break field exists for the schedules that do deduct, which is where manual timesheets most often go wrong.' },
          { type: 'note', text: 'DatePilot applies no overtime rules, pay rates, or rounding policies — it reports raw hours only. Your employment contract or local law decides everything beyond that.' },
        ],
      },
      {
        heading: 'Work Hours vs Time Difference',
        blocks: [
          { type: 'p', text: 'Both tools measure time, with different jobs. The [Time Difference Calculator](/time/time-difference) compares two full date-and-time values — useful when the moments sit on different days or weeks — and reports hours and minutes only. The Work Hours Calculator is built for a single shift: clock times, a break deduction, decimal output, and an overnight flag.' },
          { type: 'p', text: 'If your question includes a break or a decimal figure, this is the right tool. If it spans multiple days and needs no break logic, use time difference; if it spans multiple days of work rather than clock time, count the weekdays with the [Working Days Calculator](/calculators/working-days).' },
        ],
      },
      {
        heading: 'Common Work Hours Mistakes',
        blocks: [
          {
            type: 'ul',
            items: [
              'Forgetting to subtract the unpaid lunch, inflating the timesheet by 30 minutes a day.',
              'Treating an overnight shift as a negative duration instead of adding 24 hours.',
              'Rounding 7.5 hours up to 8 on a timesheet that expects exact decimals.',
              'Subtracting a paid break that payroll does not actually deduct.',
              'Using clock-time subtraction across two different dates without noting which shift the hours belong to.',
            ],
          },
        ],
      },
      {
        heading: 'Related Tools',
        blocks: [
          { type: 'p', text: 'Compare two full moments with the [Time Difference Calculator](/time/time-difference), count the weekdays in a date range with the [Working Days Calculator](/calculators/working-days), and convert a meeting time across zones with the [Time Zone Converter](/time/time-zone-converter).' },
        ],
      },
    ],
    guideSlugs: ['date-time-formats', 'working-days', 'date-calculations'],
    related: ['time-difference', 'working-days', 'countdown', 'time-zone-converter'],
    faqs: [
      ['How many hours is a 9-to-5 job?', 'Eight hours if every minute is paid. With a standard 30-minute unpaid lunch break it is 7 hours 30 minutes (7.50 decimal); with an unpaid 60-minute break it is 7 hours.'],
      ['What happens if I finish earlier than I started?', 'The calculator treats it as an overnight shift: it adds 24 hours and reports the true length. A 22:00 to 06:00 shift is 8 hours, flagged as overnight.'],
      ['What are decimal hours?', 'Hours expressed as a decimal number of hours: 7 hours 30 minutes = 7.50, 8 hours 15 minutes = 8.25. Divide the minutes by 60 to convert. Timesheets and payroll systems prefer this format because the values add directly.'],
      ['Why does the calculator reject my times?', 'It reports an error when the clock-in equals the clock-out (usually a typo) or when the break is as long as or longer than the shift itself. Re-enter the times and calculate again.'],
      ['Does it calculate overtime or pay?', 'No. It reports hours worked only — no rates, overtime thresholds, or rounding rules. Apply your contract\'s rules to the raw hours it returns.'],
    ],
  },
}
