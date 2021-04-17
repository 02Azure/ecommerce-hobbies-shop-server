'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchasedItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PurchasedItem.belongsTo(models.Transaction)
    }
  };
  PurchasedItem.init({
    TransactionId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    detail: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PurchasedItem',
  });
  return PurchasedItem;
};