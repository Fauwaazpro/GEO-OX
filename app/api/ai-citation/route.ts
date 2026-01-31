import { NextResponse } from 'next/server'
import { hashString, SimpleCache, normalizeInput } from '@/lib/api-utils'

const cache = new SimpleCache(3600000) // 1 hour cache

export async function POST(request: Request) {
    const { brandName, keywords } = await request.json()

    if (!brandName) {
        return NextResponse.json({ error: 'Brand name is required' }, { status: 400 })
    }

    try {
        const normalizedBrand = normalizeInput(brandName)
        const normalizedKeywords = normalizeInput(keywords || '')
        const cacheKey = `ai_citation_${normalizedBrand}_${normalizedKeywords}`

        // Check cache
        const cached = cache.get(cacheKey)
        if (cached) {
            return NextResponse.json(cached)
        }

        const apiKey = process.env.OPENAI_API_KEY
        if (!apiKey) {
            throw new Error("Missing OpenAI API Key")
        }

        // Prompt for OpenAI
        const prompt = `
        Analyze the brand "${brandName}" in the context of "${keywords || 'general industry'}". 
        Simulate how this brand appears in Generative Engine Optimization (GEO) results.
        
        Provide the following in JSON format:
        1. visibilityScore: A score from 0-100 indicating how prominent the brand is in AI answers.
        2. results: An array of 3 objects for engines ["Perplexity AI", "ChatGPT", "Google Gemini"]. 
           Each object should have:
           - engine (name)
           - isVisible (boolean)
           - sentiment (positive, neutral, negative)
           - snippet (a simulated answer text provided by this AI)
           - sources (array of objects with title, domain) - relevant if isVisible is true
        3. recommendations: An array of advice to improve GEO visibility.
        `

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a GEO (Generative Engine Optimization) expert. Output valid JSON only." },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" }
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`OpenAI API Error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        const content = data.choices[0]?.message?.content
        
        if (!content) throw new Error("No content received from OpenAI")
        
        const aiData = JSON.parse(content)

        // Enhance results with local static data (like logos)
        const enginesMap: Record<string, string> = {
            "Perplexity AI": "perplexity",
            "ChatGPT": "chatgpt",
            "Google Gemini": "gemini"
        }

        const enhancedResults = aiData.results?.map((r: any) => ({
            ...r,
            logo: enginesMap[r.engine] || 'default',
            confidence: r.isVisible ? 85 : 0
        })) || []

        const responseData = {
            visibilityScore: aiData.visibilityScore || 0,
            results: enhancedResults,
            recommendations: aiData.recommendations || [],
            analyzedAt: new Date().toISOString()
        }

        cache.set(cacheKey, responseData)

        return NextResponse.json(responseData)
    } catch (error: any) {
        console.error('AI citation check failed:', error)
        
        return NextResponse.json({
            error: 'Analysis failed',
            message: 'Real-time analysis unavailable. Please check your OpenAI API key configuration.'
        }, { status: 500 })
    }
}
