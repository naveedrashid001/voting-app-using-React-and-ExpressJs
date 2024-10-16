const mongoose = require('mongoose');

const cnicSchema = new mongoose.Schema({
    cnic: {
        type: String,
        required: true,
        unique: true
    }
});

const CNIC = mongoose.model('CNIC', cnicSchema);
module.exports = CNIC;
