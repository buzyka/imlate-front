/**
 * The container every admin view is built from — 16px radius, hairline border, soft slate shadow.
 *
 */
export interface CardProps {
  /** Header content — usually `<b>Visitors</b>` or a title + CardSubtitle stack. */
  header?: React.ReactNode;
  /** Right-aligned header slot (Refresh button, status Tag). */
  extra?: React.ReactNode;
  shadow?: 'always' | 'hover' | 'never';
  /** Raise + deepen shadow on hover (list/link cards only). */
  lift?: boolean;
  bodyStyle?: React.CSSProperties;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
export function CardSubtitle(props: { children?: React.ReactNode }): JSX.Element;
