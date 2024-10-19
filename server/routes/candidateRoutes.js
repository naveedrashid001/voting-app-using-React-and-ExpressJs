const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this path is correct
const Candidate = require('../models/candidate');
// const { jwtAuthMiddleware } = require('./../jwt');

const path = require('path');

// get all can 
router.get('/', async (req, res) => {
    try {
        // Query to retrieve all candidates with their full data
        const candidates = await Candidate.find({})
            .select('_id name party age description image votes voteCount') // Include 'description' and 'image' fields
            .populate('votes.user', 'name'); // Populate the user field from votes

        if (!candidates.length) {
            return res.status(404).json({ message: 'There are no candidates in the database.' });
        }

        // Respond with the full candidate data
        return res.status(200).json(candidates);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
});



//  single can ?
router.get('/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id)
            .select('_id name party age votes voteCount') // Select the necessary fields
            .populate('votes.user', 'name'); // Populate the user field from votes

        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found.' });
        }

        return res.status(200).json(candidate);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
});



// Candidate list route
router.get('/candaidatelist', (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'views', 'Condaidate.html');
        return res.sendFile(filePath);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});  


// cheek admain validation
const checkAdminRole = async (userID) => {
    try {
        const user = await User.findById(userID);
        if (user && user.role === 'admin') {
            return true;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
}


// show vote count page 
router.get('/votecount', async (req, res) => {
    try {
        // Find all candidates and sort them by voteCount in descending order
        const candidate = await Candidate.find().sort({ voteCount: 'desc' });

        // Map the candidates to only return their name and voteCount
        const voteRecord = candidate.map((data) => {
            return {
                party: data.party,
                count: data.voteCount
            };
        });

        // Render the count.ejs template and pass the voteRecord data
        res.render('count', { title: 'count', voteRecord: voteRecord });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});



module.exports = router;
