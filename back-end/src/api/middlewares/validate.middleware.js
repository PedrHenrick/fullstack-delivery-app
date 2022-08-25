const { ErrorHandle } = require('../class/errorHandle');

const validateMiddleware = (schema) => (request, _response, next) => {
  const { error } = schema.validate(request.body, { abortEarly: false });
  if (error) {
    const { message } = error.details[0];
    throw new ErrorHandle(400, message);
  }
  next();
};

module.exports = { validateMiddleware };
