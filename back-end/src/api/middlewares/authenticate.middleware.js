import { ErrorHandle } from '../class/errorHandle';
import { authenticateToken } from '../Utils/JWT';

const authenticateMiddleware = async (request, _response, next) => {
  const token = request.headers.authorization;
  if (!token) throw new ErrorHandle(401, 'Unauthorized');
  else await authenticateToken(token);
  next();
};

export default authenticateMiddleware;