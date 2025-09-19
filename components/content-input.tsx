"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Link, Upload, Sparkles, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SummaryResult {
  summary: string
  originalLength: number
  summaryLength: number
  compressionRatio: number
  readingTime: number
  wordCount: number
}

export function ContentInput() {
  const [content, setContent] = useState("")
  const [url, setUrl] = useState("")
  const [summaryLength, setSummaryLength] = useState<"short" | "medium" | "long">("medium")
  const [isLoading, setIsLoading] = useState(false)
  const [summaryResult, setSummaryResult] = useState<SummaryResult | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.includes("text") && !file.type.includes("pdf") && !file.type.includes("document")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a text, PDF, or document file.",
        variant: "destructive",
      })
      return
    }

    setUploadedFile(file)

    // For text files, read content directly
    if (file.type.includes("text")) {
      const text = await file.text()
      setContent(text)
    }

    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`,
    })
  }

  const handleUrlExtraction = async () => {
    if (!url) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/url-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (data.success) {
        setContent(data.content)
        toast({
          title: "Content extracted",
          description: `Successfully extracted content from ${data.title}`,
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Extraction failed",
        description: "Could not extract content from the URL. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSummarize = async () => {
    if (!content && !url) return

    setIsLoading(true)
    try {
      let textToSummarize = content

      // If URL is provided and no content, extract URL content first
      if (url && !content) {
        const urlResponse = await fetch("/api/url-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        })
        const urlData = await urlResponse.json()
        if (urlData.success) {
          textToSummarize = urlData.content
          setContent(urlData.content)
        }
      }

      // Generate summary
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: textToSummarize,
          length: summaryLength,
          type: "text",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSummaryResult(data)
        toast({
          title: "Summary generated",
          description: `Compressed by ${data.compressionRatio}% - ${data.readingTime} min read`,
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Summarization failed",
        description: "Could not generate summary. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Create Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                URL
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                File
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4">
              <Textarea
                placeholder="Paste your text here to get a summary..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-32 resize-none"
              />
            </TabsContent>

            <TabsContent value="url" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleUrlExtraction} disabled={!url || isLoading} variant="outline">
                  Extract
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="file" className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {uploadedFile ? uploadedFile.name : "Drop your PDF or DOCX file here, or click to browse"}
                  </p>
                </label>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-3">
            <label className="text-sm font-medium">Summary Length</label>
            <div className="flex gap-2">
              {(["short", "medium", "long"] as const).map((length) => (
                <Badge
                  key={length}
                  variant={summaryLength === length ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() => setSummaryLength(length)}
                >
                  {length}
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={handleSummarize} className="w-full" disabled={isLoading || (!content && !url)}>
            {isLoading ? "Summarizing..." : "Generate TL;DR"}
          </Button>
        </CardContent>
      </Card>

      {summaryResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Summary Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm leading-relaxed">{summaryResult.summary}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-primary">{summaryResult.compressionRatio}%</div>
                <div className="text-muted-foreground">Compressed</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-primary">{summaryResult.readingTime} min</div>
                <div className="text-muted-foreground">Read Time</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-primary">{summaryResult.wordCount}</div>
                <div className="text-muted-foreground">Words</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-primary">{summaryResult.summaryLength}</div>
                <div className="text-muted-foreground">Summary Chars</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Save Summary
              </Button>
              <Button variant="outline" size="sm">
                Share
              </Button>
              <Button variant="outline" size="sm">
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
