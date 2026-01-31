import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { content, url } = await request.json()

    // Mock Duplicate Check
    const duplicates = [
        {
            url: "https://competitor.com/similar-article",
            similarity: 85,
            matchedText: "...start optimizing for answer engines..."
        },
        {
            url: `${url}/print-version`,
            similarity: 99,
            matchedText: "Full page content match"
        }
    ]

    const canonicalSuggestion = duplicates.length > 0 ? url : null

    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
        isUnique: duplicates.length === 0,
        duplicates,
        canonicalSuggestion
    })
}
