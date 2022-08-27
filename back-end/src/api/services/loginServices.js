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

    const token = generateJWTToken({ ...hasUser.dataValues });
    return { token, id: hasUser.id };
  }

  async register({ password, email, name, role = 'cliente' }) {
    const [user, created] = await this.model.findOrCreate({
      where: { email },
      defaults: { email, name, role, password: passwordHash(password) },
    });
    if (!created) throw new Error('emailCadastrado');
    const token = generateJWTToken({ ...user.dataValues });
    return { token, id: user.id };
  }
}

module.exports = { LoginService };