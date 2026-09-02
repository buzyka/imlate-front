First-load placeholder. Match the shape of what's coming: header skeletons for card titles, an 8-row column skeleton for tables.

```jsx
{isFirstLoad ? <Skeleton rows={8} columns={[50,120,120,160,100,120]} /> : <DataTable … />}
```

On subsequent loads keep the table mounted and use a loading overlay instead.
