"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Flame, Target, BookOpen, Trophy, Calendar } from "lucide-react"

export function ProductivityStats() {
  const stats = {
    dailyStreak: 7,
    creditsEarned: 245,
    summariesCreated: 23,
    articlesRead: 156,
    weeklyGoal: 10,
    weeklyProgress: 7,
  }

  return (
    <div className="space-y-6">
      {/* Daily Streak */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flame className="h-5 w-5 text-orange-500" />
            Daily Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">{stats.dailyStreak}</div>
            <p className="text-sm text-muted-foreground">days in a row</p>
            <Badge variant="secondary" className="text-xs">
              Keep it up! 🔥
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            Weekly Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Summaries Created</span>
            <span className="font-medium">
              {stats.weeklyProgress}/{stats.weeklyGoal}
            </span>
          </div>
          <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {stats.weeklyGoal - stats.weeklyProgress} more to reach your goal
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-primary" />
            Your Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-card rounded-lg border">
              <div className="text-2xl font-bold text-primary">{stats.creditsEarned}</div>
              <p className="text-xs text-muted-foreground">Credits Earned</p>
            </div>
            <div className="text-center p-3 bg-card rounded-lg border">
              <div className="text-2xl font-bold text-accent">{stats.summariesCreated}</div>
              <p className="text-xs text-muted-foreground">Summaries</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Articles Read</span>
            </div>
            <span className="font-medium">{stats.articlesRead}</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Summarized "AI in Healthcare"</span>
              <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Liked 3 knowledge cards</span>
              <span className="text-xs text-muted-foreground ml-auto">4h ago</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-muted rounded-full"></div>
              <span>Earned 15 credits</span>
              <span className="text-xs text-muted-foreground ml-auto">6h ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
