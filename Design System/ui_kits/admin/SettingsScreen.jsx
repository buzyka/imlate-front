const { Card, Button, Tabs, PageHeader, AssetSlotCard, Divider, FormField, InputNumber } = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';

function SettingsScreen({ notify }) {
  const [tab, setTab] = React.useState('theme');
  const [welcome, setWelcome] = React.useState(1.8);
  const [goodbye, setGoodbye] = React.useState(1.8);
  const slots = window.IL_DATA.themeSlots;

  const theme = (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
        {slots.map(s => (
          <AssetSlotCard key={s.key} label={s.label} help={s.help} previewSrc={s.preview}
            accepted={s.accepted} isCustom={s.is_custom} updatedAt={s.updated_at}
            onUpload={() => notify('success', 'Asset uploaded')} onReset={() => notify('success', 'Asset reset')} />
        ))}
      </div>
      <Divider />
      <Card shadow="never" header={<div><strong style={{ fontSize: 14, color: 'var(--el-text-color-primary)' }}>Animation Duration</strong>
        <p style={{ margin: '6px 0 0', color: 'var(--el-text-color-regular)', fontSize: 13, lineHeight: 1.4 }}>Control how long welcome and goodbye GIFs stay visible on the tracking page.</p></div>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          <FormField label="Welcome animation (seconds)" labelPosition="top">
            <InputNumber value={welcome} onChange={setWelcome} min={1.8} max={60} step={0.1} precision={1} iconBase={IB} />
          </FormField>
          <FormField label="Goodbye animation (seconds)" labelPosition="top">
            <InputNumber value={goodbye} onChange={setGoodbye} min={1.8} max={60} step={0.1} precision={1} iconBase={IB} />
          </FormField>
        </div>
        <Button type="primary" onClick={() => notify('success', 'Animation timings saved')}>Save timings</Button>
      </Card>
    </>
  );

  return (
    <div style={{ display: 'grid', gap: 20, padding: 20, background: 'var(--il-surface-page)', minHeight: '100%', animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)' }}>
      <Card header={<PageHeader title="Settings" description="Manage tracking page branding and animation timings." />}
        extra={<Button onClick={() => notify('info', 'Theme reloaded')}>Refresh</Button>}>
        <Tabs active={tab} onChange={setTab} tabs={[{ name: 'theme', label: 'Theme', content: theme }]} />
      </Card>
    </div>
  );
}

Object.assign(window, { SettingsScreen });
