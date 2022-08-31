const { StatusCodes } = require('http-status-codes');

class SallesController {
  constructor(service) { 
    this.service = service;
  }

  async createSaleController(request, response) {
    const result = await this.service.createSale(request.body);
    return response.status(StatusCodes.CREATED).json(result);
  }

  async getSaleController(request, response) {
    const result = await this.service.getSale(request.params);
    return response.status(StatusCodes.OK).json(result);
  }
}

module.exports = { SallesController };