const { Router } = require('express');
const SalesModel = require('../../database/models/sale');
const Product = require('../../database/models/product');
const SalesProduct = require('../../database/models/saleProduct');
const { SallesService } = require('../services/orderServices');
const { SallesController } = require('../controllers/orderController');
const { authenticateMiddleware } = require('../middlewares/authenticate.middleware');

const orderRoute = Router();

const sallesServiceInstance = new SallesService(SalesModel, Product, SalesProduct);
const sallesControllerInstance = new SallesController(sallesServiceInstance);

orderRoute.post(
  '/',
  authenticateMiddleware,
  (request, response) => sallesControllerInstance.createSellerController(request, response),
);

orderRoute.get(
  '/:id',
  (request, response) => sallesControllerInstance.getSellerController(request, response),
);
module.exports = { orderRoute };