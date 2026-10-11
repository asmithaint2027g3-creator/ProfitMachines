import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Paperclip, ChevronRight, Zap, Calendar, ExternalLink, RefreshCw } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import logo from '../../assets/Trustgrid-logo.png';
import { useLeadModal } from '../context/LeadModalContext';

type MessageRole = 'user' | 'assistant';

interface ActionButton {
    label: string;
    action: 'quick_form' | 'long_form' | 'whatsapp' | 'navigate';
    target?: string;
}

export interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
    actions?: ActionButton[];
    pageContext?: string;
}

interface PageContextData {
    contextKey: string;
    title: string;
    greeting: string;
    quickPrompts: string[];
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [agentName, setAgentName] = useState('Pooja');
    const [agentRole] = useState('Digital Success Director');
    const location = useLocation();
    const { openQuickForm, openLongForm } = useLeadModal();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();

    // ── Location / Name Mapping ─────────────────────────────────────────
    useEffect(() => {
        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (timezone.includes('Dubai') || timezone.includes('Riyadh') || timezone.includes('Qatar')) {
                setAgentName('Mustafa');
            } else if (timezone.includes('London') || timezone.includes('Europe')) {
                setAgentName('Charles');
            } else if (timezone.includes('New_York') || timezone.includes('Los_Angeles') || timezone.includes('Chicago')) {
                setAgentName('Sarah');
            } else {
                setAgentName('Pooja');
            }
        } catch {
            setAgentName('Pooja');
        }
    }, []);

    // ── Resolve Context by Route ────────────────────────────────────────
    const currentPageContext: PageContextData = useMemo(() => {
        const path = location.pathname;

        if (path.includes('/pricing')) {
            return {
                contextKey: 'pricing',
                title: 'Pricing & Engagement Tiers',
                greeting: `Hello! 👋 I'm ${agentName} (${agentRole}). Viewing our Pricing Tiers? I can help you evaluate Starter, Growth, or custom Enterprise architectures.`,
                quickPrompts: [
                    'Compare Starter vs Growth Tier',
                    'Enterprise Custom Architecture',
                    'How is ROI calculated?',
                    'Schedule Consultation Call'
                ]
            };
        }

        if (path.includes('/crypto')) {
            return {
                contextKey: 'crypto',
                title: 'Web3 & Crypto Ecosystems',
                greeting: `Hello! 👋 Welcome to our Web3 Growth Desk. Looking to scale developer acquisition, sustainable TVL, or protocol adoption?`,
                quickPrompts: [
                    'L1/L2 Developer Acquisition',
                    'Sustainable TVL Growth Framework',
                    'Token Utility Architecture',
                    'Speak to Web3 Growth Lead'
                ]
            };
        }

        if (path.includes('/demand-pulse')) {
            return {
                contextKey: 'demand-pulse',
                title: 'DemandPulse AI™ Intent Engine',
                greeting: `Hello! 👋 Welcome to DemandPulse AI™! I can explain how our dark-funnel intent radar detects anonymous buying committee signals.`,
                quickPrompts: [
                    'How does intent radar work?',
                    'What signals trigger SDR outreach?',
                    'Dark funnel discovery telemetry',
                    'Request Live Intent Demo'
                ]
            };
        }

        if (path.includes('/analytics') || path.includes('/behaviour-analytics')) {
            return {
                contextKey: 'analytics',
                title: 'Enterprise Analytics Suite',
                greeting: `Hello! 👋 Welcome to our Telemetry Suite. We provide 16 client-facing BI views synchronized with Google Sheet 2 data processing.`,
                quickPrompts: [
                    'Explain the 16 BI Views',
                    'How does Lead Scoring work?',
                    'Sankey Flow & Funnel Forensics',
                    'Review Telemetry Setup'
                ]
            };
        }

        if (path.includes('/solutions')) {
            return {
                contextKey: 'solutions',
                title: 'AI Revenue Solutions',
                greeting: `Hello! 👋 Exploring our AI Revenue Solutions? We architect autonomous SDRs, dark-funnel discovery, and RevOps telemetry.`,
                quickPrompts: [
                    'Autonomous SDR Swarms',
                    'AI Market Strategy & TAM',
                    'Revenue Operations (RevOps)',
                    'Book Architecture Review'
                ]
            };
        }

        if (path.includes('/offerings')) {
            return {
                contextKey: 'offerings',
                title: 'Offerings & Profit Pool Discovery',
                greeting: `Hello! 👋 Exploring our Service Catalog? We specialize in 7 SPIN-based discovery frameworks across startup, growth, and enterprise stages.`,
                quickPrompts: [
                    'Explain Profit Pool Discovery',
                    'Startups vs Enterprise Offerings',
                    'SPIN Selling Methodology',
                    'Quick Diagnostic Inquiry'
                ]
            };
        }

        if (path.includes('/industries')) {
            return {
                contextKey: 'industries',
                title: 'Industry Vertical Engines',
                greeting: `Hello! 👋 Looking for industry-tailored growth? We have dedicated playbooks for SaaS, FinTech, Healthcare, E-Commerce, and Manufacturing.`,
                quickPrompts: [
                    'SaaS & Cloud NRR Expansion',
                    'FinTech Risk & Compliance',
                    'Healthcare HIPAA Discovery',
                    'Talk to Industry Specialist'
                ]
            };
        }

        if (path.includes('/outcomes')) {
            return {
                contextKey: 'outcomes',
                title: 'Verified Financial Outcomes',
                greeting: `Hello! 👋 Reviewing verified ROI benchmarks? Clients average 4.2× pipeline velocity and 68% lower CAC using our Autonomous Revenue OS.`,
                quickPrompts: [
                    'How do you achieve 4.2× velocity?',
                    '68% CAC Reduction Breakdown',
                    'Before vs After Comparison',
                    'Request Detailed Case Study'
                ]
            };
        }

        if (path.includes('/book-consultation') || path.includes('/talk-to-expert')) {
            return {
                contextKey: 'consultation',
                title: 'Consultation & Advisory Desk',
                greeting: `Hello! 👋 Ready to schedule your session? I can answer any questions about our consultation process or help you submit your inquiry immediately.`,
                quickPrompts: [
                    'What happens during consultation?',
                    'Who will I speak with?',
                    'Quick 60-Second Inquiry',
                    'Chat on WhatsApp (+91 9513088611)'
                ]
            };
        }

        // Default Homepage Context
        return {
            contextKey: 'home',
            title: 'Autonomous Revenue OS',
            greeting: `Hello! 👋 I'm ${agentName} (${agentRole}). Welcome to ProfitMachines. We help enterprise leaders deploy Autonomous Revenue Systems. How can I help you today?`,
            quickPrompts: [
                'Explore the 6 Core AI Engines',
                'How does Profit Pool Discovery work?',
                'Quick 60-Second Inquiry',
                'Book Architecture Call'
            ]
        };
    }, [location.pathname, agentName, agentRole]);

    // ── Initial & Route Navigation Message Management ───────────────────
    useEffect(() => {
        setMessages(prev => {
            if (prev.length === 0) {
                return [{
                    id: 'init-1',
                    role: 'assistant',
                    content: currentPageContext.greeting,
                    timestamp: new Date(),
                    actions: [
                        { label: '⚡ Quick Inquiry', action: 'quick_form' },
                        { label: '📅 Detailed Assessment', action: 'long_form' }
                    ],
                    pageContext: currentPageContext.contextKey
                }];
            }

            // If navigating to a different page section, post a friendly context switch note without clearing history
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.pageContext && lastMsg.pageContext !== currentPageContext.contextKey) {
                return [
                    ...prev,
                    {
                        id: `nav-${Date.now()}`,
                        role: 'assistant',
                        content: `📍 You've navigated to **${currentPageContext.title}**.\n${currentPageContext.greeting}`,
                        timestamp: new Date(),
                        actions: [
                            { label: '⚡ Quick Inquiry', action: 'quick_form' },
                            { label: '💬 WhatsApp Sales', action: 'whatsapp' }
                        ],
                        pageContext: currentPageContext.contextKey
                    }
                ];
            }

            return prev;
        });
    }, [currentPageContext]);

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isLoading]);

    // ── Context-Aware Response Engine ───────────────────────────────────
    const generateVerifiedResponse = (userText: string): { text: string; actions?: ActionButton[] } => {
        const q = userText.toLowerCase().trim();

        // 1. Booking / Consultation Intent
        if (q.includes('book') || q.includes('consult') || q.includes('schedule') || q.includes('call') || q.includes('meeting') || q.includes('demo')) {
            return {
                text: "We'd be delighted to arrange an architecture session with our revenue leadership team. You can submit a 60-second quick inquiry or complete a detailed assessment:",
                actions: [
                    { label: '⚡ Quick Inquiry (60s)', action: 'quick_form' },
                    { label: '📅 Detailed Assessment', action: 'long_form' },
                    { label: '💬 WhatsApp Direct', action: 'whatsapp' }
                ]
            };
        }

        // 2. Pricing Intent
        if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('tier') || q.includes('plan')) {
            return {
                text: "ProfitMachines offers transparent, high-ROI engagement tiers:\n\n• **Starter ($2,500/mo)**: Dynamic ICP discovery, demand sensing & market telemetry.\n• **Growth ($5,000/mo - Most Popular)**: Autonomous SDR pilot, multi-channel cadences, pipeline acceleration.\n• **Enterprise (Custom)**: Bespoke multi-agent swarms, complete RevOps architecture, dedicated principal architect.\n\nWould you like a custom proposal or quick inquiry?",
                actions: [
                    { label: '⚡ Quick Inquiry', action: 'quick_form' },
                    { label: '📅 Custom Enterprise Plan', action: 'long_form' }
                ]
            };
        }

        // 3. DemandPulse & Intent Radar
        if (q.includes('demandpulse') || q.includes('demand pulse') || q.includes('intent') || q.includes('dark funnel') || q.includes('radar')) {
            return {
                text: "**DemandPulse AI™** is our proprietary buyer intent engine. It ingests dark-funnel telemetry—such as anonymous enterprise website visits, developer repository stars, executive hiring surges, and technographic changes—and scores buying committees before competitors even know they're looking.",
                actions: [
                    { label: '⚡ Request Intent Demo', action: 'quick_form' },
                    { label: '💬 Chat on WhatsApp', action: 'whatsapp' }
                ]
            };
        }

        // 4. Crypto & Web3
        if (q.includes('crypto') || q.includes('web3') || q.includes('token') || q.includes('blockchain') || q.includes('tvl') || q.includes('defi')) {
            return {
                text: "Our **Web3 Growth Desk** helps Layer-1/Layer-2 protocols and DeFi protocols scale through algorithmic developer on-ramping, liquidity growth modeling, and sustainable TVL acquisition frameworks without inflationary dilution.",
                actions: [
                    { label: '⚡ Web3 Strategy Inquiry', action: 'quick_form' },
                    { label: '📅 Detailed Protocol Audit', action: 'long_form' }
                ]
            };
        }

        // 5. Profit Pools & Discovery Frameworks
        if (q.includes('profit pool') || q.includes('discovery') || q.includes('spin') || q.includes('market discovery')) {
            return {
                text: "Our **Profit Pool Discovery Suite** applies the SPIN selling methodology (Situation, Problem, Implication, Need-Payoff) across 7 specialized dimensions:\n1. Market Discovery\n2. Demand Discovery\n3. Value Discovery\n4. Channel Discovery\n5. Competitive Discovery\n6. Customer Discovery\n7. Product-Market Fit Discovery",
                actions: [
                    { label: '⚡ Run Quick Diagnostic', action: 'quick_form' },
                    { label: '📅 Request Discovery Plan', action: 'long_form' }
                ]
            };
        }

        // 6. Analytics & Telemetry
        if (q.includes('analytic') || q.includes('sheet') || q.includes('telemetry') || q.includes('bi') || q.includes('sankey') || q.includes('dashboard')) {
            return {
                text: "Our **Enterprise Analytics Dashboard** is driven by automated Google Sheet 2 data processing and features 16 operational views including Mission Control, Executive KPIs, Sankey Flows, Drop-off Forensics, Pareto Analysis, and Algorithmic Lead Scoring.",
                actions: [
                    { label: '⚡ Explore Telemetry', action: 'quick_form' }
                ]
            };
        }

        // 7. Outcomes & Benchmarks
        if (q.includes('outcome') || q.includes('roi') || q.includes('velocity') || q.includes('cac') || q.includes('case study') || q.includes('metric')) {
            return {
                text: "Verified outcomes from ProfitMachines deployments include:\n\n📈 **4.2× Average Pipeline Velocity**\n💰 **68% Lower Customer Acquisition Cost (CAC)**\n🎯 **3.1× Increase in Deal Win Rate**\n⚡ **92% Reduction in Manual RevOps Hours**",
                actions: [
                    { label: '⚡ Request ROI Assessment', action: 'quick_form' },
                    { label: '📅 Detailed Architecture Call', action: 'long_form' }
                ]
            };
        }

        // 8. Contact / WhatsApp
        if (q.includes('contact') || q.includes('whatsapp') || q.includes('phone') || q.includes('email') || q.includes('number')) {
            return {
                text: "You can reach ProfitMachines directly:\n\n• **WhatsApp Direct Line**: +91 9513088611\n• **Email**: support@profitmachines.com\n• **Priority Form**: Available right here in this chat window.",
                actions: [
                    { label: '💬 WhatsApp Sales', action: 'whatsapp' },
                    { label: '⚡ Quick Inquiry', action: 'quick_form' }
                ]
            };
        }

        // 9. Default Graceful Helpful Response
        return {
            text: `I understand you're inquiring about "${userText}". ProfitMachines architects autonomous revenue infrastructure, predictive deal intelligence, and dark funnel sensing for high-growth enterprises.\n\nWould you like me to connect you with an executive architect?`,
            actions: [
                { label: '⚡ Quick Inquiry', action: 'quick_form' },
                { label: '📅 Detailed Assessment', action: 'long_form' },
                { label: '💬 WhatsApp (+91 9513088611)', action: 'whatsapp' }
            ]
        };
    };

    // ── Track Chat Leads to Webhook ─────────────────────────────────────
    const trackChatLeadToSheet = (userQuery: string, intent: string) => {
        const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
            "https://script.google.com/macros/s/AKfycby1iANcG2ks_wGav58ZPAKt_DqHutVzODSNHK1T3q4QcHiP888S4DYnbFLvTV2JZdxU/exec";

        const summary = messages.slice(-4).map(m => `[${m.role}]: ${m.content.slice(0, 80)}`).join(' -> ');

        const payload = {
            table: 'Chatbot Leads',
            type: 'chatbot',
            lead_type: 'CHATBOT',
            fields: {
                'Chat Intent': intent,
                'Query': userQuery,
                'Current Page': location.pathname,
                'Conversation Summary': summary,
                'Agent Name': agentName,
                'Timestamp': new Date().toISOString(),
                'requirement': userQuery,
                'chat_summary': summary,
                'interest': intent,
                'page_path': location.pathname
            }
        };

        try {
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload)
            }).catch(() => {});
        } catch {}
    };

    // ── Handle Action Clicks ────────────────────────────────────────────
    const handleActionClick = (actionItem: ActionButton) => {
        if (actionItem.action === 'quick_form') {
            openQuickForm({
                defaultService: currentPageContext.title,
                source: `Chatbot (${currentPageContext.contextKey})`
            });
        } else if (actionItem.action === 'long_form') {
            openLongForm({
                defaultService: currentPageContext.title,
                source: `Chatbot (${currentPageContext.contextKey})`
            });
        } else if (actionItem.action === 'whatsapp') {
            const url = `https://wa.me/919513088611?text=${encodeURIComponent(`Hi ProfitMachines, I was chatting about ${currentPageContext.title} and would like to speak directly.`)}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    // ── Send Message ───────────────────────────────────────────────────
    const handleSend = (textToSend?: string) => {
        const query = (textToSend || inputValue).trim();
        if (!query) return;

        const userMsg: ChatMessage = {
            id: `usr-${Date.now()}`,
            role: 'user',
            content: query,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        trackChatLeadToSheet(query, currentPageContext.contextKey);

        setTimeout(() => {
            const result = generateVerifiedResponse(query);
            const aiMsg: ChatMessage = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: result.text,
                timestamp: new Date(),
                actions: result.actions,
                pageContext: currentPageContext.contextKey
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsLoading(false);
        }, 600);
    };

    return (
        <>
            {/* Chatbot Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="chatbot-container"
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-24 right-5 sm:right-6 w-[390px] max-w-[calc(100vw-2.5rem)] h-[620px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 z-[90] flex flex-col overflow-hidden font-sans ring-1 ring-black/5"
                    >
                        {/* Executive Dark Teal Header */}
                        <div
                            onPointerDown={(e) => dragControls.start(e)}
                            className="bg-[#064e3b] px-5 py-3.5 flex items-center justify-between text-white shrink-0 border-b border-emerald-500/20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
                                        <img src={logo} alt="ProfitMachines" className="w-full h-full object-contain" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10b981] border-2 border-[#064e3b] rounded-full" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="font-extrabold text-sm tracking-wide text-white font-heading">
                                            ProfitMachines AI
                                        </h3>
                                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-900/80 text-emerald-300 font-bold uppercase">
                                            Live
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-emerald-200/90 font-medium">
                                        {agentName} • {agentRole}
                                    </p>
                                </div>
                            </div>

                            <button
                                aria-label="Close chat"
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 text-emerald-200 hover:text-white rounded-full hover:bg-emerald-800/60 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Page Context Badge */}
                        <div className="bg-emerald-50/80 border-b border-emerald-100/80 px-4 py-2 flex items-center justify-between text-[11px] text-emerald-900 font-semibold shrink-0">
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                <span>Context: {currentPageContext.title}</span>
                            </span>
                            <button
                                onClick={() => openQuickForm({ defaultService: currentPageContext.title, source: 'Chat Header' })}
                                className="text-emerald-700 hover:text-emerald-900 underline font-bold"
                            >
                                Quick Form
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                            msg.role === 'user'
                                                ? 'bg-[#064e3b] text-white rounded-br-xs shadow-xs'
                                                : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs shadow-xs'
                                        }`}
                                    >
                                        <p className="whitespace-pre-line">{msg.content}</p>

                                        {/* Action Buttons inside message */}
                                        {msg.actions && msg.actions.length > 0 && (
                                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-2">
                                                {msg.actions.map((act, aIdx) => (
                                                    <button
                                                        key={aIdx}
                                                        onClick={() => handleActionClick(act)}
                                                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 text-[#064e3b] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                                                    >
                                                        <span>{act.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-center gap-2 text-slate-500 text-xs py-2 px-3 bg-white rounded-xl border border-slate-200 w-max shadow-xs">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                                    <span>{agentName} is thinking...</span>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Prompt Chips */}
                        <div className="bg-white border-t border-slate-200 px-3 py-2 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 shrink-0">
                            {currentPageContext.quickPrompts.map((chip, cIdx) => (
                                <button
                                    key={cIdx}
                                    onClick={() => handleSend(chip)}
                                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 text-slate-700 hover:text-[#064e3b] text-[11px] font-semibold transition-all shrink-0"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={`Ask ${agentName} anything about ${currentPageContext.title}...`}
                                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 outline-none text-xs sm:text-sm text-slate-900 transition-all placeholder:text-slate-400 bg-white"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    aria-label="Send message"
                                    className="p-2.5 rounded-xl bg-[#064e3b] hover:bg-[#085a45] text-white disabled:opacity-40 transition-all shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Chat Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Open AI Assistant Chat"
                    className="fixed bottom-6 right-5 sm:right-6 z-40 bg-[#064e3b] hover:bg-[#085a45] active:bg-[#032b24] text-white px-4 py-3 rounded-full shadow-xl shadow-[#064e3b]/30 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group ring-2 ring-white/60"
                >
                    <div className="relative">
                        <MessageSquare className="w-5 h-5 text-emerald-300" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                        Ask AI Assistant
                    </span>
                </button>
            )}
        </>
    );
}
