import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs = ({ items, onNavigate }: { items: BreadcrumbItem[]; onNavigate: (path: string) => void }) => {
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.label} aria-current={index === items.length - 1 ? 'page' : undefined}>
            {item.href ? <a href={item.href} onClick={(event) => navigate(event, item.href!)}>{item.label}</a> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

