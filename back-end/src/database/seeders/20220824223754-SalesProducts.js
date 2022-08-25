'use strict';


module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('SalesProducts',
      [{
        sale_id: 1,
        product_id: 1,
        quantity: 1,
      },
      {
        sale_id: 1,
        product_id: 2,
        quantity: 1,
      },
      {
        sale_id: 1,
        product_id: 3,
        quantity: 1,
      },
      {
        sale_id: 1,
        product_id: 4,
        quantity: 1,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('SalesProducts', null, {});
  },
};
