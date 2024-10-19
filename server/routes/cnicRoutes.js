// routes/cnicRoutes.js
const express = require('express');
const router = express.Router();
const Cnic = require('../models/cnic'); // Make sure this path is correct
const User = require('../models/User');
// Route to get all CNICs
router.get('/all', async (req, res) => {
    try {
        const allCnic = await Cnic.find(); // Fetch all CNIC records
        res.json(allCnic); // Return as JSON
    } catch (error) {
        res.status(500).json({ message: "Error fetching CNIC data" });
    }
});


// Route to add a new CNIC and change role to admin if exists
router.post('/add-cnic', async (req, res) => {
    const { cnicNumber } = req.body;

    try {
        // Check if the CNIC exists in the User collection
        const user = await User.findOne({ cnicNumber });

        if (!user) {
            return res.status(404).json({ message: "No account associated with this CNIC." });
        }

        // If the user exists and is already an admin
        if (user.role === 'admin') {
            return res.status(400).json({ message: "User is already an admin." });
        }

        // If the user exists, update their role to admin
        user.role = 'admin';
        await user.save(); // Save the changes to the database

        return res.status(200).json({ message: "User role updated to admin." });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Error updating role." });
    }
});




module.exports = router;
