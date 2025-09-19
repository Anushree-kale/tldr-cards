"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, Edit3, Share2 } from "lucide-react"

export function ProfileHeader() {
  const userStats = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "March 2024",
    totalSummaries: 156,
    totalCredits: 2450,
    currentStreak: 7,
    level: "Knowledge Explorer",
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{userStats.name}</h1>
                <Badge variant="secondary" className="text-xs">
                  {userStats.level}
                </Badge>
              </div>
              <p className="text-muted-foreground">{userStats.email}</p>
              <p className="text-sm text-muted-foreground">Member since {userStats.joinDate}</p>
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
            <Button variant="outline" size="sm">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{userStats.totalSummaries}</div>
            <p className="text-sm text-muted-foreground">Summaries</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{userStats.totalCredits}</div>
            <p className="text-sm text-muted-foreground">Credits</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{userStats.currentStreak}</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">12</div>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
