const { verifyToken } = require('../utils/jwt.utils');

// Middleware to verify JWT token
function verifyTokenMiddleware(req, res, next) {
  const tokenHeader = req.headers['authorization'];
  
  if (!tokenHeader) {
    return res.status(401).json({ 
      message: 'No token provided' 
    });
  }

  // Format should be "Bearer [token]"
  const parts = tokenHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ 
      message: 'Token format invalid, use: Bearer [token]' 
    });
  }

  const token = parts[1];

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ 
      message: 'Unauthorized: ' + err.message 
    });
  }
}

module.exports = verifyTokenMiddleware;