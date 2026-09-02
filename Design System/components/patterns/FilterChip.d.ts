/** Removable "label: value" pill summarising one applied filter. */
export interface FilterChipProps {
  /** Filter name, rendered grey with a colon. */
  label: string;
  /** Applied value, rendered semibold. */
  value: React.ReactNode;
  /** Omit to render a read-only chip. */
  onRemove?: () => void;
  iconBase?: string;
  style?: React.CSSProperties;
}
export function FilterChip(props: FilterChipProps): JSX.Element;
