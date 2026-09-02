import React from 'react';

export function HelpPanel({ title = 'About ImLate', description, uiVersion, serverVersion, links = [], style }) {
  return (
    <div style={{ fontFamily: 'var(--il-font-sans)', ...style }}>
      <h3 style={{ margin: '0 0 8px', fontSize: 'var(--il-fs-card-header)', color: 'var(--el-text-color-primary)' }}>{title}</h3>
      <p style={{ margin: '0 0 12px', fontSize: 'var(--il-fs-help)', color: 'var(--el-text-color-regular)', lineHeight: 'var(--il-lh-body)' }}>{description}</p>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 2,
        fontSize: 'var(--il-fs-meta)', color: 'var(--el-text-color-secondary)',
        marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--el-border-color-lighter)'
      }}>
        <span><b>UI version:</b> {uiVersion}</span>
        <span><b>Server:</b> {serverVersion}</span>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {links.map(l => <HelpLinkCard key={l.label} {...l} />)}
      </div>
    </div>
  );
}

function HelpLinkCard({ label, href, icon }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} target="_blank" rel="noopener"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        padding: '14px 8px', borderRadius: 8,
        border: `1px solid ${hover ? 'var(--el-color-primary)' : 'var(--el-border-color-light)'}`,
        boxShadow: hover ? 'var(--il-shadow-link-hover)' : 'none',
        textDecoration: 'none', color: 'var(--el-color-primary)',
        fontSize: 'var(--il-fs-help)', fontWeight: 'var(--el-font-weight-primary)',
        transition: 'border-color var(--il-dur-base), box-shadow var(--il-dur-base)'
      }}>
      {icon}
      <span>{label}</span>
    </a>
  );
}
