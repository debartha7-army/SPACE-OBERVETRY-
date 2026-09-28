import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Calendar, Clock, MapPin, Telescope, Bookmark, Sparkles, Bell, ExternalLink } from 'lucide-react';

export const EventTimeline = ({
  events = [],
  reminders = [],
  onToggleReminder,
  onSelectEvent,
  onEditEvent,
  onDeleteEvent
}) => {
  const { isBookmarked, toggleBookmark, isAdmin } = useAuth();

  const getCountdown = (eventDateStr) => {
    try {
      const now = new Date();
      const target = new Date(eventDateStr);
      const diffTime = target - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        return `${diffDays} days away`;
      } else if (diffDays === 0) {
        return 'Occurring Today!';
      } else {
        return `${Math.abs(diffDays)} days ago`;
      }
    } catch {
      return '';
    }
  };

  const getBadgeColor = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('eclipse')) return 'rose';
    if (t.includes('meteor')) return 'cyan';
    if (t.includes('conjunction') || t.includes('opposition')) return 'gold';
    if (t.includes('supernova')) return 'purple';
    return 'emerald';
  };

  if (events.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <Sparkles size={36} color="var(--cyan-primary)" style={{ margin: '0 auto 1rem' }} />
        <h3>No celestial events matched your filters</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Try clearing your search filters or check back later for astronomical updates.
        </p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
      {/* Vertical Celestial Rail Line */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        bottom: '2rem',
        left: '6px',
        width: '3px',
        background: 'linear-gradient(to bottom, #38bdf8 0%, #6366f1 50%, rgba(56, 189, 248, 0.1) 100%)',
        borderRadius: '2px'
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {events.map((evt) => {
          const bookmarked = isBookmarked('celestial_events', evt.id);
          const hasReminder = reminders.includes(evt.id);
          const badgeColor = getBadgeColor(evt.type);
          const countdown = getCountdown(evt.event_date);

          return (
            <div
              key={evt.id}
              className="glass-panel"
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'minmax(200px, 300px) 1fr',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                transition: 'all var(--transition-smooth)',
                cursor: 'pointer'
              }}
              onClick={() => onSelectEvent(evt)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                e.currentTarget.style.transform = 'translateX(6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              {/* Timeline Node Orb */}
              <div style={{
                position: 'absolute',
                top: '24px',
                left: '-1.5rem',
                transform: 'translateX(-50%)',
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#38bdf8',
                boxShadow: '0 0 12px #38bdf8',
                border: '2px solid #05070e',
                zIndex: 2
              }} />

              {/* Event Image */}
              <div style={{
                position: 'relative',
                minHeight: '200px',
                backgroundColor: '#0c1222'
              }}>
                <img
                  src={evt.image_url || '/images/events/total_solar_eclipse.jpg'}
                  alt={evt.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, transparent 50%, rgba(10, 14, 28, 0.9) 100%)'
                }} />
                
                {/* Countdown Badge on Image */}
                {countdown && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0.85rem',
                    left: '0.85rem',
                    background: 'rgba(5, 7, 14, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--cyan-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <Clock size={12} />
                    <span>{countdown}</span>
                  </div>
                )}
              </div>

              {/* Event Details Content */}
              <div style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                      <span className={`badge badge-${badgeColor}`}>
                        {evt.type}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-heading)' }}>
                      {evt.title}
                    </h3>
                  </div>

                  {/* Actions: Reminder & Bookmark */}
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <button
                      onClick={(e) => onToggleReminder && onToggleReminder(evt.id, evt.title, e)}
                      title={hasReminder ? 'Reminder Active' : 'Set Event Reminder'}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: hasReminder ? 'rgba(251, 191, 36, 0.9)' : 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: hasReminder ? '#05070e' : 'var(--text-body)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Bell size={16} fill={hasReminder ? '#05070e' : 'none'} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark('celestial_events', evt.id, evt.title);
                      }}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: bookmarked ? 'rgba(56, 189, 248, 0.9)' : 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: bookmarked ? '#05070e' : 'var(--text-body)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Bookmark size={16} fill={bookmarked ? '#05070e' : 'none'} />
                    </button>
                  </div>
                </div>

                {/* Key Event Metadata Row */}
                <div style={{
                  display: 'flex',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={15} color="var(--cyan-primary)" />
                    <span>{evt.event_date}</span>
                  </div>

                  {evt.visibility_region && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={15} color="var(--purple-accent)" />
                      <span>{evt.visibility_region}</span>
                    </div>
                  )}

                  {evt.source_url && (
                    <a
                      href={evt.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--cyan-primary)' }}
                    >
                      NASA / Source <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.55,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {evt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .glass-panel[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
