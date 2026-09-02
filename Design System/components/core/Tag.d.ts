/**
 * Inline status/label chip. Light effect by default, dark for dialog hero badges.
 *
 */
export interface TagProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  effect?: 'light' | 'dark';
  size?: 'small' | 'default' | 'large';
  round?: boolean;
  /** 8px radius + 4px/10px padding — the `.status-tag` override used in report tables. */
  soft?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Tag(props: TagProps): JSX.Element;
