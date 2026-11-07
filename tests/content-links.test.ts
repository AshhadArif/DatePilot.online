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
