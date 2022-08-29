const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');

const SECRET = fs.readFileSync('./jwt.evaluation.key', 'utf-8');
const jwtConfig = { algorithm: 'HS256' };

const generateJWTToken = (payload) => jwt.sign((payload), SECRET, jwtConfig);

module.exports = { generateJWTToken };
