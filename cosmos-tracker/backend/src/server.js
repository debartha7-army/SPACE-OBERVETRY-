import app from './app.js';
import dotenv from 'dotenv';
import { initCronScheduler } from './services/cronService.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🌌 Cosmos Tracker API Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔭 API Explorer: http://localhost:${PORT}/api/stats/overview`);
  
  // Start daily 7:00 AM automated observatory pipeline
  initCronScheduler();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

export default server;
