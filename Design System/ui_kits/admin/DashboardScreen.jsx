const { PillButton, FeatureCard, Icon } = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';

function DashboardScreen({ userName }) {
  return (
    <div style={{ width: '100%', maxWidth: 'var(--il-content-max)', padding: '20px 32px 12px', color: 'var(--il-text-body)', animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)' }}>
      <section style={{
        display: 'grid', gridTemplateColumns: 'minmax(0,560px) minmax(260px,1fr)', gap: 48,
        alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 0 32px', borderBottom: '2px solid var(--il-orange)'
      }}>
        <div>
          <p style={{ margin: 0, color: 'var(--il-navy)', fontSize: 'var(--il-fs-eyebrow)', fontWeight: 'var(--il-fw-bold)', letterSpacing: 'var(--il-tracking-eyebrow)', textTransform: 'uppercase' }}>ImLate Administration</p>
          <h1 style={{ maxWidth: '10ch', margin: '10px 0 0', color: 'var(--il-navy)', fontSize: 'var(--il-fs-hero)', lineHeight: 'var(--il-lh-hero)', fontWeight: 400 }}>Registration system.</h1>
          <p style={{ maxWidth: '34rem', margin: '18px 0 0', fontSize: '1.04rem', lineHeight: 'var(--il-lh-relaxed)' }}>
            Welcome back, {userName}. ImLate gives your team one clear place to manage visitors, follow attendance activity, and keep access workflows organized.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 28 }}>
            <PillButton variant="brand" href="https://imlate.buzyka.com/getting-started.html">Getting Started</PillButton>
            <PillButton variant="alt" href="https://imlate.buzyka.com/">Documentation</PillButton>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="../../assets/logo.png" alt="" style={{ width: 'min(100%,260px)', height: 'auto', display: 'block' }} />
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18, marginTop: 28 }}>
        <FeatureCard title="Getting Started" href="https://imlate.buzyka.com/getting-started.html"
          icon={<Icon name="document" size={32} base={IB} color="var(--il-orange)" />}
          description="Open the quickest path to setup, first steps, and the main ImLate workflow." />
        <FeatureCard title="Admin Panel" href="https://imlate.buzyka.com/admin/index.html"
          icon={<Icon name="setting" size={32} base={IB} color="var(--il-orange)" />}
          description="Manage visitors, admin users, profile details, branding, and system settings." />
        <FeatureCard title="Tracking point" href="https://imlate.buzyka.com/public-frontend/index.html"
          icon={<Icon name="data-analysis" size={32} base={IB} color="var(--il-orange)" />}
          description="Read how the public tracking part works, including the RFID reader flow and attendance events." />
      </section>
    </div>
  );
}

Object.assign(window, { DashboardScreen });
