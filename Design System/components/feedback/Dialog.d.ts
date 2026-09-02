/**
 * Centred modal. 560px for task dialogs, 420px for confirmations. Backdrop click does not close task dialogs.
 *
 */
export interface DialogProps {
  open: boolean;
  title?: React.ReactNode;
  width?: number;
  onClose?: () => void;
  /** Buttons, right-aligned: Cancel then the intent-coloured confirm. */
  footer?: React.ReactNode;
  iconBase?: string;
  children?: React.ReactNode;
}
export interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  /** One sentence, quotes the record: `Delete visitor "Ada Lovelace"?` */
  message?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  intent?: 'warning' | 'danger' | 'info' | 'success';
  onConfirm?: () => void;
  onCancel?: () => void;
  iconBase?: string;
}
export function Dialog(props: DialogProps): JSX.Element | null;
export function ConfirmDialog(props: ConfirmDialogProps): JSX.Element | null;
