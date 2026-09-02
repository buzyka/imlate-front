const {
  Card, Button, Input, Select, Switch, InputNumber, Textarea, FormField, FormActions,
  DataTable, Avatar, Tag, Icon, Dialog, ConfirmDialog, ActionChoiceCard, FileUploadRow, Divider
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';

function fmt(str) {
  if (!str) return '';
  return new Date(str).toLocaleString('en-GB');
}

function VisitorsScreen({ notify }) {
  const [rows, setRows] = React.useState(window.IL_DATA.visitors);
  const [q, setQ] = React.useState('');
  const [qName, setQName] = React.useState('');
  const [qGrade, setQGrade] = React.useState('');
  const [current, setCurrent] = React.useState(null);
  const [form, setForm] = React.useState({ id: null, name: '', surname: '', is_student: false, grade: 0, keys: [] });
  const [newKey, setNewKey] = React.useState('');
  const [trackRow, setTrackRow] = React.useState(null);
  const [action, setAction] = React.useState('sign_in');
  const [reason, setReason] = React.useState('');
  const [confirmRow, setConfirmRow] = React.useState(null);

  const filtered = rows.filter(v => {
    const hay = (v.name + v.surname + (v.grade || '')).toLowerCase().replace(/\s+/g, '');
    if (q && !q.toLowerCase().split(' ').filter(Boolean).every(w => hay.includes(w))) return false;
    if (qName && !(v.name + v.surname).toLowerCase().includes(qName.toLowerCase())) return false;
    if (qGrade && !String(v.grade).includes(qGrade)) return false;
    return true;
  });

  const select = (row) => {
    setCurrent(row);
    setForm({ id: row.id, name: row.name, surname: row.surname, is_student: row.is_student, grade: row.grade || 0, keys: [...row.keys] });
  };
  const reset = () => { setCurrent(null); setForm({ id: null, name: '', surname: '', is_student: false, grade: 0, keys: [] }); setNewKey(''); };
  const save = () => { notify('success', form.id ? 'Visitor updated' : 'Visitor created'); reset(); };
  const addKey = () => {
    if (!newKey.trim()) return;
    setForm(f => ({ ...f, keys: [...f.keys, newKey.trim().toUpperCase()] }));
    notify('success', 'RFID added');
    setNewKey('');
  };
  const removeKey = (k) => { setForm(f => ({ ...f, keys: f.keys.filter(x => x !== k) })); notify('success', 'RFID removed'); };
  const submitTrack = () => {
    notify('success', 'Visitor was ' + (action === 'sign_in' ? 'signed in' : 'signed out') + ' successfully');
    setTrackRow(null); setReason('');
  };
  const doDelete = () => {
    setRows(rs => rs.filter(r => r.id !== confirmRow.id));
    notify('success', 'Visitor deleted');
    if (current && current.id === confirmRow.id) reset();
    setConfirmRow(null);
  };

  const trackMeta = action === 'sign_in'
    ? { badge: 'Sign In', intent: 'success', title: 'Register arrival', hint: 'Use this when the visitor has arrived and needs a manual check-in.', submit: 'Sign In Visitor', ph: 'Example: Visitor arrived at reception and forgot to scan.' }
    : { badge: 'Sign Out', intent: 'danger', title: 'Register departure', hint: 'Use this when the visitor has left and needs a manual check-out.', submit: 'Sign Out Visitor', ph: 'Example: Visitor left the building without scanning at the exit.' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) var(--il-side-panel-width)', gap: 16, padding: 20, background: 'var(--il-surface-page)', minHeight: '100%', animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)' }}>
      <Card header={<b>Visitors</b>} bodyStyle={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 12 }}>
          <Input value={q} onChange={setQ} placeholder="Search by name or surname" clearable iconBase={IB} />
          <Input value={qName} onChange={setQName} placeholder="Search by name" clearable iconBase={IB} />
          <Input value={qGrade} onChange={setQGrade} placeholder="Search by grade" clearable iconBase={IB} />
        </div>
        <DataTable
          data={filtered} currentRow={current} onRowClick={select} empty="No data found"
          columns={[
            { label: '', width: 60, render: r => <Avatar src={r.image} size={40} /> },
            { label: 'ID', prop: 'id', width: 62 },
            { label: 'Name', prop: 'name', width: 110 },
            { label: 'Surname', prop: 'surname', width: 130 },
            { label: 'RFID Count', width: 96, render: r => r.keys.length },
            { label: 'Student', width: 84, render: r => r.is_student ? <Tag type="success" size="small">Yes</Tag> : <Tag type="info" size="small">No</Tag> },
            { label: 'Grade', width: 68, render: r => r.is_student ? r.grade : '' },
            { label: 'Updated', width: 150, render: r => fmt(r.updated_at) },
            { label: '', width: 56, align: 'center', render: r => (
              <Button type="primary" circle size="small" onClick={() => { setTrackRow(r); setAction('sign_in'); setReason(''); }}
                icon={<Icon name="location" size={12} base={IB} color="#fff" />} />
            ) },
            { label: '', width: 56, align: 'center', render: r => (
              <Button type="danger" circle size="small" onClick={() => setConfirmRow(r)}
                icon={<Icon name="delete" size={12} base={IB} color="#fff" />} />
            ) }
          ]} />
      </Card>

      <Card header={<b>{form.id ? 'Edit Visitor' : 'Create Visitor'}</b>}>
        <Avatar size={120} style={{ marginBottom: 8 }} />
        {form.id && <FileUploadRow fileName={null} onChoose={() => {}} />}
        <FormField label="Name" required><Input value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} iconBase={IB} /></FormField>
        <FormField label="Surname" required><Input value={form.surname} onChange={v => setForm(f => ({ ...f, surname: v }))} iconBase={IB} /></FormField>
        <FormField label="Is Student"><Switch checked={form.is_student} onChange={v => setForm(f => ({ ...f, is_student: v }))} /></FormField>
        {form.is_student && <FormField label="Grade"><InputNumber value={form.grade} onChange={v => setForm(f => ({ ...f, grade: v }))} min={0} iconBase={IB} /></FormField>}
        {form.id && (
          <>
            <FormField label="RFID Add">
              <div style={{ display: 'flex', gap: 8 }}>
                <Input value={newKey} onChange={setNewKey} iconBase={IB} />
                <Button type="primary" onClick={addKey} style={{ flex: '0 0 80px' }}>Add</Button>
              </div>
            </FormField>
            {form.keys.length > 0 && (
              <DataTable style={{ marginBottom: 12 }} data={form.keys.map(k => ({ key: k }))}
                columns={[
                  { label: 'RFID', render: r => <span style={{ fontFamily: 'var(--il-font-mono)' }}>{r.key}</span> },
                  { label: '', width: 62, align: 'center', render: r => <Button size="small" type="danger" onClick={() => removeKey(r.key)}>X</Button> }
                ]} />
            )}
          </>
        )}
        <FormActions><Button type="primary" onClick={save}>{form.id ? 'Update' : 'Create'}</Button><Button onClick={reset}>Reset</Button></FormActions>
      </Card>

      <Dialog open={!!trackRow} title="Track Visit" width={560} onClose={() => setTrackRow(null)} iconBase={IB}
        footer={<>
          <Button onClick={() => setTrackRow(null)}>Cancel</Button>
          <Button type={trackMeta.intent} disabled={!reason.trim()} onClick={submitTrack}>{trackMeta.submit}</Button>
        </>}>
        {trackRow && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '4px 4px 0' }}>
              <Avatar src={trackRow.image} size={88} />
              <div style={{ display: 'grid', gap: 8 }}>
                <div><Tag type={trackMeta.intent} effect="dark" round>{trackMeta.badge}</Tag></div>
                <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, color: 'var(--il-text-dialog)' }}>{trackRow.name} {trackRow.surname}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{trackMeta.title}</div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--il-text-dialog-soft)' }}>{trackMeta.hint}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 'var(--il-tracking-label)', textTransform: 'uppercase', color: '#374151' }}>Action</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 12 }}>
                <ActionChoiceCard badge="Sign In" title="Register arrival" intent="success" active={action === 'sign_in'} onClick={() => setAction('sign_in')} />
                <ActionChoiceCard badge="Sign Out" title="Register departure" intent="danger" active={action === 'sign_out'} onClick={() => setAction('sign_out')} />
              </div>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 'var(--il-tracking-label)', textTransform: 'uppercase', color: '#374151' }}>Reason</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#dc2626' }}>Required</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--il-text-dialog-soft)' }}>Add a short note so other administrators understand why this visit was recorded manually.</p>
              <Textarea value={reason} onChange={setReason} rows={4} placeholder={trackMeta.ph} />
            </div>
          </div>
        )}
      </Dialog>

      <ConfirmDialog open={!!confirmRow} title="Confirm" intent="warning" iconBase={IB}
        message={confirmRow ? 'Delete visitor "' + confirmRow.name + ' ' + confirmRow.surname + '"?' : ''}
        confirmLabel="Delete" onConfirm={doDelete} onCancel={() => setConfirmRow(null)} />
    </div>
  );
}

Object.assign(window, { VisitorsScreen });
