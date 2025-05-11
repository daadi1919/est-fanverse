import express from "express";
import { ActionLog } from "../models/ActionLog";

const router = express.Router();

// POST /api/logs
router.post("/", async (req, res) => {
  try {
    const { address, action, metadata } = req.body;

    if (!address || !action) {
      return res.status(400).json({ error: "address et action sont requis." });
    }

    const log = new ActionLog({ address, action, metadata });
    await log.save();

    res.status(201).json({ message: "Action enregistrée avec succès ✅", log });
  } catch (error) {
    console.error("Erreur enregistrement log :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
