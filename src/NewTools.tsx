import { useState } from 'react'
import {
  addBusinessDays,
  buildIcs,
  downloadText,
  formatVariants,
  generateOccurrences,
  localDate,
  parseDateInput,
  prettyDate,
  quarterDates,
  quarterInfo,
  shiftDays,
  today,
  toCsv,
  unit,
  weekday,
  yearInfo,
} from './dateUtils'
import type { DateOrder, MonthEndRule, RecurrenceUnit } from './dateUtils'

function RecurringDateCalculator() {
  const [start, setStart] = useState(today())
  const [kind, setKind] = useState<RecurrenceUnit>('days')
  const [interval, setInterval] = useState('1')
  const [count, setCount] = useState('10')
  const [end, setEnd] = useState('')
  const [monthEnd, setMonthEnd] = useState<MonthEndRule>('clamp')
  const [weekdays, setWeekdays] = useState<number[]>([1, 2, 3, 4, 5])
  const [dates, setDates] = useState<Date[] | null>(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError(''); setDates(null)
    const startDate = localDate(start)
    if (Number.isNaN(startDate.getTime())) return setError('Please enter a valid start date.')
    const gap = Number(interval)
    if (!Number.isInteger(gap) || gap < 1) return setError('Please enter a whole interval of 1 or more.')
    const limit = Number(count)
    if (!Number.isInteger(limit) || limit < 1) return setError('Please enter how many dates to generate (1 or more).')
    if (limit > 100) return setError('Please generate 100 dates or fewer per schedule.')
    let endDate: Date | null = null
    if (end) {
      endDate = localDate(end)
      if (Number.isNaN(endDate.getTime())) return setError('Please enter a valid end date, or leave it empty.')
      if (endDate < startDate) return setError('The end date must be on or after the start date.')
    }
    if (kind === 'weekdays' && weekdays.length === 0) return setError('Please select at least one weekday.')
    const generated = generateOccurrences({ start: startDate, unit: kind, interval: gap, monthEnd, weekdays, limit, endDate })
    if (generated.length === 0) return setError('No dates fall inside that range. Widen the end date or increase the interval.')
    setDates(generated)
  }

  const reset = () => { setStart(today()); setKind('days'); setInterval('1'); setCount('10'); setEnd(''); setMonthEnd('clamp'); setWeekdays([1, 2, 3, 4, 5]); setDates(null); setError('') }

  const dayNames = [['Sun', 0], ['Mon', 1], ['Tue', 2], ['Wed', 3], ['Thu', 4], ['Fri', 5], ['Sat', 6]] as [string, number][]

  return <div className="calculator">
    <div className="form-grid">
      <label className="field"><span>First date</span><input type="date" value={start} onChange={(event) => setStart(event.target.value)} /></label>
      <label className="field"><span>Repeat every</span>
        <select value={kind} onChange={(event) => setKind(event.target.value as RecurrenceUnit)}>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
          <option value="years">Years</option>
          <option value="weekdays">Selected weekdays</option>
        </select>
      </label>
      {kind !== 'weekdays' && <label className="field"><span>Interval</span><input type="number" min="1" value={interval} onChange={(event) => setInterval(event.target.value)} /></label>}
      <label className="field"><span>Number of dates</span><input type="number" min="1" max="100" value={count} onChange={(event) => setCount(event.target.value)} /></label>
      <label className="field"><span>Stop on or before (optional)</span><input type="date" value={end} onChange={(event) => setEnd(event.target.value)} /></label>
      {(kind === 'months' || kind === 'years') && <label className="field"><span>If the day does not exist</span>
        <select value={monthEnd} onChange={(event) => setMonthEnd(event.target.value as MonthEndRule)}>
          <option value="clamp">Use the last day of the month</option>
          <option value="skip">Skip that month</option>
        </select>
      </label>}
    </div>
    {kind === 'weekdays' && <fieldset className="weekday-pick"><legend>Repeat on</legend>
      {dayNames.map(([label, value]) => <label key={value}><input type="checkbox" checked={weekdays.includes(value)} onChange={(event) => setWeekdays((current) => event.target.checked ? [...current, value].sort((a, b) => a - b) : current.filter((item) => item !== value))} /> {label}</label>)}
    </fieldset>}
    <div className="calculator-actions">
      <button className="primary" onClick={calculate}>Generate schedule <span>→</span></button>
      <button className="reset-btn" onClick={reset} type="button">Reset</button>
    </div>
    {error && <p className="error" role="alert">{error}</p>}
    {dates && <div className="result" aria-live="polite">
      <span className="eyebrow accent">YOUR SCHEDULE</span>
      <strong>{unit(dates.length, 'date')} generated</strong>
      <div className="date-list">{dates.map((date) => `${weekday(date)}, ${prettyDate(date)}`).join('\n')}</div>
      <p>First date {prettyDate(dates[0])} · last date {prettyDate(dates[dates.length - 1])}.</p>
      <div className="export-actions">
        <button className="reset-btn" type="button" onClick={() => downloadText('datepilot-schedule.csv', toCsv(dates), 'text/csv')}>Download CSV</button>
        <button className="reset-btn" type="button" onClick={() => downloadText('datepilot-schedule.ics', buildIcs(dates, 'Recurring date (DatePilot)'), 'text/calendar')}>Download .ics</button>
      </div>
    </div>}
    <p className="method-note">Occurrences are spaced by calendar intervals from the first date; holidays are not applied.</p>
  </div>
}

function DeadlineCalculator() {
  const [mode, setMode] = useState<'forward' | 'backward'>('forward')
  const [date, setDate] = useState(today())
  const [days, setDays] = useState('10')
  const [basis, setBasis] = useState<'calendar' | 'business'>('calendar')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const calculate = () => {
    setError(''); setResult('')
    const anchor = localDate(date)
    if (Number.isNaN(anchor.getTime())) return setError('Please enter a valid date.')
    const n = Number(days)
    if (!Number.isInteger(n)) return setError('Please enter a whole number of days.')
    if (n < 0) return setError('Please enter 0 days or more.')
    if (n > 10000) return setError('Please enter 10,000 days or fewer.')
    const moved = basis === 'business' ? addBusinessDays(anchor, mode === 'forward' ? n : -n) : shiftDays(anchor, mode === 'forward' ? n : -n)
    const spanned = Math.abs(Math.round((Date.UTC(moved.getFullYear(), moved.getMonth(), moved.getDate()) - Date.UTC(anchor.getFullYear(), anchor.getMonth(), anchor.getDate())) / 86400000))
    const label = mode === 'forward' ? 'Deadline' : 'Latest start'
    const first = `${label}: ${weekday(moved)}, ${prettyDate(moved)}`
    const second = basis === 'business' ? `${unit(n, 'business day')} ${mode === 'forward' ? 'after' : 'before'} the ${mode === 'forward' ? 'start' : 'deadline'} · ${unit(spanned, 'calendar day')} spanned`
      : `${unit(n, 'calendar day')} ${mode === 'forward' ? 'after' : 'before'} the ${mode === 'forward' ? 'start' : 'deadline'}`
    setResult(`${first}\n${second}`)
  }

  const reset = () => { setMode('forward'); setDate(today()); setDays('10'); setBasis('calendar'); setResult(''); setError('') }

  return <div className="calculator">
    <div className="form-grid">
      <label className="field"><span>Direction</span>
        <select value={mode} onChange={(event) => setMode(event.target.value as 'forward' | 'backward')}>
          <option value="forward">Forward — start date to deadline</option>
          <option value="backward">Backward — deadline to latest start</option>
        </select>
      </label>
      <label className="field"><span>{mode === 'forward' ? 'Start date' : 'Deadline date'}</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
      <label className="field"><span>Days</span><input type="number" min="0" value={days} onChange={(event) => setDays(event.target.value)} /></label>
      <label className="field"><span>Count</span>
        <select value={basis} onChange={(event) => setBasis(event.target.value as 'calendar' | 'business')}>
          <option value="calendar">Calendar days</option>
          <option value="business">Business days (Mon–Fri)</option>
        </select>
      </label>
    </div>
    <div className="calculator-actions">
      <button className="primary" onClick={calculate}>Calculate deadline <span>→</span></button>
      <button className="reset-btn" onClick={reset} type="button">Reset</button>
    </div>
    {error && <p className="error" role="alert">{error}</p>}
    {result && <div className="result" aria-live="polite"><span className="eyebrow accent">YOUR RESULT</span><strong>{result}</strong><p>{basis === 'business' ? 'Monday through Friday count; holidays are not assumed.' : 'Both directions use standard calendar arithmetic.'}</p></div>}
  </div>
}

function QuarterCalculator() {
  const [mode, setMode] = useState<'from-date' | 'from-quarter'>('from-date')
  const [date, setDate] = useState(today())
  const [fiscalStart, setFiscalStart] = useState('1')
  const [quarter, setQuarter] = useState('1')
  const [fy, setFy] = useState(String(new Date().getFullYear()))
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const calculate = () => {
    setError(''); setResult('')
    const startMonth = Number(fiscalStart)
    if (mode === 'from-date') {
      const a = localDate(date)
      if (Number.isNaN(a.getTime())) return setError('Please enter a valid date.')
      const info = quarterInfo(a, startMonth)
      setResult(`Q${info.quarter} ${info.fyLabel}\n${prettyDate(info.start)} to ${prettyDate(info.end)}\n${unit(info.elapsed, 'day')} of ${unit(info.total, 'day')} used (${info.pct}%) · ${unit(info.remaining, 'day')} remaining`)
      return
    }
    const year = Number(fy)
    if (!Number.isInteger(year) || year < 1) return setError('Please enter a valid fiscal year (1 or higher).')
    const q = Number(quarter)
    if (q < 1 || q > 4) return setError('Please choose a quarter between 1 and 4.')
    const span = quarterDates(year, q, startMonth)
    const total = Math.abs(Math.round((Date.UTC(span.end.getFullYear(), span.end.getMonth(), span.end.getDate()) - Date.UTC(span.start.getFullYear(), span.start.getMonth(), span.start.getDate())) / 86400000)) + 1
    setResult(`Q${q} ${year}\n${prettyDate(span.start)} to ${prettyDate(span.end)}\n${unit(total, 'day')} · starts ${weekday(span.start)}, ends ${weekday(span.end)}`)
  }

  const reset = () => { setMode('from-date'); setDate(today()); setFiscalStart('1'); setQuarter('1'); setFy(String(new Date().getFullYear())); setResult(''); setError('') }

  return <div className="calculator">
    <div className="form-grid">
      <label className="field"><span>Mode</span>
        <select value={mode} onChange={(event) => setMode(event.target.value as 'from-date' | 'from-quarter')}>
          <option value="from-date">Which quarter is this date in?</option>
          <option value="from-quarter">Which dates are in this quarter?</option>
        </select>
      </label>
      <label className="field"><span>Fiscal year starts in</span>
        <select value={fiscalStart} onChange={(event) => setFiscalStart(event.target.value)}>
          {months.map((month, index) => <option key={month} value={String(index + 1)}>{month}</option>)}
        </select>
      </label>
      {mode === 'from-date'
        ? <label className="field"><span>Date</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
        : <>
          <label className="field"><span>Quarter</span>
            <select value={quarter} onChange={(event) => setQuarter(event.target.value)}>
              <option value="1">Q1 (months 1–3 of the fiscal year)</option>
              <option value="2">Q2 (months 4–6)</option>
              <option value="3">Q3 (months 7–9)</option>
              <option value="4">Q4 (months 10–12)</option>
            </select>
          </label>
          <label className="field"><span>Fiscal year</span><input type="number" min="1" value={fy} onChange={(event) => setFy(event.target.value)} /></label>
        </>}
    </div>
    <div className="calculator-actions">
      <button className="primary" onClick={calculate}>Calculate quarter <span>→</span></button>
      <button className="reset-btn" onClick={reset} type="button">Reset</button>
    </div>
    {error && <p className="error" role="alert">{error}</p>}
    {result && <div className="result" aria-live="polite"><span className="eyebrow accent">YOUR RESULT</span><strong>{result}</strong><p>Quarters are three calendar months measured from the fiscal year start.</p></div>}
  </div>
}

function DayOfYearCalculator() {
  const [date, setDate] = useState(today())
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const calculate = () => {
    setError(''); setResult('')
    const a = localDate(date)
    if (Number.isNaN(a.getTime())) return setError('Please enter a valid date.')
    if (a.getFullYear() < 1 || a.getFullYear() > 9999) return setError('Please enter a date inside a standard calendar year.')
    const info = yearInfo(a)
    setResult(`Day ${info.ordinal} of ${info.total}\n${unit(info.remaining, 'day')} remaining (${info.remainingPct}% of the year)\n${info.isLeap ? 'Leap year' : 'Non-leap year'} · ${unit(info.weekdaysRemaining, 'weekday')} after this date`)
  }

  const reset = () => { setDate(today()); setResult(''); setError('') }

  return <div className="calculator">
    <div className="form-grid">
      <label className="field"><span>Date</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
    </div>
    <div className="calculator-actions">
      <button className="primary" onClick={calculate}>Calculate day of year <span>→</span></button>
      <button className="reset-btn" onClick={reset} type="button">Reset</button>
    </div>
    {error && <p className="error" role="alert">{error}</p>}
    {result && <div className="result" aria-live="polite"><span className="eyebrow accent">YOUR RESULT</span><strong>{result}</strong><p>The ordinal day counts from 1 January; remaining days exclude the date itself.</p></div>}
  </div>
}

function DateFormatConverter() {
  const [input, setInput] = useState('')
  const [order, setOrder] = useState<DateOrder>('auto')
  const [rows, setRows] = useState<[string, string][] | null>(null)
  const [summary, setSummary] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    setError(''); setRows(null); setSummary('')
    if (!input.trim()) return setError('Please enter a date to convert.')
    const parsed = parseDateInput(input, order)
    if (!parsed) return setError('That date could not be read. Try formats like 2026-10-03, 03/04/2026, or October 3, 2026.')
    if (parsed.ambiguous) return setError('This numeric date is ambiguous: it can be day-first or month-first. Choose the correct order (DD/MM or MM/DD) and convert again.')
    const date = new Date(parsed.year, parsed.month - 1, parsed.day)
    setSummary(`Resolved: ${weekday(date)}, ${prettyDate(date)}`)
    setRows(formatVariants(date))
  }

  const reset = () => { setInput(''); setOrder('auto'); setRows(null); setSummary(''); setError('') }

  return <div className="calculator">
    <div className="form-grid">
      <label className="field"><span>Date to convert</span><input type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="e.g. 03/04/2026 or 2026-04-03" /></label>
      <label className="field"><span>Numeric date order</span>
        <select value={order} onChange={(event) => setOrder(event.target.value as DateOrder)}>
          <option value="auto">Auto-detect (ask if ambiguous)</option>
          <option value="day">Day first (DD/MM/YYYY)</option>
          <option value="month">Month first (MM/DD/YYYY)</option>
          <option value="iso">ISO only (YYYY-MM-DD)</option>
        </select>
      </label>
    </div>
    <div className="calculator-actions">
      <button className="primary" onClick={convert}>Convert date <span>→</span></button>
      <button className="reset-btn" onClick={reset} type="button">Reset</button>
    </div>
    {error && <p className="error" role="alert">{error}</p>}
    {rows && <div className="result" aria-live="polite">
      <span className="eyebrow accent">CONVERTED DATE</span>
      <strong>{summary}</strong>
      <div className="table-wrap"><table>
        <thead><tr><th scope="col">Format</th><th scope="col">Value</th></tr></thead>
        <tbody>{rows.map(([label, value]) => <tr key={label}><td>{label}</td><td>{value}</td></tr>)}</tbody>
      </table></div>
      <p>ISO 8601 (YYYY-MM-DD) is the only format that is unambiguous everywhere.</p>
    </div>}
    <p className="method-note">Ambiguous numeric dates are resolved with the selected day/month order.</p>
  </div>
}

export { RecurringDateCalculator, DeadlineCalculator, QuarterCalculator, DayOfYearCalculator, DateFormatConverter }
