import React from 'react';

const PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">' +
  '<rect width="80" height="80" fill="#e0e0e0" rx="40"/>' +
  '<text x="40" y="46" text-anchor="middle" fill="#999" font-size="11" font-family="sans-serif">No image</text>' +
  '</svg>'
);

export function Avatar({ src, size = 40, alt = '', style }) {
  return (
    <img
      src={src || PLACEHOLDER}
      alt={alt}
      style={{ width: size, height: size, borderRadius: 'var(--il-radius-avatar)', objectFit: 'cover', display: 'block', flex: '0 0 auto', ...style }}
    />
  );
}

export const AVATAR_PLACEHOLDER = PLACEHOLDER;
