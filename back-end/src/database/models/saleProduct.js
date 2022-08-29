const { DataTypes, Model } = require('sequelize');
const db = require('.');

class SalesProduct extends Model {}

SalesProduct.init({
      saleId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        field: "sale_id",
      },
      productId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        field: "product_id",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      underscored: true,
      sequelize: db,
      modelName: 'salesProducts',
      timestamps: false,
    });

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

module.exports = SalesProduct;
