/**
 * Single-number summary tile for the Quick Stats counters (signed in / signed out / not signed).
 *
 */
export interface KpiStatProps {
  label: string;
  value: React.ReactNode;
  /** Colours the number using the same status mapping as StatusTag. */
  intent?: 'neutral' | 'success' | 'warning' | 'info' | 'danger';
  hint?: React.ReactNode;
  style?: React.CSSProperties;
}
export function KpiStat(props: KpiStatProps): JSX.Element;
