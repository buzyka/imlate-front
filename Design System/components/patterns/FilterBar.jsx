import React from 'react';

export function FilterBar({ children, style }) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', ...style }}>{children}</div>
  );
}

export function FilterItem({ width = 'var(--il-filter-item-width)', children, style }) {
  return <div style={{ width, ...style }}>{children}</div>;
}
