/**
 * Matrix / pivot grid: sticky identity columns on the left, one generated column per period,
 * an optional sticky row-total column on the right, and a totals footer.
 * Scrolls horizontally inside its own bordered container.
 */
export interface PivotFixedColumn {
  label: React.ReactNode;
  /** Required — drives the sticky left offsets. */
  width: number;
  align?: 'left' | 'center' | 'right';
  prop?: string;
  render?: (row: any, index: number) => React.ReactNode;
  /** Supply to make the column sortable; returns the comparable value. */
  sortValue?: (row: any) => any;
}
export interface PivotColumn {
  /** Unique key, e.g. the ISO date. */
  key: string;
  /** Primary header line — the day number. */
  label: React.ReactNode;
  /** Secondary header line above the label — the weekday. */
  top?: React.ReactNode;
  /** Renders the column in a recessed tint (weekends, out-of-scope periods). */
  muted?: boolean;
}
export interface PivotCell {
  content?: React.ReactNode;
  /** Cell background — always a light-9/fill token, never a saturated colour. */
  tint?: string;
  /** Native tooltip with the precise values behind the cell. */
  title?: string;
}
export interface PivotGridProps {
  rows: any[];
  rowKey?: (row: any, index: number) => React.Key;
  /** Sticky left columns, in order. */
  fixed: PivotFixedColumn[];
  columns: PivotColumn[];
  /** Uniform width for every generated column. 62 reads well for day columns. */
  columnWidth?: number;
  renderCell?: (row: any, column: PivotColumn) => PivotCell | React.ReactNode;
  /** Sticky right-hand row total. */
  totalColumn?: { label: React.ReactNode; width?: number; render: (row: any) => React.ReactNode };
  /** Totals row. `label` lands in the second fixed column. */
  footer?: { label: React.ReactNode; render: (column: PivotColumn, rows: any[]) => React.ReactNode; total?: (rows: any[]) => React.ReactNode };
  empty?: React.ReactNode;
  /** Set to also scroll vertically inside the grid; the header row then sticks. */
  maxHeight?: number | string;
  style?: React.CSSProperties;
}
export function PivotGrid(props: PivotGridProps): JSX.Element;
