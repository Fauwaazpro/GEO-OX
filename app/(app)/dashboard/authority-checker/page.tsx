"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitBranch, AlertCircle } from "lucide-react"

export default function AuthorityCheckerPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleAnalyze = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/authority-checker', {
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
                <h1 className="text-3xl font-bold mb-2">Authority Checker (Topic Map)</h1>
                <p className="text-muted-foreground">Visualize topic clusters and find orphan pages</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Map Site Authority</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button onClick={handleAnalyze} disabled={loading}>
                            {loading ? "Mapping..." : "Generate Topic Map"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <div className="grid gap-6">
                    {result.topicClusters.map((cluster: any, i: number) => (
                        <Card key={i}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <GitBranch className="w-5 h-5 text-purple-500" />
                                    {cluster.topic}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 bg-green-50 rounded-lg text-sm">
                                    <span className="font-semibold text-green-700">Pillar Page: </span>
                                    {cluster.mainPage}
                                </div>
                                <div className="pl-4 border-l-2 border-slate-200 space-y-2">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cluster Content</p>
                                    {cluster.subPages.map((page: string, idx: number) => (
                                        <div key={idx} className="text-sm">{page}</div>
                                    ))}
                                </div>
                                {cluster.orphanPages.length > 0 && (
                                    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                        <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
                                            <AlertCircle className="w-4 h-4" />
                                            Orphan Pages Detected
                                        </div>
                                        <ul className="list-disc list-inside text-sm text-red-600">
                                            {cluster.orphanPages.map((op: string, idx: number) => (
                                                <li key={idx}>{op}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
