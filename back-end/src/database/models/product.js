const { INTEGER, STRING, DECIMAL, Model } = require('sequelize');
const db = require('.');

class Product extends Model {}

Product.init({
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(100),
      allowNull: false,
    },
    price: {
      type: DECIMAL(4,2),
      allowNull: false
    },
    urlImage: {
      type: STRING(200),
      allowNull: false,
      field: 'url_image',
    },
  }, {
    underscored: true,
    sequelize: db,
    modelName: 'products',
    timestamps: false,
  });

  module.exports = Product;
