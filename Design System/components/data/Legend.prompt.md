Required whenever a grid encodes meaning in cell colour rather than text — a tint with no key is unreadable.

```jsx
<Legend items={[
  { label: 'Signed in', swatch: 'var(--el-color-success-light-9)', border: 'var(--el-color-success-light-5)', hint: 'still in the building' },
  { label: 'Completed', swatch: 'var(--el-fill-color-light)' },
  { label: 'Late arrival', swatch: 'var(--el-color-warning-light-9)', border: 'var(--el-color-warning-light-5)' },
  { label: 'Absent', hint: 'blank cell' }
]} />
```

Keep it to four or five entries on one line, in the order a reader meets them. 12px, secondary grey.
