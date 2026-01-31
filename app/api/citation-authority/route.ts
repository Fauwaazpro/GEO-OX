import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { url, brandName } = await request.json()

    // Mock Citation Authority Data
    const mentions = [
        {
            source: "techcrunch.com",
            context: "...promising new startups like GEO Ox are changing...",
            isLinked: true,
            sentiment: "positive"
        },
        {
            source: "medium.com/seo-experts",
            context: "For technical audits, I recommend checking out geo-ox for their free tools.",
            isLinked: false,
            sentiment: "neutral"
        },
        {
            source: "twitter.com",
            context: "Just tried the new mobile auditor from @GEOOx - pretty fast!",
            isLinked: true,
            sentiment: "positive"
        }
    ]

    const unlinkedCount = mentions.filter(m => !m.isLinked).length

    await new Promise(resolve => setTimeout(resolve, 1500))

    return NextResponse.json({
        brandName,
        mentions,
        unlinkedCount,
        authorityScore: 65
    })
}
