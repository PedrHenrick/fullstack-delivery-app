const { Router } = require('express');
const SalesModel = require('../../database/models/sale');
const Product = require('../../database/models/product');
const SalesProduct = require('../../database/models/saleProduct');
const { CustomerService } = require('../services/customerServices');
const { CustomerController } = require('../controllers/customerController');
const { authenticateMiddleware, authenticateSellerMiddleware } = require('../middlewares/authenticate.middleware');
const { validateMiddleware } = require('../middlewares/validate.middleware');
const { postSaleSchema, updateStatusSale } = require('../middlewares/schems');

const customerRouter = Router();

const customerServiceInstance = new CustomerService(SalesModel, Product, SalesProduct);
const customerControllerInstance = new CustomerController(customerServiceInstance);

customerRouter.post(
  '/orders',
  authenticateMiddleware,
  validateMiddleware(postSaleSchema),
  (request, response) => customerControllerInstance.createSaleController(request, response),
);

customerRouter.get(
  '/orders/:id',
  (request, response) => customerControllerInstance.getSaleController(request, response),
);

customerRouter.put(
  '/orders/details/:id',
  authenticateSellerMiddleware,
  validateMiddleware(updateStatusSale),
  (request, response) => customerControllerInstance.updateSaleStatus(request, response),
);

module.exports = { customerRouter };
