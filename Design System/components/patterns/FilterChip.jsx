import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function FilterChip({ label, value, onRemove, iconBase, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 8px 0 9px',
        background: 'var(--el-color-info-light-9)',
        border: `1px solid ${hover ? 'var(--el-border-color)' : 'var(--el-color-info-light-7)'}`,
        borderRadius: 'var(--el-border-radius-base)',
        fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-extra-small)',
        color: 'var(--el-text-color-regular)', whiteSpace: 'nowrap',
        transition: 'border-color var(--il-dur-base) ease', ...style
      }}>
      <span style={{ color: 'var(--el-text-color-secondary)' }}>{label}:</span>
      <b style={{ fontWeight: 600, color: 'var(--el-text-color-primary)' }}>{value}</b>
      {onRemove && (
        <button type="button" aria-label={`Remove ${label} filter`} onClick={onRemove}
          style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', marginLeft: 1 }}>
          <Icon name="close" size={11} color="var(--el-text-color-secondary)" base={iconBase} />
        </button>
      )}
    </span>
  );
}
