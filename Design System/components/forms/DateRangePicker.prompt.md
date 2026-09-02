Time-bounded reporting. The backend takes `from`/`to` as `YYYY-MM-DD`, so always emit through `DateRangePicker.format` / `DateRangePicker.iso` rather than a locale string.

```jsx
<SegmentedControl value={preset} onChange={applyPreset}
  options={[{label:'Day',value:'day'},{label:'Week',value:'week'},{label:'Month',value:'month'},{label:'Custom',value:'custom'}]} />
<DateRangePicker from={range.from} to={range.to} onChange={setRange} style={{width:260}} />
// label: DateRangePicker.format(range)  →  "2026-08-31 — 2026-09-06"
```

Intentional addition — the Vue app has no picker (Reports hardcodes today→tomorrow). Show presets and the picker side by side: choosing a preset fills the picker; touching the picker switches the segment to Custom. 260px wide; the dropdown is two 224px months separated by a hairline.
