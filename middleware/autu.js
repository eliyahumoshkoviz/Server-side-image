const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;  

const createToken = (user = {}) => {
    return jwt.sign(user, SECRET, { expiresIn: '10m' })
}

module.exports = {createToken};
