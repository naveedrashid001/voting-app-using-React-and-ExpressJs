const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const CNIC = require('../models/cnic')

require('dotenv').config();

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Get a user by ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

// Fetch user data by IP address
router.get('/user/data-by-ip', async (req, res) => {
    const { ip } = req.query;

    if (!ip) {
        return res.status(400).json({ message: 'IP address is required' });
    }

    try {
        const user = await User.findOne({ ip });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
});

// User registration
router.post('/signup', async (req, res) => {
    const { name, age, email, mobile, address, cnicNumber, password, ip } = req.body;

    try {
        // Check if the CNIC exists in the admin CNIC collection
        const isAdminCnic = await CNIC.findOne({ cnic: cnicNumber });

        // Set the role based on whether the CNIC is found in the admin CNIC list
        const role = isAdminCnic ? 'admin' : 'voter';

        // Create a new user with the determined role
        const user = new User({
            name,
            age,
            email,
            mobile,
            address,
            cnicNumber,
            password,
            ip,
            role,  // Set role as 'admin' or 'voter'
        });

        await user.save();

        // Generate a token after user creation
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token, user information, and email
        res.status(201).json({ message: 'User created successfully', user, token, email: user.email });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// ?log in 
router.post('/login', async (req, res) => {
    const { email, password, cnic } = req.body; // Receiving email, password, and CNIC from the request
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the plain text password (no bcrypt)
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Validate CNIC
      if (user.cnicNumber !== cnic) {
        return res.status(401).json({ message: 'Invalid CNIC' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email }, // Payload
        process.env.JWT_SECRET, // JWT secret key
        { expiresIn: '1d' } // Token expiration time
      );
  
      // Respond with the token and userId if login is successful
      res.status(200).json({ message: 'Login successful', token, userId: user._id });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


// Fetch user data by email
router.get('/data-by-email', async (req, res) => {
    const { email } = req.query; // Retrieve email from query parameters
    console.log("Received request for user data by email:", email); // Debugging log
    try {
        const user = await User.findOne({ email }); // Find user by email
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user); // Send user data as response
    } catch (error) {
        console.error("Error fetching user data:", error); // Log error for debugging
        res.status(500).json({ message: "Error fetching user data" });
    }
});

// Fetch user data by CNIC
router.get('/api/user/data-by-cnic', async (req, res) => {
    const { cnicNumber } = req.query;
    try {
        const user = await User.findOne({ cnicNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data" });
    }
});

// More routes can be added as needed...

module.exports = router;
