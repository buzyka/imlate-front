Intentional addition: the Reports view computes signedIn/signedOut/notSigned counters but has no display component. Use this to surface them.

```jsx
<KpiStat label="Signed in" value={signedIn} intent="success" />
```

Uppercase micro-label, big navy or status-coloured number. Never add sparklines or percentage deltas — ImLate has no trend data.
