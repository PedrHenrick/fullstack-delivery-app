const { INTEGER, STRING, DECIMAL, DATE, NOW, Model } = require('sequelize');
const db = require('.');
const Users = require('./user');
class Sales extends Model {}

Sales.init({
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: INTEGER,
      foreignKey: true,
      field: 'user_id',
    },
    sellerId: {
      type: INTEGER,
      foreignKey: true,
      field: 'seller_id',
    },
    totalPrice: {
      type: DECIMAL(9, 2),
      allowNull: false,
      field: 'total_price',
    },
    deliveryAddress: {
      type: STRING(100),
      allowNull: false,
      field: 'delivery_address',
    },
    deliveryNumber: {
      type: STRING(50),
      allowNull: false,
      field: 'delivery_number',
    },
    saleDate: {
      type: DATE,
      defaultValue: NOW,
      field: 'sale_date',
    },
    status: {
      type: STRING(50),
      allowNull: false,
    },
  }, {
    underscored: true,
    sequelize: db,
    modelName: 'sales',
    timestamps: false,
  });

  Users.hasMany(Sales, { foreignKey: 'id' });
  
  Sales.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
  Sales.belongsTo(Users, { foreignKey: 'sellerId', as: 'seller' });

  module.exports = Sales;
