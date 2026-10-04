import test from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import path from 'node:path'
import {
  addBusinessDays,
  addMonthsClamped,
  countBusinessDays,
  dayGap,
  decompose,
  generateOccurrences,
  prettyDate,
  quarterInfo,
  shiftDays,
  weekday,
} from '../src/dateUtils.ts'

const root = path.resolve(import.meta.dirname, '..')

const todayInZone = (zone: string) => {
  const script = `
    const FIXED = '2026-01-01T23:30:00Z'
    const RealDate = Date
    class FakeDate extends RealDate {
      constructor(...args) { if (args.length === 0) super(FIXED); else super(...args) }
      static now() { return new RealDate(FIXED).getTime() }
    }
    globalThis.Date = FakeDate
    import(${JSON.stringify(pathToFileURL(path.join(root, 'src/dateUtils.ts')).href)}).then((m) => console.log(m.today()))
  `
  return execFileSync(process.execPath, ['--input-type=module', '-e', script], {
    cwd: root,
    env: { ...process.env, TZ: zone },
    encoding: 'utf8',
  }).trim()
}

test('today() returns the visitor local calendar date, not the UTC date', () => {
  assert.equal(todayInZone('Pacific/Kiritimati'), '2026-01-02')
  assert.equal(todayInZone('America/Los_Angeles'), '2026-01-01')
  assert.equal(todayInZone('UTC'), '2026-01-01')
})

test('today() uses a zero-padded YYYY-MM-DD string', () => {
  assert.match(todayInZone('Europe/Berlin'), /^2026-01-0[12]$/)
})

test('shiftDays crosses month, year, and leap boundaries', () => {
  assert.equal(prettyDate(shiftDays(new Date(2026, 0, 5), -10)), '26 December 2025')
  assert.equal(prettyDate(shiftDays(new Date(2026, 0, 31), 1)), '1 February 2026')
  assert.equal(prettyDate(shiftDays(new Date(2026, 11, 20), 20)), '9 January 2027')
  assert.equal(prettyDate(shiftDays(new Date(2024, 1, 1), 29)), '1 March 2024')
  assert.equal(prettyDate(shiftDays(new Date(2025, 1, 1), 29)), '2 March 2025')
})

test('addMonthsClamped clamps to the last day of a shorter month', () => {
  assert.equal(prettyDate(addMonthsClamped(new Date(2026, 0, 31), 1)), '28 February 2026')
  assert.equal(prettyDate(addMonthsClamped(new Date(2024, 1, 29), 12)), '28 February 2025')
  assert.equal(prettyDate(addMonthsClamped(new Date(2024, 1, 29), 48)), '29 February 2028')
  assert.equal(prettyDate(addMonthsClamped(new Date(2026, 0, 31), -1)), '31 December 2025')
})

test('addBusinessDays skips weekends in both directions', () => {
  const start = new Date(2026, 9, 1)
  assert.equal(weekday(addBusinessDays(start, 10)), 'Thursday')
  assert.equal(prettyDate(addBusinessDays(start, 10)), '15 October 2026')
  assert.equal(prettyDate(addBusinessDays(start, -1)), '30 September 2026')
  assert.equal(prettyDate(addBusinessDays(new Date(2026, 9, 3), 1)), '5 October 2026')
})

test('countBusinessDays counts weekdays after the start date up to the end date', () => {
  assert.equal(countBusinessDays(new Date(2026, 9, 1), new Date(2026, 9, 31)), 21)
  assert.equal(countBusinessDays(new Date(2026, 9, 1), new Date(2026, 9, 1)), 0)
  assert.equal(countBusinessDays(new Date(2026, 9, 2), new Date(2026, 9, 9)), 5)
})

test('generateOccurrences repeats selected weekdays every N weeks', () => {
  const start = new Date(2026, 9, 7)
  const everySecondWednesday = generateOccurrences({
    start,
    unit: 'weekdays',
    interval: 2,
    monthEnd: 'clamp',
    weekdays: [3],
    limit: 6,
    endDate: null,
  })
  assert.equal(everySecondWednesday.length, 6)
  everySecondWednesday.forEach((date) => assert.equal(date.getDay(), 3))
  for (let i = 1; i < everySecondWednesday.length; i++) {
    assert.equal(dayGap(everySecondWednesday[i - 1], everySecondWednesday[i]), 14)
  }
})

test('generateOccurrences weekday mode defaults to Monday-Friday with interval 1', () => {
  const dates = generateOccurrences({
    start: new Date(2026, 9, 1),
    unit: 'weekdays',
    interval: 1,
    monthEnd: 'clamp',
    weekdays: [1, 2, 3, 4, 5],
    limit: 10,
    endDate: null,
  })
  assert.equal(dates.length, 10)
  dates.forEach((date) => assert.ok(date.getDay() >= 1 && date.getDay() <= 5))
})

test('generateOccurrences applies the interval for days and months', () => {
  const days = generateOccurrences({ start: new Date(2026, 9, 1), unit: 'days', interval: 14, monthEnd: 'clamp', weekdays: [], limit: 5, endDate: null })
  assert.deepEqual(days.map((d) => d.getDate()), [1, 15, 29, 12, 26])
  const months = generateOccurrences({ start: new Date(2026, 0, 31), unit: 'months', interval: 1, monthEnd: 'clamp', weekdays: [], limit: 4, endDate: null })
  assert.deepEqual(months.map((d) => `${d.getMonth() + 1}/${d.getDate()}`), ['1/31', '2/28', '3/31', '4/30'])
})

test('decompose breaks a span into years, months, and days', () => {
  const span = decompose(new Date(2026, 0, 15), new Date(2026, 1, 14))
  assert.deepEqual([span.years, span.months, span.days], [0, 0, 30])
  assert.equal(span.totalDays, 30)
  const longer = decompose(new Date(2023, 5, 23), new Date(2025, 8, 25))
  assert.equal(longer.totalDays, 825)
  assert.deepEqual([longer.years, longer.months, longer.days], [2, 3, 2])
})

test('quarterInfo reports calendar quarters and day counts', () => {
  const q4 = quarterInfo(new Date(2026, 9, 1), 1)
  assert.equal(q4.quarter, 4)
  assert.equal(prettyDate(q4.start), '1 October 2026')
  assert.equal(prettyDate(q4.end), '31 December 2026')
  assert.equal(q4.total, 92)
  const q1 = quarterInfo(new Date(2026, 0, 1), 1)
  assert.equal(q1.total, 90)
})
