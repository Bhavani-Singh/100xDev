// const mongoose = require('mongoose');
const {Admin} = require('../db/index.js');

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const {username, password} = req.headers;

    const user = await Admin.findOne({username});

    if(username !== user.username && password !== user.password) {
        return res.status(404).json({
            message: 'User not found!'
        });
    }
    
    next();
}

module.exports = adminMiddleware;