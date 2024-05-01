const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db/index");
const jwt = require("jsonwebtoken");
const jwtPassword = "screte";

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const {username, password} = req.body;

    User.create({username, password})
    .then(result => {
        res.status(200).json({
            message: 'User created successfully'
        })
    })
    .catch(error => {
        res.status(400).json({
            message: 'Error while creating the user'
        })
    })

});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;

    User.findOne({username, password})
    .then(result => {
        if(result) {
            const token = jwt.sign({username, password}, jwtPassword);
            res.status(200).json({
                token
            });
        }
        else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error while signing in'
        })
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    
    Course.find({})
    .then(result => {
        res.status(200).json({
            result
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error while fetching the courses'
        })
    })
    
    
    
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const id = req.params.courseId;
    
    const info = req.locals.info;
    if(info.username != null && info.password != null) {
        User.findOneAndUpdate({username: info.username}, {$push: {coursesPurchased: id}})
        .then(result => {
            res.status(200).json({
                message: 'Course purchased'
            })
        })
        .catch(error => {
            res.status(400).json({
                message: 'Error while purchasing the course'
            })
        }) 
    }
    else {
        res.status(400).json({
            message: 'Authentication failed. Please sign in again'
        })
    }

});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic

    const info = req.locals.info;

    if(info.username !== null && info.password !== null) {
        User.findOne({username: info.username})
        .then(result => {
            Course.find({
                _id: {
                    "$in": result.coursesPurchased
                }
            })
            .then(result => {
                res.status(200).json({
                    result
                })
            })
            .catch(error => {
                res.status(404).json({
                    message: 'Courses not found'
                })
            })
        })
        .catch(error => {
            res.status(404).json({
                message: 'User not found'
            })
        })
    }
    else {
        res.status(400).json({
            message: 'Authentication failed. Please sign in again'
        })
    }
});

module.exports = router