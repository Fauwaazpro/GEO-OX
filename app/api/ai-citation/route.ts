import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { url, brandName } = await request.json()

    // Mock AI Citation Check
    const aiSources = [
        { name: "ChatGPT (GPT-4)", likelihood: "High", explanation: "Brand is mentioned in highly authoritative tech contexts." },
        { name: "Google Gemini", likelihood: "Medium", explanation: "Site is indexed but lacks structured entity markup." },
        { name: "Perplexity", likelihood: "High", explanation: "Direct citations found in recent index." },
        { name: "Claude", likelihood: "Low", explanation: "Limited training data exposure detected." }
    ]

    const overallScore = 75

    await new Promise(resolve => setTimeout(resolve, 2000))

    return NextResponse.json({
        url,
        brandName,
        aiSources,
        overallScore
    })
}
