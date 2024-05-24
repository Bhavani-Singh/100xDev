const mongoose = require('mongoose');


const userInfoSchema = new mongoose.Schema({
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
    },

    username: {
        type: String,
        ref: 'User',
        unique: true
    }
})

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = {
    UserInfo
}