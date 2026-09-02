const { Card, Button, Input, FormField } = window.ImLateDesignSystem_9c9b6f;

function LoginScreen({ onLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const disabled = !username || !password;

  const submit = () => {
    if (disabled || loading) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(username); }, 600);
  };

  return (
    <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <Card bodyStyle={{ padding: 30 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <img src="../../assets/app-icon.png" alt="ImLate" style={{ width: 64, height: 64, objectFit: 'contain' }} />
            <h2 style={{ margin: 0, textAlign: 'center', fontSize: 'var(--il-fs-h2)', fontWeight: 'var(--il-fw-semibold)', color: 'var(--el-text-color-primary)' }}>ImLate Control Panel</h2>
          </div>
          <FormField label="Username" labelPosition="top" required>
            <Input value={username} onChange={setUsername} placeholder="admin" clearable iconBase="../../assets/icons" />
          </FormField>
          <FormField label="Password" labelPosition="top" required>
            <Input value={password} onChange={setPassword} type="password" showPassword placeholder="••••••••" iconBase="../../assets/icons" />
          </FormField>
          <Button type="primary" loading={loading} disabled={disabled} onClick={submit} style={{ width: '100%' }}>Login</Button>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen });
