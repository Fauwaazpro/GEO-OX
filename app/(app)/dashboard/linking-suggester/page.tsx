"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Link as LinkIcon, ArrowRight } from "lucide-react"

export default function LinkingSuggesterPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleSuggest = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/linking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sourceUrl: url })
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
                <h1 className="text-3xl font-bold mb-2">Linking Suggester</h1>
                <p className="text-muted-foreground">AI-powered internal linking recommendations</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Analyze Page</CardTitle>
                    <CardDescription>Enter a URL to find internal linking opportunities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com/blog/new-post"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button onClick={handleSuggest} disabled={loading}>
                            {loading ? "Analyzing..." : "Find Links"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <div className="space-y-6">
                    <h3 className="text-xl font-bold">Suggested Internal Links</h3>
                    <div className="grid gap-4">
                        {result.suggestions.map((suggestion: any, i: number) => (
                            <Card key={i}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-primary font-medium">
                                                <LinkIcon className="w-4 h-4" />
                                                Anchor: "{suggestion.anchor}"
                                            </div>
                                            <p className="text-sm text-slate-600 italic">...{suggestion.context}...</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-muted-foreground uppercase mb-1">Target Page</div>
                                            <code className="text-xs bg-slate-100 px-2 py-1 rounded block max-w-[200px] truncate">
                                                {suggestion.target}
                                            </code>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
