const {
  Card, CardSubtitle, Button, Input, Select, Tag, SegmentedControl, DateRangePicker, DATE_PRESETS,
  FilterBar, FilterItem, FilterChip, DataTable, PivotGrid, Legend, TableToolbar, StatusTag, Pagination,
  SectionTitle, PageHeader, KpiStat, Skeleton, Tabs, Icon
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';
const iso = (d) => d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` : '';
const formatRange = DateRangePicker.format || (({ from, to }) => (from && to) ? `${iso(from)} — ${iso(to)}` : '');
const PRESETS = DATE_PRESETS || DateRangePicker.PRESETS;

const GRADES = Array.from({ length: 12 }, (_, i) => ({ label: 'Grade ' + (i + 1), value: i + 1 }));
const TYPE_OPTS = [{ label: 'All visitors', value: null }, { label: 'Students', value: true }, { label: 'Teachers', value: false }];
const STATUS_OPTS = [{ label: 'Signed in', value: 'signed_in' }, { label: 'Signed out', value: 'signed_out' }, { label: 'Not signed', value: 'not_signed' }];
const SIGN_ORDER = { signed_in: 1, signed_out: 2, not_signed: 3 };

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* Cell tints: light-9 / fill tokens only, and absence is never tinted. */
const CELL_TINT = {
  active: 'var(--el-color-success-light-9)',
  late: 'var(--el-color-warning-light-9)',
  complete: 'var(--el-fill-color-light)',
  weekend: 'var(--el-fill-color-lighter)',
  future: 'transparent',
  absent: 'transparent'
};

const LEGEND = [
  { label: 'Signed in', swatch: 'var(--el-color-success-light-9)', border: 'var(--el-color-success-light-5)', hint: 'still in the building' },
  { label: 'Completed', swatch: 'var(--el-fill-color-light)', hint: 'hours present' },
  { label: 'Late arrival', swatch: 'var(--el-color-warning-light-9)', border: 'var(--el-color-warning-light-5)', hint: 'after 09:00' },
  { label: 'Absent', hint: 'blank cell' },
  { label: 'Weekend / not yet', swatch: 'var(--el-fill-color-lighter)' }
];

const EMPTY = { type: null, status: null, grades: [], surname: '', range: PRESETS.week() };
const sameFilters = (a, b) =>
  a.type === b.type && a.status === b.status && a.surname.trim() === b.surname.trim() &&
  a.grades.join(',') === b.grades.join(',') &&
  formatRange(a.range) === formatRange(b.range);

function ReportsScreen({ notify }) {
  const [report, setReport] = React.useState('fire');
  const [draft, setDraft] = React.useState(EMPTY);
  const [applied, setApplied] = React.useState(EMPTY);
  const [preset, setPreset] = React.useState('week');
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const dirty = !sameFilters(draft, applied);

  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, [report, applied, page]);

  React.useEffect(() => { if (draft.type !== true && draft.grades.length) setDraft(d => ({ ...d, grades: [] })); }, [draft.type]);

  const set = (patch) => setDraft(d => ({ ...d, ...patch }));
  const apply = () => { setApplied(draft); setPage(1); };
  const resetAll = () => { setDraft(EMPTY); setApplied(EMPTY); setPreset('week'); setQuery(''); setPage(1); };
  const clearOne = (key) => {
    const next = { ...applied, ...(key === 'grades' ? { grades: [] } : key === 'range' ? { range: EMPTY.range } : { [key]: key === 'surname' ? '' : null }) };
    setApplied(next); setDraft(next); setPage(1);
    if (key === 'range') setPreset('week');
  };
  const usePreset = (p) => {
    setPreset(p);
    if (p !== 'custom') set({ range: PRESETS[p]() });
  };

  /* ── applied-filter chips ── */
  const chips = [];
  if (applied.type !== null) chips.push({ key: 'type', label: 'Visitor type', value: applied.type ? 'Students' : 'Teachers' });
  if (applied.status) chips.push({ key: 'status', label: 'Status', value: (STATUS_OPTS.find(o => o.value === applied.status) || {}).label });
  if (applied.grades.length) chips.push({ key: 'grades', label: applied.grades.length > 1 ? 'Grades' : 'Grade', value: applied.grades.slice().sort((a, b) => a - b).join(', ') });
  if (report === 'fire' && applied.surname.trim()) chips.push({ key: 'surname', label: 'Last name', value: applied.surname.trim() });
  if (report === 'attendance') chips.push({ key: 'range', label: 'Range', value: formatRange(applied.range) });

  /* ── row sets ── */
  const base = (list) => list
    .filter(v => applied.type === null || v.is_student === applied.type)
    .filter(v => applied.grades.length === 0 || applied.grades.includes(v.grade));

  const searched = (list) => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(r => (r.name + ' ' + r.surname).toLowerCase().includes(q));
  };

  const fireRows = searched(base(window.IL_DATA.visitors)
    .filter(v => !applied.status || v.sign_status === applied.status)
    .filter(v => !applied.surname.trim() || v.surname.toLowerCase().includes(applied.surname.trim().toLowerCase()))
    .map(v => ({ ...v, visit_date: new Date(v.updated_at).toLocaleString('en-GB') }))
    .sort((a, b) => SIGN_ORDER[a.sign_status] - SIGN_ORDER[b.sign_status]));

  const attRows = searched(base(window.IL_DATA.attendance));

  const rows = report === 'fire' ? fireRows : attRows;

  const fireColumns = [
    { label: '#', width: 56, align: 'center', render: (r, i) => (page - 1) * 20 + i + 1 },
    { label: 'Name', prop: 'name', sortable: true },
    { label: 'Surname', prop: 'surname', sortable: true },
    { label: 'Last activity', prop: 'visit_date', width: 170, sortable: true },
    { label: 'Student', prop: 'is_student', width: 96, sortable: true, render: r => String(r.is_student) },
    { label: 'Status', width: 130, render: r => <StatusTag status={r.sign_status} soft /> }
  ];

  /* ── matrix: one generated column per day in the applied range ── */
  const days = window.IL_DATA.eachDay(applied.range.from, applied.range.to);
  const capped = days.length >= 45;

  const dayColumns = days.map(d => {
    const dow = d.getDay();
    return {
      key: window.IL_DATA.iso(d),
      date: d,
      top: WEEKDAYS_SHORT[dow],
      label: d.getDate() === 1 || d.getDate() === days[0].getDate()
        ? String(d.getDate()).padStart(2, '0') + ' ' + MONTHS_SHORT[d.getMonth()]
        : String(d.getDate()).padStart(2, '0'),
      muted: dow === 0 || dow === 6
    };
  });

  const cells = React.useMemo(() => {
    const map = new Map();
    attRows.forEach(p => {
      const perPerson = {};
      dayColumns.forEach(col => { perPerson[col.key] = window.IL_DATA.attendanceDay(p, col.date); });
      map.set(p.id, perPerson);
    });
    return map;
  }, [attRows, applied.range.from && applied.range.from.getTime(), applied.range.to && applied.range.to.getTime()]);

  const cellOf = (row, col) => (cells.get(row.id) || {})[col.key] || { state: 'absent' };

  const renderCell = (row, col) => {
    const c = cellOf(row, col);
    if (c.state === 'active') {
      return {
        tint: CELL_TINT.active,
        title: row.surname + ' — signed in ' + c.checkInLabel + ', still in the building',
        content: (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--el-color-success-dark-2)', fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--el-color-success)' }} />
            In
          </span>
        )
      };
    }
    if (c.state === 'complete' || c.state === 'late') {
      return {
        tint: CELL_TINT[c.state],
        title: row.surname + ' — ' + c.checkInLabel + ' to ' + c.checkOutLabel + (c.state === 'late' ? ' (late arrival)' : ''),
        content: <span style={{ fontWeight: c.state === 'late' ? 600 : 400, color: c.state === 'late' ? 'var(--el-color-warning-dark-2)' : 'var(--el-text-color-regular)' }}>{c.hours.toFixed(1)}</span>
      };
    }
    if (c.state === 'weekend' || c.state === 'future') {
      return { tint: CELL_TINT[c.state], content: null };
    }
    return { tint: 'transparent', title: row.surname + ' — no check-in recorded', content: <span style={{ color: 'var(--el-text-color-disabled)' }}>—</span> };
  };

  const rowHours = (row) => dayColumns.reduce((a, col) => a + (cellOf(row, col).hours || 0), 0);
  const dayPresent = (col) => attRows.filter(p => ['complete', 'late', 'active'].includes(cellOf(p, col).state)).length;
  /* A day with nothing recorded yet is not a day of zero attendance — weekends and
     future dates both report "—" rather than asserting a count. */
  const columnElapsed = (col) => !col.muted && attRows.length > 0 && attRows.some(p => cellOf(p, col).state !== 'future');
  const elapsedColumns = dayColumns.filter(columnElapsed);

  const count = s => fireRows.filter(r => r.sign_status === s).length;
  const workdays = dayColumns.filter(c => !c.muted);
  const allCells = attRows.flatMap(p => dayColumns.map(col => cellOf(p, col)));
  const doneCells = allCells.filter(c => c.hours);
  const avgHours = doneCells.length ? doneCells.reduce((a, c) => a + c.hours, 0) / doneCells.length : 0;
  const lateCount = allCells.filter(c => c.state === 'late').length;
  const absentCount = allCells.filter(c => c.state === 'absent').length;

  /* ── filter panel per report ── */
  const filters = (
    <>
      <FilterBar>
        <FilterItem>
          <Select value={draft.type} onChange={v => set({ type: v })} clearable placeholder="Visitor type" options={TYPE_OPTS} iconBase={IB} />
        </FilterItem>
        <FilterItem>
          <Select value={draft.status} onChange={v => set({ status: v })} clearable placeholder="Status" options={STATUS_OPTS} iconBase={IB} />
        </FilterItem>
        <FilterItem>
          <Select multiple value={draft.grades} onChange={v => set({ grades: v })} disabled={draft.type !== true} placeholder="Select grade(s)" options={GRADES} iconBase={IB} />
        </FilterItem>
        {report === 'fire' && (
          <FilterItem>
            <Input value={draft.surname} onChange={v => set({ surname: v })} placeholder="Last name" prefixIcon="search" clearable iconBase={IB} />
          </FilterItem>
        )}
        {draft.grades.length === 1 && <Tag type="success">Single grade mode</Tag>}
        {draft.grades.length > 1 && <Tag type="warning">Multi grade mode</Tag>}
      </FilterBar>

      {report === 'attendance' && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginTop: 12 }}>
          <SegmentedControl value={preset} onChange={usePreset} options={[
            { label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }, { label: 'Custom', value: 'custom' }
          ]} />
          <DateRangePicker from={draft.range.from} to={draft.range.to} style={{ width: 260 }} iconBase={IB}
            onChange={(r) => { set({ range: r }); setPreset('custom'); }} />
        </div>
      )}

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--el-border-color-lighter)'
      }}>
        <span style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--il-text-mute)', textTransform: 'uppercase', letterSpacing: 'var(--il-tracking-label)', fontWeight: 'var(--il-fw-semibold)', marginRight: 2 }}>Applied</span>
        {chips.length === 0
          ? <span style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--el-text-color-placeholder)' }}>No filters — showing all visitors</span>
          : chips.map(c => <FilterChip key={c.key} label={c.label} value={c.value} onRemove={() => clearOne(c.key)} iconBase={IB} />)}
        <div style={{ flex: 1 }} />
        {dirty && <span style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--el-color-warning)' }}>Unapplied changes</span>}
        <Button size="small" onClick={resetAll}>Reset</Button>
        <Button size="small" type="primary" disabled={!dirty} onClick={apply}>Apply filters</Button>
      </div>
    </>
  );

  const grid = (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {report === 'fire' ? (
          <>
            <KpiStat label="Signed in" value={count('signed_in')} intent="success" hint="Currently in the building" />
            <KpiStat label="Signed out" value={count('signed_out')} intent="warning" hint="Left today" />
            <KpiStat label="Not signed" value={count('not_signed')} intent="info" hint="No event recorded" />
          </>
        ) : (
          <>
            <KpiStat label="Avg hours / day" value={avgHours.toFixed(1)} intent="neutral" hint={elapsedColumns.length + ' of ' + workdays.length + ' working days elapsed'} />
            <KpiStat label="Late arrivals" value={lateCount} intent="warning" hint="After 09:00" />
            <KpiStat label="Absences" value={absentCount} intent="info" hint="Working days with no check-in" />
          </>
        )}
      </div>

      <SectionTitle>{report === 'fire' ? 'Fire list' : 'Attendance ' + formatRange(applied.range)}</SectionTitle>

      <Card bodyStyle={{ padding: 0 }}>
        <TableToolbar query={query} onQueryChange={setQuery} count={rows.length} countLabel={rows.length === 1 ? 'row' : 'rows'}
          iconBase={IB} onExportCsv={() => notify && notify('success', 'Export started — CSV')} onExportPdf={() => notify && notify('success', 'Export started — PDF')} />
        {report === 'attendance' && !loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '10px 12px', borderBottom: '1px solid var(--el-border-color-lighter)' }}>
            <Legend items={LEGEND} />
            <div style={{ flex: 1 }} />
            {elapsedColumns.length < workdays.length && (
              <span style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--el-text-color-secondary)' }}>
                Totals cover {elapsedColumns.length} of {workdays.length} working days — the rest have not occurred yet
              </span>
            )}
            {capped && <span style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--el-color-warning)' }}>Showing the first 45 days of the range</span>}
          </div>
        )}
        <div style={{ padding: 4 }}>
          {loading
            ? <div style={{ padding: 8 }}><Skeleton rows={6} columns={report === 'fire' ? [50, 120, 120, 160, 90, 120] : [50, 210, 62, 62, 62, 62, 62, 62, 62]} /></div>
            : report === 'attendance'
            ? <PivotGrid
                rows={attRows} rowKey={r => r.id} columnWidth={62} columns={dayColumns} renderCell={renderCell}
                fixed={[
                  { label: '#', width: 52, align: 'center', render: (r, i) => i + 1 },
                  { label: 'Surname & First Name', width: 210, sortValue: r => r.surname.toLowerCase(),
                    render: r => <><b style={{ fontWeight: 600, color: 'var(--el-text-color-primary)' }}>{r.surname}</b>{' '}<span style={{ color: 'var(--el-text-color-regular)' }}>{r.name}</span></> }
                ]}
                totalColumn={{ label: 'Total hrs', width: 88, render: r => rowHours(r).toFixed(1) }}
                footer={{
                  label: 'Present / day',
                  render: (col) => columnElapsed(col)
                    ? dayPresent(col)
                    : <span style={{ color: 'var(--el-text-color-disabled)' }}>—</span>,
                  total: () => attRows.reduce((a, p) => a + rowHours(p), 0).toFixed(1)
                }}
                empty={chips.length || query ? 'No visitors match these filters.' : 'No visitor activity in this period.'}
              />
            : <DataTable data={rows} columns={fireColumns}
                rowClass={r => r.sign_status.replace(/_/g, '-')}
                empty={
                  <div style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
                    <Icon name="filter" size={22} color="var(--el-text-color-disabled)" base={IB} />
                    <span style={{ color: 'var(--el-text-color-regular)' }}>No data found</span>
                    <span style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--el-text-color-secondary)' }}>
                      {chips.length || query ? 'Try widening the filters or clearing the search.' : 'No visitor activity in this period.'}
                    </span>
                  </div>
                } />}
        </div>
      </Card>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
        {report === 'attendance' && (
          <span style={{ fontSize: 'var(--il-fs-meta)', color: 'var(--el-text-color-secondary)' }}>
            {attRows.length} visitors × {dayColumns.length} days
          </span>
        )}
        <Pagination page={page} total={report === 'fire' ? 140 : 96} pageSize={20} onChange={setPage} iconBase={IB} />
      </div>
    </>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 20, background: 'var(--il-surface-page)', minHeight: '100%', animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)' }}>
      <Card
        header={<PageHeader title="Reports" description="Switch report type, then filter and export visitor activity." />}
        bodyStyle={{ padding: '0 20px 20px' }}>
        <Tabs active={report} onChange={setReport} tabs={[
          { name: 'fire', label: 'Fire List', content: filters },
          { name: 'attendance', label: 'Attendance Report', content: filters }
        ]} />
      </Card>
      {grid}
    </div>
  );
}

Object.assign(window, { ReportsScreen });
