/** Strip above a DataTable: search-within-results, row count, export actions. */
export interface TableToolbarProps {
  query?: string;
  onQueryChange?: (value: string) => void;
  placeholder?: string;
  /** Row count after filtering. */
  count?: number;
  countLabel?: string;
  /** Extra controls, placed left of the export buttons. */
  actions?: React.ReactNode;
  onExportCsv?: () => void;
  onExportPdf?: () => void;
  iconBase?: string;
  style?: React.CSSProperties;
}
export function TableToolbar(props: TableToolbarProps): JSX.Element;
