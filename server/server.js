const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const port = 4000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';

// Connect to MongoDB using Mongoose
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Use CORS middleware, allowing requests from React app
app.use(express.json()); // To handle JSON data

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes); // Use userRoutes for /user endpoint

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
