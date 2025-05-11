import mongoose from "mongoose";

const actionLogSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export const ActionLog = mongoose.model("ActionLog", actionLogSchema);
