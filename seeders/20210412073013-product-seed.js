'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        name: "Raigeki LOB SR unlimited",
        image_url: "https://i.imgur.com/47TZSQe.jpg",
        price: 280000,
        stock: 3,
        category: "single",
        detail: "Near Mint condition",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pokeball Leather Deck Case",
        image_url: "https://i.imgur.com/IfY0Mj2.jpg",
        price: 80000,
        stock: 9,
        category: "accessory",
        detail: "High quality deckbox that is enough for 100 large-sized TCG",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Custom Playmat: Trails of Cold Steel 3",
        image_url: "https://i.imgur.com/6EkDeLT.png",
        price: 270000,
        stock: 2,
        category: "accessory",
        detail: "Custom 30 x 45 cm rubber playmat featuring Trails of Cold Steel 3!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ultra Pro 3x3 Binder: Black",
        image_url: "https://i.imgur.com/maI7CJq.png",
        price: 250000,
        stock: 1,
        category: "accessory",
        detail: "Leather cover, with total 360 card slot",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "2020 Tin of Lost Memories",
        image_url: "https://i.imgur.com/XW7VEE2.png",
        price: 195000,
        stock: 5,
        category: "sealed product",
        detail: "Obtain the very artifact that inspired Kaiba to create the Battle City Tournament!",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {})
  }
};
