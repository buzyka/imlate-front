const {
  Card, CardSubtitle, Select, Tag, FilterBar, FilterItem, DataTable, StatusTag, Pagination,
  SectionTitle, KpiStat, Skeleton
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';
const GRADES = Array.from({ length: 12 }, (_, i) => ({ label: 'Grade ' + (i + 1), value: i + 1 }));
const ORDER = { signed_in: 1, signed_out: 2, not_signed: 3 };

function ReportsScreen() {
  const [isStudent, setIsStudent] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [grades, setGrades] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [isStudent, status, grades.join(','), page]);

  React.useEffect(() => { if (isStudent !== true) setGrades([]); }, [isStudent]);

  const rows = window.IL_DATA.visitors
    .filter(v => isStudent === null || v.is_student === isStudent)
    .filter(v => !status || v.sign_status === status)
    .filter(v => grades.length === 0 || grades.includes(v.grade))
    .map(v => ({ ...v, visit_date: new Date(v.updated_at).toLocaleString('en-GB') }))
    .sort((a, b) => ORDER[a.sign_status] - ORDER[b.sign_status]);

  const count = s => rows.filter(r => r.sign_status === s).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 20, background: 'var(--il-surface-page)', minHeight: '100%', animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)' }}>
      <Card header={<div><b>Quick Stats</b><CardSubtitle>Filter and analyze visitor activity</CardSubtitle></div>}>
        <FilterBar>
          <FilterItem><Select value={isStudent} onChange={setIsStudent} clearable placeholder="Visitor type" iconBase={IB}
            options={[{ label: 'All visitors', value: null }, { label: 'Students', value: true }, { label: 'Teachers', value: false }]} /></FilterItem>
          <FilterItem><Select value={status} onChange={setStatus} clearable placeholder="Status" iconBase={IB}
            options={[{ label: 'Signed in', value: 'signed_in' }, { label: 'Signed out', value: 'signed_out' }, { label: 'Not signed', value: 'not_signed' }]} /></FilterItem>
          <FilterItem><Select multiple value={grades} onChange={setGrades} disabled={isStudent !== true} placeholder="Select grade(s)" options={GRADES} iconBase={IB} /></FilterItem>
          {grades.length === 1 && <Tag type="success">Single grade mode</Tag>}
          {grades.length > 1 && <Tag type="warning">Multi grade mode</Tag>}
        </FilterBar>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        <KpiStat label="Signed in" value={count('signed_in')} intent="success" />
        <KpiStat label="Signed out" value={count('signed_out')} intent="warning" />
        <KpiStat label="Not signed" value={count('not_signed')} intent="info" />
      </div>

      <SectionTitle>Fire report</SectionTitle>

      <Card bodyStyle={{ padding: 4 }}>
        {loading
          ? <div style={{ padding: 8 }}><Skeleton rows={6} columns={[50, 120, 120, 160, 100, 120]} /></div>
          : <DataTable data={rows} empty="No data found" rowClass={r => r.sign_status.replace(/_/g, '-')}
              columns={[
                { label: '#', width: 62, align: 'center', render: (r, i) => (page - 1) * 20 + i + 1 },
                { label: 'Name', prop: 'name', sortable: true },
                { label: 'Surname', prop: 'surname', sortable: true },
                { label: 'Last activity', prop: 'visit_date', width: 170, sortable: true },
                { label: 'Student', prop: 'is_student', width: 110, sortable: true, render: r => String(r.is_student) },
                { label: 'Status', width: 130, render: r => <StatusTag status={r.sign_status} soft /> }
              ]} />}
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination page={page} total={140} pageSize={20} onChange={setPage} iconBase={IB} />
      </div>
    </div>
  );
}

Object.assign(window, { ReportsScreen });
