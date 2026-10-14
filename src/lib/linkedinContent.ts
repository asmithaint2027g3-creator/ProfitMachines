/**
 * src/lib/linkedinContent.ts
 * Enterprise LinkedIn Content Generation & Campaign Attribution Engine
 * Aligned with ProfitMachines core services, B2B tone, and emerald brand identity.
 */

export interface LinkedInPost {
    id: string;
    title: string;
    topic: string;
    serviceCategory: string;
    hook: string;
    body: string;
    ctaText: string;
    targetServicePath: string;
    campaignSlug: string;
    hashtags: string[];
    utmUrl: string;
    fullPostText: string;
    status: 'DRAFT' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED' | 'REJECTED';
    scheduledAt?: string;
    publishedAt?: string;
    linkedinPostUrn?: string;
    lastError?: string;
    createdAt: string;
    metrics?: {
        impressions?: number;
        clicks?: number;
        leadsGenerated?: number;
    };
}

const BASE_URL = 'https://profit-machines-1.vercel.app';

export function buildUtmUrl(path: string, campaign: string, postId: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(cleanPath, BASE_URL);
    url.searchParams.set('utm_source', 'linkedin');
    url.searchParams.set('utm_medium', 'company_page');
    url.searchParams.set('utm_campaign', campaign);
    url.searchParams.set('utm_content', postId);
    return url.toString();
}

export function formatFullPostText(data: {
    hook: string;
    body: string;
    ctaText: string;
    utmUrl: string;
    hashtags: string[];
}): string {
    return `${data.hook.trim()}

${data.body.trim()}

👉 ${data.ctaText.trim()}
${data.utmUrl}

${data.hashtags.map(h => (h.startsWith('#') ? h : `#${h}`)).join(' ')}`.trim();
}

/**
 * 6 Curated, high-converting launch posts derived from actual ProfitMachines services
 */
export const DEFAULT_LINKEDIN_POSTS: LinkedInPost[] = [
    {
        id: 'pm-li-001',
        title: 'Stop Chasing Cold Leads — Capture Active Buyer Intent',
        topic: 'AI Intent-Based Lead Generation',
        serviceCategory: 'ai-intent-lead-gen',
        hook: '92% of B2B buyers evaluate 4+ software solutions before ever filling out a contact form. By the time they contact you, the deal is already half-decided.',
        body: `Traditional outbound relies on stale lists and cold outreach. Modern revenue engines track live, in-market signals.

At ProfitMachines, our AI Intent Engine monitors real-time buyer signals across high-intent topics, account-level research surges, and digital engagement patterns.

Instead of cold pitching, your revenue team steps in at the exact moment prospects are actively evaluating solutions:
• Real-time account propensity scoring
• Automated firmographic qualification
• Zero wasted SDR hours on unreceptive accounts`,
        ctaText: 'Discover how ProfitMachines turns anonymous buyer intent into qualified enterprise pipeline:',
        targetServicePath: '/industries/ai-intent-lead-gen',
        campaignSlug: 'ai-intent-lead-gen',
        hashtags: ['#B2BGrowth', '#AIinSales', '#IntentData', '#DemandGen', '#ProfitMachines'],
        utmUrl: buildUtmUrl('/industries/ai-intent-lead-gen', 'ai-intent-lead-gen', 'pm-li-001'),
        fullPostText: '',
        status: 'DRAFT',
        createdAt: new Date().toISOString()
    },
    {
        id: 'pm-li-002',
        title: 'The Hidden Profit Leak in B2B Customer Acquisition',
        topic: 'AI Multi-Touch Attribution Engine',
        serviceCategory: 'ai-multi-touch-attribution',
        hook: 'Where is your last marketing dollar actually going? If you still rely on last-click attribution, you might be funding the wrong growth channels.',
        body: `Enterprise B2B buyer journeys now average 31 distinct touchpoints across 6 distinct executive stakeholders.

When you judge campaign success by the final click:
❌ Top-of-funnel thought leadership gets cut
❌ High-performing mid-funnel case studies are underfunded
❌ Ad budgets leak into vanity clicks

ProfitMachines Multi-Touch Attribution Engine uses algorithmic fractional credit to tie every single touchpoint back to actual closed ARR on your P&L.`,
        ctaText: 'Audit your revenue touchpoints and stop pipeline leakage with ProfitMachines:',
        targetServicePath: '/industries/ai-multi-touch-attribution',
        campaignSlug: 'attribution-engine',
        hashtags: ['#RevenueOperations', '#MarketingROI', '#AttributionEngine', '#CFOInsights', '#ProfitMachines'],
        utmUrl: buildUtmUrl('/industries/ai-multi-touch-attribution', 'attribution-engine', 'pm-li-002'),
        fullPostText: '',
        status: 'DRAFT',
        createdAt: new Date().toISOString()
    },
    {
        id: 'pm-li-003',
        title: 'Autonomous SDRs: 24/7 Lead Nurturing on Autopilot',
        topic: 'AI Lead Nurturing Autopilot',
        serviceCategory: 'ai-lead-nurturing-autopilot',
        hook: 'The average B2B lead response time is 42 hours. Studies show that responding within 5 minutes increases conversion by 391%.',
        body: `Your prospects don't wait for business hours. When an enterprise executive visits your solution page at 11 PM, traditional lead routing misses the moment.

ProfitMachines AI Lead Nurturing Autopilot deploys intelligent, context-aware agents that:
⚡ Engage inbounds in under 30 seconds
⚡ Qualify budget, timeline, and technical requirements
⚡ Automatically provision Jira follow-up tasks & sync CRM dossiers
⚡ Book executive discovery sessions directly into your calendar`,
        ctaText: 'See how autonomous lead acceleration works for modern enterprise teams:',
        targetServicePath: '/industries/ai-lead-nurturing-autopilot',
        campaignSlug: 'nurture-autopilot',
        hashtags: ['#SalesAutomation', '#AIinBusiness', '#SDR', '#PipelineVelocity', '#ProfitMachines'],
        utmUrl: buildUtmUrl('/industries/ai-lead-nurturing-autopilot', 'nurture-autopilot', 'pm-li-003'),
        fullPostText: '',
        status: 'DRAFT',
        createdAt: new Date().toISOString()
    },
    {
        id: 'pm-li-004',
        title: 'Dynamic ICP Matching: Score What Converts, Not What Sounds Good',
        topic: 'AI ICP Matching & Dynamic Scoring',
        serviceCategory: 'ai-icp-matching',
        hook: 'Is your Ideal Customer Profile a static PDF created two years ago? If so, your sales team is likely wasting 40% of their bandwidth.',
        body: `Market conditions shift weekly. True ICP definition is not a guessing game — it is a living algorithmic model.

With ProfitMachines AI ICP Matching:
🎯 Inbound accounts are continuously mapped against historical closed-won patterns
🎯 Propensity scores update dynamically as accounts expand or shift tech stacks
🎯 High-probability deals route immediately to senior architects, while non-fits are gently automated

Stop treating all leads equally. Focus your top closers where win rates exceed 60%.`,
        ctaText: 'Upgrade your deal scoring to machine-learning precision:',
        targetServicePath: '/industries/ai-icp-matching',
        campaignSlug: 'icp-dynamic-scoring',
        hashtags: ['#B2BSales', '#ICP', '#LeadScoring', '#SalesEfficiency', '#ProfitMachines'],
        utmUrl: buildUtmUrl('/industries/ai-icp-matching', 'icp-dynamic-scoring', 'pm-li-004'),
        fullPostText: '',
        status: 'DRAFT',
        createdAt: new Date().toISOString()
    },
    {
        id: 'pm-li-005',
        title: 'Enterprise Revenue Operations: Beyond Fragmented Tech Stacks',
        topic: 'AI Revenue Operations & Autonomous Infrastructure',
        serviceCategory: 'ai-revenue-operations',
        hook: 'The typical mid-market enterprise runs 14 separate revenue tools. Yet executives still struggle to answer: "What will our pipeline look like next quarter?"',
        body: `Tool sprawl creates data silos, inconsistent customer records, and blind spots across the sales cycle.

ProfitMachines unifies your revenue operations into an automated intelligence fabric:
• Direct bridge across Website telemetry, Airtable CRM, and Jira Cloud workflows
• Autonomous task generation with structured SDR subtasks
• Executive visibility across every conversion from first touch to signed contract`,
        ctaText: 'Explore our Enterprise AI Architecture and streamline your revenue engine:',
        targetServicePath: '/ai-revenue-operations',
        campaignSlug: 'rev-ops-infrastructure',
        hashtags: ['#RevOps', '#EnterpriseAI', '#SystemsArchitecture', '#ProfitMachines'],
        utmUrl: buildUtmUrl('/ai-revenue-operations', 'rev-ops-infrastructure', 'pm-li-005'),
        fullPostText: '',
        status: 'DRAFT',
        createdAt: new Date().toISOString()
    },
    {
        id: 'pm-li-006',
        title: 'Executive Diagnostic: How Much Revenue Is Leaking From Your Funnel?',
        topic: 'Revenue & Profit Diagnostic Audit',
        serviceCategory: 'audit',
        hook: 'Most enterprise leaders assume their conversion problem is top-of-funnel traffic. In 8 out of 10 audits we conduct, the real issue is mid-funnel leakage.',
        body: `Are you losing qualified enterprise pipeline to:
1. Slow inbound response lag?
2. Unmatched buyer intent signals?
3. Opaque attribution across marketing spend?

ProfitMachines offers an Executive Profit & Revenue Diagnostic to uncover bottlenecks across your acquisition, conversion, and operational workflows.`,
        ctaText: 'Claim a tailored Revenue Diagnostic Audit with our senior AI strategists:',
        targetServicePath: '/talk-to-expert',
        campaignSlug: 'diagnostic-audit',
        hashtags: ['#ExecutiveLeadership', '#ProfitOptimization', '#B2BAudit', '#ProfitMachines'],
        utmUrl: buildUtmUrl('/talk-to-expert', 'diagnostic-audit', 'pm-li-006'),
        fullPostText: '',
        status: 'DRAFT' as const,
        createdAt: new Date().toISOString()
    }
].map(post => ({
    ...post,
    fullPostText: formatFullPostText(post)
})) as LinkedInPost[];

const POSTS_STORAGE_KEY = 'pm_linkedin_posts_v1';

export function getStoredPosts(): LinkedInPost[] {
    if (typeof window === 'undefined') return DEFAULT_LINKEDIN_POSTS;
    try {
        const stored = localStorage.getItem(POSTS_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch {
        // Fallback
    }
    // Initialize with default posts
    saveStoredPosts(DEFAULT_LINKEDIN_POSTS);
    return DEFAULT_LINKEDIN_POSTS;
}

export function saveStoredPosts(posts: LinkedInPost[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    } catch {
        // Quota safety
    }
}

export function createNewDraft(data: {
    title: string;
    topic: string;
    serviceCategory: string;
    hook: string;
    body: string;
    ctaText: string;
    targetServicePath: string;
    campaignSlug: string;
    hashtags: string[];
}): LinkedInPost {
    const id = `pm-li-${Date.now().toString(36).slice(-5)}`;
    const utmUrl = buildUtmUrl(data.targetServicePath, data.campaignSlug, id);
    const post: LinkedInPost = {
        id,
        title: data.title,
        topic: data.topic,
        serviceCategory: data.serviceCategory,
        hook: data.hook,
        body: data.body,
        ctaText: data.ctaText,
        targetServicePath: data.targetServicePath,
        campaignSlug: data.campaignSlug,
        hashtags: data.hashtags,
        utmUrl,
        fullPostText: formatFullPostText({ ...data, utmUrl }),
        status: 'DRAFT',
        createdAt: new Date().toISOString()
    };
    const current = getStoredPosts();
    const updated = [post, ...current];
    saveStoredPosts(updated);
    return post;
}
