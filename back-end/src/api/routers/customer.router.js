const { Router } = require('express');
const SalesModel = require('../../database/models/sale');
const Product = require('../../database/models/product');
const SalesProduct = require('../../database/models/saleProduct');
const { CustomerService } = require('../services/customerServices');
const { CustomerController } = require('../controllers/customerController');
const authenticateMiddleware = require('../middlewares/authenticate.middleware');

const customerRouter = Router();

const customerServiceInstance = new CustomerService(SalesModel, Product, SalesProduct);
const customerControllerInstance = new CustomerController(customerServiceInstance);

customerRouter.post(
  '/orders',
  authenticateMiddleware,
  (request, response) => customerControllerInstance.createSaleController(request, response),
);

customerRouter.get(
  '/orders/:id',
  (request, response) => customerControllerInstance.getSaleController(request, response),
);

customerRouter.get(
  '/orders',
  (_request, response) => customerControllerInstance.getOneSaleController(_request, response),
);
module.exports = { customerRouter };