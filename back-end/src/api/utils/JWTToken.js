const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;
const jwtConfig = { algorithm: 'HS256' };

const generateJWTToken = (payload) => jwt.sign(payload, SECRET, jwtConfig);

module.exports = { generateJWTToken };
