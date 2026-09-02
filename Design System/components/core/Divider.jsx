import React from 'react';

export function Divider({ vertical = false, children, style }) {
  if (vertical) {
    return <span style={{ display: 'inline-block', width: 1, height: '1em', margin: '0 8px', background: 'var(--el-border-color)', verticalAlign: 'middle', ...style }} />;
  }
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '24px 0', borderTop: '1px solid var(--el-border-color)', ...style }}>
      {children && (
        <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', background: 'var(--el-bg-color)', padding: '0 20px', fontSize: 'var(--el-font-size-base)', fontWeight: 500, color: 'var(--el-text-color-primary)' }}>{children}</span>
      )}
    </div>
  );
}
