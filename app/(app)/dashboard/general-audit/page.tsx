"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, CheckCircle, XCircle } from "lucide-react"

export default function GeneralAuditPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleAudit = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/general-audit', {
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
                <h1 className="text-3xl font-bold mb-2">General Audit & Gap Analysis</h1>
                <p className="text-muted-foreground">Comprehensive competitor comparison for content gaps</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Run Site Audit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button onClick={handleAudit} disabled={loading}>
                            {loading ? "Auditing..." : "Start Audit"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <div className="grid gap-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader className="pb-2"><CardTitle className="text-lg">Title Tag</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{result.meta.titleLength} chars</div>
                                <p className="text-xs text-muted-foreground">Optimal: 50-60</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2"><CardTitle className="text-lg">Description</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{result.meta.descLength} chars</div>
                                <p className="text-xs text-muted-foreground">Optimal: 150-160</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2"><CardTitle className="text-lg">Content Score</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">{result.content.readabilityScore}/100</div>
                                <p className="text-xs text-muted-foreground">Readability</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Competitor Gaps</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-800 rounded-lg">
                                    <XCircle className="w-5 h-5" />
                                    <span>Missing keywords: {result.competitorGap.missingKeywords.join(", ")}</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg">
                                    <Info className="w-5 h-5" />
                                    <span>Content Length Gap: {result.competitorGap.contentLengthDiff} words vs Top Competitor</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}

function Info({ className }: { className?: string }) {
    return <Search className={className} /> // Placeholder icon reuse
}
