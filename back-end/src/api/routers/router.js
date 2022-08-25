const { loginRouter } = require('./login.router');

const { Router } = require('express');

const router = Router();

router.use('/login', loginRouter);

module.exports = { router };
