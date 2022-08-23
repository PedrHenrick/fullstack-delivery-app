const SaleProduct = (Sequelize, DataTypes) => {
  const saleProductTable = Sequelize.define('saleProduct', {
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

  saleProductTable.associate = (models) => {
    saleProductTable.belongsTo(models.sale, {foreignKey: 'saleId', as: 'sale'})
  };
  saleProductTable.associate = (models) => {
    saleProductTable.belongsTo(models.products, {foreignKey: 'productId', as: 'products'})
  };

  return saleProductTable;
};

module.exports = SaleProduct;
