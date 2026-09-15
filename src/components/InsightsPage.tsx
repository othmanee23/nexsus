import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../i18n';
import { TEMPLATE_INSIGHTS } from '../insightTemplate';
import { InsightArtwork } from './InsightArtwork';
import { InsightReadImage } from './InsightReadImage';

const services = [
  { title: 'TECHNOLOGY & AI FACTORY', image: '/images/service-technology.png', aspectRatio: '124 / 141' },
  { title: 'BRAND POWERHOUSE', image: '/images/service-amaris.png', aspectRatio: '157 / 192' },
  { title: 'PERFORMANCE ENGINE', image: '/images/service-ventures.png', aspectRatio: '135 / 120' },
];

export const InsightsPage = ({ onNavigate, language }: { onNavigate: (path: string) => void; language: Language }) => {
  const [offset, setOffset] = useState(0);
  const contactCursor = useRef<HTMLSpanElement>(null);
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
    <div className="insights-grid">{TEMPLATE_INSIGHTS.map(item => <article key={item.slug}>
      <a className="insights-card" href={href(`/insight/${item.slug}`)} onClick={event => navigate(event, `/insight/${item.slug}`)}>
        <InsightReadImage src={item.image} />
        <p className="insights-meta">Tooling · 4 min</p><h2 title={item.title}>{item.title}</h2><p className="insights-excerpt">{item.excerpt}</p>
      </a>
    </article>)}</div>
    <a className="insights-statement" aria-label="Get in touch" href={href('/contact')} onClick={event => navigate(event, '/contact')}
      onPointerMove={event => {
        if (event.pointerType !== 'mouse' || !contactCursor.current) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        contactCursor.current.style.left = `${event.clientX - bounds.left}px`;
        contactCursor.current.style.top = `${event.clientY - bounds.top}px`;
      }}>
      <h2>WE CREATE THE DIFFERENCE<br />BETWEEN BEING SEEN<br />AND BEING REMEMBERED.</h2>
      <span ref={contactCursor}>GET IN TOUCH</span>
    </a>
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
