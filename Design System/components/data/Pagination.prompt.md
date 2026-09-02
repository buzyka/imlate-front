Pagination for server-paged lists (Reports). Filled "background" style, aligned to the right of the content column.

```jsx
<div style={{display:'flex',justifyContent:'flex-end'}}>
  <Pagination page={page} total={total} pageSize={20} onChange={setPage} />
</div>
```
