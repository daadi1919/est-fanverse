import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import logsRouter from "./routes/logs";
import nftsRouter from "./routes/nfts";
import proposalsRouter from "./routes/proposals"; // ✅ Ajout route DAO

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/fanverse";

// Middleware
app.use(cors({
  origin: "http://localhost:3004",
  methods: ["GET", "POST", "PATCH"],
  credentials: true
}));
app.use(express.json());

// Connexion MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => {
    console.error("❌ Échec de connexion à MongoDB :", err);
    process.exit(1);
  });

// Routes API
app.use("/api/logs", logsRouter);
app.use("/api/nfts", nftsRouter);
app.use("/api/proposals", proposalsRouter); // ✅ Nouvelle route

// Route par défaut
app.get("/", (req, res) => {
  res.send("🚀 API EST FanVerse est opérationnelle !");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🟢 Backend opérationnel sur http://localhost:${PORT}`);
});
