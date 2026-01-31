import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    // Mock Mobile Audit
    const { url } = await request.json()

    const mobileIssues = [
        {
            type: 'viewport',
            severity: 'high',
            message: 'Viewport meta tag not properly configured',
            details: 'Ensure width=device-width, initial-scale=1 is present.'
        },
        {
            type: 'tap-targets',
            severity: 'medium',
            message: 'Tap targets are too small',
            details: 'Found 3 buttons smaller than 48x48px.'
        },
        {
            type: 'font-size',
            severity: 'low',
            message: 'Text size is too small to read',
            details: 'Main body text is 12px, recommend at least 16px.'
        }
    ]

    const mobileScore = 78

    await new Promise(resolve => setTimeout(resolve, 1500))

    return NextResponse.json({
        url,
        score: mobileScore,
        issues: mobileIssues,
        screenshot: 'https://placehold.co/375x812/png?text=Mobile+Preview'
    })
}
