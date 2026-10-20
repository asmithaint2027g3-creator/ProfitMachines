import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    MessageSquare,
    X,
    Send,
    Bot,
    User,
    Sparkles,
    Calendar,
    ExternalLink,
    RotateCcw,
    CheckCircle2,
    ArrowRight,
    Building2,
    Mail,
    Phone,
    Briefcase,
    HelpCircle,
    ChevronDown,
    Zap,
    Compass
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../../assets/Trustgrid-logo.png';
import { useLeadModal } from '../context/LeadModalContext';
import { captureLeadInJira } from '../../lib/jira';
import { trackEvent } from '../../lib/analytics';
import {
    getPageContext,
    searchKnowledge,
    generateGroundedAnswer,
    PageContextData,
    ActionButton
} from '../services/knowledgeService';

type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
    actions?: ActionButton[];
    pageContext?: string;
    isLeadCard?: boolean;
    leadSubmitted?: boolean;
    provider?: string;
}

interface InChatLeadFormData {
    name: string;
    email: string;
    company: string;
    industry: string;
    challenge: string;
    preferredStep: string;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [agentName, setAgentName] = useState('Pooja');
    const [agentRole] = useState('Digital Success Director');
    const [aiStatus, setAiStatus] = useState<'grounded' | 'live'>('grounded');

    // In-chat Lead Form State
    const [activeLeadCardId, setActiveLeadCardId] = useState<string | null>(null);
    const [leadFormState, setLeadFormState] = useState<InChatLeadFormData>({
        name: '',
        email: '',
        company: '',
        industry: '',
        challenge: '',
        preferredStep: '15-Min Strategy Briefing'
    });
    const [leadSubmitting, setLeadSubmitting] = useState(false);
    const [leadFormError, setLeadFormError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const { openQuickForm, openLongForm } = useLeadModal();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const previousRouteRef = useRef<string>('');

    // ── Location / Name Mapping based on Timezone ────────────────────────
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

    // ── Detect Context on Every Route Change ─────────────────────────────
    const currentPageContext: PageContextData = useMemo(() => {
        return getPageContext(location.pathname, location.hash);
    }, [location.pathname, location.hash]);

    // Keep lead form industry updated to current page context
    useEffect(() => {
        setLeadFormState(prev => ({
            ...prev,
            industry: prev.industry || currentPageContext.selectedVertical || currentPageContext.parentIndustry || currentPageContext.title
        }));
    }, [currentPageContext]);

    // ── Route Change Notification in Chat History ─────────────────────────
    useEffect(() => {
        const currentRouteKey = `${location.pathname}${location.hash}`;

        // Initialize welcome message on first load
        if (messages.length === 0) {
            setMessages([{
                id: 'init-1',
                role: 'assistant',
                content: `Hello! 👋 I'm **${agentName}** (${agentRole}) at ProfitMachines.\n\nYou are viewing **${currentPageContext.title}**.\n\n${currentPageContext.summary}\n\nHow can I help you accelerate your revenue or evaluate our architecture today?`,
                timestamp: new Date(),
                actions: [
                    { label: '⚡ Quick Consultation', action: 'lead_card' },
                    { label: '📅 Detailed Assessment', action: 'long_form' }
                ],
                pageContext: currentPageContext.contextKey
            }]);
            previousRouteRef.current = currentRouteKey;
            return;
        }

        // When navigating to a new route, add a context shift indicator without wiping history
        if (previousRouteRef.current && previousRouteRef.current !== currentRouteKey) {
            setMessages(prev => [
                ...prev,
                {
                    id: `nav-${Date.now()}`,
                    role: 'assistant',
                    content: `📍 **Page Context Updated: [${currentPageContext.title}](${currentPageContext.route})**\n${currentPageContext.summary}`,
                    timestamp: new Date(),
                    actions: [
                        { label: '⚡ Discuss Requirements', action: 'lead_card' },
                        { label: '📅 Calendar Booking', action: 'navigate', target: '/book-consultation' }
                    ],
                    pageContext: currentPageContext.contextKey
                }
            ]);
            previousRouteRef.current = currentRouteKey;
        }
    }, [currentPageContext, location.pathname, location.hash, agentName, agentRole]);

    // Scroll to bottom on updates
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isLoading, activeLeadCardId]);

    // Track Chat Opening
    const handleToggleChat = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            trackEvent({
                eventName: 'chat_opened',
                category: 'CHATBOT',
                label: currentPageContext.title,
                pageUrl: location.pathname
            });
        }
    };

    // Keyboard ESC to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // ── Handle Action Clicks ─────────────────────────────────────────────
    const handleActionClick = (actionItem: ActionButton) => {
        trackEvent({
            eventName: 'chat_action_clicked',
            category: 'CHATBOT',
            label: actionItem.label,
            elementText: actionItem.action
        });

        if (actionItem.action === 'lead_card') {
            const cardId = `lead-${Date.now()}`;
            setActiveLeadCardId(cardId);
            setMessages(prev => [
                ...prev,
                {
                    id: cardId,
                    role: 'assistant',
                    content: `Please share your contact details below so our senior growth architect can prepare a diagnostic briefing for **${currentPageContext.title}**:`,
                    timestamp: new Date(),
                    isLeadCard: true,
                    pageContext: currentPageContext.contextKey
                }
            ]);
        } else if (actionItem.action === 'quick_form') {
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
            const url = `https://wa.me/919513088611?text=${encodeURIComponent(`Hi ProfitMachines, I was reviewing ${currentPageContext.title} on your website and would like to speak directly with an architect.`)}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        } else if (actionItem.action === 'navigate' && actionItem.target) {
            if (actionItem.target.startsWith('http')) {
                window.open(actionItem.target, '_blank', 'noopener,noreferrer');
            } else {
                navigate(actionItem.target);
            }
        }
    };

    // ── In-Chat Lead Submission ──────────────────────────────────────────
    const handleLeadSubmit = async (cardMsgId: string) => {
        setLeadFormError('');

        // Basic validation
        if (!leadFormState.name.trim()) {
            setLeadFormError('Please enter your full name.');
            return;
        }
        if (!leadFormState.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadFormState.email.trim())) {
            setLeadFormError('Please provide a valid corporate business email.');
            return;
        }
        if (!leadFormState.company.trim()) {
            setLeadFormError('Please provide your company or organization name.');
            return;
        }

        setLeadSubmitting(true);

        try {
            // Track lead start
            trackEvent({
                eventName: 'chat_lead_submitted',
                category: 'LEAD',
                label: leadFormState.preferredStep,
                pageUrl: location.pathname
            });

            // 1. Submit to Jira Lead Pipeline & Airtable
            const jiraResult = await captureLeadInJira('chatbot', {
                name: leadFormState.name.trim(),
                email: leadFormState.email.trim(),
                company: leadFormState.company.trim(),
                industry: leadFormState.industry.trim() || currentPageContext.title,
                message: `Lead Challenge: "${leadFormState.challenge || 'Not specified'}"\nPreferred Step: ${leadFormState.preferredStep}\nCurrent Page: ${currentPageContext.title} (${location.pathname})`,
                interest: leadFormState.preferredStep,
                service: currentPageContext.title,
                source: `AI Chatbot (${location.pathname})`
            });

            // 2. Submit to Google Sheets backend as fallback
            const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
                "https://script.google.com/macros/s/AKfycby1iANcG2ks_wGav58ZPAKt_DqHutVzODSNHK1T3q4QcHiP888S4DYnbFLvTV2JZdxU/exec";

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify({
                    table: 'Chatbot Leads',
                    type: 'chatbot',
                    lead_type: 'CHATBOT',
                    fields: {
                        'Full Name': leadFormState.name,
                        'Email': leadFormState.email,
                        'Company': leadFormState.company,
                        'Industry': leadFormState.industry,
                        'Challenge': leadFormState.challenge,
                        'Preferred Step': leadFormState.preferredStep,
                        'Current Page': location.pathname,
                        'Timestamp': new Date().toISOString()
                    }
                })
            }).catch(() => {});

            // Update message state with confirmation
            setMessages(prev => prev.map(m => {
                if (m.id === cardMsgId) {
                    return {
                        ...m,
                        leadSubmitted: true,
                        content: `✅ **Thank you, ${leadFormState.name}!**\n\nYour consultation briefing has been logged with reference \`${jiraResult.taskKey || 'PM-INBOUND-' + Date.now().toString().slice(-5)}\`.\n\nOur principal growth strategist will review your business requirements for **${currentPageContext.title}** and email you within 15 minutes.`
                    };
                }
                return m;
            }));

            // Reset form
            setActiveLeadCardId(null);
            setLeadFormState({
                name: '',
                email: '',
                company: '',
                industry: '',
                challenge: '',
                preferredStep: '15-Min Strategy Briefing'
            });

        } catch (err: any) {
            console.error('[ChatBot Lead Error]', err);
            setLeadFormError('Submission encountered a network issue. You can still reach us directly on WhatsApp or our calendar.');
        } finally {
            setLeadSubmitting(false);
        }
    };

    // ── Send Message & AI Execution ──────────────────────────────────────
    const handleSend = async (textToSend?: string) => {
        const query = (textToSend || inputValue).trim();
        if (!query || isLoading) return;

        const userMsg: ChatMessage = {
            id: `usr-${Date.now()}`,
            role: 'user',
            content: query,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        trackEvent({
            eventName: 'chat_message_sent',
            category: 'CHATBOT',
            label: query.slice(0, 50),
            pageUrl: location.pathname
        });

        // Search grounded knowledge base
        const knowledgeResult = searchKnowledge(query, currentPageContext);

        // Prepare message history for context
        const recentHistory = messages.slice(-6).map(m => ({
            role: m.role,
            content: m.content
        }));

        try {
            // Call serverless Vercel AI Chat endpoint
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: query,
                    pageContext: {
                        route: currentPageContext.route,
                        title: currentPageContext.title,
                        pageType: currentPageContext.pageType,
                        mainHeading: currentPageContext.mainHeading,
                        summary: currentPageContext.summary,
                        parentIndustry: currentPageContext.parentIndustry,
                        selectedVertical: currentPageContext.selectedVertical,
                        relevantOffering: currentPageContext.relevantOffering
                    },
                    groundedContext: knowledgeResult.formattedContext,
                    history: recentHistory
                })
            });

            if (response.ok) {
                const data = await response.json();

                if (data.status === 'ai_live' && data.message) {
                    setAiStatus('live');
                    setMessages(prev => [
                        ...prev,
                        {
                            id: `ai-${Date.now()}`,
                            role: 'assistant',
                            content: data.message,
                            timestamp: new Date(),
                            provider: data.provider || 'ai',
                            actions: [
                                { label: '⚡ Book Consultation', action: 'lead_card' },
                                { label: '📅 View Calendar', action: 'navigate', target: '/book-consultation' },
                                { label: '💬 WhatsApp', action: 'whatsapp' }
                            ],
                            pageContext: currentPageContext.contextKey
                        }
                    ]);
                    setIsLoading(false);
                    return;
                }
            }
        } catch (fetchErr) {
            console.warn('[ChatBot] Server AI endpoint unreachable or timed out; falling back to grounded domain response:', fetchErr);
        }

        // ── Fallback Grounded Engine (Instant, Reliable, High-Precision) ────
        setAiStatus('grounded');
        const groundedRes = generateGroundedAnswer(query, currentPageContext);

        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    id: `ai-${Date.now()}`,
                    role: 'assistant',
                    content: groundedRes.text,
                    timestamp: new Date(),
                    actions: groundedRes.actions,
                    pageContext: currentPageContext.contextKey
                }
            ]);
            setIsLoading(false);
        }, 350);
    };

    // ── Clear / Reset Conversation ──────────────────────────────────────
    const handleClearChat = () => {
        setMessages([{
            id: `init-${Date.now()}`,
            role: 'assistant',
            content: `Conversation refreshed. 👋 I'm **${agentName}** (${agentRole}).\n\nViewing **${currentPageContext.title}**.\nHow can I assist your team today?`,
            timestamp: new Date(),
            actions: [
                { label: '⚡ In-Chat Inquiry', action: 'lead_card' },
                { label: '📅 Calendar Booking', action: 'navigate', target: '/book-consultation' }
            ],
            pageContext: currentPageContext.contextKey
        }]);
        setActiveLeadCardId(null);
    };

    // ── Render Markdown Text & Clickable Internal Links ──────────────────
    const renderFormattedText = (text: string) => {
        // Regex splits markdown links: [label](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const paragraphs = text.split('\n');

        return (
            <div className="space-y-1.5 text-[11px] sm:text-xs leading-relaxed" style={{ fontFamily: "'Inter', 'Satoshi', system-ui, sans-serif" }}>
                {paragraphs.map((p, pIdx) => {
                    if (!p.trim()) return <div key={pIdx} className="h-1" />;

                    // Process bold text and links
                    const parts: React.ReactNode[] = [];
                    let lastIdx = 0;
                    let match: RegExpExecArray | null;

                    // Copy string to allow regex exec loop
                    const str = p;
                    linkRegex.lastIndex = 0;

                    while ((match = linkRegex.exec(str)) !== null) {
                        // Text before link
                        if (match.index > lastIdx) {
                            parts.push(renderBoldText(str.substring(lastIdx, match.index), `${pIdx}-${lastIdx}`));
                        }

                        const linkText = match[1];
                        const linkUrl = match[2];

                        parts.push(
                            <button
                                key={`link-${pIdx}-${match.index}`}
                                onClick={() => {
                                    if (linkUrl.startsWith('http')) {
                                        window.open(linkUrl, '_blank', 'noopener,noreferrer');
                                    } else {
                                        navigate(linkUrl);
                                    }
                                }}
                                className="inline-flex items-center gap-0.5 text-[#2878B5] hover:text-[#085a45] font-bold underline underline-offset-2 mx-0.5 transition-colors cursor-pointer"
                            >
                                <span>{linkText}</span>
                                <ExternalLink className="w-2.5 h-2.5 opacity-75" />
                            </button>
                        );

                        lastIdx = linkRegex.lastIndex;
                    }

                    if (lastIdx < str.length) {
                        parts.push(renderBoldText(str.substring(lastIdx), `${pIdx}-${lastIdx}`));
                    }

                    return <p key={pIdx}>{parts}</p>;
                })}
            </div>
        );
    };

    const renderBoldText = (text: string, keyPrefix: string) => {
        const boldRegex = /\*\*([^*]+)\*\*/g;
        const subParts: React.ReactNode[] = [];
        let last = 0;
        let bMatch: RegExpExecArray | null;

        while ((bMatch = boldRegex.exec(text)) !== null) {
            if (bMatch.index > last) {
                subParts.push(text.substring(last, bMatch.index));
            }
            subParts.push(
                <strong key={`${keyPrefix}-bold-${bMatch.index}`} className="font-semibold text-slate-800">
                    {bMatch[1]}
                </strong>
            );
            last = boldRegex.lastIndex;
        }

        if (last < text.length) {
            subParts.push(text.substring(last));
        }

        return <React.Fragment key={keyPrefix}>{subParts}</React.Fragment>;
    };

    return (
        <>
            {/* Chatbot Floating Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="chatbot-container"
                        role="dialog"
                        aria-label="ProfitMachines AI Executive Assistant"
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 w-[410px] max-w-[calc(100vw-1.5rem)] h-[630px] max-h-[calc(100vh-6.5rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 z-[90] flex flex-col overflow-hidden ring-1 ring-black/10" style={{ fontFamily: "'Inter', 'Satoshi', system-ui, sans-serif" }}
                    >
                        {/* Executive Teal Header */}
                        <div className="bg-[#2878B5] px-4 py-3 flex items-center justify-between text-white shrink-0 border-b border-emerald-500/20 shadow-xs">
                            <div className="flex items-center gap-2.5">
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
                                        <img src={logo} alt="ProfitMachines" className="w-full h-full object-contain" />
                                    </div>
                                    <span
                                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#2878B5] ${
                                            aiStatus === 'live' ? 'bg-emerald-400 animate-pulse' : 'bg-teal-300'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="font-extrabold text-sm tracking-wide text-white">
                                            ProfitMachines AI
                                        </h3>
                                        <span
                                            title={
                                                aiStatus === 'live'
                                                    ? 'Connected to Live LLM'
                                                    : 'Operating in Grounded Domain Mode (Add OPENAI_API_KEY for live LLM)'
                                            }
                                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider ${
                                                aiStatus === 'live'
                                                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-400/40'
                                                    : 'bg-teal-950/80 text-teal-200 border border-teal-400/30'
                                            }`}
                                        >
                                            {aiStatus === 'live' ? 'Live AI' : 'Grounded'}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-emerald-100/90 font-medium">
                                        {agentName} • {agentRole}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleClearChat}
                                    title="Reset conversation"
                                    aria-label="Reset conversation"
                                    className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleToggleChat(false)}
                                    title="Close chat"
                                    aria-label="Close chat"
                                    className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Page Context Synchronizer Badge */}
                        <div className="bg-emerald-50/90 border-b border-emerald-100/80 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-emerald-950 font-medium shrink-0">
                            <span className="flex items-center gap-1.5 truncate max-w-[70%]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping shrink-0" />
                                <span className="truncate">
                                    <strong className="font-semibold text-emerald-900">Context:</strong> {currentPageContext.title}
                                </span>
                            </span>
                            <button
                                onClick={() => handleActionClick({ label: 'In-Chat Form', action: 'lead_card' })}
                                className="text-[#2878B5] hover:text-[#085a45] font-bold text-[11px] flex items-center gap-0.5 hover:underline"
                            >
                                <span>Quick Lead</span>
                                <ChevronDown className="w-3 h-3" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            aria-live="polite"
                            className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-slate-50/60 text-slate-800"
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div
                                        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-xs ${
                                            msg.role === 'user'
                                                ? 'bg-[#2878B5] text-white rounded-br-xs'
                                                : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                                        }`}
                                    >
                                        {msg.role === 'user' ? (
                                            <p className="text-[11px] sm:text-xs leading-relaxed whitespace-pre-line font-medium">
                                                {msg.content}
                                            </p>
                                        ) : (
                                            renderFormattedText(msg.content)
                                        )}

                                        {/* In-Chat Interactive Lead Capture Card */}
                                        {msg.isLeadCard && !msg.leadSubmitted && (
                                            <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-emerald-200/80 shadow-xs">
                                                <div className="flex items-center gap-1.5 mb-2.5 text-xs font-bold text-slate-900">
                                                    <Briefcase className="w-3.5 h-3.5 text-[#2878B5]" />
                                                    <span>Diagnostic Consultation Request</span>
                                                </div>

                                                {leadFormError && (
                                                    <div className="mb-2 p-1.5 bg-red-50 border border-red-200 rounded text-[11px] text-red-600">
                                                        {leadFormError}
                                                    </div>
                                                )}

                                                <div className="space-y-2 text-xs">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-0.5">
                                                            Your Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={leadFormState.name}
                                                            onChange={e => setLeadFormState(prev => ({ ...prev, name: e.target.value }))}
                                                            placeholder="e.g. Alex Morgan"
                                                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:border-[#2878B5] text-slate-900"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-1.5">
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-0.5">
                                                                Work Email *
                                                            </label>
                                                            <input
                                                                type="email"
                                                                value={leadFormState.email}
                                                                onChange={e => setLeadFormState(prev => ({ ...prev, email: e.target.value }))}
                                                                placeholder="alex@company.com"
                                                                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:border-[#2878B5] text-slate-900"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-0.5">
                                                                Company *
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={leadFormState.company}
                                                                onChange={e => setLeadFormState(prev => ({ ...prev, company: e.target.value }))}
                                                                placeholder="Acme Corp"
                                                                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:border-[#2878B5] text-slate-900"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-0.5">
                                                            Primary Challenge / Objective
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={leadFormState.challenge}
                                                            onChange={e => setLeadFormState(prev => ({ ...prev, challenge: e.target.value }))}
                                                            placeholder="e.g. Pipeline velocity, CAC reduction, dark funnel"
                                                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:border-[#2878B5] text-slate-900"
                                                        />
                                                    </div>

                                                    <div className="pt-1 flex items-center justify-between">
                                                        <button
                                                            type="button"
                                                            disabled={leadSubmitting}
                                                            onClick={() => handleLeadSubmit(msg.id)}
                                                            className="w-full py-2 bg-[#2878B5] hover:bg-[#085a45] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                                                        >
                                                            {leadSubmitting ? (
                                                                <span>Submitting to Jira CRM...</span>
                                                            ) : (
                                                                <>
                                                                    <span>Submit Briefing (15-Min Callback)</span>
                                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons inside message */}
                                        {msg.actions && msg.actions.length > 0 && !msg.isLeadCard && (
                                            <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                                                {msg.actions.map((act, aIdx) => (
                                                    <button
                                                        key={aIdx}
                                                        onClick={() => handleActionClick(act)}
                                                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200/80 text-[#2878B5] text-[11px] font-bold transition-all flex items-center gap-1 shadow-2xs hover:scale-[1.02] active:scale-[0.98]"
                                                    >
                                                        <span>{act.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <span className="text-[10px] text-slate-400 mt-0.5 px-1">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-center gap-2 text-slate-500 text-xs py-2 px-3 bg-white rounded-xl border border-slate-200 w-max shadow-xs">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                                    <span>{agentName} is analyzing {currentPageContext.title}...</span>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Page-Specific Suggested Questions Carousel */}
                        <div className="bg-white border-t border-slate-200 px-3 py-2 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 shrink-0">
                            {currentPageContext.suggestedQuestions.map((chip, cIdx) => (
                                <button
                                    key={cIdx}
                                    onClick={() => handleSend(chip)}
                                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 text-slate-700 hover:text-[#2878B5] text-[11px] font-medium transition-all shrink-0 hover:shadow-2xs active:scale-95"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>

                        {/* Input Form */}
                        <div className="p-2.5 bg-white border-t border-slate-200 shrink-0">
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
                                    placeholder={`Ask about ${currentPageContext.title}...`}
                                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 focus:border-[#2878B5] focus:ring-2 focus:ring-[#2878B5]/20 outline-none text-[11px] sm:text-xs text-slate-900 transition-all placeholder:text-slate-400 bg-white"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    aria-label="Send message to AI assistant"
                                    className="p-2.5 rounded-xl bg-[#2878B5] hover:bg-[#085a45] text-white disabled:opacity-40 transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Chat Launcher Button (Unobtrusive & Accessible) */}
            {!isOpen && (
                <button
                    onClick={() => handleToggleChat(true)}
                    aria-label="Open ProfitMachines AI Assistant"
                    className="fixed bottom-20 sm:bottom-6 right-5 sm:right-6 z-50 bg-[#2878B5] hover:bg-[#085a45] active:bg-[#032b24] text-white px-4 py-3 rounded-full shadow-xl shadow-[#2878B5]/30 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group ring-2 ring-white/70 cursor-pointer"
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
