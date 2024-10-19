const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Candidate = require('./models/candidate'); // Update path if necessary

dotenv.config(); // Load environment variables

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Voting'; // Replace with your database name

const candidateData = [
    {
        name: 'Imran Khan',
        party: 'PTI',
        age: 72,
        description: 'Imran Ahmed Khan Niazi is the founder and former chairman of the political party Pakistan Tehreek-e-Insaf (PTI) from 1996 to 2023. He was the captain of the Pakistan national cricket team in the 1990s.',
        image: 'https://miro.medium.com/v2/resize:fit:720/1*-gp-JkJqp7Mscu8Cm6dSKg.jpeg'
    },
    {
        name: 'Shehbaz Sharif',
        party: 'PML-N',
        age: 73,
        description: 'Mian Muhammad Shehbaz Sharif is a Pakistani politician and businessman who served as the 23rd prime minister of Pakistan.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Shahbaz_Sharif_in_2022_%28cropped%29.jpg'
    },
    {
        name: 'Bilawal Bhutto',
        party: 'PPP',
        age: 36,
        description: 'Bilawal Bhutto Zardari is a Pakistani politician who served as the 37th Minister of Foreign Affairs from April 2022 to August 2023.',
        image: 'https://na.gov.pk/uploads/images/200(1).jpg'
    },
    {
        name: 'Aimal Wali Khan',
        party: 'ANP',
        age: 37,
        description: 'Aimal Wali Khan is a Pakistani politician and the Central President of the Awami National Party (ANP).',
        image: 'https://pakobserver.net/wp-content/uploads/2022/03/02-2.jpg'
    },
    {
        name: 'Bilal Ahmad',
        party: 'Independent',
        age: 63,
        description: 'Bilal Ahmad is an independent candidate in Pakistan, known for his advocacy for social and economic reforms.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlSYb0pgMjYbO-7noqHGAudSb7JaYLDoFtDA&s'
    },
    {
        name: 'Pervez Musharraf',
        party: 'APML',
        age: 79,
        description: 'Pervez Musharraf was a Pakistani military officer who served as the country’s tenth president from 2001 to 2008. He also founded the All Pakistan Muslim League (APML).',
        image: 'https://i.dawn.com/primary/2016/02/56b3754a36452.jpg'
    }
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
