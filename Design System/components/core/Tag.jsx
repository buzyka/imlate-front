import React from 'react';

const KEYS = { primary: 'primary', success: 'success', warning: 'warning', danger: 'danger', info: 'info' };

export function Tag({ type = 'primary', effect = 'light', size = 'default', round = false, soft = false, children, style }) {
  const key = KEYS[type] || 'primary';
  const dark = effect === 'dark';
  const height = size === 'small' ? 20 : size === 'large' ? 32 : 24;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height,
      padding: soft ? '4px 10px' : '0 9px',
      background: dark ? `var(--el-color-${key})` : `var(--el-color-${key}-light-9)`,
      border: `1px solid ${dark ? `var(--el-color-${key})` : `var(--el-color-${key}-light-8, var(--el-color-${key}-light-7))`}`,
      color: dark ? '#fff' : `var(--el-color-${key})`,
      borderRadius: round ? 'var(--il-radius-pill)' : soft ? 'var(--il-radius-tag)' : 'var(--el-border-radius-base)',
      fontFamily: 'var(--il-font-sans)', fontSize: size === 'small' ? 'var(--el-font-size-extra-small)' : 'var(--el-font-size-extra-small)',
      lineHeight: 1, whiteSpace: 'nowrap', ...style
    }}>{children}</span>
  );
}
