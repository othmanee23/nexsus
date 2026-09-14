import React from 'react';
import { INSIGHTS, getInsight } from '../insights';
import { TEMPLATE_INSIGHTS } from '../insightTemplate';
import { Language } from '../i18n';
import { InsightReadImage } from './InsightReadImage';

export const InsightArticlePage = ({ slug, onNavigate, language }: { slug: string; onNavigate: (path: string) => void; language: Language }) => {
  const insight = getInsight(slug) || INSIGHTS[0];
  const recent = TEMPLATE_INSIGHTS.filter(item => item.slug !== slug).slice(0, 3);
  const href = (path: string) => `${language === 'en' ? '' : `/${language}`}${path}`;
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); onNavigate(path);
  };
  return <main className="insight-article-page" dir="ltr" lang="en">
    <article>
      <header className="insight-article-heading">
        <p>Tooling <span>{insight.readTime}</span></p>
        <h1>{insight.title}</h1>
      </header>
      <img className="insight-article-hero" src={insight.image} alt="" loading="eager" />
      <div className="insight-article-layout">
        <aside><div><p>Published</p><span>{insight.published}</span></div><div><p>Author</p><span>{insight.author}</span></div></aside>
        <div className="insight-article-body">
          <p className="insight-article-intro">{insight.excerpt}</p>
          {insight.sections.map((section, index) => <React.Fragment key={section.heading}>
            <section><h2>{section.heading}</h2><p>{section.body}</p></section>
            {index === 2 && <img className="insight-article-inline" src="/images/insights/amaris-red.jpeg" alt="Amaris from NEXSUS" loading="lazy" />}
          </React.Fragment>)}
        </div>
      </div>
    </article>
    <section className="insight-recent">
      <header><h2>RECENT ARTICLES</h2><a href={href('/insight')} onClick={event => navigate(event, '/insight')}>View all articles</a></header>
      <div>{recent.map(item => <article key={item.slug}><a className="insights-card" href={href(`/insight/${item.slug}`)} onClick={event => navigate(event, `/insight/${item.slug}`)}>
        <InsightReadImage src={item.image} /><h3 title={item.title}>{item.title}</h3><p className="insights-meta">Tooling · 4 min</p><p className="insights-excerpt">{item.excerpt}</p>
      </a></article>)}</div>
    </section>
  </main>;
};
export default InsightArticlePage;
