/**
 * Global Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('🚨 [Cosmos Tracker API Error]:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected cosmic anomaly occurred in the server.';

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

/**
 * 404 Not Found Middleware
 */
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint not found: [${req.method}] ${req.originalUrl}`
  });
};
