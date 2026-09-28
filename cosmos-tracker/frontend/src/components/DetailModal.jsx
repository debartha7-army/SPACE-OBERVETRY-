import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  X, 
  Bookmark, 
  Telescope, 
  Sparkles, 
  Compass, 
  Info, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Edit3,
  Trash2
} from 'lucide-react';

export const DetailModal = ({
  item,
  type,
  onClose,
  onEdit,
  onDelete
}) => {
  const { isBookmarked, toggleBookmark, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const bookmarked = isBookmarked(type, item.id);
  const title = item.name || item.title || 'Celestial Mystery';
  const subtitle = item.constellation || item.category || item.event_type || item.galaxy_type || '';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 14, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'rgba(10, 14, 28, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Modal Hero Banner Image */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '280px',
          backgroundColor: '#080c18',
          overflow: 'hidden'
        }}>
          <img
            src={item.image_url || '/images/galaxies/andromeda.jpg'}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10, 14, 28, 1) 0%, rgba(10, 14, 28, 0.4) 60%, rgba(10, 14, 28, 0.2) 100%)'
          }} />

          {/* Close & Action Buttons */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            display: 'flex',
            gap: '0.65rem',
            zIndex: 10
          }}>
            <button
              onClick={() => toggleBookmark(type, item.id, title)}
              title={bookmarked ? 'Remove Watchlist' : 'Add Watchlist'}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: bookmarked ? 'rgba(56, 189, 248, 0.9)' : 'rgba(5, 7, 14, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: bookmarked ? '#05070e' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Bookmark size={18} fill={bookmarked ? '#05070e' : 'none'} />
            </button>

            <button
              onClick={onClose}
              title="Close modal"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(5, 7, 14, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Header Title on Image */}
          <div style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '1.75rem',
            right: '1.75rem'
          }}>
            {subtitle && (
              <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
                {subtitle}
              </span>
            )}
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
              color: '#ffffff',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}>
              {title}
            </h2>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0 1.75rem',
          backgroundColor: 'rgba(15, 23, 42, 0.5)'
        }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '0.9rem 1.25rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'overview' ? '2px solid var(--cyan-primary)' : '2px solid transparent',
              color: activeTab === 'overview' ? 'var(--cyan-primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Overview & Summary
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            style={{
              padding: '0.9rem 1.25rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'specs' ? '2px solid var(--cyan-primary)' : '2px solid transparent',
              color: activeTab === 'specs' ? 'var(--cyan-primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Astrophysical Data
          </button>
          <button
            onClick={() => setActiveTab('observing')}
            style={{
              padding: '0.9rem 1.25rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'observing' ? '2px solid var(--cyan-primary)' : '2px solid transparent',
              color: activeTab === 'observing' ? 'var(--cyan-primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Observation & Lore
          </button>
          {(item.moons !== undefined || item.major_moons || (item.moons_list && item.moons_list.length > 0)) && (
            <button
              onClick={() => setActiveTab('moons')}
              style={{
                padding: '0.9rem 1.25rem',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'moons' ? '2px solid var(--gold-accent)' : '2px solid transparent',
                color: activeTab === 'moons' ? 'var(--gold-accent)' : 'var(--text-muted)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>Moons & Satellites</span>
              <span className="badge badge-gold" style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>
                {item.moons !== undefined ? item.moons : (item.moons_list?.length || 0)}
              </span>
            </button>
          )}
        </div>

        {/* Modal Body Tabs Content */}
        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {activeTab === 'overview' && (
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
                About this Cosmic Entity
              </h4>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-body)', whiteSpace: 'pre-line' }}>
                {item.content || item.description || item.summary || item.notable_features || item.principles || 'Detailed astrophysical breakdown is being compiled by the observatory.'}
              </p>

              {item.details && (
                <div style={{
                  marginTop: '1.25rem',
                  padding: '1.25rem',
                  background: 'rgba(56, 189, 248, 0.05)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <h5 style={{ color: 'var(--cyan-primary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Mathematical Framework & Physical Details
                  </h5>
                  <p style={{ fontSize: '0.94rem', lineHeight: 1.65, color: '#e2e8f0', whiteSpace: 'pre-line' }}>
                    {item.details}
                  </p>
                </div>
              )}

              {(item.source_url || item.url) && (
                <div style={{ marginTop: '1.25rem' }}>
                  <a
                    href={item.source_url || item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', textDecoration: 'none' }}
                  >
                    <ExternalLink size={14} />
                    <span>Official Astronomical Source / Reference</span>
                  </a>
                </div>
              )}

              {item.excerpt && (
                <div style={{
                  marginTop: '1.25rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderLeft: '3px solid var(--purple-accent)',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                    "{item.excerpt}"
                  </p>
                </div>
              )}

              {item.tags && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="badge badge-purple" style={{ textTransform: 'none' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem'
            }}>
              {Object.entries(item).map(([key, val]) => {
                if (
                  ['id', 'created_at', 'updated_at', 'image_url', 'description', 'content', 'summary', 'details', 'principles', 'evidence', 'mythology', 'notable_features', 'notable_facts', 'tags', 'observatory_tips', 'source_url', 'url'].includes(key) ||
                  typeof val === 'object' ||
                  val === null ||
                  val === undefined
                ) {
                  return null;
                }

                const formatLabel = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                return (
                  <div key={key} style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {formatLabel}
                    </span>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-pure)', marginTop: '0.2rem' }}>
                      {String(val)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'observing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {item.observatory_tips && (
                <div style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.25)'
                }}>
                  <h4 style={{ color: 'var(--cyan-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Telescope size={18} /> Amateur Observer's Guide
                  </h4>
                  <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {item.observatory_tips}
                  </p>
                </div>
              )}

              {item.equipment_recommended && (
                <div style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <strong style={{ color: 'var(--gold-accent)' }}>Recommended Optics: </strong>
                  <span style={{ color: 'var(--text-body)' }}>{item.equipment_recommended}</span>
                </div>
              )}

              {item.mythology && (
                <div>
                  <h4 style={{ color: 'var(--purple-accent)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Sparkles size={18} /> Lore & Astrological Mythology
                  </h4>
                  <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {item.mythology}
                  </p>
                </div>
              )}

              {item.missions && (
                <div>
                  <h4 style={{ color: 'var(--cyan-primary)', marginBottom: '0.5rem' }}>
                    Historical Spacecraft Exploration
                  </h4>
                  <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {item.missions}
                  </p>
                </div>
              )}

              {item.discovery_method && (
                <div>
                  <h4 style={{ color: 'var(--gold-accent)', marginBottom: '0.5rem' }}>
                    Discovery & Confirmation
                  </h4>
                  <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {item.discovery_method}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'moons' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{
                background: 'rgba(251, 191, 36, 0.08)',
                border: '1px solid rgba(251, 191, 36, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h4 style={{ color: 'var(--gold-accent)', fontSize: '1.15rem', marginBottom: '0.25rem' }}>
                    {title} Satellite System
                  </h4>
                  <p style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                    Total Confirmed Natural Satellites: <strong>{item.moons !== undefined ? item.moons : 0}</strong>
                  </p>
                </div>
                {item.major_moons && (
                  <div style={{ maxWidth: '420px', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Key Satellites</span>
                    <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>{item.major_moons}</div>
                  </div>
                )}
              </div>

              {item.moons_list && item.moons_list.length > 0 ? (
                <div>
                  <h5 style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.85rem', letterSpacing: '0.05em' }}>
                    Featured Major Moons & Detailed Physical Parameters:
                  </h5>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.25rem'
                  }}>
                    {item.moons_list.map((moon, mIdx) => (
                      <div key={mIdx} style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <div style={{ height: '140px', position: 'relative', overflow: 'hidden', background: '#090d1a' }}>
                          <img
                            src={moon.image_url || '/images/moons/moon.jpg'}
                            alt={moon.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{
                            position: 'absolute',
                            bottom: '0.5rem',
                            left: '0.75rem',
                            background: 'rgba(10, 14, 28, 0.85)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            color: '#fff',
                            border: '1px solid rgba(255, 255, 255, 0.15)'
                          }}>
                            {moon.name}
                          </div>
                        </div>
                        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', background: 'rgba(0,0,0,0.25)', padding: '0.45rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                            <div>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', display: 'block' }}>DIAMETER</span>
                              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--cyan-primary)' }}>{moon.diameter_km}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', display: 'block' }}>PERIOD</span>
                              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gold-accent)' }}>{moon.orbital_period}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', display: 'block' }}>DISTANCE</span>
                              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#fff' }}>{moon.distance_km}</span>
                            </div>
                          </div>
                          <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.55 }}>
                            {moon.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: '2rem',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px dashed rgba(255, 255, 255, 0.1)'
                }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    {title} has 0 natural satellites. Solar gravitational proximity and tidal perturbation prevent stable orbital capture.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Admin Actions */}
        {isAdmin && (
          <div style={{
            marginTop: 'auto',
            padding: '1.25rem 1.75rem',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(5, 7, 14, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
              Administrator Permissions Active
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {onEdit && (
                <button
                  onClick={() => {
                    onClose();
                    onEdit(item);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <Edit3 size={15} /> Edit Cosmic Record
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to remove "${title}" from the database?`)) {
                      onDelete(item.id);
                      onClose();
                    }
                  }}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={15} /> Delete Entry
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
