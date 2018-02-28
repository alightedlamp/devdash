module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
    	type: DataTypes.STRING,
    	allowNull: false,
      validate: {
    	  len: [2, 140]
      }
	  },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Project, {
      onDelete: "cascade"
    });
  };

  User.associate = function(models) {
    User.hasMany(models.Resource, {
      onDelete: "cascade"
    });
  };

  return User;
};