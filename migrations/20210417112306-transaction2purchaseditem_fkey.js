'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('PurchasedItems', {
      fields: ['TransactionId'],
      type: 'foreign key',
      name: 'fkeytransaction2purchased',
      references: {
        table: 'Transactions',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('PurchasedItems', "fkeytransaction2purchased", {})
  }
};
