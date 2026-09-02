import React from 'react';
import { Icon } from '../core/Icon.jsx';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const iso = (d) => d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` : '';
const same = (a, b) => a && b && iso(a) === iso(b);
const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);

function monthGrid(base) {
  const first = new Date(base.getFullYear(), base.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(base.getFullYear(), base.getMonth(), 1 - offset + i);
    cells.push({ date: d, outside: d.getMonth() !== base.getMonth() });
  }
  return cells;
}

export function DateRangePicker({ from, to, onChange, placeholder = 'Start date  —  End date', clearable = true, iconBase, style }) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [left, setLeft] = React.useState(() => new Date((from || new Date()).getFullYear(), (from || new Date()).getMonth(), 1));
  const [anchor, setAnchor] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const wrap = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const away = (e) => { if (wrap.current && !wrap.current.contains(e.target)) { setOpen(false); setAnchor(null); } };
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);

  const start = anchor ? (preview && preview < anchor ? preview : anchor) : from;
  const end = anchor ? (preview && preview < anchor ? anchor : preview) : to;

  const pick = (d) => {
    if (!anchor) { setAnchor(d); setPreview(d); return; }
    const a = d < anchor ? d : anchor;
    const b = d < anchor ? anchor : d;
    onChange && onChange({ from: a, to: b });
    setAnchor(null); setPreview(null); setOpen(false);
  };

  const label = from && to ? `${iso(from)}  —  ${iso(to)}` : '';

  const cell = (c) => {
    const inRange = start && end && c.date >= start && c.date <= end;
    const isEnd = same(c.date, start) || same(c.date, end);
    const today = same(c.date, new Date());
    return (
      <button key={iso(c.date)} type="button"
        onClick={() => pick(c.date)}
        onMouseEnter={() => anchor && setPreview(c.date)}
        style={{
          height: 30, border: 'none', padding: 0, cursor: 'pointer',
          background: isEnd ? 'var(--el-color-primary)' : inRange ? 'var(--el-color-primary-light-9)' : 'transparent',
          color: isEnd ? '#fff' : c.outside ? 'var(--el-text-color-placeholder)' : today ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)',
          fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-extra-small)',
          fontWeight: isEnd || today ? 700 : 400,
          borderRadius: isEnd ? 'var(--el-border-radius-base)' : 0,
          transition: 'background-color var(--il-dur-base) ease'
        }}>{c.date.getDate()}</button>
    );
  };

  const panel = (base, canNav) => (
    <div style={{ width: 224 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 30, marginBottom: 4 }}>
        {canNav === 'left'
          ? <button type="button" onClick={() => setLeft(addMonths(left, -1))} aria-label="Previous month"
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <Icon name="arrow-left" size={12} color="var(--el-text-color-secondary)" base={iconBase} />
            </button>
          : <span style={{ width: 12 }} />}
        <span style={{ fontSize: 'var(--el-font-size-base)', fontWeight: 500, color: 'var(--el-text-color-primary)' }}>
          {MONTHS[base.getMonth()]} {base.getFullYear()}
        </span>
        {canNav === 'right'
          ? <button type="button" onClick={() => setLeft(addMonths(left, 1))} aria-label="Next month"
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <Icon name="arrow-right" size={12} color="var(--el-text-color-secondary)" base={iconBase} />
            </button>
          : <span style={{ width: 12 }} />}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
        {DAYS.map(d => (
          <span key={d} style={{ height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--el-font-size-extra-small)', color: 'var(--el-text-color-secondary)' }}>{d}</span>
        ))}
        {monthGrid(base).map(cell)}
      </div>
    </div>
  );

  return (
    <div ref={wrap} style={{ position: 'relative', ...style }}>
      <div role="button" tabIndex={0}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, width: '100%',
          height: 32, padding: '1px 11px', boxSizing: 'border-box',
          background: 'var(--el-fill-color-blank)', borderRadius: 'var(--il-radius-input)',
          boxShadow: open ? 'var(--il-ring-input-focus)' : hover ? 'var(--il-ring-input-hover)' : '0 0 0 1px var(--el-border-color) inset',
          cursor: 'pointer', transition: 'all var(--il-dur-base) ease',
          fontFamily: 'var(--il-font-sans)', fontSize: 'var(--el-font-size-base)',
          color: label ? 'var(--el-text-color-regular)' : 'var(--el-text-color-placeholder)'
        }}>
        <Icon name="calendar" size={14} color="var(--el-text-color-placeholder)" base={iconBase} />
        <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label || placeholder}</span>
        {clearable && label && (
          <button type="button" aria-label="Clear range" onClick={(e) => { e.stopPropagation(); onChange && onChange({ from: null, to: null }); }}
            style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
            <Icon name="circle-close" size={14} color="var(--el-text-color-placeholder)" base={iconBase} />
          </button>
        )}
      </div>

      {open && (
        <div style={{
          position: 'absolute', zIndex: 40, top: 'calc(100% + 6px)', left: 0,
          background: 'var(--el-bg-color)', border: '1px solid var(--el-border-color-light)',
          borderRadius: 'var(--el-border-radius-base)', boxShadow: 'var(--el-box-shadow-light)',
          padding: 12, display: 'flex', gap: 16
        }}>
          {panel(left, 'left')}
          <div style={{ width: 1, background: 'var(--el-border-color-lighter)' }} />
          {panel(addMonths(left, 1), 'right')}
        </div>
      )}
    </div>
  );
}

export const DATE_PRESETS = {
  day: () => { const t = new Date(); return { from: t, to: t }; },
  week: () => { const t = new Date(); const s = new Date(t); s.setDate(t.getDate() - ((t.getDay() + 6) % 7)); const e = new Date(s); e.setDate(s.getDate() + 6); return { from: s, to: e }; },
  month: () => { const t = new Date(); return { from: new Date(t.getFullYear(), t.getMonth(), 1), to: new Date(t.getFullYear(), t.getMonth() + 1, 0) }; }
};

export const formatRange = ({ from, to }) => (from && to) ? `${iso(from)} — ${iso(to)}` : '';

/* Exposed on the component so it is reachable through the design-system namespace
   (only capitalised exports land on window.<Namespace>). */
DateRangePicker.format = formatRange;
DateRangePicker.iso = iso;
DateRangePicker.PRESETS = DATE_PRESETS;
