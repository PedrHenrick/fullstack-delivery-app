const jwt = require('jsonwebtoken');
const { passwordHash } = require('../util/crypto');
const { Users } = require('../database/models');

const { JWT_SECRET } = process.env;
const jwtConfig = {
  expiresIn: '1h',
};

const registerService = async (payload) => {
    const { password, email, name } = payload;
    const [{ id, role }, created] = await Users.findOrCreate(
      {
        where: { email },
        defaults: { email, name, password: passwordHash(password) },
      },
    );
    if (!created) throw new Error('emailCadastrado');
    
    const token = jwt.sign({ id, role }, JWT_SECRET, jwtConfig);

    return { token, id };
};

module.exports = {
  registerService,
};
