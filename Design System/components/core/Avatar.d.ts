/** Circular visitor photo with the app's inline "No image" placeholder. */
export interface AvatarProps {
  src?: string;
  /** 40 in table rows, 88 in the manual-track dialog, 120 in the edit form. */
  size?: number;
  alt?: string;
  style?: React.CSSProperties;
}
export function Avatar(props: AvatarProps): JSX.Element;
export const AVATAR_PLACEHOLDER: string;
