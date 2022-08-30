const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const registerSchema = joi.object({
  password: joi.string().min(6).required(),
  email: joi.string().email().required(),
  name: joi.string().required(),
});

const adminRegisterSchema = joi.object({
  password: joi.string().min(6).required(),
  email: joi.string().email().required(),
  name: joi.string().required(),
  role: joi.string().required(),
});

module.exports = { loginSchema, registerSchema, adminRegisterSchema };
