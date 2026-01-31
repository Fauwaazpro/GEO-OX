"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Key } from "lucide-react"

export default function LsiKeywordExtractorPage() {
    const [keyword, setKeyword] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleExtract = async () => {
        if (!keyword) return
        setLoading(true)
        try {
            const res = await fetch('/api/lsi-keywords', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword })
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
                <h1 className="text-3xl font-bold mb-2">LSI Keyword Extractor</h1>
                <p className="text-muted-foreground">Find semantically related keywords to boost relevance</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Enter Seed Keyword</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="e.g. digital marketing"
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                        />
                        <Button onClick={handleExtract} disabled={loading}>
                            {loading ? "Extracting..." : "Find Keywords"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="w-5 h-5 text-amber-500" />
                            LSI Opportunities
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {result.lsiKeywords.map((kw: string, i: number) => (
                                <div key={i} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-sm font-medium transition-colors cursor-pointer">
                                    {kw}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
