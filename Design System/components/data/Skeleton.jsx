import React from 'react';

export function SkeletonItem({ variant = 'text', width, height, style }) {
  const h = height || (variant === 'h3' ? 20 : variant === 'rect' ? 32 : 16);
  return (
    <span style={{
      display: 'inline-block', width: width || '100%', height: h,
      background: 'var(--el-fill-color, #f2f2f2)',
      borderRadius: variant === 'circle' ? '50%' : 'var(--el-border-radius-base)',
      backgroundImage: 'linear-gradient(90deg,#f2f2f2 25%,#e6e6e6 37%,#f2f2f2 63%)',
      backgroundSize: '400% 100%',
      animation: 'il-skeleton 1.4s ease infinite', ...style
    }} />
  );
}

export function Skeleton({ rows = 4, columns, style }) {
  if (columns) {
    return (
      <div style={style}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} style={{ display: 'flex', gap: 12, padding: 12 }}>
            {columns.map((w, c) => <SkeletonItem key={c} width={w} />)}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gap: 12, ...style }}>
      {Array.from({ length: rows }).map((_, r) => <SkeletonItem key={r} width={r === rows - 1 ? '60%' : '100%'} />)}
    </div>
  );
}
