// routes/cnicRoutes.js
const express = require('express');
const router = express.Router();
const Cnic = require('../models/cnic'); // Make sure this path is correct

// Route to get all CNICs
router.get('/all', async (req, res) => {
    try {
        const allCnic = await Cnic.find(); // Fetch all CNIC records
        res.json(allCnic); // Return as JSON
    } catch (error) {
        res.status(500).json({ message: "Error fetching CNIC data" });
    }
});

// Route to add a new CNIC
router.post('/add', async (req, res) => {
    const { cnic } = req.body;
    try {
        const newCnic = new Cnic({ cnic });
        await newCnic.save();
        res.status(201).json({ message: 'CNIC added successfully' });
    } catch (error) {
        res.status(500).json({ message: "Error adding CNIC" });
    }
});

module.exports = router;
