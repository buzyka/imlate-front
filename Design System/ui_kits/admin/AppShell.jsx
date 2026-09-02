const {
  SidebarMenu, SidebarFooterButton, Topbar, Popover, HelpPanel, MessageStack, Icon
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';

const MENU = [
  { index: '/users', label: 'Visitors' },
  { index: '/admin-users', label: 'Admin Users' },
  { index: '/reports', label: 'Reports' },
  { index: '/settings', label: 'Settings' }
];

function App() {
  const [authed, setAuthed] = React.useState(false);
  const [userName, setUserName] = React.useState('admin');
  const [route, setRoute] = React.useState('/');
  const [help, setHelp] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  const notify = (type, text) => {
    const id = Date.now() + Math.random();
    setMessages(m => [...m, { id, type, text }]);
    setTimeout(() => setMessages(m => m.filter(x => x.id !== id)), 3000);
  };

  if (!authed) {
    return (
      <div style={{ height: '100vh', overflow: 'auto', background: '#fff' }}>
        <LoginScreen onLogin={(u) => { setUserName(u || 'admin'); setAuthed(true); setRoute('/'); }} />
        <MessageStack messages={messages} iconBase={IB} />
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden' }}>
      <SidebarMenu logoSrc="../../assets/logo.png" active={route} onSelect={setRoute} items={MENU}
        footer={
          <Popover open={help} width={320} placement="right-end"
            content={<HelpPanel uiVersion="1.4.0" serverVersion="2.2.1"
              description="Student attendance and visitor registration system. Track who enters and leaves the building with RFID keys, manage visitors, and generate reports."
              links={[
                { label: 'Documentation', href: 'https://imlate.buzyka.com/', icon: <Icon name="document" size={18} base={IB} color="var(--el-color-primary)" /> },
                { label: 'Getting Started', href: 'https://imlate.buzyka.com/getting-started.html', icon: <Icon name="compass" size={18} base={IB} color="var(--el-color-primary)" /> }
              ]} />}>
            <SidebarFooterButton icon={<Icon name="question-filled" size={16} base={IB} />} onClick={() => setHelp(h => !h)}>Help</SidebarFooterButton>
          </Popover>
        } />

      <div style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar userName={userName} onProfile={() => setRoute('/profile')} onLogout={() => { setAuthed(false); setHelp(false); }} />
        <main style={{ minHeight: 0, flex: 1, overflow: 'auto', background: route === '/' ? '#fff' : 'var(--il-surface-page)' }}>
          {route === '/' && <DashboardScreen userName={userName} />}
          {route === '/users' && <VisitorsScreen notify={notify} />}
          {route === '/admin-users' && <AdminUsersScreen notify={notify} />}
          {route === '/reports' && <ReportsScreen />}
          {route === '/settings' && <SettingsScreen notify={notify} />}
          {route === '/profile' && <ProfileScreen userName={userName} notify={notify} />}
        </main>
      </div>

      <MessageStack messages={messages} iconBase={IB} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
