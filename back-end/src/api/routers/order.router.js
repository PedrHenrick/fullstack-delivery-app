const { Router } = require('express');
const SalesModel = require('../../database/models/sale');
const saleProduct = require("../../database/models/saleProduct");
const { SallesService } = require('../services/orderServices');
const { sallesController } = require('../controllers/orderController');

const orderRoute = Router();

const sallesServiceInstance = new SallesService(SalesModel, saleProduct);
const sallesControllerInstance = new sallesController(sallesServiceInstance);

orderRoute.post(
  '/',
  (request, response) => sallesControllerInstance.createSellerController(request, response),
);

orderRoute.get(
  '/:id',
  (request, response) => sallesControllerInstance.getSellerController(request, response),
);
module.exports = { orderRoute };