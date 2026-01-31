import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'GEO Ox | Generative Engine Optimization Platform',
    description: 'Optimize your content for AI search engines like Perplexity, ChatGPT, and Gemini.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <Toaster richColors />
            </body>
        </html>
    )
}
