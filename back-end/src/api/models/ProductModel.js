const { Product } = require('../../database/models');
const { SequelizeModel } = require('../utils/SequelizeModel');

class ProductModel extends SequelizeModel {
  constructor(model = Product) {
    super(model);
  }
}

module.exports = { ProductModel };