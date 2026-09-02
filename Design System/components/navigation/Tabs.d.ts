/** In-card section switcher (Settings → Theme). Underline style, 40px tall. */
export interface TabItem { name: string; label: string; content?: React.ReactNode }
export interface TabsProps {
  tabs: TabItem[];
  active?: string;
  onChange?: (name: string) => void;
  style?: React.CSSProperties;
}
export function Tabs(props: TabsProps): JSX.Element;
