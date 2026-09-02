import React from 'react';

export function KpiStat({ label, value, intent = 'neutral', hint, style }) {
  const COLORS = {
    neutral: 'var(--il-navy)',
    success: 'var(--el-color-success)',
    warning: 'var(--el-color-warning)',
    info: 'var(--el-color-info)',
    danger: 'var(--el-color-danger)'
  };
  return (
    <div style={{
      display: 'grid', gap: 4, padding: '16px 20px',
      background: 'var(--il-surface-card)',
      border: '1px solid var(--il-border-card)',
      borderRadius: 'var(--il-radius-card)',
      boxShadow: 'var(--il-shadow-card)',
      fontFamily: 'var(--il-font-sans)', ...style
    }}>
      <span style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--il-text-mute)', textTransform: 'uppercase', letterSpacing: 'var(--il-tracking-label)', fontWeight: 'var(--il-fw-semibold)' }}>{label}</span>
      <span style={{ fontSize: 28, lineHeight: 'var(--il-lh-tight)', fontWeight: 'var(--il-fw-bold)', color: COLORS[intent] }}>{value}</span>
      {hint && <span style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--el-text-color-secondary)' }}>{hint}</span>}
    </div>
  );
}
