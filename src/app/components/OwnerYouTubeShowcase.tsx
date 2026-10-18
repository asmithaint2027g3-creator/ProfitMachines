import React, { useState, useEffect, useRef } from 'react';
import { 
    Play, CheckCircle2, AlertCircle, Send, Sparkles, 
    ShieldCheck, Clock, ExternalLink, ArrowRight, UserCheck 
} from 'lucide-react';
import { 
    OwnerYouTubeVideo, 
    getOwnerYouTubeVideos, 
    extractYouTubeVideoId 
} from '../data/ownerVideosData';

interface OwnerYouTubeShowcaseProps {
    /** Target page to filter for, e.g. '/resources' or '/demand-pulse' */
    targetPage?: string;
    /** Or pass a specific video object directly */
    video?: OwnerYouTubeVideo;
    /** Custom title header */
    heading?: string;
    /** Custom subtitle */
    subheading?: string;
    className?: string;
}

export default function OwnerYouTubeShowcase({
    targetPage,
    video: directVideo,
    heading,
    subheading,
    className = ''
}: OwnerYouTubeShowcaseProps) {
    // ── 1. Video Resolution & State ───────────────────────────────────────────
    const [allVideos, setAllVideos] = useState<OwnerYouTubeVideo[]>(() => getOwnerYouTubeVideos());
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);

    useEffect(() => {
        const handleUpdate = () => {
            setAllVideos(getOwnerYouTubeVideos());
        };
        window.addEventListener('pm_owner_videos_updated', handleUpdate);
        return () => window.removeEventListener('pm_owner_videos_updated', handleUpdate);
    }, []);

    // Filter candidate videos
    const candidateVideos = React.useMemo(() => {
        if (directVideo) return [directVideo];
        const published = allVideos.filter(v => v.published);
        if (targetPage) {
            const matches = published.filter(v => v.targetPage === targetPage || targetPage.startsWith(v.targetPage));
            if (matches.length > 0) return matches;
        }
        const featured = published.filter(v => v.featured);
        return featured.length > 0 ? featured : published;
    }, [allVideos, targetPage, directVideo]);

    const currentVideo: OwnerYouTubeVideo | undefined = candidateVideos[activeVideoIndex] || candidateVideos[0];
    const resolvedVideoId = currentVideo ? (extractYouTubeVideoId(currentVideo.youtubeUrl) || currentVideo.videoId) : 'dQw4w9WgXcQ';

    // ── 2. Playback Milestone Observation (YouTube IFrame API) ────────────────
    const [playbackMilestone, setPlaybackMilestone] = useState<'not_started' | 'started' | '25%' | '50%' | '75%' | 'completed'>('not_started');
    const [observedSeconds, setObservedSeconds] = useState(0);
    const playerRef = useRef<any>(null);
    const pollIntervalRef = useRef<any>(null);

    useEffect(() => {
        // Load YouTube IFrame API script if not loaded
        if (typeof window !== 'undefined' && !(window as any).YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const playerId = `yt-player-${resolvedVideoId}`;
        let player: any = null;

        const initPlayer = () => {
            if ((window as any).YT && (window as any).YT.Player) {
                try {
                    player = new (window as any).YT.Player(playerId, {
                        events: {
                            onStateChange: (event: any) => {
                                // YT.PlayerState.PLAYING is 1
                                if (event.data === 1) {
                                    setPlaybackMilestone(prev => prev === 'not_started' ? 'started' : prev);
                                    if (!pollIntervalRef.current) {
                                        pollIntervalRef.current = setInterval(() => {
                                            if (player && typeof player.getCurrentTime === 'function' && typeof player.getDuration === 'function') {
                                                const current = player.getCurrentTime();
                                                const duration = player.getDuration();
                                                if (duration > 0) {
                                                    setObservedSeconds(Math.round(current));
                                                    const pct = current / duration;
                                                    if (pct >= 0.98) {
                                                        setPlaybackMilestone('completed');
                                                    } else if (pct >= 0.75) {
                                                        setPlaybackMilestone('75%');
                                                    } else if (pct >= 0.50) {
                                                        setPlaybackMilestone('50%');
                                                    } else if (pct >= 0.25) {
                                                        setPlaybackMilestone('25%');
                                                    } else if (pct > 0.02) {
                                                        setPlaybackMilestone('started');
                                                    }
                                                }
                                            }
                                        }, 1000);
                                    }
                                } else if (event.data === 0) {
                                    setPlaybackMilestone('completed');
                                    if (pollIntervalRef.current) {
                                        clearInterval(pollIntervalRef.current);
                                        pollIntervalRef.current = null;
                                    }
                                }
                            }
                        }
                    });
                    playerRef.current = player;
                } catch (e) {
                    // Fallback to plain iframe if YT API fails
                }
            }
        };

        if ((window as any).YT && (window as any).YT.Player) {
            initPlayer();
        } else {
            (window as any).onYouTubeIframeAPIReady = () => {
                initPlayer();
            };
        }

        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
                pollIntervalRef.current = null;
            }
            if (player && typeof player.destroy === 'function') {
                try { player.destroy(); } catch (e) {}
            }
        };
    }, [resolvedVideoId]);

    // ── 3. Lead Form State ────────────────────────────────────────────────────
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [consentGiven, setConsentGiven] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState<{
        submissionId: string;
        jiraKey?: string;
        message: string;
    } | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!name.trim()) {
            setErrorMessage('Please provide your name.');
            return;
        }
        if (!email.trim() || !email.includes('@')) {
            setErrorMessage('Please provide a valid business email.');
            return;
        }

        setIsSubmitting(true);

        const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://profit-machines-1.vercel.app';
        const clientTimestamp = new Date().toISOString();
        const submissionId = `YT-LEAD-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

        const payload = {
            submissionId,
            name: name.trim(),
            email: email.trim(),
            company: company.trim() || 'Undisclosed Enterprise',
            phone: phone.trim() || 'N/A',
            notes: notes.trim() || 'Direct Video Lead Inquiry',
            consentGiven,
            attribution: {
                videoId: resolvedVideoId,
                videoTitle: currentVideo?.title || 'ProfitMachines Video Showcase',
                youtubeUrl: currentVideo?.youtubeUrl || `https://www.youtube.com/watch?v=${resolvedVideoId}`,
                targetPage: currentVideo?.targetPage || targetPage || window.location.pathname,
                targetService: currentVideo?.targetService || 'Executive AI Strategy',
                leadSource: 'YouTube Video Showcase',
                pageUrl: currentUrl,
                clientTimestamp,
                playbackMilestone,
                observedSeconds
            }
        };

        try {
            const res = await fetch('/api/leads/youtube', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSubmitSuccess({
                    submissionId: data.submissionId || submissionId,
                    jiraKey: data.jiraKey,
                    message: data.message || 'Your inquiry has been registered with our executive engineering team.'
                });
                setName('');
                setEmail('');
                setCompany('');
                setPhone('');
                setNotes('');
            } else {
                setErrorMessage(data.error || 'Failed to submit lead. Please try again or book directly.');
            }
        } catch (err: any) {
            setErrorMessage(`Network error submitting inquiry: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!currentVideo) {
        return null;
    }

    return (
        <section className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                    <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>Executive Video Intelligence</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    {heading || currentVideo.title}
                </h2>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                    {subheading || currentVideo.description}
                </p>
            </div>

            {/* Video Selector Tabs if multiple videos match */}
            {candidateVideos.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {candidateVideos.map((vid, idx) => (
                        <button
                            key={vid.id}
                            onClick={() => {
                                setActiveVideoIndex(idx);
                                setPlaybackMilestone('not_started');
                                setSubmitSuccess(null);
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                                activeVideoIndex === idx
                                    ? 'bg-[#0A2540] text-white shadow-md'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                            }`}
                        >
                            <Play className="w-3 h-3" />
                            <span className="truncate max-w-[200px]">{vid.title}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Video Player + Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-slate-200/80 rounded-3xl shadow-xl p-6 sm:p-8">
                {/* Left: Responsive Video Embed */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg">
                            <iframe
                                id={`yt-player-${resolvedVideoId}`}
                                src={`https://www.youtube-nocookie.com/embed/${resolvedVideoId}?enablejsapi=1&rel=0&modestbranding=1`}
                                title={currentVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full border-0 absolute inset-0"
                            />
                        </div>

                        {/* Video Metadata & Live Milestone Attribution Badge */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 font-medium text-slate-700">
                                    <Clock className="w-3 h-3 text-[#2878B5]" />
                                    <span>Target: {currentVideo.targetService}</span>
                                </span>
                                {playbackMilestone !== 'not_started' && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold animate-fade-in">
                                        <Sparkles className="w-3 h-3 text-emerald-600" />
                                        <span>Observed Playback: {playbackMilestone} ({observedSeconds}s)</span>
                                    </span>
                                )}
                            </div>

                            <a
                                href={currentVideo.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[#2878B5] hover:text-[#0A2540] font-semibold transition"
                            >
                                <span>Watch on YouTube</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>

                        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                            <span className="font-bold text-slate-800 block mb-1">Executive Summary:</span>
                            {currentVideo.description}
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Watching does not require submitting a lead form.</span>
                        </div>
                        <span className="font-mono text-slate-400">ID: {resolvedVideoId}</span>
                    </div>
                </div>

                {/* Right: Attached Lead Form */}
                <div className="lg:col-span-5 bg-gradient-to-b from-[#F8FAFC] to-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2878B5] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                    Direct Attribution
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 mt-1">
                                    {currentVideo.ctaLabel || 'Request an Executive Briefing'}
                                </h3>
                            </div>
                            <UserCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                        </div>

                        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                            Connect with our engineering leads to review your revenue telemetry and deployment architecture.
                        </p>

                        {submitSuccess ? (
                            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 my-4 text-center animate-fade-in">
                                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                                <h4 className="font-bold text-sm text-emerald-950">Inquiry Received</h4>
                                <p className="text-xs text-emerald-800 mt-1">
                                    {submitSuccess.message}
                                </p>
                                <div className="mt-3 pt-3 border-t border-emerald-200 text-[11px] text-emerald-700 font-mono">
                                    Ref: {submitSuccess.submissionId}
                                    {submitSuccess.jiraKey && (
                                        <span className="block mt-0.5 font-bold">Jira Task: {submitSuccess.jiraKey}</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => setSubmitSuccess(null)}
                                    className="mt-4 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                                >
                                    Submit Another Inquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitLead} className="space-y-3.5">
                                {errorMessage && (
                                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}

                                <div>
                                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="e.g. Elena Vance"
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2878B5] transition shadow-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                                            Work Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="elena@enterprise.com"
                                            className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2878B5] transition shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                                            Company / Organization
                                        </label>
                                        <input
                                            type="text"
                                            value={company}
                                            onChange={e => setCompany(e.target.value)}
                                            placeholder="Apex Technologies"
                                            className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2878B5] transition shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                                        Phone Number (Optional)
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2878B5] transition shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                                        Primary Revenue Challenge / Notes
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={notes}
                                        onChange={e => setNotes(e.target.value)}
                                        placeholder="We need to automate SDR qualification across our top 500 accounts..."
                                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2878B5] transition shadow-sm resize-none"
                                    />
                                </div>

                                <div className="flex items-start gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="video-lead-consent"
                                        checked={consentGiven}
                                        onChange={e => setConsentGiven(e.target.checked)}
                                        className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                    />
                                    <label htmlFor="video-lead-consent" className="text-[11px] text-slate-500 cursor-pointer">
                                        I consent to receiving executive technical correspondence from ProfitMachines regarding autonomous revenue infrastructure.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                                        isSubmitting
                                            ? 'bg-slate-400 text-white cursor-not-allowed'
                                            : 'bg-[#0A2540] hover:bg-[#1E3A5F] text-white'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Submitting Lead...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{currentVideo.ctaLabel || 'Submit Video Inquiry'}</span>
                                            <Send className="w-3.5 h-3.5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 text-center">
                        <span className="text-[10px] text-slate-400 font-mono">
                            Auto-sync: Jira Cloud (PROF) + Google Sheets CRM
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
