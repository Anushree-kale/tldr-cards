"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, BookOpen, Heart, Share2, Award } from "lucide-react"

const mockActivities = [
  {
    id: 1,
    type: "summary_created",
    title: "Created summary for 'AI in Healthcare'",
    description: "Generated a detailed summary from TechCrunch article",
    timestamp: "2024-01-15T10:30:00Z",
    points: 15,
    icon: BookOpen,
    color: "text-primary",
  },
  {
    id: 2,
    type: "streak_milestone",
    title: "7-day streak achieved!",
    description: "Congratulations on maintaining your daily reading habit",
    timestamp: "2024-01-15T09:00:00Z",
    points: 50,
    icon: Award,
    color: "text-orange-500",
  },
  {
    id: 3,
    type: "social_interaction",
    title: "Liked 5 knowledge cards",
    description: "Engaged with community content on AI and productivity topics",
    timestamp: "2024-01-14T16:45:00Z",
    points: 5,
    icon: Heart,
    color: "text-red-500",
  },
  {
    id: 4,
    type: "content_shared",
    title: "Shared summary on social media",
    description: "Climate Change Solutions summary shared on LinkedIn",
    timestamp: "2024-01-14T14:20:00Z",
    points: 10,
    icon: Share2,
    color: "text-blue-500",
  },
  {
    id: 5,
    type: "goal_completed",
    title: "Weekly goal completed",
    description: "Created 10 summaries this week - goal achieved!",
    timestamp: "2024-01-13T18:00:00Z",
    points: 100,
    icon: TrendingUp,
    color: "text-green-500",
  },
]

export function ActivityHistory() {
  const totalPointsThisWeek = mockActivities.reduce((sum, activity) => sum + activity.points, 0)

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            This Week's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalPointsThisWeek}</div>
              <p className="text-sm text-muted-foreground">Points Earned</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">12</div>
              <p className="text-sm text-muted-foreground">Summaries</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">8</div>
              <p className="text-sm text-muted-foreground">Interactions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">7</div>
              <p className="text-sm text-muted-foreground">Streak Days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivities.map((activity) => {
              const IconComponent = activity.icon
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-card/50 transition-colors"
                >
                  <div className={`p-2 rounded-full bg-background border ${activity.color}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          +{activity.points} pts
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
