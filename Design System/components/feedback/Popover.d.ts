/** Click-triggered panel anchored to a control — used for the sidebar Help panel. */
export interface PopoverProps {
  /** Controlled visibility. Omit for click-to-toggle. */
  open?: boolean;
  /** 320 for the Help panel. */
  width?: number;
  placement?: 'right-end' | 'bottom-start';
  /** The trigger element. */
  children?: React.ReactNode;
  content?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Popover(props: PopoverProps): JSX.Element;
