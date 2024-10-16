// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware
const userRoutes = require('./routes/userRoutes'); // Ensure this matches your file path

dotenv.config();
const app = express();

// Middleware to handle CORS
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST'], // Allow specific methods
    credentials: true // Enable if you're using cookies or authorization headers
}));

app.use(express.json()); // Middleware to parse JSON bodies

// Use the combined routes
app.use('/api', userRoutes); // Prefix routes with /api

// Connect to MongoDB and start the server
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Voting';
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(4000, () => {
            console.log('Server running on http://localhost:4000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
