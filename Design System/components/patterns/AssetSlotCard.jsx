import React from 'react';
import { Card } from '../core/Card.jsx';
import { Tag } from '../core/Tag.jsx';
import { Button } from '../core/Button.jsx';

export function AssetSlotCard({ label, help, previewSrc, accepted, updatedAt, isCustom = false, uploading = false, resetting = false, onUpload, onReset, style }) {
  return (
    <Card shadow="hover" lift={false} style={style}
      header={<div><strong style={{ fontSize: 'var(--el-font-size-base)', color: 'var(--el-text-color-primary)' }}>{label}</strong>
        <p style={{ margin: '6px 0 0', color: 'var(--el-text-color-regular)', fontSize: 'var(--il-fs-help)', lineHeight: 'var(--il-lh-snug)' }}>{help}</p></div>}
      extra={<Tag type={isCustom ? 'success' : 'info'} size="small">{isCustom ? 'Custom' : 'Default'}</Tag>}
    >
      <div style={{
        border: '1px solid var(--el-border-color-lighter)', borderRadius: 'var(--il-radius-card)',
        overflow: 'hidden', background: 'var(--il-surface-asset)',
        minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12
      }}>
        <img src={previewSrc} alt={label} style={{ width: '100%', maxHeight: 240, objectFit: 'contain', display: 'block' }} />
      </div>
      <div style={{ display: 'grid', gap: 4, marginBottom: 12, color: 'var(--el-text-color-secondary)', fontSize: 'var(--il-fs-meta)' }}>
        <span>Accepted: {accepted}</span>
        {updatedAt && <span>Updated: {updatedAt}</span>}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button loading={uploading} onClick={onUpload}>Upload</Button>
        <Button type="danger" plain disabled={!isCustom} loading={resetting} onClick={onReset}>Reset</Button>
      </div>
    </Card>
  );
}
