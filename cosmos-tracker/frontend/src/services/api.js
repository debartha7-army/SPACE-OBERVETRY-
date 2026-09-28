import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cosmos_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!error.config.url.includes('/auth/login') && !error.config.url.includes('/auth/register')) {
        localStorage.removeItem('cosmos_token');
        localStorage.removeItem('cosmos_user');
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Stats & NASA feeds
  getStats: () => apiClient.get('/stats/overview'),
  getApod: () => apiClient.get('/nasa/apod'),
  getSkyOfTheMonth: () => apiClient.get('/nasa/sky-of-the-month'),
  autoImportNews: () => apiClient.post('/nasa/auto-import'),

  // Auth
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  getMe: () => apiClient.get('/auth/me'),
  getUsers: () => apiClient.get('/auth/users'),

  // Celestial Events
  getEvents: (params) => apiClient.get('/celestial-events', { params }),
  getEventById: (id) => apiClient.get(`/celestial-events/${id}`),
  createEvent: (data) => apiClient.post('/celestial-events', data),
  updateEvent: (id, data) => apiClient.put(`/celestial-events/${id}`, data),
  deleteEvent: (id) => apiClient.delete(`/celestial-events/${id}`),
  toggleReminder: (eventId) => apiClient.post('/celestial-events/reminders/toggle', { eventId }),
  getReminders: () => apiClient.get('/celestial-events/reminders'),

  // Stars & Constellations
  getStars: (params) => apiClient.get('/stars', { params }),
  getStarById: (id) => apiClient.get(`/stars/${id}`),
  createStar: (data) => apiClient.post('/stars', data),
  updateStar: (id, data) => apiClient.put(`/stars/${id}`, data),
  deleteStar: (id) => apiClient.delete(`/stars/${id}`),

  // Planets & Solar System
  getPlanets: (params) => apiClient.get('/planets', { params }),
  getPlanetById: (id) => apiClient.get(`/planets/${id}`),
  getAllMoons: () => apiClient.get('/planets/moons/all'),
  createPlanet: (data) => apiClient.post('/planets', data),
  updatePlanet: (id, data) => apiClient.put(`/planets/${id}`, data),
  deletePlanet: (id) => apiClient.delete(`/planets/${id}`),

  // Galaxies
  getGalaxies: (params) => apiClient.get('/galaxies', { params }),
  getGalaxyById: (id) => apiClient.get(`/galaxies/${id}`),
  createGalaxy: (data) => apiClient.post('/galaxies', data),
  updateGalaxy: (id, data) => apiClient.put(`/galaxies/${id}`, data),
  deleteGalaxy: (id) => apiClient.delete(`/galaxies/${id}`),

  // Novae & Variable Stars
  getNovae: (params) => apiClient.get('/novae-variables', { params }),
  getNovaById: (id) => apiClient.get(`/novae-variables/${id}`),
  createNova: (data) => apiClient.post('/novae-variables', data),
  updateNova: (id, data) => apiClient.put(`/novae-variables/${id}`, data),
  deleteNova: (id) => apiClient.delete(`/novae-variables/${id}`),

  // Black Holes
  getBlackHoles: (params) => apiClient.get('/black-holes', { params }),
  getBlackHoleById: (id) => apiClient.get(`/black-holes/${id}`),
  createBlackHole: (data) => apiClient.post('/black-holes', data),
  updateBlackHole: (id, data) => apiClient.put(`/black-holes/${id}`, data),
  deleteBlackHole: (id) => apiClient.delete(`/black-holes/${id}`),

  // Theories
  getTheories: (params) => apiClient.get('/theories', { params }),
  getTheoryById: (id) => apiClient.get(`/theories/${id}`),
  createTheory: (data) => apiClient.post('/theories', data),
  updateTheory: (id, data) => apiClient.put(`/theories/${id}`, data),
  deleteTheory: (id) => apiClient.delete(`/theories/${id}`),

  // Articles
  getArticles: (params) => apiClient.get('/articles', { params }),
  getArticleById: (id) => apiClient.get(`/articles/${id}`),
  createArticle: (data) => apiClient.post('/articles', data),
  updateArticle: (id, data) => apiClient.put(`/articles/${id}`, data),
  deleteArticle: (id) => apiClient.delete(`/articles/${id}`),

  // Favorites / Watchlist
  getFavorites: () => apiClient.get('/favorites'),
  getBookmarks: () => apiClient.get('/favorites'),
  toggleFavorite: (data) => apiClient.post('/favorites/toggle', data),
  toggleBookmark: (data) => apiClient.post('/favorites/toggle', data),
  deleteFavorite: (id) => apiClient.delete(`/favorites/${id}`),
  deleteBookmark: (id) => apiClient.delete(`/favorites/${id}`),

  // Observations
  getObservations: () => apiClient.get('/observations'),
  createObservation: (data) => apiClient.post('/observations', data),
  deleteObservation: (id) => apiClient.delete(`/observations/${id}`),

  // University Research Papers & Social Media Dispatches (Daily 7 AM Pipeline)
  getResearchPapers: (params) => apiClient.get('/dispatches/papers', { params }),
  getSocialFeeds: (params) => apiClient.get('/dispatches/social', { params }),
  getDispatchStatus: () => apiClient.get('/dispatches/status'),
  triggerDispatchSync: () => apiClient.post('/dispatches/sync')
};

export default apiClient;
