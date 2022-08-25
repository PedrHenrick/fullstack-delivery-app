const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(1).required(),
});

module.exports = { loginSchema };
