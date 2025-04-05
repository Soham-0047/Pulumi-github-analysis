import * as github from "@pulumi/github";
import * as auto from "@pulumi/pulumi/automation/index.js";

// Exported function to be called from backend
export async function automateGitHub(pr, githubToken) {
  const stack = await auto.LocalWorkspace.createOrSelectStack({
    stackName: "dev",
    projectName: "greencode",
    program: async () => {
      const provider = new github.Provider("gh-provider", { token: githubToken });

      // Sentiment Label
      const sentimentLabel = new github.IssueLabel(`sentiment-${pr.prId}`, {
        repository: pr.repo.split("/")[1],
        name: pr.sentiment > 70 ? "Positive" : "Critical",
        color: pr.sentiment > 70 ? "00FF00" : "FF0000",
      }, { provider });

      // Green Code Comment
      if (pr.carbonImpact < 0) {
        new github.IssueComment(`green-comment-${pr.prId}`, {
          repository: pr.repo.split("/")[1],
          issueNumber: parseInt(pr.prId),
          body: `🎉 Green Code! Reduced carbon by ${Math.abs(pr.carbonImpact).toFixed(3)}kg!`,
        }, { provider });
      }
    },
  });

  await stack.up();
}