const User = require('../../database/models/user');
const { authenticateToken } = require('../utils/JWTToken');

const authenticateMiddleware = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('unauthorized');
  
  const userInfo = authenticateToken(token);

  const hasUser = await User.findOne({ where: { email: userInfo.email } });
  if (!hasUser) throw new Error('InvalidUserToken');
  
  req.user = userInfo;
  return next();
};

const authenticateSellerMiddleware = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('unauthorized');
  
  const userInfo = authenticateToken(token);
  
  const hasUser = await User.findOne({ where: { email: userInfo.email } });
  if (!hasUser) throw new Error('InvalidUserToken');
  if (hasUser.role !== 'seller') throw new Error('userIsNotASeller');
  
  req.user = userInfo;
  return next();
};

module.exports = { authenticateMiddleware, authenticateSellerMiddleware };
