'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Transactions', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fkeytransaction2user',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Transactions', "fkeytransaction2user", {})
  }
};
