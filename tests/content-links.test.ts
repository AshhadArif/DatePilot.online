import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { lastmod } from '../src/content/lastmod.ts'

const root = path.resolve(import.meta.dirname, '..')
const read = (relative: string) => fs.readFileSync(path.join(root, relative), 'utf8')
const normalize = (url: string) => (url.length > 1 ? url.replace(/\/$/, '') : url)

const sitemapPaths = new Set(Object.keys(lastmod))

const toolSlugs = [...read('src/App.tsx').matchAll(/slug: '([a-z0-9-]+)', title/g)].map((match) => match[1])
const guideSlugs = [...read('src/App.tsx').matchAll(/^ {2}\['([a-z0-9-]+)', '/gm)].map((match) => match[1])
const guideFiles = fs.readdirSync(path.join(root, 'src/content/guides')).filter((file) => file.endsWith('.ts') && file !== 'index.ts').map((file) => `src/content/guides/${file}`)

const contentFiles = ['dates.ts', 'age.ts', 'work.ts', 'calendar.ts', 'time.ts'].map((file) => `src/content/${file}`).concat(guideFiles)

test('lastmod covers every route with a valid review date', () => {
  assert.ok(sitemapPaths.has('/'), 'lastmod must contain the homepage')
  assert.ok(sitemapPaths.size >= 50, `expected at least 50 routes, found ${sitemapPaths.size}`)
  for (const route of sitemapPaths) {
    assert.match(route, /^\/[a-z0-9/-]*$/, `unexpected route format: ${route}`)
    assert.match(lastmod[route], /^\d{4}-\d{2}-\d{2}$/, `invalid date for ${route}`)
  }
})

test('generated sitemap matches the lastmod map', () => {
  const sitemap = read('dist/sitemap.xml')
  const entries = [...sitemap.matchAll(/<loc>https:\/\/datepilot\.online([^<]*)<\/loc><lastmod>([^<]+)<\/lastmod>/g)].map(
    (match) => [match[1] && match[1] !== '/' ? match[1].replace(/\/$/, '') : '/', match[2]] as const,
  )
  assert.equal(entries.length, sitemapPaths.size, 'sitemap URL count must match lastmod route count')
  for (const [route, date] of entries) {
    assert.equal(date, lastmod[route], `sitemap date mismatch for ${route}`)
  }
  assert.ok(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'))
})

test('every internal markdown link in content points at a real page', () => {
  const broken: string[] = []
  for (const file of contentFiles) {
    const text = read(file)
    for (const match of text.matchAll(/\]\((\/[^)#\s]+)\)/g)) {
      const target = normalize(match[1])
      if (!sitemapPaths.has(target)) broken.push(`${file}: ${target}`)
    }
  }
  assert.deepEqual(broken, [], `broken internal links:\n${broken.join('\n')}`)
})

test('every related tool slug points at a real tool', () => {
  const invalid: string[] = []
  for (const file of contentFiles) {
    const text = read(file)
    for (const match of text.matchAll(/related: \[([^\]]*)\]/g)) {
      for (const raw of match[1].split(',')) {
        const slug = raw.trim().replace(/'/g, '')
        if (slug && !toolSlugs.includes(slug)) invalid.push(`${file}: related -> ${slug}`)
      }
    }
  }
  assert.deepEqual(invalid, [], `invalid related slugs:\n${invalid.join('\n')}`)
})

test('every guideSlugs entry points at a real guide', () => {
  const invalid: string[] = []
  for (const file of contentFiles) {
    const text = read(file)
    for (const match of text.matchAll(/guideSlugs: \[([^\]]*)\]/g)) {
      for (const raw of match[1].split(',')) {
        const slug = raw.trim().replace(/'/g, '')
        if (slug && !guideSlugs.includes(slug)) invalid.push(`${file}: guideSlugs -> ${slug}`)
      }
    }
  }
  assert.deepEqual(invalid, [], `invalid guide slugs:\n${invalid.join('\n')}`)
})

test('every guide toolSlugs entry points at a real tool', () => {
  const invalid: string[] = []
  for (const file of guideFiles) {
    const text = read(file)
    for (const match of text.matchAll(/toolSlugs: \[([^\]]*)\]/g)) {
      for (const raw of match[1].split(',')) {
        const slug = raw.trim().replace(/'/g, '')
        if (slug && !toolSlugs.includes(slug)) invalid.push(`${file}: toolSlugs -> ${slug}`)
      }
    }
  }
  assert.deepEqual(invalid, [], `invalid tool slugs in guides:\n${invalid.join('\n')}`)
})

test('guide routes, App registry, and content files stay in sync', () => {
  const files = guideFiles.map((file) => file.split('/').pop()!.replace(/\.ts$/, ''))
  assert.deepEqual(guideSlugs.slice().sort(), files.slice().sort(), 'App.tsx guide registry must match src/content/guides/*.ts files')
  for (const slug of guideSlugs) {
    const text = read(`src/content/guides/${slug}.ts`)
    assert.match(text, /export const content: GuideContent = \{/, `guide ${slug} must export content`)
    assert.match(text, /answer: '/, `guide ${slug} must have an answer`)
    assert.ok((text.match(/^ {4}\['/gm) ?? []).length >= 5, `guide ${slug} needs at least 5 sections`)
  }
})

test('robots.txt allows crawling of public pages and blocks internal work areas', () => {
  const robots = read('public/robots.txt')
  assert.match(robots, /Sitemap: https:\/\/datepilot\.online\/sitemap\.xml/)
  assert.match(robots, /Disallow: \/internal\//)
  assert.match(robots, /Disallow: \/docs\//)
  assert.ok(!/Disallow: \/$/m.test(robots), 'robots.txt must not block the whole site')
})

test('route shells exist for every sitemap URL', () => {
  const missing: string[] = []
  for (const url of sitemapPaths) {
    const file = url === '/' ? 'dist/index.html' : `dist${url}/index.html`
    if (!fs.existsSync(path.join(root, file))) missing.push(file)
  }
  assert.deepEqual(missing, [], `missing route shells:\n${missing.join('\n')}`)
  assert.ok(fs.existsSync(path.join(root, 'dist/404.html')), 'dist/404.html must exist')
  assert.match(read('dist/404.html'), /noindex/)
})

import { toolTrust } from '../src/content/trust.ts'
import { contentPages } from '../src/content/pages.ts'

test('every tool has methodology, examples, and stated limits', () => {
  assert.ok(toolSlugs.length >= 20, `expected the full tool set, found ${toolSlugs.length}`)
  for (const slug of toolSlugs) {
    const trust = toolTrust[slug]
    assert.ok(trust, `missing toolTrust entry for ${slug}`)
    assert.ok(trust.formula.length > 40, `toolTrust formula for ${slug} is too short`)
    assert.ok(trust.assumptions.length >= 2, `toolTrust assumptions for ${slug} need at least two entries`)
    assert.ok(trust.examples.length >= 2, `toolTrust examples for ${slug} need at least two entries`)
    assert.ok(trust.limits.length >= 2, `toolTrust limits for ${slug} need at least two entries`)
  }
})

test('trust pages are registered as routes with review dates', () => {
  for (const key of Object.keys(contentPages)) {
    const route = `/${key}`
    assert.ok(lastmod[route], `missing lastmod entry for ${route}`)
    const data = contentPages[key]
    assert.ok(data.sections.length >= 4, `${route} needs at least four sections`)
    for (const section of data.sections) assert.ok(section.blocks.length > 0, `${route} has an empty section: ${section.heading}`)
  }
})

test('privacy and cookie policies describe the advertising actually served', () => {
  const app = read('src/App.tsx')
  assert.ok(!/does not currently display advertising/i.test(app), 'privacy policy must not claim the site has no advertising')
  assert.ok(!/no advertising code/i.test(app), 'cookie policy must not claim there is no advertising code')
  assert.match(app, /Google AdSense/, 'policies must name the advertising provider')
  assert.match(app, /consent/i, 'policies must explain consent for advertising cookies')
})

test('prerendered pages contain article content and publisher schema', () => {
  for (const route of ['/calculators/age-calculator', '/guides/time-zones', '/about/author', '/methodology', '/advertising-policy']) {
    const file = route === '/' ? 'dist/index.html' : `dist${route}/index.html`
    const html = read(file)
    assert.ok(!html.includes('<!--ssr-outlet-->'), `${file} still contains the empty SSR outlet`)
    assert.ok(html.length > 5000, `${file} is too small to contain rendered content`)
    assert.ok(/"author":\{"@id":"https:\/\/datepilot\.online\/#person"\}/.test(html), `${file} is missing the author reference`)
    assert.ok(/"publisher":\{"@id":"https:\/\/datepilot\.online\/#organization"\}/.test(html), `${file} is missing the publisher reference`)
  }
})

test('tool pages show the author byline and a rendered methodology section', () => {
  const html = read('dist/calculators/age-calculator/index.html')
  assert.match(html, /By (?:<!-- -->)?Fahad/)
  assert.match(html, /Founder and editor/)
  assert.match(html, /Method, checked examples, and limits/)
  assert.match(html, /Known limitations/)
})
