import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6">About GEO Ox</h1>
                <div className="prose max-w-none">
                    <p className="text-lg text-slate-600 mb-4">
                        GEO Ox is a leading platform for Generative Engine Optimization, helping content creators and businesses
                        optimize their presence in AI-driven search results.
                    </p>
                    <p className="text-lg text-slate-600">
                        Our suite of tools provides actionable insights to improve visibility across major AI engines like
                        ChatGPT, Perplexity, and Google Gemini.
                    </p>
                </div>
            </main>
            <SiteFooter />
        </div>
    )
}
