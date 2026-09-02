The only primary navigation in ImLate. Fixed 180px, text-only items, 56px rows, always exactly: Visitors, Admin Users, Reports, Settings.

```jsx
<SidebarMenu logoSrc="/assets/logo.png" active={path} onSelect={setPath}
  items={[{index:'/users',label:'Visitors'},{index:'/admin-users',label:'Admin Users'},{index:'/reports',label:'Reports'},{index:'/settings',label:'Settings'}]}
  footer={<SidebarFooterButton icon={<Icon name="question-filled" />}>Help</SidebarFooterButton>} />
```

Do not add icons to menu items unless asked — the shipped app is text-only. Never add a collapse toggle.
