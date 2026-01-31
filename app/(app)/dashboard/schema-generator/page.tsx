"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Code2, Copy } from "lucide-react"

export default function SchemaGeneratorPage() {
    const [type, setType] = useState("article")
    const [data, setData] = useState<any>({})
    const [result, setResult] = useState("")

    const handleGenerate = async () => {
        try {
            const res = await fetch('/api/schema-generator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, data })
            })
            const json = await res.json()
            setResult(json.jsonLd)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Schema Generator</h1>
                <p className="text-muted-foreground">Create valid JSON-LD structured data</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Configure Schema</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Schema Type</Label>
                            <Select onValueChange={setType} defaultValue={type}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="article">Article</SelectItem>
                                    <SelectItem value="product">Product</SelectItem>
                                    <SelectItem value="faq">FAQ Page</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {type === 'article' && (
                            <>
                                <Input placeholder="Headline" onChange={e => setData({...data, headline: e.target.value})} />
                                <Input placeholder="Author Name" onChange={e => setData({...data, authorName: e.target.value})} />
                                <Input placeholder="Image URL" onChange={e => setData({...data, image: e.target.value})} />
                            </>
                        )}
                        {/* More fields for other types would go here */}

                        <Button onClick={handleGenerate} className="w-full">Generate JSON-LD</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-blue-600" />
                            Output Code
                        </CardTitle>
                        <CardDescription>Paste this into your {`<head>`} tag</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <div className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto h-64 text-xs font-mono">
                                <pre>{result || "// Output will appear here"}</pre>
                            </div>
                            <Button size="sm" variant="secondary" className="absolute top-2 right-2">
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
