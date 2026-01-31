"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Download, Copy } from "lucide-react"

export default function LlmsTxtGeneratorPage() {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleGenerate = async () => {
        if (!url) return
        setLoading(true)
        try {
            const res = await fetch('/api/llms-txt', {
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
                <h1 className="text-3xl font-bold mb-2">LLMS.txt Generator</h1>
                <p className="text-muted-foreground">Create a standard file for AI crawlers to understand your site</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Generate File</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="https://example.com"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button onClick={handleGenerate} disabled={loading}>
                            {loading ? "Generating..." : "Generate llms.txt"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <div className="grid lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                Preview llms.txt
                            </CardTitle>
                            <CardDescription>Place this file at /llms.txt</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto h-96 text-xs font-mono">
                                <pre>{result.llmsTxt}</pre>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Metadata Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <div className="text-sm text-slate-500">Domain</div>
                                    <div className="font-bold">{result.metadata.domain}</div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <div className="text-sm text-slate-500">Word Count</div>
                                    <div className="font-bold">{result.metadata.wordCount}</div>
                                </div>
                            </div>
                            <Button className="w-full" variant="outline">
                                <Download className="w-4 h-4 mr-2" /> Download File
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
