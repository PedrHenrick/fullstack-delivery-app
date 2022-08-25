const { StatusCodes } = require('http-status-codes');

const errorCatalog = {
  emailCadastrado: {
    error: 'Email ja cadastrado',
    httpStatus: StatusCodes.UNPROCESSABLE_ENTITY,
  },
  generalError: {
    error: 'Algo deu errado',
    httpStatus: StatusCodes.BAD_REQUEST,
  },
  userNotFound: {
    error: 'User not found',
    httpStatus: StatusCodes.BAD_REQUEST,
  },
  incorrectPassword: {
    error: 'Incorrect password',
    httpStatus: StatusCodes.BAD_REQUEST,
  },
  unauthorized: {
    error: 'Unauthorized',
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
  ExpiredOrInvalidToken: {
    error: 'Expired or invalid token',
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
};

module.exports = errorCatalog;