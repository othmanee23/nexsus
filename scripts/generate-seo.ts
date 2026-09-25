import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INSIGHTS } from '../src/insights';
import { getSeoMetadata, INDEXABLE_ROUTES, MULTILINGUAL_ROUTES, type SeoMetadata } from '../src/seo';
import type { Language } from '../src/i18n';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
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

const outputPath = (route: string) => route === '/'
  ? join(DIST, 'index.html')
  : join(DIST, route.slice(1) + '.html');

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

const sitemapEntry = (route: string, language: Language = 'en') => {
  const metadata = getSeoMetadata(route, language);
  const article = INSIGHTS.find((item) => metadata.canonical === item.canonicalUrl);
  const lastmod = article?.updatedAt || LAST_MODIFIED;
  const alternates = metadata.alternates.map((alternate) =>
    `    <xhtml:link rel="alternate" hreflang="${xmlEscape(alternate.hreflang)}" href="${xmlEscape(alternate.href)}" />`,
  ).join('\n');
  return [
    '  <url>',
    `    <loc>${xmlEscape(metadata.canonical)}</loc>`,
    alternates,
    `    <lastmod>${lastmod}</lastmod>`,
    '  </url>',
  ].filter(Boolean).join('\n');
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

  const localizedSitemapEntries = MULTILINGUAL_ROUTES.flatMap((route) => LANGUAGES.map((language) => sitemapEntry(route, language)));
  const englishOnlyEntries = INDEXABLE_ROUTES
    .filter((route) => !MULTILINGUAL_ROUTES.includes(route))
    .filter((route) => getSeoMetadata(route, 'en').robots.startsWith('index'))
    .map((route) => sitemapEntry(route));
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...localizedSitemapEntries,
    ...englishOnlyEntries,
    '</urlset>',
    '',
  ].join('\n');

  await writeFile(join(DIST, 'sitemap.xml'), sitemap);
  await writeFile(join(ROOT, 'public', 'sitemap.xml'), sitemap);
  console.log(`Generated ${generated.length} route documents and ${localizedSitemapEntries.length + englishOnlyEntries.length} sitemap URLs.`);
};

await generate();
