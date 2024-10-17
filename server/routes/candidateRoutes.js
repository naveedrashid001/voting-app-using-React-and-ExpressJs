const express = require('express');
const router = express.Router();
const User = require('./../models/user'); // Make sure this path is correct
const Candidate = require('../models/candidate');
// const { jwtAuthMiddleware } = require('./../jwt');

const path = require('path');


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

// find all candaidate
router.get('/', async (req, res) => {
    
    try {
        const candidate = await Candidate.find({}, '_id name party')
        if (!candidate) {
            return res.status(404).json({ message: 'ther is no candaidate in database' });
        }
         return res.status(200).json(candidate);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});

module.exports = router;
