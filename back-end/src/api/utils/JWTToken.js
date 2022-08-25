const { ErrorHandle } = require('../class/errorHandle');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'lalaland';
const jwtConfig = { expiresIn: '15m', algorithm: 'HS256' };

const generateJWTToken = (payload) => jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (token) => {
  try {
    const introspection = await jwt.verify(token, SECRET, jwtConfig);
    return introspection;
  } catch (_e) {
    throw ErrorHandle(401, 'Expired or invalid token');
  }
};

module.exports = { generateJWTToken, authenticateToken };
