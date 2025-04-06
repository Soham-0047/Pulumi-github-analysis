import { PrSubmissionPanel } from "@/components/pr-submission-panel"
import { RealTimeFeed } from "@/components/real-time-feed"
import { Leaderboard } from "@/components/leaderboard"
import { ArrowLeft } from 'lucide-react'
import { Link } from "react-router-dom"
import io from "socket.io-client";
import { useEffect, useState } from "react"

export default function Dashboard() {

  const [prId, setPrId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState(null);
  const [githubToken, setGithubToken] = useState("");
  const [repo, setRepo] = useState("");
  const [prs, setPrs] = useState([]);

  const socket = io(import.meta.env.VITE_API_URL, {
    transports: ["websocket"], // prevent fallback polling weirdness
  });


  const handleSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ githubToken, repo }),
      });

      if (!res.ok) throw new Error("Failed to save credentials");
      console.log(res);
      const { userId } = await res.json();
      setUserId(userId);
    } catch (err) {
      console.error("❌ Error saving credentials:", err);
      alert("Failed to save credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }


  const handleSubmit = async () => {
    if (!userId || !prId) {
      alert("Please enter a PR ID and ensure your credentials are saved.");
      return;
    }

    try {
      setIsLoading(true); // optional: show spinner or disable button
      const res = await fetch(`${import.meta.env.VITE_API_URL}/analyze-pr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, prId }),
      });

      if (!res.ok) throw new Error("Failed to analyze PR");

      const data = await res.json();
      console.log("✅ PR analyzed:", data);
      setPrId("");
      // Optional: toast or success UI
    } catch (error) {
      console.error("❌ Error analyzing PR:", error);
      alert("Something went wrong while analyzing the PR.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (userId) {
      socket.on(`prUpdate:${userId}`, (pr) => setPrs((prev) => [...prev, pr]));
      fetch(`${import.meta.env.VITE_API_URL}/prs/${userId}`)
        .then((res) => res.json())
        .then(setPrs);
      console.log(prs);
    }
  }, [userId]);

  console.log(import.meta.env.VITE_API_URL);
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white py-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">GreenCode Sentiment Hub</h1>
            <p className="text-sm text-gray-500">Analyze GitHub Pull Requests for sentiment and environmental impact</p>
          </div>
          <Link 
            to="/" 
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-green-600"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <PrSubmissionPanel handleSaveCredentials={handleSaveCredentials} handleSubmit={handleSubmit} userId={userId} repo={repo} prId={prId} setPrId={setPrId} setRepo={setRepo} isLoading={isLoading}  githubToken={githubToken} setGithubToken={setGithubToken}/>
            <div className="mt-6">
              <Leaderboard userId={userId} />
            </div>
          </div>
          <div className="lg:col-span-2">
            <RealTimeFeed userId={userId} />
          </div>
        </div>
      </main>
    </div>
  )
}

