import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Pagination({ page = 1, pageSize = 20, total = 0, onChange, iconBase, style }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const window0 = [];
  const start = Math.max(1, Math.min(page - 2, pages - 4));
  for (let i = start; i < start + 5 && i <= pages; i++) window0.push(i);

  const cell = (content, opts = {}) => (
    <button key={opts.key} type="button" disabled={opts.disabled} onClick={opts.onClick}
      style={{
        minWidth: 32, height: 32, padding: '0 4px', border: 'none',
        borderRadius: 'var(--el-border-radius-base)',
        background: opts.active ? 'var(--el-color-primary)' : 'var(--el-fill-color-light)',
        color: opts.active ? '#fff' : opts.disabled ? 'var(--el-text-color-disabled)' : 'var(--el-text-color-regular)',
        fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)', fontWeight: opts.active ? 700 : 400,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        cursor: opts.disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color var(--il-dur-base) ease'
      }}>{content}</button>
  );

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', ...style }}>
      {cell(<Icon name="arrow-left" size={12} base={iconBase} />, { key: 'prev', disabled: page <= 1, onClick: () => onChange && onChange(page - 1) })}
      {window0.map(p => cell(p, { key: p, active: p === page, onClick: () => onChange && onChange(p) }))}
      {cell(<Icon name="arrow-right" size={12} base={iconBase} />, { key: 'next', disabled: page >= pages, onClick: () => onChange && onChange(page + 1) })}
    </div>
  );
}
