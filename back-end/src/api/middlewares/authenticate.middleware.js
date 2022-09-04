const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('./jwt.evaluation.key', 'utf-8');
const User = require('../../database/models/user');

const { jwtConfig } = require('../utils/JWTToken');

const authenticateMiddleware = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) throw new Error('Unauthorized');
    
    const userInfo = jwt.verify(token, SECRET, jwtConfig);
    
    const hasUser = await User.findOne({ where: { email: userInfo.email } });
    
    if (!hasUser) throw new Error('InvalidUserToken');
    req.user = userInfo;
    
    return next();
  } catch (error) {
    throw new Error('ExpiredOrInvalidToken');
  }
};

module.exports = authenticateMiddleware;