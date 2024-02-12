const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

//this function called when the user login 
//and generates a token for him

const createToken = (user = {}) => {
    return jwt.sign(user, SECRET, { expiresIn: '1h' })
}

//this function called When the user wants to perform actions 
const authenticate = (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    try {
        let details = jwt.verify(token, SECRET);
        req.body.auth = {
            permission: details.permission,
            email: details.email,
        }
        next();

    } catch (error) {
        res.send(error).sendStatus(401)
    }
}

const checkPermission = (req, res, next) => {
    if (req.body.auth.permission === "user") {
        if (req.body.auth.email === req.body.email) {
            next();
        } else {
            res.status(403).send("Permission denied. You are not allowed to update other users.");
        }
    } else {
        next();
    }
};

module.exports = { createToken, authenticate, checkPermission };
