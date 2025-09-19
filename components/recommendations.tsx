"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, User, Clock, ExternalLink, Bookmark, RefreshCw } from "lucide-react"

const personalizedRecommendations = [
  {
    id: 1,
    title: "Advanced Machine Learning Techniques",
    summary:
      "Explore cutting-edge ML algorithms including transformer architectures, reinforcement learning, and neural network optimization techniques for modern AI applications.",
    source: "MIT Technology Review",
    category: "AI",
    readTime: "8 min",
    relevanceScore: 95,
    reason: "Based on your interest in AI and recent summaries",
    author: "Dr. Andrew Ng",
    isBookmarked: false,
  },
  {
    id: 2,
    title: "Remote Team Management Best Practices",
    summary:
      "Comprehensive guide to leading distributed teams effectively, including communication strategies, performance tracking, and maintaining team culture in virtual environments.",
    source: "Harvard Business Review",
    category: "Productivity",
    readTime: "12 min",
    relevanceScore: 88,
    reason: "Matches your productivity reading patterns",
    author: "Sarah Johnson",
    isBookmarked: true,
  },
  {
    id: 3,
    title: "Sustainable Technology Innovations 2024",
    summary:
      "Latest breakthroughs in green technology, renewable energy systems, and sustainable manufacturing processes that are reshaping industries worldwide.",
    source: "Nature Sustainability",
    category: "Environment",
    readTime: "15 min",
    relevanceScore: 82,
    reason: "Trending in your network",
    author: "Dr. Emma Green",
    isBookmarked: false,
  },
]

const trendingContent = [
  {
    id: 4,
    title: "The Rise of Quantum Computing",
    summary:
      "Quantum computing breakthroughs are accelerating, with major tech companies achieving new milestones in quantum supremacy and practical applications.",
    source: "Wired",
    category: "Technology",
    readTime: "10 min",
    popularity: 1247,
    author: "Tech Insider",
  },
  {
    id: 5,
    title: "Future of Work: AI and Human Collaboration",
    summary:
      "How artificial intelligence is reshaping workplace dynamics, creating new job categories while augmenting human capabilities across industries.",
    source: "Forbes",
    category: "Future of Work",
    readTime: "7 min",
    popularity: 892,
    author: "Business Weekly",
  },
  {
    id: 6,
    title: "Climate Tech Investment Surge",
    summary:
      "Venture capital funding for climate technology startups reaches record highs, signaling massive shift toward sustainable innovation solutions.",
    source: "TechCrunch",
    category: "Climate",
    readTime: "6 min",
    popularity: 756,
    author: "Climate Reporter",
  },
]

export function Recommendations() {
  const [personalizedItems, setPersonalizedItems] = useState(personalizedRecommendations)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const toggleBookmark = (id: number) => {
    setPersonalizedItems((items) =>
      items.map((item) => (item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item)),
    )
  }

  const refreshRecommendations = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-8">
      {/* Personalized Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">For You</h2>
          </div>
          <Button variant="outline" size="sm" onClick={refreshRecommendations} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid gap-6">
          {personalizedItems.map((item) => (
            <Card
              key={item.id}
              className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-accent/20 text-accent-foreground">
                        {item.relevanceScore}% match
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-balance">{item.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {item.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.readTime}
                      </span>
                      <span>{item.source}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(item.id)}
                    className={item.isBookmarked ? "text-primary" : ""}
                  >
                    <Bookmark className={`h-4 w-4 ${item.isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-pretty leading-relaxed">{item.summary}</p>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-3 w-3" />
                    <span>{item.reason}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Read Original
                    </Button>
                    <Button size="sm">Summarize</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Content */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingContent.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      {item.popularity}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-balance leading-tight">{item.title}</CardTitle>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.readTime}
                    </span>
                    <span>{item.source}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-pretty leading-relaxed line-clamp-3">{item.summary}</p>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Read
                  </Button>
                  <Button size="sm" className="flex-1">
                    Summarize
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
