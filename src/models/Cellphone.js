const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Cellphone = sequelize.define("Cellphone", {
	buy_date: {
		type: DataTypes.DATEONLY
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	chips: {
		type: DataTypes.STRING,
		allowNull: false
	},
	manufacturer: {
		type: DataTypes.STRING,
		allowNull: false
	},
	nfc: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
});

Cellphone.associate = function(models){
	Cellphone.belongsTo(models.User, {});
	Cellphone.hasMany(models.Photo, {});
}

module.exports = Cellphone;
