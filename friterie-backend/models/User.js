const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define("User", {
  nom: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  mot_de_passe: { type: DataTypes.STRING, allowNull: false },
  telephone: { type: DataTypes.STRING },
  adresse: { type: DataTypes.STRING },
});

module.exports = User;
