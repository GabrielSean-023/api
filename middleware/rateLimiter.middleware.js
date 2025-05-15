
const rateLimit = require('express-rate-limit');

// Rate limiter middleware: 100 requests per 2 minutes
const rateLimiterMiddleware = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 100, // 100 requests per windowMs
  message: {
    status: 429,
    message: 'Too many requests, please try again after 2 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = rateLimiterMiddleware;