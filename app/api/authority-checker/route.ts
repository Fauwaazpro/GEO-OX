import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { SimpleCache, normalizeInput } from '@/lib/api-utils'

const cache = new SimpleCache(3600000)

export async function POST(request: Request) {
    const { url } = await request.json()

    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 })

    const cacheKey = `authority_checker_${normalizeInput(url)}`
    const cached = cache.get(cacheKey)
    if (cached) return NextResponse.json(cached)

    // Mock Authority Map
    const topicClusters = [
        {
            topic: "Main Service",
            mainPage: url,
            subPages: [
                `${url}/features`,
                `${url}/pricing`,
                `${url}/about`
            ],
            orphanPages: []
        },
        {
            topic: "Blog / Guides",
            mainPage: `${url}/blog`,
            subPages: [
                `${url}/blog/post-1`,
                `${url}/blog/post-2`
            ],
            orphanPages: [
                `${url}/blog/old-post-orphaned`
            ]
        }
    ]

    await new Promise(resolve => setTimeout(resolve, 1500))

    const responseData = { topicClusters }
    cache.set(cacheKey, responseData)

    return NextResponse.json(responseData)
}
