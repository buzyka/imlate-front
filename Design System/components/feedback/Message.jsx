import React from 'react';
import { Icon } from '../core/Icon.jsx';

const KEYS = { success: 'success', warning: 'warning', error: 'error', info: 'info' };
const ICONS = { success: 'success-filled', warning: 'warning-filled', error: 'circle-close-filled', info: 'info-filled' };

export function Message({ type = 'info', children, onClose, iconBase, style }) {
  const key = KEYS[type] || 'info';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      minWidth: 380, boxSizing: 'border-box', padding: '11px 15px',
      background: `var(--el-color-${key}-light-9)`,
      border: `1px solid var(--el-color-${key}-light-8, var(--el-color-${key}-light-7))`,
      borderRadius: 'var(--el-border-radius-base)',
      boxShadow: 'var(--el-box-shadow-light)',
      fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)',
      color: `var(--el-color-${key})`, ...style
    }}>
      <Icon name={ICONS[type]} size={16} color={`var(--el-color-${key})`} base={iconBase} />
      <span style={{ flex: 1 }}>{children}</span>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Close"
          style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
          <Icon name="close" size={14} color="var(--el-text-color-placeholder)" base={iconBase} />
        </button>
      )}
    </div>
  );
}

export function MessageStack({ messages = [], iconBase }) {
  return (
    <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 3000, display: 'grid', gap: 16 }}>
      {messages.map(m => <Message key={m.id} type={m.type} iconBase={iconBase}>{m.text}</Message>)}
    </div>
  );
}
