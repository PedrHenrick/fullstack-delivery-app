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
<<<<<<< .merge_file_Gum7QV
      type: DataTypes.DECIMAL(),
=======
      type: DECIMAL(4,2),
>>>>>>> .merge_file_talQTY
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
