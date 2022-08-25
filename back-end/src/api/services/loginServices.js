const { ErrorHandle } = require('../class/errorHandle');
const { generateJWTToken } = require('../utils/JWTToken');
const { passwordCompare } = require('../utils/md5Create');

class LoginService {
  constructor(model) { this._model = model }
  
  async authentication(email, password) {
    console.log('entrei no service');
    
    const hasUser = await this._model.findOne({ email });

    if (!hasUser) throw ErrorHandle(404, 'Usuário não encontrádo');

    if (!passwordCompare(password, hasUser.password)) {
      throw ErrorHandle(404, 'Senha incorreta'); 
    };

    const token = generateJWTToken(JSON.stringify(hasUser));
    return { token };
  };
}

module.exports = { LoginService };