const jwtSecret = process.env.JWTUSERSECRET;
const jwt = require('jsonwebtoken');


function authenticateUser(req, res, next) {
    const token = req.headers.authorization;

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if(err) {
            return res.status(400).json({
                message: "Invalid token"
            })
        }

        if(decoded.role !== "user") {
            return res.status(404).json({
                message: "forbidden"
            })
        }

        if(!req.locals) {
            req.locals = {};
        }

        req.locals.info = decoded.username;
        next();
    })
}

module.exports = {
    authenticateUser
}