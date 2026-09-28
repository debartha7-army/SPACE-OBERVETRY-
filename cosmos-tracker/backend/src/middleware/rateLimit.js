import rateLimit from 'express-rate-limit';

/**
 * Rate Limiter for Login Endpoint
 * Mitigates brute-force attacks by limiting login attempts
 */
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 20, // Max 20 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP address. Please wait 15 minutes before trying again.'
  }
});

/**
 * General API Rate Limiter
 */
export const apiRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 300, // Max 300 requests per 5 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Request rate limit exceeded. Please throttle requests.'
  }
});
