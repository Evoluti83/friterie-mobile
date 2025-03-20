const { DataTypes } = require("sequelize");
const db = require("../config/db");
const User = require("./User");

const Commande = db.define("Commande", {
  total: { type: DataTypes.FLOAT, allowNull: false },
  statut: { type: DataTypes.STRING, defaultValue: "En attente" },
});

Commande.belongsTo(User, { foreignKey: "user_id" });

module.exports = Commande;
