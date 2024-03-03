const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const router = Router();
const {Admin, Course} = require('../db/index.js')
// app.use(express.json());



// app.use(adminMiddleware);

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;

    const userExist = await Admin.findOne({username});

    if(userExist) {
        return res.status(403).json({
            message: 'User already exists!'
        })
    }

    const user = Admin.create({
        username,
        password
    });

    if(user) {
        res.status(200).json({
            message: 'Admin created successfully'
        })
    }
    else {
        res.status(500).json({
            message: 'Error while creating the user'
        })
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const {title, description, price, imageLink} = req.body;
    

    const {username} = req.headers;

    const course = await Course.create({
        title,
        description,
        price,
        imageLink,
        createdBy: username,
        published: true
    });



    if(course) {
        return res.status(200).json({
            message: 'Course created successfully!', 
            courseId: course._id
        })
    }
    else {
        return res.status(500).json({
            message: 'Error while creating the course!'
        })
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const {username} = req.headers;

    const courses = await Course.find({createdBy: username});

    if(courses) {
        return res.status(200).json({
            courses
        })
    }
    else {
        return res.status(404).json({
            message: 'Courses are not found!'
        })
    }
    

});

module.exports = router;