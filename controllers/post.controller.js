const Post = require('../models/post.model');

// Create and Save a new Post
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.title || !req.body.content || !req.body.author) {
      return res.status(400).json({
        message: "Post content cannot be empty. Title, content, and author are required."
      });
    }

    // Create a Post
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });

    // Save Post in the database
    const data = await Post.create(post);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Post."
    });
  }
};

// Retrieve all Posts from the database
exports.findAll = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving posts."
    });
  }
};

// Find a single Post with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({
        message: `Post with id ${id} not found.`
      });
    }
    
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error retrieving Post with id ${req.params.id}.`
    });
  }
};

// Update a Post identified by the id in the request
exports.update = async (req, res) => {
  try {
    // Validate Request
    if (!req.body.title || !req.body.content || !req.body.author) {
      return res.status(400).json({
        message: "Post content cannot be empty. Title, content, and author are required."
      });
    }

    const id = req.params.id;
    
    // Check if post exists
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return res.status(404).json({
        message: `Post with id ${id} not found.`
      });
    }
    
    const post = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    };
    
    const updatedPost = await Post.updateById(id, post);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error updating Post with id ${req.params.id}.`
    });
  }
};

// Delete a Post with the specified id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Check if post exists
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return res.status(404).json({
        message: `Post with id ${id} not found.`
      });
    }
    
    const result = await Post.deleteById(id);
    
    if (result) {
      res.status(200).json({
        message: "Post was deleted successfully."
      });
    } else {
      res.status(500).json({
        message: `Could not delete Post with id ${id}.`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error deleting Post with id ${req.params.id}.`
    });
  }
};