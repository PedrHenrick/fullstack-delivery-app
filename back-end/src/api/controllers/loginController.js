class LoginController {
  constructor(service) { 
    this._service = service;
  }

  async authenticate(request, response) {
    console.log('entrei no controller');
    const token = await this._service.authentication(request.body);
    return response.status(200).json(token);
  };
}

module.exports = {
  LoginController
};
