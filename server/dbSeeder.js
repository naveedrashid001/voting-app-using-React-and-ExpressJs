// dbSeeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Cnic = require('./models/cnic'); // Import the CNIC model

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Voting'; // Change to "Voting"

mongoose.connect(uri)
    .then(async () => {
        console.log('Connected to MongoDB');

        const cnicData = [
            { cnic: '1111111111111' },
            { cnic: '2222222222222' },
            { cnic: '3333333333333' },
            { cnic: '4444444444444' },
            { cnic: '5555555555555' },
            { cnic: '6666666666666' },
            { cnic: '7777777777777' },
            { cnic: '8888888888888' },
            { cnic: '9999999999999' },
        ];

        // Upsert each CNIC in the database
        for (const cnicEntry of cnicData) {
            await Cnic.updateOne(
                { cnic: cnicEntry.cnic }, // Find the CNIC
                { $setOnInsert: cnicEntry }, // Insert if it does not exist
                { upsert: true } // Enable upsert
            );
        }
        console.log('CNIC data saved to MongoDB');
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err))
    .finally(() => mongoose.disconnect());
