const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router(); // ✅ indispensable

// Inscription
router.post("/register", async (req, res) => {
  const { nom, email, mot_de_passe, telephone, adresse } = req.body;
  console.log("📥 Données reçues dans /register :", req.body);

  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const user = await User.create({
      nom,
      email,
      mot_de_passe: hashedPassword,
      telephone,
      adresse
    });

    console.log("✅ Utilisateur enregistré :", user.dataValues);
    res.status(201).json({ message: "Utilisateur créé avec succès", utilisateur: user });
  } catch (error) {
    console.error("❌ Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Connexion
router.post("/login", async (req, res) => {
  const { email, mot_de_passe } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
