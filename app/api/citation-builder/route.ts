import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { brandName, domain } = await request.json()

    // Mock Citation Opportunities
    const opportunities = [
        {
            site: "businessinsider.com",
            relevance: "High",
            da: 94,
            status: "Action Required",
            contact: "editors@businessinsider.com"
        },
        {
            site: "techradar.com",
            relevance: "Medium",
            da: 92,
            status: "Action Required",
            contact: "press@techradar.com"
        },
        {
            site: "searchenginejournal.com",
            relevance: "High",
            da: 91,
            status: "Action Required",
            contact: "submit@searchenginejournal.com"
        }
    ]

    await new Promise(resolve => setTimeout(resolve, 1500))

    return NextResponse.json({
        brandName,
        opportunities,
        potentialAuthorityBoost: "+15%"
    })
}
