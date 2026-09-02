const {
  Card, Button, Input, Select, Switch, FormField, FormActions, DataTable, Tag, Icon, ConfirmDialog, Divider
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';

function AdminUsersScreen({ notify }) {
  const [rows, setRows] = React.useState(window.IL_DATA.admins);
  const [q, setQ] = React.useState('');
  const [current, setCurrent] = React.useState(null);
  const [form, setForm] = React.useState({ id: null, username: '', password: '', name: '', surname: '', role: 'admin', is_active: true });
  const [showPw, setShowPw] = React.useState(false);
  const [pw, setPw] = React.useState({ password: '', confirm: '' });
  const [confirmRow, setConfirmRow] = React.useState(null);

  const filtered = rows.filter(u => !q || (u.username + u.name + u.surname).toLowerCase().includes(q.toLowerCase()));
  const fmt = s => s ? new Date(s).toLocaleString('en-GB') : '';

  const select = (row) => {
    setCurrent(row);
    setForm({ id: row.id, username: row.username, password: '', name: row.name, surname: row.surname, role: row.role, is_active: row.is_active });
    setShowPw(false);
  };
  const reset = () => { setCurrent(null); setForm({ id: null, username: '', password: '', name: '', surname: '', role: 'admin', is_active: true }); setShowPw(false); };
  const pwError = pw.password && pw.password.length < 8 ? 'At least 8 characters'
    : pw.password && !/[A-Z]/.test(pw.password) ? 'Must contain an uppercase letter' : '';
  const confirmError = pw.confirm && pw.confirm !== pw.password ? 'Passwords do not match' : '';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) var(--il-side-panel-width-lg)', gap: 16, padding: 20, background: 'var(--il-surface-page)', minHeight: '100%', animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)' }}>
      <Card header={<b>Admin Users</b>}>
        <div style={{ marginBottom: 12 }}>
          <Input value={q} onChange={setQ} placeholder="Search by name, surname or username" clearable iconBase={IB} />
        </div>
        <DataTable data={filtered} currentRow={current} onRowClick={select} empty="No data found"
          columns={[
            { label: 'Username', prop: 'username', width: 130 },
            { label: 'Name', prop: 'name', width: 110 },
            { label: 'Surname', prop: 'surname', width: 120 },
            { label: 'Role', width: 92, render: r => <Tag type={r.role === 'admin' ? 'primary' : 'info'} size="small">{r.role}</Tag> },
            { label: 'Active', width: 78, render: r => r.is_active ? <Tag type="success" size="small">Yes</Tag> : <Tag type="info" size="small">No</Tag> },
            { label: 'Created', width: 150, render: r => fmt(r.created_at) },
            { label: 'Updated', width: 150, render: r => fmt(r.updated_at) },
            { label: 'Actions', width: 82, align: 'center', render: r => (
              <Button type="danger" circle size="small" onClick={() => setConfirmRow(r)} icon={<Icon name="delete" size={12} base={IB} color="#fff" />} />
            ) }
          ]} />
      </Card>

      <Card header={<b>{form.id ? 'Edit User' : 'Create User'}</b>}>
        <FormField label="Username" required><Input value={form.username} onChange={v => setForm(f => ({ ...f, username: v }))} disabled={!!form.id} iconBase={IB} /></FormField>
        {!form.id && <FormField label="Password" required><Input value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} type="password" showPassword iconBase={IB} /></FormField>}
        <FormField label="Name" required><Input value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} iconBase={IB} /></FormField>
        <FormField label="Surname" required><Input value={form.surname} onChange={v => setForm(f => ({ ...f, surname: v }))} iconBase={IB} /></FormField>
        <FormField label="Role" required>
          <Select value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))} iconBase={IB}
            options={[{ label: 'Admin', value: 'admin' }, { label: 'Terminal', value: 'terminal' }]} />
        </FormField>
        <FormField label="Active"><Switch checked={form.is_active} onChange={v => setForm(f => ({ ...f, is_active: v }))} /></FormField>
        <FormActions>
          <Button type="primary" onClick={() => { notify('success', form.id ? 'User updated' : 'User created'); reset(); }}>{form.id ? 'Update' : 'Create'}</Button>
          <Button onClick={reset}>Reset</Button>
        </FormActions>

        {form.id && (
          <>
            <Divider />
            {!showPw && <Button type="warning" onClick={() => setShowPw(true)}>Change Password</Button>}
            {showPw && (
              <>
                <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--el-text-color-primary)' }}>Change Password for {form.username}</h4>
                <FormField label="New Password" labelWidth="var(--il-form-label-width-lg)" required error={pwError}>
                  <Input value={pw.password} onChange={v => setPw(p => ({ ...p, password: v }))} type="password" showPassword placeholder="Enter new password" iconBase={IB} />
                </FormField>
                <FormField label="Confirm Password" labelWidth="var(--il-form-label-width-lg)" required error={confirmError}>
                  <Input value={pw.confirm} onChange={v => setPw(p => ({ ...p, confirm: v }))} type="password" showPassword placeholder="Confirm new password" iconBase={IB} />
                </FormField>
                <FormActions labelWidth="var(--il-form-label-width-lg)">
                  <Button type="primary" onClick={() => { notify('success', 'Password updated successfully'); setShowPw(false); setPw({ password: '', confirm: '' }); }}>Save Password</Button>
                  <Button onClick={() => { setShowPw(false); setPw({ password: '', confirm: '' }); }}>Cancel</Button>
                </FormActions>
              </>
            )}
          </>
        )}
      </Card>

      <ConfirmDialog open={!!confirmRow} title="Confirm Delete" intent="warning" iconBase={IB}
        message={confirmRow ? 'Delete user "' + confirmRow.username + '"? This cannot be undone.' : ''}
        confirmLabel="Delete"
        onConfirm={() => { setRows(rs => rs.filter(r => r.id !== confirmRow.id)); notify('success', 'User deleted'); setConfirmRow(null); }}
        onCancel={() => setConfirmRow(null)} />
    </div>
  );
}

Object.assign(window, { AdminUsersScreen });
