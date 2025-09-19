"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Settings, Bell, Eye, Target } from "lucide-react"

export function UserPreferences() {
  const [preferences, setPreferences] = useState({
    notifications: {
      dailyReminders: true,
      weeklyDigest: true,
      socialInteractions: false,
      achievementAlerts: true,
    },
    privacy: {
      profileVisibility: "public",
      showActivity: true,
      showStats: true,
    },
    content: {
      defaultSummaryLength: "medium",
      preferredCategories: ["AI", "Productivity", "Tech"],
      autoSave: true,
    },
    goals: {
      dailySummaries: 2,
      weeklyGoal: 10,
    },
  })

  const [newCategory, setNewCategory] = useState("")

  const updateNotification = (key: keyof typeof preferences.notifications) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }))
  }

  const updatePrivacy = (key: keyof typeof preferences.privacy, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }))
  }

  const updateContent = (key: keyof typeof preferences.content, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value,
      },
    }))
  }

  const updateGoals = (key: keyof typeof preferences.goals, value: number) => {
    setPreferences((prev) => ({
      ...prev,
      goals: {
        ...prev.goals,
        [key]: value,
      },
    }))
  }

  const addCategory = () => {
    if (newCategory && !preferences.content.preferredCategories.includes(newCategory)) {
      updateContent("preferredCategories", [...preferences.content.preferredCategories, newCategory])
      setNewCategory("")
    }
  }

  const removeCategory = (category: string) => {
    updateContent(
      "preferredCategories",
      preferences.content.preferredCategories.filter((c) => c !== category),
    )
  }

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Daily Reading Reminders</Label>
              <p className="text-sm text-muted-foreground">Get reminded to read and summarize content daily</p>
            </div>
            <Switch
              checked={preferences.notifications.dailyReminders}
              onCheckedChange={() => updateNotification("dailyReminders")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Weekly Digest</Label>
              <p className="text-sm text-muted-foreground">Receive a summary of your weekly activity</p>
            </div>
            <Switch
              checked={preferences.notifications.weeklyDigest}
              onCheckedChange={() => updateNotification("weeklyDigest")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Social Interactions</Label>
              <p className="text-sm text-muted-foreground">Notifications for likes, comments, and shares</p>
            </div>
            <Switch
              checked={preferences.notifications.socialInteractions}
              onCheckedChange={() => updateNotification("socialInteractions")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Achievement Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified when you reach milestones</p>
            </div>
            <Switch
              checked={preferences.notifications.achievementAlerts}
              onCheckedChange={() => updateNotification("achievementAlerts")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Profile Visibility</Label>
            <Select
              value={preferences.privacy.profileVisibility}
              onValueChange={(value) => updatePrivacy("profileVisibility", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can view</SelectItem>
                <SelectItem value="followers">Followers Only</SelectItem>
                <SelectItem value="private">Private - Only me</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Show Activity History</Label>
              <p className="text-sm text-muted-foreground">Display your reading and summary activity</p>
            </div>
            <Switch
              checked={preferences.privacy.showActivity}
              onCheckedChange={(checked) => updatePrivacy("showActivity", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Show Statistics</Label>
              <p className="text-sm text-muted-foreground">Display your reading stats and achievements</p>
            </div>
            <Switch
              checked={preferences.privacy.showStats}
              onCheckedChange={(checked) => updatePrivacy("showStats", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Content Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Content Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Default Summary Length</Label>
            <Select
              value={preferences.content.defaultSummaryLength}
              onValueChange={(value) => updateContent("defaultSummaryLength", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short - Quick overview</SelectItem>
                <SelectItem value="medium">Medium - Balanced detail</SelectItem>
                <SelectItem value="detailed">Detailed - Comprehensive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="space-y-3">
            <Label>Preferred Categories</Label>
            <div className="flex flex-wrap gap-2">
              {preferences.content.preferredCategories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeCategory(category)}
                >
                  {category} ×
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCategory()}
              />
              <Button onClick={addCategory} variant="outline">
                Add
              </Button>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-save Summaries</Label>
              <p className="text-sm text-muted-foreground">Automatically save all generated summaries</p>
            </div>
            <Switch
              checked={preferences.content.autoSave}
              onCheckedChange={(checked) => updateContent("autoSave", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Reading Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Daily Summary Goal</Label>
            <Select
              value={preferences.goals.dailySummaries.toString()}
              onValueChange={(value) => updateGoals("dailySummaries", Number.parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 summary per day</SelectItem>
                <SelectItem value="2">2 summaries per day</SelectItem>
                <SelectItem value="3">3 summaries per day</SelectItem>
                <SelectItem value="5">5 summaries per day</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Weekly Summary Goal</Label>
            <Select
              value={preferences.goals.weeklyGoal.toString()}
              onValueChange={(value) => updateGoals("weeklyGoal", Number.parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 summaries per week</SelectItem>
                <SelectItem value="10">10 summaries per week</SelectItem>
                <SelectItem value="15">15 summaries per week</SelectItem>
                <SelectItem value="20">20 summaries per week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  )
}
