const { Router } = require('express');
const { ProductModel } = require('../models/ProductModel');
const { ProductService } = require('../services/productService');
const { ProductController } = require('../controllers/productController');
// const { validateMiddleware } = require('../middlewares/validate.middleware');
// const { loginSchema, registerSchema } = require('../middlewares/schems');

const productRouter = Router();

const productModelInstance = new ProductModel();
const productServiceInstance = new ProductService(productModelInstance);
const productControllerInstance = new ProductController(productServiceInstance);

productRouter.get(
  '/',
//   validateMiddleware(loginSchema),
  (request, response) => productControllerInstance.findProductsController(request, response),
);
module.exports = { productRouter };