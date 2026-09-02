import React from 'react';
import { Button } from '../core/Button.jsx';

export function Topbar({ userName, onProfile, onLogout, children, style }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 12,
      height: 'var(--il-header-height)', padding: '0 12px', boxSizing: 'border-box',
      borderBottom: '1px solid var(--il-border-hairline)',
      background: '#fff', position: 'sticky', top: 0, zIndex: 10,
      fontFamily: 'var(--il-font-sans)', ...style
    }}>
      {children}
      <div style={{ flex: 1 }} />
      {userName && <Button size="small" text onClick={onProfile}>{userName}</Button>}
      <Button size="small" onClick={onLogout}>Logout</Button>
    </header>
  );
}
