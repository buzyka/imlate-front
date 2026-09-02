import React from 'react';

/** Element Plus icon set, copied to assets/icons as raw SVG. */
export function Icon({ name, size = 16, color = 'currentColor', base = '/assets/icons', style }) {
  return (
    <span
      role="img"
      aria-hidden="true"
      style={{
        display: 'inline-block', width: size, height: size,
        background: color,
        WebkitMaskImage: `url(${base}/${name}.svg)`, maskImage: `url(${base}/${name}.svg)`,
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskPosition: 'center', maskPosition: 'center',
        flex: '0 0 auto', ...style
      }}
    />
  );
}
