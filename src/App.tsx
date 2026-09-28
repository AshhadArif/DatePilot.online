import { useEffect, useState, useCallback } from 'react'
import './App.css'
import { guideContent, toolContent } from './content'
import type { Block } from './content'
import { DynamicBlock } from './DynamicBlocks'

type Tool = { slug: string; title: string; seoTitle: string; category: 'Date' | 'Calendar' | 'Time'; summary: string; method: string }
type Page = { slug: string; title: string; description: string }

const tools: Tool[] = [
  { slug: 'date-calculator', title: 'Date Calculator', seoTitle: 'Date Calculator — Add or Subtract Days From a Date', category: 'Date', summary: 'Add calendar time to a starting date.', method: 'Calendar arithmetic is used for the result.' },
  { slug: 'age-calculator', title: 'Age Calculator', seoTitle: 'Age Calculator — Calculate Exact Age in Years, Months, Days', category: 'Date', summary: 'Find an exact age between two dates.', method: 'Age is counted by calendar anniversaries.' },
  { slug: 'days-between-dates', title: 'Days Between Dates', seoTitle: 'Days Between Dates — Date Difference Calculator', category: 'Date', summary: 'Measure the elapsed days between dates.', method: 'The result excludes both named endpoints.' },
  { slug: 'days-calculator', title: 'Days Calculator', seoTitle: 'Days Calculator — Days From Today, Before & Between Dates', category: 'Date', summary: 'Find dates from a day count in either direction.', method: 'Both directions are calculated from the reference date.' },
  { slug: 'add-days', title: 'Add Days to Date', seoTitle: 'Add Days to Date — Calculate a Future Date in Days', category: 'Date', summary: 'Find a future date by adding days.', method: 'The result moves through calendar dates.' },
  { slug: 'subtract-days', title: 'Subtract Days from Date', seoTitle: 'Subtract Days From Date — Calculate a Date in the Past', category: 'Date', summary: 'Find an earlier date by subtracting days.', method: 'Month and year boundaries are handled as calendar dates.' },
  { slug: 'working-days', title: 'Working Days Calculator', seoTitle: 'Working Days Calculator — Count Business Days Between Dates', category: 'Date', summary: 'Count weekdays between two dates.', method: 'Monday through Friday count; holidays are not assumed.' },
  { slug: 'day-of-week', title: 'Day of the Week Calculator', seoTitle: 'Day of the Week Calculator — What Day Was or Will Be', category: 'Calendar', summary: 'Discover the weekday for a date.', method: 'Uses the proleptic Gregorian calendar.' },
  { slug: 'week-number', title: 'Week Number Calculator', seoTitle: 'Week Number Calculator — Current ISO Week Number', category: 'Calendar', summary: 'Find an ISO 8601 week and week-year.', method: 'ISO weeks start Monday and week 1 contains the first Thursday.' },
  { slug: 'leap-year', title: 'Leap Year Calculator', seoTitle: 'Leap Year Calculator — Is This Year a Leap Year?', category: 'Calendar', summary: 'Check whether a year has 366 days.', method: 'Centuries are leap years only when divisible by 400.' },
  { slug: 'countdown', title: 'Countdown Calculator', seoTitle: 'Countdown Calculator — How Many Days Until a Date', category: 'Time', summary: 'See how much time remains until a moment.', method: 'Measures from this device clock to the target.' },
  { slug: 'time-difference', title: 'Time Difference Calculator', seoTitle: 'Time Difference Calculator — Time Between Two Times', category: 'Time', summary: 'Compare two date and time values.', method: 'Reports elapsed duration between local values.' },
  { slug: 'time-zone-converter', title: 'Time Zone Converter', seoTitle: 'Time Zone Converter — Convert Time Zones & UTC Offsets', category: 'Time', summary: 'Translate a date and time between zones.', method: 'Uses browser IANA timezone data.' },
]

const guides: Page[] = [
  ['date-calculations', 'How Date Calculations Work', 'Understand the choices behind a calendar calculation.'],
  ['how-to-calculate-age', 'How to Calculate Age', 'See why calendar age is more than a simple day count.'],
  ['days-between-dates', 'How to Calculate Days Between Dates', 'Choose the right endpoint convention for a duration.'],
  ['add-subtract-days', 'How to Add or Subtract Days From a Date', 'Handle month boundaries and calendar arithmetic clearly.'],
  ['working-days', 'Working Days Explained', 'Understand weekdays, holidays, and business-day assumptions.'],
  ['leap-years', 'Leap Years Explained', 'Learn the Gregorian rule for 365 and 366-day years.'],
  ['week-numbers', 'How Week Numbers Work', 'Understand the ISO week-year around New Year.'],
  ['iso-week-date', 'ISO Week Date System Explained', 'Learn how ISO dates organize weeks and weekdays.'],
  ['day-of-week', 'How to Find the Day of the Week', 'Use a calendar date to identify its weekday.'],
  ['time-zones', 'Time Zones Explained', 'See why named zones are more useful than raw offsets.'],
  ['utc-vs-gmt', 'UTC and GMT Explained', 'Understand the relationship and practical difference.'],
  ['daylight-saving-time', 'Daylight Saving Time Explained', 'Learn how clock changes affect local times.'],
  ['date-time-formats', 'Date and Time Formats', 'Choose a format that avoids ambiguity across regions.'],
  ['calendar-systems', 'Calendar Systems Explained', 'Understand the Gregorian calendar used by these tools.'],
].map(([slug, title, description]) => ({ slug, title, description }))

const toolPath = (tool: Tool) => tool.category === 'Calendar' ? `/calendar/${tool.slug}` : tool.category === 'Time' ? `/time/${tool.slug}` : `/calculators/${tool.slug}`
const today = () => new Date().toISOString().slice(0, 10)
const localDate = (value: string) => new Date(`${value}T00:00:00`)
const prettyDate = (date: Date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const weekday = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'long' })
const shiftDays = (date: Date, count: number) => { const result = new Date(date); result.setDate(result.getDate() + count); return result }
const zoneOffset = (wall: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(wall)
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value)
  const asUtc = Date.UTC(value('year'), value('month') - 1, value('day'), value('hour') % 24, value('minute'), value('second'))
  return asUtc - wall.getTime()
}
const zoneToUtc = (wall: Date, timeZone: string) => {
  const numbers = Date.UTC(wall.getFullYear(), wall.getMonth(), wall.getDate(), wall.getHours(), wall.getMinutes())
  const first = numbers - zoneOffset(new Date(numbers), timeZone)
  return new Date(numbers - zoneOffset(new Date(first), timeZone))
}
const dayGap = (a: Date, b: Date) => Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 86400000)
const normalize = (path: string) => path.length > 1 ? path.replace(/\/$/, '') : path
const stripLinks = (text: string) => text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
const SITE_URL = 'https://datepilot.online'

const routeSeo = (path: string) => {
  const tool = tools.find((item) => toolPath(item) === path)
  const guide = guides.find((item) => `/guides/${item.slug}` === path)
  if (tool) return { title: tool.seoTitle, description: stripLinks(toolContent[tool.slug]?.answer ?? tool.summary), type: 'WebApplication' }
  if (guide) return { title: guide.title, description: stripLinks(guideContent[guide.slug]?.answer ?? guide.description), type: 'Article' }
  const pages: Record<string, { title: string; description: string }> = {
    '/': { title: 'DatePilot — Date, Calendar, and Time Tools', description: 'Free date calculators, calendar tools, and time utilities. Calculate dates, age, working days, week numbers, and time zones with clear explanations.' },
    '/calculators': { title: 'Date and Time Calculators', description: 'Use DatePilot calculators to add or subtract days, count working days, find age, and calculate date differences with clear methodology.' },
    '/calendar': { title: 'Calendar Tools — Weekdays, Week Numbers, Leap Years', description: 'Check weekdays, ISO week numbers, and leap years using DatePilot calendar tools with clearly stated conventions.' },
    '/time': { title: 'Time Tools — Countdown, Time Difference, Time Zone Converter', description: 'Count down to a date, compare elapsed time, and convert between time zones using DatePilot time tools.' },
    '/guides': { title: 'Date and Time Guides — Calculations, Calendars, Time Zones', description: 'Practical explanations for date calculations, calendar rules, time zones, and date formats.' },
    '/faq': { title: 'Frequently Asked Questions — DatePilot', description: 'Answers about DatePilot calculations, endpoint conventions, privacy, and how date tools work.' },
    '/about': { title: 'About DatePilot — Our Approach to Date Calculations', description: 'Learn how DatePilot builds date and time tools, explains its methods, and checks calculation accuracy.' },
    '/contact': { title: 'Contact DatePilot — Report Issues and Corrections', description: 'Report incorrect calculations, broken links, accessibility issues, or other problems with DatePilot.' },
    '/privacy-policy': { title: 'Privacy Policy — How DatePilot Handles Your Data', description: 'DatePilot calculators run in your browser. Read how we handle calculator inputs, cookies, and any analytics.' },
    '/cookie-policy': { title: 'Cookie Policy — Which Cookies DatePilot Uses', description: 'Learn about essential, analytics, and advertising cookies used by DatePilot when enabled.' },
    '/terms': { title: 'Terms of Use — DatePilot', description: 'Read the terms governing use of DatePilot date and time calculation tools.' },
    '/disclaimer': { title: 'Disclaimer — DatePilot', description: 'DatePilot provides general calculations, not official or legal advice. Read important disclaimers.' },
    '/report-an-error': { title: 'Report an Error — DatePilot', description: 'Found an incorrect calculation, broken link, or accessibility problem? Report it to DatePilot.' },
  }
  const seo = pages[path] ?? { title: 'Page Not Found', description: 'This DatePilot page does not exist.' }
  return { ...seo, type: 'WebPage' }
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null
  if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.appendChild(element) }
  element.content = content
}

function updateSeo(path: string) {
  const seo = routeSeo(path)
  const canonical = `${SITE_URL}${path === '/' ? '/' : `${path}/`}`
  document.title = `${seo.title}`
  setMeta('name', 'description', seo.description)
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', seo.title)
  setMeta('name', 'twitter:description', seo.description)
  setMeta('name', 'twitter:image', `${SITE_URL}/og-image.svg`)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:title', seo.title)
  setMeta('property', 'og:description', seo.description)
  setMeta('property', 'og:url', canonical)
  setMeta('property', 'og:image', `${SITE_URL}/og-image.svg`)
  setMeta('property', 'og:site_name', 'DatePilot')

  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
  link.href = canonical

  let schema = document.head.querySelector('#datepilot-schema') as HTMLScriptElement | null
  if (!schema) { schema = document.createElement('script'); schema.id = 'datepilot-schema'; schema.type = 'application/ld+json'; document.head.appendChild(schema) }

  const schemaType = 'type' in seo ? seo.type : 'WebPage'
  const graph: Record<string, unknown>[] = [
    { '@type': schemaType, '@id': `${canonical}#page`, name: seo.title, description: seo.description, url: canonical, isPartOf: { '@id': `${SITE_URL}/#website` } }
  ]

  if (path === '/') {
    graph.push({
      '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'DatePilot', url: SITE_URL,
      potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/calculators?query={search_term_string}`, 'query-input': 'required name=search_term_string' }
    })
  }

  if (path === '/faq') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      name: seo.title,
      description: seo.description,
      mainEntity: [
        { '@type': 'Question', name: 'Are DatePilot results official?', acceptedAnswer: { '@type': 'Answer', text: 'No. DatePilot provides general calculations and explanations. Verify consequential deadlines, contracts, employment dates, travel requirements, and legal matters with the responsible authority.' } },
        { '@type': 'Question', name: 'Why can date calculations differ?', acceptedAnswer: { '@type': 'Answer', text: 'Different answers may use different endpoint conventions, calendar rules, holiday lists, or timezone assumptions. Each tool states its method beside the result.' } },
        { '@type': 'Question', name: 'Does "days between dates" include the start date?', acceptedAnswer: { '@type': 'Answer', text: 'DatePilot\'s Days Between Dates tool reports an exclusive elapsed gap. An inclusive schedule count is a different convention, so check the tool and its explanation before using the result.' } },
        { '@type': 'Question', name: 'Are working days the same as business days?', acceptedAnswer: { '@type': 'Answer', text: 'Not always. DatePilot\'s default working-day rule counts Monday through Friday and does not silently apply a country-specific holiday calendar.' } },
        { '@type': 'Question', name: 'Why can a time-zone conversion change the date?', acceptedAnswer: { '@type': 'Answer', text: 'A local time near midnight can become the next or previous calendar date in another named zone. Use the Time Zone Converter with the specific event date so daylight-saving rules are considered.' } },
        { '@type': 'Question', name: 'Does DatePilot store my calculator inputs?', acceptedAnswer: { '@type': 'Answer', text: 'No. DatePilot calculators run entirely in your browser. Inputs are not sent to a server, stored in a database, or tracked. See the Privacy Policy for details.' } },
        { '@type': 'Question', name: 'How does DatePilot handle daylight saving time?', acceptedAnswer: { '@type': 'Answer', text: 'DatePilot\'s time tools use your browser\'s IANA timezone data, which includes historical and daylight-saving rules for named time zones.' } },
        { '@type': 'Question', name: 'Can I use DatePilot for legal or official purposes?', acceptedAnswer: { '@type': 'Answer', text: 'DatePilot provides general-purpose calculations. For legal, medical, financial, or official deadlines, verify the result with the responsible authority.' } }
      ]
    })
  }

  // Add FAQ schema for tool pages that have FAQs
  const currentTool = tools.find((t) => toolPath(t) === path)
  if (currentTool && toolContent[currentTool.slug]?.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#tool-faq`,
      name: `${seo.title} — Frequently Asked Questions`,
      description: seo.description,
      mainEntity: toolContent[currentTool.slug].faqs.map(([q, a]) => ({
        '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: stripLinks(a) }
      }))
    })
  }

  // Add HowTo schema for guide pages
  const currentGuide = guides.find((g) => `/guides/${g.slug}` === path)
  if (currentGuide) {
    const guideData = guideContent[currentGuide.slug]
    if (guideData) {
      graph.push({
        '@type': 'HowTo',
        '@id': `${canonical}#howto`,
        name: seo.title,
        description: seo.description,
        step: guideData.sections.map(([heading, paragraph], i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: heading,
          text: paragraph
        }))
      })
    }
  }

  // Add BreadcrumbList schema for all pages except homepage
  if (path !== '/') {
    const breadcrumbItems: { position: number; name: string; item: string }[] = [
      { position: 1, name: 'Home', item: SITE_URL }
    ]
    let position = 2
    const segments = path.split('/').filter(Boolean)
    let builtPath = ''
    for (const segment of segments) {
      builtPath += `/${segment}`
      const segmentSeo = routeSeo(builtPath)
      if (segmentSeo.title !== 'Page Not Found') {
        breadcrumbItems.push({ position, name: segmentSeo.title.split(' — ')[0].split(' | ')[0], item: `${SITE_URL}${builtPath}` })
        position++
      }
    }
    if (breadcrumbItems.length > 1) {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: breadcrumbItems.map((item) => ({
          '@type': 'ListItem',
          position: item.position,
          name: item.name,
          item: item.item
        }))
      })
    }
  }

  schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}

function useRoute() {
  const [path, setPath] = useState(normalize(window.location.pathname))
  useEffect(() => { const listener = () => setPath(normalize(window.location.pathname)); window.addEventListener('popstate', listener); return () => window.removeEventListener('popstate', listener) }, [])
  useEffect(() => { updateSeo(path) }, [path])
  const go = useCallback((next: string) => { window.history.pushState({}, '', next); setPath(normalize(next)); window.scrollTo({ top: 0, behavior: 'smooth' }) }, [])
  return { path, go }
}

function NavLink({ to, go, children, className }: { to: string; go: (p: string) => void; children: React.ReactNode; className?: string }) {
  return <a href={to} className={className} onClick={(e) => { e.preventDefault(); go(to) }}>{children}</a>
}

function Header({ go }: { go: (path: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = (path: string) => { setMenuOpen(false); go(path) }
  return <header className="site-header">
    <NavLink to="/" go={navigate} className="brand"><b>DP</b><span>DatePilot<span className="dot">.</span></span></NavLink>
    <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
      <span>{menuOpen ? 'Close' : 'Menu'}</span><i aria-hidden="true">{menuOpen ? '×' : '☰'}</i>
    </button>
    <nav id="primary-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Primary navigation">
      <NavLink to="/calculators" go={navigate}>Calculators</NavLink>
      <NavLink to="/calendar" go={navigate}>Calendar</NavLink>
      <NavLink to="/time" go={navigate}>Time</NavLink>
      <NavLink to="/guides" go={navigate}>Guides</NavLink>
      <NavLink to="/about" go={navigate}>About</NavLink>
    </nav>
    <NavLink to="/calculators" go={navigate} className="find-button">Find a tool <small>⌘ K</small></NavLink>
  </header>
}

function Footer({ go }: { go: (path: string) => void }) {
  const link = (path: string, label: string) => <NavLink to={path} go={go}>{label}</NavLink>
  return <footer>
    <div>
      <NavLink to="/" go={go} className="brand"><b>DP</b><span>DatePilot<span className="dot">.</span></span></NavLink>
      <p>Useful answers for dates, calendars, and time.</p>
    </div>
    <div className="footer-columns">
      <div><small>Explore</small>{link('/calculators', 'Calculators')}{link('/calendar', 'Calendar')}{link('/time', 'Time')}{link('/guides', 'Guides')}{link('/faq', 'FAQ')}</div>
      <div><small>Trust & support</small>{link('/about', 'About')}{link('/contact', 'Contact')}{link('/report-an-error', 'Report an error')}</div>
      <div><small>Legal</small>{link('/privacy-policy', 'Privacy Policy')}{link('/cookie-policy', 'Cookie Policy')}{link('/terms', 'Terms of Use')}{link('/disclaimer', 'Disclaimer')}</div>
    </div>
    <small className="footer-note">Built for clarity. No advertising is part of the calculation.</small>
  </footer>
}

function Card({ tool, go }: { tool: Tool; go: (path: string) => void }) {
  return <NavLink to={toolPath(tool)} go={go} className="tool-card"><span className="eyebrow">{tool.category} tool</span><strong>{tool.title}</strong><span>{tool.summary}</span><i>↗</i></NavLink>
}

function Home({ go }: { go: (path: string) => void }) {
  const [query, setQuery] = useState('')
  const matches = tools.filter((item) => `${item.title} ${item.summary}`.toLowerCase().includes(query.toLowerCase()))
  return <main id="main-content">
    <section className="hero">
      <div>
        <p className="eyebrow accent">DATE, CALENDAR & TIME UTILITY</p>
        <h1>Make sense of every moment.</h1>
        <p className="intro">Clear, reliable answers for the dates and times that shape plans, deadlines, events, and everyday life.</p>
        <NavLink to="/calculators" go={go} className="primary">Explore calculators <span>→</span></NavLink>
        <NavLink to="/guides" go={go} className="quiet">Read the guides</NavLink>
      </div>
      <aside className="hero-note">
        <small>THE DATEPILOT APPROACH</small>
        <strong>Calculate first.<br />Understand next.</strong>
        <p>Each tool shows the answer, its assumptions, and the useful next step.</p>
      </aside>
    </section>
    <section className="finder">
      <p className="eyebrow">START WITH A QUESTION</p>
      <h2>What are you working out?</h2>
      <label><span>⌕</span><input id="finder" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search date, week, age, timezone..." /></label>
      {query && <div className="matches">{matches.length ? matches.map((item) => <NavLink key={item.slug} to={toolPath(item)} go={go}>{item.title}<small>{item.category}</small></NavLink>) : <p>No matching tool yet. Try "date", "week", or "time".</p>}</div>}
    </section>
    <section className="section">
      <div className="section-head">
        <div><p className="eyebrow">POPULAR STARTING POINTS</p><h2>Tools that do the work</h2></div>
        <NavLink className="text-link" to="/calculators" go={go}>View all tools →</NavLink>
      </div>
      <div className="tool-grid">{tools.map((tool) => <Card key={tool.slug} tool={tool} go={go} />)}</div>
    </section>
    <section className="principles">
      <div><p className="eyebrow">WHY DATEPILOT</p><h2>Answers you can inspect.</h2></div>
      <div>
        <article><b>01</b><h3>Plain language</h3><p>We explain what a number means, not just what it is.</p></article>
        <article><b>02</b><h3>Visible assumptions</h3><p>Calendar and timezone conventions are stated where they matter.</p></article>
        <article><b>03</b><h3>Useful next steps</h3><p>Related calculators and guides help you continue without starting over.</p></article>
      </div>
    </section>
  </main>
}

function Calculator({ tool }: { tool: Tool }) {
  const [start, setStart] = useState(today())
  const [end, setEnd] = useState(today())
  const [amount, setAmount] = useState('10')
  const [year, setYear] = useState(String(new Date().getFullYear()))
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  if (tool.slug === 'time-difference' || tool.slug === 'time-zone-converter') return <EnhancedCalculator tool={tool} />

  const calculate = () => {
    setError(''); setResult('')
    const a = localDate(start); const b = localDate(end); const n = Number(amount)
    if (tool.slug === 'leap-year') {
      const value = Number(year)
      if (!value || value < 1) return setError('Please enter a valid year (1 or higher).')
      return setResult(value % 400 === 0 || (value % 4 === 0 && value % 100 !== 0) ? `${value} is a leap year with 366 days.` : `${value} is not a leap year. It has 365 days.`)
    }
    if (Number.isNaN(a.getTime())) return setError('Please enter a valid start date.')
    if (tool.slug === 'add-days') return setResult(prettyDate(shiftDays(a, n)))
    if (tool.slug === 'subtract-days') return setResult(prettyDate(shiftDays(a, -n)))
    if (tool.slug === 'date-calculator') return setResult(prettyDate(shiftDays(a, n)))
    if (tool.slug === 'days-calculator') {
      if (Number.isNaN(n)) return setError('Please enter a valid number of days.')
      const count = Math.abs(n)
      const after = shiftDays(a, count); const before = shiftDays(a, -count)
      return setResult(`After: ${prettyDate(after)} (${weekday(after)})\nBefore: ${prettyDate(before)} (${weekday(before)})`)
    }
    if (tool.slug === 'days-between-dates') {
      if (Number.isNaN(b.getTime())) return setError('Please enter a valid end date.')
      return setResult(`${Math.abs(dayGap(a, b))} days`)
    }
    if (tool.slug === 'age-calculator') {
      if (Number.isNaN(b.getTime())) return setError('Please enter a valid target date.')
      if (b < a) return setError('The target date must be after the birth date.')
      let years = b.getFullYear() - a.getFullYear(); let months = b.getMonth() - a.getMonth(); let days = b.getDate() - a.getDate()
      let borrowed = 0
      while (days < 0 && borrowed < 12) { months -= 1; borrowed += 1; days += new Date(b.getFullYear(), b.getMonth() - borrowed + 1, 0).getDate() }
      if (months < 0) { years -= 1; months += 12 }
      return setResult(`${years} years, ${months} months, ${days} days`)
    }
    if (tool.slug === 'day-of-week') return setResult(weekday(a))
    if (tool.slug === 'week-number') {
      const thursday = shiftDays(a, 3 - ((a.getDay() + 6) % 7))
      const first = new Date(thursday.getFullYear(), 0, 1)
      return setResult(`ISO week ${Math.floor(dayGap(first, thursday) / 7) + 1}, ${thursday.getFullYear()}`)
    }
    if (tool.slug === 'working-days') {
      if (Number.isNaN(b.getTime())) return setError('Please enter a valid end date.')
      const from = a <= b ? a : b; const to = a <= b ? b : a
      let count = 0; let cursor = new Date(from)
      while (cursor <= to) { if (cursor.getDay() > 0 && cursor.getDay() < 6) count++; cursor = shiftDays(cursor, 1) }
      return setResult(`${count} working days`)
    }
    if (tool.slug === 'countdown') {
      const remaining = new Date(`${end}T17:00`).getTime() - Date.now()
      return setResult(remaining > 0 ? `${Math.floor(remaining / 86400000)} days, ${Math.floor((remaining % 86400000) / 3600000)} hours remaining` : 'That date has passed.')
    }
  }

  const reset = () => { setStart(today()); setEnd(today()); setAmount('10'); setYear(String(new Date().getFullYear())); setResult(''); setError('') }

  const field = (label: string, value: string, setter: (value: string) => void, type = 'date') => (
    <label className="field"><span>{label}</span><input type={type} value={value} onChange={(event) => setter(event.target.value)} /></label>
  )

  const startLabel = tool.slug === 'age-calculator' ? 'Birth date' : tool.slug === 'days-calculator' ? 'Reference date' : 'Start date'
  const endLabel = tool.slug === 'age-calculator' || tool.slug === 'countdown' ? 'Target date' : 'End date'
  const needsEnd = ['days-between-dates', 'age-calculator', 'working-days', 'countdown'].includes(tool.slug)
  const needsDays = ['add-days', 'subtract-days', 'date-calculator', 'days-calculator'].includes(tool.slug)

  return <div className="calculator">
    <div className="form-grid">
      {tool.slug === 'leap-year'
        ? <label className="field"><span>Calendar year</span><input type="number" value={year} onChange={(event) => setYear(event.target.value)} min="1" /></label>
        : <>{tool.slug !== 'countdown' && field(startLabel, start, setStart)}{needsEnd && field(endLabel, end, setEnd)}{needsDays && <label className="field"><span>Days</span><input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} /></label>}</>
      }
    </div>
    <div className="calculator-actions">
      <button className="primary" onClick={calculate}>Calculate result <span>→</span></button>
      <button className="reset-btn" onClick={reset} type="button">Reset</button>
    </div>
    {error && <p className="error" role="alert">{error}</p>}
    {result && <div className="result" aria-live="polite"><span className="eyebrow accent">YOUR RESULT</span><strong>{result}</strong><p>{tool.method}</p></div>}
  </div>
}

function EnhancedCalculator({ tool }: { tool: Tool }) {
  const [start, setStart] = useState(`${today()}T09:00`)
  const [end, setEnd] = useState(`${today()}T17:00`)
  const [sourceZone, setSourceZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [destinationZone, setDestinationZone] = useState('UTC')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const zones = [sourceZone, 'UTC', 'America/New_York', 'Europe/London', 'Europe/Paris', 'Asia/Kolkata', 'Asia/Tokyo', 'Asia/Dubai', 'Australia/Sydney', 'America/Los_Angeles', 'Europe/Berlin'].filter((zone, index, list) => list.indexOf(zone) === index)

  const calculate = () => {
    setError(''); setResult('')
    const first = new Date(start).getTime(); const second = new Date(end).getTime()
    if (!Number.isFinite(first) || !Number.isFinite(second)) return setError('Please enter both date and time values.')
    if (tool.slug === 'time-difference') {
      const minutes = Math.round(Math.abs(second - first) / 60000)
      return setResult(`${Math.floor(minutes / 60)} hours, ${minutes % 60} minutes${second < first ? ' (first is later)' : ''}`)
    }
    const instant = zoneToUtc(new Date(first), sourceZone)
    const converted = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: destinationZone }).format(instant)
    return setResult(`${converted} in ${destinationZone}`)
  }

  const reset = () => { setStart(`${today()}T09:00`); setEnd(`${today()}T17:00`); setResult(''); setError('') }

  const field = (label: string, value: string, setter: (value: string) => void) => (
    <label className="field"><span>{label}</span><input type="datetime-local" value={value} onChange={(event) => setter(event.target.value)} /></label>
  )

  return <div className="calculator">
    <div className="form-grid">
      {field(tool.slug === 'time-difference' ? 'First date and time' : 'Local date and time', start, setStart)}
      {field(tool.slug === 'time-difference' ? 'Second date and time' : 'Source date and time', end, setEnd)}
      {tool.slug === 'time-zone-converter' && <>
        <label className="field"><span>Source time zone</span><select value={sourceZone} onChange={(event) => setSourceZone(event.target.value)}>{zones.map((zone) => <option key={zone}>{zone}</option>)}</select></label>
        <label className="field"><span>Destination time zone</span><select value={destinationZone} onChange={(event) => setDestinationZone(event.target.value)}>{zones.map((zone) => <option key={zone}>{zone}</option>)}</select></label>
      </>}
    </div>
    <div className="calculator-actions">
      <button className="primary" onClick={calculate}>Calculate result <span>→</span></button>
      <button className="reset-btn" onClick={reset} type="button">Reset</button>
    </div>
    {error && <p className="error" role="alert">{error}</p>}
    {result && <div className="result" aria-live="polite"><span className="eyebrow accent">YOUR RESULT</span><strong>{result}</strong><p>{tool.method}</p></div>}
  </div>
}

function Breadcrumbs({ items, go }: { items: [string, string][]; go: (p: string) => void }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb">
    <NavLink to="/" go={go}>Home</NavLink>
    {items.map(([label, url], i) => {
      const isLast = i === items.length - 1
      return isLast
        ? <span key={url} aria-current="page">{label}</span>
        : <span key={url}><span aria-hidden="true">/</span> <NavLink to={url} go={go}>{label}</NavLink></span>
    })}
  </nav>
}

function RichText({ text, go }: { text: string; go: (path: string) => void }) {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g)
  return <>{parts.map((part, index) => {
    if (index % 3 === 1) return <NavLink key={index} className="inline-link" to={parts[index + 1]} go={go}>{part}</NavLink>
    if (index % 3 === 2) return null
    return part ? <span key={index}>{part}</span> : null
  })}</>
}

function renderBlocks(blocks: Block[], go: (path: string) => void) {
  return blocks.map((block, index) => {
    switch (block.type) {
      case 'p': return <p key={index}><RichText text={block.text} go={go} /></p>
      case 'h3': return <h3 key={index}>{block.text}</h3>
      case 'ol': return <ol key={index}>{block.items.map((item) => <li key={item}><RichText text={item} go={go} /></li>)}</ol>
      case 'ul': return <ul key={index}>{block.items.map((item) => <li key={item}><RichText text={item} go={go} /></li>)}</ul>
      case 'table': return <div className="table-wrap" key={index}>
        <table>
          <thead><tr>{block.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
          <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      case 'note': return <p className="note" key={index}><strong>Note: </strong><RichText text={block.text} go={go} /></p>
      case 'component': return <DynamicBlock key={index} name={block.name} />
      default: return null
    }
  })
}

function ToolPage({ tool, go }: { tool: Tool; go: (path: string) => void }) {
  const content = toolContent[tool.slug]
  const related = content.related.map((slug) => tools.find((item) => item.slug === slug)).filter((item): item is Tool => Boolean(item)).slice(0, 4)
  const categoryPath = tool.category === 'Time' ? '/time' : tool.category === 'Calendar' ? '/calendar' : '/calculators'

  return <main className="page" id="main-content">
    <Breadcrumbs items={[['Tools', categoryPath], [tool.title, toolPath(tool)]]} go={go} />
    <p className="eyebrow accent">{tool.category.toUpperCase()} TOOL</p>
    <h1>{tool.title}</h1>
    <p className="lead">{content.answer}</p>
    <Calculator tool={tool} />
    <section className="seo-content">
      {content.intro.map((paragraph) => <p key={paragraph}><RichText text={paragraph} go={go} /></p>)}
      <h2>How to Use the {tool.title}</h2>
      <ol>{content.howTo.map((step) => <li key={step}><RichText text={step} go={go} /></li>)}</ol>
    </section>
    {content.sections.map((section) => <section className="seo-content" key={section.heading}>
      <h2>{section.heading}</h2>
      {renderBlocks(section.blocks, go)}
    </section>)}
    <section className="seo-content">
      <h2>Related Calculators</h2>
      <div className="link-grid">{related.map((item) => <NavLink className="related" key={item.slug} to={toolPath(item)} go={go}>{item.title} ↗</NavLink>)}</div>
      <h2>Related Guides</h2>
      <div className="link-grid">{content.guideSlugs.map((slug) => { const guide = guides.find((item) => item.slug === slug); return guide ? <NavLink className="related" key={slug} to={`/guides/${slug}`} go={go}>{guide.title} ↗</NavLink> : null })}</div>
    </section>
    {content.faqs.length > 0 && <section className="seo-content">
      <h2>Frequently Asked Questions</h2>
      {content.faqs.map(([question, answer]) => <div key={question} className="faq-item">
        <h3>{question}</h3>
        <p><RichText text={answer} go={go} /></p>
      </div>)}
    </section>}
  </main>
}

function ToolIndex({ category, go }: { category?: Tool['category']; go: (path: string) => void }) {
  const list = category ? tools.filter((tool) => tool.category === category) : tools
  const title = category === 'Time' ? 'Put every time zone in context.' : category === 'Calendar' ? 'See the shape of the calendar.' : category === 'Date' ? 'Work with dates, without the guesswork.' : 'All the tools, in one place.'
  const explanation = category === 'Time' ? 'Compare elapsed time, count down to a moment, and convert local times using named time zones.' : category === 'Calendar' ? 'Check weekdays, ISO week numbers, and leap years using clearly stated calendar conventions.' : category === 'Date' ? 'Plan deadlines, compare date ranges, add or subtract days, and count working days.' : 'Start with the task you need to solve, then follow the method and related guidance on each tool page.'
  const breadcrumbLabel = category ? `${category} tools` : 'Calculators'
  return <main className="page" id="main-content">
    <Breadcrumbs items={[[breadcrumbLabel, category ? (category === 'Time' ? '/time' : category === 'Calendar' ? '/calendar' : '/calculators') : '/calculators']]} go={go} />
    <p className="eyebrow accent">{category ? `${category.toUpperCase()} TOOLKIT` : 'DATEPILOT TOOLKIT'}</p>
    <h1>{title}</h1>
    <p className="lead">{explanation}</p>
    <div className="tool-grid">{list.map((tool) => <Card key={tool.slug} tool={tool} go={go} />)}</div>
    <section className="seo-content">
      <h2>Choose a tool by the question you need to answer</h2>
      <p>{explanation} Each calculator explains its inputs, method, examples, limitations, and related next steps so the result is easier to interpret.</p>
      <p><NavLink className="text-link" to="/guides" go={go}>Read the DatePilot guides →</NavLink></p>
    </section>
  </main>
}

function Guides({ go }: { go: (path: string) => void }) {
  return <main className="page" id="main-content">
    <Breadcrumbs items={[['Guides', '/guides']]} go={go} />
    <p className="eyebrow accent">FIELD NOTES</p>
    <h1>Understand the rules behind the result.</h1>
    <p className="lead">Practical explanations for questions that calculators alone cannot answer.</p>
    <div className="guide-list">{guides.map((guide, index) => <NavLink key={guide.slug} to={`/guides/${guide.slug}`} go={go}>
      <span>{String(index + 1).padStart(2, '0')}</span><div><strong>{guide.title}</strong><p>{guide.description}</p></div><i>↗</i>
    </NavLink>)}</div>
  </main>
}

function GuidePage({ guide, go }: { guide: Page; go: (path: string) => void }) {
  const content = guideContent[guide.slug]
  return <main className="page article" id="main-content">
    <Breadcrumbs items={[['Guides', '/guides'], [guide.title, `/guides/${guide.slug}`]]} go={go} />
    <p className="eyebrow accent">DATEPILOT FIELD NOTE</p>
    <h1>{guide.title}</h1>
    <p className="lead">{content.answer}</p>
    {content.sections.map(([heading, paragraph]) => <section className="seo-content" key={heading}><h2>{heading}</h2><p>{paragraph}</p></section>)}
    <section className="seo-content">
      <h2>Related DatePilot Tools</h2>
      <div className="link-grid">{content.toolSlugs.map((slug) => { const tool = tools.find((item) => item.slug === slug); return tool ? <NavLink className="related" key={slug} to={toolPath(tool)} go={go}>{tool.title} ↗</NavLink> : null })}</div>
    </section>
    <section className="seo-content">
      <h2>Continue Reading</h2>
      <div className="link-grid">
        {guides.filter((g) => g.slug !== guide.slug && content.toolSlugs.some((ts) => guideContent[g.slug]?.toolSlugs.includes(ts))).slice(0, 3).map((g) => <NavLink className="related" key={g.slug} to={`/guides/${g.slug}`} go={go}>{g.title} ↗</NavLink>)}
      </div>
    </section>
    <p style={{ marginTop: '32px' }}><NavLink className="primary" to="/calculators" go={go}>Explore the calculators <span>→</span></NavLink></p>
  </main>
}

function Faq({ go }: { go: (path: string) => void }) {
  return <main className="page article" id="main-content">
    <Breadcrumbs items={[['FAQ', '/faq']]} go={go} />
    <p className="eyebrow accent">DATEPILOT FAQ</p>
    <h1>Common questions about dates and time.</h1>
    <section className="seo-content">
      <h2>Are DatePilot results official?</h2>
      <p>No. DatePilot provides general calculations and explanations. Verify consequential deadlines, contracts, employment dates, travel requirements, and legal matters with the responsible authority.</p>
    </section>
    <section className="seo-content">
      <h2>Why can date calculations differ?</h2>
      <p>Different answers may use different endpoint conventions, calendar rules, holiday lists, or timezone assumptions. Each tool states its method beside the result. For a practical example, read <NavLink className="inline-link" to="/guides/date-calculations" go={go}>how date calculations work</NavLink>.</p>
    </section>
    <section className="seo-content">
      <h2>Does "days between dates" include the start date?</h2>
      <p>DatePilot's Days Between Dates tool reports an exclusive elapsed gap. An inclusive schedule count is a different convention, so check the <NavLink className="inline-link" to="/calculators/days-between-dates" go={go}>Days Between Dates calculator</NavLink> and its explanation before using the result for a deadline or booking.</p>
    </section>
    <section className="seo-content">
      <h2>Are working days the same as business days?</h2>
      <p>Not always. DatePilot's default working-day rule counts Monday through Friday and does not silently apply a country-specific holiday calendar. Read <NavLink className="inline-link" to="/guides/working-days" go={go}>Working Days Explained</NavLink> when holidays or regional schedules matter.</p>
    </section>
    <section className="seo-content">
      <h2>Why can a time-zone conversion change the date?</h2>
      <p>A local time near midnight can become the next or previous calendar date in another named zone. Use the <NavLink className="inline-link" to="/time/time-zone-converter" go={go}>Time Zone Converter</NavLink> with the specific event date so daylight-saving rules are considered.</p>
    </section>
    <section className="seo-content">
      <h2>Does DatePilot store my calculator inputs?</h2>
      <p>No. DatePilot calculators run entirely in your browser. Inputs are not sent to a server, stored in a database, or tracked. See the <NavLink className="inline-link" to="/privacy-policy" go={go}>Privacy Policy</NavLink> for details.</p>
    </section>
    <section className="seo-content">
      <h2>How does DatePilot handle daylight saving time?</h2>
      <p>DatePilot's time tools use your browser's IANA timezone data, which includes historical and daylight-saving rules for named time zones. Read <NavLink className="inline-link" to="/guides/daylight-saving-time" go={go}>Daylight Saving Time Explained</NavLink> for more.</p>
    </section>
    <section className="seo-content">
      <h2>Can I use DatePilot for legal or official purposes?</h2>
      <p>DatePilot provides general-purpose calculations. For legal, medical, financial, or official deadlines, verify the result with the responsible authority. Read the <NavLink className="inline-link" to="/disclaimer" go={go}>Disclaimer</NavLink>.</p>
    </section>
  </main>
}

function TrustPage({ kind, go }: { kind: string; go: (p: string) => void }) {
  const content: Record<string, { title: string; sections: [string, string][] }> = {
    about: {
      title: 'About DatePilot',
      sections: [
        ['What DatePilot is', 'DatePilot is a focused date, calendar, and time utility resource for people planning work, checking dates, comparing times, and learning the rules behind everyday calendar questions. The site is designed around a small set of useful tools rather than a large collection of unrelated calculators.'],
        ['Our approach to accuracy', 'We make calculations inspectable. Inputs are labeled, conventions are stated, and the explanation beside a result describes what it includes. DatePilot content is reviewed against reproducible examples and edge cases such as leap days, month boundaries, weekdays, and time zones.'],
        ['How DatePilot is built', 'DatePilot is built as a static web application. Calculator logic runs entirely in your browser using standard JavaScript date APIs and the browser\'s IANA timezone database. No data is sent to a server.'],
        ['What DatePilot is not', 'DatePilot is not an official government service, legal adviser, medical adviser, financial adviser, or substitute for the organization responsible for an important deadline or decision.'],
        ['Corrections', 'If you find an incorrect calculation, inaccurate explanation, broken link, or accessibility issue, please use the Contact page to report it. Correction reports help improve the site for everyone.'],
      ]
    },
    contact: {
      title: 'Contact DatePilot',
      sections: [
        ['Why contact us', 'Contact DatePilot to report an incorrect calculation, incorrect explanation, outdated information, broken link, accessibility issue, privacy question, or other technical problem. Correction reports are especially useful because they help us investigate reproducible cases.'],
        ['What to include', 'Include the page URL, the inputs you entered, the result you expected, the calendar or timezone convention involved, and a short description of the problem. Do not include sensitive personal information that is not needed to investigate the issue.'],
        ['How to reach us', 'Email us at support@datepilot.online with your report or question. We aim to respond within 5 business days. For urgent accessibility issues, please include "Accessibility" in the subject line.'],
        ['Response time', 'We review all messages and aim to respond within 5 business days. Calculation correction reports are prioritized because they may affect other users.'],
      ]
    },
    'privacy-policy': {
      title: 'Privacy Policy',
      sections: [
        ['Calculator behavior', 'All DatePilot calculators run entirely in your browser. The dates, times, and other values you enter are processed locally using JavaScript. No calculator inputs are transmitted to, stored on, or accessed by any server.'],
        ['Cookies', 'DatePilot may use essential cookies required for the site to function. If analytics or advertising services are enabled in the future, additional cookies may be used. Any such cookies will be described in this policy and the Cookie Policy before they are activated.'],
        ['Analytics', 'DatePilot may use privacy-respecting analytics to understand aggregate usage patterns such as which pages are visited. Analytics data does not identify you personally and is not used to track you across other sites.'],
        ['Advertising', 'DatePilot may display third-party advertisements in the future. If advertising is enabled, ad networks may use cookies or similar technologies to serve ads. You will be able to manage advertising cookies through the Cookie Policy and your browser settings.'],
        ['Third-party services', 'DatePilot may use third-party services for hosting, analytics, or advertising. These services may collect technical information such as your IP address, browser type, and the pages you visit, subject to their own privacy policies.'],
        ['Your choices', 'You can manage cookies through your browser settings. Blocking essential cookies may prevent the site from functioning correctly. You can opt out of personalized advertising where available through your browser or advertising opt-out tools.'],
        ['Children\'s privacy', 'DatePilot is not directed at children under 13 and does not knowingly collect personal information from children.'],
        ['Changes to this policy', 'This policy may be updated as DatePilot adds or changes features. The date at the top of this page indicates when it was last revised.'],
        ['Contact', 'For privacy questions, contact us using the methods on the Contact page.'],
      ]
    },
    'cookie-policy': {
      title: 'Cookie Policy',
      sections: [
        ['What cookies are', 'Cookies are small text files placed on your device by websites you visit. They help the site remember your preferences and understand how the site is used.'],
        ['Essential cookies', 'DatePilot may use essential cookies required for the site to function, such as remembering your preferences or maintaining session state. These cookies cannot be disabled without breaking site functionality.'],
        ['Analytics cookies', 'If analytics are enabled, DatePilot may use cookies to understand aggregate usage patterns. These cookies do not personally identify you and are used only to improve the site.'],
        ['Advertising cookies', 'If advertising is enabled in the future, ad networks may place cookies to serve relevant ads and measure ad performance. You will be able to manage these cookies through your browser settings.'],
        ['Managing cookies', 'You can control and delete cookies through your browser settings. Each browser has its own instructions. Blocking cookies may affect site functionality.'],
        ['Third-party cookies', 'Third-party services used by DatePilot (such as analytics or advertising providers) may set their own cookies. These are governed by the third party\'s own cookie policy.'],
        ['Changes', 'This policy may be updated as DatePilot changes its cookie usage. The date at the top indicates the last revision.'],
      ]
    },
    terms: {
      title: 'Terms of Use',
      sections: [
        ['Acceptance', 'By using DatePilot, you agree to these terms. If you do not agree, do not use the site.'],
        ['What DatePilot provides', 'DatePilot provides general-purpose date, calendar, and time calculation tools and explanatory content. Results are informational and should be verified for any consequential use.'],
        ['Not professional advice', 'DatePilot does not provide legal, medical, financial, or other professional advice. Use DatePilot results as a starting point and verify with the responsible authority when accuracy matters.'],
        ['Accuracy', 'DatePilot aims for accuracy but does not guarantee that all results are error-free. Calculation methods, calendar conventions, and timezone rules are stated on each tool page. Report errors using the Contact page.'],
        ['Availability', 'DatePilot is provided as-is and may be unavailable at times. We do not guarantee uninterrupted access.'],
        ['Limitation of liability', 'DatePilot is not liable for any decisions, losses, or damages resulting from use of the site or its calculations.'],
        ['Intellectual property', 'DatePilot content, design, and code are owned by DatePilot. You may link to DatePilot pages but may not copy or redistribute content without permission.'],
        ['Changes', 'These terms may be updated. The date at the top indicates the last revision.'],
      ]
    },
    disclaimer: {
      title: 'Disclaimer',
      sections: [
        ['General purpose only', 'DatePilot provides general-purpose date, calendar, and time calculations for informational use. Results are not guaranteed to be suitable for any specific purpose.'],
        ['Not official or legal advice', 'DatePilot is not a government agency, legal service, financial adviser, or medical service. Do not rely on DatePilot results for legal deadlines, tax filings, medical decisions, contractual obligations, or other consequential matters without verifying with the responsible authority.'],
        ['Accuracy', 'DatePilot uses standard calendar rules and browser timezone data. While we aim for accuracy, calculation errors may exist. Report errors using the Contact page.'],
        ['Third-party services', 'DatePilot may use third-party services for hosting, analytics, or advertising. DatePilot is not responsible for the actions of third-party services.'],
      ]
    },
    'report-an-error': {
      title: 'Report an Error',
      sections: [
        ['What to report', 'Report incorrect calculations, inaccurate explanations, broken links, accessibility barriers, privacy concerns, or any other problem you find on DatePilot.'],
        ['How to report', 'Email us at support@datepilot.online with the details below.'],
        ['What to include', 'Please include: (1) the page URL where you found the problem, (2) the inputs you used if it is a calculation error, (3) the result you expected and why, (4) the result DatePilot gave you, and (5) a short description of the issue.'],
        ['Accessibility issues', 'If you are reporting an accessibility barrier, please include "Accessibility" in the subject line so we can prioritize your report.'],
        ['What happens next', 'We review all reports and aim to respond within 5 business days. Calculation errors are prioritized. If we confirm an error, we will fix it and update the affected page.'],
      ]
    },
  }

  const page = content[kind]
  if (!page) return <main className="page article" id="main-content"><h1>Page not found.</h1></main>

  const breadcrumbLabel = page.title.replace('DatePilot — ', '').replace(' — DatePilot', '')

  return <main className="page article" id="main-content">
    <Breadcrumbs items={[[breadcrumbLabel, `/${kind}`]]} go={go} />
    <p className="eyebrow accent">DATEPILOT</p>
    <h1>{page.title}</h1>
    {page.sections.map(([heading, paragraph]) => <section className="seo-content legal-section" key={heading}><h2>{heading}</h2><p>{paragraph}</p></section>)}
    {kind === 'contact' && <div className="legal-review"><p><strong>Email:</strong> support@datepilot.online</p><p><strong>Response time:</strong> Within 5 business days</p></div>}
    {kind === 'report-an-error' && <div className="legal-review"><p><strong>Email:</strong> support@datepilot.online</p><p><strong>Subject line tip:</strong> Include "Accessibility" for accessibility issues</p></div>}
  </main>
}

function NotFound({ go }: { go: (path: string) => void }) {
  return <main className="page article" id="main-content">
    <p className="eyebrow accent">404</p>
    <h1>Page not found.</h1>
    <p>That DatePilot page does not exist. Return to the tools or browse the guides to find what you need.</p>
    <div className="not-found-links">
      <NavLink className="primary" to="/" go={go}>Back to home <span>→</span></NavLink>
      <NavLink to="/calculators" go={go}>Browse calculators</NavLink>
      <NavLink to="/guides" go={go}>Read the guides</NavLink>
    </div>
  </main>
}

function App() {
  const { path, go } = useRoute()
  const tool = tools.find((item) => toolPath(item) === path)
  const guide = guides.find((item) => `/guides/${item.slug}` === path)

  let page: React.ReactNode = <NotFound go={go} />
  if (path === '/') page = <Home go={go} />
  else if (path === '/calculators') page = <ToolIndex go={go} />
  else if (path === '/calendar') page = <ToolIndex category="Calendar" go={go} />
  else if (path === '/time') page = <ToolIndex category="Time" go={go} />
  else if (path === '/guides') page = <Guides go={go} />
  else if (path === '/faq') page = <Faq go={go} />
  else if (tool) page = <ToolPage key={tool.slug} tool={tool} go={go} />
  else if (guide) page = <GuidePage guide={guide} go={go} />
  else if (['about', 'contact', 'privacy-policy', 'cookie-policy', 'terms', 'disclaimer', 'report-an-error'].some((item) => path === `/${item}`)) page = <TrustPage kind={path.slice(1)} go={go} />

  return <div className="app">
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <Header go={go} />
    {page}
    <Footer go={go} />
  </div>
}

export default App
