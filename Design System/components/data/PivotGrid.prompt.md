Use when one row must be read across many periods — attendance per day, usage per week. Use `DataTable` for everything else; a pivot is harder to scan when there is only one value per row.

```jsx
<PivotGrid
  rows={people}
  fixed={[
    { label: '#', width: 52, align: 'center', render: (r, i) => i + 1 },
    { label: 'Surname & First Name', width: 210, sortValue: r => r.surname, render: r => <><b>{r.surname}</b> {r.name}</> }
  ]}
  columns={dayColumns}          // [{ key: '2026-09-01', top: 'Tue', label: '01', muted: false }]
  columnWidth={62}
  renderCell={(row, col) => cellFor(row, col.key)}
  totalColumn={{ label: 'Total hrs', render: r => totalFor(r) }}
  footer={{ label: 'Present / day', render: col => countFor(col.key), total: rows => grandTotal(rows) }}
/>
```

Rules: cell tints come from `light-9` and `fill` tokens only — a saturated fill across a whole grid is unreadable. Absent states stay **blank** (a muted dash at most); do not tint absence. Always pair the grid with a `Legend`. Cap generated columns at ~45 and fall back to an aggregate table beyond that.
