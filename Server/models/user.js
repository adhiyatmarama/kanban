'use strict';
module.exports = (sequelize, DataTypes) => {

  const bcrypt = require('bcrypt')
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model;

  class User extends Model{}

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input your name'
        },
        notNull: {
          msg: 'Please input your name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input your email'
        },
        notNull: {
          msg: 'Please input your name'
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: (user, options) => {
        return bcrypt.hash(user.password, 8)
        .then(function(hash) {
          user.password = hash
        })
      }
  }, sequelize})

  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task, {foreignKey: 'UserId'})
  };
  return User;
};