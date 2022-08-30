const { StatusCodes } = require('http-status-codes');

class LoginController {
  constructor(service) { 
    this.service = service;
  }

  async authenticate(request, response) {
    const token = await this.service.authentication(request.body);
    return response.status(StatusCodes.OK).json(token);
  }

  async register(request, response) {
    const token = await this.service.register(request.body);
    return response.status(StatusCodes.CREATED).json(token);
  }

  async registerAdmin(request, response) {
      const { role } = request.user;
      const admin = role === 'administrator';
    const token = await this.service.register(request.body, admin);
    return response.status(StatusCodes.CREATED).json(token);
  }
}

module.exports = { LoginController };
