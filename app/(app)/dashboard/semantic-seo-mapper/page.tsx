"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network, Check, X } from "lucide-react"

export default function SemanticSeoMapperPage() {
    const [url, setUrl] = useState("")
    const [keyword, setKeyword] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleAnalyze = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/semantic-seo-mapper', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, targetKeyword: keyword })
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
                <h1 className="text-3xl font-bold mb-2">Semantic SEO Mapper</h1>
                <p className="text-muted-foreground">Map your content to Knowledge Graph entities</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Entity Extraction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Input
                            placeholder="Target Keyword (optional)"
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleAnalyze} disabled={loading}>
                        {loading ? "Mapping..." : "Extract Entities"}
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <h3 className="font-bold text-lg">Detected Entities</h3>
                        <div className="grid gap-4">
                            {result.entities.map((entity: any, i: number) => (
                                <Card key={i}>
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div>
                                            <div className="font-bold">{entity.name}</div>
                                            <div className="text-xs text-muted-foreground">{entity.type} • Salience: {entity.salience}</div>
                                        </div>
                                        {entity.status === 'Present' ? (
                                            <div className="text-green-600 flex items-center gap-1 text-sm font-medium">
                                                <Check className="w-4 h-4" /> Present
                                            </div>
                                        ) : (
                                            <div className="text-red-500 flex items-center gap-1 text-sm font-medium">
                                                <X className="w-4 h-4" /> Missing
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Competitors</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    {result.competitors.map((comp: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">{i+1}</span>
                                            {comp}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}
