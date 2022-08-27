const { Router } = require('express');
const SellerService = require('../services/sellerServices');
const SellerController = require('../controllers/sellerController');
const authenticateMiddleware = require('../middlewares/authenticate.middleware');
const Sales = require('../../database/models/sale');

const sellerRouter = Router();

const sellerServiceInstance = new SellerService(Sales);
const sellerControllerInstance = new SellerController(sellerServiceInstance);

sellerRouter.get('/seller/orders', authenticateMiddleware,
  (req, res) => sellerControllerInstance.allSellerOrders(req, res));

sellerRouter.get('/seller/orders/:id', authenticateMiddleware,
  (req, res) => sellerControllerInstance.sellerOrderDetailsController(req, res));

module.exports = sellerRouter;
