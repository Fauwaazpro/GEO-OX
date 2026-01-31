"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Check, X, Info } from "lucide-react"
import { usePremium } from "@/hooks/use-premium"
import { PremiumLock } from "@/components/premium-lock"

export default function AiCitationCheckerPage() {
    const { isPremium } = usePremium()
    const [url, setUrl] = useState("")
    const [brandName, setBrandName] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleCheck = async () => {
        if (!url || !brandName) return
        setLoading(true)
        try {
            const res = await fetch('/api/ai-citation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, brandName })
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
                <h1 className="text-3xl font-bold mb-2">AI Citation Checker</h1>
                <p className="text-muted-foreground">Verify if your brand is being cited by AI models</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Check AI Citations</CardTitle>
                    <CardDescription>Enter your URL and Brand Name</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Input
                            placeholder="Brand Name (e.g. GEO Ox)"
                            value={brandName}
                            onChange={e => setBrandName(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleCheck} disabled={loading || !url || !brandName}>
                        {loading ? "Analyzing..." : "Analyze Brand Presence"}
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <PremiumLock isLocked={!isPremium} title="Unlock AI Insights">
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>AI Visibility Score</span>
                                    <span className="text-2xl font-bold text-primary">{result.overallScore}/100</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {result.aiSources.map((source: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <BarChart3 className="w-5 h-5 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">{source.name}</p>
                                                    <p className="text-xs text-muted-foreground">{source.explanation}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                    source.likelihood === 'High' ? 'bg-green-100 text-green-700' :
                                                    source.likelihood === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {source.likelihood} Likelihood
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </PremiumLock>
            )}
        </div>
    )
}
