'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.User, {through: models.Cart})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please fill the product's name"
        },
        notEmpty: {
          msg: "Product name can't be empty"
        }
      } 
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "image_url must be an URL link"
        }
      } 
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please fill product's price"
        },
        isNumeric: {
          msg: "Price must be 0 or a positive number"
        },
        min: {
          args: [0],
          msg: "Price must be 0 or a positive number"
        }
      } 
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please fill product's stock"
        },
        isNumeric: {
          msg: "Price must be 0 or a positive number"
        },
        min: {
          args: [0],
          msg: "Stock must be 0 or a positive number"
        }
      } 
    },
    category: DataTypes.STRING,
    detail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};