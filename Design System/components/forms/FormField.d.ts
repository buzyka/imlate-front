/**
 * Label + control + validation row. Left-aligned 120px labels in CRUD forms, top labels on Login and Settings.
 *
 */
export interface FormFieldProps {
  label?: React.ReactNode;
  /** Renders the red asterisk. */
  required?: boolean;
  /** Validation message, e.g. "Name is required". Replaces help text. */
  error?: string;
  /** Inline helper below the control. */
  help?: React.ReactNode;
  labelPosition?: 'left' | 'top';
  /** Use `--il-form-label-width` (120px) or `--il-form-label-width-lg` (160px). */
  labelWidth?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function FormField(props: FormFieldProps): JSX.Element;
export function FormActions(props: { labelWidth?: string; inline?: boolean; children?: React.ReactNode }): JSX.Element;
