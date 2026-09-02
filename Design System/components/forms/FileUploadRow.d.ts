/** Two-step file picker: choose, then explicitly upload. ImLate never auto-uploads. */
export interface FileUploadRowProps {
  /** Name of the staged file; when set, the Upload button appears. */
  fileName?: string;
  uploading?: boolean;
  onChoose?: () => void;
  onUpload?: () => void;
  chooseLabel?: string;
  style?: React.CSSProperties;
}
export function FileUploadRow(props: FileUploadRowProps): JSX.Element;
