// seedCnicData.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CNIC = require('./models/cnic'); // Update path if necessary

dotenv.config(); // Load environment variables

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name'; // Replace with your database name

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

const seedCnicData = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    await CNIC.deleteMany(); // Clear existing data

    await CNIC.insertMany(cnicData); // Insert the CNIC data
    console.log('CNIC data seeded successfully');
  } catch (error) {
    console.error('Error seeding CNIC data:', error);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
};

seedCnicData();
