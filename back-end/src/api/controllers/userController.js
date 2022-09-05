const { StatusCodes } = require('http-status-codes');

class UserController {
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
    const token = await this.service.register(request.body, role);
    return response.status(StatusCodes.CREATED).json(token);
  }

  async getAll(req, res) {
    const { role } = req.user;
    const allUsers = await this.service.getAll(role);
    return res.status(StatusCodes.OK).json(allUsers);
  }

  async deleteUser(req, res) {
    const { role } = req.user;
    const { id } = req.params;
    await this.service.deleteUser(id, role);
    return res.status(StatusCodes.OK).end();
  }
}

module.exports = UserController;
