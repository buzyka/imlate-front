ImLate expresses mutually-exclusive choices as tiles with a coloured selection ring, not radios. Two-column grid, 12px gap, collapsing to one column under 700px.

```jsx
<ActionChoiceCard badge="Sign In" title="Register arrival" intent="success" active={action==='sign_in'} onClick={()=>setAction('sign_in')} />
<ActionChoiceCard badge="Sign Out" title="Register departure" intent="danger" active={action==='sign_out'} onClick={()=>setAction('sign_out')} />
```
