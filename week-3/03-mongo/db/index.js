const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://bhavanisingh:oQsdlOfz55HA4oyJ@cluster0.b7cnwfk.mongodb.net/courses');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here4
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageLink: {
        type: String
    },
    
    createdBy: {
        type: String,
        ref: 'Admin'
    },
    published: {
        type: Boolean
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}