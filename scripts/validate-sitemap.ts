import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXABLE_ROUTES, MULTILINGUAL_ROUTES, getSeoMetadata } from '../src/seo';
import type { Language } from '../src/i18n';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITEMAP_PATH = join(ROOT, 'public', 'sitemap.xml');
const HTML_SITEMAP_PATH = join(ROOT, 'public', 'sitemap.html');
const SITE_ORIGIN = 'https://nexsus.ma';
const HTML_SITEMAP_URL = SITE_ORIGIN + '/sitemap';
const LANGUAGES: Language[] = ['en', 'fr', 'ar'];
const LIVE = process.argv.includes('--live');
const outputCandidates = [
  join(ROOT, '.cloudflare', 'output', 'v0', 'workers', 'default', 'assets'),
  join(ROOT, 'dist', 'client'),
  join(ROOT, 'dist'),
];
const DIST = outputCandidates.find((path) => existsSync(join(path, 'index.html')));

const decodeXml = (value: string) => value
  .replaceAll('&apos;', "'")
  .replaceAll('&quot;', '"')
  .replaceAll('&gt;', '>')
  .replaceAll('&lt;', '<')
  .replaceAll('&amp;', '&');

const routeFile = (pathname: string) => {
  if (!DIST) return undefined;
  if (pathname === '/') return join(DIST, 'index.html');
  if (pathname === '/insights') return join(DIST, 'insights', 'index.html');
  return join(DIST, pathname.slice(1) + '.html');
};

const extractTag = (block: string, tag: string) => {
  const value = block.match(new RegExp(`<${tag}>([^<]+)</${tag}>`))?.[1];
  return value ? decodeXml(value.trim()) : undefined;
};

const canonicalFromHtml = (html: string) => html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
const robotsFromHtml = (html: string) => html.match(/<meta name="robots" content="([^"]+)"/i)?.[1];
const isIndexable = (robots = '') => robots.split(',').map((value) => value.trim()).includes('index');

const expectedCanonicalUrls = () => {
  const multilingual = LANGUAGES.flatMap((language) => MULTILINGUAL_ROUTES.map((route) =>
    getSeoMetadata(route, language).canonical,
  ));
  const englishOnly = INDEXABLE_ROUTES
    .filter((route) => !MULTILINGUAL_ROUTES.includes(route))
    .map((route) => getSeoMetadata(route, 'en'))
    .filter((metadata) => isIndexable(metadata.robots))
    .map((metadata) => metadata.canonical);
  return new Set([...multilingual, ...englishOnly]);
};

const fetchWithoutRedirect = async (url: string) => {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await fetch(url, {
        redirect: 'manual',
        headers: { 'user-agent': 'NEXSUS-Sitemap-Validator/1.0' },
      });
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
    }
  }
  throw lastError;
};

const validate = async () => {
  const xml = await readFile(SITEMAP_PATH, 'utf8');
  const errors: string[] = [];

  if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) errors.push('Missing valid UTF-8 XML declaration.');
  if (xml.includes('<?xml-stylesheet')) errors.push('Deprecated browser-side XSLT instruction must not be present.');
  if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) errors.push('Missing sitemap namespace.');

  const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  if ((xml.match(/<url>/g) ?? []).length !== (xml.match(/<\/url>/g) ?? []).length) errors.push('Mismatched <url> elements.');
  if (blocks.length === 0) errors.push('Sitemap contains no URL entries.');

  const entries = blocks.map((block) => ({
    block,
    loc: extractTag(block, 'loc'),
    lastmod: extractTag(block, 'lastmod'),
    alternates: [...block.matchAll(/<xhtml:link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"\s*\/>/g)]
      .map((match) => ({ hreflang: match[1], href: decodeXml(match[2]) })),
  }));

  const locations = entries.flatMap((entry) => entry.loc ? [entry.loc] : []);
  const locationSet = new Set(locations);
  if (locationSet.size !== locations.length) errors.push('Duplicate sitemap URL detected.');

  const expected = expectedCanonicalUrls();
  for (const url of expected) if (!locationSet.has(url)) errors.push(`Missing indexable canonical URL: ${url}`);
  for (const url of locationSet) if (!expected.has(url)) errors.push(`Unexpected or non-indexable sitemap URL: ${url}`);

  const alternateSets = new Map(entries.filter((entry) => entry.loc).map((entry) => [
    entry.loc!,
    new Set(entry.alternates.map((alternate) => alternate.href)),
  ]));

  for (const entry of entries) {
    if (!entry.loc) {
      errors.push('Sitemap entry is missing <loc>.');
      continue;
    }
    if (!entry.lastmod || !/^\d{4}-\d{2}-\d{2}$/.test(entry.lastmod) || Number.isNaN(Date.parse(entry.lastmod + 'T00:00:00Z'))) {
      errors.push(`Invalid lastmod for ${entry.loc}: ${entry.lastmod ?? 'missing'}`);
    }

    let parsed: URL;
    try {
      parsed = new URL(entry.loc);
    } catch {
      errors.push(`Malformed URL: ${entry.loc}`);
      continue;
    }
    if (parsed.origin !== SITE_ORIGIN) errors.push(`Non-production hostname: ${entry.loc}`);
    if (parsed.search || parsed.hash) errors.push(`Query string or fragment in sitemap URL: ${entry.loc}`);
    if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) errors.push(`Noncanonical trailing slash: ${entry.loc}`);

    for (const alternate of entry.alternates) {
      if (!['en-MA', 'fr-MA', 'ar-MA', 'x-default'].includes(alternate.hreflang)) {
        errors.push(`Unexpected hreflang ${alternate.hreflang} on ${entry.loc}`);
      }
      if (!locationSet.has(alternate.href)) errors.push(`Hreflang target is absent from sitemap: ${alternate.href}`);
      const targetAlternates = alternateSets.get(alternate.href);
      if (!targetAlternates?.has(entry.loc)) errors.push(`Non-reciprocal hreflang between ${entry.loc} and ${alternate.href}`);
    }

    if (LIVE) {
      try {
        const response = await fetchWithoutRedirect(entry.loc);
        if (response.status >= 300 && response.status < 400) errors.push(`Sitemap URL redirects (${response.status}): ${entry.loc}`);
        else if (response.status !== 200) errors.push(`Sitemap URL returns ${response.status}: ${entry.loc}`);
        const contentType = response.headers.get('content-type') ?? '';
        if (response.status === 200 && contentType.includes('text/html')) {
          const html = await response.text();
          const canonical = canonicalFromHtml(html);
          const robots = robotsFromHtml(html);
          if (canonical !== entry.loc) errors.push(`Canonical differs for ${entry.loc}: ${canonical ?? 'missing'}`);
          if (!isIndexable(robots)) errors.push(`Sitemap URL is noindex: ${entry.loc}`);
        }
      } catch (error) {
        errors.push(`Unable to fetch ${entry.loc}: ${error instanceof Error ? error.message : String(error)}`);
      }
    } else {
      const file = routeFile(parsed.pathname);
      if (!file || !existsSync(file)) {
        errors.push(`Generated route document missing for ${entry.loc}`);
      } else {
        const html = await readFile(file, 'utf8');
        const canonical = canonicalFromHtml(html);
        const robots = robotsFromHtml(html);
        if (canonical !== entry.loc) errors.push(`Canonical differs for ${entry.loc}: ${canonical ?? 'missing'}`);
        if (!isIndexable(robots)) errors.push(`Sitemap URL is noindex: ${entry.loc}`);
      }
    }
  }

  let htmlSitemap = '';
  if (LIVE) {
    try {
      const response = await fetchWithoutRedirect(HTML_SITEMAP_URL);
      if (response.status >= 300 && response.status < 400) errors.push(`HTML sitemap redirects (${response.status}): ${HTML_SITEMAP_URL}`);
      else if (response.status !== 200) errors.push(`HTML sitemap returns ${response.status}: ${HTML_SITEMAP_URL}`);
      htmlSitemap = await response.text();
    } catch (error) {
      errors.push(`Unable to fetch ${HTML_SITEMAP_URL}: ${error instanceof Error ? error.message : String(error)}`);
    }
  } else if (!existsSync(HTML_SITEMAP_PATH)) {
    errors.push('Generated public/sitemap.html is missing.');
  } else {
    htmlSitemap = await readFile(HTML_SITEMAP_PATH, 'utf8');
  }

  if (htmlSitemap) {
    const htmlRows = (htmlSitemap.match(/data-sitemap-row/g) ?? []).length;
    if (htmlRows !== locations.length) errors.push(`HTML sitemap contains ${htmlRows} rows; expected ${locations.length}.`);
    if (canonicalFromHtml(htmlSitemap) !== HTML_SITEMAP_URL) errors.push('HTML sitemap canonical is missing or incorrect.');
    if (robotsFromHtml(htmlSitemap) !== 'noindex, follow') errors.push('HTML sitemap must be noindex, follow.');
    if (/<script\b/i.test(htmlSitemap)) errors.push('HTML sitemap must not require JavaScript.');
    if (!htmlSitemap.includes('href="/sitemap.xml"')) errors.push('HTML sitemap must link to /sitemap.xml.');
    for (const location of locations) {
      if (!htmlSitemap.includes(`href="${location}"`)) errors.push(`HTML sitemap is missing ${location}`);
    }
  }

  if (errors.length) {
    console.error(`Sitemap validation failed with ${errors.length} issue(s):`);
    errors.forEach((error) => console.error('- ' + error));
    process.exitCode = 1;
    return;
  }

  const localizedCount = locations.filter((url) => {
    const pathname = new URL(url).pathname;
    return pathname === '/fr' || pathname.startsWith('/fr/') || pathname === '/ar' || pathname.startsWith('/ar/');
  }).length;
  console.log(`Sitemap validation passed: ${locations.length} canonical, indexable URLs (${localizedCount} localized).`);
  console.log(LIVE
    ? 'Live HTTP, redirect, canonical, indexation, XML sitemap, and HTML sitemap checks passed.'
    : 'Generated route, canonical, indexation, namespace, hreflang, duplicate, lastmod, and HTML sitemap checks passed.');
};

await validate();
