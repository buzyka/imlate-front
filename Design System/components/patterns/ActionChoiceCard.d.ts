/**
 * Radio-like choice tile used inside dialogs instead of radio buttons.
 *
 */
export interface ActionChoiceCardProps {
  /** Bold primary label, e.g. "Sign In". */
  badge: React.ReactNode;
  /** Secondary line, e.g. "Register arrival". */
  title: React.ReactNode;
  /** Drives the selection ring colour. */
  intent?: 'success' | 'danger';
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function ActionChoiceCard(props: ActionChoiceCardProps): JSX.Element;
