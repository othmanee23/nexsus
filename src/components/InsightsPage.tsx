import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { INSIGHTS } from '../insights';
import { copy, Language } from '../i18n';

interface InsightsPageProps {
  onNavigate: (path: string) => void;
  language: Language;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate, language }) => {
  const t = copy[language];

  return (
    <main className="flex-1 bg-white px-4 py-16 text-black sm:px-8 sm:py-20 lg:px-12">
      <section className="mx-auto w-full max-w-[1800px]">
        <div className="grid grid-cols-1 gap-8 border-b border-black/10 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-[11px] font-mono uppercase tracking-widest text-black/50">
              {t.insights}
            </div>
            <h1 className="mt-4 text-4xl font-medium uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {t.insightsTitle}
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-black/60 lg:col-span-4 lg:col-start-9 lg:self-end">
            {t.insightsDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 py-12 md:grid-cols-2">
          {INSIGHTS.map((insight) => (
            <article key={insight.slug} className="group">
              <button
                type="button"
                onClick={() => onNavigate(`/insight/${insight.slug}`)}
                className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <div className="aspect-[16/8] w-full overflow-hidden bg-black/5">
                  <img
                    src={insight.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-5">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-black/45">
                      {insight.category} · {insight.readTime}
                    </div>
                    <h2 className="mt-2 text-xl font-medium uppercase tracking-tight text-black">
                      {insight.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/60">
                      {insight.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default InsightsPage;
