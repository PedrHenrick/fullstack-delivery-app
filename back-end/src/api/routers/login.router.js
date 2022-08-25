const { Router } = require('express');
const { UserModel } = require('../models/UserModel');
const { LoginService } = require('../services/loginServices');
const { LoginController } = require('../controllers/loginController');
const { validateMiddleware } = require('../middlewares/validate.middleware');
const { loginSchema, registerSchema } = require('../middlewares/schems');

const loginRouter = Router();

const userModelInstance = new UserModel();
const loginServiceInstance = new LoginService(userModelInstance);
const loginControllerInstance = new LoginController(loginServiceInstance);

loginRouter.post(
  '/login',
  validateMiddleware(loginSchema),
  (request, response) => loginControllerInstance.authenticate(request, response),
);
loginRouter.post(
  '/register',
  validateMiddleware(registerSchema),
  (request, response) => loginControllerInstance.register(request, response),
);

module.exports = { loginRouter };
