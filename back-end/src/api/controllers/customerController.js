const { StatusCodes } = require('http-status-codes');

class CustomerController {
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

  async getOneSaleController(_request, response) {
    const result = await this.service.getOneSale();
    return response.status(StatusCodes.OK).json(result);
  }

  async updateSaleStatus(request, response) {
    const result = await this.service
      .updateSaleStatus(request.params, request.body, request.user);
    return response.status(StatusCodes.OK).json(result);
  }

  async getDetailController(request, response) {
    const result = await this.service.getDetailsSale(request.params);
    return response.status(StatusCodes.OK).json(result);
  }
}

module.exports = { CustomerController };