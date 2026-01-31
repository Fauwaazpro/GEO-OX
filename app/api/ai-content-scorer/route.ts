import { NextResponse } from 'next/server'
import { deterministicScore, deterministicBoolean } from '@/lib/api-utils'

export async function POST(request: Request) {
    const { url } = await request.json()

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Mock AI Scorer (Google Helpful Content System)
    const overallScore = deterministicScore(url, 45, 95)
    
    // Simulate slight delay for "AI processing"
    await new Promise(resolve => setTimeout(resolve, 2000))

    return NextResponse.json({
        url,
        overallScore,
        metrics: {
            experience: deterministicScore(url + 'e', 60, 95),
            expertise: deterministicScore(url + 'ex', 50, 90),
            authoritativeness: deterministicScore(url + 'a', 40, 85),
            trustworthiness: deterministicScore(url + 't', 70, 98)
        },
        feedback: "Content is well-structured but lacks first-hand experience signals."
    })
}
