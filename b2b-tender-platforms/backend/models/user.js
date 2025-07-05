'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  
  User.associate = function(models) {
    User.hasOne(models.Company, { foreignKey: 'userId' });
    User.hasMany(models.Application, { foreignKey: 'userId' });
  };

  return User;
};
