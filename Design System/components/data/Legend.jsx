import React from 'react';

export function Legend({ items = [], style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap',
      fontFamily: 'var(--il-font-sans)', fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-text-color-secondary)', ...style
    }}>
      {items.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
          <span style={{
            width: it.dot ? 8 : 16, height: it.dot ? 8 : 14, flex: '0 0 auto',
            borderRadius: it.dot ? '50%' : 3,
            background: it.swatch || 'transparent',
            border: it.border ? `1px solid ${it.border}` : it.dot ? 'none' : '1px solid var(--el-border-color-light)'
          }} />
          <span style={{ color: 'var(--el-text-color-regular)' }}>{it.label}</span>
          {it.hint && <span style={{ color: 'var(--el-text-color-placeholder)' }}>{it.hint}</span>}
        </span>
      ))}
    </div>
  );
}
