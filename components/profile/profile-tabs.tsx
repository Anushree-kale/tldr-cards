"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SavedSummaries } from "./saved-summaries"
import { ActivityHistory } from "./activity-history"
import { UserPreferences } from "./user-preferences"
import { BookOpen, Activity, Settings } from "lucide-react"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="summaries" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="summaries" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Saved Summaries
        </TabsTrigger>
        <TabsTrigger value="activity" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Activity
        </TabsTrigger>
        <TabsTrigger value="preferences" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Preferences
        </TabsTrigger>
      </TabsList>

      <TabsContent value="summaries" className="mt-6">
        <SavedSummaries />
      </TabsContent>

      <TabsContent value="activity" className="mt-6">
        <ActivityHistory />
      </TabsContent>

      <TabsContent value="preferences" className="mt-6">
        <UserPreferences />
      </TabsContent>
    </Tabs>
  )
}
