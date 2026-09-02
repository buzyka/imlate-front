The dashboard's three outbound tiles (Getting Started, Admin Panel, Tracking point). Grid: `repeat(auto-fit, minmax(220px, 1fr))`, 18px gap.

```jsx
<FeatureCard title="Getting Started" href="https://imlate.buzyka.com/getting-started.html"
  icon={<Icon name="document" size={30} color="var(--il-orange)" />}
  description="Open the quickest path to setup, first steps, and the main ImLate workflow." />
```

Note: the shipped Vue app uses emoji (📖 ⚙️ 🖥️) as these icons. Emoji is otherwise absent from the product — prefer the Element Plus glyph set.
