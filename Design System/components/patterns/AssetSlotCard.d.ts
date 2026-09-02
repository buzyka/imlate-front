/**
 * Theme asset slot: preview on a cool diagonal wash, Custom/Default tag, Upload + Reset pair.
 *
 */
export interface AssetSlotCardProps {
  /** Slot name — Favicon, Logo background, Welcome animation, Goodbye animation. */
  label: string;
  /** One-sentence explanation of where the asset appears. */
  help: React.ReactNode;
  previewSrc: string;
  /** Upper-cased MIME list, e.g. "PNG, JPEG, WEBP". */
  accepted: string;
  updatedAt?: string;
  /** False means the backend default is still in place; Reset is then disabled. */
  isCustom?: boolean;
  uploading?: boolean;
  resetting?: boolean;
  onUpload?: () => void;
  onReset?: () => void;
  style?: React.CSSProperties;
}
export function AssetSlotCard(props: AssetSlotCardProps): JSX.Element;
