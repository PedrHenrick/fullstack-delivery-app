const { userModel } = require('../../database/models/user');
const { SequelizeModel } = require('../utils/SequelizeModel');

class UserModel extends SequelizeModel{
  constructor(model = userModel) {
    super(model);
  }
};

module.exports = { UserModel };
