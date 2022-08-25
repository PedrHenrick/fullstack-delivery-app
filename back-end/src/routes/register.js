const express = require('express');
const { registerController } = require('../controller/registerController');
const { validateCreateLogin } = require('../middleware/validateDataRegister');

const router = express.Router();

router.post('/', validateCreateLogin, registerController);

module.exports = router;
