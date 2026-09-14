import React from 'react';
export type ArtworkCrop = [number, number, number, number];
// Isolate artwork from the supplied temporary reference, excluding surrounding copy.
export const InsightArtwork = ({ crop }: { crop: ArtworkCrop }) => {
  const [x, y, width, height] = crop;
  return <div className="insight-artwork" style={{ aspectRatio: `${width} / ${height}` }}>
    <img src="/images/insights/insight-index-template.jpeg" alt="" loading="lazy" style={{ width: `${465 / width * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
  </div>;
};
