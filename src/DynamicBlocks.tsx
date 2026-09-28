const pad = (value: number) => String(value).padStart(2, '0')
const iso = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
const pretty = (date: Date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const weekday = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'long' })
const dayGap = (a: Date, b: Date) => Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 86400000)
const isLeap = (year: number) => year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)

const relativeLabel = (gap: number) => gap === 0 ? 'Today' : gap === 1 ? 'Tomorrow' : gap < 0 ? `${Math.abs(gap)} days ago` : `${gap} days`

function nextOccurrence(month: number, day: number, from: Date) {
  const thisYear = new Date(from.getFullYear(), month, day)
  return dayGap(from, thisYear) < 0 ? new Date(from.getFullYear() + 1, month, day) : thisYear
}

export function PopularCountdowns() {
  const now = new Date()
  const events = [
    ['Christmas Day', 11, 25],
    ["New Year's Day", 0, 1],
    ["Valentine's Day", 1, 14],
    ['Independence Day (US)', 6, 4],
  ] as const
  return <div className="table-wrap">
    <table>
      <thead><tr><th scope="col">Event</th><th scope="col">Date</th><th scope="col">Days until</th></tr></thead>
      <tbody>
        {events.map(([name, month, day]) => {
          const target = nextOccurrence(month, day, now)
          return <tr key={name}>
            <td>{name}</td>
            <td>{pretty(target)} ({weekday(target)})</td>
            <td>{relativeLabel(dayGap(now, target))}</td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}

export function DaysFromToday() {
  const now = new Date()
  const offsets = [7, 30, 60, 90, 100, 365]
  return <div className="table-wrap">
    <table>
      <thead><tr><th scope="col">Offset</th><th scope="col">Date</th><th scope="col">Weekday</th></tr></thead>
      <tbody>
        {offsets.map((offset) => {
          const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset)
          return <tr key={offset}>
            <td>{offset} days from today</td>
            <td><time dateTime={iso(target)}>{pretty(target)}</time></td>
            <td>{weekday(target)}</td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}

export function TodayWeekday() {
  const now = new Date()
  return <p className="live-note">Today is <strong>{weekday(now)}</strong>, <time dateTime={iso(now)}>{pretty(now)}</time>. The weekday of a calendar date never changes, so this answer is the same for the whole day everywhere in the world.</p>
}

export function CurrentWeek() {
  const now = new Date()
  const mondayOffset = -((now.getDay() + 6) % 7)
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + mondayOffset)
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6)
  const thursday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 3)
  const first = new Date(thursday.getFullYear(), 0, 1)
  const week = Math.floor(dayGap(first, thursday) / 7) + 1
  return <p className="live-note">It is <strong>ISO week {week} of {thursday.getFullYear()}</strong>. Week {week} runs from Monday {pretty(monday)} to Sunday {pretty(sunday)}.</p>
}

export function LeapYearStatus() {
  const year = new Date().getFullYear()
  const leap = isLeap(year)
  return <p className="live-note"><strong>{year} is {leap ? '' : 'not '}a leap year</strong> — it has {leap ? 366 : 365} days{leap ? ' and includes 29 February' : ''}. The next leap year is {[...Array(8)].map((_, index) => year + 1 + index).find((value) => isLeap(value))}.</p>
}

export function DynamicBlock({ name }: { name: 'popular-countdowns' | 'days-from-today' | 'today-weekday' | 'current-week' | 'leap-year-status' }) {
  if (name === 'popular-countdowns') return <PopularCountdowns />
  if (name === 'days-from-today') return <DaysFromToday />
  if (name === 'today-weekday') return <TodayWeekday />
  if (name === 'current-week') return <CurrentWeek />
  return <LeapYearStatus />
}
