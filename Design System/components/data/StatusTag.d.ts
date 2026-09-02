/** Attendance status chip. The status→colour mapping is fixed system-wide. */
export interface StatusTagProps {
  status: 'signed_in' | 'signed_out' | 'not_signed';
  /** 8px radius variant used inside report tables. */
  soft?: boolean;
}
export function StatusTag(props: StatusTagProps): JSX.Element;
/** Canonical sort weight: signed in → signed out → not signed. */
export const SIGN_STATUS_ORDER: Record<string, number>;
