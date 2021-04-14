'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please fill a product that you want to add"
        },
        isNumeric: {
          msg: "Please fill this field with a product's Id"
        }
      } 
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please fill product's quantity"
        },
        min: {
          args: 1,
          msg: "Quantity must be a positive number"
        }
      } 
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};