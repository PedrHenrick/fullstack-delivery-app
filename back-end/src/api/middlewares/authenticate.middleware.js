require('dotenv').config();

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
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