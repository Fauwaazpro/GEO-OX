import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { content1, content2 } = await request.json()

    if (!content1 || !content2) {
        return NextResponse.json({ error: 'Two text blocks required' }, { status: 400 })
    }

    // Simple Jaccard Similarity Mock
    const set1 = new Set(content1.toLowerCase().split(' '))
    const set2 = new Set(content2.toLowerCase().split(' '))
    const intersection = new Set([...set1].filter(x => set2.has(x)))
    const union = new Set([...set1, ...set2])
    const similarity = Math.round((intersection.size / union.size) * 100)

    return NextResponse.json({
        similarity,
        isDuplicate: similarity > 80,
        message: similarity > 80 ? "Content is significantly duplicate." : "Content is unique enough."
    })
}
