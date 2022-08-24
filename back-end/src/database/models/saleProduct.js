module.exports = (Sequelize, DataTypes) => {
  const SaleProduct = Sequelize.define('SaleProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      field: 'sale_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      field: 'product_id',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { timestamps: false });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Sales, {foreignKey: 'saleId', as: 'sales'})
  };
  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Products, {foreignKey: 'productId', as: 'products'})
  };

  return SaleProduct;
};
