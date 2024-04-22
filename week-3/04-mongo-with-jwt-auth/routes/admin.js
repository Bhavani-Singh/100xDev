const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require('../db/index');
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.query;

    Admin.create({username, password})
    .then((result) => {
        res.status(200).json({
            message: 'Admin created successfully'
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: 'Error while creating the Admin'
        })
    });

    
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.query;
    Admin.findOne({username})
    .then(result => {
        if(result !== null && result.password === password) {
            const token = jwt.sign({username, password}, jwtPassword);
            res.status(200).json({
                token,
            });
        }
        else {
            res.status(404).json({
                message: 'Admin not found'
            })
        }
        
    })
    .catch((error) => {
        res.status(500).json({
            message: 'Error while signing in'
        })
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const {title, description, price, imageLink} = req.query;

    Course.create({title, description, price, imageLink})
    .then(result => {
        console.log(result);
    })


});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;