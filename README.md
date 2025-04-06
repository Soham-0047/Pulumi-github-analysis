# GreenCode Sentiment Hub

Welcome to **GreenCode Sentiment Hub**! This is a full-stack MERN app that analyzes GitHub pull requests (PRs) for sentiment and environmental impact. Whether you’re a developer curious about your team’s vibe or passionate about sustainable coding, this tool’s got you covered.

- **Frontend**: Built with React, hosted on Netlify.
- **Backend**: Pulumi ESC, Node.js/Express, hosted on Render, with MongoDB Atlas for storage.
- **Features**: Sentiment analysis via Hugging Face, carbon impact scoring, and automatic GitHub PR updates with labels and comments.

This README explains how to use the app, get a GitHub PAT, and set it up locally if you want to tinker with the code.

---

## Live Demo
- **Full Web App**: [https://greencode-sentiment.netlify.app](https://greencode-sentiment.netlify.app)
- **Youtube**: [https://youtu.be/UcdxpkgVb6o](https://youtu.be/UcdxpkgVb6o)

---

## How Users Interact with the App
Here’s how to use GreenCode Sentiment Hub, whether you’re hitting the live demo or running it locally:

### Using the Live Demo
1. **Visit the Frontend**:
   - Open [https://greencode-frontend.onrender.com](https://greencode-frontend.onrender.com/dashboard) in your browser.
2. **Enter Your GitHub Credentials**:
   - **GitHub Token**: Paste your Personal Access Token (see "Getting a GitHub PAT" below).
   - **Repository**: Enter your repo in the format `username/repo` (e.g., `your-username/your-repo`).
   - Click "Save Credentials" to store them.
3. **Analyze a PR**:
   - Input a PR number (e.g., `1` for PR #1 in your repo).
   - Click "Analyze PR" to kick off the magic.
4. **See the Results**:
   - The app shows sentiment (e.g., "75.32%"), carbon impact (e.g., "-0.005kg"), and points.
   - Check your GitHub PR—it’ll have new labels ("Positive" or "Critical") and possibly a "Green Code!" comment if it’s eco-friendly.
   - Results update in real-time via WebSockets!

### Running Locally
Want to play with the code? Here’s how to set it up:

## Getting a GitHub Personal Access Token (PAT)
The app needs a GitHub PAT to update your PRs. Here’s how to get one:

### Steps
1. **Log in to GitHub**:
   - Head to [github.com](https://github.com) and sign in.
2. **Navigate to Tokens**:
   - Profile picture (top-right) > "Settings" > "Developer settings" > "Personal access tokens" > "Tokens (classic)".
3. **Generate Token**:
   - Click "Generate new token" > "Generate new token (classic)".
   - **Name**: e.g., "GreenCode Sentiment Hub".
   - **Expiration**: Choose a duration (e.g., 30 days).
   - **Scopes**: Select `repo` (full repo access for labels/comments).
   - Click "Generate token".
4. **Copy It**:
   - You’ll get something like `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`.
   - Store it securely—GitHub won’t show it again!
5. **Use in App**:
   - Paste it into the "GitHub Token" field on the frontend.

### Notes
- **Scope**: `repo` is required—without it, you’ll hit a 403 error.
- **Security**: Keep it private; don’t share it publicly.

---

## Setup for Developers
Want to run or tweak the code? Here’s how, with a big shoutout to Pulumi for sponsoring secure config management!

### Prerequisites
- **Node.js**: v16+ with npm.
- **MongoDB**: Local or Atlas (free tier works).
- **Pulumi Account**: For ESC secrets—sign up at [pulumi.com](https://pulumi.com).

### Backend Setup
1. **Clone**: 
   ```bash
   git clone https://github.com/Soham-0047/Pulumi-github-analysis.git
   cd greencode-backend