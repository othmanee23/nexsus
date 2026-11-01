import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Language } from '../i18n';
import { getInsightsByDivision, INSIGHT_CATEGORIES, type DivisionSlug } from '../insights';
import { Breadcrumbs } from './Breadcrumbs';
import { DIVISIONS_BY_LANGUAGE } from './DivisionsGrid';
import { InsightCard } from './InsightCard';

const labels: Record<Language, { overview: string; mission: string; capabilities: string; approach: string; vision: string; related: string }> = {
  en: { overview: 'Overview', mission: 'Mission', capabilities: 'Capabilities', approach: 'Approach', vision: 'Vision', related: 'Related insights' },
  fr: { overview: 'Aperçu', mission: 'Mission', capabilities: 'Expertises', approach: 'Approche', vision: 'Vision', related: 'Insights associés' },
  ar: { overview: 'نظرة عامة', mission: 'المهمة', capabilities: 'الخبرات', approach: 'المنهج', vision: 'الرؤية', related: 'رؤى ذات صلة' },
};

export const DivisionPage = ({
  slug,
  language,
  onNavigate,
}: {
  slug: DivisionSlug;
  language: Language;
  onNavigate: (path: string) => void;
}) => {
  const division = DIVISIONS_BY_LANGUAGE[language].find((item) => item.id === slug)!;
  const relatedInsights = getInsightsByDivision(slug).slice(0, 3);
  const insightCategory = INSIGHT_CATEGORIES.find((category) => category.division === slug)!;
  const insightCategoryPath = '/insights/' + insightCategory.slug;
  const t = labels[language];
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <main className="division-page">
      <Breadcrumbs onNavigate={onNavigate} items={[{ label: 'Home', href: '/' }, { label: division.name }]} />
      <header className="division-page-hero">
        <div>
          <p>{division.code} / {division.subtitle}</p>
          <h1>{slug === 'amaris' ? 'AMARIS' : 'NEXSUS ' + division.name}</h1>
          <p className="division-page-lead">{division.description}</p>
          <a href="/contact" onClick={(event) => navigate(event, '/contact')}>{division.cta}<ArrowUpRight aria-hidden="true" /></a>
        </div>
        <img src={division.image} alt={division.name + ' division'} width={1200} height={1141} loading="eager" fetchPriority="high" />
      </header>

      <div className="division-page-details">
        <section>
          <p>{t.mission}</p>
          <h2>{division.mission}</h2>
        </section>
        <section>
          <h2>{t.capabilities}</h2>
          <ul>{division.bullets.map((capability) => <li key={capability}>{capability}</li>)}</ul>
        </section>
        <section>
          <h2>{t.approach}</h2>
          <p>{division.approach}</p>
        </section>
        <section>
          <h2>{t.vision}</h2>
          <p>{division.vision}</p>
        </section>
      </div>

      {relatedInsights.length ? (
        <section className="division-related-insights" aria-labelledby="division-related-title">
          <header>
            <h2 id="division-related-title">{t.related}</h2>
            <a href={insightCategoryPath} onClick={(event) => navigate(event, insightCategoryPath)}>View all {insightCategory.label} insights</a>
          </header>
          <div>{relatedInsights.map((insight) => <InsightCard key={insight.slug} insight={insight} headingLevel={3} onNavigate={onNavigate} />)}</div>
        </section>
      ) : null}
    </main>
  );
};

