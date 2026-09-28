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
          { type: 'p', text: 'Use whole days when the question is "what date is it", "how many days are left", or "how many days since" — the [Days Calculator](/calculators/days-calculator) and [Days Between Dates](/calculators/days-between-dates) cover those. Use hours and minutes when the question is "how long until", which is what this tool answers.' },
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
    related: ['days-between-dates', 'time-difference', 'days-calculator', 'time-zone-converter'],
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
          { type: 'p', text: 'Convert between zones with the [Time Zone Converter](/time/time-zone-converter), count calendar days with [Days Between Dates](/calculators/days-between-dates), and see remaining time to an event with the [Countdown Calculator](/time/countdown).' },
        ],
      },
    ],
    guideSlugs: ['time-zones', 'daylight-saving-time', 'date-time-formats'],
    related: ['time-zone-converter', 'countdown', 'days-between-dates', 'day-of-week'],
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
}
