import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { SimpleCache, normalizeInput } from '@/lib/api-utils'

const cache = new SimpleCache(3600000)

export async function POST(request: Request) {
    const { url } = await request.json()

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const cacheKey = `js_render_${normalizeInput(url)}`
    const cached = cache.get(cacheKey)
    if (cached) return NextResponse.json(cached)

    let browser = null
    try {
        browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
        
        // 1. Fetch with JS disabled
        const pageNoJs = await browser.newPage()
        await pageNoJs.setJavaScriptEnabled(false)
        await pageNoJs.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })
        const exactTextNoJs = await pageNoJs.evaluate(() => document.body.innerText)
        
        // 2. Fetch with JS enabled
        const pageJs = await browser.newPage()
        await pageJs.setJavaScriptEnabled(true)
        await pageJs.goto(url, { waitUntil: 'networkidle0', timeout: 15000 })
        const exactTextJs = await pageJs.evaluate(() => document.body.innerText)

        await browser.close()
        browser = null

        const diff = Math.abs(exactTextJs.length - exactTextNoJs.length)
        const percentDiff = Math.round((diff / exactTextJs.length) * 100)
        
        // > 30% difference usually implies heavy client-side rendering
        const isClientSideRendered = percentDiff > 30

        const responseData = {
            isClientSideRendered,
            percentDifferance: percentDiff,
            rawLength: exactTextNoJs.length,
            renderedLength: exactTextJs.length,
            status: isClientSideRendered ? 'critical' : 'good',
            message: isClientSideRendered 
                ? "Significant content is missing when JavaScript is disabled. Search bots might miss this content."
                : "Content renders well without JavaScript."
        }

        cache.set(cacheKey, responseData)
        return NextResponse.json(responseData)

    } catch (error: any) {
        if (browser) await browser.close()
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
