import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import { 
  User, 
  Bookmark, 
  Telescope, 
  Calendar, 
  Trash2, 
  Plus, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Users
} from 'lucide-react';

export const Dashboard = ({ setActiveTab, setSelectedItem, setDetailType, onOpenAdminModal }) => {
  const { user, isAdmin, bookmarks, fetchBookmarks, showNotification } = useAuth();
  const [observations, setObservations] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [activeSection, setActiveSection] = useState('watchlist'); // 'watchlist' | 'journal' | 'admin'

  // New observation log form state
  const [targetName, setTargetName] = useState('');
  const [targetType, setTargetType] = useState('Planet');
  const [obsDate, setObsDate] = useState(new Date().toISOString().split('T')[0]);
  const [equipment, setEquipment] = useState('8-inch Dobsonian (120x)');
  const [seeing, setSeeing] = useState('Bortle 4, steady atmosphere');
  const [notes, setNotes] = useState('');
  const [submittingObs, setSubmittingObs] = useState(false);

  const loadObservations = async () => {
    try {
      const res = await api.getObservations();
      if (res.data.success) {
        setObservations(res.data.observations || []);
      }
    } catch (err) {
      console.error('Error fetching observations:', err);
    }
  };

  const loadUsersList = async () => {
    if (isAdmin) {
      try {
        const res = await api.getUsers();
        if (res.data.success) {
          setUsersList(res.data.users || []);
        }
      } catch (err) {
        console.error('Error fetching user list:', err);
      }
    }
  };

  useEffect(() => {
    fetchBookmarks();
    loadObservations();
    if (isAdmin) loadUsersList();
  }, [isAdmin]);

  const handleAddObservation = async (e) => {
    e.preventDefault();
    if (!targetName) return;

    setSubmittingObs(true);
    try {
      const res = await api.createObservation({
        target_name: targetName,
        target_type: targetType,
        observation_date: obsDate,
        telescope_equipment: equipment,
        seeing_conditions: seeing,
        notes
      });

      if (res.data.success) {
        showNotification('Observation recorded in your astronomer logbook!', 'success');
        setTargetName('');
        setNotes('');
        loadObservations();
      }
    } catch (err) {
      showNotification('Failed to save observation entry.', 'error');
    } finally {
      setSubmittingObs(false);
    }
  };

  const handleDeleteObservation = async (id) => {
    try {
      const res = await api.deleteObservation(id);
      if (res.data.success) {
        showNotification('Observation removed.', 'info');
        loadObservations();
      }
    } catch (err) {
      showNotification('Could not delete observation.', 'error');
    }
  };

  const handleRemoveBookmark = async (id) => {
    try {
      const res = await api.deleteBookmark(id);
      if (res.data.success) {
        showNotification('Removed from watchlist.', 'info');
        fetchBookmarks();
      }
    } catch (err) {
      showNotification('Error removing bookmark.', 'error');
    }
  };

  if (!user) {
    return (
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3>Observatory Passport Required</h3>
        <p style={{ color: 'var(--text-muted)', margin: '0.75rem 0 1.5rem' }}>
          Please log in to access your custom watchlist and amateur astronomer observation logbook.
        </p>
        <button onClick={() => setActiveTab('login')} className="btn btn-primary">
          Log In Now
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* User Header Profile Card */}
      <div className="glass-panel" style={{
        padding: '2rem',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80'}
            alt={user.name || user.username || 'User'}
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              border: '2px solid var(--cyan-primary)',
              objectFit: 'cover'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: '#fff' }}>{user.name || user.username || user.email}</h2>
              {isAdmin && (
                <span className="badge badge-purple">
                  <ShieldCheck size={12} /> Observatory Administrator
                </span>
              )}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              {user.email} • {user.bio || 'Stargazer & Cosmic Explorer'}
            </p>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '4px',
          borderRadius: 'var(--radius-md)'
        }}>
          <button
            onClick={() => setActiveSection('watchlist')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeSection === 'watchlist' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: activeSection === 'watchlist' ? 'var(--cyan-primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 600
            }}
          >
            <Bookmark size={15} /> Watchlist ({bookmarks.length})
          </button>

          <button
            onClick={() => setActiveSection('journal')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeSection === 'journal' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: activeSection === 'journal' ? 'var(--cyan-primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 600
            }}
          >
            <Telescope size={15} /> Observation Journal ({observations.length})
          </button>

          {isAdmin && (
            <button
              onClick={() => setActiveSection('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeSection === 'admin' ? 'rgba(192, 132, 252, 0.2)' : 'transparent',
                color: activeSection === 'admin' ? 'var(--purple-accent)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 600
              }}
            >
              <ShieldCheck size={15} /> Admin Hub
            </button>
          )}
        </div>
      </div>

      {/* SECTION 1: WATCHLIST */}
      {activeSection === 'watchlist' && (
        <div>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3>Your Saved Celestial Watchlist</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Pinned celestial events, stars, black holes, and theories you are tracking.
            </p>
          </div>

          {bookmarks.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <Bookmark size={32} color="var(--cyan-primary)" style={{ margin: '0 auto 0.75rem' }} />
              <h4>Your Watchlist is Currently Empty</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Click the bookmark star icon on any celestial object or event to add it here.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {bookmarks.map((bm) => (
                <div key={bm.id} className="glass-panel" style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div>
                    <span className="badge badge-cyan" style={{ fontSize: '0.7rem', marginBottom: '0.35rem' }}>
                      {bm.item_type}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', color: '#fff' }}>{bm.item_title}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                      Saved on {new Date(bm.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemoveBookmark(bm.id)}
                    title="Remove from watchlist"
                    style={{
                      background: 'rgba(244, 63, 94, 0.1)',
                      border: '1px solid rgba(244, 63, 94, 0.25)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.5rem',
                      color: '#fb7185',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: OBSERVATION JOURNAL */}
      {activeSection === 'journal' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 380px) 1fr', gap: '2rem' }}>
          {/* New Observation Form */}
          <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)', height: 'fit-content' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Telescope size={20} color="var(--cyan-primary)" />
              <h3 style={{ fontSize: '1.2rem' }}>Log Observation</h3>
            </div>

            <form onSubmit={handleAddObservation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem' }}>Target Name *</label>
                <input
                  type="text"
                  required
                  className="cosmic-input"
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  placeholder="e.g. Saturn / Ring Nebula M57"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem' }}>Category</label>
                  <select
                    className="cosmic-select"
                    value={targetType}
                    onChange={(e) => setTargetType(e.target.value)}
                  >
                    <option value="Planet">Planet</option>
                    <option value="Star">Star / Double</option>
                    <option value="Galaxy">Galaxy</option>
                    <option value="Nebula">Nebula</option>
                    <option value="Event">Meteor / Eclipse</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem' }}>Date *</label>
                  <input
                    type="date"
                    required
                    className="cosmic-input"
                    value={obsDate}
                    onChange={(e) => setObsDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem' }}>Optics / Telescope</label>
                <input
                  type="text"
                  className="cosmic-input"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  placeholder="8-inch Dobsonian / 10x50 Binoculars"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem' }}>Seeing Conditions</label>
                <input
                  type="text"
                  className="cosmic-input"
                  value={seeing}
                  onChange={(e) => setSeeing(e.target.value)}
                  placeholder="Bortle 4, calm wind, steady atmosphere"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem' }}>Observational Notes</label>
                <textarea
                  rows={3}
                  className="cosmic-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe eyepiece view, color tints, satellites visible..."
                />
              </div>

              <button
                type="submit"
                disabled={submittingObs}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                <Plus size={16} /> Record Observation
              </button>
            </form>
          </div>

          {/* Observations Logbook Entries */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Astronomer Logbook History</h3>

            {observations.length === 0 ? (
              <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <Telescope size={32} color="var(--cyan-primary)" style={{ margin: '0 auto 0.75rem' }} />
                <h4>No Observing Sessions Logged Yet</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  Use the left form to log your eyepiece sketches and sightings.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {observations.map((obs) => (
                  <div key={obs.id} className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.35rem' }}>
                          <span className="badge badge-purple">{obs.target_type}</span>
                          <span style={{ fontSize: '0.82rem', color: 'var(--cyan-primary)' }}>
                            <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                            {obs.observation_date}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.25rem', color: '#fff' }}>{obs.target_name}</h4>
                      </div>

                      <button
                        onClick={() => handleDeleteObservation(obs.id)}
                        style={{
                          background: 'rgba(244, 63, 94, 0.1)',
                          border: '1px solid rgba(244, 63, 94, 0.25)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.45rem',
                          color: '#fb7185',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '1.5rem',
                      marginTop: '0.75rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      flexWrap: 'wrap'
                    }}>
                      <div><strong style={{ color: 'var(--text-heading)' }}>Equipment:</strong> {obs.telescope_equipment}</div>
                      <div><strong style={{ color: 'var(--text-heading)' }}>Sky:</strong> {obs.seeing_conditions}</div>
                    </div>

                    {obs.notes && (
                      <p style={{ marginTop: '0.85rem', fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                        "{obs.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: ADMIN HUB */}
      {isAdmin && activeSection === 'admin' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Quick Creator Bar */}
          <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Administrator Management Console</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Create, curate, update, or prune celestial records across all astronomical databases.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { type: 'event', label: 'Log Celestial Event' },
                { type: 'star', label: 'Catalog New Star' },
                { type: 'planet', label: 'Register Planet' },
                { type: 'galaxy', label: 'Add Galaxy' },
                { type: 'black_hole', label: 'Add Black Hole' },
                { type: 'theory', label: 'Archive Theory' },
                { type: 'article', label: 'Publish Article' }
              ].map(item => (
                <button
                  key={item.type}
                  onClick={() => onOpenAdminModal(item.type)}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus size={15} color="var(--cyan-primary)" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Registered Users Table */}
          <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Users size={18} color="var(--purple-accent)" />
              <h3>Registered Observatory Users</h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-subtle)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>User</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Email</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Role</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((u) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <td style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src={u.avatar} alt="" style={{ width: 26, height: 26, borderRadius: '50%' }} />
                        <span style={{ fontWeight: 600, color: '#fff' }}>{u.name || u.username || 'Stargazer'}</span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{u.email}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span className={`badge ${u.role === 'admin' ? 'badge-purple' : 'badge-cyan'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-subtle)' }}>
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .glass-panel[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
