/** 36px sticky header. Deliberately minimal: identity on the right, nothing else. */
export interface TopbarProps {
  /** Shown as a text button linking to the profile view. */
  userName?: string;
  onProfile?: () => void;
  onLogout?: () => void;
  /** Optional left-aligned slot (breadcrumb / page title). */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Topbar(props: TopbarProps): JSX.Element;
