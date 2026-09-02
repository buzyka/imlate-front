import React from 'react';

export function SegmentedControl({ value, onChange, options = [], size = 'default', disabled = false, style }) {
  const [hover, setHover] = React.useState(null);
  const height = size === 'small' ? 24 : size === 'large' ? 40 : 32;
  const pad = size === 'small' ? '0 11px' : '0 15px';
  const font = size === 'small' ? 'var(--el-font-size-extra-small)' : 'var(--el-font-size-base)';

  return (
    <div role="radiogroup" style={{ display: 'inline-flex', ...style }}>
      {options.map((o, i) => {
        const active = o.value === value;
        const first = i === 0, last = i === options.length - 1;
        return (
          <button key={String(o.value)} type="button" role="radio" aria-checked={active} disabled={disabled}
            onClick={() => !disabled && onChange && onChange(o.value)}
            onMouseEnter={() => setHover(o.value)} onMouseLeave={() => setHover(null)}
            style={{
              height, padding: pad, boxSizing: 'border-box',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              background: active ? 'var(--el-color-primary)' : 'var(--el-fill-color-blank)',
              color: active ? '#fff' : hover === o.value && !disabled ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)',
              borderStyle: 'solid',
              borderColor: active ? 'var(--el-color-primary)' : 'var(--el-border-color)',
              borderTopWidth: 1, borderRightWidth: 1, borderBottomWidth: 1,
              borderLeftWidth: first ? 1 : 0,
              borderRadius: first ? 'var(--el-border-radius-base) 0 0 var(--el-border-radius-base)'
                : last ? '0 var(--el-border-radius-base) var(--el-border-radius-base) 0' : 0,
              fontFamily: 'var(--il-font-sans)', fontSize: font, fontWeight: 'var(--el-font-weight-primary)',
              lineHeight: 1, whiteSpace: 'nowrap',
              cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
              transition: 'background-color var(--il-dur-base) ease, color var(--il-dur-base) ease, border-color var(--il-dur-base) ease'
            }}>
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
