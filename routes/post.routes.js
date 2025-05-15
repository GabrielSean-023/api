const express = require('express');
const router = express.Router();
const postsController = require('../controllers/post.controller');
const verifyToken = require('../middleware/auth.middleware');

// Create a new Post
router.post('/', verifyToken, postsController.create);

// Retrieve all Posts
router.get('/', postsController.findAll);

// Retrieve a single Post with id
router.get('/:id', postsController.findOne);

// Update a Post with id
router.put('/:id', verifyToken, postsController.update);

// Delete a Post with id
router.delete('/:id', verifyToken, postsController.delete);

module.exports = router;