import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  searchQuery,
  setSearchQuery,
  placeholder = 'Search celestial objects, constellations, events, theories...',
  filters = [],
  activeFilter,
  setActiveFilter
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '2rem'
    }}>
      {/* Search Bar Input Container */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}>
        <div style={{
          position: 'absolute',
          left: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
          color: 'var(--text-subtle)'
        }}>
          <Search size={18} />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="cosmic-input"
          style={{
            paddingLeft: '3.2rem',
            paddingRight: searchQuery ? '3rem' : '1.25rem',
            height: '52px',
            fontSize: '1rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filter Tabs / Pills */}
      {filters && filters.length > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.35rem',
          scrollbarWidth: 'none'
        }}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? 'var(--cyan-primary)' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {filter.label} {filter.count !== undefined && `(${filter.count})`}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
