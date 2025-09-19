import { Header } from "@/components/header"
import { Recommendations } from "@/components/recommendations"

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Recommendations />
      </main>
    </div>
  )
}
