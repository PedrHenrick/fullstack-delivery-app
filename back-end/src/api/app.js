require('express-async-errors');
const express = require('express');
const { router } = require('./routers/router');
const { ErrorMiddleware } = require('./middlewares/error.middleware');
const register = require('../routes/register');
const errorHandler = require('../middleware/error');

const app = express();
app.use(express.json());
app.use(router);
app.use('/register', register);
app.use(errorHandler);

module.exports = app;
