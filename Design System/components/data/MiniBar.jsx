import React from 'react';

const COLORS = {
  success: 'var(--el-color-success)',
  warning: 'var(--el-color-warning)',
  danger: 'var(--el-color-danger)',
  info: 'var(--el-color-info)',
  primary: 'var(--el-color-primary)'
};

export function MiniBar({ value = 0, max = 100, intent = 'success', label, width = 96, style }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--il-font-sans)', ...style }}>
      <span style={{ width, height: 6, background: 'var(--el-border-color-lighter)', borderRadius: 3, overflow: 'hidden', flex: '0 0 auto' }}>
        <span style={{ display: 'block', width: pct + '%', height: '100%', background: COLORS[intent] || COLORS.success, borderRadius: 3 }} />
      </span>
      {label && <span style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--el-text-color-secondary)', whiteSpace: 'nowrap' }}>{label}</span>}
    </div>
  );
}
