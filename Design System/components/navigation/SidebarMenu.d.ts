/**
 * The 180px left navigation: logo, flat menu, spacer, footer Help button. No collapse, no nesting.
 *
 */
export interface SidebarMenuItem {
  /** Route path, used as the identity and active key (e.g. `/users`). */
  index: string;
  label: string;
  icon?: React.ReactNode;
}
export interface SidebarMenuProps {
  items: SidebarMenuItem[];
  /** Current route path. */
  active?: string;
  onSelect?: (index: string) => void;
  /** Path to assets/logo.png — the full ImLate wordmark, full-width in the rail. */
  logoSrc?: string;
  logoHref?: string;
  /** Bottom-pinned content — the Help button. */
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}
export function SidebarMenu(props: SidebarMenuProps): JSX.Element;
export function SidebarFooterButton(props: { icon?: React.ReactNode; children?: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }): JSX.Element;
