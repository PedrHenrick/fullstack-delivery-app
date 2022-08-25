const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'lalaland';
const jwtConfig = { algorithm: 'HS256' };

const generateJWTToken = (payload) => jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (token) => {
  try {
    const introspection = await jwt.verify(token, SECRET, jwtConfig);
    return introspection;
  } catch (_e) {
    throw new Error('ExpiredOrInvalidToken');
  }
};

module.exports = { generateJWTToken, authenticateToken };
