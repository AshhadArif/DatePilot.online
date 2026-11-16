import { useEffect, useState, useCallback, useRef } from 'react'
import './App.css'
import { guideContent, toolContent } from './content'
import type { Block } from './content'
import { contentPages } from './content/pages'
import type { ContentPageData } from './content/pages'
import { toolTrust } from './content/trust'
import { DynamicBlock } from './DynamicBlocks'
import { RecurringDateCalculator, DeadlineCalculator, QuarterCalculator, DayOfYearCalculator, DateFormatConverter } from './NewTools'
import { addBusinessDays, addMonthsClamped, today, localDate, prettyDate, weekday, shiftDays, zoneToUtc, dayGap, unit, decompose } from './dateUtils'
import { lastmod } from './content/lastmod'
import {
  AUTHOR_NAME,
  AUTHOR_PATH,
  AUTHOR_ROLE,
  CONTACT_EMAIL,
  OPERATOR,
  SITE_LAUNCH_DATE,
  SITE_NAME,
  SITE_URL,
  authorRef,
  editorialTrustLinks,
  organizationNode,
  personNode,
  publisherRef,
} from './site'

type Tool = { slug: string; title: string; seoTitle: string; category: 'Date' | 'Calendar' | 'Time' | 'Convert'; summary: string; method: string }
type Page = { slug: string; title: string; description: string }

const tools: Tool[] = [
  { slug: 'date-calculator', title: 'Date Calculator', seoTitle: 'Date Calculator — Add or Subtract Days From a Date', category: 'Date', summary: 'Add calendar time to a starting date.', method: 'Calendar arithmetic is used for the result.' },
  { slug: 'age-calculator', title: 'Age Calculator', seoTitle: 'Age Calculator — Calculate Exact Age in Years, Months, Days', category: 'Date', summary: 'Find an exact age between two dates.', method: 'Age is counted by calendar anniversaries.' },
  { slug: 'age-difference-calculator', title: 'Age Difference Calculator', seoTitle: 'Age Difference Calculator — Gap Between Two Birth Dates', category: 'Date', summary: 'Find the age gap between two people.', method: 'The gap is counted by calendar anniversaries, in either input order.' },
  { slug: 'days-between-dates', title: 'Days Between Dates', seoTitle: 'Days Between Dates — Date Difference Calculator', category: 'Date', summary: 'Measure the elapsed days between dates.', method: 'The result excludes both named endpoints.' },
  { slug: 'days-calculator', title: 'Days Calculator', seoTitle: 'Days Calculator — Days From Today, Before & Between Dates', category: 'Date', summary: 'Find dates from a day count in either direction.', method: 'Both directions are calculated from the reference date.' },
  { slug: 'add-days', title: 'Add Days to Date', seoTitle: 'Add Days to Date — Calculate a Future Date in Days', category: 'Date', summary: 'Find a future date by adding days.', method: 'The result moves through calendar dates.' },
  { slug: 'subtract-days', title: 'Subtract Days from Date', seoTitle: 'Subtract Days From Date — Calculate a Date in the Past', category: 'Date', summary: 'Find an earlier date by subtracting days.', method: 'Month and year boundaries are handled as calendar dates.' },
  { slug: 'working-days', title: 'Working Days Calculator', seoTitle: 'Working Days Calculator — Count Business Days Between Dates', category: 'Date', summary: 'Count weekdays between two dates.', method: 'Monday through Friday count; holidays are not assumed.' },
  { slug: 'business-date-calculator', title: 'Business Date Calculator', seoTitle: 'Business Date Calculator — Add or Subtract Business Days', category: 'Date', summary: 'Move a date forward or backward by business days.', method: 'Monday through Friday count; holidays are not assumed.' },
  { slug: 'recurring-date-calculator', title: 'Recurring Date Calculator', seoTitle: 'Recurring Date Calculator — Generate a Schedule of Dates', category: 'Date', summary: 'Generate a schedule of repeating dates.', method: 'Occurrences are spaced by calendar intervals from the first date.' },
  { slug: 'deadline-calculator', title: 'Deadline Calculator', seoTitle: 'Deadline Calculator — Forward and Reverse Deadline Planning', category: 'Date', summary: 'Plan a deadline forward or work backward from one.', method: 'Forward adds the duration to the start; backward subtracts it from the deadline.' },
  { slug: 'day-of-week', title: 'Day of the Week Calculator', seoTitle: 'Day of the Week Calculator — What Day Was or Will Be', category: 'Calendar', summary: 'Discover the weekday for a date.', method: 'Uses the proleptic Gregorian calendar.' },
  { slug: 'week-number', title: 'Week Number Calculator', seoTitle: 'Week Number Calculator — Current ISO Week Number', category: 'Calendar', summary: 'Find an ISO 8601 week and week-year.', method: 'ISO weeks start Monday and week 1 contains the first Thursday.' },
  { slug: 'leap-year', title: 'Leap Year Calculator', seoTitle: 'Leap Year Calculator — Is This Year a Leap Year?', category: 'Calendar', summary: 'Check whether a year has 366 days.', method: 'Centuries are leap years only when divisible by 400.' },
  { slug: 'quarter-calculator', title: 'Quarter Calculator', seoTitle: 'Quarter Calculator — Calendar and Fiscal Quarters', category: 'Calendar', summary: 'Find the quarter for a date, or dates for a quarter.', method: 'Quarters are three calendar months measured from the fiscal year start.' },
  { slug: 'day-of-year', title: 'Day of Year Calculator', seoTitle: 'Day of Year Calculator — Ordinal Date and Days Left in Year', category: 'Calendar', summary: 'See the ordinal day and the days left in the year.', method: 'The ordinal day counts from 1 January; remaining days exclude the date itself.' },
  { slug: 'countdown', title: 'Countdown Calculator', seoTitle: 'Countdown Calculator — How Many Days Until a Date', category: 'Time', summary: 'See how much time remains until a moment.', method: 'Measures from this device clock to the target.' },
  { slug: 'time-since-calculator', title: 'Time Since Calculator', seoTitle: 'Time Since Calculator — Elapsed Time From a Date', category: 'Time', summary: 'See how much time has passed since a moment.', method: 'Measured live from this device clock.' },
  { slug: 'time-difference', title: 'Time Difference Calculator', seoTitle: 'Time Difference Calculator — Time Between Two Times', category: 'Time', summary: 'Compare two date and time values.', method: 'Reports elapsed duration between local values.' },
  { slug: 'work-hours-calculator', title: 'Work Hours Calculator', seoTitle: 'Work Hours Calculator — Shift Duration With Breaks', category: 'Time', summary: 'Total a shift with unpaid breaks.', method: 'Overnight shifts count into the next day; breaks are subtracted.' },
  { slug: 'time-zone-converter', title: 'Time Zone Converter', seoTitle: 'Time Zone Converter — Convert Time Zones & UTC Offsets', category: 'Time', summary: 'Translate a date and time between zones.', method: 'Uses browser IANA timezone data.' },
  { slug: 'date-format-converter', title: 'Date Format Converter', seoTitle: 'Date Format Converter — ISO 8601, US, and EU Dates', category: 'Convert', summary: 'Convert a date between the common numeric formats.', method: 'The selected day/month order resolves ambiguous numeric dates.' },
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
  ['leap-seconds', 'Leap Seconds Explained', 'Why leap seconds were added, how UTC handles them, and why they are ending in 2027.'],
  ['unix-time', 'Unix Time Explained', 'How epoch timestamps count seconds since 1970, the 2038 problem, and leap-second handling.'],
  ['week-numbering-systems', 'Week Numbering Systems Explained', 'ISO 8601 versus US conventions, first-day-of-week, week 1 rules, and 52- versus 53-week years.'],
].map(([slug, title, description]) => ({ slug, title, description }))

const toolPath = (tool: Tool) => tool.category === 'Calendar' ? `/calendar/${tool.slug}` : tool.category === 'Time' ? `/time/${tool.slug}` : tool.category === 'Convert' ? `/converters/${tool.slug}` : `/calculators/${tool.slug}`
const normalize = (path: string) => path.length > 1 ? path.replace(/\/$/, '') : path
const withSlash = (to: string) => {
  const queryIndex = to.indexOf('?')
  const pathPart = queryIndex === -1 ? to : to.slice(0, queryIndex)
  const query = queryIndex === -1 ? '' : to.slice(queryIndex)
  const base = pathPart.length > 1 && !pathPart.endsWith('/') ? `${pathPart}/` : pathPart
  return `${base}${query}`
}
const stripLinks = (text: string) => text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')

const reviewedLabel = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

function AuthorByline({ path, go, compact = false }: { path: string; go: (path: string) => void; compact?: boolean }) {
  const iso = lastmod[path]
  return <div className={compact ? 'byline byline-compact' : 'byline'}>
    <span className="byline-avatar" aria-hidden="true">F</span>
    <div className="byline-copy">
      <strong>By {AUTHOR_NAME}, {AUTHOR_ROLE}</strong>
      <span className="byline-links">
        <NavLink to="/editorial-policy" go={go}>Editorial standards</NavLink>
        <span aria-hidden="true">·</span>
        <NavLink to="/methodology" go={go}>How we test</NavLink>
        <span aria-hidden="true">·</span>
        <NavLink to={AUTHOR_PATH} go={go}>About the editor</NavLink>
      </span>
    </div>
    {iso && <span className="byline-date">Last reviewed <b>{reviewedLabel(iso)}</b></span>}
  </div>
}

type Seo = { title: string; description: string; type: string; notFound?: boolean }
const routeSeo = (path: string): Seo => {
  const tool = tools.find((item) => toolPath(item) === path)
  const guide = guides.find((item) => `/guides/${item.slug}` === path)
  if (tool) return { title: tool.seoTitle, description: stripLinks(toolContent[tool.slug]?.answer ?? tool.summary), type: 'WebApplication' }
  if (guide) return { title: guide.title, description: stripLinks(guideContent[guide.slug]?.answer ?? guide.description), type: 'Article' }
  const pages: Record<string, { title: string; description: string; type?: string }> = {
    '/': { title: 'DatePilot — Date, Calendar, and Time Tools', description: 'Free date calculators, calendar tools, and time utilities. Calculate dates, age, working days, week numbers, and time zones with clear explanations.' },
    '/calculators': { title: 'Date and Time Calculators', description: 'Use DatePilot calculators to add or subtract days, count working days, find age, and calculate date differences with clear methodology.' },
    '/calendar': { title: 'Calendar Tools — Weekdays, Week Numbers, Leap Years', description: 'Check weekdays, ISO week numbers, and leap years using DatePilot calendar tools with clearly stated conventions.' },
    '/time': { title: 'Time Tools — Countdown, Time Difference, Time Zone Converter', description: 'Count down to a date, compare elapsed time, and convert between time zones using DatePilot time tools.' },
    '/converters': { title: 'Date Conversion Tools — Formats Made Clear', description: 'Convert dates between ISO 8601, US, and European formats with an explicit day and month order so ambiguous dates stay clear.' },
    '/guides': { title: 'Date and Time Guides — Calculations, Calendars, Time Zones', description: 'Practical explanations for date calculations, calendar rules, time zones, and date formats.' },
    '/faq': { title: 'Frequently Asked Questions — DatePilot', description: 'Answers about DatePilot calculations, endpoint conventions, privacy, and how date tools work.' },
    '/about': { title: 'About DatePilot — Our Approach to Date Calculations', description: 'Learn who runs DatePilot, how the site is funded, how calculators are checked, and how corrections are handled.' },
    '/about/author': { title: 'About the Editor — DatePilot', description: 'Fahad is the founder and editor of DatePilot. Read his role, areas of focus, editorial process, and how to report a correction.', type: 'ProfilePage' },
    '/editorial-policy': { title: 'Editorial Standards and Review Process — DatePilot', description: 'How DatePilot researches, writes, checks, reviews, and corrects its date calculators and guides, including its use of automation.' },
    '/methodology': { title: 'How DatePilot Tests Its Calculators — Methodology', description: 'The calculation pipeline, test strategy, reproducible examples, known limitations, and tool-by-tool verification focus behind DatePilot.' },
    '/changelog': { title: 'DatePilot Changelog — Site and Content History', description: 'A dated record of material changes to DatePilot calculators, guides, sources, policies, and trust pages.' },
    '/advertising-policy': { title: 'Advertising and Editorial Independence — DatePilot', description: 'How DatePilot is funded by Google AdSense, how ads are kept separate from content, and how to control personalised advertising.' },
    '/contact': { title: 'Contact DatePilot — Report Issues and Corrections', description: 'Report incorrect calculations, broken links, accessibility issues, or other problems with DatePilot.' },
    '/privacy-policy': { title: 'Privacy Policy — How DatePilot Handles Your Data', description: 'DatePilot calculators run in your browser. Read how we handle calculator inputs, Google AdSense advertising, cookies, and server logs.' },
    '/cookie-policy': { title: 'Cookie Policy — Which Cookies DatePilot Uses', description: 'Learn which first-party and Google AdSense advertising cookies may be set when you use DatePilot, and how to control them.' },
    '/terms': { title: 'Terms of Use — DatePilot', description: 'Read the terms governing use of DatePilot date and time calculation tools, including advertising and third-party links.' },
    '/disclaimer': { title: 'Disclaimer — DatePilot', description: 'DatePilot provides general calculations, not official or legal advice. Read important disclaimers.' },
    '/report-an-error': { title: 'Report an Error — DatePilot', description: 'Found an incorrect calculation, broken link, or accessibility problem? Report it to DatePilot.' },
  }
  const seo = pages[path] ?? { title: 'Page Not Found — DatePilot', description: 'This DatePilot page does not exist.', notFound: true }
  return { ...seo, type: seo.type ?? 'WebPage' }
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
  setMeta('name', 'author', AUTHOR_NAME)
  setMeta('name', 'description', seo.description)
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', seo.title)
  setMeta('name', 'twitter:description', seo.description)
  setMeta('name', 'twitter:image', `${SITE_URL}/og-image.png`)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:title', seo.title)
  setMeta('property', 'og:description', seo.description)
  setMeta('property', 'og:url', canonical)
  setMeta('property', 'og:image', `${SITE_URL}/og-image.png`)
  setMeta('property', 'og:site_name', 'DatePilot')

  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  const notFound = seo.notFound === true
  if (notFound) {
    setMeta('name', 'robots', 'noindex, follow')
    document.head.querySelector('meta[property="og:url"]')?.remove()
    if (link) { link.remove(); link = null }
  } else {
    setMeta('name', 'robots', 'index, follow')
    setMeta('property', 'og:url', canonical)
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = canonical
  }

  let schema = document.head.querySelector('#datepilot-schema') as HTMLScriptElement | null
  if (!schema) { schema = document.createElement('script'); schema.id = 'datepilot-schema'; schema.type = 'application/ld+json'; document.head.appendChild(schema) }

  const schemaType = 'type' in seo ? seo.type : 'WebPage'
  const reviewed = lastmod[path]
  const pageNode: Record<string, unknown> = {
    '@type': schemaType,
    '@id': `${canonical}#page`,
    name: seo.title,
    description: seo.description,
    url: canonical,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en',
    isAccessibleForFree: true,
    datePublished: SITE_LAUNCH_DATE,
    author: authorRef,
    publisher: publisherRef,
    reviewedBy: authorRef,
    mainEntityOfPage: canonical,
  }
  if (reviewed) pageNode.dateModified = reviewed

  const currentTool = tools.find((t) => toolPath(t) === path)
  if (currentTool) {
    pageNode.applicationCategory = 'UtilityApplication'
    pageNode.operatingSystem = 'Any modern web browser'
    pageNode.browserRequirements = 'Requires JavaScript for calculator interaction; the explanation is available without it.'
    pageNode.offers = { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
    const sources = toolContent[currentTool.slug]?.sources
    if (sources?.length) pageNode.citation = sources.map(([, url]) => url)
  }

  const currentGuide = guides.find((g) => `/guides/${g.slug}` === path)
  if (currentGuide) {
    pageNode.headline = currentGuide.title
    pageNode.articleSection = 'Date and time guides'
    const sources = guideContent[currentGuide.slug]?.sources
    if (sources?.length) pageNode.citation = sources.map(([, url]) => url)
  }

  if (path === AUTHOR_PATH) pageNode.mainEntity = authorRef
  if (path === AUTHOR_PATH) pageNode.about = authorRef

  const graph: Record<string, unknown>[] = [pageNode, organizationNode, personNode]

  if (path === '/') {
    graph.push({
      '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, url: SITE_URL, publisher: publisherRef, inLanguage: 'en',
      potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/calculators/?query={search_term_string}`, 'query-input': 'required name=search_term_string' }
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

  // FAQ schema for tool pages that have FAQs
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

  // FAQ schema for the editorial and methodology pages
  const pageData = contentPages[path.slice(1)]
  if (pageData?.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      name: `${pageData.title} — Frequently Asked Questions`,
      description: seo.description,
      mainEntity: pageData.faqs.map(([q, a]) => ({
        '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: stripLinks(a) }
      }))
    })
  }

  // HowTo schema for guide pages
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

  // BreadcrumbList schema for all pages except homepage
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
        breadcrumbItems.push({ position, name: segmentSeo.title.split(' — ')[0].split(' | ')[0], item: `${SITE_URL}${builtPath}/` })
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

function useRoute(initialPath?: string) {
  const [path, setPath] = useState(normalize(initialPath ?? (typeof window === 'undefined' ? '/' : window.location.pathname)))
  useEffect(() => {
    if (typeof window === 'undefined') return
    const listener = () => setPath(normalize(window.location.pathname))
    window.addEventListener('popstate', listener)
    return () => window.removeEventListener('popstate', listener)
  }, [])
  useEffect(() => { if (typeof window !== 'undefined') updateSeo(path) }, [path])
  const go = useCallback((next: string) => {
    if (typeof window === 'undefined') return
    window.history.pushState({}, '', withSlash(next))
    setPath(normalize(next.split('?')[0] || '/'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return { path, go }
}

function NavLink({ to, go, children, className }: { to: string; go: (p: string) => void; children: React.ReactNode; className?: string }) {
  return <a href={withSlash(to)} className={className} onClick={(e) => { e.preventDefault(); go(to) }}>{children}</a>
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
      <NavLink to="/converters" go={navigate}>Converters</NavLink>
      <NavLink to="/guides" go={navigate}>Guides</NavLink>
      <NavLink to="/about" go={navigate}>About</NavLink>
    </nav>
    <NavLink to="/calculators?query=" go={navigate} className="find-button">Find a tool <small>⌘ K</small></NavLink>
  </header>
}

function Footer({ go }: { go: (path: string) => void }) {
  const link = (path: string, label: string) => <NavLink to={path} go={go}>{label}</NavLink>
  return <footer>
    <div>
      <NavLink to="/" go={go} className="brand"><b>DP</b><span>DatePilot<span className="dot">.</span></span></NavLink>
      <p>Useful answers for dates, calendars, and time.</p>
      <p className="footer-small">Independent and funded by advertising. Advertisers do not influence our calculations or explanations.</p>
    </div>
    <div className="footer-columns">
      <div><small>Explore</small>{link('/calculators', 'Calculators')}{link('/calendar', 'Calendar')}{link('/time', 'Time')}{link('/converters', 'Converters')}{link('/guides', 'Guides')}{link('/faq', 'FAQ')}</div>
      <div><small>Trust & editorial</small>{link('/about', 'About')}{link(AUTHOR_PATH, 'About the editor')}{link('/editorial-policy', 'Editorial standards')}{link('/methodology', 'How we test')}{link('/changelog', 'Changelog')}{link('/advertising-policy', 'Advertising policy')}</div>
      <div><small>Support</small>{link('/contact', 'Contact')}{link('/report-an-error', 'Report an error')}{link('/disclaimer', 'Disclaimer')}</div>
      <div><small>Legal</small>{link('/privacy-policy', 'Privacy Policy')}{link('/cookie-policy', 'Cookie Policy')}{link('/terms', 'Terms of Use')}</div>
    </div>
    <small className="footer-note">Built for clarity. Calculator inputs stay in your browser. Last reviewed {reviewedLabel('2026-11-16')}.</small>
  </footer>
}

function Card({ tool, go }: { tool: Tool; go: (path: string) => void }) {
  return <NavLink to={toolPath(tool)} go={go} className="tool-card"><span className="eyebrow">{tool.category} tool</span><strong>{tool.title}</strong><span>{tool.summary}</span><i>↗</i></NavLink>
}

function Home({ go }: { go: (path: string) => void }) {
  const [query, setQuery] = useState('')
  const matches = tools.filter((item) => `${item.title} ${item.summary}`.toLowerCase().includes(query.toLowerCase()))
  return <main id="main-content" tabIndex={-1}>
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
      <label><span>⌕</span><input id="finder" type="search" aria-label="Search DatePilot tools" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search date, week, age, timezone..." /></label>
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
    <section className="trust-section">
      <div className="trust-intro">
        <p className="eyebrow">HOW THIS SITE IS RUN</p>
        <h2>Built independently. Reviewed before it ships.</h2>
        <p>DatePilot is written and maintained by {AUTHOR_NAME}, a {AUTHOR_ROLE.toLowerCase()} who focuses on date, calendar, and time calculations. Every calculator has a stated method, verified examples, and known limits. Pages are reviewed before publication and when a correction is confirmed.</p>
        <p>Advertising through Google AdSense keeps the site free. Advertisers have no input into tool logic, editorial wording, or which sources we cite.</p>
        <div className="trust-actions">
          <NavLink to={AUTHOR_PATH} go={go} className="primary">Meet the editor <span>→</span></NavLink>
          <NavLink to="/editorial-policy" go={go} className="quiet">Read the editorial standards</NavLink>
        </div>
      </div>
      <div className="trust-links">
        {editorialTrustLinks.map(([label, path, description]) => <NavLink key={path} to={path} go={go} className="trust-link">
          <strong>{label}</strong><span>{description}</span><i aria-hidden="true">↗</i>
        </NavLink>)}
      </div>
    </section>
  </main>
}

function Calculator({ tool }: { tool: Tool }) {
  const [start, setStart] = useState(today())
  const [end, setEnd] = useState(today())
  const [amount, setAmount] = useState('10')
  const [moveUnit, setMoveUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('days')
  const [year, setYear] = useState(String(new Date().getFullYear()))
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  if (tool.slug === 'time-difference' || tool.slug === 'time-zone-converter') return <EnhancedCalculator tool={tool} />
  if (tool.slug === 'business-date-calculator') return <BusinessDateCalculator />
  if (tool.slug === 'age-difference-calculator') return <AgeDifferenceCalculator />
  if (tool.slug === 'time-since-calculator') return <TimeSinceCalculator />
  if (tool.slug === 'work-hours-calculator') return <WorkHoursCalculator />
  if (tool.slug === 'recurring-date-calculator') return <RecurringDateCalculator />
  if (tool.slug === 'deadline-calculator') return <DeadlineCalculator />
  if (tool.slug === 'quarter-calculator') return <QuarterCalculator />
  if (tool.slug === 'day-of-year') return <DayOfYearCalculator />
  if (tool.slug === 'date-format-converter') return <DateFormatConverter />

  const calculate = () => {
    setError(''); setResult('')
    const a = localDate(start); const b = localDate(end); const n = Number(amount)
    if (tool.slug === 'leap-year') {
      const value = Number(year)
      if (!value || value < 1) return setError('Please enter a valid year (1 or higher).')
      return setResult(value % 400 === 0 || (value % 4 === 0 && value % 100 !== 0) ? `${value} is a leap year with 366 days.` : `${value} is not a leap year. It has 365 days.`)
    }
    if (Number.isNaN(a.getTime())) return setError('Please enter a valid start date.')
    if (tool.slug === 'add-days' || tool.slug === 'subtract-days' || tool.slug === 'date-calculator') {
      if (Number.isNaN(n)) return setError('Please enter a valid number to add.')
      const delta = tool.slug === 'subtract-days' ? -n : n
      const moved = moveUnit === 'months' ? addMonthsClamped(a, delta)
        : moveUnit === 'years' ? addMonthsClamped(a, delta * 12)
          : shiftDays(a, moveUnit === 'weeks' ? delta * 7 : delta)
      return setResult(`${prettyDate(moved)} (${weekday(moved)})`)
    }
    if (tool.slug === 'days-calculator') {
      if (Number.isNaN(n)) return setError('Please enter a valid number of days.')
      const count = Math.abs(n)
      const after = shiftDays(a, count); const before = shiftDays(a, -count)
      return setResult(`After: ${prettyDate(after)} (${weekday(after)})\nBefore: ${prettyDate(before)} (${weekday(before)})`)
    }
    if (tool.slug === 'days-between-dates') {
      if (Number.isNaN(b.getTime())) return setError('Please enter a valid end date.')
      const totalDays = Math.abs(dayGap(a, b))
      if (totalDays === 0) return setResult('0 days')
      const [earlier, later] = dayGap(a, b) >= 0 ? [a, b] : [b, a]
      const span = decompose(earlier, later)
      return setResult(`${totalDays.toLocaleString('en-GB')} days\n${unit(span.weeks, 'week')}, ${unit(span.restDays, 'day')}\n${unit(span.years, 'year')}, ${unit(span.months, 'month')}, ${unit(span.days, 'day')}\n${unit(span.totalMonths, 'month')}, ${unit(span.days, 'day')}`)
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
      const target = new Date(`${end}T17:00`)
      if (Number.isNaN(target.getTime())) return setError('Please enter a valid target date.')
      const remaining = target.getTime() - Date.now()
      if (remaining <= 0) return setResult(`The 17:00 target on ${prettyDate(target)} has passed.`)
      const days = Math.floor(remaining / 86400000)
      const hours = Math.floor((remaining % 86400000) / 3600000)
      return setResult(`${days} days, ${hours} hours remaining until 17:00 on ${prettyDate(target)}, your local time`)
    }
  }

  const reset = () => { setStart(today()); setEnd(today()); setAmount('10'); setMoveUnit('days'); setYear(String(new Date().getFullYear())); setResult(''); setError('') }

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
        : <>{tool.slug !== 'countdown' && field(startLabel, start, setStart)}{needsEnd && field(endLabel, end, setEnd)}{needsDays && <label className="field"><span>{moveUnit === 'days' ? 'Days' : moveUnit === 'weeks' ? 'Weeks' : moveUnit === 'months' ? 'Months' : 'Years'}</span><input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} /></label>}{['add-days', 'subtract-days', 'date-calculator'].includes(tool.slug) && <label className="field"><span>Unit</span>
          <select value={moveUnit} onChange={(event) => setMoveUnit(event.target.value as 'days' | 'weeks' | 'months' | 'years')}>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </label>}</>
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

function BusinessDateCalculator() {
  const [start, setStart] = useState(today())
  const [count, setCount] = useState('10')
  const [direction, setDirection] = useState<'after' | 'before'>('after')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const calculate = () => {
    setError(''); setResult('')
    const a = localDate(start)
    if (Number.isNaN(a.getTime())) return setError('Please enter a valid start date.')
    if (count.trim() === '') return setError('Please enter the number of business days.')
    const n = Number(count)
    if (!Number.isInteger(n)) return setError('Please enter a whole number of business days.')
    if (Math.abs(n) > 10000) return setError('Please enter 10,000 business days or fewer.')
    const cursor = addBusinessDays(a, Math.abs(n) * (direction === 'after' ? 1 : -1))
    const label = direction === 'after' ? 'After' : 'Before'
    const spanned = Math.abs(dayGap(a, cursor))
    const first = `${label} ${unit(Math.abs(n), 'business day')}: ${weekday(cursor)}, ${prettyDate(cursor)}`
    return setResult(spanned > 0 ? `${first}\n${unit(spanned, 'calendar day')} spanned (weekends included)` : first)
  }

  const reset = () => { setStart(today()); setCount('10'); setDirection('after'); setResult(''); setError('') }

  return <div className="calculator">
    <div className="form-grid">
      <label className="field"><span>Start date</span><input type="date" value={start} onChange={(event) => setStart(event.target.value)} /></label>
      <label className="field"><span>Business days</span><input type="number" value={count} onChange={(event) => setCount(event.target.value)} /></label>
      <label className="field"><span>Direction</span><select value={direction} onChange={(event) => setDirection(event.target.value as 'after' | 'before')}><option value="after">After (forward)</option><option value="before">Before (backward)</option></select></label>
    </div>
    <div className="calculator-actions">
      <button className="primary" onClick={calculate}>Calculate result <span>→</span></button>
      <button className="reset-btn" onClick={reset} type="button">Reset</button>
    </div>
    {error && <p className="error" role="alert">{error}</p>}
    {result && <div className="result" aria-live="polite"><span className="eyebrow accent">YOUR RESULT</span><strong>{result}</strong><p>Monday through Friday count; holidays are not assumed.</p></div>}
  </div>
}

function AgeDifferenceCalculator() {
  const [first, setFirst] = useState(today())
  const [second, setSecond] = useState(today())
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const calculate = () => {
    setError(''); setResult('')
    const a = localDate(first); const b = localDate(second)
    if (Number.isNaN(a.getTime())) return setError('Please enter a valid first birth date.')
    if (Number.isNaN(b.getTime())) return setError('Please enter a valid second birth date.')
    if (a.getTime() === b.getTime()) return setResult('Same birth date\n0 years, 0 months, 0 days apart')
    const [earlier, later, who] = a < b ? [a, b, 'The first birth date is older.'] : [b, a, 'The second birth date is older.']
    const gap = decompose(earlier, later)
    return setResult(`${unit(gap.years, 'year')}, ${unit(gap.months, 'month')}, ${unit(gap.days, 'day')}\n${unit(gap.totalDays, 'calendar day')} total\n${who}`)
  }

  const reset = () => { setFirst(today()); setSecond(today()); setResult(''); setError('') }

  const field = (label: string, value: string, setter: (value: string) => void) => (
    <label className="field"><span>{label}</span><input type="date" value={value} onChange={(event) => setter(event.target.value)} /></label>
  )

  return <div className="calculator">
    <div className="form-grid">
      {field('First birth date', first, setFirst)}
      {field('Second birth date', second, setSecond)}
    </div>
    <div className="calculator-actions">
      <button className="primary" onClick={calculate}>Calculate result <span>→</span></button>
      <button className="reset-btn" onClick={reset} type="button">Reset</button>
    </div>
    {error && <p className="error" role="alert">{error}</p>}
    {result && <div className="result" aria-live="polite"><span className="eyebrow accent">YOUR RESULT</span><strong>{result}</strong><p>Gap is counted by calendar anniversaries; inputs work in either order.</p></div>}
  </div>
}

function TimeSinceCalculator() {
  const [start, setStart] = useState(`${today()}T00:00`)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => { const id = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(id) }, [])

  const reset = () => setStart(`${today()}T00:00`)

  const startMs = new Date(start).getTime()
  const invalid = !start || start.length < 16 || !Number.isFinite(startMs)
  const future = !invalid && startMs > now.getTime()

  const startDate = invalid ? null : localDate(start.slice(0, 10))
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffMs = invalid || future ? 0 : now.getTime() - startMs
  const totalSeconds = Math.floor(diffMs / 1000)
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60) % 60
  const hours = Math.floor(totalSeconds / 3600) % 24
  const days = Math.floor(totalSeconds / 86400)
  const span = startDate && !future ? decompose(startDate, nowDate) : null
  const stamp = startDate ? `${weekday(startDate)}, ${prettyDate(startDate)}, ${start.slice(11, 16)}` : ''
  const live = span ? `${unit(span.years, 'year')}, ${unit(span.months, 'month')}, ${unit(span.days, 'day')}\n${unit(days, 'day')}, ${unit(hours, 'hour')}, ${unit(minutes, 'minute')}, ${unit(seconds, 'second')}\nSince ${stamp}` : ''

  return <div className="calculator">
    <div className="form-grid">
      <label className="field"><span>Time since</span><input type="datetime-local" value={start} onChange={(event) => setStart(event.target.value)} /></label>
    </div>
    <div className="calculator-actions">
      <button className="reset-btn" onClick={reset} type="button">Reset</button>
    </div>
    {invalid
      ? <p className="error" role="alert">Please enter a valid date and time.</p>
      : future
        ? <div className="result" aria-live="polite"><span className="eyebrow accent">NOT YET</span><strong>That moment has not happened yet.</strong><p>Enter a date and time in the past to measure the elapsed time.</p></div>
        : <div className="result"><span className="eyebrow accent">TIME SINCE</span><strong>{live}</strong><p>Refreshes every second from this device clock.</p></div>}
  </div>
}

function WorkHoursCalculator() {
  const [shiftStart, setShiftStart] = useState('09:00')
  const [shiftEnd, setShiftEnd] = useState('17:00')
  const [breakMinutes, setBreakMinutes] = useState('30')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const toMinutes = (value: string) => {
    const match = /^(\d{1,2}):(\d{2})$/.exec(value)
    if (!match) return NaN
    const hours = Number(match[1]); const minutes = Number(match[2])
    if (hours > 23 || minutes > 59) return NaN
    return hours * 60 + minutes
  }
  const fmt = (total: number) => `${unit(Math.floor(total / 60), 'hour')} ${unit(total % 60, 'minute')}`

  const calculate = () => {
    setError(''); setResult('')
    const from = toMinutes(shiftStart); const to = toMinutes(shiftEnd)
    if (Number.isNaN(from)) return setError('Please enter a valid start time.')
    if (Number.isNaN(to)) return setError('Please enter a valid end time.')
    if (breakMinutes.trim() === '') return setError('Please enter the break length in minutes.')
    const unpaid = Number(breakMinutes)
    if (!Number.isInteger(unpaid) || unpaid < 0) return setError('Please enter break minutes as a whole number of 0 or more.')
    let gross = to - from
    const overnight = gross < 0
    if (overnight) gross += 1440
    if (gross === 0) return setError('Start and end times are the same — enter the actual clock-out time.')
    if (unpaid >= gross) return setError('The break must be shorter than the shift.')
    const net = gross - unpaid
    const first = `${fmt(net)} worked — ${(net / 60).toFixed(2)} decimal hours`
    const second = `Gross shift ${fmt(gross)} · Break ${unpaid} minutes${overnight ? ' · Overnight' : ''}`
    return setResult(`${first}\n${second}`)
  }

  const reset = () => { setShiftStart('09:00'); setShiftEnd('17:00'); setBreakMinutes('30'); setResult(''); setError('') }

  const field = (label: string, value: string, setter: (value: string) => void, type = 'time') => (
    <label className="field"><span>{label}</span><input type={type} value={value} onChange={(event) => setter(event.target.value)} /></label>
  )

  return <div className="calculator">
    <div className="form-grid">
      {field('Clock in', shiftStart, setShiftStart)}
      {field('Clock out', shiftEnd, setShiftEnd)}
      {field('Unpaid break (minutes)', breakMinutes, setBreakMinutes, 'number')}
    </div>
    <div className="calculator-actions">
      <button className="primary" onClick={calculate}>Calculate result <span>→</span></button>
      <button className="reset-btn" onClick={reset} type="button">Reset</button>
    </div>
    {error && <p className="error" role="alert">{error}</p>}
    {result && <div className="result" aria-live="polite"><span className="eyebrow accent">YOUR RESULT</span><strong>{result}</strong><p>Overnight shifts count into the next day; breaks are subtracted.</p></div>}
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
      case 'links': return <ul className="source-list" key={index}>{block.items.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul>
      case 'component': return <DynamicBlock key={index} name={block.name} />
      default: return null
    }
  })
}

function ToolMethodology({ tool, go, sources }: { tool: Tool; go: (path: string) => void; sources?: [string, string][] }) {
  const trust = toolTrust[tool.slug]
  if (!trust) return null
  const allSources = trust.sources ?? sources
  return <section className="seo-content methodology" aria-labelledby="method-heading">
    <h2 id="method-heading">Method, checked examples, and limits</h2>
    <p>{trust.formula}</p>
    <h3>Assumptions</h3>
    <ul>{trust.assumptions.map((item) => <li key={item}>{item}</li>)}</ul>
    <h3>Examples you can reproduce</h3>
    <div className="table-wrap">
      <table>
        <thead><tr><th scope="col">Input</th><th scope="col">Result</th><th scope="col">Why it matters</th></tr></thead>
        <tbody>{trust.examples.map((example) => <tr key={example.input}>
          <td>{example.input}</td>
          <td>{example.result}</td>
          <td>{example.note ?? '—'}</td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className="method-note">These examples were produced with the same calculation functions the tool uses. Enter the inputs above to reproduce them.</p>
    <h3>Known limitations</h3>
    <ul>{trust.limits.map((item) => <li key={item}>{item}</li>)}</ul>
    {allSources && allSources.length > 0 && <p className="method-note">Rules and definitions: {allSources.map(([label, url], index) => <span key={url}>{index > 0 ? ', ' : ''}<a href={url} target="_blank" rel="noopener noreferrer">{label}</a></span>)}</p>}
    <p className="method-note">Read the full <NavLink className="inline-link" to="/methodology" go={go}>testing methodology</NavLink>, the <NavLink className="inline-link" to="/editorial-policy" go={go}>editorial standards</NavLink>, or <NavLink className="inline-link" to="/report-an-error" go={go}>report a problem</NavLink>.</p>
  </section>
}

function ContentPage({ path, data, go }: { path: string; data: ContentPageData; go: (path: string) => void }) {
  return <main className="page legal-page" id="main-content" tabIndex={-1}>
    <Breadcrumbs items={[[data.title, path]]} go={go} />
    <p className="eyebrow accent">{data.eyebrow}</p>
    <h1>{data.title}</h1>
    {data.showAuthor && <AuthorByline path={path} go={go} />}
    <p className="lead">{data.lead}</p>
    {data.sections.map((section) => <section className="seo-content" key={section.heading}>
      <h2>{section.heading}</h2>
      {renderBlocks(section.blocks, go)}
    </section>)}
    {data.faqs && data.faqs.length > 0 && <section className="seo-content">
      <h2>Frequently Asked Questions</h2>
      {data.faqs.map(([question, answer]) => <div key={question} className="faq-item">
        <h3>{question}</h3>
        <p><RichText text={answer} go={go} /></p>
      </div>)}
    </section>}
    <p className="doc-note">Questions or corrections? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use the <NavLink className="inline-link" to="/report-an-error" go={go}>error report form</NavLink>.</p>
  </main>
}

function ToolPage({ tool, go }: { tool: Tool; go: (path: string) => void }) {
  const content = toolContent[tool.slug]
  const related = content.related.map((slug) => tools.find((item) => item.slug === slug)).filter((item): item is Tool => Boolean(item)).slice(0, 4)
  const categoryPath = tool.category === 'Time' ? '/time' : tool.category === 'Calendar' ? '/calendar' : tool.category === 'Convert' ? '/converters' : '/calculators'

  return <main className="page" id="main-content" tabIndex={-1}>
    <Breadcrumbs items={[['Tools', categoryPath], [tool.title, toolPath(tool)]]} go={go} />
    <p className="eyebrow accent">{tool.category.toUpperCase()} TOOL</p>
    <h1>{tool.title}</h1>
    <AuthorByline path={toolPath(tool)} go={go} />
    <p className="lead">{content.answer}</p>
          <Calculator key={tool.slug} tool={tool} />
    <section className="seo-content">
      {content.intro.map((paragraph) => <p key={paragraph}><RichText text={paragraph} go={go} /></p>)}
      <h2>How to Use the {tool.title}</h2>
      <ol>{content.howTo.map((step) => <li key={step}><RichText text={step} go={go} /></li>)}</ol>
    </section>
    {content.sections.map((section) => <section className="seo-content" key={section.heading}>
      <h2>{section.heading}</h2>
      {renderBlocks(section.blocks, go)}
    </section>)}
    <ToolMethodology tool={tool} go={go} sources={content.sources} />
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

function CategoryNotes({ category, go }: { category: Tool['category']; go: (path: string) => void }) {
  if (category === 'Time') return <>
    <section className="seo-content">
      <h2>What the time tools actually measure</h2>
      <p>Time questions look similar but ask for different answers. An elapsed-time calculation measures the gap between two moments; a countdown measures the remaining gap to a future moment; and a time-zone conversion translates the same instant into another named zone. Mixing those questions is the usual reason a result feels wrong. The <NavLink className="inline-link" to="/time/time-difference" go={go}>Time Difference Calculator</NavLink> compares two local date-time values, while the <NavLink className="inline-link" to="/time/time-since-calculator" go={go}>Time Since Calculator</NavLink> measures from a past moment to the current device clock.</p>
      <p>DatePilot states which clock and convention each tool uses. Results that depend on “now” can change between page loads, and two devices can differ by a few seconds or by their configured time zone. For planning, write down the exact start and end values rather than relying on a remembered time.</p>
    </section>
    <section className="seo-content">
      <h2>Why local context changes a time result</h2>
      <p>Named time zones are more than fixed UTC offsets. A zone such as Europe/London or America/New_York includes historical rule changes and daylight-saving transitions, supplied by the browser's IANA time-zone data. A meeting at 09:00 can therefore land on a different UTC instant in March than in July. The <NavLink className="inline-link" to="/time/time-zone-converter" go={go}>Time Zone Converter</NavLink> uses named zones so those rules are applied; a manual “UTC+2” offset will not capture every transition.</p>
      <p>Midnight boundaries matter too. A conversion near the end of a day can move the result to the next or previous calendar date, which affects bookings, deadlines, and international appointments. Read <NavLink className="inline-link" to="/guides/time-zones" go={go}>Time Zones Explained</NavLink> and <NavLink className="inline-link" to="/guides/daylight-saving-time" go={go}>Daylight Saving Time Explained</NavLink> before relying on a converted time for something consequential.</p>
    </section>
    <section className="seo-content">
      <h2>Choosing a starting point for a time calculation</h2>
      <p>Start with the question you need to answer. To find how long a shift lasted, total the start and end times and subtract unpaid breaks; the <NavLink className="inline-link" to="/time/work-hours-calculator" go={go}>Work Hours Calculator</NavLink> handles shifts that cross midnight. To know how long until a launch or event, use the <NavLink className="inline-link" to="/time/countdown" go={go}>Countdown Calculator</NavLink>. To compare two timestamps, use the difference tool and check whether the result is shown in hours and minutes, decimal hours, or days.</p>
      <p>Record whether endpoints are included, whether the result should use the device clock, and which time zone the inputs refer to. Those three choices explain most disagreements between two otherwise correct time calculators.</p>
    </section>
  </>
  if (category === 'Calendar') return <>
    <section className="seo-content">
      <h2>Calendar rules are not universal</h2>
      <p>A calendar tool is only as clear as the convention behind it. DatePilot uses the proleptic Gregorian calendar for weekday and date arithmetic, applies the standard leap-year rule (divisible by 4, except centuries unless divisible by 400), and states when a week-number result follows ISO 8601 rather than a local convention. Those choices rarely matter for an ordinary appointment, but they change results for historical dates, cross-border schedules, and year-end planning.</p>
      <p>Leap years are a good example. A year that is divisible by 4 is usually a leap year, but 1900 was not and 2000 was. The <NavLink className="inline-link" to="/calendar/leap-year" go={go}>Leap Year Calculator</NavLink> shows the rule, while <NavLink className="inline-link" to="/guides/leap-years" go={go}>Leap Years Explained</NavLink> covers the arithmetic and the century exception.</p>
    </section>
    <section className="seo-content">
      <h2>Week numbers, weekdays, and ordinal dates</h2>
      <p>Week numbering is a frequent source of off-by-one errors. ISO 8601 defines week 1 as the week containing the first Thursday of the year, and weeks begin on Monday. A date in late December can therefore belong to week 1 of the following ISO week-year. The <NavLink className="inline-link" to="/calendar/week-number" go={go}>Week Number Calculator</NavLink> reports both the week and the week-year so the result is not ambiguous.</p>
      <p>Weekday and day-of-year questions use different counts. The <NavLink className="inline-link" to="/calendar/day-of-week" go={go}>Day of the Week Calculator</NavLink> returns a weekday name for a calendar date, while the <NavLink className="inline-link" to="/calendar/day-of-year" go={go}>Day of Year Calculator</NavLink> counts from 1 January. Neither count should be confused with the number of days remaining in a project; that is a separate elapsed-time calculation.</p>
    </section>
    <section className="seo-content">
      <h2>Planning with calendar outputs</h2>
      <p>Quarter and fiscal-calendar tools depend on an organization's chosen start month. A calendar quarter beginning in January is not the same as a fiscal quarter beginning in April, July, or October. The <NavLink className="inline-link" to="/calendar/quarter-calculator" go={go}>Quarter Calculator</NavLink> lets you set the fiscal-year start rather than assuming one convention.</p>
      <p>Before using a calendar result in a contract, payroll system, or official filing, confirm the calendar system, the week rule, the year boundary, and whether a deadline is inclusive. DatePilot's related guides, including <NavLink className="inline-link" to="/guides/week-numbering-systems" go={go}>Week Numbering Systems</NavLink>, explain those distinctions in more detail.</p>
    </section>
  </>
  if (category === 'Convert') return <>
    <section className="seo-content">
      <h2>Why a numeric date can be ambiguous</h2>
      <p>A date such as 03/04/2026 can mean 3 March or 4 March depending on whether the writer uses day-first or month-first order. That ambiguity is not cosmetic: it can change a booking, a contract date, or a data import. The <NavLink className="inline-link" to="/converters/date-format-converter" go={go}>Date Format Converter</NavLink> asks you to choose the day and month order explicitly, then shows the equivalent ISO 8601, US, and European forms.</p>
      <p>ISO 8601 avoids the problem with a year-first pattern such as 2026-03-04. It is unambiguous, sorts correctly as text, and is widely used in software, logs, APIs, and international documentation. Read <NavLink className="inline-link" to="/guides/date-time-formats" go={go}>Date and Time Formats Explained</NavLink> for the difference between calendar dates, date-time values, and UTC offsets.</p>
    </section>
    <section className="seo-content">
      <h2>What conversion does and does not change</h2>
      <p>Format conversion changes how a date is written, not the underlying calendar date. It does not apply a time-zone conversion, add or remove a day, or repair a date that was entered in the wrong order. If a source gives a date and time in another zone, use the <NavLink className="inline-link" to="/time/time-zone-converter" go={go}>Time Zone Converter</NavLink> first and then format the resulting local date.</p>
      <p>Two-digit years and mixed separators deserve extra care. Prefer four-digit years in records that may be read years later, and keep one separator style within a dataset. A converter can display a normalized result, but the original meaning still depends on the convention used by the person who recorded it.</p>
    </section>
    <section className="seo-content">
      <h2>When to use ISO 8601</h2>
      <p>Use ISO 8601 when the date will be exchanged between systems, sorted, stored in a filename, or read across borders. Use a local format when the audience expects it, but label the format or write the month as a name if there is any chance of confusion. For scheduled events, include the time and offset or named zone rather than a bare calendar date.</p>
      <p>The <NavLink className="inline-link" to="/guides/iso-week-date" go={go}>ISO Week Date guide</NavLink> covers week dates, and the <NavLink className="inline-link" to="/guides/unix-time" go={go}>Unix Time guide</NavLink> explains the timestamp format used by many systems. Match the format to the reader and the system, not just to habit.</p>
    </section>
  </>
  return <>
    <section className="seo-content">
      <h2>Start with the question, not the calculator</h2>
      <p>Date questions usually fall into four groups: finding the gap between two dates, moving a date forward or backward, counting only working days, or repeating a schedule. Each group uses a different endpoint convention. DatePilot labels the method beside every result so you can check whether the start date, end date, or both are counted.</p>
      <p>For a deadline, decide whether the deadline itself is a working day and whether holidays should be excluded. For an age or anniversary, use calendar anniversaries rather than dividing total days by 365. The <NavLink className="inline-link" to="/guides/date-calculations" go={go}>Date Calculations guide</NavLink> explains the distinctions.</p>
    </section>
    <section className="seo-content">
      <h2>Check the convention before you rely on a result</h2>
      <p>Two correct calculators can disagree when they count endpoints differently, apply a different holiday list, or use a different calendar system. Read the method note, then compare the result with the wording of the deadline or schedule you are working from. If the result will affect pay, legal rights, travel, or a contractual date, verify it with the responsible authority.</p>
    </section>
  </>
}

function ToolIndex({ category, go }: { category?: Tool['category']; go: (path: string) => void }) {
  const [query, setQuery] = useState(() => {
    if (typeof window === 'undefined') return ''
    return new URLSearchParams(window.location.search).get('query') ?? ''
  })
  const searchRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (new URLSearchParams(window.location.search).has('query')) searchRef.current?.focus()
  }, [])
  const base = category ? tools.filter((tool) => tool.category === category) : tools
  const needle = query.trim().toLowerCase()
  const list = needle ? base.filter((tool) => `${tool.title} ${tool.summary} ${tool.category}`.toLowerCase().includes(needle)) : base
  const title = category === 'Time' ? 'Put every time zone in context.' : category === 'Calendar' ? 'See the shape of the calendar.' : category === 'Date' ? 'Work with dates, without the guesswork.' : category === 'Convert' ? 'Know exactly what the date means.' : 'All the tools, in one place.'
  const explanation = category === 'Time' ? 'Compare elapsed time, count down to a moment, and convert local times using named time zones.' : category === 'Calendar' ? 'Check weekdays, ISO week numbers, and leap years using clearly stated calendar conventions.' : category === 'Date' ? 'Plan deadlines, compare date ranges, add or subtract days, and count working days.' : category === 'Convert' ? 'Translate dates between ISO 8601, US, and European formats, and resolve ambiguous numeric dates with an explicit day and month order.' : 'Start with the task you need to solve, then follow the method and related guidance on each tool page.'
  const breadcrumbLabel = category ? `${category} tools` : 'Calculators'
  const breadcrumbPath = category === 'Time' ? '/time' : category === 'Calendar' ? '/calendar' : category === 'Convert' ? '/converters' : '/calculators'
  return <main className="page" id="main-content" tabIndex={-1}>
    <Breadcrumbs items={[[breadcrumbLabel, breadcrumbPath]]} go={go} />
    <p className="eyebrow accent">{category ? `${category.toUpperCase()} TOOLKIT` : 'DATEPILOT TOOLKIT'}</p>
    <h1>{title}</h1>
    <AuthorByline path={breadcrumbPath} go={go} compact />
    <p className="lead">{explanation}</p>
    <div className="tool-search">
      <label className="field" htmlFor="tool-search"><span>Search tools</span>
        <input ref={searchRef} id="tool-search" type="search" autoComplete="off" placeholder="Try age, deadline, week number, time zone" value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
      <p className="method-note" aria-live="polite">
        {needle
          ? (list.length ? `${list.length} ${list.length === 1 ? 'tool' : 'tools'} matching "${query.trim()}"` : `No tool matches "${query.trim()}". Try a shorter word such as "date", "week", or "time".`)
          : `${base.length} tools`}
      </p>
    </div>
    <div className="tool-grid">{list.map((tool) => <Card key={tool.slug} tool={tool} go={go} />)}</div>
    {category
      ? <CategoryNotes category={category} go={go} />
      : <section className="seo-content">
        <h2>Choose a tool by the question you need to answer</h2>
        <p>{explanation} Each calculator explains its inputs, method, examples, limitations, and related next steps so the result is easier to interpret.</p>
        <p><NavLink className="text-link" to="/guides" go={go}>Read the DatePilot guides →</NavLink></p>
      </section>}
  </main>
}

function Guides({ go }: { go: (path: string) => void }) {
  return <main className="page" id="main-content" tabIndex={-1}>
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
  const relatedTools = content.toolSlugs.map((slug) => tools.find((item) => item.slug === slug)).filter((tool): tool is Tool => Boolean(tool))
  const sharedWith = guides.filter((g) => g.slug !== guide.slug && content.toolSlugs.some((ts) => guideContent[g.slug]?.toolSlugs.includes(ts))).slice(0, 3)
  const continueWith = sharedWith.length ? sharedWith : guides.filter((g) => g.slug !== guide.slug).slice(0, 3)
  return <main className="page article" id="main-content" tabIndex={-1}>
    <Breadcrumbs items={[['Guides', '/guides'], [guide.title, `/guides/${guide.slug}`]]} go={go} />
    <p className="eyebrow accent">DATEPILOT FIELD NOTE</p>
    <h1>{guide.title}</h1>
    <AuthorByline path={`/guides/${guide.slug}`} go={go} />
    <p className="lead">{content.answer}</p>
    {content.sections.map(([heading, paragraph]) => <section className="seo-content" key={heading}>
      <h2>{heading}</h2>
      {paragraph.split('\n\n').map((chunk) => <p key={chunk}><RichText text={chunk} go={go} /></p>)}
    </section>)}
    {content.faq && content.faq.length > 0 && <section className="seo-content">
      <h2>Frequently Asked Questions</h2>
      {content.faq.map(([question, answer]) => <div key={question} className="faq-item">
        <h3>{question}</h3>
        <p><RichText text={answer} go={go} /></p>
      </div>)}
    </section>}
    {content.sources && content.sources.length > 0 && <section className="seo-content">
      <h2>Sources and further reading</h2>
      <p>These standards, databases, and reference works back up the rules explained on this page. Each link opens the original source.</p>
      <ul className="source-list">
        {content.sources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>)}
      </ul>
    </section>}
    {relatedTools.length > 0 && <section className="seo-content">
      <h2>Related DatePilot Tools</h2>
      <div className="link-grid">{relatedTools.map((tool) => <NavLink className="related" key={tool.slug} to={toolPath(tool)} go={go}>{tool.title} ↗</NavLink>)}</div>
    </section>}
    <section className="seo-content">
      <h2>Continue Reading</h2>
      <div className="link-grid">
        {continueWith.map((g) => <NavLink className="related" key={g.slug} to={`/guides/${g.slug}`} go={go}>{g.title} ↗</NavLink>)}
      </div>
    </section>
    <p style={{ marginTop: '32px' }}><NavLink className="primary" to="/calculators" go={go}>Explore the calculators <span>→</span></NavLink></p>
  </main>
}

function Faq({ go }: { go: (path: string) => void }) {
  return <main className="page article" id="main-content" tabIndex={-1}>
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
        ['Who runs DatePilot', `DatePilot is written, built, and maintained by ${OPERATOR}, who is the founder and editor. There is no anonymous content team and no separate newsroom. The same person maintains the calculators, writes the explanations, reviews corrections, and decides what is published. You can read more on the [About the editor](/about/author) page.`],
        ['What DatePilot is', 'DatePilot is a focused date, calendar, and time reference for people planning work, checking dates, comparing times, and learning the rules behind everyday calendar questions. It is built around a small set of useful tools rather than a large collection of unrelated calculators.'],
        ['How the content is made', 'Calculators are built first. Each one is then described with its purpose, inputs, method, assumptions, worked examples, limitations, and the standards or reference works it relies on. Guides explain the rules behind those calculations. Every page is reviewed by the editor before publication, and automation is used only to help draft, check, and test material, not as an author. Read the [editorial standards](/editorial-policy) for the full process.'],
        ['How accuracy is checked', 'We make calculations inspectable. Inputs are labeled, conventions are stated, and the explanation beside a result describes what it includes. Pages are checked against reproducible examples and edge cases such as leap days, month boundaries, weekdays, ISO week numbering, and time-zone transitions. The [methodology page](/methodology) describes the pipeline and gives worked examples you can reproduce.'],
        ['How DatePilot is funded', 'DatePilot is independent and free to use. It is funded by advertising served through Google AdSense. Advertisers have no input into calculator logic, editorial wording, or source selection, and advertising is kept separate from content. See the [advertising policy](/advertising-policy) and [privacy policy](/privacy-policy) for details.'],
        ['How DatePilot is built', 'DatePilot is a static web application. Calculator logic runs entirely in your browser using standard JavaScript date APIs and the browser\'s IANA timezone database. Calculator inputs are not sent to a server.'],
        ['What DatePilot is not', 'DatePilot is not an official government service, legal adviser, medical adviser, financial adviser, or a substitute for the organization responsible for an important deadline or decision. It does not claim professional credentials it does not have.'],
        ['Corrections and contact', `If you find an incorrect calculation, inaccurate explanation, broken link, or accessibility issue, report it through the [Contact page](/contact) or email ${CONTACT_EMAIL}. Confirmed corrections are fixed and recorded in the [Changelog](/changelog).`],
      ]
    },
    contact: {
      title: 'Contact DatePilot',
      sections: [
        ['Why contact us', 'Contact DatePilot to report an incorrect calculation, incorrect explanation, outdated information, broken link, accessibility issue, privacy question, or other technical problem. Correction reports are especially useful because they help us investigate reproducible cases.'],
        ['What to include', 'Include the page URL, the inputs you entered, the result you expected, the calendar or timezone convention involved, and a short description of the problem. Do not include sensitive personal information that is not needed to investigate the issue.'],
        ['How to reach us', `Email us at ${CONTACT_EMAIL} with your report or question. We aim to respond within 5 business days. For urgent accessibility issues, please include "Accessibility" in the subject line.`],
        ['Response time', 'We review all messages and aim to respond within 5 business days. Calculation correction reports are prioritized because they may affect other users. Confirmed corrections are recorded in the [Changelog](/changelog).'],
      ]
    },
    'privacy-policy': {
      title: 'Privacy Policy',
      sections: [
        ['Calculator behavior', 'All DatePilot calculators run entirely in your browser. The dates, times, and other values you enter are processed locally using JavaScript. Calculator inputs are not transmitted to, stored on, or accessed by any server, and we do not keep a history of your calculations.'],
        ['Advertising and Google AdSense', 'DatePilot displays advertising through Google AdSense to keep the site free. Google and its partners may use cookies or similar technologies to serve, measure, and personalise ads based on your visits to this and other websites. Google\'s use of advertising data is described at policies.google.com/technologies/partner-sites. You can manage personalised advertising through Google Ad Settings and opt out of many third-party vendors through aboutads.info. Where required by law, including for visitors in the European Economic Area, the United Kingdom, and Switzerland, a consent message is shown before advertising cookies are used, and you can change or withdraw your choice later.'],
        ['Cookies', 'DatePilot does not set first-party analytics or session cookies of its own. Advertising cookies are set by Google and its partners only as described above and in the [Cookie Policy](/cookie-policy). You can block or delete cookies through your browser settings, though that may affect how ads are personalised.'],
        ['Analytics', 'DatePilot does not currently run a first-party analytics product. If privacy-respecting analytics are added later, this policy will describe them before they are activated, and they will be used only to understand aggregate usage rather than to identify individual visitors.'],
        ['Server logs', 'The site is served by a hosting provider that processes standard request logs, such as IP address, browser type, pages requested, and timestamps, for security, abuse prevention, and operations. Those logs are handled under the provider\'s privacy terms and are not combined with calculator inputs, which never leave your browser.'],
        ['Third-party services', 'Apart from Google AdSense and the hosting provider, DatePilot fonts and core assets are served from this domain. Links to external sources open the relevant standards body, government, or reference site, and those sites have their own privacy policies.'],
        ['Your choices and rights', 'You can manage cookies through your browser, control personalised advertising through Google Ad Settings, and use the consent controls shown on the site where required. If you have a privacy question or want to exercise a right available in your jurisdiction, contact us using the details below and we will respond within a reasonable period.'],
        ['Children\'s privacy', 'DatePilot is not directed at children under 13 and does not knowingly collect personal information from children.'],
        ['Changes to this policy', `This policy may be updated as DatePilot adds or changes features. The review date shown on this page indicates when it was last checked. Material changes are recorded in the [Changelog](/changelog).`],
        ['Contact', `For privacy questions, email ${CONTACT_EMAIL} or use the [Contact page](/contact).`],
      ]
    },
    'cookie-policy': {
      title: 'Cookie Policy',
      sections: [
        ['What cookies are', 'Cookies are small text files placed on your device by websites you visit. They can remember preferences, support site functions, or help advertising and analytics services measure activity. Similar technologies, such as local storage or pixels, may serve related purposes.'],
        ['Cookies used by DatePilot', 'DatePilot does not set first-party analytics or session cookies. The calculators run locally and do not require a cookie to work. Cookies you may encounter come from Google AdSense advertising, described below.'],
        ['Essential cookies', 'At the time of this review, DatePilot does not set essential first-party cookies. If a feature ever requires one, it will be listed here by name and purpose before it is used.'],
        ['Advertising cookies', 'Google AdSense and its partners may set cookies to serve, measure, and personalise ads, limit how often you see an ad, and detect invalid activity. These cookies are set by Google or its partners, not by DatePilot, and their use is governed by Google\'s advertising policies. Where required by law, a consent message is shown before advertising cookies are used.'],
        ['Analytics cookies', 'DatePilot does not currently use a first-party analytics product. If analytics are added later, this section will describe the cookies or similar technologies before they are activated.'],
        ['Managing cookies', 'You can control, block, and delete cookies through your browser settings. You can manage personalised advertising through Google Ad Settings and opt out of many third-party vendors through aboutads.info. Blocking advertising cookies does not stop ads from appearing, but it can make them less relevant.'],
        ['Consent and choices', 'Visitors in the European Economic Area, the United Kingdom, and Switzerland are shown a consent message where required. You can accept, reject, or later change advertising choices through the consent controls. Withdrawing consent stops future use of the relevant cookies but does not affect processing that already happened.'],
        ['Third-party privacy policies', 'Google\'s handling of advertising data is described at policies.google.com/technologies/partner-sites. Other third parties that serve ads or links have their own policies.'],
        ['Changes', 'This policy may be updated as DatePilot changes its cookie usage. The review date shown on this page indicates when it was last checked, and material changes are recorded in the [Changelog](/changelog).'],
      ]
    },
    terms: {
      title: 'Terms of Use',
      sections: [
        ['Acceptance', 'By using DatePilot, you agree to these terms. If you do not agree, do not use the site.'],
        ['What DatePilot provides', 'DatePilot provides general-purpose date, calendar, and time calculation tools and explanatory content. Results are informational and should be verified for any consequential use.'],
        ['Not professional advice', 'DatePilot does not provide legal, medical, financial, or other professional advice. Use DatePilot results as a starting point and verify with the responsible authority when accuracy matters.'],
        ['Accuracy and review', 'DatePilot aims for accuracy but does not guarantee that all results are error-free. Calculation methods, calendar conventions, and timezone rules are stated on each tool page, and pages are reviewed before publication and after confirmed corrections. Report errors using the [Contact page](/contact).'],
        ['Advertising', 'DatePilot is funded by advertising served through Google AdSense. Ads are separated from editorial content, and advertisers do not influence calculations, explanations, or source selection. Your use of advertising cookies is described in the [Privacy Policy](/privacy-policy) and [Cookie Policy](/cookie-policy).'],
        ['External links', 'DatePilot links to standards bodies, government guidance, and other reference sites. Those sites are not controlled by DatePilot, and their content, availability, and policies are their own responsibility.'],
        ['Availability', 'DatePilot is provided as-is and may be unavailable at times. We do not guarantee uninterrupted access.'],
        ['Limitation of liability', 'DatePilot is not liable for any decisions, losses, or damages resulting from use of the site or its calculations.'],
        ['Intellectual property', 'DatePilot content, design, and code are owned by DatePilot. You may link to DatePilot pages but may not copy or redistribute content without permission.'],
        ['Changes', 'These terms may be updated. The review date shown on this page indicates when they were last checked, and material changes are recorded in the [Changelog](/changelog).'],
      ]
    },
    disclaimer: {
      title: 'Disclaimer',
      sections: [
        ['General purpose only', 'DatePilot provides general-purpose date, calendar, and time calculations for informational use. Results are not guaranteed to be suitable for any specific purpose.'],
        ['Not official or legal advice', 'DatePilot is not a government agency, legal service, financial adviser, or medical service. Do not rely on DatePilot results for legal deadlines, tax filings, medical decisions, contractual obligations, or other consequential matters without verifying with the responsible authority.'],
        ['Accuracy', 'DatePilot uses standard calendar rules and browser timezone data. While we aim for accuracy, calculation errors may exist. Each tool states its assumptions and known limits, and confirmed errors are corrected and recorded. Report errors using the [Contact page](/contact).'],
        ['Advertising', 'DatePilot displays advertising through Google AdSense. Ads are not endorsements, and DatePilot is not responsible for the products or services advertised. Advertising has no influence on editorial content.'],
        ['Third-party services', 'DatePilot relies on third-party services for hosting and advertising. DatePilot is not responsible for the actions or policies of those third parties, which are described in their own terms and privacy policies.'],
      ]
    },
    'report-an-error': {
      title: 'Report an Error',
      sections: [
        ['What to report', 'Report incorrect calculations, inaccurate explanations, broken links, accessibility barriers, privacy concerns, or any other problem you find on DatePilot.'],
        ['How to report', `Email us at ${CONTACT_EMAIL} with the details below.`],
        ['What to include', 'Please include: (1) the page URL where you found the problem, (2) the inputs you used if it is a calculation error, (3) the result you expected and why, (4) the result DatePilot gave you, and (5) a short description of the issue.'],
        ['Accessibility issues', 'If you are reporting an accessibility barrier, please include "Accessibility" in the subject line so we can prioritize your report.'],
        ['What happens next', 'We review all reports and aim to respond within 5 business days. Calculation errors are prioritized. If we confirm an error, we fix it, update the affected page, and record the change in the [Changelog](/changelog).'],
      ]
    },
  }

  const page = content[kind]
  if (!page) return <main className="page article" id="main-content" tabIndex={-1}><h1>Page not found.</h1></main>

  const breadcrumbLabel = page.title.replace('DatePilot — ', '').replace(' — DatePilot', '')

  return <main className="page article" id="main-content" tabIndex={-1}>
    <Breadcrumbs items={[[breadcrumbLabel, `/${kind}`]]} go={go} />
    <p className="eyebrow accent">DATEPILOT</p>
    <h1>{page.title}</h1>
    <AuthorByline path={`/${kind}`} go={go} />
    {['privacy-policy', 'cookie-policy', 'terms', 'disclaimer'].includes(kind) && <p className="doc-note">DatePilot is independent and funded by Google AdSense advertising. Advertising is kept separate from editorial content. Read the <NavLink className="inline-link" to="/advertising-policy" go={go}>advertising policy</NavLink>.</p>}
    {page.sections.map(([heading, paragraph]) => <section className="seo-content legal-section" key={heading}><h2>{heading}</h2><p><RichText text={paragraph} go={go} /></p></section>)}
    {kind === 'contact' && <div className="legal-review"><p><strong>Email:</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p><p><strong>Response time:</strong> Within 5 business days</p></div>}
    {kind === 'report-an-error' && <div className="legal-review"><p><strong>Email:</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p><p><strong>Subject line tip:</strong> Include "Accessibility" for accessibility issues</p></div>}
  </main>
}

function NotFound({ go }: { go: (path: string) => void }) {
  return <main className="page article" id="main-content" tabIndex={-1}>
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

function App({ initialPath }: { initialPath?: string }) {
  const { path, go } = useRoute(initialPath)
  const tool = tools.find((item) => toolPath(item) === path)
  const guide = guides.find((item) => `/guides/${item.slug}` === path)
  const contentPage = contentPages[path.slice(1)]

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (path !== '/calculators') go('/calculators?query=')
        else document.getElementById('tool-search')?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [path, go])

  let page: React.ReactNode = <NotFound go={go} />
  if (path === '/') page = <Home go={go} />
  else if (path === '/calculators') page = <ToolIndex go={go} />
  else if (path === '/calendar') page = <ToolIndex category="Calendar" go={go} />
  else if (path === '/time') page = <ToolIndex category="Time" go={go} />
  else if (path === '/converters') page = <ToolIndex category="Convert" go={go} />
  else if (path === '/guides') page = <Guides go={go} />
  else if (path === '/faq') page = <Faq go={go} />
  else if (tool) page = <ToolPage key={tool.slug} tool={tool} go={go} />
  else if (guide) page = <GuidePage guide={guide} go={go} />
  else if (contentPage) page = <ContentPage path={path} data={contentPage} go={go} />
  else if (['about', 'contact', 'privacy-policy', 'cookie-policy', 'terms', 'disclaimer', 'report-an-error'].some((item) => path === `/${item}`)) page = <TrustPage kind={path.slice(1)} go={go} />

  return <div className="app">
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <Header go={go} />
    {page}
    <Footer go={go} />
  </div>
}

export default App
