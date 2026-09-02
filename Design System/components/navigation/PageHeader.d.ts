/** Title + one-line description + right-aligned action, used as a Card header (Settings). */
export interface PageHeaderProps {
  title: React.ReactNode;
  /** Sentence-case, one line, ends with a period. */
  description?: React.ReactNode;
  actions?: React.ReactNode;
  style?: React.CSSProperties;
}
export function PageHeader(props: PageHeaderProps): JSX.Element;
/** Naked 18px slate label between cards ("Fire report"). */
export function SectionTitle(props: { children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element;
