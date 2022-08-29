const { StatusCodes } = require('http-status-codes');

class SellerController {
  constructor(service) { 
    this.service = service;
  }

  async allSellerOrders(req, res) {
    const orders = await this.service.allSellerOrders(req.user.id);
    return res.status(StatusCodes.OK).json(orders);
  }

  async sellerOrderDetailsController(req, res) {
    const order = await this.service.sellerOrderDetails(req.params.id, req.user.id);
    return res.status(StatusCodes.CREATED).json(order);
  }
}

module.exports = SellerController;
