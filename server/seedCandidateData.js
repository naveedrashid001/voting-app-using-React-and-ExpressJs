const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Candidate = require('./models/candidate'); // Update path if necessary

dotenv.config(); // Load environment variables

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Voting'; // Replace with your database name

const candidateData = [
    { name: 'imran khan', party: 'PTI', age: 70 },
    { name: 'shehbaz shareef', party: 'PML-N', age: 72 },
    { name: 'bilawal bhutto', party: 'PPP', age: 34 },
    { name: 'Aimal Wali Khan', party: 'ANP', age: 43 },
    { name: 'Bilal Ahmad', party: 'Independent', age: 45 }, // New candidate
    { name: 'Pervez Musharraf', party: 'APML', age: 78 },
    // Add more candidates as needed
];


const seedCandidateData = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        await Candidate.deleteMany(); // Clear existing data (optional)
        await Candidate.insertMany(candidateData); // Insert the candidate data
        console.log('Candidate data seeded successfully');
    } catch (error) {
        console.error('Error seeding candidate data:', error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

seedCandidateData();
