import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Language } from '../i18n';
import { INSIGHTS, getInsightCategory, getInsightsByCategory, type InsightCategorySlug } from '../insights';
import { Breadcrumbs } from './Breadcrumbs';
import { InsightArtwork } from './InsightArtwork';
import { InsightCard } from './InsightCard';
import { InsightsNavigation } from './InsightsNavigation';

const services = [
  { title: 'TECHNOLOGY & AI FACTORY', image: '/images/service-technology.png', aspectRatio: '124 / 141', path: '/technology' },
  { title: 'BRAND POWERHOUSE', image: '/images/service-amaris.png', aspectRatio: '157 / 192', path: '/amaris' },
  { title: 'PERFORMANCE ENGINE', image: '/images/service-ventures.png', aspectRatio: '135 / 120', path: '/ventures' },
];

export const InsightsPage = ({ onNavigate, language: _language, categorySlug }: { onNavigate: (path: string) => void; language: Language; categorySlug?: InsightCategorySlug }) => {
  const [offset, setOffset] = useState(0);
  const contactCursor = useRef<HTMLSpanElement>(null);
  const category = categorySlug ? getInsightCategory(categorySlug) : undefined;
  const articles = categorySlug ? getInsightsByCategory(categorySlug) : INSIGHTS;
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <main className="insights-template" dir="ltr" lang="en">
      {category ? <Breadcrumbs onNavigate={onNavigate} items={[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights' }, { label: category.label }]} /> : null}
      <header className="insights-intro">
        <div>
          <p className="insights-eyebrow">{category ? category.label.toUpperCase() : 'INSIGHTS'}</p>
          <h1>{category ? category.heading : <>THE LATEST<br />FROM NEXSUS</>}</h1>
        </div>
        <p className="insights-description">
          {category ? category.introduction : <>Perspectives across projects, technology,<br />brand and creative, and ventures.</>}
        </p>
      </header>

      <InsightsNavigation activeCategory={categorySlug} onNavigate={onNavigate} />

      {articles.length ? (
        <section aria-label={category ? category.label + ' articles' : 'Latest insights'}>
          <div className="insights-grid">{articles.map((insight) => <InsightCard key={insight.slug} insight={insight} onNavigate={onNavigate} />)}</div>
        </section>
      ) : (
        <section className="insights-empty" aria-labelledby="insights-empty-title">
          <h2 id="insights-empty-title">Insights in development</h2>
          <p>This hub is ready for future {category?.label.toLowerCase()} perspectives.</p>
        </section>
      )}

      {category ? (
        <aside className="insights-division-link">
          <p>Related NEXSUS division</p>
          <a href={'/' + category.division} onClick={(event) => navigate(event, '/' + category.division)}>Explore {category.divisionLabel} →</a>
        </aside>
      ) : null}

      <a
        className="insights-statement"
        aria-label="Get in touch"
        href="/contact"
        onClick={(event) => navigate(event, '/contact')}
        onPointerMove={(event) => {
          if (event.pointerType !== 'mouse' || !contactCursor.current) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          contactCursor.current.style.left = event.clientX - bounds.left + 'px';
          contactCursor.current.style.top = event.clientY - bounds.top + 'px';
        }}
        onPointerLeave={() => {
          if (!contactCursor.current) return;
          contactCursor.current.style.left = '';
          contactCursor.current.style.top = '';
        }}
      >
        <h2>WE CREATE THE DIFFERENCE<br />BETWEEN BEING SEEN<br />AND BEING REMEMBERED.</h2>
        <span ref={contactCursor}>GET IN TOUCH</span>
      </a>

      <section className="insights-services">
        <header>
          <h2>WHAT WE DO</h2>
          <div>
            <button type="button" title="Previous services" aria-label="Previous services" onClick={() => setOffset((offset + 2) % 3)}><ChevronLeft size={18} /></button>
            <button type="button" title="Next services" aria-label="Next services" onClick={() => setOffset((offset + 1) % 3)}><ChevronRight size={18} /></button>
          </div>
        </header>
        <div className="insights-service-grid">
          {services.map((_, index) => {
            const service = services[(index + offset) % services.length];
            return (
              <a key={service.title} href={service.path} onClick={(event) => navigate(event, service.path)}>
                <InsightArtwork src={service.image} aspectRatio={service.aspectRatio} />
                <h3>{service.title}</h3>
                <p>Explore the relevant NEXSUS division and its capabilities.</p>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default InsightsPage;
