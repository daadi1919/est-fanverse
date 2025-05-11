import mongoose from 'mongoose';

const ProposalSchema = new mongoose.Schema({
  description: { type: String, required: true },
  votes: { type: Number, default: 0 },
  creator: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Proposal = mongoose.model("Proposal", ProposalSchema);
