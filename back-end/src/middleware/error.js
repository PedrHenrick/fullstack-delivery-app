const errorCatalog = require('../errors/catalog');
const { StatusCodes } = require('http-status-codes');

module.exports = (err, _req, res, _next) => {
  const messageAsErrorType = err.message;
  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { httpStatus, error } = mappedError;
    return res.status(httpStatus).json({ error });
  }
  console.error(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'internal error' });
};
