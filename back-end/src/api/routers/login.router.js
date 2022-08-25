const { Router } = require('express');
const { UserModel } = require('../models/UserModel');
const { LoginService } = require('../services/loginServices');
const { LoginController } = require('../controllers/loginController');
const { validateMiddleware } = require('../middlewares/validate.middleware');
const { loginSchema } = require('../middlewares/schems');
const user = require('../../database/models/user'); 

const loginRouter = Router();

const userModelInstance = new UserModel();
const loginServiceInstance = new LoginService(userModelInstance);
const loginControllerInstance = new LoginController(loginServiceInstance);

loginRouter.post(
  '/',
  validateMiddleware(loginSchema),
  (request, response) => loginControllerInstance.authenticate(request, response)
);

module.exports = { loginRouter };
