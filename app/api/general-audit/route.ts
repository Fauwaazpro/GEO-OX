import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { SimpleCache, normalizeInput } from '@/lib/api-utils'

const cache = new SimpleCache(3600000)

export async function POST(request: Request) {
    const { url } = await request.json()

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const cacheKey = `general_audit_${normalizeInput(url)}`
    const cached = cache.get(cacheKey)
    if (cached) return NextResponse.json(cached)

    let browser = null
    try {
        browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })

        const data = await page.evaluate(() => {
            return {
                title: document.title,
                desc: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
                bodyText: document.body.innerText
            }
        })

        await browser.close()
        browser = null

        const responseData = {
            meta: {
                titleLength: data.title.length,
                descLength: data.desc.length
            },
            content: {
                readabilityScore: 72, // Mock score
                wordCount: data.bodyText.split(/\s+/).length
            },
            competitorGap: {
                missingKeywords: ["AI optimization", "Future proofing"],
                contentLengthDiff: -250
            }
        }

        cache.set(cacheKey, responseData)
        return NextResponse.json(responseData)

    } catch (error: any) {
        if (browser) await browser.close()
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
