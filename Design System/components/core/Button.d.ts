/**
 * ImLate action button — Element Plus button geometry (32px default height, 4px radius).
 *
 */
export interface ButtonProps {
  /** Visual intent. `default` is the neutral bordered button. */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'large' | 'default' | 'small';
  /** Tinted low-emphasis fill (light-9 bg, light-5 border). */
  plain?: boolean;
  /** Borderless label button — used for the username in the topbar. */
  text?: boolean;
  /** Icon-only round button — used for row actions in tables. */
  circle?: boolean;
  /** Pill radius — used for the dashboard hero CTAs. */
  round?: boolean;
  disabled?: boolean;
  /** Replaces the icon with a spinner and blocks clicks. */
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
