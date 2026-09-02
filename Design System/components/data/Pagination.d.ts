/** Server-side pager: prev, pager, next. Right-aligned below the table. */
export interface PaginationProps {
  page?: number;
  /** ImLate's server limit is 20. */
  pageSize?: number;
  total?: number;
  onChange?: (page: number) => void;
  iconBase?: string;
  style?: React.CSSProperties;
}
export function Pagination(props: PaginationProps): JSX.Element;
