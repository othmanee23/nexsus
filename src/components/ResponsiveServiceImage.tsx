import React from 'react';

type ResponsiveServiceImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'width' | 'height'
> & {
  src: string;
  sizes: string;
};

export const ResponsiveServiceImage = ({
  src,
  sizes,
  alt = '',
  decoding = 'async',
  ...imageProps
}: ResponsiveServiceImageProps) => {
  const base = src.replace(/\.png$/, '');

  return (
    <picture className="contents">
      <source
        type="image/avif"
        srcSet={`${base}-640.avif 640w, ${base}-960.avif 960w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${base}-640.webp 640w, ${base}-960.webp 960w`}
        sizes={sizes}
      />
      <img
        {...imageProps}
        src={src}
        alt={alt}
        width={1200}
        height={1141}
        decoding={decoding}
      />
    </picture>
  );
};
