const { Card, Button, Input, FormField, FormActions } = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';

function ProfileScreen({ userName, notify }) {
  const [show, setShow] = React.useState(false);
  const [pw, setPw] = React.useState({ password: '', confirm: '' });
  const err = pw.password && pw.password.length < 8 ? 'Password must be at least 8 characters' : '';
  const cerr = pw.confirm && pw.confirm !== pw.password ? 'Passwords do not match' : '';

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 'var(--il-form-max)', padding: 20, background: 'var(--il-surface-page)', minHeight: '100%', animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)' }}>
      <Card header={<b>My Profile</b>}>
        <FormField label="Username"><Input value={userName} onChange={() => {}} disabled /></FormField>
        <FormField label="Name"><Input value="Alex" onChange={() => {}} disabled /></FormField>
        <FormField label="Surname"><Input value="Morgan" onChange={() => {}} disabled /></FormField>
        <FormField label="Role"><Input value="admin" onChange={() => {}} disabled /></FormField>
      </Card>
      <Card header={<b>Security</b>}>
        {!show && <Button type="primary" onClick={() => setShow(true)}>Change Password</Button>}
        {show && (
          <>
            <FormField label="New Password" labelWidth="var(--il-form-label-width-lg)" required error={err}>
              <Input value={pw.password} onChange={v => setPw(p => ({ ...p, password: v }))} type="password" showPassword placeholder="Enter new password" iconBase={IB} />
            </FormField>
            <FormField label="Confirm Password" labelWidth="var(--il-form-label-width-lg)" required error={cerr}>
              <Input value={pw.confirm} onChange={v => setPw(p => ({ ...p, confirm: v }))} type="password" showPassword placeholder="Confirm new password" iconBase={IB} />
            </FormField>
            <FormActions labelWidth="var(--il-form-label-width-lg)">
              <Button type="primary" onClick={() => { notify('success', 'Password updated successfully'); setShow(false); setPw({ password: '', confirm: '' }); }}>Save</Button>
              <Button onClick={() => { setShow(false); setPw({ password: '', confirm: '' }); }}>Cancel</Button>
            </FormActions>
          </>
        )}
      </Card>
    </div>
  );
}

Object.assign(window, { ProfileScreen });
