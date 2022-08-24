const { StatusCodes } = require('http-status-codes');

const { registerService } = require('../services/registerService');

const registerController = async (req, res) => {
  const payload = req.body;
  const register = await registerService(payload);
  return res.status(StatusCodes.OK).json(register);
};

module.exports = {
  registerController,
};
