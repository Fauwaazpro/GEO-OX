
// Utility to get the correct browser instance (Local vs Vercel)
// We use dynamic imports for Vercel deps to prevent local crashes when packages are missing
import { type Browser } from 'puppeteer';

let localPuppeteer: any = null;
try {
    // Try to start with local puppeteer if available
    localPuppeteer = require('puppeteer');
} catch (e) {
    console.warn("Local puppeteer not found");
}

export async function getBrowser() {
    const isProduction = process.env.NODE_ENV === 'production';
    const isVercel = !!process.env.VERCEL_URL || !!process.env.NEXT_PUBLIC_VERCEL_URL;

    // 1. Production (Vercel) -> Use puppeteer-core + @sparticuz/chromium
    // We use dynamic imports so this doesn't break local dev if packages are missing
    if (isProduction || isVercel) {
        try {
             console.log("Launching Vercel/Core Browser...");
             // Dynamically import to avoid "Module not found" locally
             const chromium = (await import('@sparticuz/chromium')).default;
             const core = (await import('puppeteer-core')).default;

             chromium.setGraphicsMode = false;
             
             return await core.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless === 'true' ? true : chromium.headless,
                ignoreHTTPSErrors: true,
            });
        } catch (error) {
            console.error("Failed to launch Vercel browser:", error);
            throw error;
        }
    } 
    
    // 2. Local Development -> Use full Puppeteer
    if (localPuppeteer) {
        console.log("Launching Local Puppeteer...");
        return await localPuppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    throw new Error("No browser provider found. Install 'puppeteer' for local dev.");
}
