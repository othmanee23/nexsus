import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import type { Language } from '../i18n';
import { getInsightsByDivision, INSIGHT_CATEGORIES, type DivisionSlug } from '../insights';
import { DIVISION_LANDING_CONTENT, type DivisionParagraph } from '../divisionContent';
import { Breadcrumbs } from './Breadcrumbs';
import { DIVISIONS_BY_LANGUAGE } from './DivisionsGrid';
import { InsightCard } from './InsightCard';
import { ResponsiveServiceImage } from './ResponsiveServiceImage';

const labels: Record<Language, { mission: string; capabilities: string; approach: string; vision: string; related: string }> = {
  en: { mission: 'Mission', capabilities: 'Capabilities', approach: 'Approach', vision: 'Vision', related: 'Related insights' },
  fr: { mission: 'Mission', capabilities: 'Expertises', approach: 'Approche', vision: 'Vision', related: 'Insights associés' },
  ar: { mission: 'المهمة', capabilities: 'الخبرات', approach: 'المنهج', vision: 'الرؤية', related: 'رؤى ذات صلة' },
};

const linkedParagraph = (
  paragraph: DivisionParagraph,
  navigate: (event: React.MouseEvent<HTMLAnchorElement>, path: string) => void,
) => {
  if (!paragraph.links?.length) return paragraph.text;

  const links = [...paragraph.links].sort((a, b) => paragraph.text.indexOf(a.text) - paragraph.text.indexOf(b.text));
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  links.forEach((link) => {
    const index = paragraph.text.indexOf(link.text, cursor);
    if (index === -1) return;
    nodes.push(paragraph.text.slice(cursor, index));
    nodes.push(
      <a key={`${link.href}-${index}`} href={link.href} onClick={(event) => navigate(event, link.href)}>
        {link.text}
      </a>,
    );
    cursor = index + link.text.length;
  });
  nodes.push(paragraph.text.slice(cursor));
  return nodes;
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const division = DIVISIONS_BY_LANGUAGE[language].find((item) => item.id === slug)!;
  const content = DIVISION_LANDING_CONTENT[slug];
  const relatedInsights = getInsightsByDivision(slug).slice(0, 3);
  const insightCategory = INSIGHT_CATEGORIES.find((category) => category.division === slug)!;
  const insightCategoryPath = '/insights/' + insightCategory.slug;
  const contactPath = '/contact';
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
          <h1>{language === 'en' ? content.heroTitle : slug === 'amaris' ? 'AMARIS' : 'NEXSUS ' + division.name}</h1>
          <p className="division-page-lead">{language === 'en' ? content.heroStatement : division.description}</p>
          <div className="division-page-actions">
            <a href={contactPath} onClick={(event) => navigate(event, contactPath)}>
              {language === 'en' ? content.primaryCta : division.cta}<ArrowUpRight aria-hidden="true" />
            </a>
            <a href={insightCategoryPath} onClick={(event) => navigate(event, insightCategoryPath)}>
              {language === 'en' ? content.secondaryCta : t.related}<ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <ResponsiveServiceImage
          src={division.image}
          alt={`${division.name} — ${division.subtitle}`}
          sizes="(max-width: 1023px) calc(100vw - 2rem), 42vw"
          loading="eager"
          fetchPriority="high"
        />
      </header>

      {language === 'en' ? (
        <>
          <section className="division-offer" aria-labelledby="division-offer-title">
            <header>
              <p>Capabilities</p>
              <h2 id="division-offer-title">{content.offerTitle}</h2>
              <p>{content.offerIntro}</p>
            </header>
            <div className="division-capability-grid">
              {content.capabilities.map((capability, index) => (
                <article key={capability.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              ))}
            </div>
          </section>

          {content.supportingSections.map((section) => (
            <section className="division-editorial-section" key={section.title}>
              <h2>{section.title}</h2>
              <div>
                {section.paragraphs.map((paragraph) => <p key={paragraph.text}>{linkedParagraph(paragraph, navigate)}</p>)}
                {section.items?.length ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </div>
            </section>
          ))}

          <section className="division-approach" aria-labelledby="division-approach-title">
            <header>
              <h2 id="division-approach-title">{content.approachTitle}</h2>
              <p>{content.approachIntro}</p>
            </header>
            <ol>
              {content.approach.map((step, index) => (
                <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>
              ))}
            </ol>
          </section>
        </>
      ) : (
        <div className="division-page-details">
          <section><p>{t.mission}</p><h2>{division.mission}</h2></section>
          <section><h2>{t.capabilities}</h2><ul>{division.bullets.map((capability) => <li key={capability}>{capability}</li>)}</ul></section>
          <section><h2>{t.approach}</h2><p>{division.approach}</p></section>
          <section><h2>{t.vision}</h2><p>{division.vision}</p></section>
        </div>
      )}

      {relatedInsights.length ? (
        <section className="division-related-insights" aria-labelledby="division-related-title">
          <header>
            <h2 id="division-related-title">{language === 'en' ? content.relatedTitle : t.related}</h2>
            <a href={insightCategoryPath} onClick={(event) => navigate(event, insightCategoryPath)}>View all {insightCategory.label} insights</a>
          </header>
          <div>{relatedInsights.map((insight) => <InsightCard key={insight.slug} insight={insight} headingLevel={3} onNavigate={onNavigate} />)}</div>
        </section>
      ) : null}

      {language === 'en' ? (
        <section className="division-faq" aria-labelledby="division-faq-title">
          <header>
            <h2 id="division-faq-title">{content.faqTitle}</h2>
            <p>{content.faqIntro}</p>
          </header>
          <div>
            {content.faq.map((item, index) => {
              const expanded = openFaq === index;
              const buttonId = `${slug}-faq-button-${index}`;
              const panelId = `${slug}-faq-panel-${index}`;
              return (
                <article key={item.question}>
                  <h3>
                    <button id={buttonId} type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpenFaq(expanded ? null : index)}>
                      <span>{String(index + 1).padStart(2, '0')} / {item.question}</span>
                      <ChevronDown aria-hidden="true" className={expanded ? 'is-open' : ''} />
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded}>
                    {item.answer.map((paragraph) => <p key={paragraph.text}>{linkedParagraph(paragraph, navigate)}</p>)}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {language === 'en' ? (
        <section className="division-final-cta">
          <h2>{content.primaryCta}</h2>
          <p>Tell us what you are planning, what stage it has reached and what a successful outcome should look like.</p>
          <a href={contactPath} onClick={(event) => navigate(event, contactPath)}>{content.primaryCta}<ArrowUpRight aria-hidden="true" /></a>
        </section>
      ) : null}
    </main>
  );
};
