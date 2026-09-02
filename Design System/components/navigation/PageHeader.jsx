import React from 'react';

export function PageHeader({ title, description, actions, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, fontFamily: 'var(--il-font-sans)', ...style }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 'var(--il-fs-h2)', fontWeight: 'var(--il-fw-semibold)', color: 'var(--el-text-color-primary)', lineHeight: 'var(--il-lh-tight)' }}>{title}</h2>
        {description && <p style={{ margin: '6px 0 0', color: 'var(--el-text-color-regular)', fontSize: 'var(--il-fs-help)', lineHeight: 'var(--il-lh-snug)' }}>{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function SectionTitle({ children, style }) {
  return <div style={{ fontFamily: 'var(--il-font-sans)', fontSize: 'var(--il-fs-section)', fontWeight: 'var(--il-fw-semibold)', color: 'var(--il-text-slate)', margin: '6px 0', ...style }}>{children}</div>;
}
