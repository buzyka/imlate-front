Wrapper around the Element Plus SVG icon set (`assets/icons/*.svg`) — the only icon source in ImLate.

```jsx
<Icon name="location" size={16} />
<Icon name="question-filled" size={16} color="var(--el-text-color-regular)" />
```

Intentional addition: the Vue app imports icons as components from `@element-plus/icons-vue`; this is the React equivalent. Pass `base` when the page is not at the project root.
