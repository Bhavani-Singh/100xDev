const { Router } = require('express');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;
const router = Router();
const { userNameValidation, passwordValidation, userInformation }  = require('../validators/types');
const User = require('../models/user');
const { authenticateUser } = require('../middlewares/userAuthenticate');

router.post('/signup', async (req, res) => {
    const {username, password} = req.body;
    const userNameValidationResult = userNameValidation.safeParse({username});
    const passwordValidationResult = passwordValidation.safeParse({password});

    if(!userNameValidationResult.success) {
        return res.status(400).json({
            message: 'Invalid User name'
        })   
    }
    else if(!passwordValidationResult.success){
        return res.status(400).json({
            message: 'Minimum 8 character password. Atleast 1 uppercase, lowercase, number and special character'
        })
    }

    const hash = bcrypt.hashSync(password, salt);

    try {
        const userCreated = await User.create({username, password: hash});

        if(userCreated) {
            return res.status(200).json({
                message: 'User created successfully'
            })
        }
        else {
            return res.status(500).json({
                message: 'Unable to create the user'
            })
        }
    }
    catch(error) {
        res.status(400).json({
            message: 'Error while creating the user'
        })
    }
    
});


router.post('/signin', async (req, res) => {
    const {username, password} = req.body;
    const userNameValidationResult = userNameValidation.safeParse({username});

    if(!userNameValidationResult.success) {
        return res.status(400).json({
            message: 'username must be an valid email'
        })
    }

    const result = await User.findOne({username});

    if(!result) {
        return res.status(400).json({
            message: 'Invalid username or password'
        })
    }
    const isPasswordCorrect = await bcrypt.compare(password, result.password);
    
    if(!isPasswordCorrect) {
        return res.status(400).json({
            message: 'Invalid username or password'
        })
    }


    const token = jwt.sign({username}, jwtSecret);

    return res.status(200).json({
        token
    })

});



router.post('/update', authenticateUser, async (req, res) => {
    
    const username = req.locals.info;
    const {name, designation, interest, linkedin, twitter} = req.body;

    const data = {
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
        const result = await User.findOneAndUpdate({username}, {$set: data});


        console.log(result);
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

router.get('/populate/:username', authenticateUser, async (req, res) => {
    const username = req.locals.info;

    try {
        const result = await User.findOne({username}).select('name designation interest linkedin twitter');
        
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


router.post('/search', authenticateUser, async (req, res) => {
    let query = req.body.username;

    if(query === "") {
        try{
            const result = await User.find({});
            return res.status(200).json({
                result
            })
        }
        catch(error) {
            return res.status(500).json({
                message: 'Error while searching the user'
            })
        }
        
    }
    
    query = '^' + query;

    try{
        const result = await User.find({username: {$regex: query, $options: 'i'}}).select('username name designation');

        return res.status(200).json({
            result
        })
    }
    catch(error) {
        return res.status(500).json({
            message: 'Error while searching the user'
        })
    }
    

    
})

module.exports = router;