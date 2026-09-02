Filter and form dropdown. Filter selects are `clearable` and 220px wide (`--il-filter-item-width`); form selects fill their row.

```jsx
<Select value={type} onChange={setType} clearable placeholder="Visitor type"
  options={[{label:'All visitors',value:null},{label:'Students',value:true},{label:'Teachers',value:false}]} />
<Select multiple value={grades} onChange={setGrades} disabled={type !== true} placeholder="Select grade(s)" options={gradeOptions} />
```

Dependent filters are disabled, never removed.
