import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Check, ChevronRight, KeyRound } from "lucide-react";

type PrSubmissionPanelProps = {
  githubToken: string;
  setGithubToken: (val: string) => void;
  repo: string;
  setRepo: (val: string) => void;
  userId: string | null;
  handleSubmit: (e: React.FormEvent) => void;
  prId: string;
  setPrId: (val: string) => void;
  handleSaveCredentials: (e: React.FormEvent) => void;
  isLoading: boolean;
};

export function PrSubmissionPanel(props: PrSubmissionPanelProps) {
  const {
    githubToken,
    setGithubToken,
    repo,
    setRepo,
    userId,
    handleSubmit,
    prId,
    setPrId,
    handleSaveCredentials,
    isLoading,
  } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyze Pull Request</CardTitle>
        <CardDescription>
          {userId
            ? "Enter PR ID to analyze sentiment and carbon impact"
            : "Connect to GitHub to analyze your pull requests"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!userId ? (
          <form onSubmit={handleSaveCredentials}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="access-token" className="flex items-center gap-1">
                  <KeyRound className="h-4 w-4" /> GitHub Access Token
                </Label>
                <Input
                  id="access-token"
                  type="password"
                  placeholder="github_pat_xxxxxxxxxxxx"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">Requires repo scope permissions</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="repository">Repository</Label>
                <Input
                  id="repository"
                  placeholder="user/repo"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-md bg-green-50 p-2 text-sm text-green-700">
                <Check className="h-4 w-4" />
                <span>Connected to {repo}</span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pr-id">Pull Request ID</Label>
                <Input
                  id="pr-id"
                  type="number"
                  placeholder="PR ID"
                  value={prId}
                  onChange={(e) => setPrId(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter>
        {!userId ? (
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleSaveCredentials}
            disabled={isLoading || !repo || !githubToken}
          >
            {isLoading ? "Saving..." : "Save Credentials"} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleSubmit}
            disabled={isLoading || !prId}
          >
            {isLoading ? "Analyzing..." : "Analyze PR"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

