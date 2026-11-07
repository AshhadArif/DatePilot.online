import type { GuideContent } from '../types'
import { content as dateCalculations } from './date-calculations'
import { content as howToCalculateAge } from './how-to-calculate-age'
import { content as daysBetweenDates } from './days-between-dates'
import { content as addSubtractDays } from './add-subtract-days'
import { content as workingDays } from './working-days'
import { content as leapYears } from './leap-years'
import { content as weekNumbers } from './week-numbers'
import { content as isoWeekDate } from './iso-week-date'
import { content as dayOfWeek } from './day-of-week'
import { content as timeZones } from './time-zones'
import { content as utcVsGmt } from './utc-vs-gmt'
import { content as daylightSavingTime } from './daylight-saving-time'
import { content as dateTimeFormats } from './date-time-formats'
import { content as calendarSystems } from './calendar-systems'
import { content as leapSeconds } from './leap-seconds'
import { content as unixTime } from './unix-time'
import { content as weekNumberingSystems } from './week-numbering-systems'

export const guideContent: Record<string, GuideContent> = {
  'date-calculations': dateCalculations,
  'how-to-calculate-age': howToCalculateAge,
  'days-between-dates': daysBetweenDates,
  'add-subtract-days': addSubtractDays,
  'working-days': workingDays,
  'leap-years': leapYears,
  'week-numbers': weekNumbers,
  'iso-week-date': isoWeekDate,
  'day-of-week': dayOfWeek,
  'time-zones': timeZones,
  'utc-vs-gmt': utcVsGmt,
  'daylight-saving-time': daylightSavingTime,
  'date-time-formats': dateTimeFormats,
  'calendar-systems': calendarSystems,
  'leap-seconds': leapSeconds,
  'unix-time': unixTime,
  'week-numbering-systems': weekNumberingSystems,
}
