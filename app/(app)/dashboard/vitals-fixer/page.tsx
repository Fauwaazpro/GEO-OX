"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Gauge, Zap, Layout, MousePointerClick } from "lucide-react"

export default function VitalsFixerPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleAudit = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/vitals-fixer', {
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
                <h1 className="text-3xl font-bold mb-2">Vitals Fixer Pro</h1>
                <p className="text-muted-foreground">Fix Core Web Vitals (LCP, CLS, INP) for rankings</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Measure Core Vitals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button onClick={handleAudit} disabled={loading}>
                            {loading ? "Measuring..." : "Run Assessment"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <div className="space-y-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        <MetricCard 
                            title="LCP (Loading)" 
                            value={result.vitals.lcp.value} 
                            unit="s"
                            status={result.vitals.lcp.status}
                            icon={Zap}
                        />
                        <MetricCard 
                            title="CLS (Stability)" 
                            value={result.vitals.cls.value} 
                            unit=""
                            status={result.vitals.cls.status}
                            icon={Layout}
                        />
                        <MetricCard 
                            title="INP (Interactivity)" 
                            value={result.vitals.inp.value} 
                            unit="ms"
                            status={result.vitals.inp.status}
                            icon={MousePointerClick}
                        />
                    </div>

                    <h3 className="text-xl font-bold">Fix Recommendations</h3>
                    <div className="grid gap-4">
                        {result.issues.map((issue: any, i: number) => (
                            <Card key={i}>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-slate-100 rounded-lg font-bold text-slate-700">
                                            {issue.metric}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <p className="font-medium text-red-600">{issue.description}</p>
                                            <p className="text-sm text-slate-600">{issue.fix}</p>
                                            <div className="bg-slate-900 text-slate-50 p-3 rounded-md font-mono text-xs overflow-x-auto">
                                                <code>{issue.codeSnippet}</code>
                                            </div>
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

function MetricCard({ title, value, unit, status, icon: Icon }: any) {
    const color = status === 'good' ? 'text-green-600' : status === 'needs-improvement' ? 'text-amber-600' : 'text-red-600'
    const bg = status === 'good' ? 'bg-green-50 border-green-200' : status === 'needs-improvement' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'

    return (
        <Card className={`${bg} border`}>
            <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                    <Icon className={`w-8 h-8 ${color}`} />
                </div>
                <div className={`text-3xl font-bold mb-1 ${color}`}>
                    {value}{unit}
                </div>
                <div className="text-sm font-medium text-slate-600">{title}</div>
            </CardContent>
        </Card>
    )
}
