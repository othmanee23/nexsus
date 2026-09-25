import React, { useRef } from 'react';

export const InsightReadImage = ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => {
  const cursor = useRef<HTMLSpanElement>(null);
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !cursor.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    cursor.current.style.left = `${event.clientX - bounds.left}px`;
    cursor.current.style.top = `${event.clientY - bounds.top}px`;
  };
  return <div className="insights-card-image" onPointerEnter={move} onPointerMove={move}>
    <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
    <span ref={cursor} className="insights-read" aria-hidden="true">READ</span>
  </div>;
};
