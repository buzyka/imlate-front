/** Multi-line field. Used for the required manual-track reason note. */
export interface TextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  resize?: 'none' | 'vertical' | 'both';
  style?: React.CSSProperties;
}
export function Textarea(props: TextareaProps): JSX.Element;
