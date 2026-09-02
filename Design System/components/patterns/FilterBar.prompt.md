Filters always live in their own card above the data, never in a drawer or the topbar. Active-mode feedback is an inline Tag, not a chip list.

```jsx
<FilterBar>
  <FilterItem><Select … placeholder="Visitor type" clearable /></FilterItem>
  <FilterItem><Select … placeholder="Status" clearable /></FilterItem>
  <FilterItem><Select multiple … placeholder="Select grade(s)" /></FilterItem>
  {grades.length === 1 && <Tag type="success">Single grade mode</Tag>}
  {grades.length > 1 && <Tag type="warning">Multi grade mode</Tag>}
</FilterBar>
```

Filter changes are debounced 300ms and reset the page to 1.
