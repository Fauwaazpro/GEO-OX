import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { url } = await request.json()

    // Mock Semantic Entity Map
    const entities = [
        { name: "Search Engine Optimization", type: "Concept", salience: 0.85 },
        { name: "Google", type: "Organization", salience: 0.72 },
        { name: "Digital Marketing", type: "Field", salience: 0.65 },
        { name: "Content Strategy", type: "Skill", salience: 0.60 }
    ]

    await new Promise(resolve => setTimeout(resolve, 2000))

    return NextResponse.json({
        url,
        entities,
        knowledgeNativeScore: 78
    })
}
