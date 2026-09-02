/**
 * Horizontal filter row inside a card body: 12px gaps, wraps, 220px fixed-width controls.
 *
 */
export interface FilterBarProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function FilterBar(props: FilterBarProps): JSX.Element;
/** Fixed-width wrapper — defaults to `--il-filter-item-width` (220px). */
export function FilterItem(props: { width?: string; children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element;
