const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String
    },

    designation: {
        type: String
    },

    interest: [{
        type: String
    }],

    twitter: {
        type: String
    },

    linkedin: {
        type: String
    }
    
});

const User = new mongoose.model('user', userSchema);

module.exports = User;