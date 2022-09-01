const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const registerSchema = joi.object({
  password: joi.string().min(6).required(),
  email: joi.string().email().required(),
  name: joi.string().required(),
  role: joi.string().optional(),
});

const postSaleSchema = joi.object({
  userId: joi.number().min(0).required(),
  sellerId: joi.number().min(0).required(),
  totalPrice: joi.number().min(0).required(),
  deliveryAddress: joi.string().required(),
  deliveryNumber: joi.string().required(),
  productsIds: joi.array().items(
    joi.object({
      id: joi.number().min(1).required(),
      quantity: joi.number().min(1).required(),
    }),
  ).required(),
});

const updateStatusSale = joi.object({
  status: joi.string().required(),
});

module.exports = {
  loginSchema,
  registerSchema,
  postSaleSchema,
  updateStatusSale,
};
