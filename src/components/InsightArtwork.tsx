import React from 'react';
import { ResponsiveServiceImage } from './ResponsiveServiceImage';
export const InsightArtwork = ({ src, aspectRatio = '213 / 110' }: { src: string; aspectRatio?: string }) => {
  return <div className="insight-artwork" style={{ aspectRatio }}>
    {src.startsWith('/images/service-') ? (
      <ResponsiveServiceImage
        src={src}
        alt=""
        sizes="(max-width: 767px) calc(100vw - 2rem), 34vw"
        loading="lazy"
      />
    ) : (
      <img src={src} alt="" loading="lazy" decoding="async" />
    )}
  </div>;
};
