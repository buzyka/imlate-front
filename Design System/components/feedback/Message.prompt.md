Every mutation reports through a toast. Copy is short past-tense for success ("Visitor updated", "RFID added") and "Failed to …" for errors.

```jsx
<MessageStack messages={[{id:1,type:'success',text:'Visitor updated'}]} />
```

Success toasts are the confirmation — do not also show an inline success banner.
