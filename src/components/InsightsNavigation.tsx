import React from 'react';
import { INSIGHT_CATEGORIES, type InsightCategorySlug } from '../insights';

export const InsightsNavigation = ({ activeCategory, onNavigate }: { activeCategory?: InsightCategorySlug; onNavigate: (path: string) => void }) => {
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <nav className="insights-categories" aria-label="Insight categories">
      <a href="/insights" aria-current={!activeCategory ? 'page' : undefined} onClick={(event) => navigate(event, '/insights')}>All</a>
      {INSIGHT_CATEGORIES.map((category) => {
        const path = '/insights/' + category.slug;
        return <a key={category.slug} href={path} aria-current={activeCategory === category.slug ? 'page' : undefined} onClick={(event) => navigate(event, path)}>{category.label}</a>;
      })}
    </nav>
  );
};

