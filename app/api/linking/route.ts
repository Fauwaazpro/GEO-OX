import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { sourceUrl } = await request.json()

    // Mock Internal Linking Suggestions
    const suggestions = [
        {
            anchor: "complete guide to SEO",
            target: "/blog/seo-guide",
            context: "...check out our complete guide to SEO for more details..."
        },
        {
            anchor: "keyword research tools",
            target: "/tools/keyword-research",
            context: "...using the best keyword research tools available..."
        }
    ]

    await new Promise(resolve => setTimeout(resolve, 1500))

    return NextResponse.json({
        url: sourceUrl,
        suggestions,
        linkScore: 82
    })
}
