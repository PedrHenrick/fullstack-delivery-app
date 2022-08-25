const { Router } = require('express');
const { loginRouter } = require('./login.router');
const { productRouter } = require('./product.router');

const router = Router();

router.use('/', loginRouter);
router.use('/product', productRouter);

module.exports = { router }; 