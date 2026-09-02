/**
 * Brand-level CTA — the only place ImLate orange is used as a button fill.
 *
 */
export interface PillButtonProps {
  /** `brand` = orange fill, `alt` = navy outline. */
  variant?: 'brand' | 'alt';
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function PillButton(props: PillButtonProps): JSX.Element;
