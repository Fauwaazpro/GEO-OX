/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
        serverActions: {
            allowedOrigins: ['localhost:3000'],
        },
    },
    webpack: (config) => {
        config.externals.push({
            '@sparticuz/chromium': 'commonjs @sparticuz/chromium',
            'puppeteer-core': 'commonjs puppeteer-core',
        });
        return config;
    },
}

module.exports = nextConfig
