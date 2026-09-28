import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Card } from '../components/Card.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { BookOpen, Plus, Download } from 'lucide-react';

export const Articles = ({ onSelectArticle, onOpenAdminModal }) => {
  const { isAdmin, showNotification } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });

  const loadArticles = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.getArticles({
        page,
        limit: 10,
        category: activeFilter !== 'all' ? activeFilter : undefined,
        search: searchQuery || undefined
      });
      if (res.data.success) {
        setArticles(res.data.data || []);
        if (res.data.pagination) setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Failed to load articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles(currentPage);
  }, [activeFilter, currentPage]);

  const handleAutoImport = async () => {
    try {
      const res = await api.autoImportNews();
      if (res.data.success) {
        showNotification(res.data.message || 'Auto-imported latest astronomical dispatches!', 'success');
        loadArticles(1);
      }
    } catch (err) {
      showNotification('Auto-import failed.', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.deleteArticle(id);
      if (res.data.success) {
        showNotification('Article removed from observatory dispatch.', 'info');
        loadArticles(currentPage);
      }
    } catch (err) {
      showNotification(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Dispatches', count: pagination.total },
    { id: 'Deep Space', label: 'Deep Space (JWST)' },
    { id: 'Black Holes', label: 'Black Holes & EHT' },
    { id: 'Cosmological', label: 'Cosmological Physics' },
    { id: 'Planetary', label: 'Planetary Exploration' }
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
          <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>
            <BookOpen size={13} /> Observatory Dispatches
          </span>
          <h1>Astronomy Articles & Research News</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '640px' }}>
            Curated papers and breakthroughs from the James Webb Space Telescope, Event Horizon Telescope, and outer planetary missions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {isAdmin && (
            <>
              <button
                onClick={handleAutoImport}
                className="btn btn-secondary btn-sm"
                title="Fetch latest research from Public API"
              >
                <Download size={15} color="var(--cyan-primary)" /> Auto-Import NASA Feeds
              </button>
              <button
                onClick={() => onOpenAdminModal('article')}
                className="btn btn-primary"
              >
                <Plus size={16} /> Publish Article
              </button>
            </>
          )}
        </div>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        placeholder="Search James Webb, Sagittarius A*, Hubble Tension, Europa Clipper..."
        filters={filterTabs}
        activeFilter={activeFilter}
        setActiveFilter={(f) => {
          setActiveFilter(f);
          setCurrentPage(1);
        }}
      />

      <div className="grid-cards">
        {articles.map((article) => (
          <Card
            key={article.id}
            item={article}
            type="articles"
            title={article.title}
            subtitle={article.published_at}
            badgeText={article.category.split(' ')[0]}
            badgeColor="cyan"
            imageUrl={article.image_url}
            metrics={[
              { label: 'Date', value: article.published_at },
              { label: 'Category', value: article.category.split(' ')[0] },
              { label: 'Source', value: 'Observatory' }
            ]}
            description={article.summary}
            onSelect={() => onSelectArticle(article)}
            onEdit={() => onOpenAdminModal('article', article)}
            onDelete={() => handleDelete(article.id)}
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
