Sits inside the table card, directly above the grid, on its own hairline-separated row. Its search narrows *the rows already returned* — it is not a filter and never adds a FilterChip.

```jsx
<Card bodyStyle={{padding:0}}>
  <TableToolbar query={q} onQueryChange={setQ} count={rows.length} onExportCsv={csv} onExportPdf={pdf} />
  <DataTable … />
</Card>
```

Export buttons are small default buttons, CSV before PDF.
