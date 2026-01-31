
import core from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

// Optional: standard puppeteer for local development (if installed)
// We use dynamic import to avoid bundling it in serverless if possible, 
// but Next.js usually handles this if we are careful.
let localPuppeteer: any = null;
try {
    localPuppeteer = require('puppeteer');
} catch (e) {
    // Puppeteer not installed locally? (Should be in devDeps)
}

export async function getBrowser() {
    const isProduction = process.env.NODE_ENV === 'production';
    const isVercel = !!process.env.VERCEL_URL || !!process.env.NEXT_PUBLIC_VERCEL_URL;

    // 1. Production (Vercel) -> Use puppeteer-core + @sparticuz/chromium
    if (isProduction || isVercel) {
        try {
             // Config for Vercel
             chromium.setGraphicsMode = false;
             
             return await core.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless === 'true' ? true : chromium.headless, // normalize boolean
                ignoreHTTPSErrors: true,
            });
        } catch (error) {
            console.error("Failed to launch Vercel browser:", error);
            throw error;
        }
    } 
    
    // 2. Local Development -> Use full Puppeteer
    if (localPuppeteer) {
        return await localPuppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    throw new Error("No browser provider found. Install 'puppeteer' for local dev.");
}
