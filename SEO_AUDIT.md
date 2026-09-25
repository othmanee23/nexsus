# NEXSUS Technical SEO Audit

Audit date: 2026-09-25

## Status

The website is technically ready for structured content production. The current implementation preserves the existing visual system while establishing crawlable routes, semantic page structure, route-specific metadata, structured data, and an extensible Insights model.

## Completed Audit

### Headings and semantics

- Every tested public route renders exactly one `main` region and one page-level `h1`.
- Homepage sections use `h2`, and repeated division/service/article items use `h3` where appropriate.
- Insight articles use `main > article`, a semantic article header, structured body headings, related content sections, and a related division section.
- Header, navigation, sections, articles, asides, and footer use semantic elements where they represent those roles.

### Metadata and indexation

- Every generated indexable URL has a unique title, meta description, canonical URL, Open Graph metadata, and Twitter/X metadata.
- English, French, and Arabic corporate and division routes have self-referencing canonicals and reciprocal hreflang links.
- Insights remain English-only until translated content exists, avoiding false hreflang declarations and duplicate translated URLs.
- Empty Insights category hubs remain accessible and crawlable but use `noindex, follow` until a real article is published in that category.
- Unknown routes return a real hosting-level 404 response. The client-side noindex 404 page remains available for unknown in-app route states.

### Insights architecture

- Main hub: `/insights`
- Category hubs: `/insights/projects`, `/insights/technology`, `/insights/brand-creative`, and `/insights/ventures`
- Flat article URLs: `/insights/{article-slug}`
- Topics remain internal metadata and do not create thin public archives.
- Article records support category, topics, related divisions, related insights, services, SEO fields, social fields, dates, authorship, image metadata, and rich content blocks.
- Category and related-content components render only real content; no fake articles were introduced.

### Crawlability and internal links

- Primary navigation, category navigation, breadcrumbs, division titles, article cards, service cards, contact calls to action, and footer calls to action use standard anchors.
- JavaScript enhances internal navigation without removing usable `href` values.
- Division pages support conditional related Insights sections.
- Legacy `/insight` and `/insight/{slug}` URLs permanently redirect to `/insights` equivalents.

### Structured data

- Global `Organization` and `WebSite` JSON-LD are present.
- Article pages include `Article` JSON-LD with headline, description, image, publication and modification dates, author, publisher, and canonical entity URL.
- About, contact, division, category, and article pages receive matching `BreadcrumbList` JSON-LD.
- No review, rating, or other unsupported schema was added.

### Images

- Meaningful current-route images have descriptive alt text.
- Article, division, logo, and client imagery includes intrinsic dimensions where possible.
- Below-the-fold images use lazy loading and asynchronous decoding.
- Decorative service artwork remains intentionally empty-alt.

### Sitemap and robots

- `robots.txt` allows crawling and references the canonical sitemap URL.
- The sitemap is generated from the route/content model during production builds.
- Noindex empty category hubs and 404 pages are excluded from the sitemap.
- Article `lastmod` values come from article data.
- Singular legacy `/insight` URLs are absent from the sitemap.

## Verification

- TypeScript: passed with `npm run lint`.
- Production build: passed with `npm run build`.
- Generated metadata: all route documents have unique titles and canonical URLs.
- Structured data: all generated JSON-LD blocks parse successfully.
- Sitemap: valid XML with no legacy Insight URLs.
- Runtime route audit: one H1 and one main region on all core, division, category, article, and 404 states.
- Responsive audit: desktop Insights and mobile division layouts render without horizontal overflow.
- Browser console: no errors or warnings during the final article-page test.
- Google Rich Results Test: live crawl succeeded; Article and Breadcrumb items were detected as valid.

## Remaining Work

- Publish real articles before removing `noindex` from Projects, Technology, and Ventures category hubs. This happens automatically once their article arrays contain content.
- Submit the regenerated sitemap in Google Search Console after deployment and request validation of the new canonical URLs.
- Verify production redirect status codes after each routing change.
- Social preview images are currently JPEG/PNG assets. A future media pipeline can add WebP/AVIF variants and responsive `srcset` output; Vite does not provide this automatically.
- The main JavaScript bundle is approximately 504 KB before gzip and triggers Vite's advisory warning. Route-level code splitting is a worthwhile performance follow-up but does not block this SEO architecture.
- Route-specific metadata is statically generated, while page body content is still hydrated by the existing React SPA. Full HTML body prerendering or SSR would improve support for non-JavaScript crawlers if the project later adopts an SSR-capable architecture.
