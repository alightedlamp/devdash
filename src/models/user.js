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
      allowNull: false
    }
  });
  return User;
};
