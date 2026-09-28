import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Card } from '../components/Card.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { Disc, Plus } from 'lucide-react';

export const Galaxies = ({ onSelectGalaxy, onOpenAdminModal }) => {
  const { isAdmin, showNotification } = useAuth();
  const [galaxies, setGalaxies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });

  const loadGalaxies = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.getGalaxies({
        page,
        limit: 10,
        type: activeFilter !== 'all' ? activeFilter : undefined,
        search: searchQuery || undefined
      });
      if (res.data.success) {
        setGalaxies(res.data.data || []);
        if (res.data.pagination) setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Failed to load galaxies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGalaxies(currentPage);
  }, [activeFilter, currentPage]);

  const handleDelete = async (id) => {
    try {
      const res = await api.deleteGalaxy(id);
      if (res.data.success) {
        showNotification('Galaxy removed from extragalactic registry.', 'info');
        loadGalaxies(currentPage);
      }
    } catch (err) {
      showNotification(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Galaxies', count: pagination.total },
    { id: 'spiral', label: 'Spirals & Barred Spirals' },
    { id: 'elliptical', label: 'Giant Ellipticals' },
    { id: 'lenticular', label: 'Lenticular & Peculiar' }
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
          <span className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
            <Disc size={13} /> Extragalactic Astrophysics
          </span>
          <h1>Deep Space Galaxies</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '640px' }}>
            Journey through the Local Group and Virgo Supercluster: grand design spirals, relativistic jet emitters, and colliding cosmic islands.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => onOpenAdminModal('galaxy')}
            className="btn btn-primary"
          >
            <Plus size={16} /> Catalog New Galaxy
          </button>
        )}
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        placeholder="Search Andromeda, Whirlpool M51, Sombrero M104, M87..."
        filters={filterTabs}
        activeFilter={activeFilter}
        setActiveFilter={(f) => {
          setActiveFilter(f);
          setCurrentPage(1);
        }}
      />

      <div className="grid-cards">
        {galaxies.map((galaxy) => (
          <Card
            key={galaxy.id}
            item={galaxy}
            type="galaxies"
            title={galaxy.name}
            subtitle={galaxy.type}
            badgeText={galaxy.type.split(' ')[0]}
            badgeColor="emerald"
            imageUrl={galaxy.image_url}
            metrics={[
              { label: 'Dist (Mly)', value: galaxy.distance_mly },
              { label: 'Type', value: galaxy.type.split(' ')[0] },
              { label: 'Scope', value: 'Extragalactic' }
            ]}
            description={galaxy.description}
            onSelect={() => onSelectGalaxy(galaxy)}
            onEdit={() => onOpenAdminModal('galaxy', galaxy)}
            onDelete={() => handleDelete(galaxy.id)}
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
