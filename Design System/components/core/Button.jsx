import React from 'react';

const SIZES = {
  large: { height: 40, padding: '12px 19px', font: 'var(--el-font-size-base)' },
  default: { height: 32, padding: '8px 15px', font: 'var(--el-font-size-base)' },
  small: { height: 24, padding: '5px 11px', font: 'var(--el-font-size-extra-small)' }
};

const TYPES = {
  default: { bg: 'var(--el-fill-color-blank)', border: 'var(--el-border-color)', color: 'var(--el-text-color-regular)', hoverBg: 'var(--el-color-primary-light-9)', hoverBorder: 'var(--el-color-primary-light-7)', hoverColor: 'var(--el-color-primary)' },
  primary: { bg: 'var(--el-color-primary)', border: 'var(--el-color-primary)', color: '#fff', hoverBg: 'var(--el-color-primary-light-3)', hoverBorder: 'var(--el-color-primary-light-3)', hoverColor: '#fff' },
  success: { bg: 'var(--el-color-success)', border: 'var(--el-color-success)', color: '#fff', hoverBg: 'var(--el-color-success-light-3)', hoverBorder: 'var(--el-color-success-light-3)', hoverColor: '#fff' },
  warning: { bg: 'var(--el-color-warning)', border: 'var(--el-color-warning)', color: '#fff', hoverBg: 'var(--el-color-warning-light-3)', hoverBorder: 'var(--el-color-warning-light-3)', hoverColor: '#fff' },
  danger: { bg: 'var(--el-color-danger)', border: 'var(--el-color-danger)', color: '#fff', hoverBg: 'var(--el-color-danger-light-3)', hoverBorder: 'var(--el-color-danger-light-3)', hoverColor: '#fff' },
  info: { bg: 'var(--el-color-info)', border: 'var(--el-color-info)', color: '#fff', hoverBg: 'var(--el-color-info-light-3)', hoverBorder: 'var(--el-color-info-light-3)', hoverColor: '#fff' }
};

const PLAIN = {
  primary: 'primary', success: 'success', warning: 'warning', danger: 'danger', info: 'info'
};

export function Button({
  type = 'default', size = 'default', plain = false, text = false, circle = false,
  round = false, disabled = false, loading = false, icon = null, onClick, children, style
}) {
  const [hover, setHover] = React.useState(false);
  const s = SIZES[size] || SIZES.default;
  const t = TYPES[type] || TYPES.default;
  const key = PLAIN[type];

  let bg = t.bg, border = t.border, color = t.color;
  if (plain && key) {
    bg = `var(--el-color-${key}-light-9)`;
    border = `var(--el-color-${key}-light-5)`;
    color = `var(--el-color-${key})`;
    if (hover && !disabled) { bg = `var(--el-color-${key})`; border = `var(--el-color-${key})`; color = '#fff'; }
  } else if (text) {
    bg = hover && !disabled ? 'var(--el-fill-color-light)' : 'transparent';
    border = 'transparent';
    color = type === 'default' ? 'var(--el-text-color-regular)' : `var(--el-color-${key || 'primary'})`;
  } else if (hover && !disabled) {
    bg = t.hoverBg; border = t.hoverBorder; color = t.hoverColor;
  }

  const iconOnly = circle || (!children && icon);

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: children ? 6 : 0,
        height: s.height, minWidth: iconOnly ? s.height : undefined,
        padding: iconOnly ? 0 : s.padding,
        boxSizing: 'border-box',
        fontFamily: 'var(--il-font-sans)', fontSize: s.font, fontWeight: 'var(--el-font-weight-primary)',
        lineHeight: 1, whiteSpace: 'nowrap',
        background: bg, color,
        border: `1px solid ${border}`,
        borderRadius: circle ? '50%' : round ? 'var(--il-radius-pill)' : 'var(--el-border-radius-base)',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background-color var(--il-dur-base), border-color var(--il-dur-base), color var(--il-dur-base)',
        ...style
      }}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <span style={{
      width: 14, height: 14, borderRadius: '50%',
      border: '2px solid currentColor', borderTopColor: 'transparent',
      animation: 'il-spin 1s linear infinite', display: 'inline-block'
    }} />
  );
}
