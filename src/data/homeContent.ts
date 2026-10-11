import {
    Target, TrendingUp, Compass, BarChart3,  Zap, Lightbulb, MessageSquare,
    Settings, RefreshCw, FileText, Activity, Layers, Users, Globe, Shield, Database,
    Cpu, Lock, Search, Share2,  Box, Truck, Calendar
} from 'lucide-react';

export interface ConversionBlockData {
    id: string;
    title: string;
    subtitle?: string;
    stats: { label: string; value: string; suffix?: string; subtext?: string }[];
    portfolio: { icon: any; title: string; desc?: string }[];
    tabs: { title: string; content: string }[];
    cta: { text: string; action?: string };
}

export const homeContent: ConversionBlockData[] = [
    // --- INITIAL OFFERINGS (Blocks 1-6) ---
    {
        id: 'revenue-os',
        title: 'The Unified AI Revenue Operating System',
        subtitle: 'Your entire growth engine running on autonomous intelligence.',
        stats: [
            { label: 'Revenue Velocity', value: '5X', suffix: 'Faster Growth' },
            { label: 'Forecast Accuracy', value: '98%', suffix: 'Precision' },
            { label: 'Pipeline Scale', value: '∞', suffix: '' }, // Using suffix='' to clear it or I can just remove the prop. Removing text as requested.
        ],
        portfolio: [
            { icon: Cpu, title: 'Revenue Brain', desc: 'AI intelligence core' },
            { icon: Zap, title: 'Growth Automation', desc: 'Autonomous execution' },
            { icon: TrendingUp, title: 'Predictive Revenue', desc: 'AI forecasting engine' },
        ],
        tabs: [
            { title: 'Market Signal Engine', content: 'Web, competitor & intent signals' },
            { title: 'Intelligence Core', content: 'Propensity-to-buy scoring' },
            { title: 'Autonomous Execution', content: 'AI outreach & nurturing' },
            { title: 'Revenue Optimization', content: 'Self-learning growth engine' },
        ],
        cta: { text: 'See the AI Revenue OS in Action' }
    },
    {
        id: 'demand-discovery',
        title: 'AI-Powered Demand Discovery Engine',
        stats: [
            { label: 'Hidden Market Discovery', value: '1000X', suffix: 'Faster' },
            { label: 'Segment Precision', value: 'Micro-', suffix: 'Segmentation' },
            { label: 'Opportunity Detection', value: 'Real-Time', suffix: 'Signals' },
        ],
        portfolio: [
            { icon: Compass, title: 'Market Radar' },
            { icon: Users, title: 'Buyer Persona AI' },
            { icon: Globe, title: 'TAM Expansion Engine' },
        ],
        tabs: [
            { title: 'Dark Funnel Intelligence', content: 'Uncover hidden buyer intent.' },
            { title: 'Competitor Demand Tracking', content: 'Monitor competitor traction globally.' },
            { title: 'Behavioral Mapping', content: 'Map buyer journey behaviors.' },
            { title: 'Opportunity Scoring', content: 'Score opportunities in real-time.' },
        ],
        cta: { text: 'Discover Your Hidden Market' }
    },
    {
        id: 'demand-generation',
        title: 'AI Demand Generation Powerhouse',
        stats: [
            { label: 'Lead Speed', value: '1000X', suffix: 'Faster' },
            { label: 'Pipeline Automation', value: '80%', suffix: 'AI-Sourced' },
            { label: 'Campaign ROI', value: '5X', suffix: 'Performance' },
        ],
        portfolio: [
            { icon: Target, title: 'Campaign AI' },
            { icon: Settings, title: 'Offer Optimization' },
            { icon: RefreshCw, title: 'Funnel Automation' },
        ],
        tabs: [
            { title: 'Multi-Channel AI', content: 'Orchestrate campaigns across channels.' },
            { title: 'A/B Testing Engine', content: 'Automated split testing at scale.' },
            { title: 'Behavioral Targeting', content: 'Target based on precise behaviors.' },
            { title: 'ROI Optimizer', content: 'Maximize return on ad spend per channel.' },
        ],
        cta: { text: 'Launch AI Demand Engine' }
    },
    {
        id: 'autonomous-sales',
        title: 'Autonomous Sales Execution Engine',
        stats: [
            { label: 'Sales Cycle', value: '50%', suffix: 'Faster' },
            { label: 'SQL Automation', value: '80%', suffix: 'Auto-Generated' },
            { label: 'Cost of Sales', value: '65%', suffix: 'Reduction' },
        ],
        portfolio: [
            { icon: MessageSquare, title: 'Digital Sales Reps' },
            { icon: Users, title: 'AI Negotiator' },
            { icon: Calendar, title: 'Meeting Engine' }, // Need Calendar icon
        ],
        tabs: [
            { title: 'Prospect Research AI', content: 'Deep dive research on every prospect.' },
            { title: 'Outreach AI', content: 'Personalized outreach at scale.' },
            { title: 'Follow-up AI', content: 'Persistent, smart follow-up sequences.' },
            { title: 'Qualification AI', content: 'Auto-qualify leads before human touch.' },
        ],
        cta: { text: 'Deploy AI Sales Agents' }
    },
    {
        id: 'revenue-intelligence',
        title: 'AI Revenue Intelligence Platform',
        stats: [
            { label: 'Pipeline Visibility', value: 'Real-Time' },
            { label: 'Revenue Forecasting', value: '98%', suffix: 'Accuracy' },
            { label: 'KPI Monitoring', value: '47+', suffix: 'KPIs' },
        ],
        portfolio: [
            { icon: BarChart3, title: 'Revenue Dashboard' },
            { icon: Activity, title: 'Pipeline Health AI' },
            { icon: FileText, title: 'Attribution Engine' },
        ],
        tabs: [
            { title: 'Bottleneck Detection', content: 'Identify where deals get stuck.' },
            { title: 'Conversion Mapping', content: 'Map conversion rates across stages.' },
            { title: 'Objection Intelligence', content: 'Analyze and overcome common objections.' },
            { title: 'Growth Insights', content: 'Actionable insights for revenue growth.' },
        ],
        cta: { text: 'Access Revenue Command Center' }
    },
    {
        id: 'customer-success',
        title: 'AI Customer Success & Expansion Engine',
        stats: [
            { label: 'Churn Reduction', value: '3X' },
            { label: 'Expansion Revenue', value: '4X' },
            { label: 'Customer LTV', value: '5X' },
        ],
        portfolio: [
            { icon: Shield, title: 'Retention AI' },
            { icon: TrendingUp, title: 'Upsell AI' },
            { icon: Users, title: 'Loyalty Engine' },
        ],
        tabs: [
            { title: 'Health Scoring', content: 'Predict churn risk before it happens.' },
            { title: 'Engagement AI', content: 'Proactive customer engagement.' },
            { title: 'Renewal Automation', content: 'Automate certain renewal processes.' },
            { title: 'Advocacy Engine', content: 'Turn customers into advocates.' },
        ],
        cta: { text: 'Activate Expansion Engine' }
    },

    // --- SOLUTIONS (Blocks 7-12) ---
    {
        id: 'gtm-strategy',
        title: 'AI-Driven GTM & Growth Strategy',
        stats: [
            { label: 'Market Expansion', value: 'Global Reach' }, // Placeholder values where missing in prompt but implied
            { label: 'PMF Speed', value: 'Accelerated' },
            { label: 'GTM Velocity', value: 'High Velocity' },
        ],
        portfolio: [
            { icon: Compass, title: 'Growth Blueprint' },
            { icon: Target, title: 'ICP Intelligence' },
            { icon: Lightbulb, title: 'Positioning AI' },
        ],
        tabs: [
            { title: 'Market Mapping', content: 'Full market landscape analysis.' },
            { title: 'Buyer Intelligence', content: 'Deep understanding of buyer needs.' },
            { title: 'PMF Engine', content: 'Validate product-market fit.' },
            { title: 'GTM Optimizer', content: 'Optimize go-to-market execution.' },
        ],
        cta: { text: 'Build AI Growth Strategy' }
    },
    {
        id: 'market-intelligence',
        title: 'AI Market & Competitive Intelligence',
        stats: [
            { label: 'Buyer Intent', value: 'Predicted' },
            { label: 'Competitor Tracking', value: '24/7' },
            { label: 'Dark Funnel AI', value: 'Illuminated' },
        ],
        portfolio: [
            { icon: Compass, title: 'Market Radar' },
            { icon: Search, title: 'Demand Tracing' },
            { icon: Users, title: 'Persona AI' },
        ],
        tabs: [
            { title: 'Intent Engine', content: 'Capture high-intent signals.' },
            { title: 'Account Intelligence', content: 'Detailed account-level insights.' },
            { title: 'Signal AI', content: 'Real-time market signal processing.' },
            { title: 'Opportunity Scoring', content: 'Prioritize best opportunities.' },
        ],
        cta: { text: 'Activate Market Intelligence' }
    },
    {
        id: 'revenue-operations',
        title: 'AI Revenue Operations Platform',
        stats: [
            { label: 'Pipeline Health', value: 'Optimized' },
            { label: 'Forecasting', value: 'Automated' },
            { label: 'Attribution', value: 'Multi-touch' },
        ],
        portfolio: [
            { icon: Database, title: 'CRM AI' },
            { icon: FileText, title: 'Board Reporting' },
            { icon: Activity, title: 'KPI Engine' },
        ],
        tabs: [
            { title: 'Self-Healing CRM', content: 'Auto-correct data quality issues.' },
            { title: 'Forecast AI', content: 'Predictive revenue forecasting.' },
            { title: 'Attribution Engine', content: 'Full funnel attribution.' },
            { title: 'Compliance AI', content: 'Ensure regulatory compliance.' },
        ],
        cta: { text: 'Modernize RevOps' }
    },
    {
        id: 'conversational-ai',
        title: 'AI Conversational Revenue Engine',
        stats: [
            { label: '24/7 Sales', value: '24/7', suffix: 'Always On' },
            { label: 'Lead Capture', value: '100%', suffix: 'Automated' },
            { label: 'Conversion AI', value: 'Max', suffix: 'Optimized' },
        ],
        portfolio: [
            { icon: MessageSquare, title: 'Website AI' },
            { icon: MessageSquare, title: 'WhatsApp AI' },
            { icon: MessageSquare, title: 'Sales Chatbot' },
        ],
        tabs: [
            { title: 'Conversation AI', content: 'Nature language understanding.' },
            { title: 'Intent Detection', content: 'Detect user intent instantly.' },
            { title: 'Qualification AI', content: 'Qualify leads in chat.' },
            { title: 'Booking AI', content: 'Schedule meetings automatically.' },
        ],
        cta: { text: 'Deploy Conversational AI' }
    },
    {
        id: 'funnel-optimization',
        title: 'AI Funnel Optimization System',
        stats: [
            { label: 'Conversion', value: '+3X' },
            { label: 'Speed', value: '+50%' },
            { label: 'Leakage', value: '-70%' },
        ],
        portfolio: [
            { icon: Layers, title: 'Journey AI' },
            { icon: RefreshCw, title: 'Drop-off Fixer' },
            { icon: Settings, title: 'Conversion Engine' },
        ],
        tabs: [
            { title: 'Stage Optimization', content: 'Optimize each funnel stage.' },
            { title: 'Objection AI', content: 'Handle objections automatically.' },
            { title: 'Retargeting AI', content: 'Smart retargeting sequences.' },
            { title: 'Nurture AI', content: 'Intelligent lead nurturing.' },
        ],
        cta: { text: 'Optimize Your Funnel' }
    },
    {
        id: 'growth-automation',
        title: 'AI Growth Automation Stack',
        stats: [
            { label: 'Process Speed', value: 'Maximized' },
            { label: 'Cost Reduction', value: 'Significant' },
            { label: 'Scalability', value: 'Infinite' },
        ],
        portfolio: [
            { icon: Share2, title: 'Workflow AI' },
            { icon: Target, title: 'Campaign AI' },
            { icon: Settings, title: 'Ops Automation' },
        ],
        tabs: [
            { title: 'Automation Engine', content: 'End-to-end process automation.' },
            { title: 'Learning AI', content: 'Systems that learn and improve.' },
            { title: 'Execution AI', content: 'Flawless execution of tasks.' },
            { title: 'Scaling AI', content: 'Scale operations effortlessly.' },
        ],
        cta: { text: 'Automate Growth' }
    },

    // --- VERTICALS (Blocks 13-16) ---
    {
        id: 'saas-tech',
        title: 'AI Growth for SaaS & Tech',
        stats: [
            { label: 'Churn', value: '-3X' },
            { label: 'LTV', value: '+4X' },
            { label: 'Expansion', value: '+5X' },
        ],
        portfolio: [
            { icon: Zap, title: 'PLG AI' },
            { icon: TrendingUp, title: 'Expansion Engine' },
            { icon: Shield, title: 'Retention AI' },
        ],
        tabs: [
            { title: 'Free-to-Paid AI', content: 'Convert free users to paid.' },
            { title: 'Onboarding AI', content: 'Streamline user onboarding.' },
            { title: 'Upsell AI', content: 'Identify upsell opportunities.' },
            { title: 'Renewal AI', content: 'Automate renewal workflows.' },
        ],
        cta: { text: 'Scale Your SaaS' }
    },
    {
        id: 'bfsi-fintech',
        title: 'AI Revenue for BFSI & FinTech',
        stats: [
            { label: 'LTV', value: '+4X' },
            { label: 'Compliance AI', value: 'Integrated' },
            { label: 'Fraud AI', value: 'Protected' },
        ],
        portfolio: [
            { icon: Lock, title: 'Policy AI' },
            { icon: Shield, title: 'Risk AI' },
            { icon: FileText, title: 'Compliance AI' },
        ],
        tabs: [
            { title: 'Fraud Scoring', content: 'Real-time fraud detection.' },
            { title: 'Lead AI', content: 'High-quality lead generation.' },
            { title: 'Personalization AI', content: 'Personalized financial offers.' },
            { title: 'Cross-Sell AI', content: 'Smart cross-selling suggestions.' },
        ],
        cta: { text: 'Transform Financial Growth' }
    },
    {
        id: 'manufacturing',
        title: 'AI Growth for Manufacturing',
        stats: [
            { label: 'Dealer Sales', value: '+200%' },
            { label: 'Channel AI', value: 'Optimized' },
            { label: 'Demand AI', value: 'Forecasted' },
        ],
        portfolio: [
            { icon: Truck, title: 'Dealer Engine' },
            { icon: Box, title: 'Distributor AI' },
            { icon: Layers, title: 'Supply AI' },
        ],
        tabs: [
            { title: 'Channel Automation', content: 'Automate channel management.' },
            { title: 'Dealer CRM', content: 'Specialized CRM for dealers.' },
            { title: 'Forecast AI', content: 'Accurate demand forecasting.' },
            { title: 'Logistics AI', content: 'Optimize logistics planning.' },
        ],
        cta: { text: 'Scale Industrial Sales' }
    },
    {
        id: 'startups',
        title: 'AI Growth for Startups',
        stats: [
            { label: 'PMF Speed', value: 'Accelerated' },
            { label: 'Growth Velocity', value: 'Maximized' },
            { label: 'Market Fit', value: 'Validated' },
        ],
        portfolio: [
            { icon: Box, title: 'Growth-in-a-Box' },
            { icon: Target, title: 'PMF Engine' },
            { icon: Lightbulb, title: 'GTM AI' },
        ],
        tabs: [
            { title: 'Market Testing', content: 'Test markets rapidly.' },
            { title: 'Demand AI', content: 'Generate initial demand.' },
            { title: 'Pricing AI', content: 'Optimize pricing strategies.' },
            { title: 'Positioning AI', content: 'Perfect your market positioning.' },
        ],
        cta: { text: 'Find Product-Market Fit Faster' }
    }
];


