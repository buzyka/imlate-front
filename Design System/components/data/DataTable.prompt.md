The workhorse of every list view. Always bordered, always highlight-current-row, always paired with a side form or a row-action button column.

```jsx
<DataTable
  columns={[
    { label: '', width: 60, render: r => <Avatar src={r.image} /> },
    { label: 'ID', prop: 'id', width: 70 },
    { label: 'Name', prop: 'name', sortable: true },
    { label: 'Status', width: 140, render: r => <StatusTag status={r.sign_status} /> },
    { label: '', width: 60, align: 'center', render: r => <Button type="danger" circle size="small" icon={<Icon name="delete" />} /> }
  ]}
  data={rows} onRowClick={selectRow} currentRow={current}
/>
```

Action columns have an empty label, fixed 60px width and centre alignment.
