Standard ImLate admin button; use for every action, from form submits to circular table row actions.

```jsx
<Button type="primary" loading={saving} onClick={save}>Update</Button>
<Button onClick={reset}>Reset</Button>
<Button type="danger" circle size="small" icon={<Icon name="delete" />} />
<Button type="danger" plain disabled={!isCustom}>Reset</Button>
```

Rules: primary for the single confirming action per card, `danger` for deletes, `text` only in the topbar. Destructive actions in tables are `circle size="small"`. Dialog footers put Cancel (default) left of the intent-coloured confirm.
