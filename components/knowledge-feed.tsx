"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share2, Bookmark, MessageCircle, TrendingUp } from "lucide-react"

const mockCards = [
  {
    id: 1,
    title: "The Future of AI in Healthcare",
    summary:
      "AI is revolutionizing healthcare through predictive analytics, personalized treatment plans, and automated diagnostics. Key breakthroughs include early disease detection and drug discovery acceleration.",
    category: "AI",
    author: "Dr. Sarah Chen",
    avatar: "/doctor-avatar.png",
    likes: 42,
    shares: 12,
    comments: 8,
    isLiked: false,
    isBookmarked: true,
    timeAgo: "2h ago",
  },
  {
    id: 2,
    title: "Productivity Hacks for Remote Workers",
    summary:
      "Essential strategies for maintaining focus while working from home: time-blocking, dedicated workspace setup, regular breaks, and effective communication tools.",
    category: "Productivity",
    author: "Mike Johnson",
    avatar: "/professional-avatar.png",
    likes: 28,
    shares: 15,
    comments: 5,
    isLiked: true,
    isBookmarked: false,
    timeAgo: "4h ago",
  },
  {
    id: 3,
    title: "Climate Change Solutions That Actually Work",
    summary:
      "Proven methods to combat climate change include renewable energy adoption, carbon capture technology, sustainable agriculture, and policy reforms at local and global levels.",
    category: "Environment",
    author: "Emma Green",
    avatar: "/environmental-scientist.jpg",
    likes: 67,
    shares: 23,
    comments: 12,
    isLiked: false,
    isBookmarked: false,
    timeAgo: "6h ago",
  },
]

export function KnowledgeFeed() {
  const [cards, setCards] = useState(mockCards)
  const [filter, setFilter] = useState<"all" | "trending" | "bookmarked">("all")

  const toggleLike = (id: number) => {
    setCards(
      cards.map((card) =>
        card.id === id
          ? { ...card, isLiked: !card.isLiked, likes: card.isLiked ? card.likes - 1 : card.likes + 1 }
          : card,
      ),
    )
  }

  const toggleBookmark = (id: number) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, isBookmarked: !card.isBookmarked } : card)))
  }

  const filteredCards = cards.filter((card) => {
    if (filter === "bookmarked") return card.isBookmarked
    if (filter === "trending") return card.likes > 30
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Knowledge Feed</h2>
        <div className="flex gap-2">
          {(["all", "trending", "bookmarked"] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType === "trending" && <TrendingUp className="h-4 w-4 mr-1" />}
              {filterType}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredCards.map((card) => (
          <Card key={card.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={card.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {card.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{card.author}</p>
                    <p className="text-xs text-muted-foreground">{card.timeAgo}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {card.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-balance">{card.title}</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">{card.summary}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(card.id)}
                    className={card.isLiked ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${card.isLiked ? "fill-current" : ""}`} />
                    {card.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {card.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    {card.shares}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleBookmark(card.id)}
                  className={card.isBookmarked ? "text-primary" : ""}
                >
                  <Bookmark className={`h-4 w-4 ${card.isBookmarked ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
