const jwtSecret = process.env.JWTSECRET;
const jwt = require('jsonwebtoken');


function authenticateUser(req, res, next) {
    const token = req.headers.authorization;
    const decode = jwt.decode(token, jwtSecret);

    if(decode) {
        if(!req.locals) {
            req.locals = {};
        }

        req.locals.info = decode.username;
        next();
    }
    else {
        res.status(400).json({
            message: 'Authentication failed. Please sign in again'
        })
    }
}

module.exports = {
    authenticateUser
}