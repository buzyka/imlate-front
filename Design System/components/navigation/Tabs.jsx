import React from 'react';

export function Tabs({ tabs = [], active, onChange, style }) {
  const [hover, setHover] = React.useState(null);
  return (
    <div style={{ ...style }}>
      <div style={{ display: 'flex', borderBottom: '2px solid var(--el-border-color-light)', marginBottom: 20 }}>
        {tabs.map(t => {
          const isActive = t.name === active;
          return (
            <button key={t.name} type="button"
              onClick={() => onChange && onChange(t.name)}
              onMouseEnter={() => setHover(t.name)} onMouseLeave={() => setHover(null)}
              style={{
                height: 40, padding: '0 20px', border: 'none', background: 'none',
                borderBottom: `2px solid ${isActive ? 'var(--el-color-primary)' : 'transparent'}`,
                marginBottom: -2,
                color: isActive || hover === t.name ? 'var(--el-color-primary)' : 'var(--el-text-color-primary)',
                fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)',
                fontWeight: 'var(--el-font-weight-primary)',
                cursor: 'pointer', transition: 'color var(--el-transition-duration)'
              }}>{t.label}</button>
          );
        })}
      </div>
      {(tabs.find(t => t.name === active) || {}).content}
    </div>
  );
}
