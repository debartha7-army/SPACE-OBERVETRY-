import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Card } from '../components/Card.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { Flame, Plus } from 'lucide-react';

export const Novae = ({ onSelectNova, onOpenAdminModal }) => {
  const { isAdmin, showNotification } = useAuth();
  const [novae, setNovae] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });

  const loadNovae = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.getNovae({
        page,
        limit: 10,
        kind: activeFilter !== 'all' ? activeFilter : undefined,
        search: searchQuery || undefined
      });
      if (res.data.success) {
        setNovae(res.data.data || []);
        if (res.data.pagination) setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Failed to load novae:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNovae(currentPage);
  }, [activeFilter, currentPage]);

  const handleSearch = (q) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.deleteNova(id);
      if (res.data.success) {
        showNotification('Nova record removed from catalog.', 'info');
        loadNovae(currentPage);
      }
    } catch (err) {
      showNotification(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Novae & Variables', count: pagination.total },
    { id: 'recurrent', label: 'Recurrent Novae' },
    { id: 'classical', label: 'Classical Novae' },
    { id: 'cepheid', label: 'Cepheid Variables' },
    { id: 'mira', label: 'Mira Variables' },
    { id: 'dwarf', label: 'Dwarf Novae (Cataclysmic)' }
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
          <span className="badge badge-rose" style={{ marginBottom: '0.4rem' }}>
            <Flame size={13} /> Stellar Eruptions & Variables
          </span>
          <h1>Novae & Variable Stars</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '640px' }}>
            Track thermonuclear runaway outbursts, classical novae, pulsating Cepheids, and cataclysmic binary white dwarfs.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => onOpenAdminModal('nova')}
            className="btn btn-primary"
          >
            <Plus size={16} /> Catalog Nova / Variable
          </button>
        )}
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={handleSearch}
        placeholder="Search T Coronae Borealis, Delta Cephei, Mira, SS Cygni..."
        filters={filterTabs}
        activeFilter={activeFilter}
        setActiveFilter={(f) => {
          setActiveFilter(f);
          setCurrentPage(1);
        }}
      />

      <div className="grid-cards">
        {novae.map((nova) => (
          <Card
            key={nova.id}
            item={nova}
            type="novae_variables"
            title={nova.name}
            subtitle={`Kind: ${nova.kind}`}
            badgeText={nova.kind.split(' ')[0]}
            badgeColor="rose"
            imageUrl={nova.image_url}
            metrics={[
              { label: 'Period', value: nova.period || 'N/A' },
              { label: 'Outburst', value: nova.last_outburst ? nova.last_outburst.split(' ')[0] : 'N/A' },
              { label: 'Class', value: nova.kind.split(' ')[0] }
            ]}
            description={nova.description}
            onSelect={() => onSelectNova(nova)}
            onEdit={() => onOpenAdminModal('nova', nova)}
            onDelete={() => handleDelete(nova.id)}
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
