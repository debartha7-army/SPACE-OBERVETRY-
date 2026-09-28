import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { Starfield } from './components/Starfield.jsx';
import { Navbar } from './components/Navbar.jsx';
import { DetailModal } from './components/DetailModal.jsx';
import { AdminModal } from './components/AdminModal.jsx';
import { NotificationToast } from './components/NotificationToast.jsx';

import { Home } from './pages/Home.jsx';
import { Events } from './pages/Events.jsx';
import { Stars } from './pages/Stars.jsx';
import { Planets } from './pages/Planets.jsx';
import { Galaxies } from './pages/Galaxies.jsx';
import { Novae } from './pages/Novae.jsx';
import { BlackHoles } from './pages/BlackHoles.jsx';
import { Theories } from './pages/Theories.jsx';
import { Articles } from './pages/Articles.jsx';
import { ResearchDispatches } from './pages/ResearchDispatches.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Dashboard } from './pages/Dashboard.jsx';

import { CircleDot, Sparkles, Compass, Heart } from 'lucide-react';

const MainAppContent = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Detail Modal State
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailType, setDetailType] = useState('event');

  // Admin Modal State
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminModalType, setAdminModalType] = useState('event');
  const [adminEditItem, setAdminEditItem] = useState(null);

  const handleOpenDetail = (item, type) => {
    setSelectedItem(item);
    setDetailType(type);
  };

  const handleOpenAdminModal = (type = 'event', itemToEdit = null) => {
    setAdminModalType(type);
    setAdminEditItem(itemToEdit);
    setAdminModalOpen(true);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            setActiveTab={setActiveTab}
            setSelectedItem={setSelectedItem}
            setDetailType={setDetailType}
          />
        );
      case 'events':
        return (
          <Events
            onSelectEvent={(evt) => handleOpenDetail(evt, 'event')}
            onOpenAdminModal={(type, item) => handleOpenAdminModal(type || 'event', item)}
          />
        );
      case 'stars':
        return (
          <Stars
            onSelectStar={(star) => handleOpenDetail(star, 'star')}
            onOpenAdminModal={(type, item) => handleOpenAdminModal(type || 'star', item)}
          />
        );
      case 'planets':
        return (
          <Planets
            onSelectPlanet={(planet) => handleOpenDetail(planet, 'planet')}
            onOpenAdminModal={(type, item) => handleOpenAdminModal(type || 'planet', item)}
          />
        );
      case 'galaxies':
        return (
          <Galaxies
            onSelectGalaxy={(galaxy) => handleOpenDetail(galaxy, 'galaxy')}
            onOpenAdminModal={(type, item) => handleOpenAdminModal(type || 'galaxy', item)}
          />
        );
      case 'novae':
        return (
          <Novae
            onSelectNova={(nova) => handleOpenDetail(nova, 'novae_variables')}
            onOpenAdminModal={(type, item) => handleOpenAdminModal(type || 'nova', item)}
          />
        );
      case 'blackholes':
        return (
          <BlackHoles
            onSelectBlackHole={(bh) => handleOpenDetail(bh, 'black_hole')}
            onOpenAdminModal={(type, item) => handleOpenAdminModal(type || 'black_hole', item)}
          />
        );
      case 'theories':
        return (
          <Theories
            onSelectTheory={(theory) => handleOpenDetail(theory, 'theory')}
            onOpenAdminModal={(type, item) => handleOpenAdminModal(type || 'theory', item)}
          />
        );
      case 'articles':
        return (
          <Articles
            onSelectArticle={(art) => handleOpenDetail(art, 'article')}
            onOpenAdminModal={(type, item) => handleOpenAdminModal(type || 'article', item)}
          />
        );
      case 'dispatches':
        return <ResearchDispatches />;
      case 'login':
        return <Login setActiveTab={setActiveTab} />;
      case 'register':
        return <Register setActiveTab={setActiveTab} />;
      case 'dashboard':
        return (
          <Dashboard
            setActiveTab={setActiveTab}
            setSelectedItem={setSelectedItem}
            setDetailType={setDetailType}
            onOpenAdminModal={(type, item) => handleOpenAdminModal(type, item)}
          />
        );
      default:
        return <Home setActiveTab={setActiveTab} setSelectedItem={setSelectedItem} setDetailType={setDetailType} />;
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic Starfield Background */}
      <Starfield />
      <div className="cosmic-nebula-bg" />

      {/* Main Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Page Content Viewport */}
      <main className="main-content">
        {renderActivePage()}
      </main>

      {/* Detail Inspection Modal */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          type={detailType}
          onClose={() => setSelectedItem(null)}
          onEdit={(item) => handleOpenAdminModal(detailType, item)}
          onDelete={() => {
            setSelectedItem(null);
            // Re-render happens naturally via state
          }}
        />
      )}

      {/* Admin Content Creation / Modification Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          setAdminEditItem(null);
        }}
        initialType={adminModalType}
        editItem={adminEditItem}
        onSuccess={() => {
          // Trigger reload by re-navigating or local refresh
        }}
      />

      {/* Global Notifications */}
      <NotificationToast />

      {/* Observatory Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(5, 7, 14, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '3rem 2rem 2rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CircleDot size={18} color="#060814" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>
                COSMOS TRACKER
              </span>
            </div>

            {/* Quick Jumps */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <span onClick={() => setActiveTab('events')} style={{ cursor: 'pointer' }}>Events</span>
              <span onClick={() => setActiveTab('stars')} style={{ cursor: 'pointer' }}>Stars</span>
              <span onClick={() => setActiveTab('planets')} style={{ cursor: 'pointer' }}>Planets</span>
              <span onClick={() => setActiveTab('galaxies')} style={{ cursor: 'pointer' }}>Galaxies</span>
              <span onClick={() => setActiveTab('novae')} style={{ cursor: 'pointer' }}>Novae</span>
              <span onClick={() => setActiveTab('blackholes')} style={{ cursor: 'pointer' }}>Black Holes</span>
              <span onClick={() => setActiveTab('theories')} style={{ cursor: 'pointer' }}>Theories</span>
              <span onClick={() => setActiveTab('articles')} style={{ cursor: 'pointer' }}>Articles</span>
              <span onClick={() => setActiveTab('dispatches')} style={{ cursor: 'pointer' }}>Papers & Social</span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '1.5rem',
            fontSize: '0.8rem',
            color: 'var(--text-subtle)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              © 2026 Cosmos Tracker Observatory. Full-stack celestial surveillance engine.
            </div>
            <div>
              Built with Node.js, Express, React, Vite, Supabase, JWT & Bcrypt.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
