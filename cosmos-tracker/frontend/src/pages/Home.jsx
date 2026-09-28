import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  Sparkles, 
  Calendar, 
  Globe, 
  Disc, 
  CircleDot, 
  Atom, 
  BookOpen, 
  Flame,
  GraduationCap,
  ArrowRight, 
  Telescope,
  Clock,
  Compass,
  ChevronRight,
  Eye,
  ExternalLink
} from 'lucide-react';

export const Home = ({ setActiveTab, setSelectedItem, setDetailType }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [skyOfTheMonth, setSkyOfTheMonth] = useState(null);
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [statsRes, eventsRes, articlesRes, skyRes, apodRes] = await Promise.all([
          api.getStats(),
          api.getEvents({ limit: 3 }),
          api.getArticles({ limit: 2 }),
          api.getSkyOfTheMonth(),
          api.getApod()
        ]);

        if (statsRes.data?.success) setStats(statsRes.data.data);
        if (eventsRes.data?.success) setUpcomingEvents(eventsRes.data.data || []);
        if (articlesRes.data?.success) setFeaturedArticles(eventsRes.data?.data ? (articlesRes.data.data || []) : []);
        if (skyRes.data?.success) setSkyOfTheMonth(skyRes.data.data);
        if (apodRes.data?.success) setApod(apodRes.data.data);
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const openItemDetail = (item, type) => {
    setSelectedItem(item);
    setDetailType(type);
  };

  const domainCards = [
    { id: 'events', title: 'Celestial Events', desc: 'Eclipses, meteor shower peaks, occultations & oppositions', count: stats?.eventsCount, icon: Calendar, color: 'cyan' },
    { id: 'stars', title: 'Stars & Constellations', desc: 'Spectral classification, stellar coordinates, mythologies', count: stats?.starsCount, icon: Sparkles, color: 'purple' },
    { id: 'planets', title: 'Solar System', desc: 'Interactive orrery, planetary atmospheres, surface conditions', count: stats?.planetsCount, icon: Globe, color: 'gold' },
    { id: 'galaxies', title: 'Deep Galaxies', desc: 'Spirals, ellipticals, redshifts, Local Group cosmology', count: stats?.galaxiesCount, icon: Disc, color: 'emerald' },
    { id: 'novae', title: 'Novae & Variables', desc: 'Recurrent outbursts, pulsating Cepheids, cataclysmic white dwarfs', count: stats?.novaeCount, icon: Flame, color: 'rose' },
    { id: 'blackholes', title: 'Black Holes', desc: 'Supermassive singularities, event horizons, relativistic jets', count: stats?.blackHolesCount, icon: CircleDot, color: 'rose' },
    { id: 'theories', title: 'Cosmic Theories', desc: 'Big Bang, inflation, string theory, cosmic destiny models', count: stats?.theoriesCount, icon: Atom, color: 'purple' },
    { id: 'articles', title: 'Observatory News', desc: 'JWST breakthroughs, Hubble tension, planetary explorations', count: stats?.articlesCount, icon: BookOpen, color: 'cyan' },
    { id: 'dispatches', title: 'Daily Papers & Social', desc: 'Updated daily at 7 AM: Harvard, MIT preprints + YouTube, X, Reddit dispatches', count: 'Daily 7 AM', icon: GraduationCap, color: 'gold' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '3rem 0 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem'
      }}>
        <div className="badge badge-cyan" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
          <Sparkles size={14} /> Full Universe Tracking & Observation Engine
        </div>

        <h1 style={{ maxWidth: '960px', textWrap: 'balance' }}>
          Track Everything Happening in the{' '}
          <span className="cosmic-gradient-text">Observable Universe</span>
        </h1>

        <p style={{
          maxWidth: '680px',
          fontSize: '1.15rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6
        }}>
          From imminent meteor showers and total solar eclipses to recurrent novae,
          planetary atmospheres, supermassive black holes, and the cosmic microwave background.
        </p>

        {/* Hero Call to Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => setActiveTab('events')}
            className="btn btn-primary"
            style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}
          >
            <Calendar size={18} />
            <span>Upcoming Sky Events</span>
          </button>

          <button
            onClick={() => setActiveTab('dispatches')}
            className="btn btn-glow"
            style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}
          >
            <GraduationCap size={18} />
            <span>Daily Papers & Social</span>
          </button>

          <button
            onClick={() => setActiveTab('planets')}
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}
          >
            <Globe size={18} />
            <span>Interactive Orrery</span>
          </button>
        </div>

        {/* Real-time Universe Statistics Ticker */}
        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            width: '100%',
            maxWidth: '1000px',
            marginTop: '2.5rem'
          }}>
            {[
              { label: 'Catalog Objects', value: stats.totalCatalogObjects, highlight: true },
              { label: 'Upcoming Events', value: stats.eventsCount, color: 'var(--cyan-primary)' },
              { label: 'Stellar Systems', value: stats.starsCount },
              { label: 'Solar Planets', value: stats.planetsCount },
              { label: 'Deep Galaxies', value: stats.galaxiesCount },
              { label: 'Novae / Variables', value: stats.novaeCount, color: 'var(--rose-accent)' },
              { label: 'Singularities', value: stats.blackHolesCount }
            ].map((stat, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.85rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: stat.color || (stat.highlight ? 'var(--cyan-primary)' : '#ffffff')
                }}>
                  {stat.value || 0}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FEATURE: SKY OF THE MONTH SECTION */}
      {skyOfTheMonth && (
        <section className="glass-panel" style={{
          padding: '2.25rem',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.6) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge badge-gold">
                  <Telescope size={12} /> Stargazing Field Guide
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--cyan-primary)', fontWeight: 600 }}>
                  {skyOfTheMonth.month} 2026 Night Skies
                </span>
              </div>
              <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>
                Sky of the Month: {skyOfTheMonth.theme}
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('events')}
              className="btn btn-glow btn-sm"
            >
              See All Sightings <ChevronRight size={15} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {/* Planets to Spot */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <h4 style={{ color: 'var(--gold-accent)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Globe size={16} /> Naked-Eye Planetary Targets
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {skyOfTheMonth.nakedEyePlanets?.map((p, idx) => (
                  <div key={idx} style={{ fontSize: '0.88rem' }}>
                    <strong style={{ color: '#fff' }}>{p.planet}: </strong>
                    <span style={{ color: 'var(--text-muted)' }}>{p.visibility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Sky Targets */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <h4 style={{ color: 'var(--cyan-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Sparkles size={16} /> Binocular & Telescope Highlights
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {skyOfTheMonth.deepSkyTargets?.map((t, idx) => (
                  <div key={idx} style={{ fontSize: '0.88rem' }}>
                    <strong style={{ color: '#fff' }}>{t.name}: </strong>
                    <span style={{ color: 'var(--text-muted)' }}>{t.equipment}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Observer Advice */}
            <div style={{
              background: 'rgba(56, 189, 248, 0.06)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              border: '1px solid rgba(56, 189, 248, 0.2)'
            }}>
              <h4 style={{ color: 'var(--purple-accent)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Compass size={16} /> Key Observing Advice
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#e0f2fe', lineHeight: 1.5 }}>
                {skyOfTheMonth.observingAdvice}
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
                <strong>Dark Sky Window: </strong>{skyOfTheMonth.lunarPhases}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PUBLIC API INTEGRATION: NASA APOD */}
      {apod && (
        <section className="glass-panel" style={{
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 420px) 1fr',
          border: '1px solid rgba(56, 189, 248, 0.3)'
        }}>
          <div style={{ position: 'relative', minHeight: '260px', backgroundColor: '#090d1a' }}>
            <img
              src={apod.url}
              alt={apod.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem'
            }}>
              <span className="badge badge-cyan">NASA Astronomy Picture of the Day</span>
            </div>
          </div>

          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--cyan-primary)', fontWeight: 600 }}>
              Live NASA Public API Feed • {apod.date}
            </span>
            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>{apod.title}</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              {apod.explanation}
            </p>
            {apod.copyright && (
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: 'auto' }}>
                Credit: {apod.copyright}
              </span>
            )}
          </div>
        </section>
      )}

      {/* Domain Exploration Grid */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '0.3rem' }}>Cosmic Categories</span>
            <h2>Explore the Cosmos by Realm</h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {domainCards.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                onClick={() => setActiveTab(domain.id)}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'all var(--transition-smooth)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-md)',
                    background: `rgba(56, 189, 248, 0.12)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--cyan-primary)'
                  }}>
                    <Icon size={22} />
                  </div>
                  {domain.count !== undefined && (
                    <span className={`badge badge-${domain.color}`}>
                      {domain.count} Entities
                    </span>
                  )}
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>{domain.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {domain.desc}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  color: 'var(--cyan-primary)',
                  fontWeight: 600,
                  marginTop: 'auto'
                }}>
                  Enter Observatory <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Astronomy Quote */}
      <section className="glass-panel" style={{
        padding: '2.5rem',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 27, 75, 0.4) 100%)',
        border: '1px solid rgba(192, 132, 252, 0.25)',
        textAlign: 'center'
      }}>
        <Sparkles size={28} color="var(--purple-accent)" style={{ margin: '0 auto 1rem' }} />
        <blockquote style={{
          fontSize: '1.25rem',
          fontStyle: 'italic',
          color: '#f8fafc',
          maxWidth: '780px',
          margin: '0 auto 1rem',
          lineHeight: 1.6
        }}>
          "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of starstuff."
        </blockquote>
        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--cyan-primary)' }}>
          — Carl Sagan, Cosmos
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .glass-panel[style*="grid-template-columns: minmax(280px, 420px) 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
