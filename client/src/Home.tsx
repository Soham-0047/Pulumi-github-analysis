import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, Code, Github, Globe, LineChart, MessageSquare, Moon, Sun } from "lucide-react"
import { Link } from "react-router-dom"
import { useTheme } from "./components/theme-provider"
import { TechnologiesSection } from "./components/technologies-section";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">GreenCode Sentiment Hub</span>
          </div>
          <nav className="flex items-center gap-6">
            {/* <Link to="#features" className="text-sm font-medium text-gray-600 hover:text-green-600">
              Features
            </Link>
            <Link to="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-green-600">
              How It Works
            </Link>
            <Link to="#testimonials" className="text-sm font-medium text-gray-600 hover:text-green-600">
              Impact
            </Link> */}
            <button onClick={toggleTheme} className="p-2 rounded">
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
            <Link
              to="/dashboard"
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Dashboard
            </Link>
          </nav>

        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-green-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Make Your Code <span className="text-green-600">Greener</span> and{" "}
              <span className="text-green-600">Kinder</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              Analyze GitHub Pull Requests for sentiment and environmental impact. Build a more sustainable and positive
              coding community.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/dashboard">
                <Button className="bg-green-600 px-8 py-6 text-lg hover:bg-green-700">
                  Try Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="px-8 py-6 text-lg">
                  <Github className="mr-2 h-5 w-5" /> View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">Key Features</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex rounded-full bg-green-100 p-3 text-green-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Sentiment Analysis</h3>
                <p className="text-gray-600">
                  Analyze the tone and sentiment of PR comments and discussions to foster a positive community.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex rounded-full bg-green-100 p-3 text-green-600">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Carbon Impact</h3>
                <p className="text-gray-600">
                  Measure the environmental footprint of your code changes and track improvements over time.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex rounded-full bg-green-100 p-3 text-green-600">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Developer Leaderboard</h3>
                <p className="text-gray-600">
                  Gamify sustainable coding practices with points and rankings for eco-friendly contributions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <TechnologiesSection/>
        
        {/* How It Works */}
        <section id="how-it-works" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
            <div className="mx-auto max-w-3xl">
              <div className="relative">
                <div className="absolute left-8 top-0 h-full w-0.5 bg-green-200"></div>
                <div className="space-y-12">
                  <div className="relative">
                    <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
                      1
                    </div>
                    <div className="ml-24">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">Submit Your PR</h3>
                      <p className="text-gray-600">
                        Enter your GitHub repository and pull request ID in the dashboard to begin analysis.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
                      2
                    </div>
                    <div className="ml-24">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">Automated Analysis</h3>
                      <p className="text-gray-600">
                        Our system analyzes code efficiency, comment sentiment, and calculates environmental impact.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
                      3
                    </div>
                    <div className="ml-24">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">Get Insights</h3>
                      <p className="text-gray-600">
                        Receive detailed feedback on sentiment scores, carbon impact, and earn points for improvements.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
                      4
                    </div>
                    <div className="ml-24">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">Track Progress</h3>
                      <p className="text-gray-600">
                        Monitor your improvements over time and compete on the leaderboard with other developers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">Our Impact</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
                <div className="text-4xl font-bold text-green-600">5,280+</div>
                <div className="mt-2 text-gray-600">Pull Requests Analyzed</div>
              </div>
              <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
                <div className="text-4xl font-bold text-green-600">12.4 tons</div>
                <div className="mt-2 text-gray-600">CO₂ Emissions Saved</div>
              </div>
              <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
                <div className="text-4xl font-bold text-green-600">84%</div>
                <div className="mt-2 text-gray-600">Positive Sentiment Rate</div>
              </div>
              <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
                <div className="text-4xl font-bold text-green-600">750+</div>
                <div className="mt-2 text-gray-600">Active Developers</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Ready to make your code greener?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-green-100">
              Join our community of environmentally conscious developers today.
            </p>
            <Link to="/dashboard">
              <Button className="bg-white px-8 py-6 text-lg font-semibold text-green-600 hover:bg-green-50">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">GreenCode Sentiment Hub</span>
            </div>
            <div className="flex gap-8">
              <Link to="#" className="text-sm text-gray-600 hover:text-green-600">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-green-600">
                Terms of Service
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-green-600">
                Contact Us
              </Link>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-green-100 hover:text-green-600"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-green-100 hover:text-green-600"
              >
                <Code className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-green-100 hover:text-green-600"
              >
                <LineChart className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} GreenCode Sentiment Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

