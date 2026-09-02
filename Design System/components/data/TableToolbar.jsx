import React from 'react';
import { Input } from '../forms/Input.jsx';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';

export function TableToolbar({ query, onQueryChange, placeholder = 'Search within results', count, countLabel = 'rows', actions, onExportCsv, onExportPdf, iconBase, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      padding: '10px 12px', borderBottom: '1px solid var(--el-border-color-lighter)',
      fontFamily: 'var(--il-font-sans)', ...style
    }}>
      <div style={{ width: 240 }}>
        <Input value={query} onChange={onQueryChange} placeholder={placeholder} prefixIcon="search" clearable iconBase={iconBase} />
      </div>
      {count != null && (
        <span style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--el-text-color-secondary)' }}>{count} {countLabel}</span>
      )}
      <div style={{ flex: 1 }} />
      {actions}
      {onExportCsv && <Button size="small" onClick={onExportCsv} icon={<Icon name="download" size={12} base={iconBase} />}>CSV</Button>}
      {onExportPdf && <Button size="small" onClick={onExportPdf} icon={<Icon name="document" size={12} base={iconBase} />}>PDF</Button>}
    </div>
  );
}
