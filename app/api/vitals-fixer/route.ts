import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { url } = await request.json()

    // Mock Vitals Data
    const vitals = {
        lcp: { value: 2.4, status: 'good', metric: 'LCP', unit: 's' }, // Largest Contentful Paint
        cls: { value: 0.15, status: 'needs-improvement', metric: 'CLS', unit: '' }, // Cumulative Layout Shift
        inp: { value: 180, status: 'needs-improvement', metric: 'INP', unit: 'ms' }, // Interaction to Next Paint
        fcp: { value: 1.2, status: 'good', metric: 'FCP', unit: 's' }, // First Contentful Paint
        ttfb: { value: 0.4, status: 'good', metric: 'TTFB', unit: 's' } // Time to First Byte
    }

    const issues = [
        {
            metric: 'CLS',
            description: 'Image elements do not have explicit width and height',
            fix: 'Add width="800" height="600" attributes to your <img> tags to reserve space.',
            codeSnippet: '<img src="hero.jpg" width="800" height="600" alt="Hero Image">'
        },
        {
            metric: 'INP',
            description: 'Long main thread tasks detected during hydration',
            fix: 'Defer non-essential JavaScript using next/dynamic or standard defer attributes.',
            codeSnippet: 'const HeavyComponent = dynamic(() => import("./Heavy"), { ssr: false })'
        },
        {
            metric: 'LCP',
            description: 'Hero image is lazy-loaded',
            fix: 'Use <link rel="preload"> or priority={true} in Next.js Image component.',
            codeSnippet: '<Image src="/hero.png" priority={true} ... />'
        }
    ]

    await new Promise(resolve => setTimeout(resolve, 2000))

    return NextResponse.json({
        url,
        vitals,
        issues
    })
}
