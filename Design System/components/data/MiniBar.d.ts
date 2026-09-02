/** Single-proportion bar for in-cell summaries (days present, attendance rate). */
export interface MiniBarProps {
  value?: number;
  max?: number;
  /** Uses the system status mapping — success for healthy, warning for partial. */
  intent?: 'success' | 'warning' | 'danger' | 'info' | 'primary';
  /** Short text after the bar, e.g. "18 / 20". */
  label?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}
export function MiniBar(props: MiniBarProps): JSX.Element;
