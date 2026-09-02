/** Numeric stepper with right-hand controls (grade, animation seconds). */
export interface InputNumberProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Decimal places to clamp to — 1 for the animation-duration fields. */
  precision?: number;
  disabled?: boolean;
  iconBase?: string;
  style?: React.CSSProperties;
}
export function InputNumber(props: InputNumberProps): JSX.Element;
