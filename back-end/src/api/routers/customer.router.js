const { Router } = require('express');
const SalesModel = require('../../database/models/sale');
const Product = require('../../database/models/product');
const SalesProduct = require('../../database/models/saleProduct');
const Users = require('../../database/models/user');
const { CustomerService } = require('../services/customerServices');
const { CustomerController } = require('../controllers/customerController');
const {
  authenticateMiddleware,
  authenticateSellerMiddleware,
} = require('../middlewares/authenticate.middleware');
const { validateMiddleware } = require('../middlewares/validate.middleware');
const { postSaleSchema, updateStatusSale } = require('../middlewares/schems');

const customerRouter = Router();

const customerServiceInstance = new CustomerService(SalesModel, Product, SalesProduct, Users);
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

customerRouter.get(
  '/orders',
  (_request, response) => customerControllerInstance.getOneSaleController(_request, response),
);

customerRouter.put(
  '/orders/details/:id',
  authenticateMiddleware,
  validateMiddleware(updateStatusSale),
  (request, response) => customerControllerInstance.updateSaleStatus(request, response),
);

customerRouter.get(
  '/orders/details/:id',
  (request, response) => customerControllerInstance.getDetailController(request, response),
);

module.exports = { customerRouter };
