/** 1px rule separating sections inside a card (24px vertical rhythm). */
export interface DividerProps {
  vertical?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Divider(props: DividerProps): JSX.Element;
