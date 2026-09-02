/** Top-centred transient toast — the app's only success/error channel. */
export interface MessageProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  children?: React.ReactNode;
  onClose?: () => void;
  iconBase?: string;
  style?: React.CSSProperties;
}
export function Message(props: MessageProps): JSX.Element;
export function MessageStack(props: { messages?: { id: any; type?: string; text: React.ReactNode }[]; iconBase?: string }): JSX.Element;
