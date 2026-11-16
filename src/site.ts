// Single source of truth for the site's identity, publisher, and editorial
// signals. Used by the client-side SEO updater, the static route generator,
// and the trust pages so the same facts cannot drift apart.

export const SITE_URL = 'https://datepilot.online'
export const SITE_NAME = 'DatePilot'
export const CONTACT_EMAIL = 'bazminoadsense2@gmail.com'
export const OPERATOR = 'Fahad'
export const AUTHOR_NAME = 'Fahad'
export const AUTHOR_ROLE = 'Founder and editor'
export const AUTHOR_PATH = '/about/author'
export const SITE_LAUNCH_DATE = '2026-09-22'
export const REVIEW_DATE = '2026-11-16'

const ORG_ID = `${SITE_URL}/#organization`
const PERSON_ID = `${SITE_URL}/#person`
export const ORGANIZATION_ID = ORG_ID
export const PERSON_ID_VALUE = PERSON_ID

export const publisherRef = { '@id': ORG_ID }
export const authorRef = { '@id': PERSON_ID }

export const organizationNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  alternateName: 'DatePilot.online',
  url: `${SITE_URL}/`,
  email: CONTACT_EMAIL,
  foundingDate: SITE_LAUNCH_DATE,
  description:
    'An independent date, calendar, and time reference with stated methods, worked examples, and linked primary sources.',
  publishingPrinciples: `${SITE_URL}/editorial-policy/`,
  correctionsPolicy: `${SITE_URL}/report-an-error/`,
  founder: { '@id': PERSON_ID },
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'editorial',
      email: CONTACT_EMAIL,
      availableLanguage: ['English'],
      url: `${SITE_URL}/contact/`,
    },
  ],
}

export const personNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: AUTHOR_NAME,
  jobTitle: AUTHOR_ROLE,
  url: `${SITE_URL}${AUTHOR_PATH}/`,
  worksFor: { '@id': ORG_ID },
  mainEntityOfPage: `${SITE_URL}${AUTHOR_PATH}/`,
  description:
    'Fahad is the founder and editor of DatePilot. He builds and maintains the calculators, researches the calendar and time rules behind them, and reviews corrections and sources.',
  knowsAbout: [
    'Calendar arithmetic',
    'Gregorian calendar',
    'ISO 8601 date and time formats',
    'IANA time zone database',
    'Daylight saving time',
    'Business-day and deadline calculations',
    'JavaScript date handling',
  ],
}

export const editorialTrustLinks: [string, string, string][] = [
  ['Editorial standards', '/editorial-policy', 'How pages are researched, written, checked, and corrected.'],
  ['How we test', '/methodology', 'The calculation pipeline and reproducible verification examples.'],
  ['About the editor', AUTHOR_PATH, 'Who maintains DatePilot and what that role covers.'],
  ['Changelog', '/changelog', 'Dated changes to calculators, guides, sources, and policies.'],
]
