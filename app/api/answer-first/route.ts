import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { topic, targetKeyword, content } = await request.json()

    if (!content) {
        return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    // Mock Answer Engine Optimization
    const intro = `Here is a direct answer for "${topic}":`
    const boldAnswer = `**${topic} involves ${content.slice(0, 50)}...**`
    const optimizedContent = `${intro}\n\n${boldAnswer}\n\n${content}\n\n## Key Takeaways\n- Quick point 1\n- Quick point 2`

    await new Promise(resolve => setTimeout(resolve, 1500))

    return NextResponse.json({
        originalContent: content,
        optimizedContent,
        format: "Answer-First Structure Applied"
    })
}
