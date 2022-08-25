const errorCatalog = {
  emailCadastrado: {
    error: 'Email ja cadastrado',
    httpStatus: 422,
  },
  generalError: {
    error: 'Algo deu errado',
    httpStatus: 400,
  },
  userNotFound: {
    error: 'User not found',
    httpStatus: 400,
  },
  incorrectPassword: {
    error: 'Incorrect password',
    httpStatus: 400,
  },
  unauthorized: {
    error: 'Unauthorized',
    httpStatus: 401,
  },
  ExpiredOrInvalidToken: {
    error: 'Expired or invalid token',
    httpStatus: 401,
  },
};

module.exports = errorCatalog;