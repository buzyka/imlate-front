/** Loading placeholder. ImLate shows skeletons on first load and a spinner overlay on refetch. */
export interface SkeletonItemProps {
  variant?: 'text' | 'h3' | 'rect' | 'circle';
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}
export interface SkeletonProps {
  rows?: number;
  /** Column widths — renders a table-shaped skeleton (Reports uses 8 rows). */
  columns?: (number | string)[];
  style?: React.CSSProperties;
}
export function SkeletonItem(props: SkeletonItemProps): JSX.Element;
export function Skeleton(props: SkeletonProps): JSX.Element;
