"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Bookmark, ExternalLink, Trash2, BookOpen } from "lucide-react"

const mockSummaries = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence",
    summary:
      "AI is rapidly evolving with breakthroughs in machine learning, natural language processing, and computer vision. Key developments include GPT models, autonomous systems, and ethical AI frameworks.",
    category: "Technology",
    source: "TechCrunch",
    createdAt: "2024-01-15",
    tags: ["AI", "Machine Learning", "Future Tech"],
    length: "medium",
  },
  {
    id: 2,
    title: "Climate Change Solutions for 2024",
    summary:
      "Innovative approaches to combat climate change include renewable energy expansion, carbon capture technologies, sustainable agriculture practices, and policy reforms at global scale.",
    category: "Environment",
    source: "Nature Magazine",
    createdAt: "2024-01-12",
    tags: ["Climate", "Environment", "Sustainability"],
    length: "detailed",
  },
  {
    id: 3,
    title: "Remote Work Productivity Tips",
    summary:
      "Essential strategies for remote work success: structured daily routines, dedicated workspace setup, effective communication tools, and work-life balance maintenance.",
    category: "Productivity",
    source: "Harvard Business Review",
    createdAt: "2024-01-10",
    tags: ["Remote Work", "Productivity", "Work-Life Balance"],
    length: "short",
  },
]

export function SavedSummaries() {
  const [summaries, setSummaries] = useState(mockSummaries)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  const filteredSummaries = summaries
    .filter((summary) => {
      const matchesSearch =
        summary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        summary.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = categoryFilter === "all" || summary.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sortBy === "title") return a.title.localeCompare(b.title)
      return 0
    })

  const deleteSummary = (id: number) => {
    setSummaries(summaries.filter((summary) => summary.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search summaries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Environment">Environment</SelectItem>
            <SelectItem value="Productivity">Productivity</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredSummaries.map((summary) => (
          <Card key={summary.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg text-balance">{summary.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{summary.source}</span>
                    <span>•</span>
                    <span>{new Date(summary.createdAt).toLocaleDateString()}</span>
                    <Badge variant="outline" className="text-xs">
                      {summary.length}
                    </Badge>
                  </div>
                </div>
                <Badge variant="secondary">{summary.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-pretty leading-relaxed">{summary.summary}</p>

              <div className="flex flex-wrap gap-1">
                {summary.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Original
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4 mr-1" />
                    Re-summarize
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSummary(summary.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSummaries.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No summaries found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
