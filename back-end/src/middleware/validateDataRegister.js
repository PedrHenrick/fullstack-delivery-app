const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const validateCreateLogin = (req, res, next) => {
  const attributes = req.body;

  const { error } = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    role: Joi.string().optional(),
  }).validate(attributes);

  if (error) {
    if (error.message.match(/required/i)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
  }
  return next();
};

module.exports = {
  validateCreateLogin,
};
