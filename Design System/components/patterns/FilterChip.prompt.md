Shows what is *currently applied* — not what is pending in the controls above. One chip per active filter, in the order the controls appear.

```jsx
<FilterChip label="Visitor type" value="Students" onRemove={() => clear('type')} />
<FilterChip label="Grades" value="9, 11" onRemove={() => clear('grades')} />
```

Neutral info tint only — a chip never carries semantic colour, even when its value is a status. Removing a chip applies immediately.
