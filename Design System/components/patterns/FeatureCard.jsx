import React from 'react';

export function FeatureCard({ title, description, icon, href, target = '_blank', style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} target={target} rel="noopener"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'block', padding: 24, background: '#fff',
        border: '1px solid var(--il-navy-10)', borderRadius: 'var(--il-radius-card)',
        textDecoration: 'none', color: 'inherit',
        boxShadow: hover ? 'var(--il-shadow-feature-hover)' : 'none',
        transform: hover ? 'var(--il-lift-feature)' : 'none',
        transition: 'box-shadow var(--il-dur-slow) ease, transform var(--il-dur-slow) ease',
        fontFamily: 'var(--il-font-sans)', ...style
      }}>
      {icon && <div style={{ marginBottom: 12, display: 'flex' }}>{icon}</div>}
      <h2 style={{ margin: '0 0 8px', color: 'var(--il-navy)', fontSize: 'var(--il-fs-card-title)', fontWeight: 'var(--il-fw-semibold)' }}>{title}</h2>
      <p style={{ margin: 0, fontSize: 'var(--il-fs-body)', color: 'var(--il-text-body)', opacity: .8, lineHeight: 'var(--il-lh-body)' }}>{description}</p>
    </a>
  );
}
