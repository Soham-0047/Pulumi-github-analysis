import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, AlertTriangle, Minus, Trophy } from "lucide-react";
import io from "socket.io-client";

type SentimentType = "POS" | "NEG" | "NEU";

interface PullRequest {
  id: string;
  repository: string;
  prId: number;
  sentiment: SentimentType;
  sentimentScore: number;
  carbonImpact: number;
  points: number;
  timestamp: Date;
}

export function RealTimeFeed({ userId }: { userId: string | null }) {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:5000"); // Make sure this matches your server URL

    socket.on(`prUpdate:${userId}`, (pr: any) => {
      const mapped: PullRequest = {
        id: pr._id,
        repository: pr.repository,
        prId: Number(pr.prId),
        sentiment: pr.sentiment > 70 ? "POS" : pr.sentiment < 40 ? "NEG" : "NEU",
        sentimentScore: pr.sentiment,
        carbonImpact: pr.carbonImpact,
        points: pr.points,
        timestamp: new Date(),
      };
      console.log("New PR received:", mapped,pr);
      setPullRequests((prev) => [mapped, ...prev.slice(0, 9)]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const getSentimentIcon = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "POS": return <ThumbsUp className="h-4 w-4" />;
      case "NEG": return <AlertTriangle className="h-4 w-4" />;
      case "NEU": return <Minus className="h-4 w-4" />;
    }
  };

  const getSentimentColor = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "POS": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "NEG": return "bg-red-100 text-red-800 hover:bg-red-100";
      case "NEU": return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins === 1) return "1 minute ago";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time PR Feed</CardTitle>
        <CardDescription>Live updates of analyzed pull requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pullRequests.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed p-8 text-center">
              <p className="text-sm text-gray-500">No pull requests analyzed yet</p>
            </div>
          ) : (
            pullRequests.map((pr) => (
              <div key={pr.id} className="rounded-lg border p-4 transition-all hover:bg-gray-50">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <div className="font-medium">{pr.repository}</div>
                    <div className="text-sm text-gray-500">PR #{pr.prId}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={getSentimentColor(pr.sentiment)}>
                      {getSentimentIcon(pr.sentiment)} {pr.sentiment}
                    </Badge>
                    <div className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
                      {pr.sentimentScore.toFixed(1)}%
                    </div>
                    <div className={`rounded-full px-2 py-1 text-xs font-medium ${pr.carbonImpact < 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {pr.carbonImpact < 0 ? "-" : "+"}
                      {Math.abs(pr.carbonImpact).toFixed(3)} kg CO₂
                    </div>
                    <div className="flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      <Trophy className="mr-1 h-3 w-3" /> {pr.points} pts
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-right text-xs text-gray-500">{formatTime(pr.timestamp)}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
