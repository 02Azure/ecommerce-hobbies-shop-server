'use strict';
const hashPassword = require("../helpers/password-hasher")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        username: "lilynano",
        email: "lilynano@mail.com",
        password: hashPassword("lilily"),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "otong322",
        email: "otong@mail.com",
        password: hashPassword("pass123"),
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "02azure",
        email: "from02azure@mail.com",
        password: hashPassword("abc123"),
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {})
  }
};
