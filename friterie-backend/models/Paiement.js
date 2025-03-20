const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Commande = require("./Commande");

const Paiement = db.define("Paiement", {
  montant: { type: DataTypes.FLOAT, allowNull: false },
  methode: { type: DataTypes.STRING, allowNull: false },
  statut: { type: DataTypes.STRING, defaultValue: "En attente" },
});

Paiement.belongsTo(Commande, { foreignKey: "commande_id" });

module.exports = Paiement;
