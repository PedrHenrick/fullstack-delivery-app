const { Router } = require('express');
const UserModel = require('../../database/models/user');
const UserService = require('../services/userServices');
const UserController = require('../controllers/userController');
const { validateMiddleware } = require('../middlewares/validate.middleware');
const authenticateMiddleware = require('../middlewares/authenticate.middleware');
const { loginSchema, registerSchema, adminRegisterSchema } = require('../middlewares/schems');

const userRouter = Router();

const userServiceInstance = new UserService(UserModel);
const userControllerInstance = new UserController(userServiceInstance);

userRouter.post(
  '/login',
  validateMiddleware(loginSchema),
  (request, response) => userControllerInstance.authenticate(request, response),
);
userRouter.post(
  '/register',
  validateMiddleware(registerSchema),
  (request, response) => userControllerInstance.register(request, response),
);

userRouter.post(
  '/registerAdmin',
  validateMiddleware(adminRegisterSchema),
  authenticateMiddleware,  
  (request, response) => userControllerInstance.registerAdmin(request, response),
);

userRouter.get(
  '/users',
  authenticateMiddleware,
  (req, res) => userControllerInstance.getAll(req, res),
);

userRouter.delete(
  '/user/:id',
  authenticateMiddleware,
  (req, res) => userControllerInstance.deleteUser(req, res),
);

module.exports = userRouter;
