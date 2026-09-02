Anchored panel for supplementary info. ImLate uses exactly one: the Help panel, opened from the sidebar footer, 320px, `right-end`.

```jsx
<Popover width={320} placement="right-end" content={<HelpPanel />}>
  <SidebarFooterButton icon={<Icon name="question-filled" />}>Help</SidebarFooterButton>
</Popover>
```
