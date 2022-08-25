const { StatusCodes } = require('http-status-codes');
const { errorCatalog } = require('../errors/catalog');

module.exports = (error, _request, response, _next) => {
  const mappedError = errorCatalog[error.message];

  if (mappedError) {
    return response.status(mappedError.httpStatus).json({ error: mappedError.error });
  }

  console.error(error);
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'internal error' });
};
