/** Compact key explaining cell tints or dot colours. Sits directly above the grid it describes. */
export interface LegendItem {
  label: React.ReactNode;
  /** Fill colour. Omit for a "blank means X" entry. */
  swatch?: string;
  /** Explicit border — use when the swatch is very pale. */
  border?: string;
  /** Render as an 8px dot instead of a 16×14 tile. */
  dot?: boolean;
  /** Trailing muted clarification. */
  hint?: React.ReactNode;
}
export interface LegendProps { items: LegendItem[]; style?: React.CSSProperties }
export function Legend(props: LegendProps): JSX.Element;
