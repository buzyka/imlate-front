import React from 'react';

export function DataTable({ columns = [], data = [], rowClass, onRowClick, currentRow, empty = 'No data found', style }) {
  const [hoverIdx, setHoverIdx] = React.useState(-1);
  const [sort, setSort] = React.useState({ key: null, dir: 1 });

  const rows = React.useMemo(() => {
    if (!sort.key) return data;
    return [...data].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * sort.dir;
    });
  }, [data, sort]);

  const WASH = {
    'signed-in': 'var(--il-row-signed-in)',
    'signed-out': 'var(--il-row-signed-out)',
    'not-signed': 'var(--il-row-not-signed)'
  };

  return (
    <div style={{ border: '1px solid var(--el-border-color-lighter)', borderRadius: 'var(--il-radius-card)', overflow: 'hidden', background: 'var(--el-bg-color)', ...style }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)' }}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}
                onClick={() => c.sortable && c.prop && setSort(s => ({ key: c.prop, dir: s.key === c.prop ? -s.dir : 1 }))}
                style={{
                  width: c.width, textAlign: c.align || 'left',
                  padding: '10px 12px', background: 'var(--il-surface-table-head)',
                  color: '#475569', fontWeight: 'var(--il-fw-semibold)',
                  borderBottom: '1px solid var(--el-border-color-lighter)',
                  borderRight: i < columns.length - 1 ? '1px solid var(--el-border-color-lighter)' : 'none',
                  cursor: c.sortable ? 'pointer' : 'default', userSelect: 'none', whiteSpace: 'nowrap'
                }}>
                {c.label}
                {c.sortable && (
                  <span style={{ marginLeft: 6, fontSize: 10, color: sort.key === c.prop ? 'var(--el-color-primary)' : 'var(--el-text-color-placeholder)' }}>
                    {sort.key === c.prop && sort.dir === -1 ? '▼' : '▲'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} style={{ padding: 40, textAlign: 'center', color: 'var(--el-text-color-secondary)' }}>{empty}</td></tr>
          )}
          {rows.map((row, ri) => {
            const cls = rowClass && rowClass(row);
            const wash = cls && WASH[cls];
            const active = currentRow && currentRow === row;
            return (
              <tr key={ri}
                onMouseEnter={() => setHoverIdx(ri)}
                onMouseLeave={() => setHoverIdx(-1)}
                onClick={() => onRowClick && onRowClick(row)}
                style={{
                  background: hoverIdx === ri ? 'var(--il-surface-row-hover)' : active ? 'var(--el-color-primary-light-9)' : wash || 'transparent',
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background-color var(--il-dur-base) ease'
                }}>
                {columns.map((c, ci) => (
                  <td key={ci} style={{
                    padding: '10px 12px', textAlign: c.align || 'left',
                    color: 'var(--el-text-color-regular)',
                    borderBottom: '1px solid var(--el-border-color-lighter)',
                    borderRight: ci < columns.length - 1 ? '1px solid var(--el-border-color-lighter)' : 'none'
                  }}>
                    {c.render ? c.render(row, ri) : row[c.prop]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
