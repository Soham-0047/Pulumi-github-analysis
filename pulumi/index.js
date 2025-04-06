import * as github from "@pulumi/github";
import * as auto from "@pulumi/pulumi/automation/index.js";
import axios from "axios";

export async function automateGitHub(prData, githubToken) {
  const { repo, prId, sentiment, carbonImpact } = prData;
  const repoName = repo.split("/")[1];

  try {
    // Add sentiment label
    await axios.post(
      `https://api.github.com/repos/${repo}/issues/${prId}/labels`,
      { labels: [sentiment > 70 ? "Positive" : "Critical"] },
      { headers: { Authorization: `Bearer ${githubToken}`, "Content-Type": "application/json" } }
    );

    // Add green code comment if applicable
    if (carbonImpact < 0) {
      await axios.post(
        `https://api.github.com/repos/${repo}/issues/${prId}/comments`,
        { body: `🎉 Green Code! Reduced carbon by ${Math.abs(carbonImpact).toFixed(3)}kg!` },
        { headers: { Authorization: `Bearer ${githubToken}`, "Content-Type": "application/json" } }
      );
    }

    // Add high points label if applicable
    if (calculatePoints(sentiment, carbonImpact) > 20) {
      await axios.post(
        `https://api.github.com/repos/${repo}/issues/${prId}/labels`,
        { labels: ["High Green Sentiment"] },
        { headers: { Authorization: `Bearer ${githubToken}`, "Content-Type": "application/json" } }
      );
    }

    console.log("GitHub updated successfully");
  } catch (error) {
    console.error("GitHub update error:", error.response?.data || error.message);
  }
}