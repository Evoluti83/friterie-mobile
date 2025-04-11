require("dotenv").config();
console.log("📁 Chargement du fichier .env...");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db"); // ✅ Assurez-vous que cette ligne est présente UNE SEULE FOIS

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/menus", require("./routes/menuRoutes"));
app.use("/api/commandes", require("./routes/commandeRoutes"));
app.use("/api/paiements", require("./routes/paiementRoutes"));

// Synchronisation avec MySQL
db.authenticate()
  .then(() => console.log("✅ Connexion à MySQL réussie"))
  .catch((err) => console.error("❌ Erreur de connexion :", err));

const PORT = process.env.PORT || 5000;
db.sync({ force: true }) // ⚠️ Cela va supprimer et recréer toutes les tables !
  .then(() => console.log("✅ Base de données synchronisée avec succès !"))
  .catch(err => console.error("❌ Erreur de synchronisation :", err));

app.listen(PORT, () => console.log(`🚀 Serveur en cours sur le port ${PORT}`));
