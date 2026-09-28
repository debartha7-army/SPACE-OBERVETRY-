import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Card } from '../components/Card.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { Atom, Plus, Clock } from 'lucide-react';

export const Theories = ({ onSelectTheory, onOpenAdminModal }) => {
  const { isAdmin, showNotification } = useAuth();
  const [theories, setTheories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });

  const loadTheories = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.getTheories({
        page,
        limit: 10,
        category: activeFilter !== 'all' ? activeFilter : undefined,
        search: searchQuery || undefined
      });
      if (res.data.success) {
        setTheories(res.data.data || []);
        if (res.data.pagination) setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Failed to load theories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTheories(currentPage);
  }, [activeFilter, currentPage]);

  const handleDelete = async (id) => {
    try {
      const res = await api.deleteTheory(id);
      if (res.data.success) {
        showNotification('Cosmological theory removed.', 'info');
        loadTheories(currentPage);
      }
    } catch (err) {
      showNotification(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Models', count: pagination.total },
    { id: 'universe', label: 'Universe & Big Bang' },
    { id: 'multiverse', label: 'Multiverse Hypothesis' },
    { id: 'dark matter', label: 'Dark Matter & Energy' },
    { id: 'quantum gravity', label: 'Quantum Gravity & Strings' }
  ];

  const epochs = [
    { time: 't = 0 to 10⁻⁴³ s', name: 'Planck Epoch', desc: 'All 4 forces unified. Quantum gravity reigns.' },
    { time: 't = 10⁻³⁶ to 10⁻³² s', name: 'Cosmic Inflation', desc: 'Space expands exponentially by factor of 10²⁶.' },
    { time: 't = 380,000 yrs', name: 'Recombination (CMB)', desc: 'Electrons bind to nuclei. First light travels freely.' },
    { time: 't = 400 Myr', name: 'Cosmic Dawn', desc: 'First Population III stars ignite.' },
    { time: 't = 13.8 Gyr (Now)', name: 'Dark Energy Era', desc: 'Accelerated expansion dominates universe.' }
  ];

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <span className="badge badge-purple" style={{ marginBottom: '0.4rem' }}>
            <Atom size={13} /> Theoretical Cosmology
          </span>
          <h1>Cosmological Theories & Origin of Spacetime</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '640px' }}>
            Investigate humanity's deepest models: Big Bang singularity, cosmic inflation, multiverse, and string theory.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => onOpenAdminModal('theory')}
            className="btn btn-primary"
          >
            <Plus size={16} /> Archive New Theory
          </button>
        )}
      </div>

      {/* Epoch Milestone Track */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        borderRadius: 'var(--radius-xl)',
        marginBottom: '2rem',
        overflowX: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Clock size={16} color="var(--cyan-primary)" />
          <h3 style={{ fontSize: '1.1rem' }}>Cosmological Timeline of Universal History</h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(180px, 1fr))',
          gap: '1rem'
        }}>
          {epochs.map((ep, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--cyan-primary)', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                {ep.time}
              </span>
              <strong style={{ fontSize: '0.95rem', color: '#fff' }}>
                {ep.name}
              </strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', lineHeight: 1.4 }}>
                {ep.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        placeholder="Search Big Bang, Cosmic Inflation, String Theory, Multiverse, Dark Matter..."
        filters={filterTabs}
        activeFilter={activeFilter}
        setActiveFilter={(f) => {
          setActiveFilter(f);
          setCurrentPage(1);
        }}
      />

      <div className="grid-cards">
        {theories.map((theory) => (
          <Card
            key={theory.id}
            item={theory}
            type="theories"
            title={theory.title}
            subtitle={theory.category}
            badgeText={theory.category}
            badgeColor="purple"
            imageUrl={theory.image_url}
            metrics={[
              { label: 'Category', value: theory.category.split(' ')[0] },
              { label: 'Scope', value: 'Cosmology' },
              { label: 'Framework', value: 'Theoretical' }
            ]}
            description={theory.summary}
            onSelect={() => onSelectTheory(theory)}
            onEdit={() => onOpenAdminModal('theory', theory)}
            onDelete={() => handleDelete(theory.id)}
          />
        ))}
      </div>

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
