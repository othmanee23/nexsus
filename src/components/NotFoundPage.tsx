import React from 'react';

export const NotFoundPage = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate('/');
  };
  return (
    <main className="not-found-page">
      <p>404</p>
      <h1>Page not found</h1>
      <a href="/" onClick={navigate}>Return to NEXSUS</a>
    </main>
  );
};
