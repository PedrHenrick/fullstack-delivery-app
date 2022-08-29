const { DataTypes, Model } = require('sequelize');
const db = require('.');
// const User = require('./user');

class Sales extends Model {}

Sales.init({
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
  }, {
    underscored: true,
    sequelize: db,
    modelName: 'sales',
    timestamps: false,
  });
  Sales.associate = (models) => {
    Sales.belongsTo(models.Users, {foreignKey: 'userId', as: 'sales'});
    Sales.belongsTo(models.Users, {foreignKey: 'sellerId', as: 'sales'});
  };

  module.exports = Sales;
