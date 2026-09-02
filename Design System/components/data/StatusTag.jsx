import React from 'react';
import { Tag } from '../core/Tag.jsx';

const MAP = {
  signed_in: { type: 'success', text: 'Signed in' },
  signed_out: { type: 'warning', text: 'Signed out' },
  not_signed: { type: 'info', text: 'Not signed' }
};

export function StatusTag({ status, soft = false }) {
  const m = MAP[status] || MAP.not_signed;
  return <Tag type={m.type} soft={soft}>{m.text}</Tag>;
}

export const SIGN_STATUS_ORDER = { signed_in: 1, signed_out: 2, not_signed: 3 };
