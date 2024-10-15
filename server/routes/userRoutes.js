const express = require('express');
const User = require('../models/user'); // Make sure the path to your model is correct
const jwt = require('jsonwebtoken'); // Import JWT
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  const { name, age, email, mobile, address, cnicNumber, password } = req.body;

  // Validate required fields
  if (!name || !age || !email || !mobile || !address || !cnicNumber || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user with the same email or CNIC already exists
    const existingUser = await User.findOne({ $or: [{ email }, { cnicNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or CNIC already exists' });
    }

    // Create new user if validation passes
    const newUser = new User({
      name,
      age,
      email,
      mobile,
      address,
      cnicNumber,
      password
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a token for the user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Use your secret key from .env

    // Send response with the token
    res.status(201).json({
      message: 'User registered successfully!',
      user: newUser,
      token // Include the token in the response
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

module.exports = router;
