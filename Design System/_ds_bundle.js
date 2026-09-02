/* @ds-bundle: {"format":4,"namespace":"ImLateDesignSystem_9c9b6f","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AVATAR_PLACEHOLDER","sourcePath":"components/core/Avatar.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardSubtitle","sourcePath":"components/core/Card.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"KpiStat","sourcePath":"components/data/KpiStat.jsx"},{"name":"Legend","sourcePath":"components/data/Legend.jsx"},{"name":"MiniBar","sourcePath":"components/data/MiniBar.jsx"},{"name":"Pagination","sourcePath":"components/data/Pagination.jsx"},{"name":"PivotGrid","sourcePath":"components/data/PivotGrid.jsx"},{"name":"SkeletonItem","sourcePath":"components/data/Skeleton.jsx"},{"name":"Skeleton","sourcePath":"components/data/Skeleton.jsx"},{"name":"StatusTag","sourcePath":"components/data/StatusTag.jsx"},{"name":"SIGN_STATUS_ORDER","sourcePath":"components/data/StatusTag.jsx"},{"name":"TableToolbar","sourcePath":"components/data/TableToolbar.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"ConfirmDialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Message","sourcePath":"components/feedback/Message.jsx"},{"name":"MessageStack","sourcePath":"components/feedback/Message.jsx"},{"name":"Popover","sourcePath":"components/feedback/Popover.jsx"},{"name":"DateRangePicker","sourcePath":"components/forms/DateRangePicker.jsx"},{"name":"DATE_PRESETS","sourcePath":"components/forms/DateRangePicker.jsx"},{"name":"FileUploadRow","sourcePath":"components/forms/FileUploadRow.jsx"},{"name":"FormField","sourcePath":"components/forms/FormField.jsx"},{"name":"FormActions","sourcePath":"components/forms/FormField.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"InputNumber","sourcePath":"components/forms/InputNumber.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"PageHeader","sourcePath":"components/navigation/PageHeader.jsx"},{"name":"SectionTitle","sourcePath":"components/navigation/PageHeader.jsx"},{"name":"SidebarMenu","sourcePath":"components/navigation/SidebarMenu.jsx"},{"name":"SidebarFooterButton","sourcePath":"components/navigation/SidebarMenu.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Topbar","sourcePath":"components/navigation/Topbar.jsx"},{"name":"ActionChoiceCard","sourcePath":"components/patterns/ActionChoiceCard.jsx"},{"name":"AssetSlotCard","sourcePath":"components/patterns/AssetSlotCard.jsx"},{"name":"FeatureCard","sourcePath":"components/patterns/FeatureCard.jsx"},{"name":"FilterBar","sourcePath":"components/patterns/FilterBar.jsx"},{"name":"FilterItem","sourcePath":"components/patterns/FilterBar.jsx"},{"name":"FilterChip","sourcePath":"components/patterns/FilterChip.jsx"},{"name":"HelpPanel","sourcePath":"components/patterns/HelpPanel.jsx"},{"name":"PillButton","sourcePath":"components/patterns/PillButton.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"6de5b3232e1f","components/core/Button.jsx":"7dae53d84d56","components/core/Card.jsx":"b63fd9fb3fc8","components/core/Divider.jsx":"564ced184dff","components/core/Icon.jsx":"d4ce599dc096","components/core/Tag.jsx":"2e18e5bd195d","components/data/DataTable.jsx":"ac14cf02ede7","components/data/KpiStat.jsx":"f1e0681fc866","components/data/Legend.jsx":"d353c612dccf","components/data/MiniBar.jsx":"6b060b3949ef","components/data/Pagination.jsx":"5d18971dda04","components/data/PivotGrid.jsx":"9a97cb4e2846","components/data/Skeleton.jsx":"7ce9e27d4379","components/data/StatusTag.jsx":"1b0965a31612","components/data/TableToolbar.jsx":"7538041c4b5c","components/feedback/Dialog.jsx":"c41a898f2410","components/feedback/Message.jsx":"a3ccecec35df","components/feedback/Popover.jsx":"e4270ce2e7c5","components/forms/DateRangePicker.jsx":"87213688dc88","components/forms/FileUploadRow.jsx":"2ab90e4f9452","components/forms/FormField.jsx":"c7adeea59672","components/forms/Input.jsx":"46be790a569a","components/forms/InputNumber.jsx":"364745385a1d","components/forms/SegmentedControl.jsx":"dc9535958550","components/forms/Select.jsx":"a9f1947bcd4d","components/forms/Switch.jsx":"cfad45f206dd","components/forms/Textarea.jsx":"d456cb319c8d","components/navigation/PageHeader.jsx":"9a4d0ea04c62","components/navigation/SidebarMenu.jsx":"46f87ff6ad8a","components/navigation/Tabs.jsx":"776a37e29ae0","components/navigation/Topbar.jsx":"a4fe63ba7a33","components/patterns/ActionChoiceCard.jsx":"57dbbcb2b2e3","components/patterns/AssetSlotCard.jsx":"df36198ff50b","components/patterns/FeatureCard.jsx":"b6fffc0597f5","components/patterns/FilterBar.jsx":"bb302f317808","components/patterns/FilterChip.jsx":"58ea70eeb0a3","components/patterns/HelpPanel.jsx":"1e7633995427","components/patterns/PillButton.jsx":"f9a157bd0ee1","ui_kits/admin/AdminUsersScreen.jsx":"85b8c7e38d55","ui_kits/admin/AppShell.jsx":"5800b72cd493","ui_kits/admin/DashboardScreen.jsx":"854992107403","ui_kits/admin/LoginScreen.jsx":"c116c0dc003a","ui_kits/admin/ProfileScreen.jsx":"0fe38906ecfb","ui_kits/admin/ReportsScreen.jsx":"8061e04213f6","ui_kits/admin/SettingsScreen.jsx":"6a9e4d7b5b9a","ui_kits/admin/VisitorsScreen.jsx":"20bfcbd4c428","ui_kits/admin/data.js":"47003018b6f0"},"inlinedExternals":[],"unexposedExports":[{"name":"formatRange","sourcePath":"components/forms/DateRangePicker.jsx"}]} */

(() => {

const __ds_ns = (window.ImLateDesignSystem_9c9b6f = window.ImLateDesignSystem_9c9b6f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
const PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">' + '<rect width="80" height="80" fill="#e0e0e0" rx="40"/>' + '<text x="40" y="46" text-anchor="middle" fill="#999" font-size="11" font-family="sans-serif">No image</text>' + '</svg>');
function Avatar({
  src,
  size = 40,
  alt = '',
  style
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: src || PLACEHOLDER,
    alt: alt,
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--il-radius-avatar)',
      objectFit: 'cover',
      display: 'block',
      flex: '0 0 auto',
      ...style
    }
  });
}
const AVATAR_PLACEHOLDER = PLACEHOLDER;
Object.assign(__ds_scope, { Avatar, AVATAR_PLACEHOLDER });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const SIZES = {
  large: {
    height: 40,
    padding: '12px 19px',
    font: 'var(--el-font-size-base)'
  },
  default: {
    height: 32,
    padding: '8px 15px',
    font: 'var(--el-font-size-base)'
  },
  small: {
    height: 24,
    padding: '5px 11px',
    font: 'var(--el-font-size-extra-small)'
  }
};
const TYPES = {
  default: {
    bg: 'var(--el-fill-color-blank)',
    border: 'var(--el-border-color)',
    color: 'var(--el-text-color-regular)',
    hoverBg: 'var(--el-color-primary-light-9)',
    hoverBorder: 'var(--el-color-primary-light-7)',
    hoverColor: 'var(--el-color-primary)'
  },
  primary: {
    bg: 'var(--el-color-primary)',
    border: 'var(--el-color-primary)',
    color: '#fff',
    hoverBg: 'var(--el-color-primary-light-3)',
    hoverBorder: 'var(--el-color-primary-light-3)',
    hoverColor: '#fff'
  },
  success: {
    bg: 'var(--el-color-success)',
    border: 'var(--el-color-success)',
    color: '#fff',
    hoverBg: 'var(--el-color-success-light-3)',
    hoverBorder: 'var(--el-color-success-light-3)',
    hoverColor: '#fff'
  },
  warning: {
    bg: 'var(--el-color-warning)',
    border: 'var(--el-color-warning)',
    color: '#fff',
    hoverBg: 'var(--el-color-warning-light-3)',
    hoverBorder: 'var(--el-color-warning-light-3)',
    hoverColor: '#fff'
  },
  danger: {
    bg: 'var(--el-color-danger)',
    border: 'var(--el-color-danger)',
    color: '#fff',
    hoverBg: 'var(--el-color-danger-light-3)',
    hoverBorder: 'var(--el-color-danger-light-3)',
    hoverColor: '#fff'
  },
  info: {
    bg: 'var(--el-color-info)',
    border: 'var(--el-color-info)',
    color: '#fff',
    hoverBg: 'var(--el-color-info-light-3)',
    hoverBorder: 'var(--el-color-info-light-3)',
    hoverColor: '#fff'
  }
};
const PLAIN = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info'
};
function Button({
  type = 'default',
  size = 'default',
  plain = false,
  text = false,
  circle = false,
  round = false,
  disabled = false,
  loading = false,
  icon = null,
  onClick,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const s = SIZES[size] || SIZES.default;
  const t = TYPES[type] || TYPES.default;
  const key = PLAIN[type];
  let bg = t.bg,
    border = t.border,
    color = t.color;
  if (plain && key) {
    bg = `var(--el-color-${key}-light-9)`;
    border = `var(--el-color-${key}-light-5)`;
    color = `var(--el-color-${key})`;
    if (hover && !disabled) {
      bg = `var(--el-color-${key})`;
      border = `var(--el-color-${key})`;
      color = '#fff';
    }
  } else if (text) {
    bg = hover && !disabled ? 'var(--el-fill-color-light)' : 'transparent';
    border = 'transparent';
    color = type === 'default' ? 'var(--el-text-color-regular)' : `var(--el-color-${key || 'primary'})`;
  } else if (hover && !disabled) {
    bg = t.hoverBg;
    border = t.hoverBorder;
    color = t.hoverColor;
  }
  const iconOnly = circle || !children && icon;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled || loading,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: children ? 6 : 0,
      height: s.height,
      minWidth: iconOnly ? s.height : undefined,
      padding: iconOnly ? 0 : s.padding,
      boxSizing: 'border-box',
      fontFamily: 'var(--il-font-sans)',
      fontSize: s.font,
      fontWeight: 'var(--el-font-weight-primary)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      background: bg,
      color,
      border: `1px solid ${border}`,
      borderRadius: circle ? '50%' : round ? 'var(--il-radius-pill)' : 'var(--el-border-radius-base)',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background-color var(--il-dur-base), border-color var(--il-dur-base), color var(--il-dur-base)',
      ...style
    }
  }, loading ? /*#__PURE__*/React.createElement(Spinner, null) : icon, children);
}
function Spinner() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      animation: 'il-spin 1s linear infinite',
      display: 'inline-block'
    }
  });
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  header,
  extra,
  shadow = 'always',
  lift = false,
  bodyStyle,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const shadowed = shadow === 'always' || shadow === 'hover' && hover;
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--il-surface-card)',
      border: '1px solid var(--il-border-card)',
      borderRadius: 'var(--il-radius-card-lg)',
      boxShadow: hover && lift ? 'var(--il-shadow-card-hover)' : shadowed ? 'var(--il-shadow-card)' : 'none',
      transform: hover && lift ? 'var(--il-lift-card)' : 'none',
      transition: 'var(--il-transition-card)',
      color: 'var(--el-text-color-primary)',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--il-fs-body)',
      overflow: 'hidden',
      ...style
    }
  }, (header || extra) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      padding: '18px 20px',
      borderBottom: '1px solid var(--el-border-color-lighter)',
      fontSize: 'var(--il-fs-card-header)',
      color: 'var(--il-text-slate)'
    }
  }, /*#__PURE__*/React.createElement("div", null, header), extra), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      ...bodyStyle
    }
  }, children));
}
function CardSubtitle({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--il-text-mute)',
      marginTop: 2
    }
  }, children);
}
Object.assign(__ds_scope, { Card, CardSubtitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function Divider({
  vertical = false,
  children,
  style
}) {
  if (vertical) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-block',
        width: 1,
        height: '1em',
        margin: '0 8px',
        background: 'var(--el-border-color)',
        verticalAlign: 'middle',
        ...style
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      margin: '24px 0',
      borderTop: '1px solid var(--el-border-color)',
      ...style
    }
  }, children && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--el-bg-color)',
      padding: '0 20px',
      fontSize: 'var(--el-font-size-base)',
      fontWeight: 500,
      color: 'var(--el-text-color-primary)'
    }
  }, children));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/** Element Plus icon set, copied to assets/icons as raw SVG. */
function Icon({
  name,
  size = 16,
  color = 'currentColor',
  base = '/assets/icons',
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      background: color,
      WebkitMaskImage: `url(${base}/${name}.svg)`,
      maskImage: `url(${base}/${name}.svg)`,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      flex: '0 0 auto',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
const KEYS = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info'
};
function Tag({
  type = 'primary',
  effect = 'light',
  size = 'default',
  round = false,
  soft = false,
  children,
  style
}) {
  const key = KEYS[type] || 'primary';
  const dark = effect === 'dark';
  const height = size === 'small' ? 20 : size === 'large' ? 32 : 24;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height,
      padding: soft ? '4px 10px' : '0 9px',
      background: dark ? `var(--el-color-${key})` : `var(--el-color-${key}-light-9)`,
      border: `1px solid ${dark ? `var(--el-color-${key})` : `var(--el-color-${key}-light-8, var(--el-color-${key}-light-7))`}`,
      color: dark ? '#fff' : `var(--el-color-${key})`,
      borderRadius: round ? 'var(--il-radius-pill)' : soft ? 'var(--il-radius-tag)' : 'var(--el-border-radius-base)',
      fontFamily: 'var(--il-font-sans)',
      fontSize: size === 'small' ? 'var(--el-font-size-extra-small)' : 'var(--el-font-size-extra-small)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function DataTable({
  columns = [],
  data = [],
  rowClass,
  onRowClick,
  currentRow,
  empty = 'No data found',
  style
}) {
  const [hoverIdx, setHoverIdx] = React.useState(-1);
  const [sort, setSort] = React.useState({
    key: null,
    dir: 1
  });
  const rows = React.useMemo(() => {
    if (!sort.key) return data;
    return [...data].sort((a, b) => {
      const av = a[sort.key],
        bv = b[sort.key];
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * sort.dir;
    });
  }, [data, sort]);
  const WASH = {
    'signed-in': 'var(--il-row-signed-in)',
    'signed-out': 'var(--il-row-signed-out)',
    'not-signed': 'var(--il-row-not-signed)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--el-border-color-lighter)',
      borderRadius: 'var(--il-radius-card)',
      overflow: 'hidden',
      background: 'var(--el-bg-color)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-base)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    onClick: () => c.sortable && c.prop && setSort(s => ({
      key: c.prop,
      dir: s.key === c.prop ? -s.dir : 1
    })),
    style: {
      width: c.width,
      textAlign: c.align || 'left',
      padding: '10px 12px',
      background: 'var(--il-surface-table-head)',
      color: '#475569',
      fontWeight: 'var(--il-fw-semibold)',
      borderBottom: '1px solid var(--el-border-color-lighter)',
      borderRight: i < columns.length - 1 ? '1px solid var(--el-border-color-lighter)' : 'none',
      cursor: c.sortable ? 'pointer' : 'default',
      userSelect: 'none',
      whiteSpace: 'nowrap'
    }
  }, c.label, c.sortable && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      fontSize: 10,
      color: sort.key === c.prop ? 'var(--el-color-primary)' : 'var(--el-text-color-placeholder)'
    }
  }, sort.key === c.prop && sort.dir === -1 ? '▼' : '▲'))))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    style: {
      padding: 40,
      textAlign: 'center',
      color: 'var(--el-text-color-secondary)'
    }
  }, empty)), rows.map((row, ri) => {
    const cls = rowClass && rowClass(row);
    const wash = cls && WASH[cls];
    const active = currentRow && currentRow === row;
    return /*#__PURE__*/React.createElement("tr", {
      key: ri,
      onMouseEnter: () => setHoverIdx(ri),
      onMouseLeave: () => setHoverIdx(-1),
      onClick: () => onRowClick && onRowClick(row),
      style: {
        background: hoverIdx === ri ? 'var(--il-surface-row-hover)' : active ? 'var(--el-color-primary-light-9)' : wash || 'transparent',
        cursor: onRowClick ? 'pointer' : 'default',
        transition: 'background-color var(--il-dur-base) ease'
      }
    }, columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
      key: ci,
      style: {
        padding: '10px 12px',
        textAlign: c.align || 'left',
        color: 'var(--el-text-color-regular)',
        borderBottom: '1px solid var(--el-border-color-lighter)',
        borderRight: ci < columns.length - 1 ? '1px solid var(--el-border-color-lighter)' : 'none'
      }
    }, c.render ? c.render(row, ri) : row[c.prop])));
  }))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/KpiStat.jsx
try { (() => {
function KpiStat({
  label,
  value,
  intent = 'neutral',
  hint,
  style
}) {
  const COLORS = {
    neutral: 'var(--il-navy)',
    success: 'var(--el-color-success)',
    warning: 'var(--el-color-warning)',
    info: 'var(--el-color-info)',
    danger: 'var(--el-color-danger)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4,
      padding: '16px 20px',
      background: 'var(--il-surface-card)',
      border: '1px solid var(--il-border-card)',
      borderRadius: 'var(--il-radius-card)',
      boxShadow: 'var(--il-shadow-card)',
      fontFamily: 'var(--il-font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--il-text-mute)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--il-tracking-label)',
      fontWeight: 'var(--il-fw-semibold)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      lineHeight: 'var(--il-lh-tight)',
      fontWeight: 'var(--il-fw-bold)',
      color: COLORS[intent]
    }
  }, value), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-text-color-secondary)'
    }
  }, hint));
}
Object.assign(__ds_scope, { KpiStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KpiStat.jsx", error: String((e && e.message) || e) }); }

// components/data/Legend.jsx
try { (() => {
function Legend({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      flexWrap: 'wrap',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-text-color-secondary)',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: it.dot ? 8 : 16,
      height: it.dot ? 8 : 14,
      flex: '0 0 auto',
      borderRadius: it.dot ? '50%' : 3,
      background: it.swatch || 'transparent',
      border: it.border ? `1px solid ${it.border}` : it.dot ? 'none' : '1px solid var(--el-border-color-light)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--el-text-color-regular)'
    }
  }, it.label), it.hint && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--el-text-color-placeholder)'
    }
  }, it.hint))));
}
Object.assign(__ds_scope, { Legend });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Legend.jsx", error: String((e && e.message) || e) }); }

// components/data/MiniBar.jsx
try { (() => {
const COLORS = {
  success: 'var(--el-color-success)',
  warning: 'var(--el-color-warning)',
  danger: 'var(--el-color-danger)',
  info: 'var(--el-color-info)',
  primary: 'var(--el-color-primary)'
};
function MiniBar({
  value = 0,
  max = 100,
  intent = 'success',
  label,
  width = 96,
  style
}) {
  const pct = max > 0 ? Math.max(0, Math.min(100, value / max * 100)) : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--il-font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width,
      height: 6,
      background: 'var(--el-border-color-lighter)',
      borderRadius: 3,
      overflow: 'hidden',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: pct + '%',
      height: '100%',
      background: COLORS[intent] || COLORS.success,
      borderRadius: 3
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-text-color-secondary)',
      whiteSpace: 'nowrap'
    }
  }, label));
}
Object.assign(__ds_scope, { MiniBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MiniBar.jsx", error: String((e && e.message) || e) }); }

// components/data/Pagination.jsx
try { (() => {
function Pagination({
  page = 1,
  pageSize = 20,
  total = 0,
  onChange,
  iconBase,
  style
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const window0 = [];
  const start = Math.max(1, Math.min(page - 2, pages - 4));
  for (let i = start; i < start + 5 && i <= pages; i++) window0.push(i);
  const cell = (content, opts = {}) => /*#__PURE__*/React.createElement("button", {
    key: opts.key,
    type: "button",
    disabled: opts.disabled,
    onClick: opts.onClick,
    style: {
      minWidth: 32,
      height: 32,
      padding: '0 4px',
      border: 'none',
      borderRadius: 'var(--el-border-radius-base)',
      background: opts.active ? 'var(--el-color-primary)' : 'var(--el-fill-color-light)',
      color: opts.active ? '#fff' : opts.disabled ? 'var(--el-text-color-disabled)' : 'var(--el-text-color-regular)',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-base)',
      fontWeight: opts.active ? 700 : 400,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: opts.disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color var(--il-dur-base) ease'
    }
  }, content);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      ...style
    }
  }, cell(/*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-left",
    size: 12,
    base: iconBase
  }), {
    key: 'prev',
    disabled: page <= 1,
    onClick: () => onChange && onChange(page - 1)
  }), window0.map(p => cell(p, {
    key: p,
    active: p === page,
    onClick: () => onChange && onChange(p)
  })), cell(/*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 12,
    base: iconBase
  }), {
    key: 'next',
    disabled: page >= pages,
    onClick: () => onChange && onChange(page + 1)
  }));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/data/PivotGrid.jsx
try { (() => {
function PivotGrid({
  rows = [],
  rowKey = (r, i) => i,
  fixed = [],
  columns = [],
  columnWidth = 62,
  renderCell,
  totalColumn,
  footer,
  empty = 'No data found',
  maxHeight,
  style
}) {
  const [hover, setHover] = React.useState(-1);
  const [sort, setSort] = React.useState({
    index: null,
    dir: 1
  });
  const offsets = [];
  let run = 0;
  fixed.forEach(c => {
    offsets.push(run);
    run += c.width || 120;
  });
  const fixedWidth = run;
  const sorted = React.useMemo(() => {
    const col = sort.index != null ? fixed[sort.index] : null;
    if (!col || !col.sortValue) return rows;
    return [...rows].sort((a, b) => {
      const av = col.sortValue(a),
        bv = col.sortValue(b);
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * sort.dir;
    });
  }, [rows, sort, fixed]);
  const bgFor = ri => hover === ri ? 'var(--il-surface-row-hover)' : 'var(--el-bg-color)';
  const fixedCell = (c, i, content, opts = {}) => /*#__PURE__*/React.createElement("td", {
    key: 'f' + i,
    style: {
      position: 'sticky',
      left: offsets[i],
      zIndex: 2,
      width: c.width,
      minWidth: c.width,
      maxWidth: c.width,
      padding: '0 10px',
      height: 38,
      boxSizing: 'border-box',
      textAlign: c.align || 'left',
      background: opts.background || bgFor(opts.ri),
      color: 'var(--el-text-color-regular)',
      borderBottom: '1px solid var(--el-border-color-lighter)',
      borderRight: i === fixed.length - 1 ? '1px solid var(--el-border-color)' : 'none',
      boxShadow: i === fixed.length - 1 ? 'var(--il-shadow-sticky-left)' : 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'background-color var(--il-dur-base) ease'
    }
  }, content);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'auto',
      maxHeight,
      border: '1px solid var(--el-border-color-lighter)',
      borderRadius: 'var(--il-radius-card)',
      background: 'var(--el-bg-color)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: 'separate',
      borderSpacing: 0,
      tableLayout: 'fixed',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-base)',
      minWidth: fixedWidth + columns.length * columnWidth + (totalColumn ? totalColumn.width || 84 : 0)
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, fixed.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: 'h' + i,
    onClick: () => c.sortValue && setSort(s => ({
      index: i,
      dir: s.index === i ? -s.dir : 1
    })),
    style: {
      position: 'sticky',
      left: offsets[i],
      top: 0,
      zIndex: 4,
      width: c.width,
      minWidth: c.width,
      maxWidth: c.width,
      padding: '0 10px',
      height: 46,
      boxSizing: 'border-box',
      textAlign: c.align || 'left',
      verticalAlign: 'middle',
      background: 'var(--il-surface-table-head)',
      color: '#475569',
      fontWeight: 'var(--il-fw-semibold)',
      borderBottom: '1px solid var(--el-border-color-lighter)',
      borderRight: i === fixed.length - 1 ? '1px solid var(--el-border-color)' : 'none',
      boxShadow: i === fixed.length - 1 ? 'var(--il-shadow-sticky-left)' : 'none',
      cursor: c.sortValue ? 'pointer' : 'default',
      userSelect: 'none',
      whiteSpace: 'nowrap'
    }
  }, c.label, c.sortValue && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      fontSize: 10,
      color: sort.index === i ? 'var(--el-color-primary)' : 'var(--el-text-color-placeholder)'
    }
  }, sort.index === i && sort.dir === -1 ? '▼' : '▲'))), columns.map(col => /*#__PURE__*/React.createElement("th", {
    key: col.key,
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 3,
      width: columnWidth,
      minWidth: columnWidth,
      padding: '4px 2px',
      height: 46,
      boxSizing: 'border-box',
      textAlign: 'center',
      verticalAlign: 'middle',
      background: col.muted ? 'var(--el-fill-color-lighter)' : 'var(--il-surface-table-head)',
      borderBottom: '1px solid var(--el-border-color-lighter)',
      borderRight: '1px solid var(--el-border-color-lighter)',
      fontWeight: 'var(--il-fw-regular)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--el-text-color-secondary)',
      lineHeight: 1.3
    }
  }, col.top), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: col.muted ? 'var(--el-text-color-secondary)' : '#475569',
      lineHeight: 1.3
    }
  }, col.label))), totalColumn && /*#__PURE__*/React.createElement("th", {
    style: {
      position: 'sticky',
      right: 0,
      top: 0,
      zIndex: 4,
      width: totalColumn.width || 84,
      minWidth: totalColumn.width || 84,
      padding: '0 10px',
      height: 46,
      boxSizing: 'border-box',
      textAlign: 'right',
      background: 'var(--il-surface-table-head)',
      color: '#475569',
      fontWeight: 'var(--il-fw-semibold)',
      borderBottom: '1px solid var(--el-border-color-lighter)',
      borderLeft: '1px solid var(--el-border-color)',
      boxShadow: 'var(--il-shadow-sticky-right)',
      whiteSpace: 'nowrap'
    }
  }, totalColumn.label))), /*#__PURE__*/React.createElement("tbody", null, sorted.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: fixed.length + columns.length + (totalColumn ? 1 : 0),
    style: {
      padding: 40,
      textAlign: 'center',
      color: 'var(--el-text-color-secondary)'
    }
  }, empty)), sorted.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
    key: rowKey(row, ri),
    onMouseEnter: () => setHover(ri),
    onMouseLeave: () => setHover(-1)
  }, fixed.map((c, i) => fixedCell(c, i, c.render ? c.render(row, ri) : row[c.prop], {
    ri
  })), columns.map(col => {
    const out = renderCell ? renderCell(row, col) : null;
    const node = out && out.content !== undefined ? out.content : out;
    const tint = out && out.tint;
    return /*#__PURE__*/React.createElement("td", {
      key: col.key,
      title: out && out.title,
      style: {
        width: columnWidth,
        minWidth: columnWidth,
        height: 38,
        padding: '0 4px',
        boxSizing: 'border-box',
        textAlign: 'center',
        background: tint || (col.muted ? 'var(--el-fill-color-lighter)' : 'transparent'),
        borderBottom: '1px solid var(--el-border-color-lighter)',
        borderRight: '1px solid var(--el-border-color-lighter)',
        color: 'var(--el-text-color-regular)',
        fontSize: 'var(--el-font-size-extra-small)'
      }
    }, node);
  }), totalColumn && /*#__PURE__*/React.createElement("td", {
    style: {
      position: 'sticky',
      right: 0,
      zIndex: 2,
      width: totalColumn.width || 84,
      minWidth: totalColumn.width || 84,
      padding: '0 10px',
      height: 38,
      boxSizing: 'border-box',
      textAlign: 'right',
      background: bgFor(ri),
      color: 'var(--el-text-color-primary)',
      fontWeight: 600,
      borderBottom: '1px solid var(--el-border-color-lighter)',
      borderLeft: '1px solid var(--el-border-color)',
      boxShadow: 'var(--il-shadow-sticky-right)',
      transition: 'background-color var(--il-dur-base) ease'
    }
  }, totalColumn.render(row))))), footer && sorted.length > 0 && /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", null, fixed.map((c, i) => fixedCell(c, i, i === 0 ? '' : footer.label, {
    ri: -2,
    background: 'var(--il-surface-table-head)'
  })), columns.map(col => /*#__PURE__*/React.createElement("td", {
    key: col.key,
    style: {
      width: columnWidth,
      minWidth: columnWidth,
      height: 38,
      padding: '0 4px',
      boxSizing: 'border-box',
      textAlign: 'center',
      background: 'var(--il-surface-table-head)',
      color: 'var(--el-text-color-primary)',
      fontWeight: 600,
      fontSize: 'var(--el-font-size-extra-small)',
      borderTop: '1px solid var(--el-border-color)',
      borderRight: '1px solid var(--el-border-color-lighter)'
    }
  }, footer.render(col, sorted))), totalColumn && /*#__PURE__*/React.createElement("td", {
    style: {
      position: 'sticky',
      right: 0,
      zIndex: 2,
      width: totalColumn.width || 84,
      minWidth: totalColumn.width || 84,
      padding: '0 10px',
      height: 38,
      boxSizing: 'border-box',
      textAlign: 'right',
      background: 'var(--il-surface-table-head)',
      color: 'var(--el-text-color-primary)',
      fontWeight: 700,
      borderTop: '1px solid var(--el-border-color)',
      borderLeft: '1px solid var(--el-border-color)',
      boxShadow: 'var(--il-shadow-sticky-right)'
    }
  }, footer.total ? footer.total(sorted) : '')))));
}
Object.assign(__ds_scope, { PivotGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/PivotGrid.jsx", error: String((e && e.message) || e) }); }

// components/data/Skeleton.jsx
try { (() => {
function SkeletonItem({
  variant = 'text',
  width,
  height,
  style
}) {
  const h = height || (variant === 'h3' ? 20 : variant === 'rect' ? 32 : 16);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: width || '100%',
      height: h,
      background: 'var(--el-fill-color, #f2f2f2)',
      borderRadius: variant === 'circle' ? '50%' : 'var(--el-border-radius-base)',
      backgroundImage: 'linear-gradient(90deg,#f2f2f2 25%,#e6e6e6 37%,#f2f2f2 63%)',
      backgroundSize: '400% 100%',
      animation: 'il-skeleton 1.4s ease infinite',
      ...style
    }
  });
}
function Skeleton({
  rows = 4,
  columns,
  style
}) {
  if (columns) {
    return /*#__PURE__*/React.createElement("div", {
      style: style
    }, Array.from({
      length: rows
    }).map((_, r) => /*#__PURE__*/React.createElement("div", {
      key: r,
      style: {
        display: 'flex',
        gap: 12,
        padding: 12
      }
    }, columns.map((w, c) => /*#__PURE__*/React.createElement(SkeletonItem, {
      key: c,
      width: w
    })))));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      ...style
    }
  }, Array.from({
    length: rows
  }).map((_, r) => /*#__PURE__*/React.createElement(SkeletonItem, {
    key: r,
    width: r === rows - 1 ? '60%' : '100%'
  })));
}
Object.assign(__ds_scope, { SkeletonItem, Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusTag.jsx
try { (() => {
const MAP = {
  signed_in: {
    type: 'success',
    text: 'Signed in'
  },
  signed_out: {
    type: 'warning',
    text: 'Signed out'
  },
  not_signed: {
    type: 'info',
    text: 'Not signed'
  }
};
function StatusTag({
  status,
  soft = false
}) {
  const m = MAP[status] || MAP.not_signed;
  return /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    type: m.type,
    soft: soft
  }, m.text);
}
const SIGN_STATUS_ORDER = {
  signed_in: 1,
  signed_out: 2,
  not_signed: 3
};
Object.assign(__ds_scope, { StatusTag, SIGN_STATUS_ORDER });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusTag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  width = 560,
  onClose,
  footer,
  iconBase,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(0,0,0,.5)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      maxWidth: 'calc(100vw - 32px)',
      marginTop: '15vh',
      background: 'var(--el-bg-color)',
      borderRadius: 'var(--el-border-radius-base)',
      boxShadow: 'var(--el-box-shadow)',
      fontFamily: 'var(--il-font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 16px 10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--el-font-size-medium)',
      color: 'var(--el-text-color-primary)',
      lineHeight: 1.5
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 16,
    color: "var(--el-text-color-placeholder)",
    base: iconBase
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontSize: 'var(--el-font-size-base)',
      color: 'var(--el-text-color-regular)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      padding: '20px 16px 16px'
    }
  }, footer)));
}
function ConfirmDialog({
  open,
  title = 'Confirm',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  intent = 'warning',
  onConfirm,
  onCancel,
  iconBase
}) {
  const ICONS = {
    warning: 'warning-filled',
    danger: 'circle-close-filled',
    info: 'info-filled',
    success: 'success-filled'
  };
  const COLORS = {
    warning: 'var(--el-color-warning)',
    danger: 'var(--el-color-danger)',
    info: 'var(--el-color-info)',
    success: 'var(--el-color-success)'
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 2001,
      background: 'rgba(0,0,0,.5)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      marginTop: '15vh',
      background: 'var(--el-bg-color)',
      borderRadius: 'var(--el-border-radius-base)',
      boxShadow: 'var(--el-box-shadow)',
      padding: '16px',
      fontFamily: 'var(--il-font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--el-font-size-medium)',
      color: 'var(--el-text-color-primary)',
      marginBottom: 10
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'flex-start',
      fontSize: 'var(--el-font-size-base)',
      color: 'var(--el-text-color-regular)',
      lineHeight: 'var(--il-lh-body)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ICONS[intent],
    size: 18,
    color: COLORS[intent],
    base: iconBase
  }), /*#__PURE__*/React.createElement("span", null, message)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCancel,
    style: btn(false)
  }, cancelLabel), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onConfirm,
    style: btn(true)
  }, confirmLabel))));
}
const btn = primary => ({
  height: 32,
  padding: '8px 15px',
  boxSizing: 'border-box',
  background: primary ? 'var(--el-color-primary)' : '#fff',
  border: `1px solid ${primary ? 'var(--el-color-primary)' : 'var(--el-border-color)'}`,
  color: primary ? '#fff' : 'var(--el-text-color-regular)',
  borderRadius: 'var(--el-border-radius-base)',
  cursor: 'pointer',
  fontFamily: 'var(--il-font-sans)',
  fontSize: 'var(--el-font-size-base)',
  fontWeight: 500,
  lineHeight: 1
});
Object.assign(__ds_scope, { Dialog, ConfirmDialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Message.jsx
try { (() => {
const KEYS = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info'
};
const ICONS = {
  success: 'success-filled',
  warning: 'warning-filled',
  error: 'circle-close-filled',
  info: 'info-filled'
};
function Message({
  type = 'info',
  children,
  onClose,
  iconBase,
  style
}) {
  const key = KEYS[type] || 'info';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minWidth: 380,
      boxSizing: 'border-box',
      padding: '11px 15px',
      background: `var(--el-color-${key}-light-9)`,
      border: `1px solid var(--el-color-${key}-light-8, var(--el-color-${key}-light-7))`,
      borderRadius: 'var(--el-border-radius-base)',
      boxShadow: 'var(--el-box-shadow-light)',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-base)',
      color: `var(--el-color-${key})`,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ICONS[type],
    size: 16,
    color: `var(--el-color-${key})`,
    base: iconBase
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 14,
    color: "var(--el-text-color-placeholder)",
    base: iconBase
  })));
}
function MessageStack({
  messages = [],
  iconBase
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 3000,
      display: 'grid',
      gap: 16
    }
  }, messages.map(m => /*#__PURE__*/React.createElement(Message, {
    key: m.id,
    type: m.type,
    iconBase: iconBase
  }, m.text)));
}
Object.assign(__ds_scope, { Message, MessageStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Message.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Popover.jsx
try { (() => {
function Popover({
  open,
  width = 320,
  placement = 'right-end',
  children,
  content,
  style
}) {
  const [uncontrolled, setUncontrolled] = React.useState(false);
  const isOpen = open != null ? open : uncontrolled;
  const pos = placement.startsWith('right') ? {
    left: '100%',
    bottom: 0,
    marginLeft: 12
  } : {
    left: 0,
    top: '100%',
    marginTop: 12
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => open == null && setUncontrolled(!uncontrolled),
    style: {
      display: 'contents'
    }
  }, children), isOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      ...pos,
      width,
      zIndex: 100,
      boxSizing: 'border-box',
      background: 'var(--el-bg-color-overlay, #fff)',
      backdropFilter: 'blur(2px)',
      border: '1px solid var(--el-border-color-light)',
      borderRadius: 'var(--el-border-radius-base)',
      boxShadow: 'var(--el-box-shadow-light)',
      padding: 12,
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-base)',
      color: 'var(--el-text-color-regular)'
    }
  }, content));
}
Object.assign(__ds_scope, { Popover });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Popover.jsx", error: String((e && e.message) || e) }); }

// components/forms/DateRangePicker.jsx
try { (() => {
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const iso = d => d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` : '';
const same = (a, b) => a && b && iso(a) === iso(b);
const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);
function monthGrid(base) {
  const first = new Date(base.getFullYear(), base.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(base.getFullYear(), base.getMonth(), 1 - offset + i);
    cells.push({
      date: d,
      outside: d.getMonth() !== base.getMonth()
    });
  }
  return cells;
}
function DateRangePicker({
  from,
  to,
  onChange,
  placeholder = 'Start date  —  End date',
  clearable = true,
  iconBase,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [left, setLeft] = React.useState(() => new Date((from || new Date()).getFullYear(), (from || new Date()).getMonth(), 1));
  const [anchor, setAnchor] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const wrap = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const away = e => {
      if (wrap.current && !wrap.current.contains(e.target)) {
        setOpen(false);
        setAnchor(null);
      }
    };
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);
  const start = anchor ? preview && preview < anchor ? preview : anchor : from;
  const end = anchor ? preview && preview < anchor ? anchor : preview : to;
  const pick = d => {
    if (!anchor) {
      setAnchor(d);
      setPreview(d);
      return;
    }
    const a = d < anchor ? d : anchor;
    const b = d < anchor ? anchor : d;
    onChange && onChange({
      from: a,
      to: b
    });
    setAnchor(null);
    setPreview(null);
    setOpen(false);
  };
  const label = from && to ? `${iso(from)}  —  ${iso(to)}` : '';
  const cell = c => {
    const inRange = start && end && c.date >= start && c.date <= end;
    const isEnd = same(c.date, start) || same(c.date, end);
    const today = same(c.date, new Date());
    return /*#__PURE__*/React.createElement("button", {
      key: iso(c.date),
      type: "button",
      onClick: () => pick(c.date),
      onMouseEnter: () => anchor && setPreview(c.date),
      style: {
        height: 30,
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        background: isEnd ? 'var(--el-color-primary)' : inRange ? 'var(--el-color-primary-light-9)' : 'transparent',
        color: isEnd ? '#fff' : c.outside ? 'var(--el-text-color-placeholder)' : today ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)',
        fontFamily: 'var(--il-font-sans)',
        fontSize: 'var(--el-font-size-extra-small)',
        fontWeight: isEnd || today ? 700 : 400,
        borderRadius: isEnd ? 'var(--el-border-radius-base)' : 0,
        transition: 'background-color var(--il-dur-base) ease'
      }
    }, c.date.getDate());
  };
  const panel = (base, canNav) => /*#__PURE__*/React.createElement("div", {
    style: {
      width: 224
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 30,
      marginBottom: 4
    }
  }, canNav === 'left' ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setLeft(addMonths(left, -1)),
    "aria-label": "Previous month",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-left",
    size: 12,
    color: "var(--el-text-color-secondary)",
    base: iconBase
  })) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--el-font-size-base)',
      fontWeight: 500,
      color: 'var(--el-text-color-primary)'
    }
  }, MONTHS[base.getMonth()], " ", base.getFullYear()), canNav === 'right' ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setLeft(addMonths(left, 1)),
    "aria-label": "Next month",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 12,
    color: "var(--el-text-color-secondary)",
    base: iconBase
  })) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)'
    }
  }, DAYS.map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      height: 26,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'var(--el-font-size-extra-small)',
      color: 'var(--el-text-color-secondary)'
    }
  }, d)), monthGrid(base).map(cell)));
  return /*#__PURE__*/React.createElement("div", {
    ref: wrap,
    style: {
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: 0,
    onClick: () => setOpen(!open),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: '100%',
      height: 32,
      padding: '1px 11px',
      boxSizing: 'border-box',
      background: 'var(--el-fill-color-blank)',
      borderRadius: 'var(--il-radius-input)',
      boxShadow: open ? 'var(--il-ring-input-focus)' : hover ? 'var(--il-ring-input-hover)' : '0 0 0 1px var(--el-border-color) inset',
      cursor: 'pointer',
      transition: 'all var(--il-dur-base) ease',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-base)',
      color: label ? 'var(--el-text-color-regular)' : 'var(--el-text-color-placeholder)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "calendar",
    size: 14,
    color: "var(--el-text-color-placeholder)",
    base: iconBase
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, label || placeholder), clearable && label && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Clear range",
    onClick: e => {
      e.stopPropagation();
      onChange && onChange({
        from: null,
        to: null
      });
    },
    style: {
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-close",
    size: 14,
    color: "var(--el-text-color-placeholder)",
    base: iconBase
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      zIndex: 40,
      top: 'calc(100% + 6px)',
      left: 0,
      background: 'var(--el-bg-color)',
      border: '1px solid var(--el-border-color-light)',
      borderRadius: 'var(--el-border-radius-base)',
      boxShadow: 'var(--el-box-shadow-light)',
      padding: 12,
      display: 'flex',
      gap: 16
    }
  }, panel(left, 'left'), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: 'var(--el-border-color-lighter)'
    }
  }), panel(addMonths(left, 1), 'right')));
}
const DATE_PRESETS = {
  day: () => {
    const t = new Date();
    return {
      from: t,
      to: t
    };
  },
  week: () => {
    const t = new Date();
    const s = new Date(t);
    s.setDate(t.getDate() - (t.getDay() + 6) % 7);
    const e = new Date(s);
    e.setDate(s.getDate() + 6);
    return {
      from: s,
      to: e
    };
  },
  month: () => {
    const t = new Date();
    return {
      from: new Date(t.getFullYear(), t.getMonth(), 1),
      to: new Date(t.getFullYear(), t.getMonth() + 1, 0)
    };
  }
};
const formatRange = ({
  from,
  to
}) => from && to ? `${iso(from)} — ${iso(to)}` : '';

/* Exposed on the component so it is reachable through the design-system namespace
   (only capitalised exports land on window.<Namespace>). */
DateRangePicker.format = formatRange;
DateRangePicker.iso = iso;
DateRangePicker.PRESETS = DATE_PRESETS;
Object.assign(__ds_scope, { DateRangePicker, DATE_PRESETS, formatRange });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DateRangePicker.jsx", error: String((e && e.message) || e) }); }

// components/forms/FileUploadRow.jsx
try { (() => {
function FileUploadRow({
  fileName,
  uploading = false,
  onChoose,
  onUpload,
  chooseLabel = 'Choose Image',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "small",
    onClick: onChoose
  }, chooseLabel), fileName && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "small",
    type: "primary",
    loading: uploading,
    onClick: onUpload
  }, "Upload"), fileName && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--il-fs-meta)',
      color: '#666'
    }
  }, fileName));
}
Object.assign(__ds_scope, { FileUploadRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FileUploadRow.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormField.jsx
try { (() => {
function FormField({
  label,
  required = false,
  error,
  help,
  labelPosition = 'left',
  labelWidth = 'var(--il-form-label-width)',
  children,
  style
}) {
  const top = labelPosition === 'top';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: top ? 'column' : 'row',
      alignItems: top ? 'stretch' : 'flex-start',
      gap: top ? 8 : 12,
      marginBottom: 18,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      width: top ? 'auto' : labelWidth,
      flex: top ? undefined : '0 0 auto',
      paddingTop: top ? 0 : 6,
      boxSizing: 'border-box',
      paddingRight: top ? 0 : 12,
      textAlign: top ? 'left' : 'right',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-base)',
      lineHeight: top ? 1.4 : 1.2,
      color: 'var(--el-text-color-regular)'
    }
  }, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--el-color-danger)',
      marginRight: 4
    }
  }, "*"), label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, children, help && !error && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-text-color-secondary)',
      lineHeight: 'var(--il-lh-body)'
    }
  }, help), error && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-color-danger)',
      lineHeight: 1
    }
  }, error)));
}
function FormActions({
  labelWidth = 'var(--il-form-label-width)',
  inline = true,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      paddingLeft: inline ? labelWidth : 0
    }
  }, children);
}
Object.assign(__ds_scope, { FormField, FormActions });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  size = 'default',
  disabled = false,
  clearable = false,
  showPassword = false,
  prefixIcon,
  suffixIcon,
  iconBase,
  style,
  wrapperStyle
}) {
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [reveal, setReveal] = React.useState(false);
  const height = size === 'small' ? 24 : size === 'large' ? 40 : 32;
  const ring = disabled ? '0 0 0 1px var(--el-border-color-light) inset' : focus ? 'var(--il-ring-input-focus)' : hover ? 'var(--il-ring-input-hover)' : '0 0 0 1px var(--el-border-color) inset';
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      width: '100%',
      height,
      padding: '1px 11px',
      boxSizing: 'border-box',
      background: disabled ? 'var(--el-fill-color-light)' : 'var(--el-fill-color-blank)',
      borderRadius: 'var(--il-radius-input)',
      boxShadow: ring,
      transition: 'all var(--il-dur-base) ease',
      ...wrapperStyle
    }
  }, prefixIcon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: prefixIcon,
    size: 14,
    color: "var(--el-text-color-placeholder)",
    base: iconBase
  }), /*#__PURE__*/React.createElement("input", {
    type: showPassword && !reveal ? 'password' : type === 'password' && !reveal ? 'password' : type,
    value: value ?? '',
    placeholder: placeholder,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-base)',
      color: disabled ? 'var(--el-text-color-placeholder)' : 'var(--el-text-color-regular)',
      cursor: disabled ? 'not-allowed' : 'text',
      ...style
    }
  }), clearable && value && !disabled && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onChange && onChange(''),
    "aria-label": "Clear",
    style: {
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-close",
    size: 14,
    color: "var(--el-text-color-placeholder)",
    base: iconBase
  })), (showPassword || type === 'password') && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setReveal(!reveal),
    "aria-label": "Toggle password",
    style: {
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: reveal ? 'view' : 'hide',
    size: 14,
    color: "var(--el-text-color-placeholder)",
    base: iconBase
  })), suffixIcon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: suffixIcon,
    size: 14,
    color: "var(--el-text-color-placeholder)",
    base: iconBase
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/data/TableToolbar.jsx
try { (() => {
function TableToolbar({
  query,
  onQueryChange,
  placeholder = 'Search within results',
  count,
  countLabel = 'rows',
  actions,
  onExportCsv,
  onExportPdf,
  iconBase,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap',
      padding: '10px 12px',
      borderBottom: '1px solid var(--el-border-color-lighter)',
      fontFamily: 'var(--il-font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    value: query,
    onChange: onQueryChange,
    placeholder: placeholder,
    prefixIcon: "search",
    clearable: true,
    iconBase: iconBase
  })), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-text-color-secondary)'
    }
  }, count, " ", countLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), actions, onExportCsv && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "small",
    onClick: onExportCsv,
    icon: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "download",
      size: 12,
      base: iconBase
    })
  }, "CSV"), onExportPdf && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "small",
    onClick: onExportPdf,
    icon: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "document",
      size: 12,
      base: iconBase
    })
  }, "PDF"));
}
Object.assign(__ds_scope, { TableToolbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TableToolbar.jsx", error: String((e && e.message) || e) }); }

// components/forms/InputNumber.jsx
try { (() => {
function InputNumber({
  value = 0,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision,
  disabled = false,
  iconBase,
  style
}) {
  const set = next => {
    let v = Math.min(max, Math.max(min, next));
    if (precision != null) v = Number(v.toFixed(precision));
    onChange && onChange(v);
  };
  const btn = (dir, name) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => set(Number(value) + dir * step),
    "aria-label": dir > 0 ? 'Increase' : 'Decrease',
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--el-fill-color-light)',
      border: 'none',
      borderLeft: '1px solid var(--el-border-color)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: 10,
    color: "var(--el-text-color-secondary)",
    base: iconBase
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'stretch',
      width: '100%',
      height: 32,
      boxSizing: 'border-box',
      background: 'var(--el-fill-color-blank)',
      borderRadius: 'var(--il-radius-input)',
      boxShadow: '0 0 0 1px var(--el-border-color) inset',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    disabled: disabled,
    onChange: e => set(Number(e.target.value)),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: '0 11px',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-base)',
      color: 'var(--el-text-color-regular)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: 26
    }
  }, btn(1, 'caret-top'), btn(-1, 'caret-bottom')));
}
Object.assign(__ds_scope, { InputNumber });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/InputNumber.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function SegmentedControl({
  value,
  onChange,
  options = [],
  size = 'default',
  disabled = false,
  style
}) {
  const [hover, setHover] = React.useState(null);
  const height = size === 'small' ? 24 : size === 'large' ? 40 : 32;
  const pad = size === 'small' ? '0 11px' : '0 15px';
  const font = size === 'small' ? 'var(--el-font-size-extra-small)' : 'var(--el-font-size-base)';
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: 'inline-flex',
      ...style
    }
  }, options.map((o, i) => {
    const active = o.value === value;
    const first = i === 0,
      last = i === options.length - 1;
    return /*#__PURE__*/React.createElement("button", {
      key: String(o.value),
      type: "button",
      role: "radio",
      "aria-checked": active,
      disabled: disabled,
      onClick: () => !disabled && onChange && onChange(o.value),
      onMouseEnter: () => setHover(o.value),
      onMouseLeave: () => setHover(null),
      style: {
        height,
        padding: pad,
        boxSizing: 'border-box',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        background: active ? 'var(--el-color-primary)' : 'var(--el-fill-color-blank)',
        color: active ? '#fff' : hover === o.value && !disabled ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)',
        borderStyle: 'solid',
        borderColor: active ? 'var(--el-color-primary)' : 'var(--el-border-color)',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: first ? 1 : 0,
        borderRadius: first ? 'var(--el-border-radius-base) 0 0 var(--el-border-radius-base)' : last ? '0 var(--el-border-radius-base) var(--el-border-radius-base) 0' : 0,
        fontFamily: 'var(--il-font-sans)',
        fontSize: font,
        fontWeight: 'var(--el-font-weight-primary)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background-color var(--il-dur-base) ease, color var(--il-dur-base) ease, border-color var(--il-dur-base) ease'
      }
    }, o.icon, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  value,
  onChange,
  options = [],
  placeholder = 'Select',
  multiple = false,
  disabled = false,
  clearable = false,
  iconBase,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const selected = multiple ? value || [] : value;
  const label = multiple ? null : (options.find(o => o.value === value) || {}).label;
  const pick = v => {
    if (multiple) {
      const next = (value || []).includes(v) ? value.filter(x => x !== v) : [...(value || []), v];
      onChange && onChange(next);
    } else {
      onChange && onChange(v);
      setOpen(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: disabled ? -1 : 0,
    onClick: () => !disabled && setOpen(!open),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap',
      minHeight: 32,
      padding: multiple && selected.length ? '3px 11px' : '1px 11px',
      boxSizing: 'border-box',
      background: disabled ? 'var(--el-fill-color-light)' : 'var(--el-fill-color-blank)',
      borderRadius: 'var(--il-radius-input)',
      boxShadow: open ? 'var(--il-ring-input-focus)' : hover && !disabled ? 'var(--il-ring-input-hover)' : '0 0 0 1px var(--el-border-color) inset',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all var(--il-dur-base) ease',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-base)',
      color: (multiple ? selected.length : value != null && value !== '') ? 'var(--el-text-color-regular)' : 'var(--el-text-color-placeholder)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      alignItems: 'center',
      minWidth: 0
    }
  }, multiple ? selected.length ? selected.map(v => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: v,
    type: "info",
    size: "small"
  }, (options.find(o => o.value === v) || {}).label)) : placeholder : label || placeholder), clearable && !multiple && value != null && value !== '' && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Clear",
    onClick: e => {
      e.stopPropagation();
      onChange && onChange(null);
    },
    style: {
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-close",
    size: 14,
    color: "var(--el-text-color-placeholder)",
    base: iconBase
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-down",
    size: 14,
    color: "var(--el-text-color-placeholder)",
    base: iconBase,
    style: {
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--il-dur-base) ease'
    }
  })), open && /*#__PURE__*/React.createElement("ul", {
    style: {
      position: 'absolute',
      zIndex: 20,
      top: 'calc(100% + 6px)',
      left: 0,
      right: 0,
      margin: 0,
      listStyle: 'none',
      padding: '6px 0',
      maxHeight: 274,
      overflowY: 'auto',
      background: 'var(--el-bg-color-overlay, #fff)',
      backdropFilter: 'blur(2px)',
      border: '1px solid var(--el-border-color-light)',
      borderRadius: 'var(--el-border-radius-base)',
      boxShadow: 'var(--el-box-shadow-light)'
    }
  }, options.map(o => {
    const active = multiple ? selected.includes(o.value) : o.value === value;
    return /*#__PURE__*/React.createElement("li", {
      key: String(o.value),
      onClick: () => pick(o.value),
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px 0 20px',
        height: 34,
        lineHeight: '34px',
        fontSize: 'var(--el-font-size-base)',
        fontWeight: active ? 700 : 400,
        color: active ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)',
        background: 'transparent',
        cursor: 'pointer'
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = 'var(--el-fill-color-light)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = 'transparent';
      }
    }, o.label, active && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 12,
      color: "var(--el-color-primary)",
      base: iconBase
    }));
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked = false,
  onChange,
  disabled = false,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      position: 'relative',
      width: 40,
      height: 20,
      padding: 0,
      flex: '0 0 auto',
      border: 'none',
      borderRadius: 10,
      background: checked ? 'var(--el-color-primary)' : 'var(--el-border-color)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'background-color var(--el-transition-duration)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 1,
      left: checked ? 21 : 1,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: '#fff',
      transition: 'left var(--el-transition-duration)'
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  resize = 'none',
  style
}) {
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", {
    value: value ?? '',
    rows: rows,
    placeholder: placeholder,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '5px 11px',
      resize,
      background: disabled ? 'var(--el-fill-color-light)' : 'var(--el-fill-color-blank)',
      border: 'none',
      outline: 'none',
      borderRadius: 'var(--il-radius-input)',
      boxShadow: focus ? 'var(--il-ring-input-focus)' : hover ? 'var(--il-ring-input-hover)' : '0 0 0 1px var(--el-border-color) inset',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-base)',
      lineHeight: 'var(--il-lh-body)',
      color: 'var(--el-text-color-regular)',
      transition: 'all var(--il-dur-base) ease',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/PageHeader.jsx
try { (() => {
function PageHeader({
  title,
  description,
  actions,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
      fontFamily: 'var(--il-font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--il-fs-h2)',
      fontWeight: 'var(--il-fw-semibold)',
      color: 'var(--el-text-color-primary)',
      lineHeight: 'var(--il-lh-tight)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      color: 'var(--el-text-color-regular)',
      fontSize: 'var(--il-fs-help)',
      lineHeight: 'var(--il-lh-snug)'
    }
  }, description)), actions);
}
function SectionTitle({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--il-fs-section)',
      fontWeight: 'var(--il-fw-semibold)',
      color: 'var(--il-text-slate)',
      margin: '6px 0',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { PageHeader, SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/PageHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarMenu.jsx
try { (() => {
function SidebarMenu({
  items = [],
  active,
  onSelect,
  logoSrc,
  logoHref = '/',
  footer,
  style
}) {
  const [hover, setHover] = React.useState(null);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'var(--il-aside-width)',
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      height: '100%',
      background: 'var(--el-bg-color)',
      borderRight: '1px solid var(--il-border-hairline)',
      fontFamily: 'var(--il-font-sans)',
      ...style
    }
  }, logoSrc && /*#__PURE__*/React.createElement("a", {
    href: logoHref,
    "aria-label": "Go to ImLate admin home",
    style: {
      padding: '16px 10px 10px',
      display: 'flex',
      justifyContent: 'center',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "ImLate",
    style: {
      width: '100%',
      height: 'auto',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, items.map(it => {
    const isActive = it.index === active;
    const isHover = hover === it.index;
    return /*#__PURE__*/React.createElement("button", {
      key: it.index,
      type: "button",
      onClick: () => onSelect && onSelect(it.index),
      onMouseEnter: () => setHover(it.index),
      onMouseLeave: () => setHover(null),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 56,
        padding: '0 20px',
        textAlign: 'left',
        border: 'none',
        borderRight: isActive ? '2px solid var(--el-color-primary)' : '2px solid transparent',
        background: isHover ? 'var(--el-color-primary-light-9)' : 'transparent',
        color: isActive ? 'var(--el-color-primary)' : 'var(--el-text-color-primary)',
        fontFamily: 'inherit',
        fontSize: 'var(--el-font-size-base)',
        cursor: 'pointer',
        transition: 'background-color var(--el-transition-duration), color var(--el-transition-duration)'
      }
    }, it.icon, it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), footer);
}
function SidebarFooterButton({
  icon,
  children,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: '100%',
      padding: '12px 20px',
      cursor: 'pointer',
      color: 'var(--el-text-color-regular)',
      fontSize: 'var(--el-font-size-base)',
      fontFamily: 'inherit',
      background: hover ? 'var(--el-fill-color-light)' : 'none',
      border: 'none',
      borderTop: '1px solid var(--il-border-hairline)',
      transition: 'background .2s',
      ...style
    }
  }, icon, /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { SidebarMenu, SidebarFooterButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarMenu.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  active,
  onChange,
  style
}) {
  const [hover, setHover] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderBottom: '2px solid var(--el-border-color-light)',
      marginBottom: 20
    }
  }, tabs.map(t => {
    const isActive = t.name === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.name,
      type: "button",
      onClick: () => onChange && onChange(t.name),
      onMouseEnter: () => setHover(t.name),
      onMouseLeave: () => setHover(null),
      style: {
        height: 40,
        padding: '0 20px',
        border: 'none',
        background: 'none',
        borderBottom: `2px solid ${isActive ? 'var(--el-color-primary)' : 'transparent'}`,
        marginBottom: -2,
        color: isActive || hover === t.name ? 'var(--el-color-primary)' : 'var(--el-text-color-primary)',
        fontFamily: 'var(--il-font-sans)',
        fontSize: 'var(--el-font-size-base)',
        fontWeight: 'var(--el-font-weight-primary)',
        cursor: 'pointer',
        transition: 'color var(--el-transition-duration)'
      }
    }, t.label);
  })), (tabs.find(t => t.name === active) || {}).content);
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Topbar.jsx
try { (() => {
function Topbar({
  userName,
  onProfile,
  onLogout,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 'var(--il-header-height)',
      padding: '0 12px',
      boxSizing: 'border-box',
      borderBottom: '1px solid var(--il-border-hairline)',
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      fontFamily: 'var(--il-font-sans)',
      ...style
    }
  }, children, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), userName && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "small",
    text: true,
    onClick: onProfile
  }, userName), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "small",
    onClick: onLogout
  }, "Logout"));
}
Object.assign(__ds_scope, { Topbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Topbar.jsx", error: String((e && e.message) || e) }); }

// components/patterns/ActionChoiceCard.jsx
try { (() => {
function ActionChoiceCard({
  badge,
  title,
  intent = 'success',
  active = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const ring = intent === 'danger' ? 'var(--il-ring-danger)' : 'var(--il-ring-success)';
  const border = intent === 'danger' ? 'var(--el-color-danger)' : 'var(--el-color-success)';
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gap: 6,
      padding: '14px 16px',
      textAlign: 'left',
      background: '#fff',
      borderRadius: 'var(--il-radius-dialog-card)',
      border: `1px solid ${active ? border : 'var(--il-border-dialog)'}`,
      boxShadow: active ? ring : 'none',
      transform: hover ? 'var(--il-lift-nudge)' : 'none',
      cursor: 'pointer',
      fontFamily: 'var(--il-font-sans)',
      transition: 'border-color var(--il-dur-fast) ease, box-shadow var(--il-dur-fast) ease, transform var(--il-dur-fast) ease',
      ...style
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 'var(--el-font-size-medium)',
      color: '#111827'
    }
  }, badge), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--il-fs-help)',
      color: 'var(--il-text-dialog-soft)'
    }
  }, title));
}
Object.assign(__ds_scope, { ActionChoiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/ActionChoiceCard.jsx", error: String((e && e.message) || e) }); }

// components/patterns/AssetSlotCard.jsx
try { (() => {
function AssetSlotCard({
  label,
  help,
  previewSrc,
  accepted,
  updatedAt,
  isCustom = false,
  uploading = false,
  resetting = false,
  onUpload,
  onReset,
  style
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    shadow: "hover",
    lift: false,
    style: style,
    header: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
      style: {
        fontSize: 'var(--el-font-size-base)',
        color: 'var(--el-text-color-primary)'
      }
    }, label), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '6px 0 0',
        color: 'var(--el-text-color-regular)',
        fontSize: 'var(--il-fs-help)',
        lineHeight: 'var(--il-lh-snug)'
      }
    }, help)),
    extra: /*#__PURE__*/React.createElement(__ds_scope.Tag, {
      type: isCustom ? 'success' : 'info',
      size: "small"
    }, isCustom ? 'Custom' : 'Default')
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--el-border-color-lighter)',
      borderRadius: 'var(--il-radius-card)',
      overflow: 'hidden',
      background: 'var(--il-surface-asset)',
      minHeight: 180,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: previewSrc,
    alt: label,
    style: {
      width: '100%',
      maxHeight: 240,
      objectFit: 'contain',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4,
      marginBottom: 12,
      color: 'var(--el-text-color-secondary)',
      fontSize: 'var(--il-fs-meta)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Accepted: ", accepted), updatedAt && /*#__PURE__*/React.createElement("span", null, "Updated: ", updatedAt)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    loading: uploading,
    onClick: onUpload
  }, "Upload"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "danger",
    plain: true,
    disabled: !isCustom,
    loading: resetting,
    onClick: onReset
  }, "Reset")));
}
Object.assign(__ds_scope, { AssetSlotCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/AssetSlotCard.jsx", error: String((e && e.message) || e) }); }

// components/patterns/FeatureCard.jsx
try { (() => {
function FeatureCard({
  title,
  description,
  icon,
  href,
  target = '_blank',
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    target: target,
    rel: "noopener",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block',
      padding: 24,
      background: '#fff',
      border: '1px solid var(--il-navy-10)',
      borderRadius: 'var(--il-radius-card)',
      textDecoration: 'none',
      color: 'inherit',
      boxShadow: hover ? 'var(--il-shadow-feature-hover)' : 'none',
      transform: hover ? 'var(--il-lift-feature)' : 'none',
      transition: 'box-shadow var(--il-dur-slow) ease, transform var(--il-dur-slow) ease',
      fontFamily: 'var(--il-font-sans)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12,
      display: 'flex'
    }
  }, icon), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 8px',
      color: 'var(--il-navy)',
      fontSize: 'var(--il-fs-card-title)',
      fontWeight: 'var(--il-fw-semibold)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--il-fs-body)',
      color: 'var(--il-text-body)',
      opacity: .8,
      lineHeight: 'var(--il-lh-body)'
    }
  }, description));
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/patterns/FilterBar.jsx
try { (() => {
function FilterBar({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      alignItems: 'center',
      ...style
    }
  }, children);
}
function FilterItem({
  width = 'var(--il-filter-item-width)',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { FilterBar, FilterItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/FilterBar.jsx", error: String((e && e.message) || e) }); }

// components/patterns/FilterChip.jsx
try { (() => {
function FilterChip({
  label,
  value,
  onRemove,
  iconBase,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 8px 0 9px',
      background: 'var(--el-color-info-light-9)',
      border: `1px solid ${hover ? 'var(--el-border-color)' : 'var(--el-color-info-light-7)'}`,
      borderRadius: 'var(--el-border-radius-base)',
      fontFamily: 'var(--il-font-sans)',
      fontSize: 'var(--el-font-size-extra-small)',
      color: 'var(--el-text-color-regular)',
      whiteSpace: 'nowrap',
      transition: 'border-color var(--il-dur-base) ease',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--el-text-color-secondary)'
    }
  }, label, ":"), /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600,
      color: 'var(--el-text-color-primary)'
    }
  }, value), onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": `Remove ${label} filter`,
    onClick: onRemove,
    style: {
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      marginLeft: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 11,
    color: "var(--el-text-color-secondary)",
    base: iconBase
  })));
}
Object.assign(__ds_scope, { FilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/FilterChip.jsx", error: String((e && e.message) || e) }); }

// components/patterns/HelpPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function HelpPanel({
  title = 'About ImLate',
  description,
  uiVersion,
  serverVersion,
  links = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--il-font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 8px',
      fontSize: 'var(--il-fs-card-header)',
      color: 'var(--el-text-color-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px',
      fontSize: 'var(--il-fs-help)',
      color: 'var(--el-text-color-regular)',
      lineHeight: 'var(--il-lh-body)'
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-text-color-secondary)',
      marginBottom: 14,
      paddingBottom: 12,
      borderBottom: '1px solid var(--el-border-color-lighter)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "UI version:"), " ", uiVersion), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Server:"), " ", serverVersion)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, links.map(l => /*#__PURE__*/React.createElement(HelpLinkCard, _extends({
    key: l.label
  }, l)))));
}
function HelpLinkCard({
  label,
  href,
  icon
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noopener",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      padding: '14px 8px',
      borderRadius: 8,
      border: `1px solid ${hover ? 'var(--el-color-primary)' : 'var(--el-border-color-light)'}`,
      boxShadow: hover ? 'var(--il-shadow-link-hover)' : 'none',
      textDecoration: 'none',
      color: 'var(--el-color-primary)',
      fontSize: 'var(--il-fs-help)',
      fontWeight: 'var(--el-font-weight-primary)',
      transition: 'border-color var(--il-dur-base), box-shadow var(--il-dur-base)'
    }
  }, icon, /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { HelpPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/HelpPanel.jsx", error: String((e && e.message) || e) }); }

// components/patterns/PillButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PillButton({
  variant = 'brand',
  href,
  onClick,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const brand = variant === 'brand';
  const s = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 164,
    padding: '12px 20px',
    boxSizing: 'border-box',
    borderRadius: 'var(--il-radius-pill)',
    border: brand ? '1px solid transparent' : `1px solid ${hover ? 'var(--il-navy-light)' : 'var(--il-navy)'}`,
    background: brand ? hover ? 'var(--il-orange-dark)' : 'var(--il-orange)' : hover ? 'var(--il-navy-05)' : 'transparent',
    color: brand ? '#fff' : hover ? 'var(--il-navy-light)' : 'var(--il-navy)',
    fontFamily: 'var(--il-font-sans)',
    fontSize: 'var(--el-font-size-base)',
    fontWeight: 'var(--il-fw-semibold)',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color var(--il-dur-fast) ease, color var(--il-dur-fast) ease, border-color var(--il-dur-fast) ease',
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  };
  return href ? /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: "_blank",
    rel: "noopener",
    style: s
  }, handlers), children) : /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    style: s
  }, handlers), children);
}
Object.assign(__ds_scope, { PillButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/PillButton.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/AdminUsersScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Input,
  Select,
  Switch,
  FormField,
  FormActions,
  DataTable,
  Tag,
  Icon,
  ConfirmDialog,
  Divider
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';
function AdminUsersScreen({
  notify
}) {
  const [rows, setRows] = React.useState(window.IL_DATA.admins);
  const [q, setQ] = React.useState('');
  const [current, setCurrent] = React.useState(null);
  const [form, setForm] = React.useState({
    id: null,
    username: '',
    password: '',
    name: '',
    surname: '',
    role: 'admin',
    is_active: true
  });
  const [showPw, setShowPw] = React.useState(false);
  const [pw, setPw] = React.useState({
    password: '',
    confirm: ''
  });
  const [confirmRow, setConfirmRow] = React.useState(null);
  const filtered = rows.filter(u => !q || (u.username + u.name + u.surname).toLowerCase().includes(q.toLowerCase()));
  const fmt = s => s ? new Date(s).toLocaleString('en-GB') : '';
  const select = row => {
    setCurrent(row);
    setForm({
      id: row.id,
      username: row.username,
      password: '',
      name: row.name,
      surname: row.surname,
      role: row.role,
      is_active: row.is_active
    });
    setShowPw(false);
  };
  const reset = () => {
    setCurrent(null);
    setForm({
      id: null,
      username: '',
      password: '',
      name: '',
      surname: '',
      role: 'admin',
      is_active: true
    });
    setShowPw(false);
  };
  const pwError = pw.password && pw.password.length < 8 ? 'At least 8 characters' : pw.password && !/[A-Z]/.test(pw.password) ? 'Must contain an uppercase letter' : '';
  const confirmError = pw.confirm && pw.confirm !== pw.password ? 'Passwords do not match' : '';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) var(--il-side-panel-width-lg)',
      gap: 16,
      padding: 20,
      background: 'var(--il-surface-page)',
      minHeight: '100%',
      animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    header: /*#__PURE__*/React.createElement("b", null, "Admin Users")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    value: q,
    onChange: setQ,
    placeholder: "Search by name, surname or username",
    clearable: true,
    iconBase: IB
  })), /*#__PURE__*/React.createElement(DataTable, {
    data: filtered,
    currentRow: current,
    onRowClick: select,
    empty: "No data found",
    columns: [{
      label: 'Username',
      prop: 'username',
      width: 130
    }, {
      label: 'Name',
      prop: 'name',
      width: 110
    }, {
      label: 'Surname',
      prop: 'surname',
      width: 120
    }, {
      label: 'Role',
      width: 92,
      render: r => /*#__PURE__*/React.createElement(Tag, {
        type: r.role === 'admin' ? 'primary' : 'info',
        size: "small"
      }, r.role)
    }, {
      label: 'Active',
      width: 78,
      render: r => r.is_active ? /*#__PURE__*/React.createElement(Tag, {
        type: "success",
        size: "small"
      }, "Yes") : /*#__PURE__*/React.createElement(Tag, {
        type: "info",
        size: "small"
      }, "No")
    }, {
      label: 'Created',
      width: 150,
      render: r => fmt(r.created_at)
    }, {
      label: 'Updated',
      width: 150,
      render: r => fmt(r.updated_at)
    }, {
      label: 'Actions',
      width: 82,
      align: 'center',
      render: r => /*#__PURE__*/React.createElement(Button, {
        type: "danger",
        circle: true,
        size: "small",
        onClick: () => setConfirmRow(r),
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "delete",
          size: 12,
          base: IB,
          color: "#fff"
        })
      })
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    header: /*#__PURE__*/React.createElement("b", null, form.id ? 'Edit User' : 'Create User')
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Username",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    value: form.username,
    onChange: v => setForm(f => ({
      ...f,
      username: v
    })),
    disabled: !!form.id,
    iconBase: IB
  })), !form.id && /*#__PURE__*/React.createElement(FormField, {
    label: "Password",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    value: form.password,
    onChange: v => setForm(f => ({
      ...f,
      password: v
    })),
    type: "password",
    showPassword: true,
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    value: form.name,
    onChange: v => setForm(f => ({
      ...f,
      name: v
    })),
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Surname",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    value: form.surname,
    onChange: v => setForm(f => ({
      ...f,
      surname: v
    })),
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Role",
    required: true
  }, /*#__PURE__*/React.createElement(Select, {
    value: form.role,
    onChange: v => setForm(f => ({
      ...f,
      role: v
    })),
    iconBase: IB,
    options: [{
      label: 'Admin',
      value: 'admin'
    }, {
      label: 'Terminal',
      value: 'terminal'
    }]
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Active"
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: form.is_active,
    onChange: v => setForm(f => ({
      ...f,
      is_active: v
    }))
  })), /*#__PURE__*/React.createElement(FormActions, null, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: () => {
      notify('success', form.id ? 'User updated' : 'User created');
      reset();
    }
  }, form.id ? 'Update' : 'Create'), /*#__PURE__*/React.createElement(Button, {
    onClick: reset
  }, "Reset")), form.id && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Divider, null), !showPw && /*#__PURE__*/React.createElement(Button, {
    type: "warning",
    onClick: () => setShowPw(true)
  }, "Change Password"), showPw && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 12px',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--el-text-color-primary)'
    }
  }, "Change Password for ", form.username), /*#__PURE__*/React.createElement(FormField, {
    label: "New Password",
    labelWidth: "var(--il-form-label-width-lg)",
    required: true,
    error: pwError
  }, /*#__PURE__*/React.createElement(Input, {
    value: pw.password,
    onChange: v => setPw(p => ({
      ...p,
      password: v
    })),
    type: "password",
    showPassword: true,
    placeholder: "Enter new password",
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Confirm Password",
    labelWidth: "var(--il-form-label-width-lg)",
    required: true,
    error: confirmError
  }, /*#__PURE__*/React.createElement(Input, {
    value: pw.confirm,
    onChange: v => setPw(p => ({
      ...p,
      confirm: v
    })),
    type: "password",
    showPassword: true,
    placeholder: "Confirm new password",
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FormActions, {
    labelWidth: "var(--il-form-label-width-lg)"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: () => {
      notify('success', 'Password updated successfully');
      setShowPw(false);
      setPw({
        password: '',
        confirm: ''
      });
    }
  }, "Save Password"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      setShowPw(false);
      setPw({
        password: '',
        confirm: ''
      });
    }
  }, "Cancel"))))), /*#__PURE__*/React.createElement(ConfirmDialog, {
    open: !!confirmRow,
    title: "Confirm Delete",
    intent: "warning",
    iconBase: IB,
    message: confirmRow ? 'Delete user "' + confirmRow.username + '"? This cannot be undone.' : '',
    confirmLabel: "Delete",
    onConfirm: () => {
      setRows(rs => rs.filter(r => r.id !== confirmRow.id));
      notify('success', 'User deleted');
      setConfirmRow(null);
    },
    onCancel: () => setConfirmRow(null)
  }));
}
Object.assign(window, {
  AdminUsersScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/AdminUsersScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/AppShell.jsx
try { (() => {
const {
  SidebarMenu,
  SidebarFooterButton,
  Topbar,
  Popover,
  HelpPanel,
  MessageStack,
  Icon
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';
const MENU = [{
  index: '/users',
  label: 'Visitors'
}, {
  index: '/admin-users',
  label: 'Admin Users'
}, {
  index: '/reports',
  label: 'Reports'
}, {
  index: '/settings',
  label: 'Settings'
}];

/* Deep link: #/reports, #/users, … opens that screen directly (skips the login step). */
const hashRoute = () => {
  const h = (window.location.hash || '').replace(/^#/, '');
  return h && h.startsWith('/') ? h : null;
};
function App() {
  const [authed, setAuthed] = React.useState(!!hashRoute());
  const [userName, setUserName] = React.useState('admin');
  const [route, setRoute] = React.useState(hashRoute() || '/');
  React.useEffect(() => {
    const sync = () => {
      const h = hashRoute();
      if (h) {
        setRoute(h);
        setAuthed(true);
      }
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  const go = r => {
    setRoute(r);
    window.location.hash = r;
  };
  const [help, setHelp] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const notify = (type, text) => {
    const id = Date.now() + Math.random();
    setMessages(m => [...m, {
      id,
      type,
      text
    }]);
    setTimeout(() => setMessages(m => m.filter(x => x.id !== id)), 3000);
  };
  if (!authed) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100vh',
        overflow: 'auto',
        background: '#fff'
      }
    }, /*#__PURE__*/React.createElement(LoginScreen, {
      onLogin: u => {
        setUserName(u || 'admin');
        setAuthed(true);
        go('/');
      }
    }), /*#__PURE__*/React.createElement(MessageStack, {
      messages: messages,
      iconBase: IB
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100vh',
      display: 'flex',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SidebarMenu, {
    logoSrc: "../../assets/logo.png",
    active: route,
    onSelect: go,
    items: MENU,
    footer: /*#__PURE__*/React.createElement(Popover, {
      open: help,
      width: 320,
      placement: "right-end",
      content: /*#__PURE__*/React.createElement(HelpPanel, {
        uiVersion: "1.4.0",
        serverVersion: "2.2.1",
        description: "Student attendance and visitor registration system. Track who enters and leaves the building with RFID keys, manage visitors, and generate reports.",
        links: [{
          label: 'Documentation',
          href: 'https://imlate.buzyka.com/',
          icon: /*#__PURE__*/React.createElement(Icon, {
            name: "document",
            size: 18,
            base: IB,
            color: "var(--el-color-primary)"
          })
        }, {
          label: 'Getting Started',
          href: 'https://imlate.buzyka.com/getting-started.html',
          icon: /*#__PURE__*/React.createElement(Icon, {
            name: "compass",
            size: 18,
            base: IB,
            color: "var(--el-color-primary)"
          })
        }]
      })
    }, /*#__PURE__*/React.createElement(SidebarFooterButton, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "question-filled",
        size: 16,
        base: IB
      }),
      onClick: () => setHelp(h => !h)
    }, "Help"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    userName: userName,
    onProfile: () => go('/profile'),
    onLogout: () => {
      setAuthed(false);
      setHelp(false);
    }
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      minHeight: 0,
      flex: 1,
      overflow: 'auto',
      background: route === '/' ? '#fff' : 'var(--il-surface-page)'
    }
  }, route === '/' && /*#__PURE__*/React.createElement(DashboardScreen, {
    userName: userName
  }), route === '/users' && /*#__PURE__*/React.createElement(VisitorsScreen, {
    notify: notify
  }), route === '/admin-users' && /*#__PURE__*/React.createElement(AdminUsersScreen, {
    notify: notify
  }), route === '/reports' && /*#__PURE__*/React.createElement(ReportsScreen, {
    notify: notify
  }), route === '/settings' && /*#__PURE__*/React.createElement(SettingsScreen, {
    notify: notify
  }), route === '/profile' && /*#__PURE__*/React.createElement(ProfileScreen, {
    userName: userName,
    notify: notify
  }))), /*#__PURE__*/React.createElement(MessageStack, {
    messages: messages,
    iconBase: IB
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/DashboardScreen.jsx
try { (() => {
const {
  PillButton,
  FeatureCard,
  Icon
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';
function DashboardScreen({
  userName
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 'var(--il-content-max)',
      padding: '20px 32px 12px',
      color: 'var(--il-text-body)',
      animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,560px) minmax(260px,1fr)',
      gap: 48,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0 32px',
      borderBottom: '2px solid var(--il-orange)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--il-navy)',
      fontSize: 'var(--il-fs-eyebrow)',
      fontWeight: 'var(--il-fw-bold)',
      letterSpacing: 'var(--il-tracking-eyebrow)',
      textTransform: 'uppercase'
    }
  }, "ImLate Administration"), /*#__PURE__*/React.createElement("h1", {
    style: {
      maxWidth: '10ch',
      margin: '10px 0 0',
      color: 'var(--il-navy)',
      fontSize: 'var(--il-fs-hero)',
      lineHeight: 'var(--il-lh-hero)',
      fontWeight: 400
    }
  }, "Registration system."), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: '34rem',
      margin: '18px 0 0',
      fontSize: '1.04rem',
      lineHeight: 'var(--il-lh-relaxed)'
    }
  }, "Welcome back, ", userName, ". ImLate gives your team one clear place to manage visitors, follow attendance activity, and keep access workflows organized."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(PillButton, {
    variant: "brand",
    href: "https://imlate.buzyka.com/getting-started.html"
  }, "Getting Started"), /*#__PURE__*/React.createElement(PillButton, {
    variant: "alt",
    href: "https://imlate.buzyka.com/"
  }, "Documentation"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "",
    style: {
      width: 'min(100%,260px)',
      height: 'auto',
      display: 'block'
    }
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
      gap: 18,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(FeatureCard, {
    title: "Getting Started",
    href: "https://imlate.buzyka.com/getting-started.html",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "document",
      size: 32,
      base: IB,
      color: "var(--il-orange)"
    }),
    description: "Open the quickest path to setup, first steps, and the main ImLate workflow."
  }), /*#__PURE__*/React.createElement(FeatureCard, {
    title: "Admin Panel",
    href: "https://imlate.buzyka.com/admin/index.html",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "setting",
      size: 32,
      base: IB,
      color: "var(--il-orange)"
    }),
    description: "Manage visitors, admin users, profile details, branding, and system settings."
  }), /*#__PURE__*/React.createElement(FeatureCard, {
    title: "Tracking point",
    href: "https://imlate.buzyka.com/public-frontend/index.html",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "data-analysis",
      size: 32,
      base: IB,
      color: "var(--il-orange)"
    }),
    description: "Read how the public tracking part works, including the RFID reader flow and attendance events."
  })));
}
Object.assign(window, {
  DashboardScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/LoginScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Input,
  FormField
} = window.ImLateDesignSystem_9c9b6f;
function LoginScreen({
  onLogin
}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const disabled = !username || !password;
  const submit = () => {
    if (disabled || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(username);
    }, 600);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 400
    }
  }, /*#__PURE__*/React.createElement(Card, {
    bodyStyle: {
      padding: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/app-icon.png",
    alt: "ImLate",
    style: {
      width: 64,
      height: 64,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      textAlign: 'center',
      fontSize: 'var(--il-fs-h2)',
      fontWeight: 'var(--il-fw-semibold)',
      color: 'var(--el-text-color-primary)'
    }
  }, "ImLate Control Panel")), /*#__PURE__*/React.createElement(FormField, {
    label: "Username",
    labelPosition: "top",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    value: username,
    onChange: setUsername,
    placeholder: "admin",
    clearable: true,
    iconBase: "../../assets/icons"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Password",
    labelPosition: "top",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    value: password,
    onChange: setPassword,
    type: "password",
    showPassword: true,
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    iconBase: "../../assets/icons"
  })), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    loading: loading,
    disabled: disabled,
    onClick: submit,
    style: {
      width: '100%'
    }
  }, "Login"))));
}
Object.assign(window, {
  LoginScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/ProfileScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Input,
  FormField,
  FormActions
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';
function ProfileScreen({
  userName,
  notify
}) {
  const [show, setShow] = React.useState(false);
  const [pw, setPw] = React.useState({
    password: '',
    confirm: ''
  });
  const err = pw.password && pw.password.length < 8 ? 'Password must be at least 8 characters' : '';
  const cerr = pw.confirm && pw.confirm !== pw.password ? 'Passwords do not match' : '';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16,
      maxWidth: 'var(--il-form-max)',
      padding: 20,
      background: 'var(--il-surface-page)',
      minHeight: '100%',
      animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    header: /*#__PURE__*/React.createElement("b", null, "My Profile")
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Username"
  }, /*#__PURE__*/React.createElement(Input, {
    value: userName,
    onChange: () => {},
    disabled: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Name"
  }, /*#__PURE__*/React.createElement(Input, {
    value: "Alex",
    onChange: () => {},
    disabled: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Surname"
  }, /*#__PURE__*/React.createElement(Input, {
    value: "Morgan",
    onChange: () => {},
    disabled: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Role"
  }, /*#__PURE__*/React.createElement(Input, {
    value: "admin",
    onChange: () => {},
    disabled: true
  }))), /*#__PURE__*/React.createElement(Card, {
    header: /*#__PURE__*/React.createElement("b", null, "Security")
  }, !show && /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: () => setShow(true)
  }, "Change Password"), show && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormField, {
    label: "New Password",
    labelWidth: "var(--il-form-label-width-lg)",
    required: true,
    error: err
  }, /*#__PURE__*/React.createElement(Input, {
    value: pw.password,
    onChange: v => setPw(p => ({
      ...p,
      password: v
    })),
    type: "password",
    showPassword: true,
    placeholder: "Enter new password",
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Confirm Password",
    labelWidth: "var(--il-form-label-width-lg)",
    required: true,
    error: cerr
  }, /*#__PURE__*/React.createElement(Input, {
    value: pw.confirm,
    onChange: v => setPw(p => ({
      ...p,
      confirm: v
    })),
    type: "password",
    showPassword: true,
    placeholder: "Confirm new password",
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FormActions, {
    labelWidth: "var(--il-form-label-width-lg)"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: () => {
      notify('success', 'Password updated successfully');
      setShow(false);
      setPw({
        password: '',
        confirm: ''
      });
    }
  }, "Save"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      setShow(false);
      setPw({
        password: '',
        confirm: ''
      });
    }
  }, "Cancel")))));
}
Object.assign(window, {
  ProfileScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/ProfileScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/ReportsScreen.jsx
try { (() => {
const {
  Card,
  CardSubtitle,
  Button,
  Input,
  Select,
  Tag,
  SegmentedControl,
  DateRangePicker,
  DATE_PRESETS,
  FilterBar,
  FilterItem,
  FilterChip,
  DataTable,
  PivotGrid,
  Legend,
  TableToolbar,
  StatusTag,
  Pagination,
  SectionTitle,
  PageHeader,
  KpiStat,
  Skeleton,
  Tabs,
  Icon
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';
const iso = d => d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` : '';
const formatRange = DateRangePicker.format || (({
  from,
  to
}) => from && to ? `${iso(from)} — ${iso(to)}` : '');
const PRESETS = DATE_PRESETS || DateRangePicker.PRESETS;
const GRADES = Array.from({
  length: 12
}, (_, i) => ({
  label: 'Grade ' + (i + 1),
  value: i + 1
}));
const TYPE_OPTS = [{
  label: 'All visitors',
  value: null
}, {
  label: 'Students',
  value: true
}, {
  label: 'Teachers',
  value: false
}];
const STATUS_OPTS = [{
  label: 'Signed in',
  value: 'signed_in'
}, {
  label: 'Signed out',
  value: 'signed_out'
}, {
  label: 'Not signed',
  value: 'not_signed'
}];
const SIGN_ORDER = {
  signed_in: 1,
  signed_out: 2,
  not_signed: 3
};
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
const LEGEND = [{
  label: 'Signed in',
  swatch: 'var(--el-color-success-light-9)',
  border: 'var(--el-color-success-light-5)',
  hint: 'still in the building'
}, {
  label: 'Completed',
  swatch: 'var(--el-fill-color-light)',
  hint: 'hours present'
}, {
  label: 'Late arrival',
  swatch: 'var(--el-color-warning-light-9)',
  border: 'var(--el-color-warning-light-5)',
  hint: 'after 09:00'
}, {
  label: 'Absent',
  hint: 'blank cell'
}, {
  label: 'Weekend / not yet',
  swatch: 'var(--el-fill-color-lighter)'
}];
const EMPTY = {
  type: null,
  status: null,
  grades: [],
  surname: '',
  range: PRESETS.week()
};
const sameFilters = (a, b) => a.type === b.type && a.status === b.status && a.surname.trim() === b.surname.trim() && a.grades.join(',') === b.grades.join(',') && formatRange(a.range) === formatRange(b.range);
function ReportsScreen({
  notify
}) {
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
  React.useEffect(() => {
    if (draft.type !== true && draft.grades.length) setDraft(d => ({
      ...d,
      grades: []
    }));
  }, [draft.type]);
  const set = patch => setDraft(d => ({
    ...d,
    ...patch
  }));
  const apply = () => {
    setApplied(draft);
    setPage(1);
  };
  const resetAll = () => {
    setDraft(EMPTY);
    setApplied(EMPTY);
    setPreset('week');
    setQuery('');
    setPage(1);
  };
  const clearOne = key => {
    const next = {
      ...applied,
      ...(key === 'grades' ? {
        grades: []
      } : key === 'range' ? {
        range: EMPTY.range
      } : {
        [key]: key === 'surname' ? '' : null
      })
    };
    setApplied(next);
    setDraft(next);
    setPage(1);
    if (key === 'range') setPreset('week');
  };
  const usePreset = p => {
    setPreset(p);
    if (p !== 'custom') set({
      range: PRESETS[p]()
    });
  };

  /* ── applied-filter chips ── */
  const chips = [];
  if (applied.type !== null) chips.push({
    key: 'type',
    label: 'Visitor type',
    value: applied.type ? 'Students' : 'Teachers'
  });
  if (applied.status) chips.push({
    key: 'status',
    label: 'Status',
    value: (STATUS_OPTS.find(o => o.value === applied.status) || {}).label
  });
  if (applied.grades.length) chips.push({
    key: 'grades',
    label: applied.grades.length > 1 ? 'Grades' : 'Grade',
    value: applied.grades.slice().sort((a, b) => a - b).join(', ')
  });
  if (report === 'fire' && applied.surname.trim()) chips.push({
    key: 'surname',
    label: 'Last name',
    value: applied.surname.trim()
  });
  if (report === 'attendance') chips.push({
    key: 'range',
    label: 'Range',
    value: formatRange(applied.range)
  });

  /* ── row sets ── */
  const base = list => list.filter(v => applied.type === null || v.is_student === applied.type).filter(v => applied.grades.length === 0 || applied.grades.includes(v.grade));
  const searched = list => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(r => (r.name + ' ' + r.surname).toLowerCase().includes(q));
  };
  const fireRows = searched(base(window.IL_DATA.visitors).filter(v => !applied.status || v.sign_status === applied.status).filter(v => !applied.surname.trim() || v.surname.toLowerCase().includes(applied.surname.trim().toLowerCase())).map(v => ({
    ...v,
    visit_date: new Date(v.updated_at).toLocaleString('en-GB')
  })).sort((a, b) => SIGN_ORDER[a.sign_status] - SIGN_ORDER[b.sign_status]));
  const attRows = searched(base(window.IL_DATA.attendance));
  const rows = report === 'fire' ? fireRows : attRows;
  const fireColumns = [{
    label: '#',
    width: 56,
    align: 'center',
    render: (r, i) => (page - 1) * 20 + i + 1
  }, {
    label: 'Name',
    prop: 'name',
    sortable: true
  }, {
    label: 'Surname',
    prop: 'surname',
    sortable: true
  }, {
    label: 'Last activity',
    prop: 'visit_date',
    width: 170,
    sortable: true
  }, {
    label: 'Student',
    prop: 'is_student',
    width: 96,
    sortable: true,
    render: r => String(r.is_student)
  }, {
    label: 'Status',
    width: 130,
    render: r => /*#__PURE__*/React.createElement(StatusTag, {
      status: r.sign_status,
      soft: true
    })
  }];

  /* ── matrix: one generated column per day in the applied range ── */
  const days = window.IL_DATA.eachDay(applied.range.from, applied.range.to);
  const capped = days.length >= 45;
  const dayColumns = days.map(d => {
    const dow = d.getDay();
    return {
      key: window.IL_DATA.iso(d),
      date: d,
      top: WEEKDAYS_SHORT[dow],
      label: d.getDate() === 1 || d.getDate() === days[0].getDate() ? String(d.getDate()).padStart(2, '0') + ' ' + MONTHS_SHORT[d.getMonth()] : String(d.getDate()).padStart(2, '0'),
      muted: dow === 0 || dow === 6
    };
  });
  const cells = React.useMemo(() => {
    const map = new Map();
    attRows.forEach(p => {
      const perPerson = {};
      dayColumns.forEach(col => {
        perPerson[col.key] = window.IL_DATA.attendanceDay(p, col.date);
      });
      map.set(p.id, perPerson);
    });
    return map;
  }, [attRows, applied.range.from && applied.range.from.getTime(), applied.range.to && applied.range.to.getTime()]);
  const cellOf = (row, col) => (cells.get(row.id) || {})[col.key] || {
    state: 'absent'
  };
  const renderCell = (row, col) => {
    const c = cellOf(row, col);
    if (c.state === 'active') {
      return {
        tint: CELL_TINT.active,
        title: row.surname + ' — signed in ' + c.checkInLabel + ', still in the building',
        content: /*#__PURE__*/React.createElement("span", {
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            color: 'var(--el-color-success-dark-2)',
            fontWeight: 600
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--el-color-success)'
          }
        }), "In")
      };
    }
    if (c.state === 'complete' || c.state === 'late') {
      return {
        tint: CELL_TINT[c.state],
        title: row.surname + ' — ' + c.checkInLabel + ' to ' + c.checkOutLabel + (c.state === 'late' ? ' (late arrival)' : ''),
        content: /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: c.state === 'late' ? 600 : 400,
            color: c.state === 'late' ? 'var(--el-color-warning-dark-2)' : 'var(--el-text-color-regular)'
          }
        }, c.hours.toFixed(1))
      };
    }
    if (c.state === 'weekend' || c.state === 'future') {
      return {
        tint: CELL_TINT[c.state],
        content: null
      };
    }
    return {
      tint: 'transparent',
      title: row.surname + ' — no check-in recorded',
      content: /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--el-text-color-disabled)'
        }
      }, "\u2014")
    };
  };
  const rowHours = row => dayColumns.reduce((a, col) => a + (cellOf(row, col).hours || 0), 0);
  const dayPresent = col => attRows.filter(p => ['complete', 'late', 'active'].includes(cellOf(p, col).state)).length;
  /* A day with nothing recorded yet is not a day of zero attendance — weekends and
     future dates both report "—" rather than asserting a count. */
  const columnElapsed = col => !col.muted && attRows.length > 0 && attRows.some(p => cellOf(p, col).state !== 'future');
  const elapsedColumns = dayColumns.filter(columnElapsed);
  const count = s => fireRows.filter(r => r.sign_status === s).length;
  const workdays = dayColumns.filter(c => !c.muted);
  const allCells = attRows.flatMap(p => dayColumns.map(col => cellOf(p, col)));
  const doneCells = allCells.filter(c => c.hours);
  const avgHours = doneCells.length ? doneCells.reduce((a, c) => a + c.hours, 0) / doneCells.length : 0;
  const lateCount = allCells.filter(c => c.state === 'late').length;
  const absentCount = allCells.filter(c => c.state === 'absent').length;

  /* ── filter panel per report ── */
  const filters = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FilterBar, null, /*#__PURE__*/React.createElement(FilterItem, null, /*#__PURE__*/React.createElement(Select, {
    value: draft.type,
    onChange: v => set({
      type: v
    }),
    clearable: true,
    placeholder: "Visitor type",
    options: TYPE_OPTS,
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FilterItem, null, /*#__PURE__*/React.createElement(Select, {
    value: draft.status,
    onChange: v => set({
      status: v
    }),
    clearable: true,
    placeholder: "Status",
    options: STATUS_OPTS,
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FilterItem, null, /*#__PURE__*/React.createElement(Select, {
    multiple: true,
    value: draft.grades,
    onChange: v => set({
      grades: v
    }),
    disabled: draft.type !== true,
    placeholder: "Select grade(s)",
    options: GRADES,
    iconBase: IB
  })), report === 'fire' && /*#__PURE__*/React.createElement(FilterItem, null, /*#__PURE__*/React.createElement(Input, {
    value: draft.surname,
    onChange: v => set({
      surname: v
    }),
    placeholder: "Last name",
    prefixIcon: "search",
    clearable: true,
    iconBase: IB
  })), draft.grades.length === 1 && /*#__PURE__*/React.createElement(Tag, {
    type: "success"
  }, "Single grade mode"), draft.grades.length > 1 && /*#__PURE__*/React.createElement(Tag, {
    type: "warning"
  }, "Multi grade mode")), report === 'attendance' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      alignItems: 'center',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    value: preset,
    onChange: usePreset,
    options: [{
      label: 'Day',
      value: 'day'
    }, {
      label: 'Week',
      value: 'week'
    }, {
      label: 'Month',
      value: 'month'
    }, {
      label: 'Custom',
      value: 'custom'
    }]
  }), /*#__PURE__*/React.createElement(DateRangePicker, {
    from: draft.range.from,
    to: draft.range.to,
    style: {
      width: 260
    },
    iconBase: IB,
    onChange: r => {
      set({
        range: r
      });
      setPreset('custom');
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      marginTop: 16,
      paddingTop: 14,
      borderTop: '1px solid var(--el-border-color-lighter)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--il-text-mute)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--il-tracking-label)',
      fontWeight: 'var(--il-fw-semibold)',
      marginRight: 2
    }
  }, "Applied"), chips.length === 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-text-color-placeholder)'
    }
  }, "No filters \u2014 showing all visitors") : chips.map(c => /*#__PURE__*/React.createElement(FilterChip, {
    key: c.key,
    label: c.label,
    value: c.value,
    onRemove: () => clearOne(c.key),
    iconBase: IB
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), dirty && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-color-warning)'
    }
  }, "Unapplied changes"), /*#__PURE__*/React.createElement(Button, {
    size: "small",
    onClick: resetAll
  }, "Reset"), /*#__PURE__*/React.createElement(Button, {
    size: "small",
    type: "primary",
    disabled: !dirty,
    onClick: apply
  }, "Apply filters")));
  const grid = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    }
  }, report === 'fire' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KpiStat, {
    label: "Signed in",
    value: count('signed_in'),
    intent: "success",
    hint: "Currently in the building"
  }), /*#__PURE__*/React.createElement(KpiStat, {
    label: "Signed out",
    value: count('signed_out'),
    intent: "warning",
    hint: "Left today"
  }), /*#__PURE__*/React.createElement(KpiStat, {
    label: "Not signed",
    value: count('not_signed'),
    intent: "info",
    hint: "No event recorded"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KpiStat, {
    label: "Avg hours / day",
    value: avgHours.toFixed(1),
    intent: "neutral",
    hint: elapsedColumns.length + ' of ' + workdays.length + ' working days elapsed'
  }), /*#__PURE__*/React.createElement(KpiStat, {
    label: "Late arrivals",
    value: lateCount,
    intent: "warning",
    hint: "After 09:00"
  }), /*#__PURE__*/React.createElement(KpiStat, {
    label: "Absences",
    value: absentCount,
    intent: "info",
    hint: "Working days with no check-in"
  }))), /*#__PURE__*/React.createElement(SectionTitle, null, report === 'fire' ? 'Fire list' : 'Attendance ' + formatRange(applied.range)), /*#__PURE__*/React.createElement(Card, {
    bodyStyle: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(TableToolbar, {
    query: query,
    onQueryChange: setQuery,
    count: rows.length,
    countLabel: rows.length === 1 ? 'row' : 'rows',
    iconBase: IB,
    onExportCsv: () => notify && notify('success', 'Export started — CSV'),
    onExportPdf: () => notify && notify('success', 'Export started — PDF')
  }), report === 'attendance' && !loading && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap',
      padding: '10px 12px',
      borderBottom: '1px solid var(--el-border-color-lighter)'
    }
  }, /*#__PURE__*/React.createElement(Legend, {
    items: LEGEND
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), elapsedColumns.length < workdays.length && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-text-color-secondary)'
    }
  }, "Totals cover ", elapsedColumns.length, " of ", workdays.length, " working days \u2014 the rest have not occurred yet"), capped && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-color-warning)'
    }
  }, "Showing the first 45 days of the range")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 4
    }
  }, loading ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    rows: 6,
    columns: report === 'fire' ? [50, 120, 120, 160, 90, 120] : [50, 210, 62, 62, 62, 62, 62, 62, 62]
  })) : report === 'attendance' ? /*#__PURE__*/React.createElement(PivotGrid, {
    rows: attRows,
    rowKey: r => r.id,
    columnWidth: 62,
    columns: dayColumns,
    renderCell: renderCell,
    fixed: [{
      label: '#',
      width: 52,
      align: 'center',
      render: (r, i) => i + 1
    }, {
      label: 'Surname & First Name',
      width: 210,
      sortValue: r => r.surname.toLowerCase(),
      render: r => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", {
        style: {
          fontWeight: 600,
          color: 'var(--el-text-color-primary)'
        }
      }, r.surname), ' ', /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--el-text-color-regular)'
        }
      }, r.name))
    }],
    totalColumn: {
      label: 'Total hrs',
      width: 88,
      render: r => rowHours(r).toFixed(1)
    },
    footer: {
      label: 'Present / day',
      render: col => columnElapsed(col) ? dayPresent(col) : /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--el-text-color-disabled)'
        }
      }, "\u2014"),
      total: () => attRows.reduce((a, p) => a + rowHours(p), 0).toFixed(1)
    },
    empty: chips.length || query ? 'No visitors match these filters.' : 'No visitor activity in this period.'
  }) : /*#__PURE__*/React.createElement(DataTable, {
    data: rows,
    columns: fireColumns,
    rowClass: r => r.sign_status.replace(/_/g, '-'),
    empty: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 8,
        justifyItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "filter",
      size: 22,
      color: "var(--el-text-color-disabled)",
      base: IB
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--el-text-color-regular)'
      }
    }, "No data found"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--il-fs-meta)',
        color: 'var(--el-text-color-secondary)'
      }
    }, chips.length || query ? 'Try widening the filters or clearing the search.' : 'No visitor activity in this period.'))
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 12
    }
  }, report === 'attendance' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--il-fs-meta)',
      color: 'var(--el-text-color-secondary)'
    }
  }, attRows.length, " visitors \xD7 ", dayColumns.length, " days"), /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    total: report === 'fire' ? 140 : 96,
    pageSize: 20,
    onChange: setPage,
    iconBase: IB
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      padding: 20,
      background: 'var(--il-surface-page)',
      minHeight: '100%',
      animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    header: /*#__PURE__*/React.createElement(PageHeader, {
      title: "Reports",
      description: "Switch report type, then filter and export visitor activity."
    }),
    bodyStyle: {
      padding: '0 20px 20px'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    active: report,
    onChange: setReport,
    tabs: [{
      name: 'fire',
      label: 'Fire List',
      content: filters
    }, {
      name: 'attendance',
      label: 'Attendance Report',
      content: filters
    }]
  })), grid);
}
Object.assign(window, {
  ReportsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/ReportsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/SettingsScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Tabs,
  PageHeader,
  AssetSlotCard,
  Divider,
  FormField,
  InputNumber
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';
function SettingsScreen({
  notify
}) {
  const [tab, setTab] = React.useState('theme');
  const [welcome, setWelcome] = React.useState(1.8);
  const [goodbye, setGoodbye] = React.useState(1.8);
  const slots = window.IL_DATA.themeSlots;
  const theme = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
      gap: 16
    }
  }, slots.map(s => /*#__PURE__*/React.createElement(AssetSlotCard, {
    key: s.key,
    label: s.label,
    help: s.help,
    previewSrc: s.preview,
    accepted: s.accepted,
    isCustom: s.is_custom,
    updatedAt: s.updated_at,
    onUpload: () => notify('success', 'Asset uploaded'),
    onReset: () => notify('success', 'Asset reset')
  }))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Card, {
    shadow: "never",
    header: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
      style: {
        fontSize: 14,
        color: 'var(--el-text-color-primary)'
      }
    }, "Animation Duration"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '6px 0 0',
        color: 'var(--el-text-color-regular)',
        fontSize: 13,
        lineHeight: 1.4
      }
    }, "Control how long welcome and goodbye GIFs stay visible on the tracking page."))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Welcome animation (seconds)",
    labelPosition: "top"
  }, /*#__PURE__*/React.createElement(InputNumber, {
    value: welcome,
    onChange: setWelcome,
    min: 1.8,
    max: 60,
    step: 0.1,
    precision: 1,
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Goodbye animation (seconds)",
    labelPosition: "top"
  }, /*#__PURE__*/React.createElement(InputNumber, {
    value: goodbye,
    onChange: setGoodbye,
    min: 1.8,
    max: 60,
    step: 0.1,
    precision: 1,
    iconBase: IB
  }))), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: () => notify('success', 'Animation timings saved')
  }, "Save timings")));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20,
      padding: 20,
      background: 'var(--il-surface-page)',
      minHeight: '100%',
      animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    header: /*#__PURE__*/React.createElement(PageHeader, {
      title: "Settings",
      description: "Manage tracking page branding and animation timings."
    }),
    extra: /*#__PURE__*/React.createElement(Button, {
      onClick: () => notify('info', 'Theme reloaded')
    }, "Refresh")
  }, /*#__PURE__*/React.createElement(Tabs, {
    active: tab,
    onChange: setTab,
    tabs: [{
      name: 'theme',
      label: 'Theme',
      content: theme
    }]
  })));
}
Object.assign(window, {
  SettingsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/SettingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/VisitorsScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Input,
  Select,
  Switch,
  InputNumber,
  Textarea,
  FormField,
  FormActions,
  DataTable,
  Avatar,
  Tag,
  Icon,
  Dialog,
  ConfirmDialog,
  ActionChoiceCard,
  FileUploadRow,
  Divider
} = window.ImLateDesignSystem_9c9b6f;
const IB = '../../assets/icons';
function fmt(str) {
  if (!str) return '';
  return new Date(str).toLocaleString('en-GB');
}
function VisitorsScreen({
  notify
}) {
  const [rows, setRows] = React.useState(window.IL_DATA.visitors);
  const [q, setQ] = React.useState('');
  const [qName, setQName] = React.useState('');
  const [qGrade, setQGrade] = React.useState('');
  const [current, setCurrent] = React.useState(null);
  const [form, setForm] = React.useState({
    id: null,
    name: '',
    surname: '',
    is_student: false,
    grade: 0,
    keys: []
  });
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
  const select = row => {
    setCurrent(row);
    setForm({
      id: row.id,
      name: row.name,
      surname: row.surname,
      is_student: row.is_student,
      grade: row.grade || 0,
      keys: [...row.keys]
    });
  };
  const reset = () => {
    setCurrent(null);
    setForm({
      id: null,
      name: '',
      surname: '',
      is_student: false,
      grade: 0,
      keys: []
    });
    setNewKey('');
  };
  const save = () => {
    notify('success', form.id ? 'Visitor updated' : 'Visitor created');
    reset();
  };
  const addKey = () => {
    if (!newKey.trim()) return;
    setForm(f => ({
      ...f,
      keys: [...f.keys, newKey.trim().toUpperCase()]
    }));
    notify('success', 'RFID added');
    setNewKey('');
  };
  const removeKey = k => {
    setForm(f => ({
      ...f,
      keys: f.keys.filter(x => x !== k)
    }));
    notify('success', 'RFID removed');
  };
  const submitTrack = () => {
    notify('success', 'Visitor was ' + (action === 'sign_in' ? 'signed in' : 'signed out') + ' successfully');
    setTrackRow(null);
    setReason('');
  };
  const doDelete = () => {
    setRows(rs => rs.filter(r => r.id !== confirmRow.id));
    notify('success', 'Visitor deleted');
    if (current && current.id === confirmRow.id) reset();
    setConfirmRow(null);
  };
  const trackMeta = action === 'sign_in' ? {
    badge: 'Sign In',
    intent: 'success',
    title: 'Register arrival',
    hint: 'Use this when the visitor has arrived and needs a manual check-in.',
    submit: 'Sign In Visitor',
    ph: 'Example: Visitor arrived at reception and forgot to scan.'
  } : {
    badge: 'Sign Out',
    intent: 'danger',
    title: 'Register departure',
    hint: 'Use this when the visitor has left and needs a manual check-out.',
    submit: 'Sign Out Visitor',
    ph: 'Example: Visitor left the building without scanning at the exit.'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) var(--il-side-panel-width)',
      gap: 16,
      padding: 20,
      background: 'var(--il-surface-page)',
      minHeight: '100%',
      animation: 'il-fade-up var(--il-dur-enter) var(--il-ease)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    header: /*#__PURE__*/React.createElement("b", null, "Visitors"),
    bodyStyle: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    value: q,
    onChange: setQ,
    placeholder: "Search by name or surname",
    clearable: true,
    iconBase: IB
  }), /*#__PURE__*/React.createElement(Input, {
    value: qName,
    onChange: setQName,
    placeholder: "Search by name",
    clearable: true,
    iconBase: IB
  }), /*#__PURE__*/React.createElement(Input, {
    value: qGrade,
    onChange: setQGrade,
    placeholder: "Search by grade",
    clearable: true,
    iconBase: IB
  })), /*#__PURE__*/React.createElement(DataTable, {
    data: filtered,
    currentRow: current,
    onRowClick: select,
    empty: "No data found",
    columns: [{
      label: '',
      width: 60,
      render: r => /*#__PURE__*/React.createElement(Avatar, {
        src: r.image,
        size: 40
      })
    }, {
      label: 'ID',
      prop: 'id',
      width: 62
    }, {
      label: 'Name',
      prop: 'name',
      width: 110
    }, {
      label: 'Surname',
      prop: 'surname',
      width: 130
    }, {
      label: 'RFID Count',
      width: 96,
      render: r => r.keys.length
    }, {
      label: 'Student',
      width: 84,
      render: r => r.is_student ? /*#__PURE__*/React.createElement(Tag, {
        type: "success",
        size: "small"
      }, "Yes") : /*#__PURE__*/React.createElement(Tag, {
        type: "info",
        size: "small"
      }, "No")
    }, {
      label: 'Grade',
      width: 68,
      render: r => r.is_student ? r.grade : ''
    }, {
      label: 'Updated',
      width: 150,
      render: r => fmt(r.updated_at)
    }, {
      label: '',
      width: 56,
      align: 'center',
      render: r => /*#__PURE__*/React.createElement(Button, {
        type: "primary",
        circle: true,
        size: "small",
        onClick: () => {
          setTrackRow(r);
          setAction('sign_in');
          setReason('');
        },
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "location",
          size: 12,
          base: IB,
          color: "#fff"
        })
      })
    }, {
      label: '',
      width: 56,
      align: 'center',
      render: r => /*#__PURE__*/React.createElement(Button, {
        type: "danger",
        circle: true,
        size: "small",
        onClick: () => setConfirmRow(r),
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "delete",
          size: 12,
          base: IB,
          color: "#fff"
        })
      })
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    header: /*#__PURE__*/React.createElement("b", null, form.id ? 'Edit Visitor' : 'Create Visitor')
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: 120,
    style: {
      marginBottom: 8
    }
  }), form.id && /*#__PURE__*/React.createElement(FileUploadRow, {
    fileName: null,
    onChoose: () => {}
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "Name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    value: form.name,
    onChange: v => setForm(f => ({
      ...f,
      name: v
    })),
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Surname",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    value: form.surname,
    onChange: v => setForm(f => ({
      ...f,
      surname: v
    })),
    iconBase: IB
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Is Student"
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: form.is_student,
    onChange: v => setForm(f => ({
      ...f,
      is_student: v
    }))
  })), form.is_student && /*#__PURE__*/React.createElement(FormField, {
    label: "Grade"
  }, /*#__PURE__*/React.createElement(InputNumber, {
    value: form.grade,
    onChange: v => setForm(f => ({
      ...f,
      grade: v
    })),
    min: 0,
    iconBase: IB
  })), form.id && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormField, {
    label: "RFID Add"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Input, {
    value: newKey,
    onChange: setNewKey,
    iconBase: IB
  }), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: addKey,
    style: {
      flex: '0 0 80px'
    }
  }, "Add"))), form.keys.length > 0 && /*#__PURE__*/React.createElement(DataTable, {
    style: {
      marginBottom: 12
    },
    data: form.keys.map(k => ({
      key: k
    })),
    columns: [{
      label: 'RFID',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--il-font-mono)'
        }
      }, r.key)
    }, {
      label: '',
      width: 62,
      align: 'center',
      render: r => /*#__PURE__*/React.createElement(Button, {
        size: "small",
        type: "danger",
        onClick: () => removeKey(r.key)
      }, "X")
    }]
  })), /*#__PURE__*/React.createElement(FormActions, null, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: save
  }, form.id ? 'Update' : 'Create'), /*#__PURE__*/React.createElement(Button, {
    onClick: reset
  }, "Reset"))), /*#__PURE__*/React.createElement(Dialog, {
    open: !!trackRow,
    title: "Track Visit",
    width: 560,
    onClose: () => setTrackRow(null),
    iconBase: IB,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      onClick: () => setTrackRow(null)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      type: trackMeta.intent,
      disabled: !reason.trim(),
      onClick: submitTrack
    }, trackMeta.submit))
  }, trackRow && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '4px 4px 0'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: trackRow.image,
    size: 88
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Tag, {
    type: trackMeta.intent,
    effect: "dark",
    round: true
  }, trackMeta.badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      lineHeight: 1.2,
      color: 'var(--il-text-dialog)'
    }
  }, trackRow.name, " ", trackRow.surname), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#111827'
    }
  }, trackMeta.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--il-text-dialog-soft)'
    }
  }, trackMeta.hint))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: 'var(--il-tracking-label)',
      textTransform: 'uppercase',
      color: '#374151'
    }
  }, "Action"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(ActionChoiceCard, {
    badge: "Sign In",
    title: "Register arrival",
    intent: "success",
    active: action === 'sign_in',
    onClick: () => setAction('sign_in')
  }), /*#__PURE__*/React.createElement(ActionChoiceCard, {
    badge: "Sign Out",
    title: "Register departure",
    intent: "danger",
    active: action === 'sign_out',
    onClick: () => setAction('sign_out')
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: 'var(--il-tracking-label)',
      textTransform: 'uppercase',
      color: '#374151'
    }
  }, "Reason"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: '#dc2626'
    }
  }, "Required")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--il-text-dialog-soft)'
    }
  }, "Add a short note so other administrators understand why this visit was recorded manually."), /*#__PURE__*/React.createElement(Textarea, {
    value: reason,
    onChange: setReason,
    rows: 4,
    placeholder: trackMeta.ph
  })))), /*#__PURE__*/React.createElement(ConfirmDialog, {
    open: !!confirmRow,
    title: "Confirm",
    intent: "warning",
    iconBase: IB,
    message: confirmRow ? 'Delete visitor "' + confirmRow.name + ' ' + confirmRow.surname + '"?' : '',
    confirmLabel: "Delete",
    onConfirm: doDelete,
    onCancel: () => setConfirmRow(null)
  }));
}
Object.assign(window, {
  VisitorsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/VisitorsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/data.js
try { (() => {
window.IL_DATA = {
  visitors: [{
    id: 101,
    name: 'Ada',
    surname: 'Lovelace',
    is_student: true,
    grade: 9,
    keys: ['A3F91B02', '7C21D4E8'],
    image: '',
    updated_at: '2026-09-02T08:41:00Z',
    sign_status: 'signed_in',
    imported_from_isams: false
  }, {
    id: 102,
    name: 'Grace',
    surname: 'Hopper',
    is_student: false,
    grade: null,
    keys: ['91FE2C77'],
    image: '',
    updated_at: '2026-09-02T07:58:00Z',
    sign_status: 'signed_out',
    imported_from_isams: false
  }, {
    id: 103,
    name: 'Alan',
    surname: 'Turing',
    is_student: true,
    grade: 11,
    keys: [],
    image: '',
    updated_at: '2026-09-01T16:02:00Z',
    sign_status: 'not_signed',
    imported_from_isams: true
  }, {
    id: 104,
    name: 'Katherine',
    surname: 'Johnson',
    is_student: true,
    grade: 7,
    keys: ['B0D5A311'],
    image: '',
    updated_at: '2026-09-02T08:12:00Z',
    sign_status: 'signed_in',
    imported_from_isams: false
  }, {
    id: 105,
    name: 'Tim',
    surname: 'Berners-Lee',
    is_student: false,
    grade: null,
    keys: ['44C8E90A', '2B77F103'],
    image: '',
    updated_at: '2026-09-02T06:30:00Z',
    sign_status: 'signed_out',
    imported_from_isams: false
  }, {
    id: 106,
    name: 'Radia',
    surname: 'Perlman',
    is_student: true,
    grade: 12,
    keys: ['D91C2E45'],
    image: '',
    updated_at: '2026-08-29T14:20:00Z',
    sign_status: 'not_signed',
    imported_from_isams: true
  }],
  admins: [{
    id: 1,
    username: 'admin',
    name: 'Alex',
    surname: 'Morgan',
    role: 'admin',
    is_active: true,
    created_at: '2025-11-04T09:00:00Z',
    updated_at: '2026-08-30T11:24:00Z'
  }, {
    id: 2,
    username: 'reception',
    name: 'Priya',
    surname: 'Nair',
    role: 'admin',
    is_active: true,
    created_at: '2026-01-15T10:30:00Z',
    updated_at: '2026-07-02T15:41:00Z'
  }, {
    id: 3,
    username: 'gate-terminal',
    name: 'Main',
    surname: 'Entrance',
    role: 'terminal',
    is_active: true,
    created_at: '2026-02-02T08:00:00Z',
    updated_at: '2026-02-02T08:00:00Z'
  }, {
    id: 4,
    username: 'j.doe',
    name: 'Jordan',
    surname: 'Doe',
    role: 'admin',
    is_active: false,
    created_at: '2026-03-19T13:10:00Z',
    updated_at: '2026-06-11T09:05:00Z'
  }],
  attendance: [{
    id: 101,
    name: 'Ada',
    surname: 'Lovelace',
    is_student: true,
    grade: 9,
    check_in: '08:41',
    check_out: '15:32',
    hours: 6.85,
    entry_status: 'on_time',
    days_present: 19,
    days_total: 20
  }, {
    id: 104,
    name: 'Katherine',
    surname: 'Johnson',
    is_student: true,
    grade: 7,
    check_in: '08:12',
    check_out: '15:30',
    hours: 7.3,
    entry_status: 'on_time',
    days_present: 20,
    days_total: 20
  }, {
    id: 106,
    name: 'Radia',
    surname: 'Perlman',
    is_student: true,
    grade: 12,
    check_in: '09:14',
    check_out: '15:28',
    hours: 6.23,
    entry_status: 'late',
    days_present: 16,
    days_total: 20
  }, {
    id: 103,
    name: 'Alan',
    surname: 'Turing',
    is_student: true,
    grade: 11,
    check_in: '09:02',
    check_out: '12:40',
    hours: 3.63,
    entry_status: 'early_leave',
    days_present: 14,
    days_total: 20
  }, {
    id: 102,
    name: 'Grace',
    surname: 'Hopper',
    is_student: false,
    grade: null,
    check_in: '07:58',
    check_out: '16:44',
    hours: 8.77,
    entry_status: 'on_time',
    days_present: 20,
    days_total: 20
  }, {
    id: 105,
    name: 'Tim',
    surname: 'Berners-Lee',
    is_student: false,
    grade: null,
    check_in: '',
    check_out: '',
    hours: 0,
    entry_status: 'absent',
    days_present: 11,
    days_total: 20
  }, {
    id: 107,
    name: 'Barbara',
    surname: 'Liskov',
    is_student: false,
    grade: null,
    check_in: '08:26',
    check_out: '17:05',
    hours: 8.65,
    entry_status: 'on_time',
    days_present: 18,
    days_total: 20
  }, {
    id: 108,
    name: 'Margaret',
    surname: 'Hamilton',
    is_student: true,
    grade: 10,
    check_in: '09:31',
    check_out: '15:29',
    hours: 5.97,
    entry_status: 'late',
    days_present: 15,
    days_total: 20
  }],
  themeSlots: [{
    key: 'favicon',
    label: 'Favicon',
    help: 'Browser tab icon used on the tracking page.',
    accepted: 'PNG',
    preview: '../../assets/app-icon.png',
    is_custom: false,
    updated_at: ''
  }, {
    key: 'logo_background',
    label: 'Logo background',
    help: 'Large background image shown on the welcome screen.',
    accepted: 'PNG, JPEG, WEBP',
    preview: '../../assets/logo.png',
    is_custom: true,
    updated_at: '30/08/2026, 11:24'
  }, {
    key: 'welcome_animation',
    label: 'Welcome animation',
    help: 'Animation shown after a successful sign-in event.',
    accepted: 'GIF',
    preview: '../../assets/logo.png',
    is_custom: false,
    updated_at: ''
  }, {
    key: 'goodbye_animation',
    label: 'Goodbye animation',
    help: 'Animation shown after a successful sign-out event.',
    accepted: 'GIF',
    preview: '../../assets/logo.png',
    is_custom: false,
    updated_at: ''
  }]
};

/* Deterministic per-day attendance for the matrix view — same person + same date
   always yields the same record, so scrolling and refiltering stay stable. */
(() => {
  const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const seed = (id, key) => {
    let h = id * 7919 + 13;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 99991;
    return h / 99991;
  };
  const hm = v => String(Math.floor(v)).padStart(2, '0') + ':' + String(Math.round(v % 1 * 60)).padStart(2, '0');
  const TODAY = new Date();
  TODAY.setHours(0, 0, 0, 0);
  window.IL_DATA.iso = iso;
  window.IL_DATA.hm = hm;

  /* state: weekend | future | absent | active | late | complete */
  window.IL_DATA.attendanceDay = (person, date) => {
    const key = iso(date);
    const dow = date.getDay();
    if (dow === 0 || dow === 6) return {
      state: 'weekend',
      key
    };
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    if (day > TODAY) return {
      state: 'future',
      key
    };
    const r = seed(person.id, key);
    const rate = person.days_present / person.days_total;
    if (r > rate) return {
      state: 'absent',
      key
    };
    const checkIn = 8.05 + r * 1.5;
    const late = checkIn >= 9;
    if (day.getTime() === TODAY.getTime() && r < 0.55) {
      return {
        state: 'active',
        key,
        checkIn,
        checkInLabel: hm(checkIn)
      };
    }
    const hours = 5.6 + r * 3.4;
    return {
      state: late ? 'late' : 'complete',
      key,
      checkIn,
      checkInLabel: hm(checkIn),
      checkOut: checkIn + hours,
      checkOutLabel: hm(checkIn + hours),
      hours
    };
  };
  window.IL_DATA.eachDay = (from, to, cap = 45) => {
    const out = [];
    if (!from || !to) return out;
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    while (d <= end && out.length < cap) {
      out.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return out;
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AVATAR_PLACEHOLDER = __ds_scope.AVATAR_PLACEHOLDER;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardSubtitle = __ds_scope.CardSubtitle;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.KpiStat = __ds_scope.KpiStat;

__ds_ns.Legend = __ds_scope.Legend;

__ds_ns.MiniBar = __ds_scope.MiniBar;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.PivotGrid = __ds_scope.PivotGrid;

__ds_ns.SkeletonItem = __ds_scope.SkeletonItem;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.StatusTag = __ds_scope.StatusTag;

__ds_ns.SIGN_STATUS_ORDER = __ds_scope.SIGN_STATUS_ORDER;

__ds_ns.TableToolbar = __ds_scope.TableToolbar;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.ConfirmDialog = __ds_scope.ConfirmDialog;

__ds_ns.Message = __ds_scope.Message;

__ds_ns.MessageStack = __ds_scope.MessageStack;

__ds_ns.Popover = __ds_scope.Popover;

__ds_ns.DateRangePicker = __ds_scope.DateRangePicker;

__ds_ns.DATE_PRESETS = __ds_scope.DATE_PRESETS;

__ds_ns.FileUploadRow = __ds_scope.FileUploadRow;

__ds_ns.FormField = __ds_scope.FormField;

__ds_ns.FormActions = __ds_scope.FormActions;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.InputNumber = __ds_scope.InputNumber;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.PageHeader = __ds_scope.PageHeader;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

__ds_ns.SidebarMenu = __ds_scope.SidebarMenu;

__ds_ns.SidebarFooterButton = __ds_scope.SidebarFooterButton;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Topbar = __ds_scope.Topbar;

__ds_ns.ActionChoiceCard = __ds_scope.ActionChoiceCard;

__ds_ns.AssetSlotCard = __ds_scope.AssetSlotCard;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.FilterBar = __ds_scope.FilterBar;

__ds_ns.FilterItem = __ds_scope.FilterItem;

__ds_ns.FilterChip = __ds_scope.FilterChip;

__ds_ns.HelpPanel = __ds_scope.HelpPanel;

__ds_ns.PillButton = __ds_scope.PillButton;

})();
