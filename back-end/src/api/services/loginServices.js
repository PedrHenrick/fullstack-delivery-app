const { generateJWTToken } = require('../utils/JWTToken');
const { passwordCompare, passwordHash } = require('../utils/md5Create');

class LoginService {
  constructor(model) {
    this.model = model;
  }

  async authentication({ email, password }) {
    const hasUser = await this.model.findOne({ where: { email } });

    if (!hasUser) throw new Error('userNotFound');

    if (!passwordCompare(password, hasUser.password)) {
      throw new Error('incorrectPassword');
    }
    const token = generateJWTToken({
      id: hasUser.id,
      name: hasUser.name,
      email: hasUser.email,
      role: hasUser.role,
    });
    return { token, id: hasUser.id };
  }

  async register({ password, email, name, role = 'cliente' }, admin) {
    const [user, created] = await this.model.findOrCreate({
      where: { email },
      defaults: { email, name, role, password: passwordHash(password) },
    });
    if (!created) throw new Error('emailCadastrado');
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    if (admin) payload.role = role;

    const token = generateJWTToken({ ...payload });
    return { token, id: user.id };
  }
}

module.exports = { LoginService };
