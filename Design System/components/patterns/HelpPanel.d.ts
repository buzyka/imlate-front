/** Contents of the sidebar Help popover: product blurb, versions, doc link tiles. */
export interface HelpPanelProps {
  title?: string;
  description?: React.ReactNode;
  uiVersion?: string;
  /** "loading..." while fetching, "unavailable" on failure. */
  serverVersion?: string;
  links?: { label: string; href: string; icon?: React.ReactNode }[];
  style?: React.CSSProperties;
}
export function HelpPanel(props: HelpPanelProps): JSX.Element;
