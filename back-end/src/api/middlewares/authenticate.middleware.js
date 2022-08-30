require('dotenv').config();

const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('./jwt.evaluation.key', 'utf-8');
const User = require('../../database/models/user');

const authenticateMiddleware = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('Unauthorized');
  try {
    const userInfo = jwt.verify(token, SECRET);
    const hasUser = await User.findOne({ where: { email: userInfo.email } });
    if (!hasUser) throw new Error('InvalidUserToken');
    req.user = userInfo;
    
    return next();
  } catch (error) {
    throw new Error('ExpiredOrInvalidToken');
  }
};

module.exports = authenticateMiddleware;