const jwt = require("jsonwebtoken");
const jwtPassword = "secret";

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;

    const decode = jwt.decode(token, jwtPassword);
    
    if(decode) {
        if(!req.locals) {
            req.locals= {};
        }
        
        req.locals.info = decode;

        next();
    }
    else {
        res.status(400).json({
            message: "Bad request"
        })
    }
}

module.exports = userMiddleware;