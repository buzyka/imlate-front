import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function InputNumber({ value = 0, onChange, min = -Infinity, max = Infinity, step = 1, precision, disabled = false, iconBase, style }) {
  const set = (next) => {
    let v = Math.min(max, Math.max(min, next));
    if (precision != null) v = Number(v.toFixed(precision));
    onChange && onChange(v);
  };
  const btn = (dir, name) => (
    <button type="button" disabled={disabled} onClick={() => set(Number(value) + dir * step)} aria-label={dir > 0 ? 'Increase' : 'Decrease'}
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--el-fill-color-light)', border: 'none',
        borderLeft: '1px solid var(--el-border-color)',
        cursor: disabled ? 'not-allowed' : 'pointer', padding: 0
      }}>
      <Icon name={name} size={10} color="var(--el-text-color-secondary)" base={iconBase} />
    </button>
  );
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'stretch', width: '100%', height: 32, boxSizing: 'border-box',
      background: 'var(--el-fill-color-blank)', borderRadius: 'var(--il-radius-input)',
      boxShadow: '0 0 0 1px var(--el-border-color) inset', overflow: 'hidden', ...style
    }}>
      <input
        type="number" value={value} disabled={disabled}
        onChange={(e) => set(Number(e.target.value))}
        style={{
          flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', padding: '0 11px',
          fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)', color: 'var(--el-text-color-regular)'
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', width: 26 }}>
        {btn(1, 'caret-top')}
        {btn(-1, 'caret-bottom')}
      </div>
    </div>
  );
}
