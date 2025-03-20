const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Menu = db.define("Menu", {
  nom: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  prix: { type: DataTypes.FLOAT, allowNull: false },
  image: { type: DataTypes.STRING },
  categorie: { type: DataTypes.STRING },
});

module.exports = Menu;
