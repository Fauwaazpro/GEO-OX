import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(request: Request) {
    const { url } = await request.json()

    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 })

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    
    try {
        const page = await browser.newPage()
        
        // 1. Fetch content normally (with JS)
        await page.goto(url, { waitUntil: 'networkidle0' })
        const renderedContent = await page.content()
        const renderedText = await page.evaluate(() => document.body.innerText)

        // 2. Fetch content without JS
        await page.setJavaScriptEnabled(false)
        await page.goto(url, { waitUntil: 'networkidle0' })
        const rawContent = await page.content()
        const rawText = await page.evaluate(() => document.body.innerText)

        await browser.close()

        // 3. Compare
        const textDiff = Math.abs(renderedText.length - rawText.length)
        const percentDiff = (textDiff / renderedText.length) * 100
        
        const isClientSideRendered = percentDiff > 50 // If >50% content is missing without JS, it's CSR heavy

        return NextResponse.json({
            url,
            isClientSideRendered,
            renderedLength: renderedText.length,
            rawLength: rawText.length,
            percentDifferance: percentDiff.toFixed(2),
            status: isClientSideRendered ? 'critical' : 'good',
            message: isClientSideRendered 
                ? 'Search engines may have trouble indexing your content. Over 50% of text relies on JavaScript.' 
                : 'Content is visible without JavaScript. Good for SEO.'
        })

    } catch (error: any) {
        await browser.close()
        return NextResponse.json({ error: 'Check failed', details: error.message }, { status: 500 })
    }
}
