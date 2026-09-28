import React, { useState, useEffect } from 'react';
import { X, Sparkles, Save } from 'lucide-react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export const AdminModal = ({
  isOpen,
  onClose,
  initialType = 'event',
  editItem = null,
  onSuccess
}) => {
  const { showNotification } = useAuth();
  const [targetType, setTargetType] = useState(initialType);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editItem) {
      setFormData({ ...editItem });
    } else {
      if (targetType === 'event') {
        setFormData({
          title: '',
          type: 'meteor shower',
          event_date: new Date().toISOString().split('T')[0],
          description: '',
          visibility_region: 'Northern Hemisphere',
          source_url: 'https://imo.net',
          image_url: ''
        });
      } else if (targetType === 'star') {
        setFormData({
          name: '',
          type: 'Main Sequence (A0V)',
          constellation: '',
          magnitude: '+1.0',
          distance_ly: '50.0',
          description: '',
          image_url: ''
        });
      } else if (targetType === 'planet') {
        setFormData({
          name: '',
          type: 'Terrestrial Planet',
          moons: 0,
          orbital_period: '365 days',
          description: '',
          image_url: ''
        });
      } else if (targetType === 'galaxy') {
        setFormData({
          name: '',
          type: 'Spiral',
          distance_mly: '10.0',
          description: '',
          image_url: ''
        });
      } else if (targetType === 'nova') {
        setFormData({
          name: '',
          kind: 'Recurrent Nova',
          period: '80 years',
          last_outburst: 'Recent',
          description: '',
          image_url: ''
        });
      } else if (targetType === 'black_hole') {
        setFormData({
          name: '',
          mass_solar: '1,000,000 M☉',
          location: 'Deep Core',
          description: '',
          image_url: ''
        });
      } else if (targetType === 'theory') {
        setFormData({
          title: '',
          category: 'universe',
          summary: '',
          details: '',
          image_url: ''
        });
      } else if (targetType === 'article') {
        setFormData({
          title: '',
          category: 'Deep Space Observation',
          summary: '',
          url: 'https://webbtelescope.org',
          published_at: new Date().toISOString().split('T')[0],
          image_url: ''
        });
      }
    }
  }, [targetType, editItem, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let res;
      const isEditing = Boolean(editItem?.id);

      if (targetType === 'event') {
        res = isEditing ? await api.updateEvent(editItem.id, formData) : await api.createEvent(formData);
      } else if (targetType === 'star') {
        res = isEditing ? await api.updateStar(editItem.id, formData) : await api.createStar(formData);
      } else if (targetType === 'planet') {
        res = isEditing ? await api.updatePlanet(editItem.id, formData) : await api.createPlanet(formData);
      } else if (targetType === 'galaxy') {
        res = isEditing ? await api.updateGalaxy(editItem.id, formData) : await api.createGalaxy(formData);
      } else if (targetType === 'nova') {
        res = isEditing ? await api.updateNova(editItem.id, formData) : await api.createNova(formData);
      } else if (targetType === 'black_hole') {
        res = isEditing ? await api.updateBlackHole(editItem.id, formData) : await api.createBlackHole(formData);
      } else if (targetType === 'theory') {
        res = isEditing ? await api.updateTheory(editItem.id, formData) : await api.createTheory(formData);
      } else if (targetType === 'article') {
        res = isEditing ? await api.updateArticle(editItem.id, formData) : await api.createArticle(formData);
      }

      if (res?.data?.success) {
        showNotification(isEditing ? 'Cosmic record updated!' : 'New entity logged into universe!', 'success');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      showNotification(err.response?.data?.message || err.message || 'Operation failed.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 14, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '740px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'rgba(10, 14, 28, 0.98)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          boxShadow: 'var(--shadow-glow)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '0.35rem' }}>
              Admin Console
            </span>
            <h3 style={{ fontSize: '1.35rem', color: '#fff' }}>
              {editItem ? `Edit Record: ${editItem.name || editItem.title}` : 'Catalog New Cosmic Entity'}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              width: 36,
              height: 36,
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Domain Selector */}
        {!editItem && (
          <div style={{
            padding: '1rem 1.75rem',
            background: 'rgba(15, 23, 42, 0.5)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Domain:</span>
            {[
              { id: 'event', label: 'Celestial Event' },
              { id: 'star', label: 'Star / Constellation' },
              { id: 'planet', label: 'Planet' },
              { id: 'galaxy', label: 'Galaxy' },
              { id: 'nova', label: 'Nova / Variable' },
              { id: 'black_hole', label: 'Black Hole' },
              { id: 'theory', label: 'Theory' },
              { id: 'article', label: 'Article / News' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTargetType(tab.id)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  border: targetType === tab.id ? '1px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                  background: targetType === tab.id ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  color: targetType === tab.id ? 'var(--cyan-primary)' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {/* Title / Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                {targetType === 'event' || targetType === 'theory' || targetType === 'article' ? 'Title' : 'Name'} *
              </label>
              <input
                type="text"
                required
                className="cosmic-input"
                value={formData.title || formData.name || ''}
                onChange={(e) => {
                  if (targetType === 'event' || targetType === 'theory' || targetType === 'article') {
                    handleChange('title', e.target.value);
                  } else {
                    handleChange('name', e.target.value);
                  }
                }}
                placeholder="e.g. Perseid Meteor Shower / Betelgeuse / T Coronae Borealis"
              />
            </div>

            {/* Type / Kind / Category */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Type / Classification *
              </label>
              <input
                type="text"
                required
                className="cosmic-input"
                value={formData.type || formData.kind || formData.category || ''}
                onChange={(e) => {
                  if (targetType === 'nova') handleChange('kind', e.target.value);
                  else if (targetType === 'theory') handleChange('category', e.target.value);
                  else handleChange('type', e.target.value);
                }}
                placeholder="e.g. eclipse / Recurrent Nova / universe"
              />
            </div>
          </div>

          {/* Conditional domain fields */}
          {targetType === 'event' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>Event Date *</label>
                <input
                  type="date"
                  required
                  className="cosmic-input"
                  value={formData.event_date || ''}
                  onChange={(e) => handleChange('event_date', e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>Visibility Region</label>
                <input
                  type="text"
                  className="cosmic-input"
                  value={formData.visibility_region || ''}
                  onChange={(e) => handleChange('visibility_region', e.target.value)}
                  placeholder="Northern Hemisphere"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>Source URL</label>
                <input
                  type="url"
                  className="cosmic-input"
                  value={formData.source_url || ''}
                  onChange={(e) => handleChange('source_url', e.target.value)}
                  placeholder="https://imo.net"
                />
              </div>
            </div>
          )}

          {targetType === 'star' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>Constellation *</label>
                <input
                  type="text"
                  required
                  className="cosmic-input"
                  value={formData.constellation || ''}
                  onChange={(e) => handleChange('constellation', e.target.value)}
                  placeholder="Orion / Lyra"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>Magnitude</label>
                <input
                  type="text"
                  className="cosmic-input"
                  value={formData.magnitude || ''}
                  onChange={(e) => handleChange('magnitude', e.target.value)}
                  placeholder="+0.50"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>Distance (ly)</label>
                <input
                  type="text"
                  className="cosmic-input"
                  value={formData.distance_ly || ''}
                  onChange={(e) => handleChange('distance_ly', e.target.value)}
                  placeholder="642.5"
                />
              </div>
            </div>
          )}

          {targetType === 'nova' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>Period</label>
                <input
                  type="text"
                  className="cosmic-input"
                  value={formData.period || ''}
                  onChange={(e) => handleChange('period', e.target.value)}
                  placeholder="80 years / 5.366 days"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>Last Outburst</label>
                <input
                  type="text"
                  className="cosmic-input"
                  value={formData.last_outburst || ''}
                  onChange={(e) => handleChange('last_outburst', e.target.value)}
                  placeholder="1946 / Annual"
                />
              </div>
            </div>
          )}

          {targetType === 'black_hole' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>Solar Mass *</label>
                <input
                  type="text"
                  required
                  className="cosmic-input"
                  value={formData.mass_solar || ''}
                  onChange={(e) => handleChange('mass_solar', e.target.value)}
                  placeholder="4.3 Million M☉"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>Location / Core</label>
                <input
                  type="text"
                  className="cosmic-input"
                  value={formData.location || ''}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Milky Way Galactic Center"
                />
              </div>
            </div>
          )}

          {/* Image URL */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Image URL
            </label>
            <input
              type="url"
              className="cosmic-input"
              value={formData.image_url || ''}
              onChange={(e) => handleChange('image_url', e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Description / Summary / Details */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Description / Summary *
            </label>
            <textarea
              required
              rows={3}
              className="cosmic-textarea"
              value={formData.description || formData.summary || ''}
              onChange={(e) => {
                if (targetType === 'theory' || targetType === 'article') {
                  handleChange('summary', e.target.value);
                } else {
                  handleChange('description', e.target.value);
                }
              }}
              placeholder="Provide scientific overview and observation parameters..."
            />
          </div>

          {targetType === 'theory' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Mathematical / Physical Details
              </label>
              <textarea
                rows={3}
                className="cosmic-textarea"
                value={formData.details || ''}
                onChange={(e) => handleChange('details', e.target.value)}
                placeholder="Equations, physical evidence, quantum predictions..."
              />
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '1rem',
            marginTop: '0.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              <Save size={16} />
              <span>{submitting ? 'Saving...' : (editItem ? 'Update Record' : 'Save to Catalog')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
