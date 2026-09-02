import React from 'react';

export function ActionChoiceCard({ badge, title, intent = 'success', active = false, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const ring = intent === 'danger' ? 'var(--il-ring-danger)' : 'var(--il-ring-success)';
  const border = intent === 'danger' ? 'var(--el-color-danger)' : 'var(--el-color-success)';
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid', gap: 6, padding: '14px 16px', textAlign: 'left',
        background: '#fff', borderRadius: 'var(--il-radius-dialog-card)',
        border: `1px solid ${active ? border : 'var(--il-border-dialog)'}`,
        boxShadow: active ? ring : 'none',
        transform: hover ? 'var(--il-lift-nudge)' : 'none',
        cursor: 'pointer', fontFamily: 'var(--il-font-sans)',
        transition: 'border-color var(--il-dur-fast) ease, box-shadow var(--il-dur-fast) ease, transform var(--il-dur-fast) ease',
        ...style
      }}>
      <strong style={{ fontSize: 'var(--el-font-size-medium)', color: '#111827' }}>{badge}</strong>
      <span style={{ fontSize: 'var(--il-fs-help)', color: 'var(--il-text-dialog-soft)' }}>{title}</span>
    </button>
  );
}
