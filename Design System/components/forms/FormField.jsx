import React from 'react';

export function FormField({ label, required = false, error, help, labelPosition = 'left', labelWidth = 'var(--il-form-label-width)', children, style }) {
  const top = labelPosition === 'top';
  return (
    <div style={{
      display: 'flex', flexDirection: top ? 'column' : 'row',
      alignItems: top ? 'stretch' : 'flex-start',
      gap: top ? 8 : 12, marginBottom: 18, ...style
    }}>
      {label && (
        <label style={{
          width: top ? 'auto' : labelWidth, flex: top ? undefined : '0 0 auto',
          paddingTop: top ? 0 : 6, boxSizing: 'border-box', paddingRight: top ? 0 : 12,
          textAlign: top ? 'left' : 'right',
          fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)',
          lineHeight: top ? 1.4 : 1.2, color: 'var(--el-text-color-regular)'
        }}>
          {required && <span style={{ color: 'var(--el-color-danger)', marginRight: 4 }}>*</span>}
          {label}
        </label>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {children}
        {help && !error && <div style={{ marginTop: 4, fontSize: 'var(--il-fs-meta)', color: 'var(--el-text-color-secondary)', lineHeight: 'var(--il-lh-body)' }}>{help}</div>}
        {error && <div style={{ marginTop: 2, fontSize: 'var(--il-fs-meta)', color: 'var(--el-color-danger)', lineHeight: 1 }}>{error}</div>}
      </div>
    </div>
  );
}

export function FormActions({ labelWidth = 'var(--il-form-label-width)', inline = true, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, paddingLeft: inline ? labelWidth : 0 }}>{children}</div>
  );
}
