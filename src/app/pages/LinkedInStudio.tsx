import React, { useState, useEffect } from 'react';
import { 
    CheckCircle2, Clock, Send, Copy, Edit3, Trash2, ExternalLink, 
    AlertCircle, Sparkles, RefreshCw, Calendar, TrendingUp, 
    Building2, ShieldCheck, Eye, ThumbsUp, MessageSquare, Share2,
    Check, X, ChevronDown, ArrowRight, Lock, Key, LogOut
} from 'lucide-react';
import { 
    LinkedInPost, getStoredPosts, saveStoredPosts, createNewDraft, 
    buildUtmUrl, formatFullPostText, DEFAULT_LINKEDIN_POSTS 
} from '../../lib/linkedinContent';
import LinkedInOrganicLeads from '../components/linkedin/LinkedInOrganicLeads';

export default function LinkedInStudio() {
    // Admin Security Gate State
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        return sessionStorage.getItem('pm_admin_auth') === 'true';
    });
    const [passcode, setPasscode] = useState('');
    const [passcodeError, setPasscodeError] = useState('');

    const [studioSection, setStudioSection] = useState<'LEADS' | 'PUBLISHER'>('LEADS');
    const [posts, setPosts] = useState<LinkedInPost[]>([]);
    const [activeTab, setActiveTab] = useState<'ALL' | 'DRAFT' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED'>('ALL');
    const [selectedPost, setSelectedPost] = useState<LinkedInPost | null>(null);
    const [editingPost, setEditingPost] = useState<LinkedInPost | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
    const [publishingId, setPublishingId] = useState<string | null>(null);
    const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
    
    // API Connection Diagnostics
    const [apiDiagnostics, setApiDiagnostics] = useState<{
        configured: boolean;
        organizationId: string;
        tokenStatus: string;
        publishingIdentity: string;
        instructions?: string[];
    } | null>(null);
    const [isCheckingApi, setIsCheckingApi] = useState(false);

    // Schedule modal state
    const [schedulingPost, setSchedulingPost] = useState<LinkedInPost | null>(null);
    const [scheduleDateTime, setScheduleDateTime] = useState('');

    // LinkedIn Post Analytics & Engagement State
    const [isSyncingAnalytics, setIsSyncingAnalytics] = useState(false);
    const [analyticsSummary, setAnalyticsSummary] = useState<{
        totalImpressions: number;
        totalLikes: number;
        totalComments: number;
        leadsDiscovered: number;
        lastSyncedAt?: string;
    } | null>(null);

    useEffect(() => {
        const loaded = getStoredPosts();
        setPosts(loaded);
        if (loaded.length > 0) {
            setSelectedPost(loaded[0]);
        }
        checkApiDiagnostics();
    }, []);

    const checkApiDiagnostics = async () => {
        setIsCheckingApi(true);
        try {
            const res = await fetch('/api/linkedin-publish');
            if (res.ok) {
                const data = await res.json();
                setApiDiagnostics(data);
            }
        } catch {
            setApiDiagnostics({
                configured: false,
                organizationId: 'OFFLINE_OR_UNREACHABLE',
                tokenStatus: 'CHECK_FAILED',
                publishingIdentity: 'ProfitMachines Company Page'
            });
        } finally {
            setIsCheckingApi(false);
        }
    };

    const handleSyncAnalytics = async () => {
        setIsSyncingAnalytics(true);
        const adminKey = sessionStorage.getItem('pm_admin_key') || 'pm2026';
        try {
            const res = await fetch('/api/linkedin-analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminKey}`
                },
                body: JSON.stringify({ adminKey })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setAnalyticsSummary({
                    ...data.summary,
                    lastSyncedAt: new Date().toLocaleTimeString()
                });
                setActionMessage({
                    type: 'success',
                    text: `✅ LinkedIn Analytics Synced: ${data.summary.totalImpressions} views/impressions, ${data.summary.totalLikes} likes/reactions, ${data.summary.totalComments} comments, and ${data.summary.leadsDiscovered} leads recorded into Google Sheets!`
                });
            } else {
                setActionMessage({
                    type: 'error',
                    text: data.message || 'LinkedIn analytics sync returned a warning.'
                });
            }
        } catch (err: any) {
            setActionMessage({
                type: 'error',
                text: `Network failure syncing LinkedIn analytics: ${err.message}`
            });
        } finally {
            setIsSyncingAnalytics(false);
        }
    };

    const updatePostInState = (updated: LinkedInPost) => {
        const newPosts = posts.map(p => p.id === updated.id ? updated : p);
        setPosts(newPosts);
        saveStoredPosts(newPosts);
        if (selectedPost?.id === updated.id) {
            setSelectedPost(updated);
        }
    };

    const handleApprove = (post: LinkedInPost) => {
        const updated: LinkedInPost = {
            ...post,
            status: 'APPROVED',
            lastError: undefined
        };
        updatePostInState(updated);
        setActionMessage({ type: 'success', text: `Post "${post.title}" has been APPROVED for publication.` });
    };

    const handleReject = (post: LinkedInPost) => {
        const updated: LinkedInPost = {
            ...post,
            status: 'REJECTED'
        };
        updatePostInState(updated);
        setActionMessage({ type: 'info', text: `Post "${post.title}" marked as REJECTED.` });
    };

    const handleOpenSchedule = (post: LinkedInPost) => {
        setSchedulingPost(post);
        // Default to tomorrow at 10:00 AM
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(10, 0, 0, 0);
        setScheduleDateTime(tomorrow.toISOString().slice(0, 16));
    };

    const handleConfirmSchedule = () => {
        if (!schedulingPost || !scheduleDateTime) return;
        const updated: LinkedInPost = {
            ...schedulingPost,
            status: 'SCHEDULED',
            scheduledAt: new Date(scheduleDateTime).toISOString()
        };
        updatePostInState(updated);
        setSchedulingPost(null);
        setActionMessage({
            type: 'success',
            text: `Post scheduled for ${new Date(scheduleDateTime).toLocaleString()}!`
        });
    };

    const handleCopyPost = (post: LinkedInPost) => {
        const textToCopy = post.fullPostText || formatFullPostText(post);
        navigator.clipboard.writeText(textToCopy);
        setCopiedPostId(post.id);
        setTimeout(() => setCopiedPostId(null), 3000);
        setActionMessage({
            type: 'success',
            text: 'Post text and tracked URL copied to clipboard! You can paste directly to LinkedIn.'
        });
    };

    const handlePublishToLinkedIn = async (post: LinkedInPost) => {
        if (post.status !== 'APPROVED' && post.status !== 'SCHEDULED') {
            setActionMessage({
                type: 'error',
                text: 'Only APPROVED or SCHEDULED posts can be published. Please approve this post first.'
            });
            return;
        }

        setPublishingId(post.id);
        setActionMessage(null);

        const currentKey = sessionStorage.getItem('pm_admin_key') || 'pm2026';

        try {
            const res = await fetch('/api/linkedin-publish', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentKey}`
                },
                body: JSON.stringify({
                    adminKey: currentKey,
                    postId: post.id,
                    fullPostText: post.fullPostText,
                    title: post.title,
                    targetUrl: post.utmUrl,
                    campaignSlug: post.campaignSlug
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                const updated: LinkedInPost = {
                    ...post,
                    status: 'PUBLISHED',
                    publishedAt: new Date().toISOString(),
                    linkedinPostUrn: data.postUrn,
                    lastError: undefined
                };
                updatePostInState(updated);
                setActionMessage({
                    type: 'success',
                    text: `🚀 Successfully published to ProfitMachines Company Page! Post URN: ${data.postUrn}`
                });
            } else {
                // If credentials are missing, offer clear guidance
                const errorMsg = data.message || data.error || 'LinkedIn API call rejected';
                const updated: LinkedInPost = {
                    ...post,
                    lastError: errorMsg
                };
                updatePostInState(updated);
                setActionMessage({
                    type: 'error',
                    text: `Publishing pending: ${errorMsg}`
                });
            }
        } catch (err: any) {
            setActionMessage({
                type: 'error',
                text: `Network failure connecting to LinkedIn publisher: ${err.message}`
            });
        } finally {
            setPublishingId(null);
        }
    };

    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPost) return;

        const utmUrl = buildUtmUrl(editingPost.targetServicePath, editingPost.campaignSlug, editingPost.id);
        const fullPostText = formatFullPostText({
            hook: editingPost.hook,
            body: editingPost.body,
            ctaText: editingPost.ctaText,
            utmUrl,
            hashtags: editingPost.hashtags
        });

        const updated: LinkedInPost = {
            ...editingPost,
            utmUrl,
            fullPostText,
            status: editingPost.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT'
        };

        updatePostInState(updated);
        setEditingPost(null);
        setActionMessage({ type: 'success', text: 'Post updated successfully!' });
    };

    const handleGenerateNewPost = (serviceKey: string) => {
        setIsGenerating(true);
        const templates: Record<string, any> = {
            'abm-autopilot': {
                title: 'AI Account-Based Marketing (ABM) on Autopilot',
                topic: 'AI ABM Autopilot',
                serviceCategory: 'abm-autopilot',
                hook: 'Are your sales reps still manually researching Fortune 500 buying committees? Autonomous ABM changes the math.',
                body: `Target accounts don't convert from generic cold sequences. They convert when your message speaks directly to their internal priorities.\n\nProfitMachines ABM Autopilot syncs target account lists directly from your CRM, identifying hidden executive stakeholders and orchestrating personalized outreach at enterprise scale.`,
                ctaText: 'Accelerate target account win rates with ProfitMachines ABM Autopilot:',
                targetServicePath: '/industries/abm-autopilot',
                campaignSlug: 'abm-autopilot',
                hashtags: ['#ABM', '#B2BGrowth', '#AccountBasedMarketing', '#ProfitMachines']
            },
            'ai-pipeline-velocity': {
                title: 'Eliminate Deal Stall: Next-Best-Action for B2B Closers',
                topic: 'Pipeline Velocity Engine',
                serviceCategory: 'ai-pipeline-velocity',
                hook: '67% of qualified deals stall in the proposal stage. Not because the client said no — but because the momentum died.',
                body: `ProfitMachines monitors deal velocity, stakeholder sentiment, and communication gaps across every open opportunity.\n\nWhen momentum slows, our models deliver automated next-best-action guidance to keep enterprise transactions moving forward.`,
                ctaText: 'Shorten your sales cycle length with ProfitMachines Pipeline Intelligence:',
                targetServicePath: '/industries/ai-pipeline-velocity',
                campaignSlug: 'pipeline-velocity',
                hashtags: ['#SalesVelocity', '#DealClosing', '#RevenueOperations', '#ProfitMachines']
            }
        };

        const template = templates[serviceKey] || templates['abm-autopilot'];
        setTimeout(() => {
            const newPost = createNewDraft(template);
            setPosts([newPost, ...posts]);
            setSelectedPost(newPost);
            setIsGenerating(false);
            setActionMessage({ type: 'success', text: `Generated new B2B draft for ${template.topic}!` });
        }, 600);
    };

    const filteredPosts = posts.filter(p => {
        if (activeTab === 'ALL') return true;
        return p.status === activeTab;
    });

    const counts = {
        ALL: posts.length,
        DRAFT: posts.filter(p => p.status === 'DRAFT').length,
        APPROVED: posts.filter(p => p.status === 'APPROVED').length,
        SCHEDULED: posts.filter(p => p.status === 'SCHEDULED').length,
        PUBLISHED: posts.filter(p => p.status === 'PUBLISHED').length
    };

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        const entered = passcode.trim();
        const validPasscodes = ['pm2026', 'profitmachines2026', 'profitmachines_analytics_secure_key_2026'];
        if (validPasscodes.includes(entered)) {
            sessionStorage.setItem('pm_admin_auth', 'true');
            sessionStorage.setItem('pm_admin_key', entered);
            setIsAuthenticated(true);
            setPasscodeError('');
        } else {
            setPasscodeError('Invalid Admin Passcode. Access denied.');
        }
    };

    const handleLock = () => {
        sessionStorage.removeItem('pm_admin_auth');
        sessionStorage.removeItem('pm_admin_key');
        setIsAuthenticated(false);
        setPasscode('');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#02130d] flex items-center justify-center p-6 text-slate-100 font-sans">
                <div className="max-w-md w-full bg-[#0A253D] border border-emerald-600/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 mb-5 shadow-inner">
                        <Lock className="w-8 h-8" />
                    </div>

                    <div className="text-center">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest">
                            Restricted Admin Area
                        </span>
                        <h2 className="text-2xl font-black text-white mt-3 tracking-tight">
                            ProfitMachines Security Perimeter
                        </h2>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                            Only authorized administrators can review, schedule, and publish LinkedIn content. Enter your Admin Key to continue.
                        </p>
                    </div>

                    <form onSubmit={handleUnlock} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-emerald-300 mb-1.5">
                                Admin Passcode / Security Key
                            </label>
                            <input
                                type="password"
                                value={passcode}
                                onChange={e => { setPasscode(e.target.value); setPasscodeError(''); }}
                                placeholder="Enter admin key (e.g. pm2026)"
                                className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition"
                                autoFocus
                            />
                            {passcodeError && (
                                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 font-medium">
                                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {passcodeError}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer flex items-center justify-center gap-2"
                        >
                            <Key className="w-4 h-4" /> Unlock LinkedIn Studio
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-emerald-800/30 text-center">
                        <a
                            href="/"
                            className="text-xs text-slate-400 hover:text-emerald-300 transition"
                        >
                            ← Return to ProfitMachines Homepage
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#02130d] text-slate-100 font-sans pb-24">
            {/* Top Brand Banner */}
            <div className="bg-gradient-to-r from-[#2878B5] via-[#043327] to-[#021b14] border-b border-emerald-800/40 py-6 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5" /> Company Page Identity
                            </span>
                            <span className="text-xs text-slate-400">Strict Organization Mode</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
                            ProfitMachines LinkedIn Growth Studio
                        </h1>
                        <p className="text-sm text-emerald-200/80 mt-1">
                            Review, approve, and publish B2B content directly to the ProfitMachines Company Page with automated UTM attribution.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleGenerateNewPost('abm-autopilot')}
                            disabled={isGenerating}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4" />
                            {isGenerating ? 'Synthesizing...' : 'Generate New Draft'}
                        </button>
                        <button
                            onClick={handleLock}
                            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900/60 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 text-xs border border-slate-700/60 transition-all cursor-pointer"
                            title="Lock Admin Studio"
                        >
                            <Lock className="w-3.5 h-3.5" /> Lock Studio
                        </button>
                        <a
                            href="https://profit-machines.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-sm border border-slate-700/60 transition-all"
                        >
                            Live Site <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Top Studio Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-6">
                <div className="flex items-center gap-3 border-b border-emerald-800/40 pb-3">
                    <button
                        onClick={() => setStudioSection('LEADS')}
                        className={`px-4 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 cursor-pointer ${
                            studioSection === 'LEADS'
                                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                        }`}
                    >
                        <MessageSquare className="w-4 h-4" /> Organic Post Leads & Engagement
                    </button>
                    <button
                        onClick={() => setStudioSection('PUBLISHER')}
                        className={`px-4 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 cursor-pointer ${
                            studioSection === 'PUBLISHER'
                                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                        }`}
                    >
                        <Edit3 className="w-4 h-4" /> Content Studio & Publisher
                    </button>
                </div>
            </div>

            {studioSection === 'LEADS' ? (
                <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-6">
                    <LinkedInOrganicLeads />
                </div>
            ) : (
                <>
            {/* Connection Diagnostics Card */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-6">
                <div className="bg-[#091D2C] border border-emerald-700/40 rounded-2xl p-5 shadow-xl">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                            <div className={`p-2.5 rounded-xl ${apiDiagnostics?.configured ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'}`}>
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2.5">
                                    <h3 className="font-bold text-white text-base">Official LinkedIn API Integration</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${apiDiagnostics?.configured ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                                        {apiDiagnostics?.configured ? '● LIVE & CONNECTED' : '○ CREDENTIALS PENDING'}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-300 mt-1">
                                    Publishing Target: <strong className="text-emerald-300">ProfitMachines Company Page</strong> &nbsp;•&nbsp; 
                                    Personal Profiles: <strong className="text-slate-400">Blocked by policy</strong> &nbsp;•&nbsp; 
                                    Airtable & Jira Attribution: <strong className="text-emerald-300">Active</strong> &nbsp;•&nbsp; 
                                    Google Apps Script Publishing: <strong className="text-emerald-300">Enabled (LinkedIn_Posts Tab)</strong>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Apps Script Dual-Publish Ready
                            </span>
                            <button
                                onClick={checkApiDiagnostics}
                                disabled={isCheckingApi}
                                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${isCheckingApi ? 'animate-spin' : ''}`} /> Refresh Status
                            </button>
                        </div>
                    </div>

                    {!apiDiagnostics?.configured && (
                        <div className="mt-4 pt-4 border-t border-emerald-800/30 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-amber-200">
                                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
                                <span>
                                    <strong>Manual Fallback Ready:</strong> You can review, approve, and <strong>1-Click Copy</strong> complete posts with tracked URLs to post manually anytime.
                                </span>
                            </div>
                            <span className="text-slate-400 text-[11px]">
                                To enable 100% automated API publishing, add <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">LINKEDIN_ORG_ID</code> & <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">LINKEDIN_ACCESS_TOKEN</code> in Vercel.
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Notification Banner */}
            {actionMessage && (
                <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-4">
                    <div className={`p-4 rounded-xl border flex items-center justify-between text-sm ${
                        actionMessage.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' :
                        actionMessage.type === 'error' ? 'bg-rose-950/80 border-rose-500/50 text-rose-200' :
                        'bg-slate-900/80 border-slate-700 text-slate-200'
                    }`}>
                        <div className="flex items-center gap-2.5">
                            {actionMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                            {actionMessage.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
                            <span>{actionMessage.text}</span>
                        </div>
                        <button onClick={() => setActionMessage(null)} className="text-slate-400 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-8 space-y-6">
                {/* LinkedIn Analytics & Engagement Grid */}
                <div className="bg-[#091D2C] border border-emerald-700/40 rounded-2xl p-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/40">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-white text-base flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-emerald-400" /> LinkedIn Post Analytics & Google Sheets Sync
                                </h3>
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                    AUTO SYNC
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 mt-1">
                                Tracks who saw your posts, who liked/reacted, who commented, and identifies buyer leads into Google Sheets, Airtable, & Jira.
                            </p>
                        </div>

                        <button
                            onClick={handleSyncAnalytics}
                            disabled={isSyncingAnalytics}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                                isSyncingAnalytics
                                    ? 'bg-emerald-700/50 text-slate-300 cursor-not-allowed'
                                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                            }`}
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAnalytics ? 'animate-spin' : ''}`} />
                            {isSyncingAnalytics ? 'Syncing with LinkedIn & Sheet...' : 'Sync Views, Likes & Comments to Sheet'}
                        </button>
                    </div>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                        <div className="bg-[#02130d] border border-emerald-900/50 rounded-xl p-4">
                            <div className="text-xs text-slate-400 flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5 text-sky-400" /> Impressions (Who Saw)
                            </div>
                            <div className="text-2xl font-black text-white mt-1">
                                {analyticsSummary ? analyticsSummary.totalImpressions.toLocaleString() : 'Live on Sync'}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                                Total viewers reached across posts
                            </div>
                        </div>

                        <div className="bg-[#02130d] border border-emerald-900/50 rounded-xl p-4">
                            <div className="text-xs text-slate-400 flex items-center gap-1.5">
                                <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" /> Likes & Reactions
                            </div>
                            <div className="text-2xl font-black text-white mt-1">
                                {analyticsSummary ? analyticsSummary.totalLikes.toLocaleString() : 'Live on Sync'}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                                Reacters logged in <code className="text-emerald-300">LinkedIn_Reactions</code>
                            </div>
                        </div>

                        <div className="bg-[#02130d] border border-emerald-900/50 rounded-xl p-4">
                            <div className="text-xs text-slate-400 flex items-center gap-1.5">
                                <MessageSquare className="w-3.5 h-3.5 text-teal-400" /> Post Comments
                            </div>
                            <div className="text-2xl font-black text-white mt-1">
                                {analyticsSummary ? analyticsSummary.totalComments.toLocaleString() : 'Live on Sync'}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                                Stored in <code className="text-emerald-300">LinkedIn_Comments</code>
                            </div>
                        </div>

                        <div className="bg-[#02130d] border border-emerald-900/50 rounded-xl p-4">
                            <div className="text-xs text-slate-400 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Buyer Leads Flagged
                            </div>
                            <div className="text-2xl font-black text-amber-300 mt-1">
                                {analyticsSummary ? analyticsSummary.leadsDiscovered : '0'}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                                Synced to Airtable CRM & Jira PROF
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-emerald-900/30 text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Google Sheet Tabs: <strong className="text-emerald-300">LinkedIn_Post_Analytics, LinkedIn_Comments, LinkedIn_Reactions, LinkedIn_Leads</strong></span>
                        <span>{analyticsSummary?.lastSyncedAt ? `Last Synced: ${analyticsSummary.lastSyncedAt}` : 'Click button above to run sync'}</span>
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex items-center gap-2 border-b border-emerald-900/40 pb-4 overflow-x-auto">
                    {(['ALL', 'DRAFT', 'APPROVED', 'SCHEDULED', 'PUBLISHED'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                                activeTab === tab
                                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                            }`}
                        >
                            {tab === 'ALL' && 'All Posts'}
                            {tab === 'DRAFT' && 'Drafts (Needs Review)'}
                            {tab === 'APPROVED' && 'Approved'}
                            {tab === 'SCHEDULED' && 'Scheduled'}
                            {tab === 'PUBLISHED' && 'Published'}
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                                activeTab === tab ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                            }`}>
                                {counts[tab]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* 2-Column Grid: List on Left, Realistic LinkedIn Preview on Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                    {/* Left Column: Post Cards List */}
                    <div className="lg:col-span-6 space-y-4">
                        {filteredPosts.length === 0 ? (
                            <div className="bg-[#091D2C]/50 border border-emerald-800/20 rounded-2xl p-12 text-center">
                                <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-3 opacity-60" />
                                <h3 className="font-semibold text-white">No posts in this category</h3>
                                <p className="text-xs text-slate-400 mt-1">Generate a new draft or switch tabs.</p>
                            </div>
                        ) : (
                            filteredPosts.map(post => {
                                const isSelected = selectedPost?.id === post.id;
                                return (
                                    <div
                                        key={post.id}
                                        onClick={() => setSelectedPost(post)}
                                        className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                                            isSelected 
                                                ? 'bg-[#0E2C44] border-emerald-500 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50' 
                                                : 'bg-[#081824]/70 border-emerald-900/40 hover:bg-[#06241a] hover:border-emerald-700/60'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                                    post.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                                    post.status === 'APPROVED' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' :
                                                    post.status === 'SCHEDULED' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                                                    post.status === 'REJECTED' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                                                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                                }`}>
                                                    {post.status}
                                                </span>
                                                <span className="text-xs text-slate-400">{post.topic}</span>
                                            </div>
                                            <span className="text-[11px] text-slate-500 font-mono">{post.id}</span>
                                        </div>

                                        <h3 className="text-base font-bold text-white mt-2.5 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-xs text-slate-300/80 mt-1.5 line-clamp-2">
                                            {post.hook}
                                        </p>

                                        {post.scheduledAt && (
                                            <div className="mt-2 text-xs text-sky-300 flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                Scheduled for: {new Date(post.scheduledAt).toLocaleString()}
                                            </div>
                                        )}

                                        {post.lastError && (
                                            <div className="mt-2 text-xs text-rose-300 flex items-center gap-1.5">
                                                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                                <span className="truncate">{post.lastError}</span>
                                            </div>
                                        )}

                                        {/* Action Buttons Toolbar */}
                                        <div className="mt-4 pt-3 border-t border-emerald-900/30 flex items-center justify-between gap-2" onClick={e => e.stopPropagation()}>
                                            <div className="flex items-center gap-1.5">
                                                {post.status === 'DRAFT' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(post)}
                                                            className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold border border-emerald-500/30 transition flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <Check className="w-3.5 h-3.5" /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(post)}
                                                            className="text-xs px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <X className="w-3.5 h-3.5" /> Reject
                                                        </button>
                                                    </>
                                                )}

                                                {post.status === 'APPROVED' && (
                                                    <button
                                                        onClick={() => handleOpenSchedule(post)}
                                                        className="text-xs px-2.5 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-semibold border border-sky-500/30 transition flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <Calendar className="w-3.5 h-3.5" /> Schedule
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => setEditingPost(post)}
                                                    className="text-xs px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1 cursor-pointer"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" /> Edit
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => handleCopyPost(post)}
                                                    className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1 cursor-pointer"
                                                    title="Copy formatted post text & UTM URL"
                                                >
                                                    {copiedPostId === post.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                                    {copiedPostId === post.id ? 'Copied' : 'Copy'}
                                                </button>

                                                {(post.status === 'APPROVED' || post.status === 'SCHEDULED') && (
                                                    <button
                                                        onClick={() => handlePublishToLinkedIn(post)}
                                                        disabled={publishingId === post.id}
                                                        className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center gap-1 shadow-sm cursor-pointer"
                                                    >
                                                        <Send className="w-3.5 h-3.5" />
                                                        {publishingId === post.id ? 'Publishing...' : 'Publish'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Right Column: Realistic LinkedIn Company Page Preview */}
                    <div className="lg:col-span-6">
                        <div className="sticky top-6">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-emerald-400" /> Live LinkedIn Company Preview
                                </h3>
                                <span className="text-xs text-slate-400">
                                    Publishing as: <strong className="text-emerald-300">ProfitMachines</strong>
                                </span>
                            </div>

                            {selectedPost ? (
                                <div className="bg-[#1b1f23] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl text-slate-200">
                                    {/* LinkedIn Post Header */}
                                    <div className="p-4 flex items-start gap-3 border-b border-slate-700/50">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2878B5] to-[#10b981] flex items-center justify-center text-white font-extrabold text-xl shadow-md border border-emerald-400/30 flex-shrink-0">
                                            PM
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-1.5">
                                                <h4 className="font-bold text-white text-sm hover:underline cursor-pointer">
                                                    ProfitMachines
                                                </h4>
                                                <span className="text-[11px] text-slate-400">• Company</span>
                                            </div>
                                            <p className="text-xs text-slate-400">
                                                AI-Powered Revenue Operations & Enterprise Demand Intelligence
                                            </p>
                                            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                                Now • 🌐
                                            </p>
                                        </div>
                                    </div>

                                    {/* Post Body Content */}
                                    <div className="p-4 text-sm leading-relaxed whitespace-pre-line text-slate-100">
                                        <p className="font-semibold text-white">{selectedPost.hook}</p>
                                        <p className="mt-3 text-slate-300">{selectedPost.body}</p>
                                        
                                        <div className="mt-4 p-3 rounded-xl bg-[#0A253D] border border-emerald-600/40 text-xs">
                                            <span className="font-bold text-emerald-300">👉 {selectedPost.ctaText}</span>
                                            <div className="mt-1 font-mono text-emerald-400 break-all text-[11px]">
                                                {selectedPost.utmUrl}
                                            </div>
                                        </div>

                                        <p className="mt-3 text-sky-400 text-xs font-medium">
                                            {selectedPost.hashtags.map(h => (h.startsWith('#') ? h : `#${h}`)).join(' ')}
                                        </p>
                                    </div>

                                    {/* Tracked Link Preview Box */}
                                    <a
                                        href={selectedPost.utmUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block border-t border-b border-slate-700/60 bg-[#12161a] hover:bg-[#181d22] transition p-3.5"
                                    >
                                        <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-mono">
                                            profit-machines.vercel.app
                                        </div>
                                        <h5 className="font-bold text-white text-sm mt-0.5">
                                            {selectedPost.title}
                                        </h5>
                                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                                            Explore how ProfitMachines orchestrates buyer intent, autonomous SDR nurturing, and multi-touch revenue attribution.
                                        </p>
                                    </a>

                                    {/* LinkedIn Post Reaction Bar */}
                                    <div className="px-4 py-2.5 flex items-center justify-around border-t border-slate-700/60 text-xs text-slate-400">
                                        <button className="flex items-center gap-1.5 hover:text-emerald-400 transition cursor-pointer">
                                            <ThumbsUp className="w-4 h-4" /> Like
                                        </button>
                                        <button className="flex items-center gap-1.5 hover:text-emerald-400 transition cursor-pointer">
                                            <MessageSquare className="w-4 h-4" /> Comment
                                        </button>
                                        <button className="flex items-center gap-1.5 hover:text-emerald-400 transition cursor-pointer">
                                            <Share2 className="w-4 h-4" /> Repost
                                        </button>
                                        <button className="flex items-center gap-1.5 hover:text-emerald-400 transition cursor-pointer">
                                            <Send className="w-4 h-4" /> Send
                                        </button>
                                    </div>

                                    {/* Action Bar at Bottom of Preview */}
                                    <div className="p-4 bg-[#0d1216] border-t border-slate-700/60 flex items-center justify-between gap-3">
                                        <div className="text-xs text-slate-400">
                                            Status: <strong className="text-white">{selectedPost.status}</strong>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleCopyPost(selectedPost)}
                                                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition cursor-pointer"
                                            >
                                                {copiedPostId === selectedPost.id ? 'Copied!' : 'Copy Post Text'}
                                            </button>
                                            {selectedPost.status === 'DRAFT' && (
                                                <button
                                                    onClick={() => handleApprove(selectedPost)}
                                                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
                                                >
                                                    Approve for Publication
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-500 text-sm">
                                    Select a post from the left to view preview.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </>
            )}

            {/* Schedule Post Modal */}
            {schedulingPost && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#0A253D] border border-emerald-600/60 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-emerald-400" /> Schedule Publication
                            </h3>
                            <button onClick={() => setSchedulingPost(null)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-slate-300 mt-2">
                            Select date & time for automated dispatch to ProfitMachines LinkedIn Company Page:
                        </p>

                        <div className="mt-4">
                            <label className="block text-xs font-bold text-emerald-300 mb-1">
                                Scheduled Publishing Date & Time (Local)
                            </label>
                            <input
                                type="datetime-local"
                                value={scheduleDateTime}
                                onChange={e => setScheduleDateTime(e.target.value)}
                                className="w-full bg-[#02130d] border border-emerald-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                            />
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setSchedulingPost(null)}
                                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmSchedule}
                                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md"
                            >
                                Confirm Schedule
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Post Modal */}
            {editingPost && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#081A28] border border-emerald-600/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                <Edit3 className="w-5 h-5 text-emerald-400" /> Edit LinkedIn Post Draft
                            </h3>
                            <button onClick={() => setEditingPost(null)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-emerald-300 mb-1">Internal Title</label>
                                <input
                                    type="text"
                                    value={editingPost.title}
                                    onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                                    className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3.5 py-2 text-sm text-white focus:border-emerald-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-emerald-300 mb-1">Opening Hook (First 1-2 lines)</label>
                                <textarea
                                    rows={2}
                                    value={editingPost.hook}
                                    onChange={e => setEditingPost({ ...editingPost, hook: e.target.value })}
                                    className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3.5 py-2 text-sm text-white focus:border-emerald-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-emerald-300 mb-1">Body Content & Insights</label>
                                <textarea
                                    rows={6}
                                    value={editingPost.body}
                                    onChange={e => setEditingPost({ ...editingPost, body: e.target.value })}
                                    className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3.5 py-2 text-sm text-white focus:border-emerald-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-emerald-300 mb-1">Call to Action (CTA)</label>
                                <input
                                    type="text"
                                    value={editingPost.ctaText}
                                    onChange={e => setEditingPost({ ...editingPost, ctaText: e.target.value })}
                                    className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3.5 py-2 text-sm text-white focus:border-emerald-400"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-emerald-300 mb-1">Target Service Route</label>
                                    <input
                                        type="text"
                                        value={editingPost.targetServicePath}
                                        onChange={e => setEditingPost({ ...editingPost, targetServicePath: e.target.value })}
                                        className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3.5 py-2 text-sm text-white font-mono text-xs focus:border-emerald-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-emerald-300 mb-1">Campaign Slug</label>
                                    <input
                                        type="text"
                                        value={editingPost.campaignSlug}
                                        onChange={e => setEditingPost({ ...editingPost, campaignSlug: e.target.value })}
                                        className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3.5 py-2 text-sm text-white font-mono text-xs focus:border-emerald-400"
                                    />
                                </div>
                            </div>

                            <div className="pt-3 flex items-center justify-end gap-3 border-t border-emerald-900/40">
                                <button
                                    type="button"
                                    onClick={() => setEditingPost(null)}
                                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
