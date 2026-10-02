export const today = () => new Date().toISOString().slice(0, 10)
export const localDate = (value: string) => new Date(`${value}T00:00:00`)
export const prettyDate = (date: Date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
export const weekday = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'long' })
export const shiftDays = (date: Date, count: number) => { const result = new Date(date); result.setDate(result.getDate() + count); return result }
export const dayGap = (a: Date, b: Date) => Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 86400000)
export const unit = (count: number, word: string) => `${count.toLocaleString('en-GB')} ${word}${count === 1 ? '' : 's'}`
export const decompose = (from: Date, to: Date) => {
  let years = to.getFullYear() - from.getFullYear(); let months = to.getMonth() - from.getMonth(); let days = to.getDate() - from.getDate()
  let borrowed = 0
  while (days < 0 && borrowed < 12) { months -= 1; borrowed += 1; days += new Date(to.getFullYear(), to.getMonth() - borrowed + 1, 0).getDate() }
  if (months < 0) { years -= 1; months += 12 }
  const totalDays = Math.abs(dayGap(from, to))
  return { years, months, days, totalDays, weeks: Math.floor(totalDays / 7), restDays: totalDays % 7, totalMonths: years * 12 + months }
}
export const zoneOffset = (wall: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(wall)
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value)
  const asUtc = Date.UTC(value('year'), value('month') - 1, value('day'), value('hour') % 24, value('minute'), value('second'))
  return asUtc - wall.getTime()
}
export const zoneToUtc = (wall: Date, timeZone: string) => {
  const numbers = Date.UTC(wall.getFullYear(), wall.getMonth(), wall.getDate(), wall.getHours(), wall.getMinutes())
  const first = numbers - zoneOffset(new Date(numbers), timeZone)
  return new Date(numbers - zoneOffset(new Date(first), timeZone))
}

export const isWeekday = (date: Date) => { const day = date.getDay(); return day > 0 && day < 6 }

export const addBusinessDays = (start: Date, count: number) => {
  const step = count >= 0 ? 1 : -1
  let cursor = new Date(start)
  let remaining = Math.abs(count)
  while (remaining > 0) {
    cursor = shiftDays(cursor, step)
    if (isWeekday(cursor)) remaining -= 1
  }
  return cursor
}

export const countBusinessDays = (from: Date, to: Date) => {
  const direction = dayGap(from, to) >= 0 ? 1 : -1
  let cursor = new Date(from)
  let count = 0
  while (dayGap(cursor, to) !== 0) {
    cursor = shiftDays(cursor, direction)
    if (isWeekday(cursor)) count += 1
  }
  return count
}

export const addMonthsClamped = (date: Date, months: number) => {
  const day = date.getDate()
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1)
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
  target.setDate(Math.min(day, lastDay))
  return target
}

export type RecurrenceUnit = 'days' | 'weeks' | 'months' | 'years' | 'weekdays'
export type MonthEndRule = 'clamp' | 'skip'

export const generateOccurrences = (options: {
  start: Date
  unit: RecurrenceUnit
  interval: number
  monthEnd: MonthEndRule
  weekdays: number[]
  limit: number
  endDate: Date | null
}) => {
  const { start, unit: kind, interval, monthEnd, weekdays, limit, endDate } = options
  const dates: Date[] = []
  const inside = (date: Date) => !endDate || dayGap(endDate, date) <= 0
  if (kind === 'weekdays') {
    const wanted = weekdays.length ? weekdays : [1, 2, 3, 4, 5]
    let cursor = new Date(start)
    let guard = 0
    while (dates.length < limit && guard < 40000) {
      if (endDate && dayGap(endDate, cursor) > 0) break
      if (wanted.includes(cursor.getDay())) dates.push(new Date(cursor))
      cursor = shiftDays(cursor, 1)
      guard += 1
    }
    return dates
  }
  const anchorDay = start.getDate()
  const anchorMonth = start.getMonth()
  const anchorYear = start.getFullYear()
  let step = 0
  let cursor = new Date(start)
  while (dates.length < limit) {
    dates.push(new Date(cursor))
    step += 1
    if (kind === 'days') cursor = shiftDays(start, step * interval)
    else if (kind === 'weeks') cursor = shiftDays(start, step * interval * 7)
    else if (kind === 'months') {
      let absolute = anchorMonth + step * interval
      let year = anchorYear + Math.floor(absolute / 12)
      let month = ((absolute % 12) + 12) % 12
      let lastDay = new Date(year, month + 1, 0).getDate()
      if (anchorDay > lastDay) {
        if (monthEnd === 'skip') {
          let fits = false
          while (!fits) {
            step += 1
            absolute = anchorMonth + step * interval
            year = anchorYear + Math.floor(absolute / 12)
            month = ((absolute % 12) + 12) % 12
            lastDay = new Date(year, month + 1, 0).getDate()
            fits = anchorDay <= lastDay
            if (!fits && dayGap(start, new Date(year, month, 1)) > 36600) { fits = true; step = -1 }
          }
          if (step < 0) break
          cursor = new Date(year, month, anchorDay)
        } else cursor = new Date(year, month, lastDay)
      } else cursor = new Date(year, month, anchorDay)
    } else {
      const year = anchorYear + step * interval
      const lastDay = new Date(year, anchorMonth + 1, 0).getDate()
      cursor = anchorDay > lastDay ? new Date(year, anchorMonth, lastDay) : new Date(year, anchorMonth, anchorDay)
    }
    if (!inside(cursor)) break
    if (dayGap(start, cursor) > 36600) break
  }
  return dates.slice(0, limit)
}

export type QuarterInfo = {
  quarter: number
  fyStartYear: number
  fyLabel: number
  start: Date
  end: Date
  total: number
  elapsed: number
  remaining: number
  pct: number
}

const fiscalYearStartYear = (year: number, monthIndex: number, fiscalStart: number) => monthIndex + 1 < fiscalStart ? year - 1 : year

export const quarterInfo = (date: Date, fiscalStart: number): QuarterInfo => {
  const monthIndex = date.getMonth()
  const offset = (monthIndex + 1 - fiscalStart + 12) % 12
  const quarter = Math.floor(offset / 3) + 1
  const fyStartYear = fiscalYearStartYear(date.getFullYear(), monthIndex, fiscalStart)
  const start = new Date(fyStartYear, fiscalStart - 1 + (quarter - 1) * 3, 1)
  const end = new Date(fyStartYear, fiscalStart - 1 + quarter * 3, 0)
  const total = dayGap(start, end) + 1
  const elapsed = dayGap(start, date) + 1
  const remaining = total - elapsed
  const fyLabel = fiscalStart === 1 ? fyStartYear : fyStartYear + 1
  return { quarter, fyStartYear, fyLabel, start, end, total, elapsed, remaining, pct: Math.round((elapsed / total) * 1000) / 10 }
}

export const quarterDates = (fyLabel: number, quarter: number, fiscalStart: number) => {
  const fyStartYear = fiscalStart === 1 ? fyLabel : fyLabel - 1
  const start = new Date(fyStartYear, fiscalStart - 1 + (quarter - 1) * 3, 1)
  const end = new Date(fyStartYear, fiscalStart - 1 + quarter * 3, 0)
  return { start, end }
}

export const yearInfo = (date: Date) => {
  const year = date.getFullYear()
  const isLeap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
  const total = isLeap ? 366 : 365
  const start = new Date(year, 0, 1)
  const ordinal = dayGap(start, date) + 1
  const end = new Date(year, 11, 31)
  const remaining = dayGap(date, end)
  const weekdaysRemaining = countBusinessDays(date, end)
  return { year, isLeap, total, ordinal, remaining, elapsedPct: Math.round((ordinal / total) * 1000) / 10, remainingPct: Math.round((remaining / total) * 1000) / 10, start, end, weekdaysRemaining }
}

export type DateOrder = 'auto' | 'day' | 'month' | 'iso'
export type ParsedDate = { year: number; month: number; day: number; ambiguous: boolean }

const MONTH_NAMES = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
const validDate = (year: number, month: number, day: number) => {
  if (month < 1 || month > 12 || day < 1 || day > 31) return false
  const last = new Date(year, month, 0).getDate()
  return day <= last
}

export const parseDateInput = (raw: string, order: DateOrder): ParsedDate | null => {
  const input = raw.trim()
  if (!input) return null
  const iso = /^(\d{4})-(\d{2})-(\d{2})(?:[T ].*)?$/.exec(input)
  if (iso) {
    const [, y, m, d] = iso
    return validDate(Number(y), Number(m), Number(d)) ? { year: Number(y), month: Number(m), day: Number(d), ambiguous: false } : null
  }
  const compact = /^(\d{4})(\d{2})(\d{2})$/.exec(input)
  if (compact) {
    const [, y, m, d] = compact
    return validDate(Number(y), Number(m), Number(d)) ? { year: Number(y), month: Number(m), day: Number(d), ambiguous: false } : null
  }
  const slash = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(input)
  if (slash) {
    const a = Number(slash[1]); const b = Number(slash[2]); const y = Number(slash[3])
    const dayFirst = { year: y, month: b, day: a }
    const monthFirst = { year: y, month: a, day: b }
    const dayFirstOk = validDate(dayFirst.year, dayFirst.month, dayFirst.day)
    const monthFirstOk = validDate(monthFirst.year, monthFirst.month, monthFirst.day)
    if (order === 'day') return dayFirstOk ? { ...dayFirst, ambiguous: false } : null
    if (order === 'month') return monthFirstOk ? { ...monthFirst, ambiguous: false } : null
    if (order === 'iso') return null
    if (dayFirstOk && monthFirstOk) {
      if (a > 12) return { ...dayFirst, ambiguous: false }
      if (b > 12) return { ...monthFirst, ambiguous: false }
      if (a === b) return { ...dayFirst, ambiguous: false }
      return { ...dayFirst, ambiguous: true }
    }
    if (dayFirstOk) return { ...dayFirst, ambiguous: false }
    if (monthFirstOk) return { ...monthFirst, ambiguous: false }
    return null
  }
  const named = /^([a-z]+)\s+(\d{1,2}),?\s+(\d{4})$/i.exec(input) ?? null
  if (named) {
    const month = MONTH_NAMES.indexOf(named[1].toLowerCase())
    if (month >= 0 && validDate(Number(named[3]), month + 1, Number(named[2]))) return { year: Number(named[3]), month: month + 1, day: Number(named[2]), ambiguous: false }
    return null
  }
  const namedDayFirst = /^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/i.exec(input) ?? null
  if (namedDayFirst) {
    const month = MONTH_NAMES.indexOf(namedDayFirst[2].toLowerCase())
    if (month >= 0 && validDate(Number(namedDayFirst[3]), month + 1, Number(namedDayFirst[1]))) return { year: Number(namedDayFirst[3]), month: month + 1, day: Number(namedDayFirst[1]), ambiguous: false }
    return null
  }
  return null
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const pad = (value: number) => String(value).padStart(2, '0')

export const formatVariants = (date: Date) => {
  const y = date.getFullYear(); const m = date.getMonth(); const d = date.getDate()
  return [
    ['ISO 8601 (YYYY-MM-DD)', `${y}-${pad(m + 1)}-${pad(d)}`],
    ['US (MM/DD/YYYY)', `${pad(m + 1)}/${pad(d)}/${y}`],
    ['European (DD/MM/YYYY)', `${pad(d)}/${pad(m + 1)}/${y}`],
    ['Year first (YYYY/MM/DD)', `${y}/${pad(m + 1)}/${pad(d)}`],
    ['Compact (YYYYMMDD)', `${y}${pad(m + 1)}${pad(d)}`],
    ['Long form', `${d} ${MONTHS_LONG[m]} ${y}`],
    ['Short form', `${d} ${MONTHS_SHORT[m]} ${y}`],
    ['Month name (US)', `${MONTHS_LONG[m]} ${d}, ${y}`],
    ['Weekday, long date', `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${MONTHS_LONG[m]} ${d}, ${y}`],
  ] as [string, string][]
}

export const isoStamp = (date: Date) => `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`

export const toCsv = (dates: Date[]) => ['date,weekday', ...dates.map((date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())},${weekday(date)}`)].join('\n')

export const buildIcs = (dates: Date[], title: string) => {
  const stamp = `${new Date().getUTCFullYear()}${pad(new Date().getUTCMonth() + 1)}${pad(new Date().getUTCDate())}T000000Z`
  const escape = (value: string) => value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
  const events = dates.map((date, index) => [
    'BEGIN:VEVENT',
    `UID:datepilot-${isoStamp(date)}-${index}@datepilot.online`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${isoStamp(date)}`,
    `DTEND;VALUE=DATE:${isoStamp(shiftDays(date, 1))}`,
    `SUMMARY:${escape(title)}`,
    'END:VEVENT',
  ].join('\r\n'))
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//DatePilot//Recurring Dates//EN', 'CALSCALE:GREGORIAN', ...events, 'END:VCALENDAR'].join('\r\n')
}

export const downloadText = (filename: string, content: string, mime: string) => {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
