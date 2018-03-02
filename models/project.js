module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 140]
      }
    },
    progress: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    target_completion_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    priority: {
      type: DataTypes.TINYINT,
      defaultValue: 0 // Setting to false as default so tasks can be priorityless
    }
  });

  Project.associate = function(models) {
    Project.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id'
    });
  };

  Project.associate = function(models) {
    Project.hasMany(models.Milestone, {
      onDelete: 'cascade'
    });
  };

  return Project;
};
