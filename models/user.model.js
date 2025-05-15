const db = require('../config/db.config');
const bcrypt = require('bcryptjs');

class User {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
  }

  // Create a new user
  static async create(newUser) {
    let conn;
    try {
      conn = await db.getConnection();
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUser.password, salt);
      
      const result = await conn.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [newUser.username, newUser.email, hashedPassword]
      );
      
      const id = result.insertId;
      const user = await this.findById(id);
      
      // Don't return the password
      if (user) {
        delete user.password;
      }
      
      return user;
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }

  // Find user by ID
  static async findById(id) {
    let conn;
    try {
      conn = await db.getConnection();
      const rows = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
      
      if (rows.length === 0) {
        return null;
      }
      
      return rows[0];
    } catch (err) {
      console.error('Error finding user by ID:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }

  // Find user by username
  static async findByUsername(username) {
    let conn;
    try {
      conn = await db.getConnection();
      const rows = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
      
      if (rows.length === 0) {
        return null;
      }
      
      return rows[0];
    } catch (err) {
      console.error('Error finding user by username:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }

  // Validate password
  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;