require('express-async-errors');
const express = require('express');
const { router } = require('./routers/router');
const { ErrorMiddleware } = require('./middlewares/error.middleware');

const app = express();
app.use(express.json());
app.use(router);
app.use(ErrorMiddleware);

module.exports = app;
