import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Bookmark, ArrowRight, Trash2, Edit3, Eye } from 'lucide-react';

export const Card = ({
  item,
  type, // 'event' | 'star' | 'planet' | 'galaxy' | 'black_hole' | 'theory' | 'article'
  title,
  subtitle,
  badgeText,
  badgeColor = 'cyan', // 'cyan' | 'purple' | 'gold' | 'emerald' | 'rose'
  imageUrl,
  metrics = [], // Array of { label: string, value: string }
  description,
  onSelect,
  onEdit,
  onDelete
}) => {
  const { isBookmarked, toggleBookmark, isAdmin } = useAuth();
  const bookmarked = isBookmarked(type, item.id);

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(type, item.id, title);
  };

  return (
    <div
      onClick={onSelect}
      className="glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth)',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
        e.currentTarget.style.boxShadow = '0 16px 36px -8px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      {/* Thumbnail Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '210px',
        overflow: 'hidden',
        backgroundColor: '#0c1222'
      }}>
        <img
          src={imageUrl || '/images/galaxies/andromeda.jpg'}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10, 14, 28, 0.95) 0%, rgba(10, 14, 28, 0.2) 60%, transparent 100%)'
        }} />

        {/* Top Badges and Action Icons */}
        <div style={{
          position: 'absolute',
          top: '0.85rem',
          left: '0.85rem',
          right: '0.85rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {badgeText && (
            <span className={`badge badge-${badgeColor}`}>
              {badgeText}
            </span>
          )}

          <div style={{ display: 'flex', gap: '0.4rem', marginLeft: 'auto' }}>
            <button
              onClick={handleBookmark}
              title={bookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: bookmarked ? 'rgba(56, 189, 248, 0.9)' : 'rgba(10, 14, 28, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: bookmarked ? '#05070e' : '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s'
              }}
            >
              <Bookmark size={16} fill={bookmarked ? '#05070e' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '0.75rem'
      }}>
        <div>
          <h3 style={{
            fontSize: '1.25rem',
            color: 'var(--text-heading)',
            marginBottom: '0.2rem',
            lineHeight: 1.3
          }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--cyan-primary)',
              fontWeight: 500
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Key Metrics Chips */}
        {metrics && metrics.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, 1fr)`,
            gap: '0.5rem',
            margin: '0.25rem 0'
          }}>
            {metrics.map((m, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem 0.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>
                  {m.label}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-pure)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {m.value || '—'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Short Description */}
        {description && (
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {description}
          </p>
        )}

        {/* Card Footer */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '0.85rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.85rem',
            color: 'var(--cyan-primary)',
            fontWeight: 600
          }}>
            Inspect deep sky <ArrowRight size={14} />
          </span>

          {isAdmin && (
            <div style={{ display: 'flex', gap: '0.35rem' }} onClick={(e) => e.stopPropagation()}>
              {onEdit && (
                <button
                  onClick={onEdit}
                  title="Admin Edit"
                  style={{
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: 'var(--cyan-primary)',
                    borderRadius: '4px',
                    padding: '0.3rem',
                    cursor: 'pointer'
                  }}
                >
                  <Edit3 size={14} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  title="Admin Delete"
                  style={{
                    background: 'rgba(244, 63, 94, 0.1)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    color: '#fb7185',
                    borderRadius: '4px',
                    padding: '0.3rem',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
