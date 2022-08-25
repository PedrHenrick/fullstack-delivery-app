require('express-async-errors');
const express = require('express');
const cors = require('cors');
const { router } = require('./routers/router');
const ErrorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(ErrorMiddleware);

module.exports = app;
