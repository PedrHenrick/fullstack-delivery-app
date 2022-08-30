const { Router } = require('express');
const SalesModel = require('../../database/models/sale');
const Product = require('../../database/models/product');
const SalesProduct = require('../../database/models/saleProduct');
const { SalesService } = require('../services/orderServices');
const { SallesController } = require('../controllers/orderController');
const authenticateMiddleware = require('../middlewares/authenticate.middleware');

const orderRouter = Router();

const sallesServiceInstance = new SalesService(SalesModel, Product, SalesProduct);
const sallesControllerInstance = new SallesController(sallesServiceInstance);

orderRouter.post(
  '/',
  authenticateMiddleware,
  (request, response) => sallesControllerInstance.createSaleController(request, response),
);

orderRouter.get(
  '/:id',
  (request, response) => sallesControllerInstance.getSaleController(request, response),
);
module.exports = { orderRouter };