import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { EventTimeline } from '../components/EventTimeline.jsx';
import { Card } from '../components/Card.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { Calendar, Plus, List, Grid, Bell, BellOff } from 'lucide-react';

export const Events = ({ onSelectEvent, onOpenAdminModal }) => {
  const { isAdmin, isAuthenticated, showNotification } = useAuth();
  const [events, setEvents] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('timeline');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });

  const loadEvents = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.getEvents({
        page,
        limit: 10,
        type: activeFilter !== 'all' ? activeFilter : undefined,
        search: searchQuery || undefined
      });
      if (res.data.success) {
        setEvents(res.data.data || []);
        if (res.data.pagination) setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadReminders = async () => {
    if (isAuthenticated) {
      try {
        const res = await api.getReminders();
        if (res.data.success) {
          setReminders(res.data.data.map(r => r.event_id));
        }
      } catch (e) {
        // Ignore
      }
    }
  };

  useEffect(() => {
    loadEvents(currentPage);
    loadReminders();
  }, [activeFilter, currentPage, isAuthenticated]);

  const handleToggleReminder = async (eventId, title, e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      showNotification('Please log in to set celestial event reminders.', 'info');
      return;
    }

    try {
      const res = await api.toggleReminder(eventId);
      if (res.data.success) {
        if (res.data.reminded) {
          setReminders(prev => [...prev, eventId]);
          showNotification(`Reminder set for ${title}!`, 'success');
        } else {
          setReminders(prev => prev.filter(id => id !== eventId));
          showNotification(`Reminder removed for ${title}.`, 'info');
        }
      }
    } catch (err) {
      showNotification('Could not set reminder.', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.deleteEvent(id);
      if (res.data.success) {
        showNotification('Celestial event removed.', 'info');
        loadEvents(currentPage);
      }
    } catch (err) {
      showNotification(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Events', count: pagination.total },
    { id: 'meteor', label: 'Meteor Showers' },
    { id: 'eclipse', label: 'Solar & Lunar Eclipses' },
    { id: 'conjunction', label: 'Conjunctions & Oppositions' },
    { id: 'supernova', label: 'Supernovae & Transits' }
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>
            <Calendar size={13} /> Celestial Calendar
          </span>
          <h1>Celestial Events Schedule</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '640px' }}>
            Track eclipses, meteor shower peaks, occultations, equinoxes, and planetary alignments with in-app reminders.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* View Mode Toggle */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 'var(--radius-md)',
            padding: '3px',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={() => setViewMode('timeline')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: viewMode === 'timeline' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: viewMode === 'timeline' ? 'var(--cyan-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <List size={16} /> Timeline
            </button>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: viewMode === 'grid' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--cyan-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <Grid size={16} /> Grid
            </button>
          </div>

          {/* Admin Create Button */}
          {isAdmin && (
            <button
              onClick={() => onOpenAdminModal('event')}
              className="btn btn-primary"
            >
              <Plus size={16} /> Log New Event
            </button>
          )}
        </div>
      </div>

      {/* Search and Category Filters */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        placeholder="Search meteor showers, solar eclipses, planetary oppositions..."
        filters={filterTabs}
        activeFilter={activeFilter}
        setActiveFilter={(f) => {
          setActiveFilter(f);
          setCurrentPage(1);
        }}
      />

      {/* View Content */}
      {viewMode === 'timeline' ? (
        <EventTimeline
          events={events}
          reminders={reminders}
          onToggleReminder={handleToggleReminder}
          onSelectEvent={onSelectEvent}
          onEditEvent={(e) => onOpenAdminModal('event', e)}
          onDeleteEvent={handleDelete}
        />
      ) : (
        <div className="grid-cards">
          {events.map((evt) => {
            const hasReminder = reminders.includes(evt.id);
            return (
              <div key={evt.id} style={{ position: 'relative' }}>
                <Card
                  item={evt}
                  type="celestial_events"
                  title={evt.title}
                  subtitle={evt.event_date}
                  badgeText={evt.type}
                  badgeColor="cyan"
                  imageUrl={evt.image_url}
                  metrics={[
                    { label: 'Date', value: evt.event_date },
                    { label: 'Type', value: evt.type ? evt.type.split(' ')[0] : 'Event' },
                    { label: 'Region', value: evt.visibility_region ? evt.visibility_region.split(' ')[0] : 'Global' }
                  ]}
                  description={evt.description}
                  onSelect={() => onSelectEvent(evt)}
                  onEdit={() => onOpenAdminModal('event', evt)}
                  onDelete={() => handleDelete(evt.id)}
                />

                {/* In-app Reminder Button */}
                <button
                  onClick={(e) => handleToggleReminder(evt.id, evt.title, e)}
                  title={hasReminder ? 'Reminder Active' : 'Set Event Reminder'}
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    right: '3.5rem',
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: hasReminder ? 'rgba(251, 191, 36, 0.9)' : 'rgba(10, 14, 28, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: hasReminder ? '#05070e' : '#cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    zIndex: 5
                  }}
                >
                  {hasReminder ? <Bell size={15} fill="#05070e" /> : <Bell size={15} />}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.total}
        limit={pagination.limit}
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
};
