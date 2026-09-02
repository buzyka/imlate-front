Every text entry in ImLate. Search fields are always `clearable` with a "Search by …" placeholder; password fields always `showPassword`.

```jsx
<Input value={q} onChange={setQ} placeholder="Search by name or surname" clearable />
<Input value={pw} onChange={setPw} type="password" showPassword placeholder="••••••••" />
```

Never restyle the ring: hover `--il-ring-input-hover`, focus `--il-ring-input-focus`.
