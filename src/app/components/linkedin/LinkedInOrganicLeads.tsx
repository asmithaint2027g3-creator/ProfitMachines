import React, { useState, useEffect } from 'react';
import {
    ShieldCheck, AlertCircle, RefreshCw, CheckCircle2, XCircle,
    Clock, ExternalLink, User, Building, Briefcase, Mail, Phone,
    Check, X, FileSpreadsheet, Database, Layers, Sparkles, Filter,
    Eye, ThumbsUp, MessageSquare, Share2, Tag, ArrowRight, ShieldAlert,
    HelpCircle
} from 'lucide-react';

export type LeadClassification =
    | 'General engagement'
    | 'Service inquiry'
    | 'Pricing inquiry'
    | 'Consultation request'
    | 'Potential business opportunity'
    | 'Spam or irrelevant';

export type ReviewStatus = 'Awaiting Review' | 'Qualified' | 'Rejected';

export interface LinkedInPostRecord {
    postId: string;
    postUrn: string;
    postUrl: string;
    postText: string;
    publishedAt: string;
    impressions: string | number;
    uniqueImpressions: string | number;
    clicks: string | number;
    reactionCount: string | number;
    commentCount: string | number;
    repostCount: string | number;
    engagementRate: string | number;
    lastSyncedAt: string;
    syncStatus: string;
    isMock?: boolean;
}

export interface LinkedInCommentLeadRecord {
    commentId: string;
    postId: string;
    postUrl: string;
    postTitle?: string;
    commentText: string;
    commentCreatedAt: string;
    memberId: string;
    memberName: string;
    profileUrl: string;
    company?: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
    leadClassification: LeadClassification;
    leadScore: number;
    reviewStatus: ReviewStatus;
    serviceInterest?: string;
    businessRequirement?: string;
    qualificationReason?: string;
    airtableRecordId?: string;
    jiraIssueKey?: string;
    sheetsSyncStatus?: string;
    lastSyncedAt: string;
    isMock?: boolean;
}

export default function LinkedInOrganicLeads() {
    const [mode, setMode] = useState<'mock' | 'live'>('mock');
    const [activeSubTab, setActiveSubTab] = useState<'LEADS' | 'POSTS'>('LEADS');
    const [leadFilter, setLeadFilter] = useState<'all' | 'awaiting' | 'qualified' | 'rejected'>('all');

    // Data states
    const [posts, setPosts] = useState<LinkedInPostRecord[]>([]);
    const [comments, setComments] = useState<LinkedInCommentLeadRecord[]>([]);
    const [counts, setCounts] = useState({ all: 0, awaiting: 0, qualified: 0, rejected: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    // Connection diagnostics
    const [connectionStatus, setConnectionStatus] = useState<{
        status: string;
        connected: boolean;
        message: string;
        organizationName?: string;
        spreadsheetConfigured: boolean;
        airtableConfigured: boolean;
        jiraConfigured: boolean;
    } | null>(null);

    // Modal state for qualifying a lead
    const [qualifyingLead, setQualifyingLead] = useState<LinkedInCommentLeadRecord | null>(null);
    const [serviceInterest, setServiceInterest] = useState('');
    const [businessRequirement, setBusinessRequirement] = useState('');
    const [qualificationReason, setQualificationReason] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactCompany, setContactCompany] = useState('');
    const [contactJobTitle, setContactJobTitle] = useState('');
    const [isSavingQualification, setIsSavingQualification] = useState(false);

    // Feedback banner
    const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

    useEffect(() => {
        fetchConnectionStatus();
        fetchPosts(mode);
        fetchComments(mode);
    }, [mode]);

    const fetchConnectionStatus = async () => {
        try {
            const res = await fetch('/api/linkedin-leads?action=status');
            if (res.ok) {
                const data = await res.json();
                setConnectionStatus({
                    status: data.liveStatus?.status || 'Not configured',
                    connected: data.liveStatus?.connected || false,
                    message: data.liveStatus?.message || '',
                    organizationName: data.liveStatus?.organizationName,
                    spreadsheetConfigured: data.spreadsheetConfigured,
                    airtableConfigured: data.airtableConfigured,
                    jiraConfigured: data.jiraConfigured,
                });
            }
        } catch (err) {
            console.warn('[LinkedInLeads] Failed to load status:', err);
        }
    };

    const fetchPosts = async (currentMode: 'mock' | 'live') => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/linkedin-leads?action=posts&mode=${currentMode}`);
            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts || []);
            }
        } catch (err) {
            console.warn('[LinkedInLeads] Failed to load posts:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchComments = async (currentMode: 'mock' | 'live') => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/linkedin-leads?action=comments&mode=${currentMode}`);
            if (res.ok) {
                const data = await res.json();
                setComments(data.comments || []);
                if (data.counts) setCounts(data.counts);
            }
        } catch (err) {
            console.warn('[LinkedInLeads] Failed to load comments:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSyncAll = async () => {
        setIsSyncing(true);
        setAlertMessage(null);
        try {
            const res = await fetch(`/api/linkedin-leads?action=sync-all&mode=${mode}`, {
                method: 'POST',
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setAlertMessage({
                    type: 'success',
                    text: `✅ ${data.message} Synced ${data.postCount || 0} posts and ${data.commentCount || 0} organic comments.`,
                });
                fetchPosts(mode);
                fetchComments(mode);
            } else {
                setAlertMessage({
                    type: 'error',
                    text: data.error || 'Failed to complete synchronization.',
                });
            }
        } catch (err: any) {
            setAlertMessage({
                type: 'error',
                text: `Network failure: ${err.message}`,
            });
        } finally {
            setIsSyncing(false);
        }
    };

    const handleOpenQualifyModal = (lead: LinkedInCommentLeadRecord) => {
        setQualifyingLead(lead);
        setServiceInterest(lead.serviceInterest || 'AI Revenue Engine & Pipeline Diagnostic');
        setBusinessRequirement(lead.businessRequirement || lead.commentText);
        setQualificationReason(lead.qualificationReason || 'Explicit interest in ProfitMachines B2B AI capabilities');
        setContactEmail(lead.email || '');
        setContactPhone(lead.phone || '');
        setContactCompany(lead.company || '');
        setContactJobTitle(lead.jobTitle || '');
    };

    const handleConfirmQualify = async () => {
        if (!qualifyingLead) return;
        setIsSavingQualification(true);
        setAlertMessage(null);

        try {
            const res = await fetch('/api/linkedin-leads?action=qualify-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    commentId: qualifyingLead.commentId,
                    serviceInterest,
                    businessRequirement,
                    qualificationReason,
                    email: contactEmail,
                    phone: contactPhone,
                    company: contactCompany,
                    jobTitle: contactJobTitle,
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                // Update in local state
                const updated = comments.map(c => c.commentId === qualifyingLead.commentId ? data.lead : c);
                setComments(updated);
                setQualifyingLead(null);

                const destInfo = [];
                if (data.destinations?.jira?.issueKey) destInfo.push(`Jira Task: ${data.destinations.jira.issueKey}`);
                if (data.destinations?.airtable?.recordId) destInfo.push(`Airtable Record Synced`);
                if (data.destinations?.googleSheets?.status === 'SUCCESS') destInfo.push(`Google Sheets Synced`);

                setAlertMessage({
                    type: 'success',
                    text: `🎉 Lead ${data.lead?.memberName} qualified! Synchronized: ${destInfo.join(' • ')}`,
                });
                fetchComments(mode);
            } else {
                setAlertMessage({
                    type: 'error',
                    text: data.error || 'Failed to qualify lead.',
                });
            }
        } catch (err: any) {
            setAlertMessage({
                type: 'error',
                text: `Network failure qualifying lead: ${err.message}`,
            });
        } finally {
            setIsSavingQualification(false);
        }
    };

    const handleRejectLead = async (commentId: string) => {
        try {
            const res = await fetch('/api/linkedin-leads?action=reject-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ commentId, reason: 'Marked as irrelevant by admin' }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setComments(comments.map(c => c.commentId === commentId ? { ...c, reviewStatus: 'Rejected' } : c));
                setAlertMessage({ type: 'info', text: 'Comment marked as rejected.' });
                fetchComments(mode);
            }
        } catch (err: any) {
            setAlertMessage({ type: 'error', text: `Failed to reject comment: ${err.message}` });
        }
    };

    const filteredComments = comments.filter(c => {
        if (leadFilter === 'all') return true;
        if (leadFilter === 'awaiting') return c.reviewStatus === 'Awaiting Review';
        if (leadFilter === 'qualified') return c.reviewStatus === 'Qualified';
        if (leadFilter === 'rejected') return c.reviewStatus === 'Rejected';
        return true;
    });

    const getClassificationBadge = (cat: LeadClassification) => {
        switch (cat) {
            case 'Consultation request':
                return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
            case 'Pricing inquiry':
                return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
            case 'Service inquiry':
                return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
            case 'Potential business opportunity':
                return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
            case 'Spam or irrelevant':
                return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
            default:
                return 'bg-slate-700 text-slate-300 border-slate-600';
        }
    };

    const getConnectionBadge = (statusStr?: string) => {
        switch (statusStr) {
            case 'Connected and verified':
                return { color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', label: 'CONNECTED & VERIFIED' };
            case 'Authorization required':
                return { color: 'bg-amber-500/20 text-amber-300 border-amber-500/30', label: 'AUTHORIZATION REQUIRED' };
            case 'Missing permissions':
                return { color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', label: 'MISSING PERMISSIONS' };
            case 'Token expired':
                return { color: 'bg-rose-500/20 text-rose-300 border-rose-500/30', label: 'TOKEN EXPIRED' };
            case 'Synchronization failed':
                return { color: 'bg-rose-500/20 text-rose-300 border-rose-500/30', label: 'SYNCHRONIZATION FAILED' };
            default:
                return { color: 'bg-slate-700 text-slate-300 border-slate-600', label: 'NOT CONFIGURED' };
        }
    };

    const statusBadge = getConnectionBadge(connectionStatus?.status);

    return (
        <div className="space-y-6">
            {/* Mode Switcher & Live Connection Diagnostics Panel */}
            <div className="bg-[#091D2C] border border-emerald-700/40 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div className="flex items-start gap-3.5">
                        <div className={`p-3 rounded-xl ${connectionStatus?.connected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="font-bold text-white text-base">LinkedIn Company Account Connection</h3>
                                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${statusBadge.color}`}>
                                    ● {statusBadge.label}
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                                {connectionStatus?.message || 'Monitoring official ProfitMachines LinkedIn company posts, organic engagement, and comments.'}
                            </p>
                            <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-400 flex-wrap">
                                <span className="flex items-center gap-1.5">
                                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                                    Google Sheets: <strong className={connectionStatus?.spreadsheetConfigured ? 'text-emerald-300' : 'text-slate-400'}>{connectionStatus?.spreadsheetConfigured ? 'Connected' : 'Default Sheet'}</strong>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Database className="w-3.5 h-3.5 text-sky-400" />
                                    Airtable: <strong className={connectionStatus?.airtableConfigured ? 'text-emerald-300' : 'text-slate-400'}>{connectionStatus?.airtableConfigured ? 'Connected (Leads Table)' : 'Not Configured'}</strong>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                                    Jira Cloud: <strong className={connectionStatus?.jiraConfigured ? 'text-emerald-300' : 'text-slate-400'}>{connectionStatus?.jiraConfigured ? 'Connected (PROF Project)' : 'Not Configured'}</strong>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        {/* Mode Selector */}
                        <div className="bg-[#02130d] border border-emerald-900/60 rounded-xl p-1 flex items-center">
                            <button
                                onClick={() => setMode('mock')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                    mode === 'mock'
                                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                🧪 Mock Mode (Safe Test)
                            </button>
                            <button
                                onClick={() => setMode('live')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                    mode === 'live'
                                        ? 'bg-[#2878B5] text-white shadow-sm'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                🌐 Live Mode
                            </button>
                        </div>

                        <button
                            onClick={handleSyncAll}
                            disabled={isSyncing}
                            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                            {isSyncing ? 'Synchronizing...' : 'Sync Posts & Comments'}
                        </button>
                    </div>
                </div>

                {/* Banner notice when in Mock Mode */}
                {mode === 'mock' && (
                    <div className="mt-4 pt-3 border-t border-emerald-900/40 text-xs text-amber-300/90 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
                        <span>
                            <strong>Mock Test Mode Active:</strong> Displaying clearly labeled test posts and comments. You can review comments, test rule-based intent classification, and trigger test synchronizations to Google Sheets, Airtable, and Jira without live LinkedIn API keys.
                        </span>
                    </div>
                )}
            </div>

            {/* Notification Banner */}
            {alertMessage && (
                <div className={`p-4 rounded-xl border flex items-center justify-between text-sm ${
                    alertMessage.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' :
                    alertMessage.type === 'error' ? 'bg-rose-950/80 border-rose-500/50 text-rose-200' :
                    'bg-slate-900/80 border-slate-700 text-slate-200'
                }`}>
                    <div className="flex items-center gap-2.5">
                        {alertMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                        {alertMessage.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                        <span>{alertMessage.text}</span>
                    </div>
                    <button onClick={() => setAlertMessage(null)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#091D2C] border border-emerald-700/40 rounded-xl p-4">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> Total Organic Comments
                    </div>
                    <div className="text-2xl font-black text-white mt-1">{counts.all}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Retrieved from company posts</div>
                </div>

                <div className="bg-[#091D2C] border border-emerald-700/40 rounded-xl p-4">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> Leads Awaiting Review
                    </div>
                    <div className="text-2xl font-black text-amber-300 mt-1">{counts.awaiting}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Identified business intent</div>
                </div>

                <div className="bg-[#091D2C] border border-emerald-700/40 rounded-xl p-4">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Qualified & Synchronized
                    </div>
                    <div className="text-2xl font-black text-emerald-300 mt-1">{counts.qualified}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">In Jira, Airtable & Sheets</div>
                </div>

                <div className="bg-[#091D2C] border border-emerald-700/40 rounded-xl p-4">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-sky-400" /> Synced Company Posts
                    </div>
                    <div className="text-2xl font-black text-white mt-1">{posts.length}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Tracked with analytics</div>
                </div>
            </div>

            {/* Sub-Tabs: Comments & Potential Leads vs. Company Post Analytics */}
            <div className="border-b border-emerald-800/40 flex items-center gap-4">
                <button
                    onClick={() => setActiveSubTab('LEADS')}
                    className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
                        activeSubTab === 'LEADS'
                            ? 'border-emerald-400 text-emerald-300'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                >
                    <MessageSquare className="w-4 h-4" /> Organic Comments & Lead Triage ({comments.length})
                </button>
                <button
                    onClick={() => setActiveSubTab('POSTS')}
                    className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
                        activeSubTab === 'POSTS'
                            ? 'border-emerald-400 text-emerald-300'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                >
                    <Eye className="w-4 h-4" /> Company Post Analytics ({posts.length})
                </button>
            </div>

            {/* View 1: Organic Comments & Lead Triage */}
            {activeSubTab === 'LEADS' && (
                <div className="space-y-4">
                    {/* Filter Bar */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
                                <Filter className="w-3.5 h-3.5" /> Filter by:
                            </span>
                            <button
                                onClick={() => setLeadFilter('all')}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                                    leadFilter === 'all' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-400 hover:text-white'
                                }`}
                            >
                                All ({counts.all})
                            </button>
                            <button
                                onClick={() => setLeadFilter('awaiting')}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                                    leadFilter === 'awaiting' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-900 text-slate-400 hover:text-white'
                                }`}
                            >
                                Awaiting Review ({counts.awaiting})
                            </button>
                            <button
                                onClick={() => setLeadFilter('qualified')}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                                    leadFilter === 'qualified' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-400 hover:text-white'
                                }`}
                            >
                                Qualified ({counts.qualified})
                            </button>
                            <button
                                onClick={() => setLeadFilter('rejected')}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                                    leadFilter === 'rejected' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-slate-900 text-slate-400 hover:text-white'
                                }`}
                            >
                                Rejected ({counts.rejected})
                            </button>
                        </div>
                    </div>

                    {/* Comments Feed */}
                    <div className="space-y-3">
                        {filteredComments.length === 0 ? (
                            <div className="p-12 text-center bg-[#091D2C] border border-emerald-900/40 rounded-2xl text-slate-400 text-sm">
                                No comments match the current filter.
                            </div>
                        ) : (
                            filteredComments.map(c => {
                                const classificationBadge = getClassificationBadge(c.leadClassification);
                                return (
                                    <div
                                        key={c.commentId}
                                        className="bg-[#091D2C] border border-emerald-800/40 rounded-2xl p-5 hover:border-emerald-600/50 transition-all shadow-md"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            {/* Commenter & Post context */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                                                        <User className="w-3.5 h-3.5 text-emerald-400" />
                                                        {c.memberName}
                                                    </span>

                                                    {c.company && (
                                                        <span className="text-xs text-slate-300 flex items-center gap-1">
                                                            <Building className="w-3 h-3 text-slate-400" /> {c.company}
                                                        </span>
                                                    )}

                                                    {c.jobTitle && (
                                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                                            <Briefcase className="w-3 h-3 text-slate-400" /> {c.jobTitle}
                                                        </span>
                                                    )}

                                                    <a
                                                        href={c.profileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1"
                                                    >
                                                        Profile <ExternalLink className="w-3 h-3" />
                                                    </a>

                                                    {c.isMock && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                                                            TEST MOCK
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Original Comment Text */}
                                                <div className="mt-3 p-3.5 rounded-xl bg-[#02130d] border border-emerald-900/50 text-slate-200 text-sm italic leading-relaxed">
                                                    "{c.commentText}"
                                                </div>

                                                {/* Post Context & Tags */}
                                                <div className="mt-3 flex items-center gap-3 flex-wrap text-xs text-slate-400">
                                                    <span>
                                                        On Post: <a href={c.postUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">{c.postTitle || c.postId}</a>
                                                    </span>
                                                    <span>•</span>
                                                    <span>{new Date(c.commentCreatedAt).toLocaleString()}</span>
                                                    <span>•</span>
                                                    <span className={`px-2 py-0.5 rounded-full font-bold border text-[11px] ${classificationBadge}`}>
                                                        {c.leadClassification}
                                                    </span>
                                                    <span className="text-emerald-400 font-bold text-[11px]">
                                                        Intent Score: {c.leadScore}/100
                                                    </span>
                                                </div>

                                                {/* Sync Badges if qualified */}
                                                {(c.jiraIssueKey || c.airtableRecordId) && (
                                                    <div className="mt-3 pt-3 border-t border-emerald-900/30 flex items-center gap-3 flex-wrap text-xs">
                                                        {c.jiraIssueKey && (
                                                            <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono font-bold flex items-center gap-1">
                                                                <Layers className="w-3 h-3" /> Jira: {c.jiraIssueKey}
                                                            </span>
                                                        )}
                                                        {c.airtableRecordId && (
                                                            <span className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono font-bold flex items-center gap-1">
                                                                <Database className="w-3 h-3" /> Airtable Synced
                                                            </span>
                                                        )}
                                                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[11px] flex items-center gap-1">
                                                            <FileSpreadsheet className="w-3 h-3" /> Sheets Tab 3 Synced
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex md:flex-col items-center gap-2">
                                                {c.reviewStatus === 'Awaiting Review' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleOpenQualifyModal(c)}
                                                            className="w-full px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                                                        >
                                                            <Check className="w-3.5 h-3.5" /> Qualify & Sync
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectLead(c.commentId)}
                                                            className="w-full px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 text-xs border border-slate-700 transition flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                                                        >
                                                            <X className="w-3.5 h-3.5" /> Reject
                                                        </button>
                                                    </>
                                                )}

                                                {c.reviewStatus === 'Qualified' && (
                                                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs flex items-center gap-1 whitespace-nowrap">
                                                        <CheckCircle2 className="w-3.5 h-3.5" /> Qualified
                                                    </span>
                                                )}

                                                {c.reviewStatus === 'Rejected' && (
                                                    <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold text-xs flex items-center gap-1 whitespace-nowrap">
                                                        <XCircle className="w-3.5 h-3.5" /> Rejected
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}

            {/* View 2: Company Post Analytics Table */}
            {activeSubTab === 'POSTS' && (
                <div className="bg-[#091D2C] border border-emerald-800/40 rounded-2xl overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-emerald-800/40 flex items-center justify-between">
                        <div>
                            <h4 className="font-bold text-white text-sm">Synchronized Company Posts</h4>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Metrics retrieved from LinkedIn API. Missing or unapproved metrics are marked as "Unavailable" rather than zero.
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-300">
                            <thead className="bg-[#02130d] text-emerald-300 uppercase tracking-wider text-[11px] border-b border-emerald-800/40">
                                <tr>
                                    <th className="py-3 px-4">Post ID / Update</th>
                                    <th className="py-3 px-4">Post Text</th>
                                    <th className="py-3 px-4">Published</th>
                                    <th className="py-3 px-4">Impressions</th>
                                    <th className="py-3 px-4">Unique Reach</th>
                                    <th className="py-3 px-4">Clicks</th>
                                    <th className="py-3 px-4">Reactions</th>
                                    <th className="py-3 px-4">Comments</th>
                                    <th className="py-3 px-4">Reposts</th>
                                    <th className="py-3 px-4">Engagement</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-emerald-900/30">
                                {posts.map(p => (
                                    <tr key={p.postId} className="hover:bg-slate-800/40 transition">
                                        <td className="py-3 px-4 font-mono font-medium text-emerald-400">
                                            <a href={p.postUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                                                {p.postId} <ExternalLink className="w-3 h-3 text-slate-400" />
                                            </a>
                                            {p.isMock && (
                                                <span className="block text-[9px] text-amber-400 mt-0.5 font-sans font-bold">MOCK TEST</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 max-w-xs truncate" title={p.postText}>
                                            {p.postText}
                                        </td>
                                        <td className="py-3 px-4 whitespace-nowrap text-slate-400">
                                            {new Date(p.publishedAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4 font-semibold text-white">
                                            {typeof p.impressions === 'number' ? p.impressions.toLocaleString() : p.impressions}
                                        </td>
                                        <td className="py-3 px-4">
                                            {typeof p.uniqueImpressions === 'number' ? p.uniqueImpressions.toLocaleString() : p.uniqueImpressions}
                                        </td>
                                        <td className="py-3 px-4">{p.clicks}</td>
                                        <td className="py-3 px-4">{p.reactionCount}</td>
                                        <td className="py-3 px-4 text-emerald-400 font-bold">{p.commentCount}</td>
                                        <td className="py-3 px-4">{p.repostCount}</td>
                                        <td className="py-3 px-4 font-bold text-sky-400">{p.engagementRate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal: Lead Qualification & Multi-Destination Sync */}
            {qualifyingLead && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#091D2C] border border-emerald-600/60 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8 text-slate-200">
                        <div className="flex items-center justify-between border-b border-emerald-800/40 pb-4">
                            <div>
                                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-emerald-400" /> Qualify & Synchronize LinkedIn Lead
                                </h3>
                                <p className="text-xs text-slate-300 mt-0.5">
                                    Synchronizes qualified lead data across Google Sheets Tab 3, Airtable, and creates a Jira Sales Task.
                                </p>
                            </div>
                            <button onClick={() => setQualifyingLead(null)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Comment context preview */}
                        <div className="mt-4 p-3.5 rounded-xl bg-[#02130d] border border-emerald-900/60 text-xs space-y-1.5">
                            <div className="flex items-center justify-between text-slate-400">
                                <span>Commenter: <strong className="text-white">{qualifyingLead.memberName}</strong></span>
                                <span>Post: <strong className="text-emerald-400">{qualifyingLead.postTitle || qualifyingLead.postId}</strong></span>
                            </div>
                            <p className="text-slate-200 italic font-medium">"{qualifyingLead.commentText}"</p>
                        </div>

                        {/* Editable Qualification Form */}
                        <div className="mt-5 space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold text-emerald-300 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        value={contactCompany}
                                        onChange={e => setContactCompany(e.target.value)}
                                        placeholder="e.g. Apex Cloud Solutions"
                                        className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3 py-2 text-white focus:border-emerald-400"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-emerald-300 mb-1">Job Title / Designation</label>
                                    <input
                                        type="text"
                                        value={contactJobTitle}
                                        onChange={e => setContactJobTitle(e.target.value)}
                                        placeholder="e.g. VP Revenue Operations"
                                        className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3 py-2 text-white focus:border-emerald-400"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold text-emerald-300 mb-1">Contact Email</label>
                                    <input
                                        type="email"
                                        value={contactEmail}
                                        onChange={e => setContactEmail(e.target.value)}
                                        placeholder="e.g. m.vance@apexcloud.io"
                                        className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3 py-2 text-white focus:border-emerald-400"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-emerald-300 mb-1">Phone (Optional)</label>
                                    <input
                                        type="tel"
                                        value={contactPhone}
                                        onChange={e => setContactPhone(e.target.value)}
                                        placeholder="e.g. +1 (415) 890-2144"
                                        className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3 py-2 text-white focus:border-emerald-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-emerald-300 mb-1">Identified Service Interest</label>
                                <input
                                    type="text"
                                    value={serviceInterest}
                                    onChange={e => setServiceInterest(e.target.value)}
                                    className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3 py-2 text-white focus:border-emerald-400"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-emerald-300 mb-1">Business Requirement & Growth Bottleneck</label>
                                <textarea
                                    rows={2}
                                    value={businessRequirement}
                                    onChange={e => setBusinessRequirement(e.target.value)}
                                    className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3 py-2 text-white focus:border-emerald-400"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-emerald-300 mb-1">Qualification Reason</label>
                                <input
                                    type="text"
                                    value={qualificationReason}
                                    onChange={e => setQualificationReason(e.target.value)}
                                    className="w-full bg-[#02130d] border border-emerald-700/60 rounded-xl px-3 py-2 text-white focus:border-emerald-400"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 pt-4 border-t border-emerald-800/40 flex items-center justify-between">
                            <button
                                onClick={() => setQualifyingLead(null)}
                                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirmQualify}
                                disabled={isSavingQualification}
                                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                <Check className="w-4 h-4" />
                                {isSavingQualification ? 'Synchronizing Across Pipelines...' : 'Confirm & Sync (Sheets + Airtable + Jira)'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
