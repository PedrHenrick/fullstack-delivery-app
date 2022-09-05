'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', { 
      sale_id: { 
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products');
  },
};
