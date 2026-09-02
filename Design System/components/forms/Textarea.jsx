import React from 'react';

export function Textarea({ value, onChange, placeholder, rows = 4, disabled = false, resize = 'none', style }) {
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  return (
    <textarea
      value={value ?? ''}
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange && onChange(e.target.value)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%', boxSizing: 'border-box', padding: '5px 11px', resize,
        background: disabled ? 'var(--el-fill-color-light)' : 'var(--el-fill-color-blank)',
        border: 'none', outline: 'none',
        borderRadius: 'var(--il-radius-input)',
        boxShadow: focus ? 'var(--il-ring-input-focus)' : hover ? 'var(--il-ring-input-hover)' : '0 0 0 1px var(--el-border-color) inset',
        fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)',
        lineHeight: 'var(--il-lh-body)', color: 'var(--el-text-color-regular)',
        transition: 'all var(--il-dur-base) ease', ...style
      }}
    />
  );
}
