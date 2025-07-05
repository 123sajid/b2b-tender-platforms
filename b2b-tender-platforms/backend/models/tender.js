'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tender = sequelize.define('Tender', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    budget: DataTypes.FLOAT,
    deadline: DataTypes.DATE,
    companyId: DataTypes.INTEGER
  }, {});
  
  Tender.associate = function(models) {
    Tender.belongsTo(models.Company, { foreignKey: 'companyId' });
    Tender.hasMany(models.Application, { foreignKey: 'tenderId' });
  };

  return Tender;
};
