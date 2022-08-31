const { Router } = require('express');
const { loginRouter } = require('./login.router');
const sellerRouter = require('./seller.router');
const { productRouter } = require('./product.router');
const { customerRouter } = require('./customer.router');

const router = Router();

router.use('/', loginRouter);
router.use('/seller', sellerRouter);
router.use('/product', productRouter);
router.use('/customer', customerRouter);

module.exports = { router }; 