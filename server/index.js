import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import axios from "axios";
import getSecrets from "./secrets.js";
import { automateGitHub } from "./automateGithub.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:5173","https://greencode-setiment.onrender.com"], // <-- ✅ Allow all origins (for dev only)
    methods: ["GET", "POST"],
  }
});

// Use this at the top of the file, before routes
app.use(cors({
  origin: ["http://localhost:5173","https://greencode-setiment.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

(async () => {
  try {
    const { huggingFaceKey } = await getSecrets();

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const userSchema = new mongoose.Schema({
      githubToken: { type: String, required: true },
      repo: String,
    });

    const prSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      prId: String,
      sentiment: Number,
      carbonImpact: Number,
      points: Number,
      repository: String,
    });

    const User = mongoose.model("User", userSchema);
    const PR = mongoose.model("PR", prSchema);

    app.post("/users", async (req, res) => {
      const { githubToken, repo } = req.body;
      if (!githubToken || !repo) return res.status(400).json({ error: "Missing githubToken or repo" });
      const user = new User({ githubToken, repo });
      await user.save();
      res.json({ userId: user._id });
    });

    app.get("/prs/:userId", async (req, res) => {
      const prs = await PR.find({ userId: req.params.userId });
      res.json(prs);
    });

    app.post("/analyze-pr", async (req, res) => {
      const { userId, prId } = req.body;
      if (!userId || !prId) return res.status(400).json({ error: "Missing userId or prId" });

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const { githubToken, repo } = user;

      const prMeta = await axios.get(`https://api.github.com/repos/${repo}/pulls/${prId}`, {
        headers: { Authorization: `Bearer ${githubToken}` },
      });

      const prStats = await axios.get(`https://api.github.com/repos/${repo}/pulls/${prId}/files`, {
        headers: { Authorization: `Bearer ${githubToken}` },
      });

      let additions = 0;
      let deletions = 0;
      for (const file of prStats.data) {
        additions += file.additions;
        deletions += file.deletions;
      }

      const inputText = prMeta.data.body + " " + prMeta.data.title;
      const sentimentResponse = await axios.post(
        "https://router.huggingface.co/hf-inference/models/finiteautomata/bertweet-base-sentiment-analysis",
        { inputs: inputText },
        {
          headers: {
            Authorization: `Bearer ${huggingFaceKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const scores = sentimentResponse.data?.[0];
      if (!Array.isArray(scores)) {
        console.error("Unexpected response structure from Hugging Face", sentimentResponse.data);
        return res.status(500).json({ error: "Sentiment analysis failed" });
      }

      const best = scores.reduce((max, curr) => (curr.score > max.score ? curr : max), scores[0]);
      const sentimentScore = best.score * 100;

      const carbonImpact = (additions - deletions) * 0.001;
      const points = (sentimentScore > 70 ? 10 : 0) + (carbonImpact < 0 ? 20 : 0);

      const pr = new PR({ userId, prId, sentiment: sentimentScore, carbonImpact, points, repository: repo });
      await pr.save();

      io.emit(`prUpdate:${userId}`, pr);
      await automateGitHub({ repo, prId, sentiment: sentimentScore, carbonImpact }, githubToken);

      res.json(pr);
    });

    app.get("/prs", async (req, res) => {
      const prs = await PR.find();
      res.json(prs);
    });

    server.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
  } catch (err) {
    console.error("❌ Server startup error:", err);
  }
})();

