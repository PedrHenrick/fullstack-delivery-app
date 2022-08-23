const Sale = (Sequelize, DataTypes) => {
  const salesTable = Sequelize.define('sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      field: 'user_id',
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      field: 'seller_id',
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
      field: 'total_price',
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'delivery_address',
    },
    deliverynNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'delivery_number',
    },
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'sale_date',
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, { timestamps: false });

  salesTable.associate = (models) => {
    salesTable.belongsTo(models.user, {foreignKey: 'userId', as: 'sale'})
  };
  salesTable.associate = (models) => {
    salesTable.belongsTo(models.user, {foreignKey: 'sellerId', as: 'sale'})
  };

  return salesTable;
};

module.exports = Sale;
