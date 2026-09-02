import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Tag } from '../core/Tag.jsx';

export function Select({ value, onChange, options = [], placeholder = 'Select', multiple = false, disabled = false, clearable = false, iconBase, style }) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const selected = multiple ? (value || []) : value;
  const label = multiple ? null : (options.find(o => o.value === value) || {}).label;

  const pick = (v) => {
    if (multiple) {
      const next = (value || []).includes(v) ? value.filter(x => x !== v) : [...(value || []), v];
      onChange && onChange(next);
    } else {
      onChange && onChange(v);
      setOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', ...style }}>
      <div
        role="button" tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setOpen(!open)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
          minHeight: 32, padding: multiple && selected.length ? '3px 11px' : '1px 11px', boxSizing: 'border-box',
          background: disabled ? 'var(--el-fill-color-light)' : 'var(--el-fill-color-blank)',
          borderRadius: 'var(--il-radius-input)',
          boxShadow: open ? 'var(--il-ring-input-focus)' : hover && !disabled ? 'var(--il-ring-input-hover)' : '0 0 0 1px var(--el-border-color) inset',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all var(--il-dur-base) ease',
          fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)',
          color: (multiple ? selected.length : value != null && value !== '') ? 'var(--el-text-color-regular)' : 'var(--el-text-color-placeholder)'
        }}
      >
        <span style={{ flex: 1, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', minWidth: 0 }}>
          {multiple
            ? (selected.length
                ? selected.map(v => <Tag key={v} type="info" size="small">{(options.find(o => o.value === v) || {}).label}</Tag>)
                : placeholder)
            : (label || placeholder)}
        </span>
        {clearable && !multiple && value != null && value !== '' && (
          <button type="button" aria-label="Clear" onClick={(e) => { e.stopPropagation(); onChange && onChange(null); }}
            style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
            <Icon name="circle-close" size={14} color="var(--el-text-color-placeholder)" base={iconBase} />
          </button>
        )}
        <Icon name="arrow-down" size={14} color="var(--el-text-color-placeholder)" base={iconBase}
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--il-dur-base) ease' }} />
      </div>

      {open && (
        <ul style={{
          position: 'absolute', zIndex: 20, top: 'calc(100% + 6px)', left: 0, right: 0, margin: 0,
          listStyle: 'none', padding: '6px 0', maxHeight: 274, overflowY: 'auto',
          background: 'var(--el-bg-color-overlay, #fff)', backdropFilter: 'blur(2px)',
          border: '1px solid var(--el-border-color-light)', borderRadius: 'var(--el-border-radius-base)',
          boxShadow: 'var(--el-box-shadow-light)'
        }}>
          {options.map(o => {
            const active = multiple ? selected.includes(o.value) : o.value === value;
            return (
              <li key={String(o.value)} onClick={() => pick(o.value)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0 32px 0 20px', height: 34, lineHeight: '34px',
                  fontSize: 'var(--el-font-size-base)', fontWeight: active ? 700 : 400,
                  color: active ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)',
                  background: 'transparent', cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--el-fill-color-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                {o.label}
                {active && <Icon name="check" size={12} color="var(--el-color-primary)" base={iconBase} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
