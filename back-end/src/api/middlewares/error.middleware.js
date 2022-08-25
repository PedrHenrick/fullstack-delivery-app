const { StatusCodes } = require('http-status-codes');
const errorCatalog = require('../errors/catalog');

module.exports = (err, _req, res, _next) => {
  const messageAsErrorType = err.message;
  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    return res.status(mappedError.httpStatus).json({ error: mappedError.error });
  }

  console.error(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'internal error' });
};
