Settings → Theme. One card per uploadable asset slot, in a `repeat(auto-fit, minmax(240px, 1fr))` grid with 16px gaps.

```jsx
<AssetSlotCard label="Welcome animation" help="Animation shown after a successful sign-in event."
  previewSrc={asset.current_url} accepted="GIF" isCustom={asset.is_custom} onUpload={pick} onReset={reset} />
```

Reset is `danger plain` and disabled while the asset is still the default.
