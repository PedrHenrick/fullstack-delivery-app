const { compareSync, genSaltSync, hashSync } = require('bcrypt');

const passwordHash = (senha) => hashSync(senha, genSaltSync(10));
const comparaSenha = (senhaBd, passHash) => compareSync(senhaBd, passHash);

module.exports = {
  passwordHash,
  comparaSenha,
};
