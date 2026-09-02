/**
 * Dropdown; single or multi-select. Multi renders picks as info Tags inside the control.
 *
 */
export interface SelectOption { label: string; value: any }
export interface SelectProps {
  value?: any;
  onChange?: (value: any) => void;
  options?: SelectOption[];
  placeholder?: string;
  /** Multi-select — the grade filter on Reports. */
  multiple?: boolean;
  /** Disabled selects stay in place rather than being hidden (grade filter until Students is chosen). */
  disabled?: boolean;
  clearable?: boolean;
  iconBase?: string;
  style?: React.CSSProperties;
}
export function Select(props: SelectProps): JSX.Element;
