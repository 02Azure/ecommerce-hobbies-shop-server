'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Carts", [
      {
        UserId: 2,
        ProductId: 5,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        ProductId: 3,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 3,
        ProductId: 3,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 3,
        ProductId: 1,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Carts", null, {})
  }
};
