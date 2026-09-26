import React from 'react';
import { getInsightCategory, type Insight } from '../insights';
import { formatPublishedDate } from '../seo';
import { InsightReadImage } from './InsightReadImage';

interface InsightCardProps {
  insight: Insight;
  headingLevel?: 2 | 3;
  onNavigate: (path: string) => void;
  key?: React.Key;
}

export const InsightCard = ({ insight, headingLevel = 2, onNavigate }: InsightCardProps) => {
  const path = '/insights/' + insight.slug;
  const category = getInsightCategory(insight.primaryCategory);
  const Heading = ('h' + headingLevel) as 'h2' | 'h3';
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <article>
      <a className="insights-card" href={path} onClick={navigate}>
        <InsightReadImage src={insight.featuredImage} alt={insight.featuredImageAlt} width={insight.featuredImageWidth} height={insight.featuredImageHeight} />
        <p className="insights-meta">
          <span>{category?.label}</span>
          <time dateTime={insight.publishedAt}>{formatPublishedDate(insight.publishedAt)}</time>
          <span>{insight.readingTime}</span>
        </p>
        <Heading title={insight.title}>{insight.title}</Heading>
        <p className="insights-excerpt">{insight.excerpt}</p>
      </a>
    </article>
  );
};
