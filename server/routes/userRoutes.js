// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import JWT for token-based authentication
const Cnic = require('../models/cnic'); // Import the CNIC model
const User = require('../models/user'); // Import the User model
const router = express.Router();

// Secret key for JWT (should be stored in .env for security)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// ==================== CNIC Routes ====================

// Get all CNICs
router.get('/cnics', async (req, res) => {
    try {
        const cnics = await Cnic.find(); // Retrieve all CNIC records
        res.json(cnics); // Return the CNIC records
    } catch (error) {
        console.error('Error retrieving CNICs:', error);
        res.status(500).json({ message: 'Error retrieving CNICs', error: error.message });
    }
});

// ==================== User Routes ====================
// Create a new user
router.post('/user', async (req, res) => { // Changed to '/user'
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

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user if validation passes
        const newUser = new User({
            name,
            age,
            email,
            mobile,
            address,
            cnicNumber,
            password: hashedPassword // Store the hashed password
        });

        // Save the new user to the database
        await newUser.save();

        // Generate a token for the user
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' }); // Use your secret key from .env

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
