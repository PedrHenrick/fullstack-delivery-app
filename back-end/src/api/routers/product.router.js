const { Router } = require('express');
const ProductModel = require('../../database/models/product');
const { ProductService } = require('../services/productService');
const { ProductController } = require('../controllers/productController');

const productRouter = Router();

const productServiceInstance = new ProductService(ProductModel);
const productControllerInstance = new ProductController(productServiceInstance);

productRouter.get(
  '/',
  (request, response) => productControllerInstance.findProductsController(request, response),
);
module.exports = { productRouter };