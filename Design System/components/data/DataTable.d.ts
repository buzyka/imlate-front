/**
 * Bordered data grid: slate-tinted sticky-feeling header, hover wash, click-to-edit rows, empty state.
 *
 */
export interface DataTableColumn {
  label: React.ReactNode;
  /** Field name; required for `sortable`. */
  prop?: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  /** Custom cell renderer — use for Tags, Avatars and row action buttons. */
  render?: (row: any, index: number) => React.ReactNode;
}
export interface DataTableProps {
  columns: DataTableColumn[];
  data: any[];
  /** Return `signed-in` | `signed-out` | `not-signed` to apply the status row wash. */
  rowClass?: (row: any) => string | undefined;
  /** Selecting a row loads it into the side edit form — the app's core interaction. */
  onRowClick?: (row: any) => void;
  currentRow?: any;
  /** Empty-state copy. ImLate uses "No data found". */
  empty?: React.ReactNode;
  style?: React.CSSProperties;
}
export function DataTable(props: DataTableProps): JSX.Element;
