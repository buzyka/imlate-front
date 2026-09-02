/**
 * Text field. Carries ImLate's 10px radius override and the indigo hover/focus rings.
 *
 */
export interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  size?: 'small' | 'default' | 'large';
  disabled?: boolean;
  /** Adds the circle-close clear affordance — used on every search field. */
  clearable?: boolean;
  /** Adds the eye toggle (password fields). */
  showPassword?: boolean;
  /** Icon stem from assets/icons rendered before the text. */
  prefixIcon?: string;
  suffixIcon?: string;
  /** Path to assets/icons, forwarded to Icon. */
  iconBase?: string;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
