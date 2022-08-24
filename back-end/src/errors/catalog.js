const errorCatalog = {
  emailCadastrado: {
    error: 'Email ja cadastrado',
    httpStatus: 422,
  },
  generalError: {
    error: 'Algo deu errado',
    httpStatus: 400,
  },
};

module.exports = errorCatalog;