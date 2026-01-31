import { NextResponse } from 'next/server'
import { deterministicScore } from '@/lib/api-utils'

export async function POST(request: Request) {
    const { url } = await request.json()

    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })

    await new Promise(resolve => setTimeout(resolve, 2000))

    const lcp = (deterministicScore(url + 'lcp', 0.5, 4.0)).toFixed(1)
    const cls = (deterministicScore(url + 'cls', 0, 0.25)).toFixed(2)
    const inp = deterministicScore(url + 'inp', 50, 400)

    const getStatus = (val: number, good: number, bad: number) => 
        val <= good ? 'good' : val <= bad ? 'needs-improvement' : 'poor'

    return NextResponse.json({
        url,
        vitals: {
            lcp: { value: lcp, status: getStatus(parseFloat(lcp), 2.5, 4.0) },
            cls: { value: cls, status: getStatus(parseFloat(cls), 0.1, 0.25) },
            inp: { value: inp, status: getStatus(inp, 200, 500) }
        },
        issues: [
            {
                metric: "LCP",
                description: "Large image payload detected",
                fix: "Compress hero image and use WebP format",
                codeSnippet: "<img src='hero.webp' loading='eager' width='800' height='600' />"
            },
            {
                metric: "CLS",
                description: "Layout shift caused by ad banner",
                fix: "Reserve space for dynamic content",
                codeSnippet: ".ad-slot { min-height: 250px; }"
            }
        ]
    })
}
