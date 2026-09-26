import React from 'react';
import type { Language } from '../i18n';
import { getInsight, getInsightCategory, getRelatedInsights, type InsightContentBlock } from '../insights';
import { formatPublishedDate } from '../seo';
import { Breadcrumbs } from './Breadcrumbs';
import { InsightCard } from './InsightCard';

const RichTextParagraph = ({ block }: { block: Extract<InsightContentBlock, { type: 'paragraph' }> }) => {
  if (!block.links?.length) return <p>{block.text}</p>;
  const parts: React.ReactNode[] = [];
  let remaining = block.text;
  block.links.forEach((link, index) => {
    const matchIndex = remaining.indexOf(link.text);
    if (matchIndex === -1) {
      if (parts.length || remaining) parts.push(' ');
      parts.push(<a key={link.href + link.text + index} href={link.href}>{link.text}</a>);
      return;
    }
    parts.push(remaining.slice(0, matchIndex));
    parts.push(<a key={link.href + link.text + index} href={link.href}>{link.text}</a>);
    remaining = remaining.slice(matchIndex + link.text.length);
  });
  parts.push(remaining);
  return <p>{parts}</p>;
};

const ContentBlock = ({ block }: { block: InsightContentBlock; key?: React.Key }) => {
  switch (block.type) {
    case 'heading':
      return block.level === 2 ? <h2>{block.text}</h2> : <h3>{block.text}</h3>;
    case 'paragraph':
      return <RichTextParagraph block={block} />;
    case 'list': {
      const List = block.style === 'ordered' ? 'ol' : 'ul';
      return <List>{block.items.map((item) => <li key={item}>{item}</li>)}</List>;
    }
    case 'table':
      return (
        <div className="insight-table-wrap">
          <table>
            {block.caption ? <caption>{block.caption}</caption> : null}
            <thead><tr>{block.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
            <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    case 'quote':
      return <blockquote><p>{block.text}</p>{block.attribution ? <cite>{block.attribution}</cite> : null}</blockquote>;
    case 'image':
      return <figure><img className="insight-article-inline" src={block.src} alt={block.alt} width={block.width} height={block.height} loading="lazy" decoding="async" />{block.caption ? <figcaption>{block.caption}</figcaption> : null}</figure>;
    case 'callout':
      return <aside className="insight-callout">{block.title ? <h3>{block.title}</h3> : null}<p>{block.text}</p></aside>;
    case 'embed':
      return <div className="insight-embed"><iframe src={block.url} title={block.title} loading="lazy" allowFullScreen /></div>;
  }
};

export const InsightArticlePage = ({ slug, onNavigate, language: _language }: { slug: string; onNavigate: (path: string) => void; language: Language }) => {
  const insight = getInsight(slug);
  if (!insight) return null;
  const category = getInsightCategory(insight.primaryCategory)!;
  const related = getRelatedInsights(insight);
  const divisionPath = '/' + (insight.relatedDivision || insight.relatedDivisions[0]);
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <main className="insight-article-page" dir="ltr" lang="en">
      <article>
        <Breadcrumbs
          onNavigate={onNavigate}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Insights', href: '/insights' },
            { label: category.label, href: '/insights/' + category.slug },
            { label: insight.title },
          ]}
        />
        <header className="insight-article-heading">
          <p><a href={'/insights/' + category.slug} onClick={(event) => navigate(event, '/insights/' + category.slug)}>{category.label}</a><span>{insight.readingTime}</span></p>
          <h1>{insight.title}</h1>
          <p className="insight-article-intro">{insight.excerpt}</p>
          <dl className="insight-article-byline">
            <div><dt>Published</dt><dd><time dateTime={insight.publishedAt}>{formatPublishedDate(insight.publishedAt)}</time></dd></div>
            <div><dt>Author</dt><dd>{insight.author}</dd></div>
          </dl>
        </header>

        <img
          className="insight-article-hero"
          src={insight.featuredImage}
          alt={insight.featuredImageAlt}
          width={insight.featuredImageWidth}
          height={insight.featuredImageHeight}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        <div className="insight-article-layout">
          <aside aria-label="Article topics">
            <div><p>Category</p><span>{category.label}</span></div>
            <div><p>Topics</p><span>{insight.topics.join(' · ')}</span></div>
          </aside>
          <div className="insight-article-body">{insight.content.map((block, index) => <ContentBlock key={index} block={block} />)}</div>
        </div>

        <section className="insight-related-division" aria-labelledby="related-division-title">
          <p>Related NEXSUS division</p>
          <h2 id="related-division-title">{category.divisionLabel}</h2>
          {insight.relatedServices?.length ? <ul>{insight.relatedServices.map((service) => <li key={service}>{service}</li>)}</ul> : null}
          <a href={divisionPath} onClick={(event) => navigate(event, divisionPath)}>Explore {category.divisionLabel} →</a>
        </section>

        {related.length ? (
          <section className="insight-recent" aria-labelledby="related-insights-title">
            <header><h2 id="related-insights-title">RELATED INSIGHTS</h2><a href="/insights" onClick={(event) => navigate(event, '/insights')}>View all insights</a></header>
            <div>{related.map((item) => <InsightCard key={item.slug} insight={item} headingLevel={3} onNavigate={onNavigate} />)}</div>
          </section>
        ) : null}
      </article>
    </main>
  );
};

export default InsightArticlePage;
