import React from 'react';

export function PivotGrid({
  rows = [], rowKey = (r, i) => i,
  fixed = [], columns = [], columnWidth = 62,
  renderCell, totalColumn, footer, empty = 'No data found',
  maxHeight, style
}) {
  const [hover, setHover] = React.useState(-1);
  const [sort, setSort] = React.useState({ index: null, dir: 1 });

  const offsets = [];
  let run = 0;
  fixed.forEach(c => { offsets.push(run); run += (c.width || 120); });
  const fixedWidth = run;

  const sorted = React.useMemo(() => {
    const col = sort.index != null ? fixed[sort.index] : null;
    if (!col || !col.sortValue) return rows;
    return [...rows].sort((a, b) => {
      const av = col.sortValue(a), bv = col.sortValue(b);
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * sort.dir;
    });
  }, [rows, sort, fixed]);

  const bgFor = (ri) => hover === ri ? 'var(--il-surface-row-hover)' : 'var(--el-bg-color)';

  const fixedCell = (c, i, content, opts = {}) => (
    <td key={'f' + i} style={{
      position: 'sticky', left: offsets[i], zIndex: 2,
      width: c.width, minWidth: c.width, maxWidth: c.width,
      padding: '0 10px', height: 38, boxSizing: 'border-box',
      textAlign: c.align || 'left',
      background: opts.background || bgFor(opts.ri),
      color: 'var(--el-text-color-regular)',
      borderBottom: '1px solid var(--el-border-color-lighter)',
      borderRight: i === fixed.length - 1 ? '1px solid var(--el-border-color)' : 'none',
      boxShadow: i === fixed.length - 1 ? 'var(--il-shadow-sticky-left)' : 'none',
      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      transition: 'background-color var(--il-dur-base) ease'
    }}>{content}</td>
  );

  return (
    <div style={{
      overflow: 'auto', maxHeight,
      border: '1px solid var(--el-border-color-lighter)',
      borderRadius: 'var(--il-radius-card)',
      background: 'var(--el-bg-color)', ...style
    }}>
      <table style={{
        borderCollapse: 'separate', borderSpacing: 0, tableLayout: 'fixed',
        fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)',
        minWidth: fixedWidth + columns.length * columnWidth + (totalColumn ? (totalColumn.width || 84) : 0)
      }}>
        <thead>
          <tr>
            {fixed.map((c, i) => (
              <th key={'h' + i}
                onClick={() => c.sortValue && setSort(s => ({ index: i, dir: s.index === i ? -s.dir : 1 }))}
                style={{
                  position: 'sticky', left: offsets[i], top: 0, zIndex: 4,
                  width: c.width, minWidth: c.width, maxWidth: c.width,
                  padding: '0 10px', height: 46, boxSizing: 'border-box',
                  textAlign: c.align || 'left', verticalAlign: 'middle',
                  background: 'var(--il-surface-table-head)',
                  color: '#475569', fontWeight: 'var(--il-fw-semibold)',
                  borderBottom: '1px solid var(--el-border-color-lighter)',
                  borderRight: i === fixed.length - 1 ? '1px solid var(--el-border-color)' : 'none',
                  boxShadow: i === fixed.length - 1 ? 'var(--il-shadow-sticky-left)' : 'none',
                  cursor: c.sortValue ? 'pointer' : 'default', userSelect: 'none', whiteSpace: 'nowrap'
                }}>
                {c.label}
                {c.sortValue && (
                  <span style={{ marginLeft: 6, fontSize: 10, color: sort.index === i ? 'var(--el-color-primary)' : 'var(--el-text-color-placeholder)' }}>
                    {sort.index === i && sort.dir === -1 ? '▼' : '▲'}
                  </span>
                )}
              </th>
            ))}
            {columns.map(col => (
              <th key={col.key} style={{
                position: 'sticky', top: 0, zIndex: 3,
                width: columnWidth, minWidth: columnWidth,
                padding: '4px 2px', height: 46, boxSizing: 'border-box',
                textAlign: 'center', verticalAlign: 'middle',
                background: col.muted ? 'var(--el-fill-color-lighter)' : 'var(--il-surface-table-head)',
                borderBottom: '1px solid var(--el-border-color-lighter)',
                borderRight: '1px solid var(--el-border-color-lighter)',
                fontWeight: 'var(--il-fw-regular)'
              }}>
                <div style={{ fontSize: 11, color: 'var(--el-text-color-secondary)', lineHeight: 1.3 }}>{col.top}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: col.muted ? 'var(--el-text-color-secondary)' : '#475569', lineHeight: 1.3 }}>{col.label}</div>
              </th>
            ))}
            {totalColumn && (
              <th style={{
                position: 'sticky', right: 0, top: 0, zIndex: 4,
                width: totalColumn.width || 84, minWidth: totalColumn.width || 84,
                padding: '0 10px', height: 46, boxSizing: 'border-box', textAlign: 'right',
                background: 'var(--il-surface-table-head)', color: '#475569',
                fontWeight: 'var(--il-fw-semibold)',
                borderBottom: '1px solid var(--el-border-color-lighter)',
                borderLeft: '1px solid var(--el-border-color)',
                boxShadow: 'var(--il-shadow-sticky-right)', whiteSpace: 'nowrap'
              }}>{totalColumn.label}</th>
            )}
          </tr>
        </thead>

        <tbody>
          {sorted.length === 0 && (
            <tr>
              <td colSpan={fixed.length + columns.length + (totalColumn ? 1 : 0)}
                style={{ padding: 40, textAlign: 'center', color: 'var(--el-text-color-secondary)' }}>{empty}</td>
            </tr>
          )}
          {sorted.map((row, ri) => (
            <tr key={rowKey(row, ri)} onMouseEnter={() => setHover(ri)} onMouseLeave={() => setHover(-1)}>
              {fixed.map((c, i) => fixedCell(c, i, c.render ? c.render(row, ri) : row[c.prop], { ri }))}
              {columns.map(col => {
                const out = renderCell ? renderCell(row, col) : null;
                const node = out && out.content !== undefined ? out.content : out;
                const tint = out && out.tint;
                return (
                  <td key={col.key} title={out && out.title}
                    style={{
                      width: columnWidth, minWidth: columnWidth,
                      height: 38, padding: '0 4px', boxSizing: 'border-box', textAlign: 'center',
                      background: tint || (col.muted ? 'var(--el-fill-color-lighter)' : 'transparent'),
                      borderBottom: '1px solid var(--el-border-color-lighter)',
                      borderRight: '1px solid var(--el-border-color-lighter)',
                      color: 'var(--el-text-color-regular)', fontSize: 'var(--el-font-size-extra-small)'
                    }}>{node}</td>
                );
              })}
              {totalColumn && (
                <td style={{
                  position: 'sticky', right: 0, zIndex: 2,
                  width: totalColumn.width || 84, minWidth: totalColumn.width || 84,
                  padding: '0 10px', height: 38, boxSizing: 'border-box', textAlign: 'right',
                  background: bgFor(ri), color: 'var(--el-text-color-primary)', fontWeight: 600,
                  borderBottom: '1px solid var(--el-border-color-lighter)',
                  borderLeft: '1px solid var(--el-border-color)',
                  boxShadow: 'var(--il-shadow-sticky-right)',
                  transition: 'background-color var(--il-dur-base) ease'
                }}>{totalColumn.render(row)}</td>
              )}
            </tr>
          ))}
        </tbody>

        {footer && sorted.length > 0 && (
          <tfoot>
            <tr>
              {fixed.map((c, i) => fixedCell(c, i,
                i === 0 ? '' : footer.label,
                { ri: -2, background: 'var(--il-surface-table-head)' }))}
              {columns.map(col => (
                <td key={col.key} style={{
                  width: columnWidth, minWidth: columnWidth, height: 38, padding: '0 4px',
                  boxSizing: 'border-box', textAlign: 'center',
                  background: 'var(--il-surface-table-head)',
                  color: 'var(--el-text-color-primary)', fontWeight: 600,
                  fontSize: 'var(--el-font-size-extra-small)',
                  borderTop: '1px solid var(--el-border-color)',
                  borderRight: '1px solid var(--el-border-color-lighter)'
                }}>{footer.render(col, sorted)}</td>
              ))}
              {totalColumn && (
                <td style={{
                  position: 'sticky', right: 0, zIndex: 2,
                  width: totalColumn.width || 84, minWidth: totalColumn.width || 84,
                  padding: '0 10px', height: 38, boxSizing: 'border-box', textAlign: 'right',
                  background: 'var(--il-surface-table-head)', color: 'var(--el-text-color-primary)', fontWeight: 700,
                  borderTop: '1px solid var(--el-border-color)',
                  borderLeft: '1px solid var(--el-border-color)',
                  boxShadow: 'var(--il-shadow-sticky-right)'
                }}>{footer.total ? footer.total(sorted) : ''}</td>
              )}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
