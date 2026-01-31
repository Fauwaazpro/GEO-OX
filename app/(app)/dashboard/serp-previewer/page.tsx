"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"

export default function SerpPreviewerPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handlePreview = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/serp-previewer', {
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
                <h1 className="text-3xl font-bold mb-2">SERP Previewer</h1>
                <p className="text-muted-foreground">See how your site looks in search results</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Fetch Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button onClick={handlePreview} disabled={loading}>
                            {loading ? "Fetching..." : "Preview"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <div className="max-w-2xl">
                    <h3 className="text-lg font-bold mb-4">Google Search Preview</h3>
                    <div className="bg-white p-6 rounded shadow-sm border">
                        <div className="text-sm text-slate-800 mb-1 flex items-center gap-2">
                            <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-xs">Fav</div>
                            <div>
                                <div className="font-medium text-slate-900">Example Site</div>
                                <div className="text-slate-500">{result.url}</div>
                            </div>
                        </div>
                        <h3 className="text-xl text-[#1a0dab] font-medium hover:underline cursor-pointer mb-1">
                            {result.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {result.description}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
