import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { type, data } = await request.json()

    let schema = {}

    if (type === 'article') {
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.headline,
            "image": data.image,
            "author": {
                "@type": "Person",
                "name": data.authorName
            },
            "publisher": {
                "@type": "Organization",
                "name": data.publisherName,
                "logo": {
                    "@type": "ImageObject",
                    "url": data.publisherLogo
                }
            },
            "datePublished": data.datePublished
        }
    } else if (type === 'product') {
        schema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": data.name,
            "image": data.image,
            "description": data.description,
            "brand": {
                "@type": "Brand",
                "name": data.brand
            },
            "offers": {
                "@type": "Offer",
                "url": data.url,
                "priceCurrency": data.currency,
                "price": data.price,
                "availability": "https://schema.org/InStock"
            }
        }
    } else if (type === 'faq') {
        schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": data.questions?.map((q: any) => ({
                "@type": "Question",
                "name": q.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": q.answer
                }
            }))
        }
    }

    return NextResponse.json({
        success: true,
        jsonLd: JSON.stringify(schema, null, 2)
    })
}
