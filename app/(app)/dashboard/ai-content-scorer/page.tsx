"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Star } from "lucide-react"

export default function AiContentScorerPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleScore = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/ai-content-scorer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            })
            const data = await res.json()
            setResult(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">AI Content Scorer</h1>
                <p className="text-muted-foreground">Rate your content against Google's Helpful Content System</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Analyze Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com/blog-post"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button onClick={handleScore} disabled={loading}>
                            {loading ? "Scoring..." : "Score Content"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                Overall Score
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center py-8">
                            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                                {result.overallScore}
                            </span>
                            <p className="text-muted-foreground mt-2">out of 100</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>EEAT Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Object.entries(result.metrics).map(([key, score]: [string, any]) => (
                                <div key={key}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="capitalize font-medium">{key}</span>
                                        <span>{score}/100</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-600 rounded-full" 
                                            style={{ width: `${score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
