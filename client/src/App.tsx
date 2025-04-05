import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], // prevent fallback polling weirdness
});

function App() {
  const [prs, setPrs] = useState([]);
  const [repo, setRepo] = useState("");
  const [prId, setPrId] = useState("");

  useEffect(() => {
    socket.on("prUpdate", (pr) => setPrs((prev) => [...prev, pr]));
    fetch("http://localhost:5000/prs")
      .then((res) => res.json())
      .then(setPrs);
  }, []);

  const analyzePR = async () => {
    await fetch("http://localhost:5000/analyze-pr", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo, prId }),
    });
    setRepo("");
    setPrId("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>GreenCode Sentiment Hub</h1>
      <input
        placeholder="Repo (e.g., user/repo)"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
      />
      <input
        placeholder="PR ID"
        value={prId}
        onChange={(e) => setPrId(e.target.value)}
      />
      <button onClick={analyzePR}>Analyze PR</button>
      <ul>
        {prs.map((pr) => (
          <li key={pr._id}>
            {pr.repo} #{pr.prId}: Sentiment: {pr.sentiment.toFixed(2)}%, Carbon: {pr.carbonImpact.toFixed(3)}kg, Points: {pr.points}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;