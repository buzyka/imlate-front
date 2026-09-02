import React from 'react';
import { Button } from '../core/Button.jsx';

export function FileUploadRow({ fileName, uploading = false, onChoose, onUpload, chooseLabel = 'Choose Image', style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, ...style }}>
      <Button size="small" onClick={onChoose}>{chooseLabel}</Button>
      {fileName && <Button size="small" type="primary" loading={uploading} onClick={onUpload}>Upload</Button>}
      {fileName && <span style={{ fontFamily: 'var(--il-font-sans)', fontSize: 'var(--il-fs-meta)', color: '#666' }}>{fileName}</span>}
    </div>
  );
}
