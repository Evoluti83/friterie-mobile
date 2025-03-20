const express = require("express");
const Menu = require("../models/Menu");

const router = express.Router();

// Ajouter un menu
router.post("/", async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer tous les menus
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
