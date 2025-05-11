import express from "express";
import { Proposal } from "../models/Proposal";

const router = express.Router();

// GET /api/proposals — Liste des propositions
router.get("/", async (_req, res) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.json({ proposals });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/proposals — Créer une nouvelle proposition
router.post("/", async (req, res) => {
  try {
    const { description, creator } = req.body;
    if (!description || !creator) {
      return res.status(400).json({ error: "Champs requis manquants." });
    }

    const newProposal = new Proposal({ description, creator });
    await newProposal.save();
    res.status(201).json({ message: "Proposition créée", proposal: newProposal });
  } catch (err) {
    res.status(500).json({ error: "Erreur création proposition" });
  }
});

// PATCH /api/proposals/:id/vote — Voter sur une proposition
router.patch("/:id/vote", async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await Proposal.findById(id);
    if (!proposal) return res.status(404).json({ error: "Proposition introuvable." });

    proposal.votes += 1;
    await proposal.save();
    res.json({ message: "Vote enregistré", proposal });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors du vote" });
  }
});

export default router;
