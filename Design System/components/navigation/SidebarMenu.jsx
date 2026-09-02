import React from 'react';

export function SidebarMenu({ items = [], active, onSelect, logoSrc, logoHref = '/', footer, style }) {
  const [hover, setHover] = React.useState(null);
  return (
    <aside style={{
      width: 'var(--il-aside-width)', flex: '0 0 auto',
      display: 'flex', flexDirection: 'column', alignItems: 'stretch',
      height: '100%', background: 'var(--el-bg-color)',
      borderRight: '1px solid var(--il-border-hairline)',
      fontFamily: 'var(--il-font-sans)', ...style
    }}>
      {logoSrc && (
        <a href={logoHref} aria-label="Go to ImLate admin home"
          style={{ padding: '16px 10px 10px', display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
          <img src={logoSrc} alt="ImLate" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </a>
      )}
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map(it => {
          const isActive = it.index === active;
          const isHover = hover === it.index;
          return (
            <button key={it.index} type="button"
              onClick={() => onSelect && onSelect(it.index)}
              onMouseEnter={() => setHover(it.index)}
              onMouseLeave={() => setHover(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                height: 56, padding: '0 20px', textAlign: 'left',
                border: 'none', borderRight: isActive ? '2px solid var(--el-color-primary)' : '2px solid transparent',
                background: isHover ? 'var(--el-color-primary-light-9)' : 'transparent',
                color: isActive ? 'var(--el-color-primary)' : 'var(--el-text-color-primary)',
                fontFamily: 'inherit', fontSize: 'var(--el-font-size-base)',
                cursor: 'pointer', transition: 'background-color var(--el-transition-duration), color var(--el-transition-duration)'
              }}>
              {it.icon}
              {it.label}
            </button>
          );
        })}
      </nav>
      <div style={{ flex: 1 }} />
      {footer}
    </aside>
  );
}

export function SidebarFooterButton({ icon, children, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, width: '100%',
        padding: '12px 20px', cursor: 'pointer',
        color: 'var(--el-text-color-regular)', fontSize: 'var(--el-font-size-base)',
        fontFamily: 'inherit', background: hover ? 'var(--el-fill-color-light)' : 'none',
        border: 'none', borderTop: '1px solid var(--il-border-hairline)',
        transition: 'background .2s', ...style
      }}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
