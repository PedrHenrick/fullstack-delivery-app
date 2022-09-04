const { INTEGER, Model } = require('sequelize');
const Products = require('./product');
const Sales = require('./sale');
const db = require('.');

class SalesProduct extends Model {}

SalesProduct.init({
<<<<<<< .merge_file_nJ4Rqy
      saleId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        primaryKey: true,
        field: "sale_id",
      },
      productId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        field: "product_id",
      },
=======
>>>>>>> .merge_file_douyCD
      quantity: {
        type: INTEGER,
        allowNull: false,
      },
    }, {
      sequelize: db,
      modelName: 'sales_products',
      timestamps: false,
    });

<<<<<<< .merge_file_nJ4Rqy
  SalesProduct.associate = (models) => {
    models.Products.belongsToMany(models.Sales, {
      foreignKey: "saleId",
      as: "sales",
      through: SalesProduct,
      otherKey: 'productId'
    });
    models.Sales.belongsToMany(models.Products, {
      foreignKey: "productId",
      as: "products",
      through: SalesProduct,
      otherKey: 'saleId'
    });
  };
=======
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
>>>>>>> .merge_file_douyCD

module.exports = SalesProduct;
