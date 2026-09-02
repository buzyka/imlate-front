import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Dialog({ open, title, width = 560, onClose, footer, iconBase, children }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <div style={{
        width, maxWidth: 'calc(100vw - 32px)', marginTop: '15vh',
        background: 'var(--el-bg-color)', borderRadius: 'var(--el-border-radius-base)',
        boxShadow: 'var(--el-box-shadow)', fontFamily: 'var(--il-font-sans)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 10px' }}>
          <span style={{ fontSize: 'var(--el-font-size-medium)', color: 'var(--el-text-color-primary)', lineHeight: 1.5 }}>{title}</span>
          <button type="button" onClick={onClose} aria-label="Close"
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <Icon name="close" size={16} color="var(--el-text-color-placeholder)" base={iconBase} />
          </button>
        </div>
        <div style={{ padding: '0 16px', fontSize: 'var(--el-font-size-base)', color: 'var(--el-text-color-regular)' }}>{children}</div>
        {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '20px 16px 16px' }}>{footer}</div>}
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, title = 'Confirm', message, confirmLabel = 'Delete', cancelLabel = 'Cancel', intent = 'warning', onConfirm, onCancel, iconBase }) {
  const ICONS = { warning: 'warning-filled', danger: 'circle-close-filled', info: 'info-filled', success: 'success-filled' };
  const COLORS = { warning: 'var(--el-color-warning)', danger: 'var(--el-color-danger)', info: 'var(--el-color-info)', success: 'var(--el-color-success)' };
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2001, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <div style={{ width: 420, marginTop: '15vh', background: 'var(--el-bg-color)', borderRadius: 'var(--el-border-radius-base)', boxShadow: 'var(--el-box-shadow)', padding: '16px', fontFamily: 'var(--il-font-sans)' }}>
        <div style={{ fontSize: 'var(--el-font-size-medium)', color: 'var(--el-text-color-primary)', marginBottom: 10 }}>{title}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 'var(--el-font-size-base)', color: 'var(--el-text-color-regular)', lineHeight: 'var(--il-lh-body)' }}>
          <Icon name={ICONS[intent]} size={18} color={COLORS[intent]} base={iconBase} />
          <span>{message}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <button type="button" onClick={onCancel} style={btn(false)}>{cancelLabel}</button>
          <button type="button" onClick={onConfirm} style={btn(true)}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

const btn = (primary) => ({
  height: 32, padding: '8px 15px', boxSizing: 'border-box',
  background: primary ? 'var(--el-color-primary)' : '#fff',
  border: `1px solid ${primary ? 'var(--el-color-primary)' : 'var(--el-border-color)'}`,
  color: primary ? '#fff' : 'var(--el-text-color-regular)',
  borderRadius: 'var(--el-border-radius-base)', cursor: 'pointer',
  fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)', fontWeight: 500, lineHeight: 1
});
