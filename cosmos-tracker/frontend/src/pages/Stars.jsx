import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Card } from '../components/Card.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { Sparkles, Plus } from 'lucide-react';

export const Stars = ({ onSelectStar, onOpenAdminModal }) => {
  const { isAdmin, showNotification } = useAuth();
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });

  const loadStars = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.getStars({
        page,
        limit: 10,
        constellation: activeFilter !== 'all' ? activeFilter : undefined,
        search: searchQuery || undefined
      });
      if (res.data.success) {
        setStars(res.data.data || []);
        if (res.data.pagination) setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Failed to load stars:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStars(currentPage);
  }, [activeFilter, currentPage]);

  const handleDelete = async (id) => {
    try {
      const res = await api.deleteStar(id);
      if (res.data.success) {
        showNotification('Star record removed from catalog.', 'info');
        loadStars(currentPage);
      }
    } catch (err) {
      showNotification(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Stars', count: pagination.total },
    { id: 'Orion', label: 'Orion (Betelgeuse / Rigel)' },
    { id: 'Canis Major', label: 'Canis Major (Sirius)' },
    { id: 'Lyra', label: 'Lyra (Vega)' },
    { id: 'Ursa Minor', label: 'Ursa Minor (Polaris)' }
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
            <Sparkles size={13} /> Stellar Cartography
          </span>
          <h1>Stars & Constellations</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '640px' }}>
            Explore prominent navigation stars, binary systems, Cepheid variables, and red supergiants across constellations.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => onOpenAdminModal('star')}
            className="btn btn-primary"
          >
            <Plus size={16} /> Catalog New Star
          </button>
        )}
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        placeholder="Search Sirius, Betelgeuse, Orion, Canis Major, Spectral Class..."
        filters={filterTabs}
        activeFilter={activeFilter}
        setActiveFilter={(f) => {
          setActiveFilter(f);
          setCurrentPage(1);
        }}
      />

      <div className="grid-cards">
        {stars.map((star) => (
          <Card
            key={star.id}
            item={star}
            type="stars_constellations"
            title={star.name}
            subtitle={`Constellation: ${star.constellation}`}
            badgeText={star.type}
            badgeColor="purple"
            imageUrl={star.image_url}
            metrics={[
              { label: 'Mag', value: star.magnitude },
              { label: 'Dist (ly)', value: star.distance_ly },
              { label: 'Constellation', value: star.constellation }
            ]}
            description={star.description}
            onSelect={() => onSelectStar(star)}
            onEdit={() => onOpenAdminModal('star', star)}
            onDelete={() => handleDelete(star.id)}
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
