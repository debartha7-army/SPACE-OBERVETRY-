import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Sparkles, Lock, Mail, Eye, EyeOff, ShieldCheck, User } from 'lucide-react';

export const Login = ({ setActiveTab }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await login(email, password);
    setSubmitting(false);
    if (res.success) {
      setActiveTab('dashboard');
    }
  };

  const handleQuickFillDebartha = () => {
    setEmail('debarthaghosh262@gmail.com');
    setPassword('CosmosAdmin2026!');
  };

  const handleQuickFillAdmin = () => {
    setEmail('admin@cosmostracker.org');
    setPassword('CosmosAdmin2026!');
  };

  const handleQuickFillUser = () => {
    setEmail('stargazer@cosmostracker.org');
    setPassword('Stargazer2026!');
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
            <Lock size={22} color="#060814" strokeWidth={2.5} />
          </div>

          <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>
            Observatory Access
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Authenticate or enter any credentials to access the observatory
          </p>
        </div>

        {/* Quick Demo Credentials Fill Pills */}
        <div style={{
          marginBottom: '1.5rem',
          padding: '0.85rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px dashed rgba(56, 189, 248, 0.3)'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--cyan-primary)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
            EXPLORER QUICK ACCESS (CLICK TO FILL):
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
            <button
              type="button"
              onClick={handleQuickFillDebartha}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.74rem', padding: '0.45rem 0.25rem', border: '1px solid rgba(56, 189, 248, 0.4)' }}
              title="Debartha Ghosh (Administrator)"
            >
              <ShieldCheck size={13} color="var(--cyan-primary)" /> Debartha
            </button>
            <button
              type="button"
              onClick={handleQuickFillAdmin}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.74rem', padding: '0.45rem 0.25rem' }}
            >
              <ShieldCheck size={13} color="var(--purple-accent)" /> Admin
            </button>
            <button
              type="button"
              onClick={handleQuickFillUser}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.74rem', padding: '0.45rem 0.25rem' }}
            >
              <User size={13} color="var(--cyan-primary)" /> Stargazer
            </button>
          </div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: 'var(--text-subtle)', textAlign: 'center' }}>
            ✦ Instant access enabled: New emails auto-register upon entry
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Astronomer Email Address
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
                placeholder="stargazer@cosmostracker.org"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              Access Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="cosmic-input"
                style={{ paddingLeft: '2.8rem', paddingRight: '2.8rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
          >
            {submitting ? 'Verifying Coordinates...' : 'Authenticate & Enter'}
          </button>
        </form>

        {/* Footer switcher */}
        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Don't have an observatory passport?{' '}
          <span
            onClick={() => setActiveTab('register')}
            style={{ color: 'var(--cyan-primary)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Register Now
          </span>
        </div>
      </div>
    </div>
  );
};
