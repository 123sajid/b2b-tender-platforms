// models/company.js or models/Company.js
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    industry: DataTypes.STRING,
    description: DataTypes.TEXT,
    logoUrl: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  });

  Company.associate = (models) => {
    Company.belongsTo(models.User, { foreignKey: 'userId' });
    Company.hasMany(models.Tender, { foreignKey: 'companyId' });
  };

  return Company;
};
