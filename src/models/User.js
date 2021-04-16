const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define("User", {
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	username: {
		type: DataTypes.STRING,
		allowNull:false
	},
	phone_number: {
		type: DataTypes.STRING
	},
	address: {
		type: DataTypes.STRING
	}
});

User.associate = function(models){
	User.hasMany(models.Cellphone, {});
}

module.exports = User;
