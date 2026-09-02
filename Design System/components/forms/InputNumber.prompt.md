Bounded numeric entry. Controls always sit on the right (`controls-position="right"` in the Vue app).

```jsx
<InputNumber value={grade} onChange={setGrade} min={0} />
<InputNumber value={seconds} onChange={setSeconds} min={1.8} max={60} step={0.1} precision={1} />
```
