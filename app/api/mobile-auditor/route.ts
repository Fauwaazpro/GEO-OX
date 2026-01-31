import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { SimpleCache, normalizeInput } from '@/lib/api-utils'

const cache = new SimpleCache(3600000)

export async function POST(request: Request) {
    const { url } = await request.json()

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const cacheKey = `mobile_audit_${normalizeInput(url)}`
    const cached = cache.get(cacheKey)
    if (cached) return NextResponse.json(cached)

    let browser = null
    try {
        browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
        const page = await browser.newPage()
        
        // Emulate Mobile
        await page.setViewport({ width: 375, height: 667, isMobile: true })
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 })

        const screenshot = await page.screenshot({ encoding: 'base64', type: 'jpeg', quality: 50 }) as string

        await browser.close()
        browser = null

        const responseData = {
            score: 92, // Mock Score
            screenshot: `data:image/jpeg;base64,${screenshot}`,
            issues: [
                { severity: 'medium', message: 'Tap targets are close', details: 'Some buttons have less than 48px spacing.' },
                { severity: 'low', message: 'Font size', details: 'Text is legible but could be larger.' }
            ]
        }

        cache.set(cacheKey, responseData)
        return NextResponse.json(responseData)

    } catch (error: any) {
        if (browser) await browser.close()
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
