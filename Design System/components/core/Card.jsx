import React from 'react';

export function Card({ header, extra, shadow = 'always', lift = false, bodyStyle, children, style }) {
  const [hover, setHover] = React.useState(false);
  const shadowed = shadow === 'always' || (shadow === 'hover' && hover);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--il-surface-card)',
        border: '1px solid var(--il-border-card)',
        borderRadius: 'var(--il-radius-card-lg)',
        boxShadow: hover && lift ? 'var(--il-shadow-card-hover)' : shadowed ? 'var(--il-shadow-card)' : 'none',
        transform: hover && lift ? 'var(--il-lift-card)' : 'none',
        transition: 'var(--il-transition-card)',
        color: 'var(--el-text-color-primary)',
        fontFamily: 'var(--il-font-sans)', fontSize: 'var(--il-fs-body)',
        overflow: 'hidden', ...style
      }}
    >
      {(header || extra) && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          padding: '18px 20px', borderBottom: '1px solid var(--el-border-color-lighter)',
          fontSize: 'var(--il-fs-card-header)', color: 'var(--il-text-slate)'
        }}>
          <div>{header}</div>
          {extra}
        </div>
      )}
      <div style={{ padding: 20, ...bodyStyle }}>{children}</div>
    </div>
  );
}

export function CardSubtitle({ children }) {
  return <div style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--il-text-mute)', marginTop: 2 }}>{children}</div>;
}
