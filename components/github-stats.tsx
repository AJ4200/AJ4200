"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Star, GitFork, Calendar, Code, Users, TrendingUp } from "lucide-react"
import { usePathname } from "next/navigation"

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  totalCommits: number
  followers: number
  following: number
  publicGists: number
  createdAt: string
}

interface Repository {
  name: string
  description: string
  stars: number
  forks: number
  language: string
  updatedAt: string
  url: string
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()

  const getThemeColors = () => {
    switch (pathname) {
      case "/":
        return {
          primary: "from-purple-500 to-pink-500",
          secondary: "from-purple-900/80 to-pink-900/80",
          accent: "border-purple-500/30",
          bg: "bg-purple-900/10",
        }
      case "/about":
        return {
          primary: "from-orange-500 to-red-500",
          secondary: "from-orange-900/80 to-red-900/80",
          accent: "border-orange-500/30",
          bg: "bg-orange-900/10",
        }
      case "/experience":
        return {
          primary: "from-blue-500 to-cyan-500",
          secondary: "from-blue-900/80 to-cyan-900/80",
          accent: "border-blue-500/30",
          bg: "bg-blue-900/10",
        }
      case "/skills":
        return {
          primary: "from-green-500 to-emerald-500",
          secondary: "from-green-900/80 to-emerald-900/80",
          accent: "border-green-500/30",
          bg: "bg-green-900/10",
        }
      case "/projects":
        return {
          primary: "from-yellow-500 to-amber-500",
          secondary: "from-yellow-900/80 to-amber-900/80",
          accent: "border-yellow-500/30",
          bg: "bg-yellow-900/10",
        }
      case "/contact":
        return {
          primary: "from-indigo-500 to-purple-500",
          secondary: "from-indigo-900/80 to-purple-900/80",
          accent: "border-indigo-500/30",
          bg: "bg-indigo-900/10",
        }
      default:
        return {
          primary: "from-gray-500 to-gray-700",
          secondary: "from-gray-900/80 to-gray-700/80",
          accent: "border-gray-500/30",
          bg: "bg-gray-900/10",
        }
    }
  }

  const themeColors = getThemeColors()

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true)

        // Mock data for demonstration - replace with actual GitHub API calls
        const mockStats: GitHubStats = {
          totalRepos: 42,
          totalStars: 156,
          totalForks: 23,
          totalCommits: 1247,
          followers: 89,
          following: 67,
          publicGists: 12,
          createdAt: "2019-03-15T10:30:00Z",
        }

        const mockRepos: Repository[] = [
          {
            name: "CommonFunLib.io",
            description: "Java Library that provides basic common functions like generators, hashers and convertors",
            stars: 45,
            forks: 12,
            language: "Java",
            updatedAt: "2024-01-15T10:30:00Z",
            url: "https://github.com/AJ4200/CommonFunLib.io",
          },
          {
            name: "CodeShifter",
            description: "AI based code programming language converter powered by GPT-4 API",
            stars: 38,
            forks: 8,
            language: "TypeScript",
            updatedAt: "2024-01-10T14:20:00Z",
            url: "https://github.com/AJ4200/CodeShifter",
          },
          {
            name: "Portyfolio",
            description: "Personal website and portfolio builder that visualizes resumes in an aesthetic setting",
            stars: 29,
            forks: 5,
            language: "JavaScript",
            updatedAt: "2024-01-08T09:15:00Z",
            url: "https://github.com/AJ4200/Portyfolio",
          },
          {
            name: "Tic-Tac-Two",
            description: "A modern twist on the classic Tic-Tac-Toe game with online multiplayer",
            stars: 22,
            forks: 4,
            language: "React",
            updatedAt: "2024-01-05T16:45:00Z",
            url: "https://github.com/AJ4200/Tic-Tac-Two",
          },
        ]

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setStats(mockStats)
        setRepos(mockRepos)
      } catch (err) {
        setError("Failed to fetch GitHub data")
        console.error("GitHub API Error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Java: "#b07219",
      Python: "#3572A5",
      React: "#61dafb",
      PHP: "#4F5D95",
      CSS: "#563d7c",
      HTML: "#e34c26",
    }
    return colors[language] || "#8b949e"
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              className={`w-16 h-16 border-4 border-t-transparent rounded-full mx-auto mb-4`}
              style={{ borderColor: themeColors.primary.includes("purple") ? "#8b5cf6" : "#3b82f6" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <p className="text-white responsive-text-lg">Loading GitHub statistics...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Github size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 responsive-text-lg">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16" aria-labelledby="github-stats-heading">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            id="github-stats-heading"
            className="responsive-text-4xl md:responsive-text-5xl font-bold text-white mb-4"
          >
            GitHub Activity
          </h2>
          <p className="responsive-text-xl text-gray-300 max-w-2xl mx-auto">
            A glimpse into my coding journey and open-source contributions
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: "Repositories", value: stats?.totalRepos || 0, icon: Github },
            { label: "Total Stars", value: stats?.totalStars || 0, icon: Star },
            { label: "Followers", value: stats?.followers || 0, icon: Users },
            { label: "Commits", value: stats?.totalCommits || 0, icon: Code },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${themeColors.primary} mb-4`}>
                <stat.icon size={24} className="text-white" aria-hidden="true" />
              </div>
              <div className="responsive-text-2xl font-bold text-white mb-2">{stat.value.toLocaleString()}</div>
              <div className="responsive-text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
          >
            <h3 className="responsive-text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp size={24} className="text-green-400" aria-hidden="true" />
              Profile Overview
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 responsive-text-base">Public Repositories</span>
                <span className="text-white font-semibold responsive-text-base">{stats?.totalRepos}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 responsive-text-base">Total Forks</span>
                <span className="text-white font-semibold responsive-text-base">{stats?.totalForks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 responsive-text-base">Following</span>
                <span className="text-white font-semibold responsive-text-base">{stats?.following}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 responsive-text-base">Public Gists</span>
                <span className="text-white font-semibold responsive-text-base">{stats?.publicGists}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 responsive-text-base">Member Since</span>
                <span className="text-white font-semibold responsive-text-base">
                  {stats?.createdAt && formatDate(stats.createdAt)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Contribution Graph Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
          >
            <h3 className="responsive-text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Calendar size={24} className="text-blue-400" aria-hidden="true" />
              Contribution Activity
            </h3>
            <div className="space-y-4">
              {/* Mock contribution visualization */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 91 }, (_, i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${
                      Math.random() > 0.7
                        ? `bg-gradient-to-r ${themeColors.primary}`
                        : Math.random() > 0.4
                          ? "bg-white/20"
                          : "bg-white/5"
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.01 }}
                    title={`${Math.floor(Math.random() * 10)} contributions`}
                  />
                ))}
              </div>
              <p className="text-gray-400 responsive-text-sm">Last 13 weeks of contribution activity</p>
            </div>
          </motion.div>
        </div>

        {/* Top Repositories */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h3 className="responsive-text-2xl font-bold text-white mb-8 text-center">Featured Repositories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo, index) => (
              <motion.a
                key={index}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="block bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                data-cursor="pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="responsive-text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {repo.name}
                  </h4>
                  <Github size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>

                <p className="text-gray-300 responsive-text-sm mb-4 line-clamp-2">{repo.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                        aria-hidden="true"
                      />
                      <span className="text-gray-400 responsive-text-xs">{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400" aria-hidden="true" />
                      <span className="text-gray-400 responsive-text-xs">{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork size={14} className="text-gray-400" aria-hidden="true" />
                      <span className="text-gray-400 responsive-text-xs">{repo.forks}</span>
                    </div>
                  </div>
                  <span className="text-gray-500 responsive-text-xs">Updated {formatDate(repo.updatedAt)}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/AJ4200"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${themeColors.primary} hover:opacity-80 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105`}
            data-cursor="pointer"
          >
            <Github size={20} />
            <span>View Full GitHub Profile</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
