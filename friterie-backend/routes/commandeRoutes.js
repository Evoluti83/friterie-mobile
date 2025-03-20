const express = require("express");
const Commande = require("../models/Commande");

const router = express.Router();

// Ajouter une commande
router.post("/", async (req, res) => {
  try {
    const commande = await Commande.create(req.body);
    res.json(commande);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer toutes les commandes
router.get("/", async (req, res) => {
  try {
    const commandes = await Commande.findAll();
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
