import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import axios from "axios";
import  getSecrets  from "./secrets.js";
import { automateGitHub } from "../pulumi/index.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // <-- ✅ Allow all origins (for dev only)
    methods: ["GET", "POST"],
  }
});

// Use this at the top of the file, before routes
app.use(cors({
  origin: "*", // 🔥 allow all
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle preflight requests
app.options("*", cors());
app.use(express.json());

(async () => {
  const { huggingFaceKey, carbonKey, githubToken } = await getSecrets();
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const prSchema = new mongoose.Schema({
    repo: String,
    prId: String,
    sentiment: Number,
    carbonImpact: Number,
    points: Number,
  });
  const PR = mongoose.model("PR", prSchema);

  // Get all PRs
  app.get("/prs", async (req, res) => {
    const prs = await PR.find();
    res.json(prs);
  });

  // Analyze PR
  app.post("/analyze-pr", async (req, res) => {
    const { repo, prId } = req.body;

    // Fetch PR data
    const prData = await axios.get(`https://api.github.com/repos/${repo}/pulls/${prId}`, {
      headers: { Authorization: `Bearer ${githubToken}` },
    });

    // Sentiment analysis

    const inputText = prData.data.body + " " + prData.data.title;

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
    
    // Flatten the nested array
    const scores = sentimentResponse.data?.[0];
    if (!Array.isArray(scores)) {
      console.error("Unexpected response structure from Hugging Face");
      return res.status(500).json({ error: "Sentiment analysis failed" });
    }
    
    // Pick the label with the highest score
    const best = scores.reduce((max, curr) => (curr.score > max.score ? curr : max), scores[0]);
    
    const sentimentLabel = best.label;
    const sentimentScore = best.score * 100;
    
    console.log("✅ Sentiment:", sentimentLabel, sentimentScore.toFixed(2));
    
    
    

    // Carbon Impact (Simplified)
    const carbonImpact = calculateCarbonImpact(prData.data);

    const pr = new PR({
      repo,
      prId,
      sentiment: sentimentScore,
      carbonImpact,
      points: calculatePoints(sentimentScore, carbonImpact),
    });
    await pr.save();

    io.emit("prUpdate", pr);
    await automateGitHub(pr, githubToken);

    res.json(pr);
  });

  server.listen(5000, () => console.log("Server running on port 5000"));
})();

function calculateCarbonImpact(prData) {
  return (prData.additions - prData.deletions) * 0.001; // kg CO2 (proxy)
}

function calculatePoints(sentiment, carbon) {
  return (sentiment > 70 ? 10 : 0) + (carbon < 0 ? 20 : 0);
}



// import express from "express";
// import mongoose from "mongoose";
// import { Server } from "socket.io";
// import axios from "axios";
// import jwt from "jsonwebtoken";
// import http from "http";
// import getSecrets from "./secrets.js";
// import authRoutes from "./routes/auth.js";
// import PR from "./models/PR.js";
// import User from "./models/User.js";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.json());
// app.use("/auth", authRoutes);

// (async () => {
//   const { huggingFaceKey, githubToken, jwtSecret } = await getSecrets();
//   await mongoose.connect("mongodb://localhost/greencode", { useNewUrlParser: true, useUnifiedTopology: true });

//   // Middleware to verify JWT
//   const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token" });
//     try {
//       const decoded = jwt.verify(token, jwtSecret);
//       req.userId = decoded.userId;
//       next();
//     } catch (e) {
//       res.status(401).json({ message: "Invalid token" });
//     }
//   };

//   app.post("/analyze-pr", authMiddleware, async (req, res) => {
//     const { repo, prId } = req.body;

//     // Fetch PR data
//     const prData = await axios.get(`https://api.github.com/repos/${repo}/pulls/${prId}`, {
//       headers: { Authorization: `Bearer ${githubToken}` },
//     });

//     // Sentiment Analysis (Hugging Face)
//     const sentimentRes = await axios.post(
//       "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
//       { inputs: prData.data.body + " " + prData.data.title },
//       { headers: { Authorization: `Bearer ${huggingFaceKey}` } }
//     );
//     const sentiment = sentimentRes.data[0].score * 100;

//     // Carbon Impact (Proxy)
//     const carbonImpact = (prData.data.additions - prData.data.deletions) * 0.001; // kg CO2
//     const points = (sentiment > 70 ? 10 : 0) + (carbonImpact < 0 ? 20 : 0);

//     const pr = new PR({ userId: req.userId, repo, prId, sentiment, carbonImpact, points });
//     await pr.save();

//     // Update user points
//     await User.findByIdAndUpdate(req.userId, { $inc: { points } });

//     io.emit("prUpdate", pr);
//     await automateGitHub(pr, githubToken);

//     res.json(pr);
//   });

//   app.get("/leaderboard", async (req, res) => {
//     const leaderboard = await User.find().sort({ points: -1 }).limit(10);
//     res.json(leaderboard);
//   });

//   server.listen(5000, () => console.log("Server on port 5000"));
// })();
