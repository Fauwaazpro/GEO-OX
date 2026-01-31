import {
    Shield, Code2, Gauge, Smartphone, Link as LinkIcon,
    Sparkles, BarChart3, FileText, MessageSquare, Network,
    Quote, GitBranch, Search, Eye, Copy, Key, Cpu, Lock
} from "lucide-react"

export const TOOLS = [
    // Phase A: Technical & Vitals
    {
        id: 'vitals-fixer',
        slug: 'vitals-fixer',
        name: 'Vitals Fixer Pro',
        description: 'Auto-fix Core Web Vitals (LCP, CLS, INP) issues',
        category: 'infrastructure',
        icon: 'Gauge',
        benefits: [
            'Automatically identifies LCP, CLS, and INP bottlenecks',
            'Generates code snippets to fix rendering issues',
            'Simulates mobile and desktop performance scores',
            'Prioritizes fixes based on potential ROI'
        ]
    },
    {
        id: 'link-fixer',
        slug: 'link-fixer',
        name: 'Link Fixer (404 Resolver)',
        description: 'Find broken links and auto-generate redirects',
        category: 'infrastructure',
        icon: 'Link',
        benefits: [
            'Crawls site to find 404 and broken internal links',
            'Auto-generates .htaccess or Nginx redirect rules',
            'Preserves link equity by fixing dead ends',
            'improves user experience and crawl budget'
        ]
    },
    {
        id: 'mobile-auditor',
        slug: 'mobile-auditor',
        name: 'Mobile Auditor',
        description: 'Deep mobile-first usability verification',
        category: 'infrastructure',
        icon: 'Smartphone',
        benefits: [
            'Verifies touch targets and viewport settings',
            'Checks for mobile-specific rendering issues',
            'Ensures responsive design consistency',
            'Validated against Google Mobile-Friendly standards'
        ]
    },
    {
        id: 'schema-generator',
        slug: 'schema-generator',
        name: 'Schema Generator',
        description: 'Create JSON-LD structural data for rich snippets',
        category: 'infrastructure',
        icon: 'Code2',
        benefits: [
            'Generates valid JSON-LD for Articles, FAQs, and Products',
            'Increases chances of winning rich snippets',
            'Helps search engines understand content context',
            'Easy copy-paste implementation'
        ]
    },
    {
        id: 'technical-readiness',
        slug: 'technical-readiness',
        name: 'Technical Readiness Check',
        description: 'Server response and security header analysis',
        category: 'infrastructure',
        icon: 'Shield',
        benefits: [
            'Checks SSL, HSTS, and security headers',
            'Analyzes server response times (TTFB)',
            'Identifies mixed content issues',
            'Ensures solid technical foundation for SEO'
        ]
    },

    // Phase B: AI & Semantics
    {
        id: 'ai-content-scorer',
        slug: 'ai-content-scorer',
        name: 'AI Content Scorer',
        description: 'Rate content helpfulness against Google Guidelines',
        category: 'ai-semantic',
        icon: 'Sparkles',
        benefits: [
            'Scores content based on E-E-A-T principles',
            'Highlights generic or unhelpful sections',
            'Suggestions to add unique value and insights',
            'Aligns content with Helpful Content System goals'
        ]
    },
    {
        id: 'llms-txt-generator',
        slug: 'llms-txt-generator',
        name: 'LLMS.txt Generator',
        description: 'Create standard file for LLM crawling',
        category: 'ai-semantic',
        icon: 'FileText',
        benefits: [
            'Generates /llms.txt file for AI bots',
            'Controls which AI models access your content',
            'Provides structured context to Large Language Models',
            'Future-proofs site for AI-driven search'
        ]
    },
    {
        id: 'ai-citation-checker',
        slug: 'ai-citation-checker',
        name: 'AI Citation Checker',
        description: 'Verify probability of carrying citations in AI results',
        category: 'ai-semantic',
        icon: 'BarChart3',
        benefits: [
            'Estimates likelihood of being cited by chatbots',
            'Analyzes brand authority signals',
            'Checks for citation-friendly content structure',
            'Monitors brand mentions in AI-generated answers'
        ]
    },
    {
        id: 'answer-first-structure',
        slug: 'answer-first-structure',
        name: 'Answer-First Structure Tool',
        description: 'Optimize content for answer engines with AI rewriting',
        category: 'ai-semantic',
        icon: 'MessageSquare',
        benefits: [
            'Structures content to directly answer user queries',
            'Increases chances of winning Featured Snippets',
            'Optimizes for voice search and direct answers',
            'Improves user engagement by delivering value fast'
        ]
    },
    {
        id: 'semantic-seo-mapper',
        slug: 'semantic-seo-mapper',
        name: 'Semantic SEO Mapper',
        description: 'Find missing entities compared to top competitors',
        category: 'ai-semantic',
        icon: 'Network',
        benefits: [
            'Identifies missing topical entities in your content',
            'Compares your entity coverage against top competitors',
            'Enhances topical authority and relevance',
            'Helps search engines connect your content to broader topics'
        ]
    },
    {
        id: 'citation-authority-builder',
        slug: 'citation-authority-builder',
        name: 'Citation Authority Builder',
        description: 'Identify unlinked brand mentions across your site',
        category: 'ai-semantic',
        icon: 'Quote',
        benefits: [
            'Turns unlinked mentions into valuable backlinks',
            'Strengthens brand authority and recognition',
            'Finds missed opportunities for internal linking',
            'Consolidates brand signals for search engines'
        ]
    },
    {
        id: 'authority-checker',
        slug: 'authority-checker',
        name: 'Authority Checker (Topic Map)',
        description: 'Visualize topic clusters and find orphan pages',
        category: 'ai-semantic',
        icon: 'GitBranch',
        benefits: [
            'Visualizes internal linking and topic clusters',
            'Identifies orphan pages that need internal links',
            'Ensures link juice flows efficiently across the site',
            'Helps plan a logical content hierarchy'
        ]
    },

    // Phase C: Content & Audit
    {
        id: 'general-audit',
        slug: 'general-audit',
        name: 'General Audit & Gap Analysis',
        description: 'Comprehensive competitor comparison for content gaps',
        category: 'content-audit',
        icon: 'Search',
        benefits: [
            'Reveals content gaps your competitors are exploiting',
            'Provides a comprehensive checklist for site improvement',
            'Analyzes on-page SEO factors in depth',
            'Prioritizes fixes based on potential impact'
        ]
    },
    {
        id: 'linking-suggester',
        slug: 'linking-suggester',
        name: 'Linking Suggester',
        description: 'AI-powered internal linking recommendations',
        category: 'content-audit',
        icon: 'LinkIcon',
        benefits: [
            'Suggests relevant internal links powered by AI',
            'Improves site structure and crawlability',
            'Increases time on site by guiding users to related content',
            'Distributes page authority to new articles'
        ]
    },
    {
        id: 'serp-previewer',
        slug: 'serp-previewer',
        name: 'SERP Previewer (Multi-Modal)',
        description: 'See how your metadata looks across platforms',
        category: 'content-audit',
        icon: 'Eye',
        benefits: [
            'Previews search listings on Google, Bing, and Socials',
            'Optimizes CTR with compelling titles and descriptions',
            'Simulates mobile and desktop search storage',
            'Ensures metadata is not truncated in results'
        ]
    },
    {
        id: 'duplicate-finder',
        slug: 'duplicate-finder',
        name: 'Duplicate Content Finder',
        description: 'Detect duplicate content and get canonical suggestions',
        category: 'content-audit',
        icon: 'Copy',
        benefits: [
            'Identifies internal duplicate content issues',
            'Suggests correct canonical tags to resolve conflicts',
            'Prevents keyword cannibalization',
            'Consolidates ranking signals to preferred pages'
        ]
    },
    {
        id: 'lsi-keyword-tool',
        slug: 'lsi-keyword-extractor',
        name: 'LSI Keyword Extractor',
        description: 'Extract and analyze LSI keywords vs competitors',
        category: 'content-audit',
        icon: 'Key',
        benefits: [
            'Discovers semantically related keywords (LSI)',
            'Improves content relevance for broader rankings',
            'Analyzes competitor keyword usage patterns',
            'Helps write more natural, authoritative content'
        ]
    },
    {
        id: 'js-rendering-checker',
        slug: 'js-rendering-checker',
        name: 'JavaScript Rendering Checker',
        description: 'Verify content visibility without JavaScript',
        category: 'infrastructure',
        icon: 'Cpu',
        benefits: [
            'Checks if content is visible when JS is disabled',
            'Diagnoses rendering issues for search bots',
            'Ensures critical content is indexed by all crawlers',
            'Validates progressive enhancement implementation'
        ]
    },
]

export const CATEGORIES = {
    infrastructure: {
        name: 'Infrastructure & Technical',
        description: 'Core technical SEO and performance optimization',
        color: 'from-blue-500 to-cyan-500',
    },
    'ai-semantic': {
        name: 'AI & Semantic Optimization',
        description: 'GEO tools for AI search engines and LLMs',
        color: 'from-purple-500 to-pink-500',
    },
    'content-audit': {
        name: 'Content & Audit',
        description: 'Content analysis and gap identification',
        color: 'from-emerald-500 to-teal-500',
    },
}

export const FREE_TOOL_LIMIT = 3

export const PRICING = {
    free: {
        name: 'Free',
        price: 0,
        features: [
            '3 tools of your choice',
            'Basic analytics',
            'Community support',
        ],
    },
    pro: {
        name: 'Pro',
        price: 49,
        features: [
            'All 18 tools',
            'Unlimited usage',
            'Advanced analytics',
            'Priority support',
            'API access',
        ],
    },
    enterprise: {
        name: 'Enterprise',
        price: 'Custom',
        features: [
            'Everything in Pro',
            'Custom integrations',
            'Dedicated account manager',
            'SLA guarantee',
            'White-label option',
        ],
    },
}
