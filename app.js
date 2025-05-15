const express = require('express');
const cors = require('cors');
const rateLimiter = require('./middleware/rateLimiter.middleware');

// Create Express app
const app = express();

// Apply rate limiter to all requests
app.use(rateLimiter);

// Enable CORS
app.use(cors());

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Blog Posts API' });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/posts', require('./routes/post.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 middleware
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;