const express = require('express');
const register = require('../routes/register');
const errorHandler = require('../middleware/error');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errorHandler);
app.use('/register', register);

module.exports = app;
