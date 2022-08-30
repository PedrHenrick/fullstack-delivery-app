const { DataTypes, Model } = require('sequelize');
const db = require('.');

class SalesProduct extends Model {}

SalesProduct.init({
      saleId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        primaryKey: true,
        field: "sale_id",
      },
      productId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        primaryKey: true,
        field: "product_id",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      underscored: true,
      sequelize: db,
      modelName: 'sales_products',
      timestamps: false,
    });

  SalesProduct.associate = (models) => {
    models.Products.belongsToMany(models.Sales, {
      foreignKey: "productId",
      as: "sales",
      through: SalesProduct,
      otherKey: 'saleId'
    });
    models.Sales.belongsToMany(models.Products, {
      foreignKey: "saleId",
      as: "products",
      through: SalesProduct,
      otherKey: 'productId'
    });
  };

module.exports = SalesProduct;
