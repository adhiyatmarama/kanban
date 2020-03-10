'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model;

  class Task extends Model{}

  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please input the title'
        }
      }
    },
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {sequelize})
  
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, {foreignKey: 'UserId'})
  };
  return Task;
};