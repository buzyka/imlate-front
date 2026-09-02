import React from 'react';

export function Popover({ open, width = 320, placement = 'right-end', children, content, style }) {
  const [uncontrolled, setUncontrolled] = React.useState(false);
  const isOpen = open != null ? open : uncontrolled;
  const pos = placement.startsWith('right')
    ? { left: '100%', bottom: 0, marginLeft: 12 }
    : { left: 0, top: '100%', marginTop: 12 };
  return (
    <div style={{ position: 'relative', display: 'inline-flex', ...style }}>
      <span onClick={() => open == null && setUncontrolled(!uncontrolled)} style={{ display: 'contents' }}>{children}</span>
      {isOpen && (
        <div style={{
          position: 'absolute', ...pos, width, zIndex: 100, boxSizing: 'border-box',
          background: 'var(--el-bg-color-overlay, #fff)', backdropFilter: 'blur(2px)',
          border: '1px solid var(--el-border-color-light)',
          borderRadius: 'var(--el-border-radius-base)',
          boxShadow: 'var(--el-box-shadow-light)',
          padding: 12, fontFamily: 'var(--il-font-sans)',
          fontSize: 'var(--el-font-size-base)', color: 'var(--el-text-color-regular)'
        }}>{content}</div>
      )}
    </div>
  );
}
