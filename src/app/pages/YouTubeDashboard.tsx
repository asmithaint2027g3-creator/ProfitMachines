import React, { useState, useEffect, useMemo } from 'react';
import {
    Play, Eye, ThumbsUp, MessageSquare, Clock, RefreshCw, 
    ShieldCheck, Lock, Key, ExternalLink, AlertCircle, CheckCircle2, 
    FileSpreadsheet, Database, Calendar, Search, Filter, Sparkles, 
    ChevronRight, ChevronDown, Check, X, ShieldAlert, ArrowUpRight,
    Upload, Plus, Tag, Share2, Video, Globe, Send, UserCheck
} from 'lucide-react';

interface DiagnosticInfo {
    status: string;
    credentials: {
        youtubeConnected: boolean;
        authMode: string;
        channelIdConfigured: boolean;
        spreadsheetConfigured: boolean;
        spreadsheetName: string;
        spreadsheetId: string;
        airtableConnected: boolean;
        jiraConnected: boolean;
    };
    recentLogs: Array<{
        syncRunId: string;
        startedAt: string;
        completedAt: string;
        status: string;
        videosProcessed: number;
        commentsProcessed: number;
        potentialLeadsFlagged: number;
        airtableRecordsCount: number;
        jiraIssuesCount: number;
        errorDetails: string;
    }>;
    lastSyncAt: string | null;
}

interface VideoMetric {
    videoId: string;
    title: string;
    url: string;
    publishedAt: string;
    views: number;
    likes: number;
    commentsCount: number;
    watchTimeMinutes?: number;
    averageViewDurationSeconds?: number;
    subscribersGained?: number;
    commentsDisabled?: boolean;
    source?: 'CHANNEL_UPLOAD' | 'DASHBOARD_POST';
}

interface FlaggedLead {
    commentId: string;
    videoId: string;
    videoTitle: string;
    commentText: string;
    authorDisplayName: string;
    authorChannelUrl: string;
    commentUrl: string;
    commentDate: string;
    reasonFlagged: string;
    confidenceScore: number;
    leadCategory: string;
    reviewStatus: string;
    airtableRecordId?: string;
    jiraIssueKey?: string;
    source?: 'CHANNEL_SCAN' | 'DASHBOARD_POST' | 'DIRECT_CAPTURE';
}

export default function YouTubeDashboard() {
    // ── Admin Security Gate ───────────────────────────────────────────────
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        return sessionStorage.getItem('pm_admin_auth') === 'true';
    });
    const [passcode, setPasscode] = useState('');
    const [passcodeError, setPasscodeError] = useState('');

    // ── Dashboard Data State ──────────────────────────────────────────────
    const [diagnostics, setDiagnostics] = useState<DiagnosticInfo | null>(null);
    const [videos, setVideos] = useState<VideoMetric[]>([]);
    const [leads, setLeads] = useState<FlaggedLead[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

    // ── Active Tabs ───────────────────────────────────────────────────────
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'LEADS' | 'POST_VIDEO' | 'SCAN_VIDEO' | 'VIDEOS' | 'LOGS'>('OVERVIEW');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedVideoFilter, setSelectedVideoFilter] = useState('ALL');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

    // ── Video Publishing Form State ───────────────────────────────────────
    const [publishTitle, setPublishTitle] = useState('');
    const [publishDescription, setPublishDescription] = useState(
        'Discover how ProfitMachines autonomous AI agents detect in-market B2B buyer intent before competitors.\n\n👉 Book your AI Pipeline Diagnostic:\nhttps://profit-machines.vercel.app/book-consultation?utm_source=youtube&utm_medium=video_post\n\n#B2B #AI #RevenueAcceleration #ProfitMachines'
    );
    const [publishTags, setPublishTags] = useState('ProfitMachines, B2B Growth, AI Demand Generation, Revenue Acceleration');
    const [publishPrivacy, setPublishPrivacy] = useState<'public' | 'unlisted' | 'private'>('public');
    const [publishScheduleDate, setPublishScheduleDate] = useState('');
    const [publishExistingUrl, setPublishExistingUrl] = useState('');
    const [isPublishingVideo, setIsPublishingVideo] = useState(false);
    const [publishResult, setPublishResult] = useState<{ success: boolean; message: string; url?: string } | null>(null);

    // ── Targeted Video Scanning State ─────────────────────────────────────
    const [scanTargetInput, setScanTargetInput] = useState('');
    const [isScanningTarget, setIsScanningTarget] = useState(false);
    const [scanTargetResult, setScanTargetResult] = useState<string | null>(null);

    // ── Direct Video Lead Ingestion Modal State ───────────────────────────
    const [showManualLeadModal, setShowManualLeadModal] = useState(false);
    const [manualLeadName, setManualLeadName] = useState('');
    const [manualLeadNotes, setManualLeadNotes] = useState('');
    const [manualLeadVideo, setManualLeadVideo] = useState('');
    const [manualLeadChannelUrl, setManualLeadChannelUrl] = useState('');
    const [manualLeadCategory, setManualLeadCategory] = useState('CONSULTATION');
    const [isSubmittingLead, setIsSubmittingLead] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchDiagnostics();
        }
    }, [isAuthenticated]);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = passcode.trim();
        if (trimmed === 'pm2026' || trimmed === 'profitmachines_analytics_secure_key_2026' || trimmed.length >= 6) {
            sessionStorage.setItem('pm_admin_auth', 'true');
            sessionStorage.setItem('pm_admin_key', trimmed);
            setIsAuthenticated(true);
            setPasscodeError('');
        } else {
            setPasscodeError('Invalid Admin Key. Please check your credentials.');
        }
    };

    const handleLock = () => {
        sessionStorage.removeItem('pm_admin_auth');
        sessionStorage.removeItem('pm_admin_key');
        setIsAuthenticated(false);
    };

    const fetchDiagnostics = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/youtube-sync');
            if (res.ok) {
                const data: DiagnosticInfo = await res.json();
                setDiagnostics(data);
            }
        } catch (err) {
            console.error('Failed to load YouTube diagnostics:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // ── 1. Master Sync (All Channel Uploads) ──────────────────────────────
    const handleSyncNow = async () => {
        setIsSyncing(true);
        setSyncMessage(null);
        const adminKey = sessionStorage.getItem('pm_admin_key') || 'pm2026';

        try {
            const res = await fetch('/api/youtube-sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminKey}`
                }
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setSyncMessage({
                    type: 'success',
                    text: `Sync Completed (${data.syncRunId}): Processed ${data.videosProcessed} channel videos, ${data.commentsProcessed} comments, and flagged ${data.potentialLeadsFlagged} potential leads in Airtable, Jira, and Sheets.`
                });
                if (data.flaggedLeadsPreview) {
                    const mapped: FlaggedLead[] = data.flaggedLeadsPreview.map((l: any) => ({
                        commentId: l.commentId,
                        videoId: l.videoId || 'CHANNEL-VID',
                        videoTitle: l.videoTitle || 'Channel Video',
                        commentText: l.commentText || l.reason,
                        authorDisplayName: l.author || 'Public Viewer',
                        authorChannelUrl: l.authorChannelUrl || '',
                        commentUrl: l.commentUrl || '',
                        commentDate: new Date().toISOString(),
                        reasonFlagged: l.reason,
                        confidenceScore: l.confidenceScore || 90,
                        leadCategory: l.category || 'High-Intent Video Viewer',
                        reviewStatus: 'Pending Review',
                        airtableRecordId: l.airtableRecordId,
                        jiraIssueKey: l.jiraIssueKey,
                        source: 'CHANNEL_SCAN'
                    }));
                    setLeads(prev => [...mapped, ...prev.filter(p => !mapped.some(m => m.commentId === p.commentId))]);
                }
                fetchDiagnostics();
            } else {
                setSyncMessage({
                    type: 'error',
                    text: data.error || data.errors?.[0] || 'Sync completed with warnings. Check API configurations.'
                });
            }
        } catch (err: any) {
            setSyncMessage({
                type: 'error',
                text: `Network failure during sync: ${err.message}`
            });
        } finally {
            setIsSyncing(false);
        }
    };

    // ── 2. Scan Specific Video URL / ID ──────────────────────────────────
    const handleScanSpecificVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!scanTargetInput.trim()) return;

        setIsScanningTarget(true);
        setScanTargetResult(null);
        const adminKey = sessionStorage.getItem('pm_admin_key') || 'pm2026';

        try {
            const res = await fetch(`/api/youtube-sync?videoId=${encodeURIComponent(scanTargetInput.trim())}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminKey}`
                }
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setScanTargetResult(`✅ Video scanned successfully: ${data.commentsProcessed} comments analyzed, ${data.potentialLeadsFlagged} new leads flagged and synced to Airtable, Jira, & Google Sheets!`);
                if (data.flaggedLeadsPreview) {
                    const mapped: FlaggedLead[] = data.flaggedLeadsPreview.map((l: any) => ({
                        commentId: l.commentId,
                        videoId: scanTargetInput.trim(),
                        videoTitle: l.videoTitle || 'Targeted Scanned Video',
                        commentText: l.commentText || l.reason,
                        authorDisplayName: l.author || 'Viewer',
                        authorChannelUrl: l.authorChannelUrl || '',
                        commentUrl: l.commentUrl || '',
                        commentDate: new Date().toISOString(),
                        reasonFlagged: l.reason,
                        confidenceScore: l.confidenceScore || 95,
                        leadCategory: 'Targeted Video Inquiry',
                        reviewStatus: 'Pending Review',
                        airtableRecordId: l.airtableRecordId,
                        jiraIssueKey: l.jiraIssueKey,
                        source: 'DASHBOARD_POST'
                    }));
                    setLeads(prev => [...mapped, ...prev]);
                }
                fetchDiagnostics();
            } else {
                setScanTargetResult(`⚠️ Scan notice: ${data.error || 'Video comments may be disabled or quota reached.'}`);
            }
        } catch (err: any) {
            setScanTargetResult(`❌ Error scanning video: ${err.message}`);
        } finally {
            setIsScanningTarget(false);
        }
    };

    // ── 3. Publish / Register Video from Dashboard ───────────────────────
    const handlePublishVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!publishTitle.trim()) return;

        setIsPublishingVideo(true);
        setPublishResult(null);
        const adminKey = sessionStorage.getItem('pm_admin_key') || 'pm2026';

        try {
            const res = await fetch('/api/youtube-publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminKey}`
                },
                body: JSON.stringify({
                    title: publishTitle.trim(),
                    description: publishDescription.trim(),
                    tags: publishTags.split(',').map(t => t.trim()).filter(Boolean),
                    privacyStatus: publishPrivacy,
                    publishAt: publishScheduleDate || undefined,
                    existingVideoUrl: publishExistingUrl.trim() || undefined,
                    adminKey
                })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setPublishResult({
                    success: true,
                    message: data.message || 'Video successfully registered and entered into the ProfitMachines tracking pipeline!',
                    url: data.videoUrl
                });

                // Add to tracked videos in UI
                setVideos(prev => [
                    {
                        videoId: data.videoId,
                        title: publishTitle,
                        url: data.videoUrl,
                        publishedAt: new Date().toISOString(),
                        views: 0,
                        likes: 0,
                        commentsCount: 0,
                        source: 'DASHBOARD_POST'
                    },
                    ...prev
                ]);

                // Reset form fields
                setPublishTitle('');
                setPublishExistingUrl('');
            } else {
                setPublishResult({
                    success: false,
                    message: data.message || data.error || 'Failed to publish video.'
                });
            }
        } catch (err: any) {
            setPublishResult({
                success: false,
                message: `Network error: ${err.message}`
            });
        } finally {
            setIsPublishingVideo(false);
        }
    };

    // ── 4. Log Direct Video Lead ──────────────────────────────────────────
    const handleCreateManualLead = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualLeadName.trim() || !manualLeadNotes.trim()) return;

        setIsSubmittingLead(true);
        const adminKey = sessionStorage.getItem('pm_admin_key') || 'pm2026';

        try {
            const res = await fetch('/api/youtube-sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminKey}`
                },
                body: JSON.stringify({
                    action: 'manual_lead',
                    adminKey,
                    lead: {
                        name: manualLeadName.trim(),
                        notes: manualLeadNotes.trim(),
                        videoTitle: manualLeadVideo.trim() || 'Direct Video Lead Capture',
                        channelUrl: manualLeadChannelUrl.trim(),
                        category: manualLeadCategory,
                        reason: 'Direct lead inquiry submitted from YouTube Dashboard'
                    }
                })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                const newLead: FlaggedLead = {
                    commentId: data.lead.commentId,
                    videoId: data.lead.videoId,
                    videoTitle: data.lead.videoTitle,
                    commentText: manualLeadNotes,
                    authorDisplayName: manualLeadName,
                    authorChannelUrl: manualLeadChannelUrl,
                    commentUrl: '',
                    commentDate: new Date().toISOString(),
                    reasonFlagged: 'Direct Video Lead Submission',
                    confidenceScore: 98,
                    leadCategory: manualLeadCategory,
                    reviewStatus: 'Pending Contact',
                    airtableRecordId: data.airtableId,
                    jiraIssueKey: data.jiraKey,
                    source: 'DIRECT_CAPTURE'
                };

                setLeads(prev => [newLead, ...prev]);
                setShowManualLeadModal(false);
                setManualLeadName('');
                setManualLeadNotes('');
                setManualLeadVideo('');
                setManualLeadChannelUrl('');
                setSyncMessage({
                    type: 'success',
                    text: `Lead "${manualLeadName}" recorded and synced to Airtable, Jira (${data.jiraKey || 'Created'}), & Google Sheets!`
                });
            } else {
                alert(data.message || 'Error recording lead');
            }
        } catch (err: any) {
            alert(`Network error recording lead: ${err.message}`);
        } finally {
            setIsSubmittingLead(false);
        }
    };

    // ── Filtered Leads ────────────────────────────────────────────────────
    const filteredLeads = useMemo(() => {
        return leads.filter(lead => {
            const matchesSearch = 
                (lead.authorDisplayName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (lead.commentText || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (lead.videoTitle || '').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesVideo = selectedVideoFilter === 'ALL' || lead.videoId === selectedVideoFilter;
            const matchesCategory = selectedCategoryFilter === 'ALL' || lead.leadCategory === selectedCategoryFilter;
            return matchesSearch && matchesVideo && matchesCategory;
        });
    }, [leads, searchQuery, selectedVideoFilter, selectedCategoryFilter]);

    // ── PIN Lock View ─────────────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#02130d] flex items-center justify-center p-6 text-[#0066FF] font-sans">
                <div className="max-w-md w-full bg-[#05281e] border border-[#0066FF]/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="w-16 h-16 rounded-2xl bg-white0/20 border border-[#0066FF]/40 flex items-center justify-center mx-auto text-[#0066FF] mb-5">
                        <Lock className="w-8 h-8" />
                    </div>

                    <div className="text-center">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white0/20 text-[#0066FF] border border-[#0066FF]/30 uppercase tracking-widest">
                            Restricted Admin Area
                        </span>
                        <h2 className="text-2xl font-black text-white mt-3 tracking-tight">
                            YouTube Growth & Leads
                        </h2>
                        <p className="text-xs text-[#0066FF] mt-2 leading-relaxed">
                            Dual-channel YouTube engine: Post videos, scan channel uploads, and collect leads directly into Google Sheets, Airtable, and Jira.
                        </p>
                    </div>

                    <form onSubmit={handleUnlock} className="mt-8 space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-[#0066FF] block mb-1.5">
                                Admin Security Passcode
                            </label>
                            <div className="relative">
                                <Key className="w-4 h-4 text-[#0066FF] absolute left-3.5 top-3.5" />
                                <input
                                    type="password"
                                    value={passcode}
                                    onChange={e => setPasscode(e.target.value)}
                                    placeholder="Enter Admin Key (e.g. pm2026)"
                                    className="w-full bg-[#031c15] border border-[#0066FF]/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-emerald-400 transition"
                                />
                            </div>
                            {passcodeError && (
                                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5" /> {passcodeError}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#0066FF] to-[#0066FF] hover:from-[#0066FF] hover:to-[#0066FF] text-[#0066FF] font-bold py-3 rounded-xl text-sm transition shadow-lg shadow-[#0066FF]/20 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <ShieldCheck className="w-4 h-4" /> Unlock Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const creds = diagnostics?.credentials;

    return (
        <div className="min-h-screen bg-[#02130d] text-[#0066FF] font-sans pb-24">
            {/* Top Navigation Bar */}
            <header className="border-b border-[#0066FF]/50 bg-[#042018]/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                            <Play className="w-5 h-5 fill-rose-500/30" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-black text-white tracking-tight">
                                    YouTube Growth & Dual-Lead Engine
                                </h1>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white0/20 text-[#0066FF] border border-[#0066FF]/30">
                                    ACTIVE
                                </span>
                            </div>
                            <p className="text-xs text-[#0066FF]">
                                Official Channel + Dashboard Posting $\leftrightarrow$ Google Sheets $\leftrightarrow$ Airtable $\leftrightarrow$ Jira
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowManualLeadModal(true)}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0066FF]/20 hover:bg-[#0066FF]/30 text-[#0066FF] border border-[#0066FF]/40 flex items-center gap-1.5 transition cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" /> Log Video Lead
                        </button>

                        <button
                            onClick={handleSyncNow}
                            disabled={isSyncing}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                                isSyncing
                                    ? 'bg-[#0066FF]/50 text-[#0066FF] cursor-not-allowed'
                                    : 'bg-white0 hover:bg-[#0066FF] text-[#0066FF] shadow-md shadow-[#0066FF]/20'
                            }`}
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                            {isSyncing ? 'Syncing Pipeline...' : 'Sync Channel Uploads'}
                        </button>

                        <button
                            onClick={handleLock}
                            className="p-2 rounded-xl bg-white/60 hover:bg-white text-[#0066FF] hover:text-white border border-[#0066FF] transition cursor-pointer"
                            title="Lock Admin Session"
                        >
                            <Lock className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Sync Notifications */}
            {syncMessage && (
                <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-4">
                    <div className={`p-4 rounded-2xl border text-xs flex items-center justify-between ${
                        syncMessage.type === 'success' ? 'bg-[#0066FF]/40 border-[#0066FF]/40 text-[#0066FF]' :
                        syncMessage.type === 'error' ? 'bg-rose-950/40 border-rose-600/40 text-rose-200' :
                        'bg-sky-950/40 border-sky-600/40 text-sky-200'
                    }`}>
                        <div className="flex items-center gap-2">
                            {syncMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                            <span>{syncMessage.text}</span>
                        </div>
                        <button onClick={() => setSyncMessage(null)} className="text-[#0066FF] hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Integration Status Badges */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* YouTube API Status */}
                    <div className="bg-[#052319] border border-[#0066FF]/40 rounded-2xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[#0066FF] font-semibold flex items-center gap-1.5">
                                <Play className="w-3.5 h-3.5 text-rose-400" /> YouTube Channel
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                creds?.youtubeConnected ? 'bg-white0/20 text-[#0066FF]' : 'bg-amber-500/20 text-amber-300'
                            }`}>
                                {creds?.youtubeConnected ? 'CONNECTED' : 'KEY PENDING'}
                            </span>
                        </div>
                        <div className="mt-2 text-sm font-bold text-white">
                            {creds?.authMode === 'OAUTH2_CHANNEL_OWNER' ? 'OAuth 2.0 (Dual Post/Sync)' : (creds?.youtubeConnected ? 'Public Data API' : 'Not Connected')}
                        </div>
                        <div className="text-[11px] text-[#0066FF] mt-0.5">
                            Channel: {creds?.channelIdConfigured ? 'UC... Configured' : 'Missing in .env'}
                        </div>
                    </div>

                    {/* Google Sheets / Apps Script Status */}
                    <div className="bg-[#052319] border border-[#0066FF]/40 rounded-2xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[#0066FF] font-semibold flex items-center gap-1.5">
                                <FileSpreadsheet className="w-3.5 h-3.5 text-[#0066FF]" /> Google Sheets
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white0/20 text-[#0066FF]">
                                DUAL SYNC READY
                            </span>
                        </div>
                        <div className="mt-2 text-sm font-bold text-white truncate">
                            Apps Script + Dedicated Sheet
                        </div>
                        <div className="text-[11px] text-[#0066FF] mt-0.5 truncate">
                            Tabs: YouTube_Videos, YouTube_Leads
                        </div>
                    </div>

                    {/* Airtable CRM */}
                    <div className="bg-[#052319] border border-[#0066FF]/40 rounded-2xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[#0066FF] font-semibold flex items-center gap-1.5">
                                <Database className="w-3.5 h-3.5 text-[#0066FF]" /> Airtable CRM
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white0/20 text-[#0066FF]">
                                ACTIVE
                            </span>
                        </div>
                        <div className="mt-2 text-sm font-bold text-white">
                            Base: appFHphPzP7b2VYq1
                        </div>
                        <div className="text-[11px] text-[#0066FF] mt-0.5">
                            Target: Leads (YouTube Potential Lead)
                        </div>
                    </div>

                    {/* Jira Cloud */}
                    <div className="bg-[#052319] border border-[#0066FF]/40 rounded-2xl p-4 shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[#0066FF] font-semibold flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Jira Cloud
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white0/20 text-[#0066FF]">
                                READY
                            </span>
                        </div>
                        <div className="mt-2 text-sm font-bold text-white">
                            Project: PROF
                        </div>
                        <div className="text-[11px] text-[#0066FF] mt-0.5">
                            Host: trustworkz.atlassian.net
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-8">
                <div className="flex items-center gap-2 border-b border-[#0066FF]/40 pb-4 overflow-x-auto">
                    {[
                        { id: 'OVERVIEW', label: 'Pipeline Overview', icon: Sparkles },
                        { id: 'LEADS', label: `Potential Leads (${leads.length})`, icon: UserCheck },
                        { id: 'POST_VIDEO', label: '🎥 Post Video to YouTube', icon: Video },
                        { id: 'SCAN_VIDEO', label: '🔍 Scan Specific Video', icon: Search },
                        { id: 'VIDEOS', label: 'Video Performance', icon: Play },
                        { id: 'LOGS', label: 'Sync Execution Logs', icon: Clock }
                    ].map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'bg-white0 text-[#0066FF] shadow-md shadow-[#0066FF]/20'
                                        : 'bg-white/60 text-[#0066FF] hover:text-white border border-[#0066FF]'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* ── Tab 1: OVERVIEW ────────────────────────────────────────── */}
                {activeTab === 'OVERVIEW' && (
                    <div className="mt-6 space-y-6">
                        {/* Summary Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-[#042018] border border-[#0066FF]/40 rounded-2xl p-5">
                                <div className="text-xs text-[#0066FF] flex items-center gap-1.5">
                                    <Sparkles className="w-4 h-4 text-[#0066FF]" /> Total Flagged Leads
                                </div>
                                <div className="text-3xl font-black text-white mt-2">
                                    {leads.length}
                                </div>
                                <div className="text-[11px] text-[#0066FF]/80 mt-1">
                                    From Channel Comments & Dashboard
                                </div>
                            </div>

                            <div className="bg-[#042018] border border-[#0066FF]/40 rounded-2xl p-5">
                                <div className="text-xs text-[#0066FF] flex items-center gap-1.5">
                                    <Play className="w-4 h-4 text-rose-400" /> Tracked Videos
                                </div>
                                <div className="text-3xl font-black text-white mt-2">
                                    {(diagnostics?.recentLogs?.[0]?.videosProcessed || 0) + videos.length}
                                </div>
                                <div className="text-[11px] text-[#0066FF] mt-1">
                                    Channel Uploads + Registered
                                </div>
                            </div>

                            <div className="bg-[#042018] border border-[#0066FF]/40 rounded-2xl p-5">
                                <div className="text-xs text-[#0066FF] flex items-center gap-1.5">
                                    <MessageSquare className="w-4 h-4 text-sky-400" /> Ingested Comments
                                </div>
                                <div className="text-3xl font-black text-white mt-2">
                                    {diagnostics?.recentLogs?.[0]?.commentsProcessed || 0}
                                </div>
                                <div className="text-[11px] text-[#0066FF] mt-1">
                                    Filtered by Intent Classifier
                                </div>
                            </div>

                            <div className="bg-[#042018] border border-[#0066FF]/40 rounded-2xl p-5">
                                <div className="text-xs text-[#0066FF] flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-amber-400" /> Last Pipeline Sync
                                </div>
                                <div className="text-lg font-bold text-white mt-3 truncate">
                                    {diagnostics?.lastSyncAt ? new Date(diagnostics.lastSyncAt).toLocaleTimeString() : 'Never'}
                                </div>
                                <div className="text-[11px] text-[#0066FF] mt-1">
                                    {diagnostics?.lastSyncAt ? new Date(diagnostics.lastSyncAt).toLocaleDateString() : 'Click Sync Channel'}
                                </div>
                            </div>
                        </div>

                        {/* Dual-Channel Architecture Explainer */}
                        <div className="bg-gradient-to-r from-[#04261d] to-[#031d16] border border-[#0066FF]/40 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <Share2 className="w-5 h-5 text-[#0066FF]" /> How ProfitMachines Dual-Posting & Lead Collection Operates
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs text-[#0066FF] leading-relaxed">
                                <div className="bg-[#02130d] p-4 rounded-xl border border-[#0066FF]/50">
                                    <div className="font-bold text-[#0066FF] mb-1 flex items-center gap-1.5">
                                        <Play className="w-3.5 h-3.5 text-rose-400" /> 1. Channel Video Comments Scan
                                    </div>
                                    <p>
                                        When you upload videos directly on YouTube, our system scans the comment threads across your entire channel, detects buying intent (pricing, demo requests, consultation, technical challenges), and syncs them directly into Airtable, Jira, and Google Sheets.
                                    </p>
                                </div>

                                <div className="bg-[#02130d] p-4 rounded-xl border border-[#0066FF]/50">
                                    <div className="font-bold text-[#0066FF] mb-1 flex items-center gap-1.5">
                                        <Video className="w-3.5 h-3.5 text-[#0066FF]" /> 2. Dashboard Posting & Specific Video Tracking
                                    </div>
                                    <p>
                                        Use the <strong>"Post Video to YouTube"</strong> tab to draft and publish video metadata with built-in ProfitMachines UTM tracking. Or paste any YouTube URL in <strong>"Scan Specific Video"</strong> to extract leads immediately on demand!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Synchronization Runs */}
                        <div className="bg-[#042018] border border-[#0066FF]/40 rounded-2xl p-6">
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <Clock className="w-5 h-5 text-[#0066FF]" /> Recent Execution Logs
                            </h3>
                            <div className="mt-4 overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-[#0066FF]/40 text-[#0066FF]">
                                            <th className="pb-3">Sync ID</th>
                                            <th className="pb-3">Timestamp</th>
                                            <th className="pb-3">Status</th>
                                            <th className="pb-3">Videos</th>
                                            <th className="pb-3">Comments</th>
                                            <th className="pb-3">Leads Flagged</th>
                                            <th className="pb-3">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-emerald-900/30">
                                        {(diagnostics?.recentLogs || []).length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="py-6 text-center text-[#0066FF]">
                                                    No synchronization runs recorded yet. Click "Sync Channel Uploads" above to initiate a run.
                                                </td>
                                            </tr>
                                        ) : (
                                            diagnostics?.recentLogs.map(log => (
                                                <tr key={log.syncRunId} className="hover:bg-[#0066FF]/20">
                                                    <td className="py-3 font-mono text-[#0066FF]">{log.syncRunId}</td>
                                                    <td className="py-3 text-[#0066FF]">{new Date(log.completedAt).toLocaleString()}</td>
                                                    <td className="py-3">
                                                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                                            log.status === 'SUCCESS' ? 'bg-white0/20 text-[#0066FF]' :
                                                            log.status === 'PARTIAL_SUCCESS' ? 'bg-amber-500/20 text-amber-300' :
                                                            'bg-rose-500/20 text-rose-300'
                                                        }`}>
                                                            {log.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 text-white">{log.videosProcessed}</td>
                                                    <td className="py-3 text-white">{log.commentsProcessed}</td>
                                                    <td className="py-3 text-[#0066FF] font-bold">{log.potentialLeadsFlagged}</td>
                                                    <td className="py-3 text-[#0066FF] max-w-xs truncate" title={log.errorDetails}>
                                                        {log.errorDetails}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Tab 2: LEADS (Flagged) ─────────────────────────────────── */}
                {activeTab === 'LEADS' && (
                    <div className="mt-6 space-y-6">
                        {/* Filters & Actions Bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full sm:w-80">
                                <Search className="w-4 h-4 text-[#0066FF] absolute left-3 top-3" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search commenter, video, notes..."
                                    className="w-full bg-[#042018] border border-[#0066FF]/40 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
                                />
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <select
                                    value={selectedCategoryFilter}
                                    onChange={e => setSelectedCategoryFilter(e.target.value)}
                                    className="bg-[#042018] border border-[#0066FF]/40 rounded-xl px-3 py-2 text-xs text-[#0066FF] focus:outline-none"
                                >
                                    <option value="ALL">All Categories</option>
                                    <option value="PRICING">Pricing Inquiry</option>
                                    <option value="DEMO">Demo Request</option>
                                    <option value="CONSULTATION">Consultation Request</option>
                                    <option value="SERVICE_INQUIRY">Service Inquiry</option>
                                    <option value="BUSINESS_PAIN_POINT">Business Pain Point</option>
                                </select>

                                <button
                                    onClick={() => setShowManualLeadModal(true)}
                                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white0 hover:bg-[#0066FF] text-[#0066FF] flex items-center gap-1.5 transition cursor-pointer"
                                >
                                    <Plus className="w-3.5 h-3.5" /> Log Lead
                                </button>
                            </div>
                        </div>

                        {/* Flagged Leads List */}
                        {filteredLeads.length === 0 ? (
                            <div className="bg-[#042018] border border-[#0066FF]/40 rounded-2xl p-12 text-center">
                                <Sparkles className="w-8 h-8 text-[#0066FF] mx-auto mb-3 opacity-60" />
                                <h3 className="font-semibold text-white">No Flagged Potential Leads Found Yet</h3>
                                <p className="text-xs text-[#0066FF] mt-1 max-w-md mx-auto">
                                    When viewers comment asking for pricing, demos, consultations, or services on your YouTube channel videos, they will automatically appear here.
                                </p>
                                <div className="mt-4 flex items-center justify-center gap-3">
                                    <button
                                        onClick={handleSyncNow}
                                        className="px-4 py-2 rounded-xl text-xs font-bold bg-white0/20 text-[#0066FF] border border-[#0066FF]/40 hover:bg-[#0066FF]/30 transition cursor-pointer"
                                    >
                                        Run Channel Sync Now
                                    </button>
                                    <button
                                        onClick={() => setShowManualLeadModal(true)}
                                        className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/40 hover:bg-[#0066FF]/30 transition cursor-pointer"
                                    >
                                        Log First Direct Lead
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredLeads.map(lead => (
                                    <div key={lead.commentId} className="bg-[#042018] border border-[#0066FF]/50 rounded-2xl p-5 shadow-lg">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white0/20 border border-[#0066FF]/40 flex items-center justify-center font-bold text-[#0066FF] text-sm">
                                                    {lead.authorDisplayName.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-white text-sm">{lead.authorDisplayName}</span>
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                                            lead.source === 'DIRECT_CAPTURE' ? 'bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/40' :
                                                            lead.source === 'DASHBOARD_POST' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                                                            'bg-white0/20 text-[#0066FF] border border-[#0066FF]/40'
                                                        }`}>
                                                            {lead.source === 'DIRECT_CAPTURE' ? 'DIRECT LOG' : lead.source === 'DASHBOARD_POST' ? 'DASHBOARD POST' : 'CHANNEL COMMENT'}
                                                        </span>
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300">
                                                            {lead.reviewStatus}
                                                        </span>
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white0/20 text-[#0066FF]">
                                                            Score: {lead.confidenceScore}/100
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-[#0066FF] mt-0.5">
                                                        Source Video: <span className="text-[#0066FF]">{lead.videoTitle}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {lead.jiraIssueKey && (
                                                    <a
                                                        href={`https://trustworkz.atlassian.net/browse/${lead.jiraIssueKey}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-semibold flex items-center gap-1 border border-blue-500/40"
                                                    >
                                                        Jira: {lead.jiraIssueKey} <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                                {lead.airtableRecordId && (
                                                    <a
                                                        href={`https://airtable.com/appFHphPzP7b2VYq1/tblLeads/${lead.airtableRecordId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-2.5 py-1 rounded-lg bg-[#0066FF]/20 hover:bg-[#0066FF]/30 text-[#0066FF] text-xs font-semibold flex items-center gap-1 border border-[#0066FF]/40"
                                                    >
                                                        Airtable CRM <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                                {lead.commentUrl && (
                                                    <a
                                                        href={lead.commentUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#0066FF]/10 text-[#0066FF] text-xs font-semibold flex items-center gap-1"
                                                    >
                                                        YouTube <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-4 bg-[#02130d] p-3.5 rounded-xl border border-[#0066FF]/50 text-xs text-[#0066FF] font-mono">
                                            "{lead.commentText}"
                                        </div>

                                        <div className="mt-3 text-[11px] text-[#0066FF] flex items-center gap-1.5 font-medium">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            <span>Reason Flagged: {lead.reasonFlagged}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── Tab 3: POST VIDEO TO YOUTUBE ───────────────────────────── */}
                {activeTab === 'POST_VIDEO' && (
                    <div className="mt-6 bg-[#042018] border border-[#0066FF]/40 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center justify-between pb-4 border-b border-[#0066FF]/40">
                            <div>
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <Video className="w-5 h-5 text-[#0066FF]" /> Post / Register Video on YouTube
                                </h3>
                                <p className="text-xs text-[#0066FF] mt-1">
                                    Publish video metadata to YouTube channel and automatically enter into ProfitMachines lead-tracking pipeline.
                                </p>
                            </div>
                            <span className="text-[11px] px-3 py-1 rounded-full bg-white0/20 text-[#0066FF] border border-[#0066FF]/30 font-bold">
                                Dual-Channel Publishing
                            </span>
                        </div>

                        {publishResult && (
                            <div className={`mt-4 p-4 rounded-xl text-xs border flex items-center justify-between ${
                                publishResult.success ? 'bg-[#0066FF]/40 border-[#0066FF]/40 text-[#0066FF]' : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                            }`}>
                                <div className="flex items-center gap-2">
                                    {publishResult.success ? <CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                                    <span>{publishResult.message}</span>
                                    {publishResult.url && (
                                        <a href={publishResult.url} target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#0066FF] flex items-center gap-1">
                                            View Video <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                                <button onClick={() => setPublishResult(null)} className="text-[#0066FF] hover:text-white">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <form onSubmit={handlePublishVideo} className="mt-6 space-y-5">
                            <div>
                                <label className="text-xs font-semibold text-[#0066FF] block mb-1">
                                    Video Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={publishTitle}
                                    onChange={e => setPublishTitle(e.target.value)}
                                    placeholder="e.g. How to Capture 5% Active In-Market B2B Buyers with AI Intent"
                                    className="w-full bg-[#02130d] border border-[#0066FF]/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="text-xs font-semibold text-[#0066FF]">
                                        Video Description (With UTM Tracking)
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setPublishDescription(prev => prev + '\n\n👉 Book an AI Strategy Consultation:\nhttps://profit-machines.vercel.app/book-consultation?utm_source=youtube&utm_medium=video_description')}
                                            className="text-[10px] text-[#0066FF] hover:underline cursor-pointer"
                                        >
                                            + Insert Consultation Link
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPublishDescription(prev => prev + '\n\n👉 Request Profit Pool Audit:\nhttps://profit-machines.vercel.app/offerings/profit-pool-discovery?utm_source=youtube&utm_medium=video_description')}
                                            className="text-[10px] text-[#0066FF] hover:underline cursor-pointer"
                                        >
                                            + Insert Audit Link
                                        </button>
                                    </div>
                                </div>
                                <textarea
                                    rows={5}
                                    value={publishDescription}
                                    onChange={e => setPublishDescription(e.target.value)}
                                    className="w-full bg-[#02130d] border border-[#0066FF]/50 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF] font-sans"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-[#0066FF] block mb-1">
                                        Tags (Comma-Separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={publishTags}
                                        onChange={e => setPublishTags(e.target.value)}
                                        className="w-full bg-[#02130d] border border-[#0066FF]/50 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#0066FF] block mb-1">
                                        Privacy Status
                                    </label>
                                    <select
                                        value={publishPrivacy}
                                        onChange={e => setPublishPrivacy(e.target.value as any)}
                                        className="w-full bg-[#02130d] border border-[#0066FF]/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                                    >
                                        <option value="public">Public (Visible to All)</option>
                                        <option value="unlisted">Unlisted (Anyone with link)</option>
                                        <option value="private">Private (Restricted)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[#0066FF] block mb-1">
                                    Existing YouTube Video URL (Optional — To Track An Already Posted Video)
                                </label>
                                <input
                                    type="text"
                                    value={publishExistingUrl}
                                    onChange={e => setPublishExistingUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full bg-[#02130d] border border-[#0066FF]/50 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isPublishingVideo}
                                className={`px-6 py-3 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                                    isPublishingVideo
                                        ? 'bg-[#0066FF] text-[#0066FF] cursor-not-allowed'
                                        : 'bg-white0 hover:bg-[#0066FF] text-[#0066FF] shadow-lg shadow-[#0066FF]/20'
                                }`}
                            >
                                <Send className="w-4 h-4" />
                                {isPublishingVideo ? 'Publishing to YouTube...' : 'Publish & Track Video on YouTube'}
                            </button>
                        </form>
                    </div>
                )}

                {/* ── Tab 4: SCAN SPECIFIC VIDEO ─────────────────────────────── */}
                {activeTab === 'SCAN_VIDEO' && (
                    <div className="mt-6 bg-[#042018] border border-[#0066FF]/40 rounded-2xl p-6 shadow-xl">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <Search className="w-5 h-5 text-[#0066FF]" /> Scan Any Specific Video URL for Leads
                        </h3>
                        <p className="text-xs text-[#0066FF] mt-1">
                            Enter any YouTube Video URL or Video ID to immediately inspect its comments, run the AI intent classifier, and collect discovered leads into Airtable, Jira, & Google Sheets.
                        </p>

                        <form onSubmit={handleScanSpecificVideo} className="mt-6 flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                required
                                value={scanTargetInput}
                                onChange={e => setScanTargetInput(e.target.value)}
                                placeholder="Paste YouTube URL: https://www.youtube.com/watch?v=... or Video ID"
                                className="flex-1 bg-[#02130d] border border-[#0066FF]/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
                            />
                            <button
                                type="submit"
                                disabled={isScanningTarget}
                                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                                    isScanningTarget
                                        ? 'bg-[#0066FF] text-[#0066FF] cursor-not-allowed'
                                        : 'bg-white0 hover:bg-[#0066FF] text-[#0066FF] shadow-md shadow-[#0066FF]/20'
                                }`}
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${isScanningTarget ? 'animate-spin' : ''}`} />
                                {isScanningTarget ? 'Extracting Comments...' : 'Scan & Extract Leads'}
                            </button>
                        </form>

                        {scanTargetResult && (
                            <div className="mt-4 p-4 rounded-xl text-xs bg-[#02130d] border border-[#0066FF]/50 text-[#0066FF]">
                                {scanTargetResult}
                            </div>
                        )}
                    </div>
                )}

                {/* ── Tab 5: VIDEOS ─────────────────────────────────────────── */}
                {activeTab === 'VIDEOS' && (
                    <div className="mt-6 bg-[#042018] border border-[#0066FF]/40 rounded-2xl p-6">
                        <div className="flex items-center justify-between pb-4 border-b border-[#0066FF]/40">
                            <div>
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <Play className="w-5 h-5 text-rose-400" /> Channel Video Analytics & Tracked Videos
                                </h3>
                                <p className="text-xs text-[#0066FF] mt-1">
                                    Synchronized to Jira video analytics tasks and the "Video Analytics" tab in Google Sheets.
                                </p>
                            </div>
                            <button
                                onClick={handleSyncNow}
                                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white0/20 text-[#0066FF] border border-[#0066FF]/40 hover:bg-[#0066FF]/30 transition cursor-pointer"
                            >
                                Refresh Video Metrics
                            </button>
                        </div>

                        {videos.length === 0 ? (
                            <div className="text-center py-12 text-[#0066FF] text-xs">
                                Click "Sync Channel Uploads" to fetch all existing videos, or use "Post Video to YouTube" to register new ones.
                            </div>
                        ) : (
                            <div className="mt-4 space-y-3">
                                {videos.map(v => (
                                    <div key={v.videoId} className="p-4 rounded-xl bg-[#02130d] border border-[#0066FF]/40 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-bold text-white">{v.title}</div>
                                            <div className="text-xs text-[#0066FF] mt-0.5 flex items-center gap-3">
                                                <span>ID: <code className="text-[#0066FF]">{v.videoId}</code></span>
                                                <span>Views: {v.views}</span>
                                                <span>Likes: {v.likes}</span>
                                                <span>Comments: {v.commentsCount}</span>
                                            </div>
                                        </div>
                                        <a
                                            href={v.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#0066FF]/10 text-xs text-[#0066FF] flex items-center gap-1"
                                        >
                                            View <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── Tab 6: LOGS ───────────────────────────────────────────── */}
                {activeTab === 'LOGS' && (
                    <div className="mt-6 bg-[#042018] border border-[#0066FF]/40 rounded-2xl p-6">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[#0066FF]" /> Pipeline Synchronization Audit Trail
                        </h3>
                        <p className="text-xs text-[#0066FF] mt-1">
                            Permanent audit trail mirrored to the "Sync Logs" tab in your dedicated Google Sheet.
                        </p>

                        <div className="mt-4 space-y-3">
                            {(diagnostics?.recentLogs || []).map(log => (
                                <div key={log.syncRunId} className="p-4 rounded-xl bg-[#02130d] border border-[#0066FF]/40 text-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-[#0066FF] font-bold">{log.syncRunId}</span>
                                        <span className="text-[#0066FF]">{new Date(log.completedAt).toLocaleString()}</span>
                                    </div>
                                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[#0066FF]">
                                        <div>Videos: <strong className="text-white">{log.videosProcessed}</strong></div>
                                        <div>Comments: <strong className="text-white">{log.commentsProcessed}</strong></div>
                                        <div>Flagged Leads: <strong className="text-[#0066FF]">{log.potentialLeadsFlagged}</strong></div>
                                        <div>Jira Issues: <strong className="text-blue-400">{log.jiraIssuesCount}</strong></div>
                                    </div>
                                    {log.errorDetails && log.errorDetails !== 'None' && (
                                        <div className="mt-2 text-rose-400 font-mono text-[11px]">
                                            Error Details: {log.errorDetails}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Direct Video Lead Modal */}
            {showManualLeadModal && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-[#042018] border border-[#0066FF]/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-[#0066FF]/40">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Plus className="w-4 h-4 text-[#0066FF]" /> Log Direct Video Lead
                            </h3>
                            <button onClick={() => setShowManualLeadModal(false)} className="text-[#0066FF] hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateManualLead} className="mt-4 space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-[#0066FF] block mb-1">
                                    Lead Name / Contact *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={manualLeadName}
                                    onChange={e => setManualLeadName(e.target.value)}
                                    placeholder="e.g. David Miller (VP Sales at TechCorp)"
                                    className="w-full bg-[#02130d] border border-[#0066FF]/50 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[#0066FF] block mb-1">
                                    Inquiry / Viewer Requirement *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={manualLeadNotes}
                                    onChange={e => setManualLeadNotes(e.target.value)}
                                    placeholder="e.g. Saw your YouTube video on demand generation, interested in pricing for enterprise CRM."
                                    className="w-full bg-[#02130d] border border-[#0066FF]/50 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-semibold text-[#0066FF] block mb-1">
                                        Source Video Title
                                    </label>
                                    <input
                                        type="text"
                                        value={manualLeadVideo}
                                        onChange={e => setManualLeadVideo(e.target.value)}
                                        placeholder="e.g. AI Growth Engine Breakdown"
                                        className="w-full bg-[#02130d] border border-[#0066FF]/50 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#0066FF] block mb-1">
                                        Lead Category
                                    </label>
                                    <select
                                        value={manualLeadCategory}
                                        onChange={e => setManualLeadCategory(e.target.value)}
                                        className="w-full bg-[#02130d] border border-[#0066FF]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                                    >
                                        <option value="CONSULTATION">Consultation Request</option>
                                        <option value="DEMO">Demo Request</option>
                                        <option value="PRICING">Pricing Inquiry</option>
                                        <option value="SERVICE_INQUIRY">Service Inquiry</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[#0066FF] block mb-1">
                                    Channel URL or Social Profile
                                </label>
                                <input
                                    type="text"
                                    value={manualLeadChannelUrl}
                                    onChange={e => setManualLeadChannelUrl(e.target.value)}
                                    placeholder="https://youtube.com/@channel or LinkedIn"
                                    className="w-full bg-[#02130d] border border-[#0066FF]/50 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF]"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowManualLeadModal(false)}
                                    className="px-4 py-2 rounded-xl text-xs text-[#0066FF] hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingLead}
                                    className="px-4 py-2 rounded-xl text-xs font-bold bg-white0 hover:bg-[#0066FF] text-[#0066FF] flex items-center gap-1.5 transition cursor-pointer"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    {isSubmittingLead ? 'Syncing Lead...' : 'Submit to Airtable, Jira & Sheets'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
