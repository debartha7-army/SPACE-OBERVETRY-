import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  Compass, 
  Calendar, 
  Sparkles, 
  Globe, 
  Disc, 
  CircleDot, 
  Atom, 
  BookOpen, 
  Flame,
  GraduationCap,
  User, 
  LogOut, 
  Menu, 
  X, 
  Bookmark,
  ShieldCheck
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview', icon: Compass },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'stars', label: 'Stars', icon: Sparkles },
    { id: 'planets', label: 'Planets', icon: Globe },
    { id: 'galaxies', label: 'Galaxies', icon: Disc },
    { id: 'novae', label: 'Novae & Variables', icon: Flame },
    { id: 'blackholes', label: 'Black Holes', icon: CircleDot },
    { id: 'theories', label: 'Theories', icon: Atom },
    { id: 'articles', label: 'Articles', icon: BookOpen },
    { id: 'dispatches', label: 'Papers & Social', icon: GraduationCap }
  ];

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--nav-height)',
      backgroundColor: 'rgba(5, 7, 14, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => handleNav('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(56, 189, 248, 0.45)'
        }}>
          <CircleDot size={20} color="#060814" strokeWidth={2.5} />
        </div>
        <div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #ffffff 30%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            COSMOS
          </span>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            fontWeight: 400,
            color: 'var(--text-muted)',
            marginLeft: '4px'
          }}>
            TRACKER
          </span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.2rem'
      }} className="desktop-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                color: isActive ? 'var(--cyan-primary)' : 'var(--text-muted)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.84rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-pure)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <Icon size={14} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Actions & Auth Profile */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem'
      }}>
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => handleNav('dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: activeTab === 'dashboard' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                border: activeTab === 'dashboard' ? '1px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                color: activeTab === 'dashboard' ? 'var(--cyan-primary)' : 'var(--text-heading)',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.84rem',
                fontWeight: 600
              }}
            >
              <Bookmark size={14} />
              <span>Watchlist</span>
              {isAdmin && (
                <span className="badge badge-purple" style={{ padding: '0.1rem 0.35rem', fontSize: '0.62rem' }}>
                  Admin
                </span>
              )}
            </button>

            <button
              onClick={logout}
              title="Logout"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34,
                height: 34,
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fb7185'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <button
              onClick={() => handleNav('login')}
              className="btn btn-secondary btn-sm"
            >
              Log In
            </button>
            <button
              onClick={() => handleNav('register')}
              className="btn btn-primary btn-sm"
            >
              Join Observatory
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-heading)',
            cursor: 'pointer',
            padding: '0.4rem'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: 'var(--nav-height)',
          left: 0,
          right: 0,
          background: 'rgba(10, 14, 28, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? 'var(--cyan-primary)' : 'var(--text-heading)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 1080px) {
          .desktop-links {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};
