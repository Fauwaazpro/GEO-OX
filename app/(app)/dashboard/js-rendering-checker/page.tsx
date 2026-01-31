"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, CheckCircle, AlertTriangle } from "lucide-react"

export default function JsRenderingCheckerPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleCheck = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/js-rendering', {
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
                <h1 className="text-3xl font-bold mb-2">JavaScript Rendering Checker</h1>
                <p className="text-muted-foreground">Verify if search bots can see your content without JS</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Test JS Dependency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button onClick={handleCheck} disabled={loading}>
                            {loading ? "Testing..." : "Check Rendering"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className={result.isClientSideRendered ? "border-amber-200 bg-amber-50" : "border-green-200 bg-green-50"}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {result.isClientSideRendered ? <AlertTriangle className="text-amber-600" /> : <CheckCircle className="text-green-600" />}
                                Authorization Status: {result.status === 'good' ? 'SEO Friendly' : 'Critical Issues'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">{result.message}</p>
                            <div className="text-sm font-mono bg-white/50 p-2 rounded border">
                                Content Difference: {result.percentDifferance}%
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Raw Data</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between border-b pb-2">
                                <span>With JavaScript:</span>
                                <span className="font-bold">{result.renderedLength} chars</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span>Without JavaScript:</span>
                                <span className="font-bold">{result.rawLength} chars</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
