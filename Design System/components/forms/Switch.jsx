import React from 'react';

export function Switch({ checked = false, onChange, disabled = false, style }) {
  return (
    <button
      type="button" role="switch" aria-checked={checked} disabled={disabled}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{
        position: 'relative', width: 40, height: 20, padding: 0, flex: '0 0 auto',
        border: 'none', borderRadius: 10,
        background: checked ? 'var(--el-color-primary)' : 'var(--el-border-color)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1,
        transition: 'background-color var(--el-transition-duration)', ...style
      }}
    >
      <span style={{
        position: 'absolute', top: 1, left: checked ? 21 : 1,
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        transition: 'left var(--el-transition-duration)'
      }} />
    </button>
  );
}
