const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate'); // Adjust the path based on your structure
const User = require('../models/user'); // Adjust the path based on your structure

// Route for voting
router.post('/', async (req, res) => {
    const { userId, candidateId } = req.body;

    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is an admin
        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Admins cannot vote.' }); // Restrict admins from voting
        }

        // Check if the user has already voted
        if (user.isVoted) {
            return res.status(403).json({ message: 'User has already voted.' });
        }

        // Find the candidate
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        // Add the vote to the candidate
        candidate.votes.push({ user: user._id });
        candidate.voteCount += 1;

        // Save the updated candidate
        await candidate.save();

        // Mark the user as having voted
        user.isVoted = true;
        await user.save();

        res.status(200).json({ message: 'Vote successful', candidate });
    } catch (error) {
        console.error('Error during voting:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
