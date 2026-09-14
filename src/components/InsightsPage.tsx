import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../i18n';
import { TEMPLATE_INSIGHTS } from '../insightTemplate';
import { InsightArtwork } from './InsightArtwork';

const services = [
  { title: 'TECHNOLOGY & AI FACTORY', image: '/images/division-technology.jpg', aspectRatio: '124 / 141' },
  { title: 'BRAND POWERHOUSE', image: '/images/division-amaris.jpg', aspectRatio: '157 / 192' },
  { title: 'PERFORMANCE ENGINE', image: '/images/division-ventures.jpg', aspectRatio: '135 / 120' },
];

export const InsightsPage = ({ onNavigate, language }: { onNavigate: (path: string) => void; language: Language }) => {
  const [category, setCategory] = useState(0);
  const [page, setPage] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const grid = useRef<HTMLDivElement>(null);
  const filtered = TEMPLATE_INSIGHTS.filter(item => !category || item.category === category);
  const visible = page === null ? filtered : filtered.slice(page * 2, page * 2 + 2);
  const href = (path: string) => `${language === 'en' ? '' : `/${language}`}${path}`;
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); onNavigate(path);
  };
  return <main className="insights-template" dir="ltr" lang="en">
    <header className="insights-intro">
      <div><p className="insights-eyebrow">NEWS</p><h1>THE LATEST<br />FROM OUR BLOG</h1></div>
      <p className="insights-description">Expand your digital understanding.<br />Insights from industry experts.</p>
    </header>
    <nav className="insights-categories" aria-label="Article categories">
      <button type="button" onClick={() => { setCategory(0); setPage(null); }} aria-pressed={!category}>SORT BY</button>
      {[1, 2, 3, 4, 5].map(value => <button type="button" key={value} aria-pressed={category === value} onClick={() => { setCategory(category === value ? 0 : value); setPage(null); }}>Category {value}</button>)}
    </nav>
    <div className="insights-grid" ref={grid}>{visible.map(item => <article key={item.slug}>
      <a className="insights-card" href={href(`/insight/${item.slug}`)} onClick={event => navigate(event, `/insight/${item.slug}`)}>
        <div className="insights-card-image"><InsightArtwork src={item.image} /><span className="insights-read">READ</span></div>
        <p className="insights-meta">Tooling · 4 min</p><h2 title={item.title}>{item.title}</h2><p className="insights-excerpt">{item.excerpt}</p>
      </a>
    </article>)}</div>
    <nav className="insights-pagination" aria-label="Article pages">
      <button type="button" disabled={page === null} onClick={() => setPage(null)}>SHOW MORE</button>
      <div>{Array.from({ length: Math.ceil(filtered.length / 2) }, (_, index) => <button type="button" key={index} aria-label={`Article page ${index + 1}`} aria-current={page === index ? 'page' : undefined} onClick={() => { setPage(index); grid.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{String(index + 1).padStart(2, '0')}</button>)}</div>
    </nav>
    <section className="insights-statement" aria-label="Work with us">
      <h2>WE CREATE THE DIFFERENCE<br />BETWEEN BEING SEEN<br />AND BEING REMEMBERED.</h2>
      <a href={href('/contact')} onClick={event => navigate(event, '/contact')}>GET IN TOUCH</a>
    </section>
    <section className="insights-services">
      <header><h2>WHAT WE DO</h2><div>
        <button type="button" title="Previous services" aria-label="Previous services" onClick={() => setOffset((offset + 2) % 3)}><ChevronLeft size={18} /></button>
        <button type="button" title="Next services" aria-label="Next services" onClick={() => setOffset((offset + 1) % 3)}><ChevronRight size={18} /></button>
      </div></header>
      <div className="insights-service-grid">{services.map((_, index) => {
        const service = services[(index + offset) % services.length];
        return <a key={service.title} href={href('/contact')} onClick={event => navigate(event, '/contact')}><InsightArtwork src={service.image} aspectRatio={service.aspectRatio} /><h3>{service.title}</h3><p>A brand operating system for the world’s biggest operating system.</p></a>;
      })}</div>
    </section>
  </main>;
};
export default InsightsPage;
