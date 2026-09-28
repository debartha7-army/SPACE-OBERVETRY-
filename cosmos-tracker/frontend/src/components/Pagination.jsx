import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  limit = 10,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  const startIdx = (currentPage - 1) * limit + 1;
  const endIdx = Math.min(currentPage * limit, totalItems);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '2.5rem',
      paddingTop: '1.25rem',
      borderTop: '1px solid var(--border-subtle)',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
        Showing <strong style={{ color: '#fff' }}>{startIdx}</strong> - <strong style={{ color: '#fff' }}>{endIdx}</strong> of <strong style={{ color: '#fff' }}>{totalItems}</strong> entities
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            background: 'rgba(255, 255, 255, 0.04)',
            color: currentPage <= 1 ? 'var(--text-subtle)' : '#fff',
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem'
          }}
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
          <button
            key={pg}
            onClick={() => onPageChange(pg)}
            style={{
              width: 34,
              height: 34,
              borderRadius: 'var(--radius-sm)',
              border: pg === currentPage ? '1px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
              background: pg === currentPage ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              color: pg === currentPage ? 'var(--cyan-primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: pg === currentPage ? 700 : 500,
              fontSize: '0.85rem'
            }}
          >
            {pg}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            background: 'rgba(255, 255, 255, 0.04)',
            color: currentPage >= totalPages ? 'var(--text-subtle)' : '#fff',
            cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem'
          }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
