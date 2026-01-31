import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { keyword } = await request.json()

    if (!keyword) return NextResponse.json({ error: 'Keyword required' }, { status: 400 })

    // Mock Latent Semantic Indexing (LSI) Keywords
    const lsiKeywords = [
        `${keyword} optimization`,
        `${keyword} best practices`,
        `${keyword} tutorial`,
        `advanced ${keyword} techniques`,
        `${keyword} services`,
        `${keyword} for beginners`,
        `${keyword} strategy`,
        `${keyword} vs competitor`
    ]

    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
        keyword,
        lsiKeywords,
        volume: "1.2k - 10k"
    })
}
