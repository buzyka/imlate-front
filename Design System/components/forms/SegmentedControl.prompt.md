Short, mutually-exclusive picks that should stay visible — date-range presets, density switches. Use `Select` instead once there are five or more options, and `Tabs` for switching whole views.

```jsx
<SegmentedControl value={preset} onChange={setPreset}
  options={[{label:'Day',value:'day'},{label:'Week',value:'week'},{label:'Month',value:'month'},{label:'Custom',value:'custom'}]} />
```

Active segment is a solid primary fill. Never colour segments semantically.
