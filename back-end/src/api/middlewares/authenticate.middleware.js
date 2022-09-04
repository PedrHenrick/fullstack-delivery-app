const jwt = require('jsonwebtoken');
const fs = require('fs');
<<<<<<< .merge_file_CwJb68

const SECRET = fs.readFileSync('./jwt.evaluation.key', 'utf-8');
=======
>>>>>>> .merge_file_WzeBFe
const User = require('../../database/models/user');

const SECRET = fs.readFileSync('./jwt.evaluation.key', 'utf-8');
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