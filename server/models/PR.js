import mongoose from "mongoose";

const prSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  repo: String,
  prId: String,
  sentiment: Number,
  carbonImpact: Number,
  points: Number,
});

const PR = mongoose.model("PR", prSchema);
export default PR;
