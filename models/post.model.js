const db = require('../config/db.config');

class Post {
  constructor(post) {
    this.title = post.title;
    this.content = post.content;
    this.author = post.author;
  }

  // Create a new post
  static async create(newPost) {
    let conn;
    try {
      conn = await db.getConnection();
      const result = await conn.query(
        'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
        [newPost.title, newPost.content, newPost.author]
      );
      
      const id = result.insertId;
      return this.findById(id);
    } catch (err) {
      console.error('Error creating post:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }

  // Find post by ID
  static async findById(id) {
    let conn;
    try {
      conn = await db.getConnection();
      const rows = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);
      
      if (rows.length === 0) {
        return null;
      }
      
      return rows[0];
    } catch (err) {
      console.error('Error finding post by ID:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }

  // Get all posts
  static async findAll() {
    let conn;
    try {
      conn = await db.getConnection();
      return await conn.query('SELECT * FROM posts ORDER BY created_at DESC');
    } catch (err) {
      console.error('Error finding all posts:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }

  // Update post by ID
  static async updateById(id, post) {
    let conn;
    try {
      conn = await db.getConnection();
      await conn.query(
        'UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?',
        [post.title, post.content, post.author, id]
      );
      
      return this.findById(id);
    } catch (err) {
      console.error('Error updating post:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }

  // Delete post by ID
  static async deleteById(id) {
    let conn;
    try {
      conn = await db.getConnection();
      const result = await conn.query('DELETE FROM posts WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error('Error deleting post:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = Post;