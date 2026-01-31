"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Quote, ExternalLink } from "lucide-react"

export default function CitationAuthorityBuilderPage() {
    const [url, setUrl] = useState("")
    const [brandName, setBrandName] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleScan = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/citation-authority', {
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
                <h1 className="text-3xl font-bold mb-2">Citation Authority Builder</h1>
                <p className="text-muted-foreground">Find unlinked brand mentions to build authority</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Scan for Mentions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Input
                            placeholder="Brand Name"
                            value={brandName}
                            onChange={e => setBrandName(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleScan} disabled={loading}>
                        {loading ? "Scanning Web..." : "Find Unlinked Mentions"}
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="bg-blue-50 border-blue-100">
                            <CardContent className="p-6 text-center">
                                <div className="text-2xl font-bold text-blue-700">{result.mentions.length}</div>
                                <div className="text-xs text-blue-600 font-medium">Total Mentions</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-amber-50 border-amber-100">
                            <CardContent className="p-6 text-center">
                                <div className="text-2xl font-bold text-amber-700">{result.unlinkedCount}</div>
                                <div className="text-xs text-amber-600 font-medium">Unlinked (Opportunities)</div>
                            </CardContent>
                        </Card>
                    </div>

                    <h3 className="text-xl font-bold">Mention Opportunities</h3>
                    <div className="grid gap-4">
                        {result.mentions.map((mention: any, i: number) => (
                            <Card key={i} className={!mention.isLinked ? "border-l-4 border-l-amber-500" : ""}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="font-semibold mb-1 flex items-center gap-2">
                                                {mention.source}
                                                <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                            </div>
                                            <p className="text-sm text-slate-600 italic">"{mention.context}"</p>
                                        </div>
                                        <div>
                                            {!mention.isLinked ? (
                                                <Button size="sm" variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                                                    Claim Link
                                                </Button>
                                            ) : (
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">Linked</span>
                                            )}
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
