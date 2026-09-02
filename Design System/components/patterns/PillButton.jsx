import React from 'react';

export function PillButton({ variant = 'brand', href, onClick, children, style }) {
  const [hover, setHover] = React.useState(false);
  const brand = variant === 'brand';
  const s = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minWidth: 164, padding: '12px 20px', boxSizing: 'border-box',
    borderRadius: 'var(--il-radius-pill)',
    border: brand ? '1px solid transparent' : `1px solid ${hover ? 'var(--il-navy-light)' : 'var(--il-navy)'}`,
    background: brand ? (hover ? 'var(--il-orange-dark)' : 'var(--il-orange)') : (hover ? 'var(--il-navy-05)' : 'transparent'),
    color: brand ? '#fff' : (hover ? 'var(--il-navy-light)' : 'var(--il-navy)'),
    fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)',
    fontWeight: 'var(--il-fw-semibold)', textDecoration: 'none', cursor: 'pointer',
    transition: 'background-color var(--il-dur-fast) ease, color var(--il-dur-fast) ease, border-color var(--il-dur-fast) ease',
    ...style
  };
  const handlers = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };
  return href
    ? <a href={href} target="_blank" rel="noopener" style={s} {...handlers}>{children}</a>
    : <button type="button" onClick={onClick} style={s} {...handlers}>{children}</button>;
}
