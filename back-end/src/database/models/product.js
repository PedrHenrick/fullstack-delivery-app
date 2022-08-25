const { DataTypes, Model } = require('sequelize');
const db = require('.');

class Product extends Model {}

Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false
    },
    urlImage: {
      type: DataTypes.STRING(200),
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
