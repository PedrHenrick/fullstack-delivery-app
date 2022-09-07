const { Router } = require('express');
const SellerService = require('../services/sellerServices');
const SellerController = require('../controllers/sellerController');
const { authenticateMiddleware } = require('../middlewares/authenticate.middleware');
const Sales = require('../../database/models/sale');
const Products = require('../../database/models/product');
const SalesProduct = require('../../database/models/saleProduct');

const sellerRouter = Router();

const sellerServiceInstance = new SellerService(Sales, Products, SalesProduct);
const sellerControllerInstance = new SellerController(sellerServiceInstance);

sellerRouter.get('/orders/:id', authenticateMiddleware,
  (req, res) => sellerControllerInstance.sellerOrderDetailsController(req, res));

sellerRouter.get('/orders', authenticateMiddleware,
  (req, res) => sellerControllerInstance.allSellerOrders(req, res));

module.exports = sellerRouter;
