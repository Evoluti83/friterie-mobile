const express = require("express");
const Paiement = require("../models/Paiement");
const Commande = require("../models/Commande");

const router = express.Router();

// Ajouter un paiement
router.post("/", async (req, res) => {
  try {
    const { commande_id, montant, methode, statut } = req.body;

    // Vérifier si la commande existe
    const commande = await Commande.findByPk(commande_id);
    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    // Créer le paiement
    const paiement = await Paiement.create({
      commande_id,
      montant,
      methode,
      statut: statut || "En attente",
    });

    res.json(paiement);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Récupérer tous les paiements
router.get("/", async (req, res) => {
  try {
    const paiements = await Paiement.findAll();
    res.json(paiements);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

module.exports = router;
