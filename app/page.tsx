"use client"

import { Header } from "@/components/header"
import { ContentInput } from "@/components/content-input"
import { KnowledgeFeed } from "@/components/knowledge-feed"
import { ProductivityStats } from "@/components/productivity-stats"
import { Recommendations } from "@/components/recommendations"
import { useAuth } from "@/components/AuthProvider"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {user ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Welcome back, {user.displayName || "there"}!
                </h1>
                <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                  Ready to summarize more content? Transform articles, documents, and URLs into bite-sized knowledge
                  cards.
                </p>
              </section>

              <ContentInput />

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">Recommended for You</h2>
                <div className="grid gap-4">
                  <Recommendations />
                </div>
              </section>

              <KnowledgeFeed />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ProductivityStats />
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8">
            <section className="space-y-4">
              <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TL;DR - Summarize Everything
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Transform long articles, documents, and content into bite-sized summaries. Share knowledge cards and
                build your daily reading streak.
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/login">Get Started Free</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </section>

            {/* Preview of features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">Smart Summarization</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered summaries that capture the essence of any content in seconds.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">Knowledge Feed</h3>
                <p className="text-sm text-muted-foreground">
                  Discover and share bite-sized knowledge cards with the community.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Build reading streaks and track your learning journey over time.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
