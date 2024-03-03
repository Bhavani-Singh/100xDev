const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require('../db/index.js');


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const {username, password} = req.headers;

    const user = await User.create({
        username,
        password
    });

    if(user) {
        return res.status(200).json({
            message: 'User created successfully'
        })
    }
    else {
        return res.status(404).json({
            message: 'Error while creating the user'
        })
    }

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});

    if(courses) {
        return res.status(200).json({
            courses
        });
    }
    else {
        return res.status(404).json({
            message: 'Error while fetching the courses'
        })
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const id = req.params.courseId;
    const {username} = req.headers;
    const user = await User.updateOne({
            username
        },
        {
            "$push":{
                courses: id
            } 
        });

    if(user) {
        return res.status(200).json({
            message: 'Course purchased successfully'
        })
    }
    else {
        return res.status(402).json({
            message: 'Error while creating the course'
        })
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const {username} = req.headers;
    const user = await User.findOne({username});

    const courses = await Course.find({
        _id:{
            "$in": user.courses
        }
    });

    if(courses.length > 0) {
        return res.status(200).json({
            courses
        })
    }
    else{
        return res.status(404).json({
            message: 'No courses purchased!'
        })
    }
});

module.exports = router