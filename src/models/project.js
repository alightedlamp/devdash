module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
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
    completed: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    priority: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    }
  });
  return Project;
};