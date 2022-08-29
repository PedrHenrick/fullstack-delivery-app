const { Router } = require('express');
const { loginRouter } = require('./login.router');
const { productRouter } = require('./product.router');
const { orderRoute } = require('./order.router');

const router = Router();

router.use('/', loginRouter);
router.use('/product', productRouter);
router.use('/costumer/orders', orderRoute);

module.exports = { router }; 