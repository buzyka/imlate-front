Primary surface for admin content. Every view is a stack of Cards with 16px gaps on the `--il-surface-page` background.

```jsx
<Card header={<><b>Quick Stats</b><CardSubtitle>Filter and analyze visitor activity</CardSubtitle></>}
      extra={<Button size="small">Refresh</Button>}>
  …
</Card>
```

Use `lift` only for cards that are themselves links. Tables get `bodyStyle={{padding:4}}`.
