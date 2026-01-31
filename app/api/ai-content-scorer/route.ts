import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'

export async function POST(request: Request) {
    const { url } = await request.json()

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })

    try {
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
        const content = await page.content()
        await browser.close()

        const $ = cheerio.load(content)
        const text = $('body').text().replace(/\s+/g, ' ').trim()
        const wordCount = text.split(' ').length

        // Mock AI Scoring Logic (In a real app, this would call OpenAI)
        const helpfulnessScore = Math.floor(Math.random() * (95 - 70 + 1)) + 70
        const experienceScore = Math.floor(Math.random() * (100 - 60 + 1)) + 60
        const expertiseScore = Math.floor(Math.random() * (100 - 50 + 1)) + 50
        const authoritativenessScore = Math.floor(Math.random() * (100 - 80 + 1)) + 80
        const trustScore = Math.floor(Math.random() * (100 - 75 + 1)) + 75

        const overallScore = Math.round((helpfulnessScore + experienceScore + expertiseScore + authoritativenessScore + trustScore) / 5)

        const analysis = {
            url,
            overallScore,
            metrics: {
                helpfulness: helpfulnessScore,
                experience: experienceScore,
                expertise: expertiseScore,
                authoritativeness: authoritativenessScore,
                trust: trustScore
            },
            wordCount,
            suggestions: [
                "Consider adding more personal anecdotes to boost Experience score.",
                "Cite more authoritative sources to improve Trust.",
                "Ensure the Author bio is clearly visible and linked."
            ]
        }

        return NextResponse.json(analysis)

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to analyze URL',
            message: error.message
        }, { status: 500 })
    }
}
