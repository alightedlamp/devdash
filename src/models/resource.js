module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define("Resource", {
    title: {
    	type: DataTypes.STRING,
    	allowNull: false,
      validate: {
    	  len: [2, 140]
      }
	  },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true // checks for url format
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

  Resource.associate = function(models) {
    Resource.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Resource;
};
