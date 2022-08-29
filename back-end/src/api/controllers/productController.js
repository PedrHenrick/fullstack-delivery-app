const { StatusCodes } = require('http-status-codes');

class ProductController {
  constructor(service) { 
    this.service = service;
  }

  async findProductsController(_request, response) {
    const result = await this.service.findProducts();
    return response.status(StatusCodes.OK).json(result);
  }
}

module.exports = { ProductController };