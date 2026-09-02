/** Element Plus SVG glyph rendered as a CSS mask so it inherits colour. */
export interface IconProps {
  /** File stem in assets/icons, e.g. `delete`, `location`, `question-filled`. */
  name: string;
  size?: number;
  color?: string;
  /** Path to the icons folder, relative to the page. */
  base?: string;
  style?: React.CSSProperties;
}
export function Icon(props: IconProps): JSX.Element;
