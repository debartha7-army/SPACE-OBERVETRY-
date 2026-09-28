import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { SolarSystemVisualizer } from '../components/SolarSystemVisualizer.jsx';
import { Card } from '../components/Card.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { Globe, Plus, Moon, Disc, Sparkles } from 'lucide-react';

export const Planets = ({ onSelectPlanet, onOpenAdminModal }) => {
  const { isAdmin, showNotification } = useAuth();
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 24, totalPages: 1 });
  
  // View mode switcher: 'planets' | 'moons'
  const [viewMode, setViewMode] = useState('planets');
  const [allMoons, setAllMoons] = useState([]);
  const [moonsLoading, setMoonsLoading] = useState(false);
  const [moonParentFilter, setMoonParentFilter] = useState('all');

  const loadPlanets = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.getPlanets({
        page,
        limit: 24,
        type: activeFilter !== 'all' ? activeFilter : undefined,
        search: searchQuery || undefined
      });
      if (res.data.success) {
        setPlanets(res.data.data || []);
        if (res.data.pagination) setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Failed to load planets:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAllMoons = async () => {
    try {
      setMoonsLoading(true);
      const res = await api.getAllMoons();
      if (res.data.success) {
        setAllMoons(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to load moons:', err);
    } finally {
      setMoonsLoading(false);
    }
  };

  useEffect(() => {
    loadPlanets(currentPage);
  }, [activeFilter, currentPage]);

  useEffect(() => {
    if (viewMode === 'moons' && allMoons.length === 0) {
      loadAllMoons();
    }
  }, [viewMode]);

  const handleDelete = async (id) => {
    try {
      const res = await api.deletePlanet(id);
      if (res.data.success) {
        showNotification('Solar system body removed.', 'info');
        loadPlanets(currentPage);
      }
    } catch (err) {
      showNotification(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const handleSelectByName = (planetName) => {
    const matched = planets.find(p => p.name.toLowerCase() === planetName.toLowerCase());
    if (matched) {
      onSelectPlanet(matched);
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Bodies', count: pagination.total },
    { id: 'Terrestrial', label: 'Terrestrial (Rocky)' },
    { id: 'Asteroid Belt', label: 'Asteroid Belt' },
    { id: 'Gas Giant', label: 'Gas Giants' },
    { id: 'Ice Giant', label: 'Ice Giants' },
    { id: 'Dwarf Planet', label: 'Dwarf Planets' }
  ];

  const totalSystemMoons = planets.reduce((acc, p) => acc + (p.moons || 0), 0);

  const filteredMoons = allMoons.filter(m => {
    const matchesParent = moonParentFilter === 'all' || m.planet_name.toLowerCase() === moonParentFilter.toLowerCase();
    const matchesSearch = !searchQuery || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.planet_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesParent && matchesSearch;
  });

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <span className="badge badge-gold">
              <Globe size={13} /> Heliocentric Science
            </span>
            <span className="badge badge-cyan">
              <Moon size={13} /> {totalSystemMoons > 0 ? `${totalSystemMoons} Total Known Moons` : '293+ Natural Satellites'}
            </span>
          </div>
          <h1>Solar System & Planetary Bodies</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '680px' }}>
            Explore all 8 major planets, dwarf worlds, and over 290 natural satellites. Inspect orbital mechanics, atmospheric chemistry, cryovolcanism, and subterranean ocean moons.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {isAdmin && (
            <button
              onClick={() => onOpenAdminModal('planet')}
              className="btn btn-primary"
            >
              <Plus size={16} /> Register Solar Body
            </button>
          )}
        </div>
      </div>

      {/* Interactive 2D Orrery Visualizer */}
      <SolarSystemVisualizer onSelectPlanet={handleSelectByName} />

      {/* Explorer Mode Toggle Switcher */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '0.75rem 1.25rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setViewMode('planets')}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              border: viewMode === 'planets' ? '1px solid var(--gold-accent)' : '1px solid transparent',
              background: viewMode === 'planets' ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
              color: viewMode === 'planets' ? 'var(--gold-accent)' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.2s'
            }}
          >
            <Globe size={15} /> All Planets & Worlds ({planets.length})
          </button>
          <button
            onClick={() => setViewMode('moons')}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              border: viewMode === 'moons' ? '1px solid var(--cyan-primary)' : '1px solid transparent',
              background: viewMode === 'moons' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
              color: viewMode === 'moons' ? 'var(--cyan-primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.2s'
            }}
          >
            <Moon size={15} /> All Moons Explorer ({allMoons.length > 0 ? allMoons.length : 'Catalog'})
          </button>
        </div>

        {viewMode === 'moons' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Filter Host:</span>
            {['all', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Eris', 'Haumea', 'Makemake', 'Quaoar', 'Orcus', 'Gonggong'].map(pName => (
              <button
                key={pName}
                onClick={() => setMoonParentFilter(pName)}
                className={`btn btn-sm ${moonParentFilter === pName ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
              >
                {pName === 'all' ? 'All Moons' : pName}
              </button>
            ))}
          </div>
        )}
      </div>

      {viewMode === 'planets' ? (
        <>
          {/* Search and Filters for Planets */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            placeholder="Search planets, Uranus, Neptune, Pluto, or Asteroid Belt (Vesta, Psyche, Pallas)..."
            filters={filterTabs}
            activeFilter={activeFilter}
            setActiveFilter={(f) => {
              setActiveFilter(f);
              setCurrentPage(1);
            }}
          />

          {/* Asteroid Belt Scientific Dossier Panel */}
          {(activeFilter === 'Asteroid Belt' || searchQuery.toLowerCase().includes('asteroid') || searchQuery.toLowerCase().includes('vesta') || searchQuery.toLowerCase().includes('psyche')) && (
            <div className="glass-panel" style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(15, 23, 42, 0.9) 100%)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="badge badge-gold">
                    <Disc size={13} /> Main Belt Science
                  </span>
                  <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>
                    The Main Asteroid Belt Architecture
                  </h3>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-accent)', fontWeight: 600 }}>
                  2.1 to 3.3 AU from Sun • ~1,000,000+ Asteroids Cataloged
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--cyan-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    1. Kirkwood Gaps
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                    Orbital resonances with giant Jupiter (3:1, 5:2, 7:3, 2:1) clear empty lane gaps by gravitationally ejecting bodies into Earth-crossing orbits or the Sun.
                  </p>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    2. The Big Four
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                    Ceres (39%), Vesta (9%), Pallas (7%), and Hygiea (3%) contain over half the total mass of the entire asteroid belt (~2.4 × 10²¹ kg; ~3% of Earth's Moon).
                  </p>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--purple-accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    3. Compositional Classes
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                    C-type (75% carbonaceous/organic clay), S-type (17% silicate/stony), M-type (10% metallic iron-nickel core, e.g. 16 Psyche), and V-type (basaltic crust).
                  </p>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    4. Spacecraft Exploration
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                    Explored by NASA Dawn (Vesta & Ceres), NASA Psyche (arriving 2029), NASA Lucy (Trojans), and sample returns by OSIRIS-REx & JAXA Hayabusa2.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Planet Cards Grid */}
          <div className="grid-cards">
            {planets.map((planet) => (
              <div key={planet.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <Card
                  item={planet}
                  type="planets_solar_system"
                  title={planet.name}
                  subtitle={planet.type}
                  badgeText={`${planet.moons || 0} Moons`}
                  badgeColor={planet.moons > 0 ? 'gold' : 'cyan'}
                  imageUrl={planet.image_url}
                  metrics={[
                    { label: 'Moons', value: `${planet.moons || 0}` },
                    { label: 'Period', value: planet.orbital_period ? planet.orbital_period.split(' ')[0] : 'N/A' },
                    { label: 'Distance', value: planet.distance_sun ? planet.distance_sun.split(' ')[0] : 'N/A' }
                  ]}
                  description={planet.description}
                  onSelect={() => onSelectPlanet(planet)}
                  onEdit={() => onOpenAdminModal('planet', planet)}
                  onDelete={() => handleDelete(planet.id)}
                />
                {planet.major_moons && planet.moons > 0 && (
                  <div 
                    onClick={() => onSelectPlanet(planet)}
                    style={{
                      marginTop: '-0.25rem',
                      marginBottom: '0.5rem',
                      padding: '0.5rem 0.85rem',
                      background: 'rgba(251, 191, 36, 0.06)',
                      border: '1px solid rgba(251, 191, 36, 0.2)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      color: 'var(--text-subtle)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(251, 191, 36, 0.12)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(251, 191, 36, 0.06)'}
                  >
                    <Moon size={12} color="var(--gold-accent)" />
                    <span style={{ color: 'var(--gold-accent)', fontWeight: 600 }}>Moons:</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#e2e8f0' }}>
                      {planet.major_moons}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            limit={pagination.limit}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </>
      ) : (
        /* All Moons Explorer Grid */
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search moons by name, diameter, features (e.g. Titan, ocean, Europa, geysers)..."
              filters={[]}
              activeFilter="all"
              setActiveFilter={() => {}}
            />
          </div>

          {moonsLoading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              Compiling Lunar & Satellite Spectrometry...
            </div>
          ) : filteredMoons.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No satellites matching search criteria.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredMoons.map((moon, mIdx) => (
                <div
                  key={mIdx}
                  className="glass-panel"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'transform 0.2s, border-color 0.2s',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <div style={{ height: '170px', position: 'relative', overflow: 'hidden', background: '#0a0e1c' }}>
                    <img
                      src={moon.image_url || '/images/moons/moon.jpg'}
                      alt={moon.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10, 14, 28, 0.9) 0%, transparent 60%)'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      display: 'flex',
                      gap: '0.4rem'
                    }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                        <Globe size={11} /> {moon.planet_name} Moon
                      </span>
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '0.75rem',
                      left: '0.75rem',
                      right: '0.75rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline'
                    }}>
                      <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{moon.name}</h3>
                      <span style={{ fontSize: '0.78rem', color: 'var(--cyan-primary)', fontWeight: 600 }}>
                        {moon.diameter_km}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.5rem',
                      background: 'rgba(0, 0, 0, 0.25)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', textTransform: 'uppercase', display: 'block' }}>Orbital Period</span>
                        <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--gold-accent)' }}>{moon.orbital_period}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', textTransform: 'uppercase', display: 'block' }}>Orbital Distance</span>
                        <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#e2e8f0' }}>{moon.distance_km}</span>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, flex: 1 }}>
                      {moon.description}
                    </p>

                    <button
                      onClick={() => handleSelectByName(moon.planet_name)}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <Globe size={14} color="var(--cyan-primary)" /> View Primary Planet ({moon.planet_name})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

