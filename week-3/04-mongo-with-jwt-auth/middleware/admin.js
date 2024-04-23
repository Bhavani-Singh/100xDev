const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    console.log(token);

    const decode =jwt.decode(token, jwtPassword);

    // console.log(decode);
    
    if(decode) {
        next();
    }
    else {
        res.status(400).json({
            message: 'Authentication failed. Please sign in again'
        })
    }
}

module.exports = adminMiddleware;