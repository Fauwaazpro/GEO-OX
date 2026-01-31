import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { type, data } = await request.json()

    let jsonLd = {}

    if (type === 'article') {
        jsonLd = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.headline || "Article Headline",
            "author": {
                "@type": "Person",
                "name": data.authorName || "Author Name"
            },
            "image": data.image || "https://example.com/image.jpg",
            "datePublished": new Date().toISOString()
        }
    } else if (type === 'product') {
        jsonLd = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": data.name || "Product Name",
            "description": data.description || "Product Description"
        }
    }

    return NextResponse.json({
        jsonLd: JSON.stringify(jsonLd, null, 2)
    })
}
