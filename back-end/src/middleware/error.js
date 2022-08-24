const { errorCatalog } = require('../errors/catalog');

module.exports = (err, _req, res, _next) => {
  const messageAsErrorType = err.message;
  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, error } = mappedError;
    return res.status(httpStatus).json({ error });
  }
  console.error(err);
  return res.status(500).json({ message: 'internal error' });
};
