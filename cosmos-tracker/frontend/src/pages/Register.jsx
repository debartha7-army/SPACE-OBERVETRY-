import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Sparkles, Lock, Mail, User, BookOpen } from 'lucide-react';

export const Register = ({ setActiveTab }) => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await register({
      username,
      email,
      password,
      bio: bio || 'Cosmic observer'
    });
    setSubmitting(false);
    if (res.success) {
      setActiveTab('dashboard');
    }
  };

  return (
    <div style={{
      maxWidth: '480px',
      margin: '2rem auto',
      width: '100%'
    }}>
      <div className="glass-panel" style={{
        padding: '2.5rem',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'rgba(10, 14, 28, 0.95)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: 'var(--shadow-glow)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
          }}>
            <Sparkles size={22} color="#060814" strokeWidth={2.5} />
          </div>

          <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>
            Join the Observatory
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Create your personalized astronomical passport
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Stargazer Username *
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                required
                className="cosmic-input"
                style={{ paddingLeft: '2.8rem' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="CassiopeiaExplorer"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Email Address *
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                className="cosmic-input"
                style={{ paddingLeft: '2.8rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="astronomer@domain.org"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Password (Min 6 characters) *
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                minLength={6}
                className="cosmic-input"
                style={{ paddingLeft: '2.8rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Astronomical Bio / Equipment
            </label>
            <textarea
              rows={2}
              className="cosmic-textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. Backyard astronomer with Celestron 8SE Schmidt-Cassegrain..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
          >
            {submitting ? 'Registering with Bcrypt Hashing...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <span
            onClick={() => setActiveTab('login')}
            style={{ color: 'var(--cyan-primary)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
};
