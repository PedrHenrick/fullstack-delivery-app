const { StatusCodes } = require('http-status-codes');

const validateMiddleware = (schema) => (request, response, next) => {
  const { error } = schema.validate(request.body, { abortEarly: false });
  if (error) {
    const { message } = error.details[0];
    if (message.match(/required/i)) {
      return response.status(StatusCodes.BAD_REQUEST).json({ message });
    }
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message });
  }
  next();
};

module.exports = { validateMiddleware };
