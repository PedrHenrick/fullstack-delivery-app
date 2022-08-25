const { authenticateToken } = require('../utils/JWTToken');

const authenticateMiddleware = async (request, _response, next) => {
  const token = request.headers.authorization;
  if (!token) throw new Error('Unauthorized');
  else await authenticateToken(token);
  next();
};

export default authenticateMiddleware;