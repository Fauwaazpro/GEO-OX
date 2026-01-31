"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ArrowRight } from "lucide-react"

export default function AnswerFirstPage() {
    const [topic, setTopic] = useState("")
    const [keyword, setKeyword] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [optimized, setOptimized] = useState("")

    const handleOptimize = async () => {
        if (!content) return
        setLoading(true)
        try {
            const res = await fetch('/api/answer-first', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, targetKeyword: keyword, content })
            })
            const data = await res.json()
            setOptimized(data.optimizedContent)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Answer-First Structure</h1>
                <p className="text-muted-foreground">Optimize content for Featured Snippets and SGE</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Content Input</CardTitle>
                        <CardDescription>Paste your draft or existing content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            placeholder="Topic (e.g. How to bake sourdough)"
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                        />
                        <Input
                            placeholder="Target Keyword"
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                        />
                        <Textarea
                            placeholder="Paste content here..."
                            className="h-64"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                        <Button onClick={handleOptimize} disabled={loading || !content} className="w-full">
                            {loading ? "Optimizing..." : "Rewrite for Answer Engine"}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-slate-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-700">
                            <MessageSquare className="w-5 h-5" />
                            Optimized Output
                        </CardTitle>
                        <CardDescription>Structured for direct answers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {optimized ? (
                            <div className="prose prose-sm max-w-none bg-white p-6 rounded-lg shadow-sm">
                                <pre className="whitespace-pre-wrap font-sans">{optimized}</pre>
                            </div>
                        ) : (
                            <div className="h-64 flex items-center justify-center text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                                Output will appear here
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
