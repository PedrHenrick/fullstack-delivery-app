const { INTEGER, Model } = require('sequelize');
const Products = require('./product');
const Sales = require('./sale');
const db = require('.');

class SalesProduct extends Model {}

SalesProduct.init({
      productId: {
        type: INTEGER,
        allowNull: false,
        field: 'product_id'
      },
      saleId: {
        type: INTEGER,
        allowNull: false,
        field: 'sale_id'
      },
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
  foreignKey: "productId",
  otherKey: 'saleId'
});
Sales.belongsToMany(Products, {
  as: "productsIds",
  through: SalesProduct,
  foreignKey: "saleId",
  otherKey: 'productId'
});

module.exports = SalesProduct;
