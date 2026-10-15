import { solutionsVerticalsData, GrowthVertical } from '../data/solutionsVerticalsData';
import { industriesData, IndustryBlueprint } from '../data/industriesData';
import { offeringsIntelligence, OfferingDetailContent } from '../data/offeringsIntelligenceData';

export interface ActionButton {
    label: string;
    action: 'quick_form' | 'long_form' | 'whatsapp' | 'navigate' | 'lead_card';
    target?: string;
}

export interface PageContextData {
    contextKey: string;
    route: string;
    pageType: 'industry' | 'vertical' | 'offering' | 'solution' | 'pricing' | 'consultation' | 'outcomes' | 'analytics' | 'general';
    title: string;
    parentIndustry?: string;
    selectedVertical?: string;
    relevantOffering?: string;
    mainHeading: string;
    summary: string;
    suggestedQuestions: string[];
    relevantLinks: Array<{ label: string; url: string }>;
}

export interface KnowledgeRecord {
    id: string;
    title: string;
    category: 'vertical' | 'industry' | 'offering' | 'solution' | 'pricing' | 'company' | 'booking';
    keywords: string[];
    summary: string;
    capabilities: string[];
    kpis: string[];
    url: string;
    relevanceWeight?: number;
}

const offeringsList: OfferingDetailContent[] = Object.values(offeringsIntelligence);

// ─────────────────────────────────────────────────────────────────────────────
// 1. PAGE CONTEXT DETECTOR
// ─────────────────────────────────────────────────────────────────────────────

export function getPageContext(pathname: string, hash: string = ''): PageContextData {
    const cleanPath = pathname.toLowerCase();
    const cleanHash = hash.toLowerCase().replace('#', '');

    // 1. Specific Vertical deep links (e.g. /solutions#b2b-growth-intelligence)
    if (cleanPath.startsWith('/solutions')) {
        const matchedVertical = solutionsVerticalsData.find(
            v => v.slug === cleanHash || cleanHash.includes(v.id) || cleanHash === v.id
        );

        if (matchedVertical) {
            return {
                contextKey: `vertical-${matchedVertical.slug}`,
                route: `/solutions#${matchedVertical.slug}`,
                pageType: 'vertical',
                title: matchedVertical.name,
                selectedVertical: matchedVertical.name,
                mainHeading: `${matchedVertical.name} Growth Solutions`,
                summary: matchedVertical.tagline,
                suggestedQuestions: [
                    `How do you solve "${matchedVertical.challenges[0]?.title || 'conversion bottlenecks'}"?`,
                    `What capabilities are in ${matchedVertical.name}?`,
                    `Which KPIs do you measure for this vertical?`,
                    `Book Consultation for ${matchedVertical.name}`
                ],
                relevantLinks: [
                    { label: matchedVertical.name, url: `/solutions#${matchedVertical.slug}` },
                    { label: 'All 7 Verticals', url: '/solutions#verticals' },
                    { label: 'Book Consultation', url: '/book-consultation' }
                ]
            };
        }

        // Generic Solutions Overview
        return {
            contextKey: 'solutions',
            route: '/solutions',
            pageType: 'solution',
            title: 'AI Revenue Solutions & Verticals',
            mainHeading: 'Growth Strategies Built Around Your Industry',
            summary: 'ProfitMachines provides modular revenue engines, 7 industry growth verticals, and automated commercial intelligence architectures.',
            suggestedQuestions: [
                'Explain the 7 Industry Growth Verticals',
                'What is the Autonomous SDR Pilot?',
                'How does dark funnel intent radar work?',
                'Book Solutions Architecture Review'
            ],
            relevantLinks: [
                { label: 'Industry Verticals Explorer', url: '/solutions#verticals' },
                { label: 'Autonomous Sales Pilot', url: '/solutions#ai-auto-sales-pilot' },
                { label: 'Revenue Operations', url: '/solutions#ai-revenue-operations' },
                { label: 'Book Consultation', url: '/book-consultation' }
            ]
        };
    }

    // 2. Specific Industry deep links (e.g. /industries#manufacturing or /industries/manufacturing)
    if (cleanPath.startsWith('/industries')) {
        const matchedIndustry = industriesData.find(
            ind => ind.slugId === cleanHash || ind.aliases.includes(cleanHash) || cleanPath.includes(ind.slugId)
        );

        if (matchedIndustry) {
            return {
                contextKey: `industry-${matchedIndustry.slugId}`,
                route: `/industries#${matchedIndustry.slugId}`,
                pageType: 'industry',
                title: matchedIndustry.categoryLabel,
                parentIndustry: matchedIndustry.categoryLabel,
                mainHeading: matchedIndustry.title,
                summary: matchedIndustry.tagline,
                suggestedQuestions: [
                    `How does ProfitMachines help ${matchedIndustry.categoryLabel}?`,
                    `What are the typical conversion bottlenecks in ${matchedIndustry.categoryLabel}?`,
                    `Which KPIs do you track for ${matchedIndustry.categoryLabel}?`,
                    `Discuss ${matchedIndustry.categoryLabel} Architecture`
                ],
                relevantLinks: [
                    { label: `${matchedIndustry.categoryLabel} Blueprint`, url: `/industries#${matchedIndustry.slugId}` },
                    { label: 'All Industries Directory', url: '/industries' },
                    { label: 'Book Industry Consultation', url: '/book-consultation' }
                ]
            };
        }

        // Generic Industries Directory
        return {
            contextKey: 'industries',
            route: '/industries',
            pageType: 'industry',
            title: 'Industry Growth Blueprints',
            mainHeading: 'Domain-Specialized Commercial Intelligence',
            summary: 'ProfitMachines provides tailored revenue blueprints across 10 major industry categories including SaaS, Manufacturing, FinTech, and B2B Services.',
            suggestedQuestions: [
                'Which industries do you specialize in?',
                'How does your approach differ by industry?',
                'What KPIs do you track for enterprise clients?',
                'Talk to an Industry Specialist'
            ],
            relevantLinks: [
                { label: 'B2B & Professional Services', url: '/industries#b2b-services' },
                { label: 'Manufacturing & Industrial', url: '/industries#manufacturing' },
                { label: 'SaaS & Cloud Platforms', url: '/industries#saas' },
                { label: 'Financial Services & FinTech', url: '/industries#fintech' }
            ]
        };
    }

    // 3. Offerings Pages & Detail routes (e.g. /offerings, /offerings/b2b/market-discovery)
    if (cleanPath.startsWith('/offerings')) {
        const matchedOffering = offeringsList.find(
            (off: OfferingDetailContent) => cleanPath.includes(off.id) || cleanHash.includes(off.id)
        );

        if (matchedOffering) {
            return {
                contextKey: `offering-${matchedOffering.id}`,
                route: `/offerings/${matchedOffering.type}/${matchedOffering.id}`,
                pageType: 'offering',
                title: matchedOffering.title,
                relevantOffering: matchedOffering.title,
                mainHeading: matchedOffering.heroHeadline,
                summary: matchedOffering.heroDescription,
                suggestedQuestions: [
                    `What business problem does ${matchedOffering.title} solve?`,
                    `Who is the Ideal Customer Profile (ICP) for this?`,
                    `What are the key capabilities and deliverables?`,
                    `Schedule a Discovery Briefing`
                ],
                relevantLinks: [
                    { label: matchedOffering.title, url: `/offerings/${matchedOffering.type}/${matchedOffering.id}` },
                    { label: 'All Offerings Catalog', url: '/offerings' },
                    { label: 'Quick Diagnostic Form', url: '/book-consultation' }
                ]
            };
        }

        // Generic Offerings Overview
        return {
            contextKey: 'offerings',
            route: '/offerings',
            pageType: 'offering',
            title: 'Profit Pool Discovery & Offerings Catalog',
            mainHeading: '14 Precision Commercial Intelligence Engagements',
            summary: 'Comprehensive B2B & B2C growth discovery frameworks covering Market Discovery, Demand Sensing, Value Architecture, Channel Expansion, and PMF validation.',
            suggestedQuestions: [
                'What is Profit Pool Discovery?',
                'Compare B2B Market Discovery vs Demand Radar',
                'Which offering is best for early-stage validation?',
                'Request Tailored Service Proposal'
            ],
            relevantLinks: [
                { label: 'B2B Market Discovery', url: '/offerings/b2b/market-discovery' },
                { label: 'B2B Demand Radar', url: '/offerings/b2b/demand-discovery' },
                { label: 'B2C Discovery Suite', url: '/offerings/b2c/market-discovery' },
                { label: 'Book Diagnostic Call', url: '/book-consultation' }
            ]
        };
    }

    // 4. Pricing
    if (cleanPath.startsWith('/pricing')) {
        return {
            contextKey: 'pricing',
            route: '/pricing',
            pageType: 'pricing',
            title: 'Pricing & Engagement Tiers',
            mainHeading: 'Transparent, ROI-Driven Commercial Tiers',
            summary: 'Flexible engagement architectures from Starter ($2,500/mo) to Growth ($5,000/mo) and custom Enterprise setups.',
            suggestedQuestions: [
                'What is included in Starter ($2,500/mo)?',
                'What makes the Growth Tier ($5,000/mo) most popular?',
                'How is custom Enterprise pricing structured?',
                'Schedule a Pricing Review Call'
            ],
            relevantLinks: [
                { label: 'Pricing Overview', url: '/pricing' },
                { label: 'Book Consultation', url: '/book-consultation' },
                { label: 'Talk to Expert', url: '/talk-to-expert' }
            ]
        };
    }

    // 5. Outcomes & Case Studies
    if (cleanPath.startsWith('/outcomes')) {
        return {
            contextKey: 'outcomes',
            route: '/outcomes',
            pageType: 'outcomes',
            title: 'Verified Financial Outcomes & Benchmarks',
            mainHeading: '4.2× Pipeline Velocity & 68% Lower CAC',
            summary: 'Grounded enterprise metrics: 3.1× win rate increase and 92% reduction in manual RevOps hours across verified enterprise cohorts.',
            suggestedQuestions: [
                'How do you achieve 4.2× pipeline velocity?',
                'What drives the 68% CAC reduction?',
                'Can you share a B2B SaaS case study?',
                'Request an ROI Benchmark Audit'
            ],
            relevantLinks: [
                { label: 'Verified Outcomes', url: '/outcomes' },
                { label: 'Book Consultation', url: '/book-consultation' },
                { label: 'Solutions Architecture', url: '/solutions' }
            ]
        };
    }

    // 6. DemandPulse Intent Engine
    if (cleanPath.startsWith('/demand-pulse')) {
        return {
            contextKey: 'demand-pulse',
            route: '/demand-pulse',
            pageType: 'solution',
            title: 'DemandPulse AI™ Buyer Intent Radar',
            mainHeading: 'Dark-Funnel Intent Sensing & Account Telemetry',
            summary: 'Surveillance of anonymous buyer committee signals, technographic shifts, and hiring surges before RFPs are issued.',
            suggestedQuestions: [
                'How does dark funnel intent radar work?',
                'What buying signals trigger SDR action?',
                'Can DemandPulse integrate with HubSpot or Salesforce?',
                'Request a Live Intent Demo'
            ],
            relevantLinks: [
                { label: 'DemandPulse Engine', url: '/demand-pulse' },
                { label: 'Book Live Demo', url: '/book-consultation' },
                { label: 'Talk to Expert', url: '/talk-to-expert' }
            ]
        };
    }

    // 7. Consultation & Booking
    if (cleanPath.startsWith('/book-consultation') || cleanPath.startsWith('/talk-to-expert')) {
        return {
            contextKey: 'consultation',
            route: '/book-consultation',
            pageType: 'consultation',
            title: 'Book a Growth Consultation',
            mainHeading: 'Direct Calendar Access & Architecture Briefing',
            summary: 'Schedule a 30-minute strategic briefing with ProfitMachines revenue architects to inspect pipeline bottlenecks and profit pools.',
            suggestedQuestions: [
                'What happens during the 30-minute consultation?',
                'What preparation or data is required?',
                'Can I book a calendar slot right here?',
                'Chat on WhatsApp (+91 9513088611)'
            ],
            relevantLinks: [
                { label: 'Calendar Booking Widget', url: '/book-consultation' },
                { label: 'Talk to Expert', url: '/talk-to-expert' }
            ]
        };
    }

    // 9. Default Homepage
    return {
        contextKey: 'home',
        route: '/',
        pageType: 'general',
        title: 'ProfitMachines Autonomous Revenue OS',
        mainHeading: 'Autonomous Revenue Infrastructure for Enterprise Growth',
        summary: 'ProfitMachines helps high-growth companies identify profit pools, deploy autonomous sales pilots, and optimize conversion with domain-level intelligence.',
        suggestedQuestions: [
            'What is ProfitMachines and how does it work?',
            'Which industries do you support?',
            'What are the 7 Industry Growth Verticals?',
            'Book an Architecture Consultation'
        ],
        relevantLinks: [
            { label: 'Industry Verticals', url: '/solutions#verticals' },
            { label: 'Offerings Catalog', url: '/offerings' },
            { label: 'Verified Outcomes', url: '/outcomes' },
            { label: 'Book Consultation', url: '/book-consultation' }
        ]
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. STRUCTURED KNOWLEDGE INDEX BUILDER
// ─────────────────────────────────────────────────────────────────────────────

let cachedKnowledgeIndex: KnowledgeRecord[] | null = null;

export function getKnowledgeIndex(): KnowledgeRecord[] {
    if (cachedKnowledgeIndex) return cachedKnowledgeIndex;

    const records: KnowledgeRecord[] = [];

    // A. Index 7 Solutions Verticals
    solutionsVerticalsData.forEach((vert: GrowthVertical) => {
        records.push({
            id: `vertical-${vert.slug}`,
            title: vert.name,
            category: 'vertical',
            keywords: [
                vert.name.toLowerCase(),
                vert.slug,
                ...vert.targetAudience.examples.map((s: string) => s.toLowerCase()),
                ...vert.capabilities.map((c) => c.title.toLowerCase()),
                ...vert.kpis.map((k) => k.name.toLowerCase())
            ],
            summary: `${vert.name}: ${vert.tagline} Target: ${vert.targetAudience.headline}`,
            capabilities: vert.capabilities.map((c) => `${c.title}: ${c.description} (Value: ${c.expectedBusinessValue})`),
            kpis: vert.kpis.map((k) => `${k.name} (${k.benchmark || 'Target'}): ${k.explanation}`),
            url: `/solutions#${vert.slug}`,
            relevanceWeight: 1.2
        });
    });

    // B. Index 10 Industry Blueprints
    industriesData.forEach((ind: IndustryBlueprint) => {
        records.push({
            id: `industry-${ind.slugId}`,
            title: ind.categoryLabel,
            category: 'industry',
            keywords: [
                ind.categoryLabel.toLowerCase(),
                ind.slugId,
                ...ind.aliases,
                ...ind.challenges.map((c: string) => c.toLowerCase()),
                ...ind.kpis.map((k) => k.label.toLowerCase())
            ],
            summary: `${ind.categoryLabel} Blueprint: ${ind.tagline}. ${ind.description}`,
            capabilities: ind.solutions.map((s) => `${s.title}: ${s.modules.join(', ')}`),
            kpis: ind.kpis.map((k) => `${k.label}: ${k.value} (${k.desc})`),
            url: `/industries#${ind.slugId}`,
            relevanceWeight: 1.1
        });
    });

    // C. Index 14 Core Offerings
    offeringsList.forEach((off: OfferingDetailContent) => {
        records.push({
            id: `offering-${off.id}`,
            title: off.title,
            category: 'offering',
            keywords: [
                off.title.toLowerCase(),
                off.id,
                off.type,
                ...off.whatItAchieves.map((w: string) => w.toLowerCase()),
                ...off.keyCapabilities.map((k) => k.title.toLowerCase())
            ],
            summary: `${off.title} (${off.code}): ${off.heroHeadline}. Problem: ${off.businessProblem}`,
            capabilities: off.keyCapabilities.map((k) => `${k.title}: ${k.desc}`),
            kpis: off.statCards.map((s) => `${s.label}: ${s.value} (${s.subtitle})`),
            url: `/offerings/${off.type}/${off.id}`,
            relevanceWeight: 1.0
        });
    });

    // D. Core Pricing & Platform Architecture Records
    records.push({
        id: 'pricing-tiers',
        title: 'Pricing & Engagement Tiers',
        category: 'pricing',
        keywords: ['pricing', 'cost', 'tier', 'starter', 'growth', 'enterprise', 'subscription', 'fee'],
        summary: 'Starter Tier ($2,500/mo): Dynamic ICP discovery, demand sensing & market telemetry. Growth Tier ($5,000/mo - Most Popular): Autonomous SDR pilot, multi-channel cadences, pipeline acceleration. Enterprise Tier (Custom Architecture): Bespoke multi-agent swarms, complete RevOps architecture, dedicated principal architect.',
        capabilities: [
            'Starter: Full ICP analysis, target audience mapping, 50 validated monthly buyer signals',
            'Growth: Autonomous outbound email/LinkedIn pilot, 120+ qualified conversations, weekly sprint reviews',
            'Enterprise: Dedicated private LLM orchestration, custom CRM telemetry, bespoke SLA'
        ],
        kpis: [
            'Starter: 3-5× estimated pipeline ROI',
            'Growth: 4.2× pipeline velocity benchmark',
            'Enterprise: 68% lower blended customer acquisition cost'
        ],
        url: '/pricing',
        relevanceWeight: 1.3
    });

    records.push({
        id: 'consultation-process',
        title: 'Strategic Consultation & Architecture Briefing',
        category: 'booking',
        keywords: ['consultation', 'book', 'call', 'meeting', 'schedule', 'talk to expert', 'calendar', 'advisory'],
        summary: 'ProfitMachines provides direct 30-minute executive architecture consultations led by principal growth strategists. Sessions diagnose value leakage across marketing, sales, and RevOps, followed by an actionable Profit Roadmap.',
        capabilities: [
            'Diagnostic assessment of revenue bottlenecks',
            'TAM & dark-funnel opportunity review',
            'Custom Autonomous Pilot roadmap recommendation'
        ],
        kpis: ['Average response time: Under 15 minutes', 'Consultation duration: 30 minutes'],
        url: '/book-consultation',
        relevanceWeight: 1.4
    });

    records.push({
        id: 'verified-outcomes',
        title: 'Verified Financial Outcomes',
        category: 'company',
        keywords: ['outcomes', 'results', 'roi', 'cac', 'velocity', 'case study', 'benchmarks'],
        summary: 'Across enterprise deployments, ProfitMachines delivers verified benchmark improvements: 4.2× average pipeline velocity, 68% lower customer acquisition cost (CAC), 3.1× increase in deal win rate, and 92% reduction in manual RevOps hours.',
        capabilities: [
            'Data-backed attribution modeling',
            'Multi-touch funnel forensics',
            'Conversion leak elimination'
        ],
        kpis: [
            'Pipeline Velocity: 4.2× average lift',
            'CAC Reduction: 68% decrease',
            'Win Rate: 3.1× improvement'
        ],
        url: '/outcomes',
        relevanceWeight: 1.1
    });

    cachedKnowledgeIndex = records;
    return records;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. GROUNDED SEARCH & RETRIEVAL ENGINE
// ─────────────────────────────────────────────────────────────────────────────

export interface KnowledgeSearchResult {
    records: KnowledgeRecord[];
    formattedContext: string;
}

export function searchKnowledge(query: string, currentContext?: PageContextData): KnowledgeSearchResult {
    const index = getKnowledgeIndex();
    const queryTokens = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length > 2);

    if (queryTokens.length === 0) {
        // Return default context based on current page
        const relevant = index.slice(0, 3);
        return {
            records: relevant,
            formattedContext: formatRecordsForPrompt(relevant)
        };
    }

    // Score records based on token match and current context boost
    const scored = index.map(record => {
        let score = 0;
        const recordText = `${record.title} ${record.summary} ${record.capabilities.join(' ')} ${record.kpis.join(' ')}`.toLowerCase();

        queryTokens.forEach(token => {
            if (record.title.toLowerCase().includes(token)) score += 10;
            if (record.keywords.some(k => k.includes(token))) score += 6;
            if (recordText.includes(token)) score += 3;
        });

        // Boost record if it matches current page context
        if (currentContext) {
            if (currentContext.pageType === 'vertical' && record.category === 'vertical') score += 4;
            if (currentContext.pageType === 'industry' && record.category === 'industry') score += 4;
            if (currentContext.pageType === 'offering' && record.category === 'offering') score += 4;
            if (currentContext.pageType === 'pricing' && record.category === 'pricing') score += 5;
            if (currentContext.route.includes(record.url)) score += 6;
        }

        score *= (record.relevanceWeight || 1.0);
        return { record, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const topMatches = scored.filter(s => s.score > 0).slice(0, 4).map(s => s.record);

    // If no strong matches, fallback to 2 generic + current page context
    const finalRecords = topMatches.length > 0 ? topMatches : index.slice(0, 3);

    return {
        records: finalRecords,
        formattedContext: formatRecordsForPrompt(finalRecords)
    };
}

function formatRecordsForPrompt(records: KnowledgeRecord[]): string {
    return records.map((r, i) => {
        return `[Source ${i + 1}: ${r.title} (${r.url})]
Category: ${r.category}
Summary: ${r.summary}
Capabilities:
- ${r.capabilities.slice(0, 3).join('\n- ')}
KPIs:
- ${r.kpis.slice(0, 3).join('\n- ')}`;
    }).join('\n\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CLIENT-SIDE GROUNDED RESPONSE SYNTHESIS (FALLBACK & OFFLINE)
// ─────────────────────────────────────────────────────────────────────────────

export function generateGroundedAnswer(
    userText: string,
    currentContext: PageContextData
): { text: string; actions?: ActionButton[]; matchedItems: string[] } {
    const q = userText.toLowerCase().trim();
    const searchRes = searchKnowledge(userText, currentContext);
    const topRecord = searchRes.records[0];

    // Intent 1: Booking / Consultation
    if (q.includes('book') || q.includes('consult') || q.includes('schedule') || q.includes('meeting') || q.includes('calendar') || q.includes('briefing')) {
        return {
            text: `We'd be glad to arrange a 30-minute strategic architecture session with our revenue leadership team.\n\nYou can submit a quick inquiry directly here in this chat, or open our live Google Calendar to pick a dedicated time slot:`,
            actions: [
                { label: '⚡ Submit In-Chat Inquiry', action: 'lead_card' },
                { label: '📅 Open Google Calendar', action: 'navigate', target: '/book-consultation' },
                { label: '💬 WhatsApp Direct (+91 9513088611)', action: 'whatsapp' }
            ],
            matchedItems: ['Consultation Booking Desk']
        };
    }

    // Intent 2: Pricing / Costs / Tiers
    if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('tier') || q.includes('rate') || q.includes('how much')) {
        return {
            text: `ProfitMachines operates with transparent, value-aligned commercial tiers:\n\n• **Starter ($2,500/mo)**: Dynamic ICP discovery, demand sensing & market telemetry.\n• **Growth ($5,000/mo — Most Popular)**: Autonomous SDR pilot, multi-channel cadences, pipeline acceleration.\n• **Enterprise (Custom)**: Bespoke multi-agent swarms, complete RevOps architecture, dedicated principal architect.\n\nWould you like a tailored scope review or quick inquiry?`,
            actions: [
                { label: '⚡ Request Custom Quote', action: 'lead_card' },
                { label: '📅 View Full Pricing', action: 'navigate', target: '/pricing' }
            ],
            matchedItems: ['Pricing & Engagement Tiers']
        };
    }

    // Intent 3: WhatsApp / Phone / Immediate contact
    if (q.includes('whatsapp') || q.includes('phone') || q.includes('number') || q.includes('call you') || q.includes('chat on whatsapp')) {
        return {
            text: `You can reach ProfitMachines directly via:\n\n• **Direct WhatsApp Sales**: [+91 9513088611](https://wa.me/919513088611)\n• **Executive Calendar**: [/book-consultation](/book-consultation)\n• **Priority Email**: support@profitmachines.com\n\nOr submit your requirement right here in this chat window.`,
            actions: [
                { label: '💬 Chat on WhatsApp', action: 'whatsapp' },
                { label: '⚡ Submit Inquiry Here', action: 'lead_card' }
            ],
            matchedItems: ['Direct Sales Line']
        };
    }

    // Intent 4: Matched specific vertical or industry from the knowledge index
    if (topRecord) {
        const capabilitySnippets = topRecord.capabilities.slice(0, 3).map(c => `• **${c.split(':')[0]}**: ${c.split(':')[1] || ''}`).join('\n');
        const kpiSnippets = topRecord.kpis.slice(0, 3).map(k => `📈 ${k}`).join('\n');

        let answer = `Based on ProfitMachines' **[${topRecord.title}](${topRecord.url})** framework:\n\n${topRecord.summary}\n\n**Key Capabilities & Solutions:**\n${capabilitySnippets}`;

        if (topRecord.kpis.length > 0) {
            answer += `\n\n**Measured KPIs & Benchmarks:**\n${kpiSnippets}`;
        }

        answer += `\n\nYou can explore the full blueprint at [${topRecord.title}](${topRecord.url}), or speak with an executive growth architect:`;

        return {
            text: answer,
            actions: [
                { label: `🔗 View ${topRecord.title}`, action: 'navigate', target: topRecord.url },
                { label: '⚡ Book Strategy Review', action: 'lead_card' },
                { label: '💬 WhatsApp Sales', action: 'whatsapp' }
            ],
            matchedItems: [topRecord.title]
        };
    }

    // Fallback general response
    return {
        text: `I understand your question regarding "${userText}". ProfitMachines architects autonomous revenue systems, dark-funnel buyer intent radar, and domain-specific growth verticals for enterprise leaders.\n\nWould you like to explore our solutions or connect with a growth strategist?`,
        actions: [
            { label: '⚡ Connect With Strategist', action: 'lead_card' },
            { label: '📅 View All 7 Verticals', action: 'navigate', target: '/solutions#verticals' },
            { label: '💬 WhatsApp (+91 9513088611)', action: 'whatsapp' }
        ],
        matchedItems: ['ProfitMachines Autonomous Revenue OS']
    };
}
