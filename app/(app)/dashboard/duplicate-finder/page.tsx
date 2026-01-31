"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Copy, AlertTriangle, CheckCircle } from "lucide-react"

export default function DuplicateFinderPage() {
    const [content1, setContent1] = useState("")
    const [content2, setContent2] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleCompare = async () => {
        if (!content1 || !content2) return
        setLoading(true)
        try {
            const res = await fetch('/api/duplicate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content1, content2 })
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
                <h1 className="text-3xl font-bold mb-2">Duplicate Content Finder</h1>
                <p className="text-muted-foreground">Detect and resolve internal duplicate content issues</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Content A</label>
                    <Textarea
                        placeholder="Paste first content block..."
                        className="h-64"
                        value={content1}
                        onChange={e => setContent1(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Content B</label>
                    <Textarea
                        placeholder="Paste second content block..."
                        className="h-64"
                        value={content2}
                        onChange={e => setContent2(e.target.value)}
                    />
                </div>
            </div>

            <Button onClick={handleCompare} disabled={loading || !content1 || !content2} className="w-full md:w-auto">
                {loading ? "Comparing..." : "Check Similarity"}
            </Button>

            {result && (
                <Card className={result.isDuplicate ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            {result.isDuplicate ? (
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            ) : (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            )}
                            Similarity Score: {result.similarity}%
                        </CardTitle>
                        <CardDescription className={result.isDuplicate ? "text-red-700" : "text-green-700"}>
                            {result.message}
                        </CardDescription>
                    </CardHeader>
                </Card>
            )}
        </div>
    )
}
