import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Card } from '../components/Card.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { CircleDot, Plus } from 'lucide-react';

export const BlackHoles = ({ onSelectBlackHole, onOpenAdminModal }) => {
  const { isAdmin, showNotification } = useAuth();
  const [blackHoles, setBlackHoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });

  const loadBlackHoles = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.getBlackHoles({
        page,
        limit: 10,
        search: searchQuery || undefined
      });
      if (res.data.success) {
        setBlackHoles(res.data.data || []);
        if (res.data.pagination) setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Failed to load black holes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlackHoles(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      const res = await api.deleteBlackHole(id);
      if (res.data.success) {
        showNotification('Singularity record removed.', 'info');
        loadBlackHoles(currentPage);
      }
    } catch (err) {
      showNotification(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

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
            <CircleDot size={13} /> General Relativity Singularities
          </span>
          <h1>Black Holes & Singularities</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '640px' }}>
            From stellar-mass binaries like Cygnus X-1 to gargantuan supermassives like Sagittarius A* and M87*.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => onOpenAdminModal('black_hole')}
            className="btn btn-primary"
          >
            <Plus size={16} /> Register Singularity
          </button>
        )}
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        placeholder="Search Sagittarius A*, M87*, Cygnus X-1, Event Horizon, Location..."
      />

      <div className="grid-cards">
        {blackHoles.map((bh) => (
          <Card
            key={bh.id}
            item={bh}
            type="black_holes"
            title={bh.name}
            subtitle={bh.location}
            badgeText={bh.mass_solar.split(' ')[0]}
            badgeColor="rose"
            imageUrl={bh.image_url}
            metrics={[
              { label: 'Mass', value: bh.mass_solar },
              { label: 'Location', value: bh.location.split(' ')[0] },
              { label: 'Type', value: 'Black Hole' }
            ]}
            description={bh.description}
            onSelect={() => onSelectBlackHole(bh)}
            onEdit={() => onOpenAdminModal('black_hole', bh)}
            onDelete={() => handleDelete(bh.id)}
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
