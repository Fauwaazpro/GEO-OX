import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { url, competitorUrl } = await request.json()

    // Mock Audit Data
    const auditData = {
        meta: {
            titleLength: 55, // Good
            descLength: 140, // Good
            h1Present: true
        },
        content: {
            wordCount: 1200,
            keywordDensity: 1.5,
            readabilityScore: 65
        },
        competitorGap: {
            missingKeywords: ['schema markup', 'core web vitals', 'mobile optimization'],
            contentLengthDiff: -500 // Competitor has 500 more words
        }
    }

    await new Promise(resolve => setTimeout(resolve, 2500))

    return NextResponse.json(auditData)
}
