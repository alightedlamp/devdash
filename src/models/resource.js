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
        isUrl: true // checks for url format (http://foo.com)
      }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    priority: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    }
  });
  return Resource;
};
