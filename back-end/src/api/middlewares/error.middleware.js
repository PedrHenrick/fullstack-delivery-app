const ErrorMiddleware = (error, _request, response, _next) => {
  const { status, message } = error;
  response.status(status).json({ message });
};

module.exports = { ErrorMiddleware };
