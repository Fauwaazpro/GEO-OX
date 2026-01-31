"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Check, AlertCircle } from "lucide-react"

export default function TechnicalReadinessPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleAudit = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/technical-readiness', {
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
                <h1 className="text-3xl font-bold mb-2">Technical Readiness</h1>
                <p className="text-muted-foreground">Verify security headers and server configuration</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Technical Scan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button onClick={handleAudit} disabled={loading}>
                            {loading ? "Scanning..." : "Scan Tech Stack"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <div className="grid gap-4">
                    {result.checks.map((check: any, i: number) => (
                        <Card key={i}>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {check.status === 'pass' ? (
                                        <div className="p-2 bg-green-100 rounded-full text-green-600">
                                            <Check className="w-5 h-5" />
                                        </div>
                                    ) : (
                                        <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                                            <AlertCircle className="w-5 h-5" />
                                        </div>
                                    )}
                                    <span className="font-medium">{check.name}</span>
                                </div>
                                <span className="text-sm text-slate-600">{check.details}</span>
                            </CardContent>
                        </Card>
                    ))}

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-wide text-slate-500">Security Headers Detected</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                                {Object.entries(result.headers).map(([k, v]: [string, any]) => (
                                    <div key={k} className="p-2 bg-slate-50 border rounded">
                                        <span className="font-bold block mb-1">{k}</span>
                                        <span className="break-all text-muted-foreground">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
