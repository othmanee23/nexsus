import React from 'react';
export const InsightArtwork = ({ src, aspectRatio = '213 / 110' }: { src: string; aspectRatio?: string }) => {
  return <div className="insight-artwork" style={{ aspectRatio }}>
    <img src={src} alt="" loading="lazy" />
  </div>;
};
