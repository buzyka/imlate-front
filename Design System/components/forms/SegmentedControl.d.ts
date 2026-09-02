/** Joined button group for 2–4 mutually exclusive options (Element Plus radio-button geometry). */
export interface SegmentedOption { label: React.ReactNode; value: any; icon?: React.ReactNode }
export interface SegmentedControlProps {
  value?: any;
  onChange?: (value: any) => void;
  options: SegmentedOption[];
  size?: 'small' | 'default' | 'large';
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
