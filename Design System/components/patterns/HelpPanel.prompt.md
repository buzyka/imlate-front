Rendered inside the sidebar Help Popover. Keeps the product description, both version numbers, and exactly two link tiles.

```jsx
<HelpPanel uiVersion="1.4.0" serverVersion="2.2.1"
  description="Student attendance and visitor registration system. Track who enters and leaves the building with RFID keys, manage visitors, and generate reports."
  links={[{label:'Documentation',href:'https://imlate.buzyka.com/',icon:<Icon name="document" size={18}/>},
          {label:'Getting Started',href:'https://imlate.buzyka.com/getting-started.html',icon:<Icon name="compass" size={18}/>}]} />
```
