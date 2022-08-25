const { generateJWTToken } = require('../utils/JWTToken');
const { passwordCompare, passwordHash } = require('../utils/md5Create');

class LoginService {
  constructor(model) { this.model = model; }
  
  async authentication({ email, password }) {    
    const hasUser = await this.model.findOne({ where: { email } });

    if (!hasUser) throw new Error('userNotFound');

    if (!passwordCompare(password, hasUser.password)) {
      throw new Error('incorrectPassword'); 
    }

    const token = generateJWTToken(JSON.stringify(hasUser));
    return { token };
  }

  async register({ password, email, name }) {
    const [{ id, role }, created] = await this.model.findOrCreate({
      where: { email },
      defaults: { email, name, password: passwordHash(password) },
    });
    if (!created) throw new Error('emailCadastrado');
    
    const token = generateJWTToken(JSON.stringify({ id, role }));
    return { token, id };
  }
}

module.exports = { LoginService };