'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    proposal: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    tenderId: DataTypes.INTEGER
  }, {});
  
  Application.associate = function(models) {
    Application.belongsTo(models.User, { foreignKey: 'userId' });
    Application.belongsTo(models.Tender, { foreignKey: 'tenderId' });
  };

  return Application;
};
