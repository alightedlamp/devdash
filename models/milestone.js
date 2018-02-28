module.exports = function(sequelize, DataTypes) {
  var Milestone = sequelize.define('Milestone', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 140]
      }
    },
    target_completion_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true // only allow date strings
      }
    },
    completed_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    }
  });

  Milestone.associate = function(models) {
    Milestone.belongsTo(models.Project, {
      foreignKey: 'project_id',
      targetKey: 'id'
    });
  };

  return Milestone;
};
