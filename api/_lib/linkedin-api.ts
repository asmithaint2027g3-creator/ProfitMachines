/**
 * api/_lib/linkedin-api.ts
 * Enterprise LinkedIn REST API Client for Post Analytics, Comments & Reactions
 * Connects to ProfitMachines Company Page (urn:li:organization:${LINKEDIN_ORG_ID})
 */

export interface LinkedInPostAnalytics {
    postUrn: string;
    postId?: string;
    title?: string;
    impressions: number;
    uniqueImpressions: number;
    clicks: number;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
    engagementRate: number;
    lastSyncedAt: string;
}

export interface LinkedInCommentItem {
    commentId: string;
    postUrn: string;
    postTitle?: string;
    actorUrn: string;
    actorName: string;
    commentText: string;
    createdTime: string;
    likesCount: number;
    isPotentialLead: boolean;
    leadCategory?: string;
    confidenceScore?: number;
    reasonFlagged?: string;
}

export interface LinkedInReactionItem {
    reactionId: string;
    postUrn: string;
    postTitle?: string;
    actorUrn: string;
    actorName: string;
    reactionType: string; // 'LIKE', 'PRAISE', 'APPRECIATION', 'EMPATHY', 'INTEREST'
    createdTime: string;
}

/**
 * Fetches organization-level and post-level share statistics from LinkedIn REST API
 */
export async function getLinkedInShareStatistics(orgId: string, accessToken: string, shareUrns?: string[]): Promise<Map<string, LinkedInPostAnalytics>> {
    const statsMap = new Map<string, LinkedInPostAnalytics>();
    if (!orgId || !accessToken) return statsMap;

    try {
        let url = `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${orgId}`;
        if (shareUrns && shareUrns.length > 0) {
            shareUrns.slice(0, 10).forEach((urn, idx) => {
                url += `&shares[${idx}]=${encodeURIComponent(urn)}`;
            });
        }

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            console.warn('[LinkedIn Analytics] Share stats query notice:', res.status, await res.text());
            return statsMap;
        }

        const data: any = await res.json();
        const elements = data.elements || [];

        for (const el of elements) {
            const urn = el.share || el.organizationalEntity || `urn:li:share:${Date.now()}`;
            const stats = el.totalShareStatistics || {};
            const impressions = Number(stats.impressionCount || 0);
            const clicks = Number(stats.clickCount || 0);
            const likes = Number(stats.likeCount || 0);
            const comments = Number(stats.commentCount || 0);
            const shares = Number(stats.shareCount || 0);
            const uniqueImpressions = Number(stats.uniqueImpressionsCount || impressions);
            const engagement = Number(stats.engagement || 0);

            statsMap.set(urn, {
                postUrn: urn,
                impressions,
                uniqueImpressions,
                clicks,
                likesCount: likes,
                commentsCount: comments,
                sharesCount: shares,
                engagementRate: Math.round(engagement * 1000) / 10, // e.g. 12.5%
                lastSyncedAt: new Date().toISOString()
            });
        }
    } catch (err: any) {
        console.error('[LinkedIn Analytics] Error fetching share stats:', err.message);
    }

    return statsMap;
}

/**
 * Fetches public comments for a specific LinkedIn post URN
 */
export async function getLinkedInPostComments(postUrn: string, accessToken: string, postTitle?: string): Promise<LinkedInCommentItem[]> {
    const comments: LinkedInCommentItem[] = [];
    if (!postUrn || !accessToken) return comments;

    try {
        const cleanUrn = postUrn.trim();
        const url = `https://api.linkedin.com/v2/socialActions/${encodeURIComponent(cleanUrn)}/comments?count=50`;

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            console.warn('[LinkedIn Comments] Notice fetching comments for', cleanUrn, res.status);
            return comments;
        }

        const data: any = await res.json();
        const elements = data.elements || [];

        for (const el of elements) {
            const commentText = el.message?.text || '';
            const actorUrn = el.actor || '';
            const commentId = el['$URN'] || el.id || `li-comment-${Date.now()}`;
            const createdTime = el.created?.time ? new Date(el.created.time).toISOString() : new Date().toISOString();
            const likesCount = Number(el.likesSummary?.totalLikes || 0);

            // Lead intent detection
            const leadInfo = detectLinkedInLeadIntent(commentText);

            comments.push({
                commentId,
                postUrn: cleanUrn,
                postTitle: postTitle || 'LinkedIn Post',
                actorUrn,
                actorName: formatActorUrn(actorUrn),
                commentText,
                createdTime,
                likesCount,
                isPotentialLead: leadInfo.isLead,
                leadCategory: leadInfo.category,
                confidenceScore: leadInfo.confidence,
                reasonFlagged: leadInfo.reason
            });
        }
    } catch (err: any) {
        console.error('[LinkedIn Comments] Error:', err.message);
    }

    return comments;
}

/**
 * Fetches likes / reactions for a specific LinkedIn post URN
 */
export async function getLinkedInPostReactions(postUrn: string, accessToken: string, postTitle?: string): Promise<LinkedInReactionItem[]> {
    const reactions: LinkedInReactionItem[] = [];
    if (!postUrn || !accessToken) return reactions;

    try {
        const cleanUrn = postUrn.trim();
        const url = `https://api.linkedin.com/v2/socialActions/${encodeURIComponent(cleanUrn)}/likes?count=50`;

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            console.warn('[LinkedIn Reactions] Notice fetching likes for', cleanUrn, res.status);
            return reactions;
        }

        const data: any = await res.json();
        const elements = data.elements || [];

        for (const el of elements) {
            const actorUrn = el.actor || '';
            const reactionType = el.reactionType || 'LIKE';
            const reactionId = `li-react-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

            reactions.push({
                reactionId,
                postUrn: cleanUrn,
                postTitle: postTitle || 'LinkedIn Post',
                actorUrn,
                actorName: formatActorUrn(actorUrn),
                reactionType,
                createdTime: new Date().toISOString()
            });
        }
    } catch (err: any) {
        console.error('[LinkedIn Reactions] Error:', err.message);
    }

    return reactions;
}

/**
 * Formats a LinkedIn URN (e.g. urn:li:person:123456) into a readable display name
 */
function formatActorUrn(urn: string): string {
    if (!urn) return 'LinkedIn Member';
    const parts = urn.split(':');
    const id = parts[parts.length - 1];
    return `LinkedIn User (${id.slice(0, 8)})`;
}

/**
 * AI Intent Classifier for LinkedIn Comments
 */
export function detectLinkedInLeadIntent(text: string): {
    isLead: boolean;
    confidence: number;
    category: string;
    reason: string;
} {
    const lower = text.toLowerCase();

    if (/\b(pricing|how much|cost|rates|quote|fee|expensive|cheap|affordable)\b/i.test(lower)) {
        return {
            isLead: true,
            confidence: 94,
            category: 'Pricing Inquiry',
            reason: 'Inquired about service pricing/fees in LinkedIn comment'
        };
    }

    if (/\b(demo|show me|walkthrough|can you demo|try it|access|preview|sandbox)\b/i.test(lower)) {
        return {
            isLead: true,
            confidence: 96,
            category: 'Demo Request',
            reason: 'Requested product/engine demonstration in LinkedIn comment'
        };
    }

    if (/\b(consult|call|talk|meeting|chat|discuss|schedule|book|calendar|zoom)\b/i.test(lower)) {
        return {
            isLead: true,
            confidence: 92,
            category: 'Consultation Request',
            reason: 'Requested consultation or meeting in LinkedIn comment'
        };
    }

    if (/\b(dm me|sent a dm|connect|reach out|my email|email me|contact me|interested)\b/i.test(lower)) {
        return {
            isLead: true,
            confidence: 90,
            category: 'High-Intent Outreach',
            reason: 'Direct contact request or expressed active interest in comment'
        };
    }

    if (/\b(need this|we struggle with|have this problem|looking for a solution|can this help)\b/i.test(lower)) {
        return {
            isLead: true,
            confidence: 88,
            category: 'Business Pain Point',
            reason: 'Stated specific business problem or workflow pain in comment'
        };
    }

    return {
        isLead: false,
        confidence: 0,
        category: 'General Comment',
        reason: 'General feedback or commentary'
    };
}
