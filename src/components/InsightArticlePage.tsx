import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { INSIGHTS, getInsight } from '../insights';
import { copy, Language } from '../i18n';

interface InsightArticlePageProps {
  slug: string;
  onNavigate: (path: string) => void;
  language: Language;
}

export const InsightArticlePage: React.FC<InsightArticlePageProps> = ({ slug, onNavigate, language }) => {
  const insight = getInsight(slug) || INSIGHTS[0];
  const recent = INSIGHTS.filter((item) => item.slug !== insight.slug).slice(0, 3);
  const t = copy[language];

  return (
    <main className="flex-1 bg-white px-4 py-14 text-black sm:px-8 sm:py-20 lg:px-12">
      <article className="mx-auto w-full max-w-[1800px]">
        <button
          type="button"
          onClick={() => onNavigate('/insight')}
          className="mb-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black/60 transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t.insights}
        </button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <header className="lg:col-span-12">
            <div className="text-[11px] font-mono uppercase tracking-widest text-black/50">
              {insight.category} · {insight.readTime}
            </div>
            <h1 className="mt-3 max-w-5xl text-4xl font-medium uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              {insight.title}
            </h1>
          </header>

          <div className="lg:col-span-12">
            <img
              src={insight.image}
              alt=""
              className="aspect-[16/6] w-full bg-black/5 object-cover"
              loading="eager"
            />
          </div>

          <aside className="grid grid-cols-2 gap-6 text-xs font-mono uppercase tracking-wider text-black/60 lg:col-span-3">
            <div>
              <div className="text-black/35">Published</div>
              <div className="mt-1 text-black">{insight.published}</div>
            </div>
            <div>
              <div className="text-black/35">Author</div>
              <div className="mt-1 text-black">{insight.author}</div>
            </div>
          </aside>

          <div className="space-y-8 lg:col-span-7 lg:col-start-6">
            <p className="text-base leading-relaxed text-black/70 sm:text-lg">
              {insight.excerpt}
            </p>
            {insight.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-medium uppercase tracking-tight text-black">
                  {section.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-black/70">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="mx-auto mt-20 w-full max-w-[1800px] border-t border-black/10 pt-8">
        <div className="mb-6 flex items-end justify-between gap-6">
          <h2 className="text-2xl font-medium uppercase tracking-tight text-black">
            {t.recentInsights}
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('/insight')}
            className="text-xs font-mono uppercase tracking-widest text-black transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            {t.viewAll}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {recent.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => onNavigate(`/insight/${item.slug}`)}
              className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <img src={item.image} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
              <div className="mt-3 text-[10px] font-mono uppercase tracking-widest text-black/45">
                {item.category} · {item.readTime}
              </div>
              <div className="mt-1 flex items-start justify-between gap-3">
                <h3 className="text-sm font-medium uppercase text-black">{item.title}</h3>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default InsightArticlePage;
