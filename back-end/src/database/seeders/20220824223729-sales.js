'use strict';


module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Sales',
      [{
        id: 1,
        user_id: 1,
        seller_id: 2,
        total_price: 19.69,
        delivery_address: 'XP Street',
        delivery_number: '123456789',
        sale_date: '2022-08-23',
        status: 'pending',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Sales', null, {});
  },
};