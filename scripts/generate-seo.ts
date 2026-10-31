import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INSIGHTS, INSIGHT_CATEGORIES, getInsightCategory, getInsightsByCategory } from '../src/insights';
import { getSeoMetadata, INDEXABLE_ROUTES, MULTILINGUAL_ROUTES, type SeoMetadata } from '../src/seo';
import type { Language } from '../src/i18n';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputCandidates = [
  join(ROOT, '.cloudflare', 'output', 'v0', 'workers', 'default', 'assets'),
  join(ROOT, 'dist', 'client'),
  join(ROOT, 'dist'),
];
const DIST = outputCandidates.find((path) => existsSync(join(path, 'index.html'))) ?? outputCandidates.at(-1)!;
const SITE_URL = 'https://nexsus.ma';
const LAST_MODIFIED = '2026-09-25';
const LANGUAGES: Language[] = ['en', 'fr', 'ar'];

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const localizedPath = (route: string, language: Language) => {
  if (language === 'en') return route;
  return route === '/' ? '/' + language : '/' + language + route;
};

const replaceAttribute = (html: string, selector: string, value: string) => html.replace(
  new RegExp(`(<meta ${selector} content=")[^"]*("\\s*/?>)`),
  `$1${escapeHtml(value)}$2`,
);

const renderHead = (template: string, metadata: SeoMetadata) => {
  let html = template
    .replace(/<html lang="[^"]+"/, `<html lang="${metadata.language}"`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${escapeHtml(metadata.canonical)}$2`)
    .replace(/\s*<link data-seo-alternate[^>]+>/g, '')
    .replace(
      /(<script id="route-structured-data" type="application\/ld\+json">)[\s\S]*?(<\/script>)/,
      `$1${JSON.stringify(metadata.structuredData).replaceAll('<', '\\u003c')}$2`,
    );

  html = replaceAttribute(html, 'name="description"', metadata.description);
  html = replaceAttribute(html, 'name="robots"', metadata.robots);
  html = replaceAttribute(html, 'property="og:title"', metadata.title);
  html = replaceAttribute(html, 'property="og:description"', metadata.description);
  html = replaceAttribute(html, 'property="og:type"', metadata.type);
  html = replaceAttribute(html, 'property="og:url"', metadata.canonical);
  html = replaceAttribute(html, 'property="og:image"', metadata.image);
  html = replaceAttribute(html, 'property="og:image:alt"', metadata.imageAlt || 'NEXSUS wordmark');
  html = replaceAttribute(html, 'property="og:locale"', metadata.language.replace('-', '_'));
  html = replaceAttribute(html, 'name="twitter:title"', metadata.title);
  html = replaceAttribute(html, 'name="twitter:description"', metadata.description);
  html = replaceAttribute(html, 'name="twitter:image"', metadata.image);

  const alternateMarkup = metadata.alternates.map((alternate) =>
    `    <link data-seo-alternate rel="alternate" hreflang="${escapeHtml(alternate.hreflang)}" href="${escapeHtml(alternate.href)}" />`,
  ).join('\n');
  if (alternateMarkup) html = html.replace('    <meta name="robots"', alternateMarkup + '\n    <meta name="robots"');
  return html;
};

const outputPath = (route: string) => {
  if (route === '/') return join(DIST, 'index.html');
  if (route === '/insights') return join(DIST, 'insights', 'index.html');
  return join(DIST, route.slice(1) + '.html');
};

const writeRoute = async (template: string, route: string, language: Language) => {
  const localizedRoute = localizedPath(route, language);
  const metadata = getSeoMetadata(route, language);
  const destination = outputPath(localizedRoute);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, renderHead(template, metadata));
  return { route: localizedRoute, metadata };
};

const xmlEscape = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

type SitemapItem = {
  route: string;
  language: Language;
  metadata: SeoMetadata;
  lastmod: string;
};

const sitemapItem = (route: string, language: Language = 'en'): SitemapItem => {
  const metadata = getSeoMetadata(route, language);
  const article = INSIGHTS.find((item) => metadata.canonical === item.canonicalUrl);
  const category = getInsightCategory(route.replace('/insights/', ''));
  const latestInsightUpdate = (items = INSIGHTS) => items
    .map((item) => item.updatedAt)
    .sort()
    .at(-1);
  const lastmod = article?.updatedAt
    || (category ? latestInsightUpdate(getInsightsByCategory(category.slug)) : undefined)
    || (route === '/insights' ? latestInsightUpdate() : undefined)
    || LAST_MODIFIED;
  return { route, language, metadata, lastmod };
};

const renderSitemapEntry = (item: SitemapItem) => {
  const alternates = item.metadata.alternates.map((alternate) =>
    `    <xhtml:link rel="alternate" hreflang="${xmlEscape(alternate.hreflang)}" href="${xmlEscape(alternate.href)}" />`,
  ).join('\n');
  return [
    '  <url>',
    `    <loc>${xmlEscape(item.metadata.canonical)}</loc>`,
    alternates,
    `    <lastmod>${item.lastmod}</lastmod>`,
    '  </url>',
  ].filter(Boolean).join('\n');
};

const sitemapContentType = (item: SitemapItem) => {
  if (item.route === '/' && item.language === 'en') return 'Homepage';
  if (item.language !== 'en') return 'Localized Page';
  if (item.route === '/insights') return 'Insights Hub';
  if (getInsightCategory(item.route.replace('/insights/', ''))) return 'Insight Category';
  if (INSIGHTS.some((insight) => item.route === '/insights/' + insight.slug)) return 'Insight Article';
  return 'Core Page';
};

const sitemapLanguage = (language: Language) => ({ en: 'English', fr: 'French', ar: 'Arabic' })[language];

const renderSitemapHtml = (items: SitemapItem[]) => {
  const rows = items.map((item) => `
              <tr data-sitemap-row>
                <td>${sitemapContentType(item)}</td>
                <td>${sitemapLanguage(item.language)}</td>
                <td><a href="${escapeHtml(item.metadata.canonical)}">${escapeHtml(item.metadata.canonical)}</a></td>
                <td>${item.lastmod}</td>
              </tr>`).join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NEXSUS HTML Sitemap</title>
    <meta name="description" content="Canonical, indexable NEXSUS pages available to visitors and search engines." />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${SITE_URL}/sitemap" />
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body { margin: 0; background: #f5f5f2; color: #111; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; }
      main { width: min(1180px, calc(100% - 40px)); margin: 0 auto; padding: 72px 0 80px; }
      .brand { margin: 0 0 64px; font-size: 14px; font-weight: 700; letter-spacing: .08em; }
      .eyebrow { margin: 0 0 14px; color: #666; font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
      h1 { max-width: 850px; margin: 0; font-size: clamp(40px, 7vw, 86px); font-weight: 500; letter-spacing: -.055em; line-height: .94; }
      .intro { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 32px; margin: 34px 0 54px; }
      .intro p { max-width: 560px; margin: 0; color: #555; font-size: 16px; line-height: 1.55; }
      .count { white-space: nowrap; font-size: 14px; font-weight: 700; letter-spacing: .04em; }
      .table-wrap { overflow-x: auto; border-top: 1px solid #111; background: #fff; }
      table { width: 100%; border-collapse: collapse; table-layout: fixed; }
      th, td { padding: 18px 16px; border-bottom: 1px solid #deded9; text-align: left; vertical-align: top; }
      th { color: #666; font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
      td { font-size: 13px; line-height: 1.45; }
      th:nth-child(1), td:nth-child(1) { width: 18%; }
      th:nth-child(2), td:nth-child(2) { width: 12%; }
      th:nth-child(3), td:nth-child(3) { width: 55%; }
      th:nth-child(4), td:nth-child(4) { width: 15%; }
      a { color: inherit; text-decoration: none; overflow-wrap: anywhere; }
      a:hover, a:focus-visible { text-decoration: underline; }
      .footer { margin: 22px 0 0; color: #777; font-size: 11px; line-height: 1.5; }
      @media (max-width: 720px) {
        main { width: min(100% - 24px, 1180px); padding: 34px 0 48px; }
        .brand { margin-bottom: 42px; }
        .intro { grid-template-columns: 1fr; gap: 18px; margin: 26px 0 38px; }
        table { min-width: 760px; }
        th, td { padding: 15px 12px; }
      }
    </style>
  </head>
  <body>
    <main>
      <p class="brand">NEXSUS</p>
      <p class="eyebrow">Technical SEO</p>
      <h1>HTML Sitemap</h1>
      <div class="intro">
        <p>Canonical, indexable pages available to visitors and search engines.</p>
        <div class="count">Total URLs: ${items.length}</div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th scope="col">Content type</th><th scope="col">Language</th><th scope="col">URL</th><th scope="col">Last modified</th></tr></thead>
          <tbody>${rows}
          </tbody>
        </table>
      </div>
      <p class="footer">The XML sitemap for search engines is available at <a href="/sitemap.xml">/sitemap.xml</a>.</p>
    </main>
  </body>
</html>
`;
};

const isIndexableRoute = (route: string) => getSeoMetadata(route, 'en').robots
  .split(',')
  .map((directive) => directive.trim())
  .includes('index');

const englishOnlySitemapRoutes = () => {
  const categoryOrder = new Map(INSIGHT_CATEGORIES.map((category, index) => [category.slug, index]));
  const articleOrder = new Map(
    [...INSIGHTS]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title))
      .map((insight, index) => [insight.slug, index]),
  );

  const rank = (route: string) => {
    if (route === '/insights') return [0, 0];
    const category = getInsightCategory(route.replace('/insights/', ''));
    if (category) return [1, categoryOrder.get(category.slug) ?? Number.MAX_SAFE_INTEGER];
    const article = INSIGHTS.find((insight) => route === '/insights/' + insight.slug);
    if (article) return [2, articleOrder.get(article.slug) ?? Number.MAX_SAFE_INTEGER];
    return [3, 0];
  };

  return INDEXABLE_ROUTES
    .filter((route) => !MULTILINGUAL_ROUTES.includes(route))
    .filter(isIndexableRoute)
    .sort((a, b) => {
      const [aGroup, aOrder] = rank(a);
      const [bGroup, bOrder] = rank(b);
      return aGroup - bGroup || aOrder - bOrder || a.localeCompare(b);
    });
};

const generate = async () => {
  const template = await readFile(join(DIST, 'index.html'), 'utf8');
  const generated: { route: string; metadata: SeoMetadata }[] = [];

  for (const route of MULTILINGUAL_ROUTES) {
    for (const language of LANGUAGES) generated.push(await writeRoute(template, route, language));
  }
  for (const route of INDEXABLE_ROUTES.filter((route) => !MULTILINGUAL_ROUTES.includes(route))) {
    generated.push(await writeRoute(template, route, 'en'));
  }
  generated.push(await writeRoute(template, '/404', 'en'));

  const uniqueValues = (values: string[]) => new Set(values).size === values.length;
  if (!uniqueValues(generated.map((page) => page.route))) throw new Error('Duplicate generated route detected.');
  if (!uniqueValues(generated.map((page) => page.metadata.title))) throw new Error('Duplicate SEO title detected.');
  if (!uniqueValues(generated.map((page) => page.metadata.canonical))) throw new Error('Duplicate canonical URL detected.');

  const localizedSitemapItems = LANGUAGES.flatMap((language) => MULTILINGUAL_ROUTES.map((route) => sitemapItem(route, language)));
  const englishOnlyItems = englishOnlySitemapRoutes().map((route) => sitemapItem(route));
  const sitemapItems = [...localizedSitemapItems, ...englishOnlyItems];
  const hasHreflang = sitemapItems.some((item) => item.metadata.alternates.length > 0);
  const namespace = hasHreflang
    ? ' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"'
    : ' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset${namespace}>`,
    ...sitemapItems.map(renderSitemapEntry),
    '</urlset>',
    '',
  ].join('\n');
  const sitemapHtml = renderSitemapHtml(sitemapItems);

  await writeFile(join(DIST, 'sitemap.xml'), sitemap);
  await writeFile(join(DIST, 'sitemap.html'), sitemapHtml);
  await writeFile(join(ROOT, 'public', 'sitemap.xml'), sitemap);
  await writeFile(join(ROOT, 'public', 'sitemap.html'), sitemapHtml);
  console.log(`Generated ${generated.length} route documents and ${sitemapItems.length} sitemap URLs.`);
};

await generate();
