import type React from "react"
import {
  Code,
  Database,
  Globe,
  Server,
  Zap,
  Cloud,
  Layers,
  Lock,
  Cpu,
  Workflow,
  Moon,
  MessageSquare,
  GitBranch,
} from "lucide-react"

interface TechItemProps {
  icon: React.ReactNode
  name: string
  description: string
  category: "frontend" | "backend" | "api" | "infra"
}

const TechItem = ({ icon, name, description, category }: TechItemProps) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "frontend":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "backend":
        return "bg-purple-50 text-purple-600 border-purple-200"
      case "api":
        return "bg-amber-50 text-amber-600 border-amber-200"
      case "infra":
        return "bg-teal-50 text-teal-600 border-teal-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  return (
    <div className="group flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all hover:shadow-md">
      <div className={`mt-1 rounded-md p-2 ${getCategoryColor(category)}`}>{icon}</div>
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export function TechnologiesSection() {
  const frontendTechs = [
    {
      icon: <Code className="h-5 w-5" />,
      name: "React 19",
      description: "UI framework for building interactive components",
      category: "frontend" as const,
    },
    {
      icon: <Code className="h-5 w-5" />,
      name: "TypeScript",
      description: "Type safety across components",
      category: "frontend" as const,
    },
    {
      icon: <Layers className="h-5 w-5" />,
      name: "Tailwind CSS",
      description: "Utility-first styling framework",
      category: "frontend" as const,
    },
    {
      icon: <Layers className="h-5 w-5" />,
      name: "shadcn/ui",
      description: "Prebuilt accessible UI components",
      category: "frontend" as const,
    },
    {
      icon: <Zap className="h-5 w-5" />,
      name: "Socket.IO (client)",
      description: "Real-time updates for leaderboard and PRs",
      category: "frontend" as const,
    },
    {
      icon: <Moon className="h-5 w-5" />,
      name: "Dark/Light Theme",
      description: "Context API-based theming system",
      category: "frontend" as const,
    },
  ]

  const backendTechs = [
    {
      icon: <Server className="h-5 w-5" />,
      name: "Node.js",
      description: "Server runtime environment",
      category: "backend" as const,
    },
    {
      icon: <Server className="h-5 w-5" />,
      name: "Express.js",
      description: "REST API framework",
      category: "backend" as const,
    },
    {
      icon: <Database className="h-5 w-5" />,
      name: "MongoDB Atlas",
      description: "Cloud-hosted NoSQL database",
      category: "backend" as const,
    },
    {
      icon: <Database className="h-5 w-5" />,
      name: "Mongoose",
      description: "MongoDB ODM for User and PR schemas",
      category: "backend" as const,
    },
    {
      icon: <Zap className="h-5 w-5" />,
      name: "Socket.IO (server)",
      description: "Real-time communication with frontend",
      category: "backend" as const,
    },
  ]

  const apiTechs = [
    {
      icon: <GitBranch className="h-5 w-5" />,
      name: "GitHub API",
      description: "Fetch pull request metadata and files",
      category: "api" as const,
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      name: "Hugging Face API",
      description: "Sentiment analysis via bertweet-base",
      category: "api" as const,
    },
    {
      icon: <Lock className="h-5 w-5" />,
      name: "Pulumi ESC",
      description: "Environment Secrets Console management",
      category: "api" as const,
    },
    {
      icon: <Workflow className="h-5 w-5" />,
      name: "Pulumi GitHub Automation",
      description: "Commenting/labeling PRs automatically",
      category: "api" as const,
    },
  ]

  const infraTechs = [
    {
      icon: <Cloud className="h-5 w-5" />,
      name: "Pulumi",
      description: "Infrastructure-as-code deployment",
      category: "infra" as const,
    },
    {
      icon: <Zap className="h-5 w-5" />,
      name: "Vite",
      description: "Lightning-fast frontend bundler",
      category: "infra" as const,
    },
    {
      icon: <Layers className="h-5 w-5" />,
      name: "Monorepo Setup",
      description: "Single repo for frontend and backend",
      category: "infra" as const,
    },
    {
      icon: <Globe className="h-5 w-5" />,
      name: "Deployment",
      description: "Render / Railway / Vercel targets",
      category: "infra" as const,
    },
  ]

  return (
    <section id="technologies" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">Technologies</h2>

        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-full lg:col-span-1">
            <div className="sticky top-20">
              <div className="mb-6 flex items-center gap-2 text-blue-600">
                <Code className="h-6 w-6" />
                <h3 className="text-xl font-bold">Frontend</h3>
              </div>
              <p className="text-gray-600">
                Modern React application with TypeScript and Tailwind CSS for a responsive, type-safe UI with real-time
                updates.
              </p>
            </div>
          </div>
          <div className="col-span-full grid gap-4 md:grid-cols-2 lg:col-span-3">
            {frontendTechs.map((tech, index) => (
              <TechItem key={`frontend-${index}`} {...tech} />
            ))}
          </div>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-full lg:col-span-1">
            <div className="sticky top-20">
              <div className="mb-6 flex items-center gap-2 text-purple-600">
                <Cpu className="h-6 w-6" />
                <h3 className="text-xl font-bold">Backend</h3>
              </div>
              <p className="text-gray-600">
                Node.js and Express power our API with MongoDB for data storage and Socket.IO for real-time
                communication.
              </p>
            </div>
          </div>
          <div className="col-span-full grid gap-4 md:grid-cols-2 lg:col-span-3">
            {backendTechs.map((tech, index) => (
              <TechItem key={`backend-${index}`} {...tech} />
            ))}
          </div>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-full lg:col-span-1">
            <div className="sticky top-20">
              <div className="mb-6 flex items-center gap-2 text-amber-600">
                <Globe className="h-6 w-6" />
                <h3 className="text-xl font-bold">External APIs</h3>
              </div>
              <p className="text-gray-600">
                Integrations with GitHub and Hugging Face APIs for pull request analysis and sentiment scoring.
              </p>
            </div>
          </div>
          <div className="col-span-full grid gap-4 md:grid-cols-2 lg:col-span-3">
            {apiTechs.map((tech, index) => (
              <TechItem key={`api-${index}`} {...tech} />
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-full lg:col-span-1">
            <div className="sticky top-20">
              <div className="mb-6 flex items-center gap-2 text-teal-600">
                <Cloud className="h-6 w-6" />
                <h3 className="text-xl font-bold">Infrastructure</h3>
              </div>
              <p className="text-gray-600">
                Modern DevOps practices with Pulumi for infrastructure-as-code and flexible deployment options.
              </p>
            </div>
          </div>
          <div className="col-span-full grid gap-4 md:grid-cols-2 lg:col-span-3">
            {infraTechs.map((tech, index) => (
              <TechItem key={`infra-${index}`} {...tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

