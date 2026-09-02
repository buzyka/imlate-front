Wraps every input in an ImLate form. Errors are short sentence-case strings validated on blur ("Name is required", "At least 8 characters").

```jsx
<FormField label="Name" required error={errors.name}><Input value={name} onChange={setName} /></FormField>
<FormField label="Username" labelPosition="top"><Input value={u} onChange={setU} clearable placeholder="admin" /></FormField>
<FormActions><Button type="primary">Update</Button><Button>Reset</Button></FormActions>
```
