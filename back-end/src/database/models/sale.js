module.exports = (Sequelize, DataTypes) => {
  const Sale = Sequelize.define('Sales', {
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

  Sale.associate = (models) => {
    Sale.belongsTo(models.Users, {foreignKey: 'userId', as: 'sales'})
  };
  Sale.associate = (models) => {
    Sale.belongsTo(models.Users, {foreignKey: 'sellerId', as: 'sales'})
  };

  return Sale;
};

