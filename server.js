const app = require('./app');
const db = require('./config/db.config');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database and tables
    await db.initializeDatabase();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();