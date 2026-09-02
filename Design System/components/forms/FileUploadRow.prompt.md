Image upload affordance (visitor photo, theme assets). The hidden native `<input type="file">` stays hidden; this row drives it.

```jsx
<FileUploadRow fileName={file?.name} uploading={uploading} onChoose={pick} onUpload={send} />
```

Never combine choose + upload into one click — the app deliberately stages the file first.
