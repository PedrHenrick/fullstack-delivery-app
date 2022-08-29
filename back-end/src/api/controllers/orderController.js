const { StatusCodes } = require('http-status-codes');

class SallesController {
  constructor(service) { 
    this.service = service;
  }

  async createSellerController(request, response) {
    const result = await this.service.createSaller(request.body);
    return response.status(StatusCodes.CREATED).json(result);
  }

  async getSellerController(request, response) {
    const result = await this.service.getSeller(request.params);
    return response.status(StatusCodes.OK).json(result);
  }
}

module.exports = { SallesController };