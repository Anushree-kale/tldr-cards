import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { content, length = "medium", type = "text" } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 })
    }

    // Simple summarization logic (you can replace with AI service)
    const sentences = content.split(/[.!?]+/).filter((s: string) => s.trim().length > 0)

    let summaryLength
    switch (length) {
      case "short":
        summaryLength = Math.max(1, Math.floor(sentences.length * 0.2))
        break
      case "long":
        summaryLength = Math.max(3, Math.floor(sentences.length * 0.6))
        break
      default: // medium
        summaryLength = Math.max(2, Math.floor(sentences.length * 0.4))
    }

    // Take first few sentences as summary (basic implementation)
    const summary = sentences.slice(0, summaryLength).join(". ") + "."

    // Calculate reading time (average 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    return NextResponse.json({
      success: true,
      summary,
      originalLength: content.length,
      summaryLength: summary.length,
      compressionRatio: Math.round((1 - summary.length / content.length) * 100),
      readingTime,
      wordCount,
    })
  } catch (error) {
    console.error("Summarization error:", error)
    return NextResponse.json({ error: "Summarization failed" }, { status: 500 })
  }
}
