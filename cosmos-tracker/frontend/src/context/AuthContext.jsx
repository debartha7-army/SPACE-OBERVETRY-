import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('cosmos_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('cosmos_token') || null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Verify and refresh user details on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await api.getMe();
          if (res.data.success && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('cosmos_user', JSON.stringify(res.data.user));
            fetchBookmarks();
          }
        } catch (err) {
          console.warn('Session verification failed, logging out:', err.message);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const fetchBookmarks = async () => {
    try {
      const res = await api.getBookmarks();
      if (res.data.success) {
        setBookmarks(res.data.bookmarks || []);
      }
    } catch (err) {
      console.error('Failed to load bookmarks:', err);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.login({ email, password });
      if (res.data.success) {
        const { user: loggedInUser, token: authToken } = res.data;
        setUser(loggedInUser);
        setToken(authToken);
        localStorage.setItem('cosmos_token', authToken);
        localStorage.setItem('cosmos_user', JSON.stringify(loggedInUser));
        showNotification(`Welcome to Cosmos Tracker, ${loggedInUser.name || loggedInUser.email}!`, 'success');
        fetchBookmarks();
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed. Please check credentials.';
      showNotification(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.register(userData);
      if (res.data.success) {
        const { user: registeredUser, token: authToken } = res.data;
        setUser(registeredUser);
        setToken(authToken);
        localStorage.setItem('cosmos_token', authToken);
        localStorage.setItem('cosmos_user', JSON.stringify(registeredUser));
        showNotification('Registration successful! Welcome to Cosmos Tracker.', 'success');
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed.';
      showNotification(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setBookmarks([]);
    localStorage.removeItem('cosmos_token');
    localStorage.removeItem('cosmos_user');
    showNotification('Logged out successfully.', 'info');
  };

  const isBookmarked = (itemType, itemId) => {
    return bookmarks.some(b => b.item_type === itemType && String(b.item_id) === String(itemId));
  };

  const toggleBookmark = async (itemType, itemId, itemTitle) => {
    if (!token) {
      showNotification('Please log in to save celestial objects to your watchlist.', 'info');
      return false;
    }

    try {
      const res = await api.toggleBookmark({
        item_type: itemType,
        item_id: itemId,
        item_title: itemTitle
      });

      if (res.data.success) {
        if (res.data.bookmarked) {
          setBookmarks(prev => [res.data.bookmark, ...prev]);
          showNotification(`Added ${itemTitle} to watchlist!`, 'success');
        } else {
          setBookmarks(prev => prev.filter(b => !(b.item_type === itemType && String(b.item_id) === String(itemId))));
          showNotification(`Removed ${itemTitle} from watchlist.`, 'info');
        }
        return res.data.bookmarked;
      }
    } catch (err) {
      showNotification('Could not update watchlist.', 'error');
      return false;
    }
  };

  const value = {
    user,
    token,
    isAdmin: user?.role === 'admin',
    isAuthenticated: Boolean(user && token),
    loading,
    bookmarks,
    isBookmarked,
    toggleBookmark,
    login,
    register,
    logout,
    showNotification,
    notification
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
