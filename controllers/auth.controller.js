const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt.utils');

// Register a new user
exports.register = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "Username, email, and password are required."
      });
    }

    // Check if username already exists
    const existingUser = await User.findByUsername(req.body.username);
    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists."
      });
    }

    // Create a User
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // Save User in the database
    const data = await User.create(user);
    
    // Generate token
    const token = generateToken(data.id);
    
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: data.id,
        username: data.username,
        email: data.email
      },
      accessToken: token
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while registering the user."
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        message: "Username and password are required."
      });
    }

    // Find user by username
    const user = await User.findByUsername(req.body.username);
    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    // Validate password
    const passwordIsValid = await User.validatePassword(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Invalid password."
      });
    }

    // Generate token
    const token = generateToken(user.id);
    
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      accessToken: token
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred during login."
    });
  }
};