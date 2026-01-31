"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Smartphone, Check, X } from "lucide-react"

export default function MobileAuditorPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleAudit = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/mobile-auditor', {
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
                <h1 className="text-3xl font-bold mb-2">Mobile Auditor</h1>
                <p className="text-muted-foreground">Ensure your site is perfect for mobile-first indexing</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Run Mobile Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button onClick={handleAudit} disabled={loading}>
                            {loading ? "Testing..." : "Test Responsiveness"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-4">
                                    <div className="text-4xl font-bold text-blue-600">{result.score}/100</div>
                                    <span>Mobile Score</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {result.issues.map((issue: any, i: number) => (
                                        <div key={i} className="flex gap-3 p-3 rounded-lg border bg-slate-50">
                                            {issue.severity === 'high' ? (
                                                <X className="w-5 h-5 text-red-500 shrink-0" />
                                            ) : (
                                                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                                            )}
                                            <div>
                                                <div className="font-semibold">{issue.message}</div>
                                                <div className="text-xs text-muted-foreground">{issue.details}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div className="bg-slate-900 rounded-[3rem] p-4 shadow-xl border-4 border-slate-800 max-w-sm mx-auto">
                        <div className="bg-white rounded-[2rem] overflow-hidden h-full min-h-[500px] relative">
                            {/* Fake Mobile Status Bar */}
                            <div className="h-6 bg-slate-100 w-full absolute top-0 left-0 z-10 flex justify-between px-4 items-center text-[10px] font-bold text-slate-800">
                                <span>9:41</span>
                                <span>5G</span>
                            </div>
                            <img src={result.screenshot} alt="Mobile Preview" className="w-full h-full object-cover pt-6" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function AlertTriangle(props: any) {
    return <Smartphone {...props} /> // Placeholder fallback
}
