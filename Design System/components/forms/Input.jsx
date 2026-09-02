import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Input({
  value, onChange, placeholder, type = 'text', size = 'default',
  disabled = false, clearable = false, showPassword = false, prefixIcon, suffixIcon,
  iconBase, style, wrapperStyle
}) {
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [reveal, setReveal] = React.useState(false);
  const height = size === 'small' ? 24 : size === 'large' ? 40 : 32;
  const ring = disabled
    ? '0 0 0 1px var(--el-border-color-light) inset'
    : focus ? 'var(--il-ring-input-focus)'
    : hover ? 'var(--il-ring-input-hover)'
    : '0 0 0 1px var(--el-border-color) inset';

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, width: '100%',
        height, padding: '1px 11px', boxSizing: 'border-box',
        background: disabled ? 'var(--el-fill-color-light)' : 'var(--el-fill-color-blank)',
        borderRadius: 'var(--il-radius-input)',
        boxShadow: ring,
        transition: 'all var(--il-dur-base) ease',
        ...wrapperStyle
      }}
    >
      {prefixIcon && <Icon name={prefixIcon} size={14} color="var(--el-text-color-placeholder)" base={iconBase} />}
      <input
        type={showPassword && !reveal ? 'password' : type === 'password' && !reveal ? 'password' : type}
        value={value ?? ''}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)',
          color: disabled ? 'var(--el-text-color-placeholder)' : 'var(--el-text-color-regular)',
          cursor: disabled ? 'not-allowed' : 'text', ...style
        }}
      />
      {clearable && value && !disabled && (
        <button type="button" onClick={() => onChange && onChange('')} aria-label="Clear"
          style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
          <Icon name="circle-close" size={14} color="var(--el-text-color-placeholder)" base={iconBase} />
        </button>
      )}
      {(showPassword || type === 'password') && (
        <button type="button" onClick={() => setReveal(!reveal)} aria-label="Toggle password"
          style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
          <Icon name={reveal ? 'view' : 'hide'} size={14} color="var(--el-text-color-placeholder)" base={iconBase} />
        </button>
      )}
      {suffixIcon && <Icon name={suffixIcon} size={14} color="var(--el-text-color-placeholder)" base={iconBase} />}
    </div>
  );
}
