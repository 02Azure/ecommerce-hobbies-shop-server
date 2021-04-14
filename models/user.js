'use strict';
const hashPassword = require("../helpers/password-hasher")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Product, {through: models.Cart})
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please fill your username"
        },
        notEmpty: {
          msg: "Username can't be empty"
        },
        isAlphanumeric: {
          msg: "Please fill username with alphanumeric characters only"
        }
      } 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please fill your email"
        },
        isEmail: {
          msg: "Please fill your email with following format: example@mail.com"
        }
      } 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please fill your password"
        },
        notEmpty: {
          msg: "Password can't be empty"
        }
      } 
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
        user.role = "customer"
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};