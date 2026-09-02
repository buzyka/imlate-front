Task dialogs (manual track) and destructive confirmations. Every delete in ImLate goes through ConfirmDialog first.

```jsx
<Dialog open={open} title="Track Visit" width={560} onClose={close}
  footer={<><Button onClick={close}>Cancel</Button><Button type="success" disabled={!reason.trim()}>Sign In Visitor</Button></>}>…</Dialog>

<ConfirmDialog open={confirming} title="Confirm" intent="warning"
  message={'Delete visitor "Ada Lovelace"?'} confirmLabel="Delete" onConfirm={del} onCancel={cancel} />
```

The confirm button is disabled until required input exists.
