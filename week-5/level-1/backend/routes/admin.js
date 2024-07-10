const { Router } = require('express');
const router = Router();
const Admin = require('../models/admin');
const User = require('../models/user');
const {userInformation, userNameValidation} = require('../validators/types');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { authenticateAdmin } = require('../middlewares/adminAuthentication');
const jwtSecret = process.env.JWTADMINSECRET;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/profilepics')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.post('/signin', async (req, res) => {
    const {username, password} = req.body;
    const userNameValidationResult = userNameValidation.safeParse({username});

    if(!userNameValidationResult.success) {
        return res.status(400).json({
            message: 'username should be a valid email'
        })
    }

    const result = await Admin.findOne({username});

    if(!result) {
        return res.status(400).json({
            message: 'Invalid username or password'
        })
    }

    if(password === result.password) {
        const token = jwt.sign({username, role: "admin"}, jwtSecret);

        return res.status(200).json({
            token
        })
    }
    else {
        return res.status(400).json({
            message: 'Invalid user name or password'
        })
    }

});

router.post('/search', authenticateAdmin, async (req, res) => {
    let query = req.body.username;

    if(query === "") {
        try{
            const result = await User.find({}).select('username name designation');;
            return res.status(200).json({
                result
            })
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Error while searching the user'
            })
        }
        
    }
    
    query = '^' + query;

    try{
        const result = await User.find({username: {$regex: query, $options: 'i'}}).select('image username name designation');

        if(result) {
            return res.status(200).json({
                result
            })
        }
        else {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error while searching the user'
        })
    }    
})

router.get('/populate/:id', authenticateAdmin, async (req, res) => {
    const id = req.params.id;

    try {
        const result = await User.findById({_id: id}).select('image name designation interest linkedin twitter');
        
        return res.status(200).json({
            result
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }    
})

router.post('/update/:id', authenticateAdmin, upload.single('file'), async (req, res) => {
    
    const id = req.params.id;
    const {name, designation, interest, linkedin, twitter} = req.body;
    const image = req.file.filename;
        
    const data = {
        image,
        name,
        designation,
        interest,
        linkedin,
        twitter
    };

    const userInfoValidate = userInformation.safeParse(data);

    if(!userInfoValidate.success) {
        return res.status(400).json({
            message: 'Invalid inputs'
        })
    }

    try{
        const result = await User.findByIdAndUpdate({_id: id}, {$set: data});

        if(result) {
            return res.status(200).json({
                message: 'Information updated successfully'
            })
        }
        else {
            return res.status(400).json({
                message: 'Unable to update the information'
            })
        }

    }
    catch(error) {
        return res.status(500).status({
            message: 'Error while updating your information'
        })
    }
})


router.post('/delete/:id', authenticateAdmin, async (req, res) => {
    const id = req.params.id;

    try{
        const result = await User.findByIdAndDelete({_id: id});

        if(result) {
            return res.status(200).json({
                message: 'User deleted successfully'
            })
        }
        else {
            return res.status(400).json({
                message: 'Invalid user'
            })
        }
    }
    catch(error) {
        return res.status(500).json({
            'message': 'Internal server error'
        })
    }
})


module.exports = router;