import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { 
  GraduationCap, 
  Share2, 
  Clock, 
  RefreshCw, 
  ExternalLink, 
  BookOpen, 
  FileText, 
  Youtube, 
  MessageSquare, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';

export const ResearchDispatches = () => {
  const { showNotification } = useAuth();
  const [activeMainTab, setActiveMainTab] = useState('papers'); // 'papers' | 'social'

  // Papers state
  const [papers, setPapers] = useState([]);
  const [papersLoading, setPapersLoading] = useState(true);
  const [activeUniFilter, setActiveUniFilter] = useState('all');
  const [paperSearch, setPaperSearch] = useState('');
  const [paperPagination, setPaperPagination] = useState({ total: 0, page: 1, limit: 6, totalPages: 1 });
  const [paperPage, setPaperPage] = useState(1);

  // Social state
  const [socialPosts, setSocialPosts] = useState([]);
  const [socialLoading, setSocialLoading] = useState(true);
  const [activePlatformFilter, setActivePlatformFilter] = useState('all');
  const [socialSearch, setSocialSearch] = useState('');
  const [socialPagination, setSocialPagination] = useState({ total: 0, page: 1, limit: 6, totalPages: 1 });
  const [socialPage, setSocialPage] = useState(1);

  // Sync state
  const [syncStatus, setSyncStatus] = useState(null);
  const [syncing, setSyncing] = useState(false);

  // Load sync status
  const loadSyncStatus = async () => {
    try {
      const res = await api.getDispatchStatus();
      if (res.data?.success) {
        setSyncStatus(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load sync status:', err);
    }
  };

  // Load Papers
  const loadPapers = async (page = 1) => {
    try {
      setPapersLoading(true);
      const res = await api.getResearchPapers({
        page,
        limit: 6,
        institution: activeUniFilter !== 'all' ? activeUniFilter : undefined,
        search: paperSearch || undefined
      });
      if (res.data?.success) {
        setPapers(res.data.data || []);
        if (res.data.pagination) setPaperPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Failed to load papers:', err);
    } finally {
      setPapersLoading(false);
    }
  };

  // Load Social
  const loadSocial = async (page = 1) => {
    try {
      setSocialLoading(true);
      const res = await api.getSocialFeeds({
        page,
        limit: 6,
        platform: activePlatformFilter !== 'all' ? activePlatformFilter : undefined,
        search: socialSearch || undefined
      });
      if (res.data?.success) {
        setSocialPosts(res.data.data || []);
        if (res.data.pagination) setSocialPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Failed to load social posts:', err);
    } finally {
      setSocialLoading(false);
    }
  };

  useEffect(() => {
    loadSyncStatus();
  }, []);

  useEffect(() => {
    loadPapers(paperPage);
  }, [activeUniFilter, paperPage]);

  useEffect(() => {
    loadSocial(socialPage);
  }, [activePlatformFilter, socialPage]);

  // Handle Manual Trigger
  const handleTriggerSync = async () => {
    try {
      setSyncing(true);
      const res = await api.triggerDispatchSync();
      if (res.data?.success) {
        showNotification('Daily 7:00 AM pipeline executed! Latest academic preprints & social feeds updated.', 'success');
        await loadSyncStatus();
        loadPapers(1);
        loadSocial(1);
      }
    } catch (err) {
      showNotification('Sync failed: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setSyncing(false);
    }
  };

  const uniFilters = [
    { id: 'all', label: 'All Top Universities' },
    { id: 'Harvard', label: 'Harvard CfA' },
    { id: 'MIT', label: 'MIT Kavli' },
    { id: 'Caltech', label: 'Caltech Cahill' },
    { id: 'Cambridge', label: 'Cambridge IoA' },
    { id: 'Oxford', label: 'Oxford Astrophysics' },
    { id: 'Princeton', label: 'Princeton' },
    { id: 'Max Planck', label: 'Max Planck (MPIA)' },
    { id: 'NASA', label: 'NASA JPL' }
  ];

  const platformFilters = [
    { id: 'all', label: 'All Social Feeds' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'x', label: 'X (Twitter)' },
    { id: 'threads', label: 'Threads' },
    { id: 'reddit', label: 'Reddit' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'wikipedia', label: 'Wikipedia Portal' }
  ];

  const getPlatformMeta = (platform) => {
    switch (platform) {
      case 'youtube':
        return { label: 'YouTube', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)' };
      case 'x':
        return { label: 'X (Twitter)', color: '#ffffff', bg: 'rgba(255, 255, 255, 0.12)', border: 'rgba(255, 255, 255, 0.3)' };
      case 'threads':
        return { label: 'Threads', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.15)', border: 'rgba(192, 132, 252, 0.4)' };
      case 'instagram':
        return { label: 'Instagram', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.4)' };
      case 'reddit':
        return { label: 'Reddit', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.4)' };
      case 'facebook':
        return { label: 'Facebook', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)' };
      case 'wikipedia':
        return { label: 'Wikipedia', color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.4)' };
      default:
        return { label: platform, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div>
          <span className="badge badge-purple" style={{ marginBottom: '0.4rem' }}>
            <Sparkles size={13} /> Academic Intelligence & Social Dispatches
          </span>
          <h1>Daily Research & Social Media Hub</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '720px' }}>
            Automated intelligence pipeline updated daily at 7:00 AM: Top university preprints from Harvard, MIT, Caltech, Cambridge, Oxford, Princeton, and Max Planck, alongside official dispatches across YouTube, X, Threads, Instagram, Reddit, Facebook, and Wikipedia.
          </p>
        </div>

        {/* 7:00 AM Sync Trigger & Scheduler Info */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.5) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          boxShadow: 'var(--shadow-card)',
          minWidth: '280px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} /> Scheduled: Daily 7:00 AM
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
              Active (0 7 * * *)
            </span>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Last sync: <strong style={{ color: '#fff' }}>{syncStatus?.lastSyncTime ? new Date(syncStatus.lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '07:00 AM Today'}</strong>
          </div>

          <button
            onClick={handleTriggerSync}
            disabled={syncing}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
            <span>{syncing ? 'Executing 7 AM Sync...' : 'Sync Today\'s 7 AM Batch Now'}</span>
          </button>
        </div>
      </div>

      {/* Main Mode Toggle: University Papers vs Social Dispatches */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-subtle)',
        gap: '1rem',
        paddingBottom: '0.25rem'
      }}>
        <button
          onClick={() => setActiveMainTab('papers')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1.4rem',
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            border: 'none',
            borderBottom: activeMainTab === 'papers' ? '2px solid var(--cyan-primary)' : '2px solid transparent',
            background: activeMainTab === 'papers' ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
            color: activeMainTab === 'papers' ? 'var(--cyan-primary)' : 'var(--text-muted)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.96rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          <GraduationCap size={18} />
          <span>Top Universities Daily Papers</span>
          <span className="badge badge-cyan" style={{ marginLeft: '4px', fontSize: '0.72rem' }}>
            {paperPagination.total || 8}
          </span>
        </button>

        <button
          onClick={() => setActiveMainTab('social')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem 1.4rem',
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            border: 'none',
            borderBottom: activeMainTab === 'social' ? '2px solid var(--purple-accent)' : '2px solid transparent',
            background: activeMainTab === 'social' ? 'rgba(192, 132, 252, 0.12)' : 'transparent',
            color: activeMainTab === 'social' ? 'var(--purple-accent)' : 'var(--text-muted)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.96rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          <Share2 size={18} />
          <span>Social Media Feeds (YouTube, X, Reddit...)</span>
          <span className="badge badge-purple" style={{ marginLeft: '4px', fontSize: '0.72rem' }}>
            {socialPagination.total || 8}
          </span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SECTION 1: TOP UNIVERSITIES RESEARCH PAPERS */}
      {/* ============================================================== */}
      {activeMainTab === 'papers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Institution Filter Pills & Search */}
          <SearchBar
            searchQuery={paperSearch}
            setSearchQuery={(q) => {
              setPaperSearch(q);
              setPaperPage(1);
            }}
            placeholder="Search Harvard, MIT, Caltech, arXiv preprints, dark matter, black holes..."
            filters={uniFilters}
            activeFilter={activeUniFilter}
            setActiveFilter={(f) => {
              setActiveUniFilter(f);
              setPaperPage(1);
            }}
          />

          {/* Papers Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  position: 'relative',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {/* Header: Institution & Badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                    <GraduationCap size={12} /> {paper.institution}
                  </span>
                  <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                    {paper.category}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.15rem', color: '#fff', lineHeight: 1.45 }}>
                  {paper.title}
                </h3>

                {/* Authors */}
                <div style={{ fontSize: '0.84rem', color: 'var(--cyan-primary)', fontWeight: 500 }}>
                  ✍️ {paper.authors}
                </div>

                {/* Abstract */}
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {paper.abstract}
                </p>

                {/* Footer: Date, Citations, Links */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-subtle)'
                }}>
                  <div>
                    <span>{paper.arxiv_id} • </span>
                    <span style={{ color: 'var(--emerald-accent)' }}>{paper.citations} citations</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                    >
                      <ExternalLink size={13} />
                      <span>arXiv Abstract</span>
                    </a>
                    <a
                      href={paper.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                    >
                      <FileText size={13} />
                      <span>PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={paperPagination.page}
            totalPages={paperPagination.totalPages}
            totalItems={paperPagination.total}
            limit={paperPagination.limit}
            onPageChange={(p) => setPaperPage(p)}
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 2: SOCIAL MEDIA FEEDS (YOUTUBE, X, THREADS, REDDIT...) */}
      {/* ============================================================== */}
      {activeMainTab === 'social' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Platform Filters & Search */}
          <SearchBar
            searchQuery={socialSearch}
            setSearchQuery={(q) => {
              setSocialSearch(q);
              setSocialPage(1);
            }}
            placeholder="Search YouTube, X dispatches, Reddit megathreads, Instagram reels, Wikipedia..."
            filters={platformFilters}
            activeFilter={activePlatformFilter}
            setActiveFilter={(f) => {
              setActivePlatformFilter(f);
              setSocialPage(1);
            }}
          />

          {/* Social Media Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
            {socialPosts.map((post) => {
              const meta = getPlatformMeta(post.platform);
              return (
                <div
                  key={post.id}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    border: `1px solid ${meta.border}`,
                    background: 'rgba(10, 14, 28, 0.9)',
                    position: 'relative'
                  }}
                >
                  {/* Platform Brand Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <img
                        src={post.avatar_url}
                        alt={post.channel_name}
                        style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fff' }}>
                          {post.channel_name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                          {post.handle}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: meta.color,
                        background: meta.bg,
                        border: `1px solid ${meta.border}`
                      }}
                    >
                      {meta.label}
                    </span>
                  </div>

                  {/* Title & Post Content */}
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.45rem', lineHeight: 1.4 }}>
                      {post.title}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                      {post.content}
                    </p>
                  </div>

                  {/* Footer: Engagement & Direct Link */}
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <TrendingUp size={14} color="var(--cyan-primary)" />
                      {post.engagement}
                    </span>

                    <a
                      href={post.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.8rem',
                        borderColor: meta.border,
                        color: '#fff'
                      }}
                    >
                      <ExternalLink size={13} />
                      <span>Open on {meta.label}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Social Pagination */}
          <Pagination
            currentPage={socialPagination.page}
            totalPages={socialPagination.totalPages}
            totalItems={socialPagination.total}
            limit={socialPagination.limit}
            onPageChange={(p) => setSocialPage(p)}
          />
        </div>
      )}

      {/* Directory of Astronomical Social Portals */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1.75rem',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 27, 75, 0.4) 100%)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={18} color="var(--cyan-primary)" /> Verified Space Portals & Channels
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Direct access to live broadcasts, discussion threads, and official agency accounts.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.75rem'
        }}>
          {[
            { name: 'NASA YouTube', url: 'https://youtube.com/@NASA', color: '#ef4444', desc: 'Live spacewalks & launches' },
            { name: 'NASA Webb X', url: 'https://x.com/NASAWebb', color: '#ffffff', desc: 'Real-time deep infrared science' },
            { name: 'ESA Threads', url: 'https://threads.net/@europeanspaceagency', color: '#c084fc', desc: 'Euclid & Ariane dispatches' },
            { name: 'r/astronomy Reddit', url: 'https://reddit.com/r/astronomy', color: '#f97316', desc: 'Amateur astrophotography' },
            { name: 'NASA Instagram', url: 'https://instagram.com/nasa', color: '#f43f5e', desc: 'Stunning cosmic photography' },
            { name: 'Astronomy Facebook', url: 'https://facebook.com/AstronomyMagazine', color: '#38bdf8', desc: 'Night sky charts & alerts' },
            { name: 'Wikipedia Portal', url: 'https://en.wikipedia.org/wiki/Portal:Astronomy', color: '#34d399', desc: 'Encyclopedic peer-review' }
          ].map((portal, idx) => (
            <a
              key={idx}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = portal.color;
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: portal.color, fontSize: '0.88rem' }}>{portal.name}</span>
                <ExternalLink size={12} color="var(--text-subtle)" />
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{portal.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
