

import FeatureSection from '../components/demand-pulse/FeatureSection';
import DemandPulseCarousel from '../components/demand-pulse/DemandPulseCarousel';
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';
import { useLeadModal } from '../context/LeadModalContext';
import ContextualCtaSection from '../components/forms/ContextualCtaSection';

export default function DemandPulse() {
    const { openQuickForm, openLongForm } = useLeadModal();
    return (

        <main className="bg-white min-h-screen text-slate-600 selection:bg-emerald-100 selection:text-blue-900">
            {/* Premium Interactive Carousel - Now First Section */}
            <div>
                <DemandPulseCarousel />
            </div>

            {/* Hero Section */}
            <section className="relative pt-12 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-white">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-100/60 rounded-full blur-[120px] opacity-60"></div>
                    <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-emerald-100/40 rounded-full blur-[120px] opacity-50"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-[#2878B5] font-mono text-sm mb-8 backdrop-blur-md">
                        <Sparkles className="w-4 h-4" />
                        <span>INTELLIGENCE REDEFINED</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-6 tracking-tight leading-none">
                        DemandPulse AI<span className="text-[#2878B5]">™</span>
                    </h1>

                    <p className="text-2xl md:text-3xl font-light text-slate-500 mb-8 tracking-wide">
                        The Autonomous Demand Engine
                    </p>

                    <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                        “Generate High-Intent, Revenue-Ready Demand 24/7—1000X Faster, Smarter, and Always On.”
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 justify-center mb-16">
                        <button 
                            onClick={() => openLongForm({ defaultService: 'DemandPulse AI™ Engine' })}
                            className="px-10 py-5 bg-emerald-800 hover:bg-emerald-900 text-white text-lg font-bold rounded-full shadow-lg shadow-blue-900/25 transition-all transform hover:scale-105 flex items-center gap-3 group"
                        >
                            Deploy DemandPulse
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                            onClick={() => openQuickForm({ defaultService: 'DemandPulse AI™ Engine' })}
                            className="px-10 py-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                        >
                            Quick 60-Sec Inquiry
                        </button>
                    </div>

                    {/* Real-World Demand Pulse Intent Dashboard */}
                    <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                        <img 
                            src="/images/demand-pulse-dashboard.png" 
                            alt="ProfitMachines DemandPulse Autonomous Buyer Intent Radar & Signals Dashboard" 
                            className="w-full h-[400px] md:h-[480px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-start md:items-center justify-between text-left gap-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800">
                            <div>
                                <div className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                                    DemandPulse Signal Radar
                                </div>
                                <h3 className="text-xl font-bold text-white mt-1">Autonomous Buyer Intent & Dark Social Signal Decoder</h3>
                            </div>
                            <span className="px-3.5 py-1.5 bg-[#2878B5]/20 border border-emerald-600/40 text-emerald-300 text-xs font-mono font-bold rounded-full">
                                1,000+ Signal Inputs/Sec
                            </span>
                        </div>
                    </div>
                </div>


            </section>

            {/* Feature 01 */}
            <FeatureSection
                id="feature-demand-discovery"
                number="1"
                title="AI-Driven Demand Discovery"
                tagline="Uncover Hidden Buyer Clusters Before Competitors Do"
                successExample="A Series B HR SaaS platform struggled to expand beyond enterprise clients. Using DemandPulse AI, they discovered a surge in intent from mid-market e-commerce brands hiring “remote compliance managers” and searching for “global payroll + contractor management.” Within 30 days, they launched a tailored micro-offer—and generated $1.2M in pipeline from a segment they didn’t know existed."
                useCases={[
                    { sector: "SaaS", description: "Discovered that “edtech startups using Stripe + Teachable” were actively seeking LMS integrations → launched API-focused campaign." },
                    { sector: "Fintech", description: "Detected rising searches for “BNPL for B2B SaaS” among SMBs → pivoted product messaging to “Revenue-based financing for subscription businesses.”" },
                    { sector: "D2C", description: "Identified “vegan skincare buyers in Tier-2 cities engaging with sustainability influencers” → launched regional influencer + sample kit program." }
                ]}
                howAiDeliveredIt="Scanned job boards, app store reviews, Reddit threads, and G2 comparisons to cluster latent demand signals → auto-generated ICP profiles with predicted conversion likelihood."
                outcomeKPIs={[
                    "TAM expanded by 4.2X",
                    "New segment lead-to-opportunity rate: 32%",
                    "Market validation in 11 days"
                ]}
            />

            {/* Feature 02 */}
            <FeatureSection
                id="feature-demand-generation"
                number="2"
                title="AI-Driven Demand Generation"
                tagline="Your 24/7 Autonomous Lead Factory—Zero Downtime, Infinite Scale"
                successExample="A fintech lending platform lost 68% of weekend applicants due to delayed responses. After deploying DemandPulse AI, it engaged leads via WhatsApp + email within 47 seconds—even at 2 AM—using pre-approved offers based on open banking data. Weekend conversions jumped by 210%, and CAC dropped by 52%."
                useCases={[
                    { sector: "SaaS", description: "Visitor watches pricing video → AI sends personalized Loom demo + Calendly link → books meeting while still on site." },
                    { sector: "Fintech", description: "User abandons loan application → AI triggers SMS: “Complete in 90 sec—your rate is locked!” + pre-filled form." },
                    { sector: "D2C", description: "Cart abandoner receives Instagram retargeting ad + limited-time discount via SMS → converts in 4 hours." }
                ]}
                howAiDeliveredIt="Behavior-triggered, multi-channel sequences with dynamic content personalization—no human required."
                outcomeKPIs={[
                    "Lead response time: <90 sec",
                    "CPQL reduced from $120 → $38",
                    "38% of monthly pipeline generated on nights/weekends"
                ]}
            />

            {/* Feature 03 */}
            <FeatureSection
                id="feature-competitive-tracing"
                number="3"
                title="Competitive Demand Tracing"
                tagline="Intercept Buyers Evaluating Competitors—Before They Convert"
                successExample="A B2B analytics SaaS noticed declining win rates against a rival. DemandPulse AI flagged accounts visiting G2 comparison pages and reading negative reviews about the competitor’s “poor onboarding.” The system auto-deployed LinkedIn ads: “Why 200+ teams switched after [Competitor]’s onboarding failed them”—with a side-by-side onboarding timeline. Win rate increased from 28% to 51% in 6 weeks."
                useCases={[
                    { sector: "Fintech", description: "Detected users comparing “Stripe Capital vs. [Client]” → triggered email: “Get 2X higher approval with same-day funding.”" },
                    { sector: "D2C", description: "Shoppers viewed competitor’s product page + left 1-star review → retargeted with UGC video: “Real customers explain why they chose us.”" }
                ]}
                howAiDeliveredIt="Monitored review sites, social mentions, and competitor website traffic → triggered hyper-contextual counter-messaging with proof points."
                outcomeKPIs={[
                    "35% win-back rate on competitor-intent accounts",
                    "Sales cycle shortened by 22 days",
                    "100% of competitive losses mapped to rebuttal plays"
                ]}
            />

            {/* Feature 04 */}
            <FeatureSection
                id="feature-micro-segmentation"
                number="4"
                title="Micro-Segmentation Analytics"
                tagline="From “Marketers” to “B2B SaaS Growth Marketers Using HubSpot + Running LinkedIn Ads”"
                successExample="A D2C protein brand was wasting budget targeting “fitness enthusiasts.” AI segmented users into: “Vegan gym-goers in Bangalore who follow @FitIndia and bought plant-based snacks in last 30 days.” Campaigns to this group achieved 7.4% CTR and 22% repeat purchase rate—vs. 1.1% CTR for broad campaigns."
                useCases={[
                    { sector: "SaaS", description: "“E-commerce brands using Klaviyo + Shopify but with <1% email revenue” → targeted with cart-recovery automation offer." },
                    { sector: "Fintech", description: "“Freelancers using PayPal + Upwork, earning >$3K/mo, searching ‘tax savings’” → offered automated tax-loss harvesting." }
                ]}
                howAiDeliveredIt="Fused technographics, behavioral history, and real-time intent into 500+ dynamic micro-segments—refreshed daily."
                outcomeKPIs={[
                    "CTR: 6.8% (vs. industry avg 1.2%)",
                    "Opt-out rate: 0.9%",
                    "ROAS: 6.3x in micro-targeted cohorts"
                ]}
            />

            {/* Feature 05 */}
            <FeatureSection
                id="feature-offer-optimization"
                number="5"
                title="Offer Refinement & Optimization Analytics"
                tagline="Optimize Pricing, Packaging & Messaging Based on Real Buyer Behavior"
                successExample="A project management SaaS had 40% churn in its “Pro” plan. AI analyzed support tickets and found users couldn’t collaborate with external clients. It recommended a “Client Portal” add-on. After bundling it, churn dropped to 12%, and ARPU increased by 28%."
                useCases={[
                    { sector: "Fintech", description: "SMEs rejected flat-rate loans → AI suggested “revenue-linked repayment” → adoption rose by 65%." },
                    { sector: "D2C", description: "Subscription box had high first-month churn → AI found users wanted customization → added “build-your-box” option → retention ↑ 34%." }
                ]}
                howAiDeliveredIt="NLP analysis of win/loss calls + usage telemetry → A/B tested offer constructs via AI-powered landing pages."
                outcomeKPIs={[
                    "Offer adoption: 62% (vs. 18% pre-AI)",
                    "Churn reduced by 28%",
                    "Pricing iterations every 7 days"
                ]}
            />

            {/* Feature 06 */}
            <FeatureSection
                id="feature-multi-channel-automation"
                number="6"
                title="Multi-Channel Demand Gen Automation"
                tagline="Orchestrate 15+ Channels Like a Single, Intelligent System"
                successExample="A fintech neobank ran siloed campaigns: Meta ads, Google Search, email. Attribution was chaotic. After unifying channels under DemandPulse AI, it discovered TikTok drove awareness, but WhatsApp closed deals. AI shifted budget dynamically—resulting in 5.8x ROAS and 41% lower CAC."
                useCases={[
                    { sector: "SaaS", description: "LinkedIn → Email → Personalized demo video → Calendly booking (all tracked in one journey)." },
                    { sector: "D2C", description: "Instagram Reels → SMS flash sale → Post-purchase referral loop via WhatsApp." }
                ]}
                howAiDeliveredIt="Unified identity resolution + cross-channel attribution + real-time budget reallocation."
                outcomeKPIs={[
                    "Cross-channel conversion: 7.2%",
                    "Ad waste reduced from 48% → 12%",
                    "Full-funnel visibility with revenue attribution"
                ]}
            />

            {/* Feature 07 */}
            <FeatureSection
                id="feature-pmf-acceleration"
                number="7"
                title="Product-Market Fit (PMF) Acceleration"
                tagline="Validate PMF in 30 Days—Not 6 Months"
                successExample="An AI-powered accounting SaaS for freelancers launched with low traction. AI found that users who connected 2+ bank accounts + ran quarterly reports had 92% 90-day retention. The team redesigned onboarding to drive those actions—PMF confirmed in 28 days, and seed round extended."
                useCases={[
                    { sector: "Fintech", description: "Borrowers who linked payroll data + set up autopay = 5X LTV → made mandatory in flow." },
                    { sector: "D2C", description: "Customers who engaged with UGC videos = 3X repeat rate → prioritized in post-purchase sequence." }
                ]}
                howAiDeliveredIt="ML models identified behavioral proxies for long-term value → guided product, onboarding, and messaging."
                outcomeKPIs={[
                    "PMF validated in 28 days",
                    "Early churn reduced from 48% → 14%",
                    "Feature adoption depth: 76%"
                ]}
            />

            {/* Feature 08 */}
            <FeatureSection
                id="feature-behavioral-targeting"
                number="8"
                title="Behavioral Segmentation & Targeting"
                tagline="Target What People Do—Not Just Who They Are"
                successExample="A cybersecurity SaaS saw low engagement from “CISOs.” AI revealed that only those who visited compliance pages + downloaded SOC2 templates converted. It created a “Compliance-Ready CISO” segment—campaigns to this group had 41% meeting-book rate vs. 6% for generic lists."
                useCases={[
                    { sector: "Fintech", description: "Users who checked “loan eligibility” 3x in a week → triggered pre-approved offer." },
                    { sector: "D2C", description: "Visitors who watched ingredient explainer video → sent sample kit + dermatologist note." }
                ]}
                howAiDeliveredIt="Tracked digital body language → scored urgency → triggered right action at right time."
                outcomeKPIs={[
                    "Anonymous-to-known conversion: 18%",
                    "Lead-to-opportunity time: 6 days",
                    "Sales acceptance rate: 88%"
                ]}
            />

            {/* Feature 09 */}
            <FeatureSection
                id="feature-campaign-optimization"
                number="9"
                title="AI-Driven Campaign Optimization"
                tagline="Self-Optimizing Campaigns That Get Smarter Every Hour"
                successExample="A D2C beauty brand ran static Meta ads. CTR dropped 60% in 3 weeks. DemandPulse AI tested 120 variants/day—discovering that “before/after” UGC videos with real customer names outperformed polished ads by 4.7x. ROAS jumped from 2.4x → 6.1x in 21 days."
                useCases={[
                    { sector: "SaaS", description: "“Free trial” CTAs underperformed vs. “See your ROI in 5 min” → AI shifted all budget." },
                    { sector: "Fintech", description: "“Low interest” messaging failed; “Get funded before payroll Friday” won." }
                ]}
                howAiDeliveredIt="Reinforcement learning engine continuously tested creatives, copy, offers, and audiences."
                outcomeKPIs={[
                    "ROAS sustained at 5.9x over 90 days",
                    "Creative fatigue resolved in <24h",
                    "100+ live variants tested weekly"
                ]}
            />

            {/* Feature 10 */}
            <FeatureSection
                id="feature-conversational-marketing"
                number="10"
                title="AI ChatGPT Conversational Marketing Engine"
                tagline="Your 24/7 AI Sales Rep—Trained on Your Playbook"
                successExample="A B2B SaaS for restaurant POS had 89% of website visitors leave without engaging. After deploying the AI chatbot, it asked: “Which feature matters most—inventory, payroll, or delivery integration?” Based on answers, it showed relevant case studies and booked consulting sessions. Website conversion rose from 1.4% → 6.3%"
                useCases={[]} // No key use cases provided for this one in the prompt, or implicit?
                howAiDeliveredIt="Conversational AI trained on sales methodology acting as an SDR."
                outcomeKPIs={[
                    "Website conversion rose from 1.4% → 6.3%",
                    "24/7 Availability"
                ]}
            />

            {/* Configurable Contextual CTA Section */}
            <ContextualCtaSection
                badge="DemandPulse AI™ Engine"
                title="Ready to Deploy Autonomous Demand Generation?"
                subtitle="Generate high-intent, revenue-ready demand 24/7 across every digital channel. Schedule an enterprise consultation or submit a 60-second quick inquiry."
                defaultService="DemandPulse AI™ Engine"
            />
        </main>
    );
}
