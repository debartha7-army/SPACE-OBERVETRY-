import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToast = () => {
  const { notification } = useAuth();

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.9rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        background: isSuccess
          ? 'rgba(6, 78, 59, 0.95)'
          : isError
          ? 'rgba(136, 19, 55, 0.95)'
          : 'rgba(15, 23, 42, 0.95)',
        border: `1px solid ${
          isSuccess ? 'rgba(52, 211, 153, 0.4)' : isError ? 'rgba(251, 113, 133, 0.4)' : 'rgba(56, 189, 248, 0.4)'
        }`,
        backdropFilter: 'blur(16px)',
        color: '#ffffff',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {isSuccess && <CheckCircle2 size={18} color="#34d399" />}
      {isError && <AlertCircle size={18} color="#fb7185" />}
      {!isSuccess && !isError && <Info size={18} color="#38bdf8" />}

      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
        {notification.message}
      </span>
    </div>
  );
};
