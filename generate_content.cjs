const fs = require('fs');
const path = require('path');

const navItems = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Capabilities',
        path: '/capabilities',
        dropdown: {
            featured: [
                { title: "AI Demand Discovery", desc: "Predictive deal intelligence", path: "/explore/ai-demand-discovery" },
                { title: "AI Revenue Operations", desc: "Sales ops automation", path: "/explore/ai-revenue-operations" }
            ],
            highlight: {
                title: "Boost Win Rates by 4X",
                desc: "Predictive Deal Intelligence & Deal Dynamics.",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
                linkText: "View Capabilities",
                linkPath: "/capabilities"
            },
            items: [
                { name: "Demand Pulse", path: "/explore/demand-pulse", icon: "HeartPulse" },
                { name: "AI Demand Discovery", path: "/explore/ai-demand-discovery", icon: "Search" },
                { name: "AI Lead Generation", path: "/explore/ai-lead-generation", icon: "Users" },
                { name: "AI Lead Nurturing", path: "/explore/ai-lead-nurturing", icon: "MessageSquare" },
                { name: "AI MVP Validation", path: "/explore/ai-mvp-validation", icon: "ShieldCheck" },
                { name: "AI Sales Transformation", path: "/explore/ai-sales-transformation", icon: "RefreshCw" },
                { name: "AI Revenue Operations", path: "/explore/ai-revenue-operations", icon: "Settings" },
                { name: "AI Revenue Acceleration", path: "/explore/ai-revenue-acceleration", icon: "TrendingUp" }
            ]
        }
    },
    {
        name: 'Crypto',
        path: '/crypto',
        dropdown: {
            featured: [
                { title: "Web3 Ecosystems", desc: "L1 & L2 protocol scaling", path: "/explore/crypto-demand-discovery" },
                { title: "DeFi Platforms", desc: "Sustainable liquidity", path: "/explore/crypto-growth" }
            ],
            highlight: {
                title: "High-Velocity Web3",
                desc: "Built for High-Velocity Web3 & Crypto Ecosystems.",
                image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&q=80",
                linkText: "Learn More",
                linkPath: "/crypto"
            },
            items: [
                { name: "Crypto Revenue Acceleration", path: "/explore/crypto-revenue", icon: "TrendingUp" },
                { name: "Crypto Demand Discovery", path: "/explore/crypto-demand-discovery", icon: "Search" },
                { name: "Crypto Performance Revenue", path: "/explore/crypto-performance", icon: "Coins" },
                { name: "Crypto Growth Acceleration", path: "/explore/crypto-growth", icon: "Rocket" },
                { name: "Market Validation Intelligence", path: "/explore/crypto-market-validation", icon: "Target" },
                { name: "Customer Journey Intelligence", path: "/explore/crypto-journey", icon: "MapPin" },
                { name: "Startup MVP Acceleration", path: "/explore/crypto-startup", icon: "Lightbulb" }
            ]
        }
    },
    {
        name: 'Outcomes',
        path: '/outcomes',
        dropdown: {
            featured: [
                { title: "Enterprise Sales", desc: "Predictable scaling", path: "/explore/enterprise-sales" },
                { title: "BFSI Acceleration", desc: "Regulated growth", path: "/explore/bfsi-sales" }
            ],
            highlight: {
                title: "Measurable Outcomes",
                desc: "Turning AI insights into measurable impact.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
                linkText: "See Outcomes",
                linkPath: "/outcomes"
            },
            items: [
                { name: "AI Demand Discovery", path: "/explore/ai-demand-discovery", icon: "Search" },
                { name: "AI-Driven Revenue Acceleration", path: "/explore/revenue-acceleration", icon: "TrendingUp" },
                { name: "AI-Driven Growth Hacking", path: "/explore/growth-hacking", icon: "Rocket" },
                { name: "AI-Driven Performance Marketing", path: "/explore/performance-marketing", icon: "BarChart" },
                { name: "Enterprise Sales Acceleration", path: "/explore/enterprise-sales", icon: "Building2" },
                { name: "Digital & Inside Sales", path: "/explore/digital-sales", icon: "Layout" },
                { name: "D2C & High-Velocity Sales", path: "/explore/d2c-sales", icon: "ShoppingBag" },
                { name: "BFSI Sales Acceleration", path: "/explore/bfsi-sales", icon: "Landmark" }
            ]
        }
    },
    {
        name: 'Solutions',
        path: '/solutions',
        dropdown: {
            featured: [
                { title: "AI Business Strategy", desc: "Market intelligence", path: "/explore/ai-business-strategy" },
                { title: "AI Auto Sales Pilot", desc: "Autonomous agents", path: "/explore/ai-auto-sales-pilot" }
            ],
            highlight: {
                title: "Comprehensive Solutions",
                desc: "End-to-end AI-driven growth solutions for enterprises.",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80",
                linkText: "View Solutions",
                linkPath: "/solutions"
            },
            items: [
                { name: "AI Business Growth Strategy", path: "/explore/ai-business-strategy", icon: "TrendingUp" },
                { name: "AI Market Strategy & Demand", path: "/explore/ai-market-strategy", icon: "Target" },
                { name: "AI-Driven Growth Hacking", path: "/explore/growth-hacking", icon: "Rocket" },
                { name: "AI-Driven Performance Marketing", path: "/explore/performance-marketing", icon: "BarChart" },
                { name: "AI Auto Sales Pilot", path: "/explore/ai-auto-sales-pilot", icon: "Bot" },
                { name: "AI Sales Process Optimization", path: "/explore/sales-optimization", icon: "Settings" },
                { name: "AI Revenue Operations", path: "/explore/ai-revenue-operations", icon: "Server" },
                { name: "AI Revenue Acceleration", path: "/explore/ai-revenue-acceleration", icon: "Zap" }
            ]
        }
    },
    {
        name: 'Industries',
        path: '/industries',
        dropdown: {
            featured: [
                { title: "E-commerce", desc: "D2C growth", path: "/explore/ecommerce" },
                { title: "BFSI", desc: "Banking & Lending", path: "/explore/bfsi" }
            ],
            highlight: {
                title: "Industry Expertise",
                desc: "Tailored revenue acceleration for your specific industry.",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
                linkText: "Learn More",
                linkPath: "/industries"
            },
            items: [
                { name: "E-commerce & D2C", path: "/explore/ecommerce", icon: "ShoppingBag" },
                { name: "Consumer Durables", path: "/explore/consumer-durables", icon: "Home" },
                { name: "BFSI & FinTech", path: "/explore/bfsi", icon: "Landmark" },
                { name: "FMCG", path: "/explore/fmcg", icon: "Boxes" },
                { name: "SaaS & Enterprise Software", path: "/explore/saas", icon: "Cloud" },
                { name: "Manufacturing", path: "/explore/manufacturing", icon: "Factory" },
                { name: "Real Estate", path: "/explore/real-estate", icon: "Building" },
                { name: "Crypto & Web3", path: "/explore/crypto-industry", icon: "Coins" }
            ]
        }
    },
    {
        name: 'Offerings',
        path: '/offerings',
        dropdown: {
            featured: [
                { title: "Sales Intelligence", desc: "Real-time deal analytics", path: "/explore/sales-intelligence" },
                { title: "RevOps Intelligence", desc: "Unified CRM automation", path: "/explore/revenue-ops-intelligence" }
            ],
            highlight: {
                title: "Enterprise Offerings",
                desc: "Turnkey AI sales engines and revenue intelligence.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
                linkText: "View All Offerings",
                linkPath: "/offerings"
            },
            items: [
                { name: "AI-Powered Sales Intelligence", path: "/explore/sales-intelligence", icon: "Sparkles" },
                { name: "Revenue Operations & Intelligence", path: "/explore/revenue-ops-intelligence", icon: "Server" },
                { name: "Digital Marketing & Demand Gen", path: "/explore/digital-marketing", icon: "TrendingUp" },
                { name: "Market & Demand Intelligence", path: "/explore/market-intelligence", icon: "Search" },
                { name: "Market Validation & Research", path: "/explore/market-validation-offering", icon: "Target" },
                { name: "Product Scaling & Growth", path: "/explore/product-scaling", icon: "Rocket" }
            ]
        }
    },
    {
        name: 'Partners',
        path: '/partners',
        dropdown: {
            featured: [
                { title: "Solution Partners", desc: "Implementation experts", path: "/explore/solution-partners" },
                { title: "Technology Partners", desc: "Platform integrations", path: "/explore/technology-partners" }
            ],
            highlight: {
                title: "Global Partner Ecosystem",
                desc: "Co-sell and build next-gen AI revenue systems together.",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
                linkText: "Become a Partner",
                linkPath: "/partners"
            },
            items: [
                { name: "Partner Program Overview", path: "/explore/partner-overview", icon: "Handshake" },
                { name: "Solution Partners", path: "/explore/solution-partners", icon: "Building2" },
                { name: "Technology Partners", path: "/explore/technology-partners", icon: "Cpu" },
                { name: "Referral Partners", path: "/explore/referral-partners", icon: "UserPlus" }
            ]
        }
    },
    {
        name: 'Company',
        path: '/company',
        dropdown: {
            featured: [
                { title: "About Us", desc: "Our mission and vision", path: "/about" },
                { title: "Careers", desc: "Join our team", path: "/careers" }
            ],
            highlight: {
                title: "ProfitMachines",
                desc: "We are engineering growth and automating scale.",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
                linkText: "Meet the Team",
                linkPath: "/company"
            },
            items: [
                { name: "About Us", path: "/about", icon: "Info" },
                { name: "Mission", path: "/mission", icon: "Target" },
                { name: "Leadership & Culture", path: "/leadership", icon: "Users" },
                { name: "Our Offices", path: "/offices", icon: "MapPin" },
                { name: "Careers", path: "/careers", icon: "Briefcase" },
                { name: "Contact Us", path: "/contact", icon: "Phone" }
            ]
        }
    }
];

const generateContentForService = (category, name, slug) => {
    return `
        title: ${JSON.stringify(name)},
        category: ${JSON.stringify(category)},
        heroDescription: ${JSON.stringify(`Empower your organization with ProfitMachines' enterprise-grade ${name} capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.`)},
        features: [
            { title: ${JSON.stringify(`Predictive ${name} Intelligence`)}, description: ${JSON.stringify(`Deploy proprietary AI models trained to identify high-intent buyer behavior and automate ${name} execution.`)} },
            { title: "Autonomous Execution Agents", description: ${JSON.stringify(`Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement.`)} },
            { title: "Enterprise Systems Integration", description: ${JSON.stringify(`Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance.`)} },
            { title: "Real-time Deal Dynamics", description: ${JSON.stringify(`Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X.`)} }
        ],
        benefits: [
            ${JSON.stringify(`Accelerated revenue velocity by up to 500% in 12 months`)},
            ${JSON.stringify(`4X increase in qualified win rates via predictive deal scoring`)},
            ${JSON.stringify(`Zero manual data entry with 100% automated CRM RevOps`)},
            ${JSON.stringify(`Enterprise bank-grade security & ISO 27001 / SOC2 compliance`)}
        ],
        faqs: [
            { question: ${JSON.stringify(`How quickly can ProfitMachines deploy ${name}?`)}, answer: ${JSON.stringify(`Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks.`)} },
            { question: "What infrastructure integrations are supported?", answer: ${JSON.stringify(`ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box.`)} },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: ${JSON.stringify(`Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers.`)} },
            { title: "Complex B2B Deal Navigation", description: ${JSON.stringify(`Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times.`)} }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]`;
};

let allServicesEntries = [];
const processedSlugs = new Set();

navItems.forEach(item => {
    if (item.dropdown && item.dropdown.items) {
        item.dropdown.items.forEach(sub => {
            const slug = sub.path.startsWith('/explore/') ? sub.path.replace('/explore/', '') : sub.path.replace('/', '');
            if(!['about', 'mission', 'leadership', 'offices', 'careers', 'contact'].includes(slug) && !processedSlugs.has(slug)) {
                processedSlugs.add(slug);
                allServicesEntries.push(`"${slug}": {\n${generateContentForService(item.name, sub.name, slug)}\n}`);
            }
        });
    }
});

const dataFileContent = `export interface ServiceData {
    title: string;
    category: string;
    heroDescription: string;
    features: { title: string; description: string }[];
    benefits: string[];
    faqs: { question: string; answer: string }[];
    useCases?: { title: string; description: string }[];
    technologies?: string[];
    architectureDiagrams?: { src: string; title: string; description: string }[];
    kpis?: { metric: string; label: string }[];
    successStories?: { title: string; description: string }[];
    serviceModels?: { title: string; description: string }[];
    projectLifecycle?: { step: string; description: string; desc?: string }[];
}

export const servicesData: Record<string, ServiceData> = {
${allServicesEntries.join(',\n')}
};

export const smNavItems = ${JSON.stringify(navItems, null, 4)};
`;

const dataDir = path.join(__dirname, 'src/data');
fs.writeFileSync(path.join(dataDir, 'navigationContent.ts'), dataFileContent, 'utf8');

console.log('Successfully updated navigation schema without 2nd navbar item.');
