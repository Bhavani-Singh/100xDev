const jwtSecret = process.env.JWTADMINSECRET;
const jwt = require('jsonwebtoken');


function authenticateAdmin(req, res, next) {
    const token = req.headers.authorization;
    const decode = jwt.decode(token, jwtSecret);

    jwt.verify(token, jwtSecret, (err, decoded) => {

        if(err) {
            return res.status(400).json({
                message: "invalid token"
            })
        }

        if(decoded.role !== "admin") {
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
    authenticateAdmin
}