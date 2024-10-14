const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cnicNumber: {
        type: Number,
        unique: true,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{13}$/.test(v.toString());
            },
            message: props => `${props.value} is not a valid CNIC number! It must be exactly 13 digits.`
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
