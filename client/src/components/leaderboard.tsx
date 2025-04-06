import { useEffect, useState } from "react"
import io from "socket.io-client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Trophy } from "lucide-react"

// --- Setup socket once (outside component)
const socket = io("http://localhost:5000")

interface LeaderboardUser {
  id: string
  username: string
  points: number
  rank: number
}

export function Leaderboard({ userId }: { userId: string | null }) {
  const [users, setUsers] = useState<LeaderboardUser[]>([])

  // Dummy fallback data
  const dummyUsers: LeaderboardUser[] = [
    { id: "1", username: "eco_coder", points: 1250, rank: 1 },
    { id: "2", username: "green_dev", points: 980, rank: 2 },
    { id: "3", username: "carbon_ninja", points: 875, rank: 3 },
    { id: "4", username: "sustainable_js", points: 720, rank: 4 },
    { id: "5", username: "climate_hacker", points: 650, rank: 5 },
    { id: "6", username: "earth_programmer", points: 590, rank: 6 },
    { id: "7", username: "eco_engineer", points: 520, rank: 7 },
    { id: "8", username: "planet_coder", points: 480, rank: 8 },
  ]

  useEffect(() => {
    const userPointsMap = new Map<string, { id: string, points: number }>()

    socket.on(`prUpdate:${userId}`, (pr: any) => {
      const uid = pr.userId
      const prev = userPointsMap.get(uid) || { id: uid, points: 0 }
      const updatedPoints = prev.points + pr.points
      userPointsMap.set(uid, { id: uid, points: updatedPoints })

      const leaderboard = Array.from(userPointsMap.values())
        .sort((a, b) => b.points - a.points)
        .map((user, index) => ({
          id: user.id,
          username: `user_${user.id.slice(-4)}`, // Replace with real username later
          points: user.points,
          rank: index + 1
        }))

      setUsers(leaderboard)
    })

    return () => {
      socket.off(`prUpdate:${userId}`)
    }
  }, [userId])

  const getTrophyColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500"
      case 2:
        return "text-gray-400"
      case 3:
        return "text-amber-600"
      default:
        return "text-gray-300"
    }
  }

  const displayUsers = users.length > 0 ? users : dummyUsers

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>Top contributors by points</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between rounded-md p-2 ${user.rank <= 3 ? "bg-green-50" : ""}`}
            >
              <div className="flex items-center gap-2">
                {user.rank <= 3 && (
                  <Trophy className={`h-4 w-4 ${getTrophyColor(user.rank)}`} />
                )}
                <span className="font-medium">{user.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-green-600">{user.points}</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">#{user.rank}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
