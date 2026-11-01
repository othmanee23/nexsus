import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  INSIGHTS,
  INSIGHT_CATEGORIES,
  getInsightsByCategory,
  getInsightsByDivision,
  getRelatedInsights,
} from '../src/insights';
import type { Language } from '../src/i18n';
import { getSeoMetadata, INDEXABLE_ROUTES, MULTILINGUAL_ROUTES } from '../src/seo';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPORT_PATH = join(ROOT, 'reports', 'internal-link-report.md');
const SITEMAP_PATH = join(ROOT, 'public', 'sitemap.xml');
const SITE_ORIGIN = 'https://nexsus.ma';
const LANGUAGES: Language[] = ['en', 'fr', 'ar'];
const DIVISION_ROUTES = ['/projects', '/technology', '/amaris', '/ventures'] as const;
const CORE_ROUTES = ['/', '/about', ...DIVISION_ROUTES, '/contact'] as const;
const LEGAL_ROUTES = ['/privacy', '/terms', '/ai-transparency'] as const;

type Page = {
  route: string;
  baseRoute: string;
  language: Language;
  canonical: string;
  indexable: boolean;
};

const isIndexable = (robots: string) => robots
  .split(',')
  .map((directive) => directive.trim())
  .includes('index');

const localizedRoute = (route: string, language: Language) => {
  if (language === 'en') return route;
  return route === '/' ? '/' + language : `/${language}${route}`;
};

const pages: Page[] = [
  ...LANGUAGES.flatMap((language) => MULTILINGUAL_ROUTES.map((baseRoute) => {
    const metadata = getSeoMetadata(baseRoute, language);
    return {
      route: localizedRoute(baseRoute, language),
      baseRoute,
      language,
      canonical: metadata.canonical,
      indexable: isIndexable(metadata.robots),
    };
  })),
  ...INDEXABLE_ROUTES
    .filter((route) => !MULTILINGUAL_ROUTES.includes(route))
    .map((baseRoute) => {
      const metadata = getSeoMetadata(baseRoute, 'en');
      return {
        route: baseRoute,
        baseRoute,
        language: 'en' as const,
        canonical: metadata.canonical,
        indexable: isIndexable(metadata.robots),
      };
    }),
].filter((page, index, all) => all.findIndex((candidate) => candidate.route === page.route) === index);

const pageByRoute = new Map(pages.map((page) => [page.route, page]));
const outbound = new Map(pages.map((page) => [page.route, new Set<string>()]));
const errors: string[] = [];

const addLink = (source: string, target: string) => {
  if (!target.startsWith('/')) return;
  if (target.includes('?') || target.includes('#')) errors.push(`Variant URL linked from ${source}: ${target}`);
  if (target !== '/' && target.endsWith('/')) errors.push(`Trailing-slash variant linked from ${source}: ${target}`);
  if (/[A-Z]/.test(target)) errors.push(`Uppercase URL variant linked from ${source}: ${target}`);
  if (!pageByRoute.has(target) || source === target) return;
  outbound.get(source)?.add(target);
};

const localizedCoreRoute = (route: string, language: Language) => localizedRoute(route, language);

for (const page of pages) {
  for (const route of CORE_ROUTES) addLink(page.route, localizedCoreRoute(route, page.language));
  for (const route of LEGAL_ROUTES) addLink(page.route, route);
  addLink(page.route, '/insights');

  if (DIVISION_ROUTES.includes(page.baseRoute as typeof DIVISION_ROUTES[number])) {
    const division = page.baseRoute.slice(1) as 'projects' | 'technology' | 'amaris' | 'ventures';
    const category = INSIGHT_CATEGORIES.find((item) => item.division === division)!;
    addLink(page.route, '/insights/' + category.slug);
    getInsightsByDivision(division).slice(0, 3).forEach((insight) => addLink(page.route, '/insights/' + insight.slug));
  }

  if (page.baseRoute === '/insights') {
    INSIGHT_CATEGORIES.forEach((category) => addLink(page.route, '/insights/' + category.slug));
    INSIGHTS.forEach((insight) => addLink(page.route, '/insights/' + insight.slug));
  }

  const category = INSIGHT_CATEGORIES.find((item) => page.baseRoute === '/insights/' + item.slug);
  if (category) {
    INSIGHT_CATEGORIES.forEach((item) => addLink(page.route, '/insights/' + item.slug));
    getInsightsByCategory(category.slug).forEach((insight) => addLink(page.route, '/insights/' + insight.slug));
    addLink(page.route, '/' + category.division);
  }

  const insight = INSIGHTS.find((item) => page.baseRoute === '/insights/' + item.slug);
  if (insight) {
    addLink(page.route, '/insights');
    addLink(page.route, '/insights/' + insight.primaryCategory);
    addLink(page.route, '/' + (insight.relatedDivision || insight.relatedDivisions[0]));
    getRelatedInsights(insight).forEach((item) => addLink(page.route, '/insights/' + item.slug));
    insight.content.forEach((block) => {
      if (block.type !== 'paragraph') return;
      block.links?.forEach((link) => addLink(page.route, link.href));
    });
  }
}

const inbound = new Map(pages.map((page) => [page.route, new Set<string>()]));
for (const [source, targets] of outbound) {
  targets.forEach((target) => inbound.get(target)?.add(source));
}

const sitemapXml = await readFile(SITEMAP_PATH, 'utf8');
const sitemapUrls = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
const pageCanonicals = new Set(pages.filter((page) => page.indexable).map((page) => page.canonical));

for (const page of pages) {
  if (page.indexable && inbound.get(page.route)?.size === 0) errors.push(`Indexable orphan page: ${page.canonical}`);
  if (page.indexable && !sitemapUrls.has(page.canonical)) errors.push(`Indexable page missing from sitemap: ${page.canonical}`);
}
for (const sitemapUrl of sitemapUrls) {
  if (!pageCanonicals.has(sitemapUrl)) errors.push(`Sitemap URL missing from route graph: ${sitemapUrl}`);
}

const homepageRequired = [...DIVISION_ROUTES, '/insights'];
for (const target of homepageRequired) {
  if (!outbound.get('/')?.has(target)) errors.push(`Homepage is missing required crawlable link to ${target}`);
}

for (const category of INSIGHT_CATEGORIES) {
  const hub = '/insights/' + category.slug;
  for (const insight of getInsightsByCategory(category.slug)) {
    const article = '/insights/' + insight.slug;
    if (!outbound.get('/insights')?.has(article)) errors.push(`Insights root is missing ${article}`);
    if (!outbound.get(hub)?.has(article)) errors.push(`${hub} is missing ${article}`);
  }
}

for (const insight of INSIGHTS) {
  const article = '/insights/' + insight.slug;
  const division = '/' + (insight.relatedDivision || insight.relatedDivisions[0]);
  if (!outbound.get(article)?.has(division)) errors.push(`${article} is missing its division link ${division}`);
  if (getRelatedInsights(insight).length && ![...outbound.get(article)!].some((target) => target.startsWith('/insights/') && target !== '/insights/' + insight.primaryCategory)) {
    errors.push(`${article} is missing a related Insight link`);
  }
}

const rows = [...pages]
  .sort((a, b) => a.canonical.localeCompare(b.canonical))
  .map((page) => {
    const inboundCount = inbound.get(page.route)?.size ?? 0;
    const outboundCount = outbound.get(page.route)?.size ?? 0;
    return `| ${page.canonical} | ${inboundCount} | ${outboundCount} | ${inboundCount === 0 ? 'Yes' : 'No'} | ${sitemapUrls.has(page.canonical) ? 'Yes' : 'No'} | ${page.indexable ? 'Indexable' : 'Noindex'} |`;
  });

const report = `# NEXSUS Internal-Link Report

Generated from the canonical route model, global navigation, division listings, category hubs, Insight body links, and related-content graph.

- Pages audited: ${pages.length}
- Internal edges: ${[...outbound.values()].reduce((total, targets) => total + targets.size, 0)}
- Indexable orphan pages: ${pages.filter((page) => page.indexable && (inbound.get(page.route)?.size ?? 0) === 0).length}
- Sitemap URLs: ${sitemapUrls.size}

Inbound and outbound counts use unique linking pages and unique canonical destinations.

| URL | Inbound internal links | Outbound internal links | Orphan | In sitemap | Indexability |
| --- | ---: | ---: | --- | --- | --- |
${rows.join('\n')}
`;

await mkdir(dirname(REPORT_PATH), { recursive: true });
await writeFile(REPORT_PATH, report);

if (errors.length) {
  console.error(`Internal-link validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error('- ' + error));
  process.exitCode = 1;
} else {
  console.log(`Internal-link validation passed: ${pages.length} pages, ${[...outbound.values()].reduce((total, targets) => total + targets.size, 0)} unique internal edges, no indexable orphans.`);
  console.log(`Report written to ${REPORT_PATH.replace(ROOT + '/', '')}.`);
}
