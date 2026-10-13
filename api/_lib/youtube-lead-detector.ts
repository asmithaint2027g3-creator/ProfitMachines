/**
 * api/_lib/youtube-lead-detector.ts
 * Configurable rule-based lead detection engine for YouTube comments.
 * Flags comments expressing genuine commercial intent (pricing, demo, consultation,
 * service inquiry, or business pain point fit) while filtering out casual praise and spam.
 */

import type { YouTubeCommentData } from './youtube';

export interface FlaggedPotentialLead {
    leadRecordId?: string;
    videoId: string;
    videoTitle: string;
    commentId: string;
    commentText: string;
    authorDisplayName: string;
    authorChannelId: string;
    authorChannelUrl: string;
    commentUrl?: string;
    commentDate: string;
    reasonFlagged: string;
    leadCategory: 'PRICING' | 'DEMO' | 'CONSULTATION' | 'SERVICE_INQUIRY' | 'BUSINESS_PAIN_POINT';
    confidenceScore: number;
    reviewStatus: 'Potential Lead - Needs Review';
    contactedStatus?: 'Not Contacted' | 'Contacted' | 'Disqualified';
    airtableRecordId?: string;
    jiraIssueKey?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Intent rule categories and regex patterns
interface IntentPattern {
    category: FlaggedPotentialLead['leadCategory'];
    label: string;
    weight: number;
    patterns: RegExp[];
}

const INTENT_PATTERNS: IntentPattern[] = [
    {
        category: 'PRICING',
        label: 'Inquired about pricing, cost, or commercial packaging',
        weight: 35,
        patterns: [
            /\b(how much (is|does|for)|pricing|price|cost|quote|rates|fees|budget|retainer|commercials|package cost)\b/i,
            /\b(what do you charge|what's the cost|how much do you charge)\b/i,
            /\b(what does this cost|pricing model|subscription cost)\b/i
        ]
    },
    {
        category: 'DEMO',
        label: 'Requested live product demonstration or walkthrough',
        weight: 40,
        patterns: [
            /\b(demo|product demo|live demo|walkthrough|can you show|showcase|see how it works)\b/i,
            /\b(can i see a demo|schedule a demo|book a demo|request a demo)\b/i,
            /\b(sandbox|platform walkthrough|interactive demo)\b/i
        ]
    },
    {
        category: 'CONSULTATION',
        label: 'Requested consultation, discovery meeting, or direct outreach',
        weight: 45,
        patterns: [
            /\b(consultation|consult|book a call|hop on a call|jump on a call|schedule a call)\b/i,
            /\b(can we connect|can we talk|contact you|reach out|send you a dm|discuss with my team)\b/i,
            /\b(talk to an expert|hire you|work with you|discovery call)\b/i,
            /\b(my email is|send me an email|connect on linkedin)\b/i
        ]
    },
    {
        category: 'SERVICE_INQUIRY',
        label: 'Asked about ProfitMachines specific services or custom implementation',
        weight: 30,
        patterns: [
            /\b(profitmachines|profit machines|your agency|your team|your service|your company)\b/i,
            /\b(do you (offer|build|implement|do this for clients|handle|support))\b/i,
            /\b(can you build this for (us|me|our company)|can your system integrate)\b/i,
            /\b(looking for an agency|looking for someone to build|outsource this)\b/i
        ]
    },
    {
        category: 'BUSINESS_PAIN_POINT',
        label: 'Described specific business pain points or revenue leakage',
        weight: 25,
        patterns: [
            /\b(our (company|startup|saas|b2b|pipeline|sales team|funnel|lead gen|conversion rate))\b/i,
            /\b(we are struggling with|struggling to scale|need help with|stuck at)\b/i,
            /\b(our revenue|inbound leads|lead generation is dry|outbound isn't working)\b/i,
            /\b(enterprise architecture|crm integration|hubspot|salesforce|airtable)\b/i
        ]
    }
];

// Disqualifier patterns (casual praise, memes, viewer questions that lack commercial intent)
const DISQUALIFIER_PATTERNS: RegExp[] = [
    /^(great video|nice video|good video|awesome video|love this|amazing content|thanks|thank you|first|sub(bed|scriber)?|nice one|fire|cool|good job)[\.!\s]*$/i,
    /^(bro|bro please|first comment|pinned|pin me|best channel)[\.!\s]*$/i,
    /\b(crypto|whatsapp \+\d|telegram @|invest with Mr|whatsapp me)\b/i // spam detection
];

/**
 * Analyzes a YouTube comment to determine if it represents a potential business lead.
 */
export function analyzeCommentForLead(comment: YouTubeCommentData): FlaggedPotentialLead | null {
    const text = (comment.commentText || '').trim();
    if (text.length < 5) return null;

    // Check disqualifiers
    for (const dis of DISQUALIFIER_PATTERNS) {
        if (dis.test(text)) {
            return null;
        }
    }

    let totalScore = 0;
    const matchedReasons: string[] = [];
    let primaryCategory: FlaggedPotentialLead['leadCategory'] = 'SERVICE_INQUIRY';
    let highestWeight = 0;

    for (const rule of INTENT_PATTERNS) {
        for (const pattern of rule.patterns) {
            if (pattern.test(text)) {
                totalScore += rule.weight;
                matchedReasons.push(rule.label);
                if (rule.weight > highestWeight) {
                    highestWeight = rule.weight;
                    primaryCategory = rule.category;
                }
                break; // count each category once
            }
        }
    }

    // Minimum qualification threshold: score >= 25
    if (totalScore < 25 || matchedReasons.length === 0) {
        return null;
    }

    const uniqueReasons = Array.from(new Set(matchedReasons));
    const reasonText = uniqueReasons.join('; ');
    const nowIso = new Date().toISOString();

    return {
        leadRecordId: `YT-LEAD-${comment.commentId.slice(0, 16)}`,
        videoId: comment.videoId,
        videoTitle: comment.videoTitle,
        commentId: comment.commentId,
        commentText: text,
        authorDisplayName: comment.authorDisplayName,
        authorChannelId: comment.authorChannelId,
        authorChannelUrl: comment.authorChannelUrl,
        commentUrl: comment.commentUrl,
        commentDate: comment.publishedAt,
        reasonFlagged: reasonText,
        leadCategory: primaryCategory,
        confidenceScore: Math.min(totalScore, 100),
        reviewStatus: 'Potential Lead - Needs Review',
        contactedStatus: 'Not Contacted',
        createdAt: nowIso,
        updatedAt: nowIso
    };
}
