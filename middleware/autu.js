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
        req.body.permission = details.permission;
        next();

    } catch (error) {
        res.send(error).sendStatus(401)
    }
}

module.exports = { createToken, authenticate };
