const { Router } = require('express');
const { loginRouter } = require('./login.router');

const router = Router();

router.use('/', loginRouter);

module.exports = { router };
