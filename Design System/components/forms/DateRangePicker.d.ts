/**
 * Dual-calendar From/To range picker. Click once to anchor, once more to commit; the range previews on hover.
 * Pairs with SegmentedControl for Day/Week/Month presets.
 */
export interface DateRange { from: Date | null; to: Date | null }
export interface DateRangePickerProps {
  from?: Date | null;
  to?: Date | null;
  /** Fires only on the second (committing) click, and on clear. */
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  clearable?: boolean;
  iconBase?: string;
  style?: React.CSSProperties;
}
export function DateRangePicker(props: DateRangePickerProps): JSX.Element;
export namespace DateRangePicker {
  /** `YYYY-MM-DD — YYYY-MM-DD`. Reach it as `DateRangePicker.format` from the bundle. */
  function format(range: DateRange): string;
  /** Single date as `YYYY-MM-DD`. */
  function iso(date: Date | null): string;
  const PRESETS: Record<'day' | 'week' | 'month', () => DateRange>;
}
/** `day` | `week` (Mon–Sun) | `month` → DateRange, relative to today. */
export const DATE_PRESETS: Record<'day' | 'week' | 'month', () => DateRange>;
/** `YYYY-MM-DD — YYYY-MM-DD`, matching the backend's reports query format. */
export function formatRange(range: DateRange): string;
