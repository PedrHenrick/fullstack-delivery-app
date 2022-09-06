const { INTEGER, Model } = require('sequelize');
const Products = require('./product');
const Sales = require('./sale');
const db = require('.');

class SalesProduct extends Model {}

SalesProduct.init({
      quantity: {
        type: INTEGER,
        allowNull: false,
      },
    }, {
      sequelize: db,
      modelName: 'sales_products',
      timestamps: false,
    });

Products.belongsToMany(Sales, {
  as: "salesIds",
  through: SalesProduct,
  foreignKey: "product_id",
  otherKey: 'sale_id'
});
Sales.belongsToMany(Products, {
  as: "productsIds",
  through: SalesProduct,
  foreignKey: "sale_id",
  otherKey: 'product_id'
});

module.exports = SalesProduct;
