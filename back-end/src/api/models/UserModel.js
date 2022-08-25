const { Users } = require('../../database/models');
const { SequelizeModel } = require('../utils/SequelizeModel');

class UserModel extends SequelizeModel {
  constructor(model = Users) {
    super(model);
  }
}

module.exports = { UserModel };
