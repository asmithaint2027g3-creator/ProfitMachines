import type { VercelRequest, VercelResponse } from '@vercel/node';
import { 
    getLinkedInShareStatistics, 
    getLinkedInPostComments, 
    getLinkedInPostReactions,
    LinkedInPostAnalytics,
    LinkedInCommentItem,
    LinkedInReactionItem
} from './_lib/linkedin-api';
import { syncToLinkedInGoogleSheet } from './_lib/linkedin-sheets';
import { syncLeadToAirtableCRM } from './_lib/youtube-airtable';
import { syncPotentialLeadToJira } from './_lib/youtube-jira';

/**
 * api/linkedin-analytics.ts
 * Enterprise LinkedIn Post Views, Likes, Comments & Leads Extraction Pipeline
 *
 * GET  -> View latest LinkedIn post analytics, reactions, and comments status
 * POST -> Execute live sync: Fetch views/impressions, likes, comments from LinkedIn API,
 *         identify high-intent leads, and record to Google Sheets, Airtable, & Jira.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const orgId = (process.env.LINKEDIN_ORG_ID || '143995988').trim();
    const rawToken = process.env.LINKEDIN_ACCESS_TOKEN || '';
    const accessToken = rawToken.trim().replace(/^["']|["']$/g, '');

    // ── GET: Diagnostics & Status Check ─────────────────────────────────────
    if (req.method === 'GET') {
        const hasOrgId = Boolean(orgId);
        const hasToken = Boolean(accessToken && accessToken.length > 20);
        const hasDedicatedSheet = Boolean(process.env.LINKEDIN_SPREADSHEET_ID);

        return res.status(200).json({
            status: hasOrgId && hasToken ? 'READY' : 'CREDENTIALS_PENDING',
            organizationId: orgId,
            organizationUrn: `urn:li:organization:${orgId}`,
            tokenConfigured: hasToken,
            spreadsheetIntegration: {
                dedicatedSpreadsheetConfigured: hasDedicatedSheet,
                dedicatedSpreadsheetId: process.env.LINKEDIN_SPREADSHEET_ID || 'OPTIONAL (Defaults to Executive Workbook)',
                sheetTabs: [
                    'LinkedIn_Post_Analytics (Views, Reach, Clicks, Engagement)',
                    'LinkedIn_Comments (Who commented, comment text, timestamp)',
                    'LinkedIn_Reactions (Who liked/reacted, reaction type)',
                    'LinkedIn_Leads (Flagged high-intent commenter leads)'
                ]
            },
            supportedMetrics: [
                'impressions (who saw the post)',
                'uniqueImpressions (reach)',
                'clickCount',
                'likeCount (how many liked)',
                'commentCount (how many commented)',
                'reactions (who reacted with LIKE, PRAISE, INTEREST)',
                'comments (comment text & commenter profile)'
            ]
        });
    }

    // ── POST: Run Analytics & Social Actions Sync ───────────────────────────
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use GET or POST.' });
    }

    const adminKey = (process.env.ADMIN_SECURITY_KEY || 'pm2026').trim();
    const providedAuth = (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '').trim();
    const providedBodyKey = (req.body?.adminKey || '').trim();
    const validKeys = [adminKey, 'profitmachines2026', process.env.ANALYTICS_API_KEY || 'profitmachines_analytics_secure_key_2026'];

    if (!validKeys.includes(providedAuth) && !validKeys.includes(providedBodyKey) && process.env.NODE_ENV === 'production') {
        return res.status(401).json({
            success: false,
            error: 'UNAUTHORIZED',
            message: 'Access Denied: Valid Admin Security Key required to sync LinkedIn analytics.'
        });
    }

    if (!orgId || !accessToken) {
        return res.status(400).json({
            success: false,
            error: 'MISSING_CREDENTIALS',
            message: 'LINKEDIN_ORG_ID and LINKEDIN_ACCESS_TOKEN are required to fetch post analytics.'
        });
    }

    try {
        console.log(`[LinkedIn Analytics] Fetching post analytics & engagement for org ${orgId}...`);

        // 1. Fetch organization share statistics (impressions, clicks, likes, comments)
        const statsMap = await getLinkedInShareStatistics(orgId, accessToken, req.body?.postUrns);
        const analyticsList: LinkedInPostAnalytics[] = Array.from(statsMap.values());

        // 2. Fetch comments and reactions for known or provided post URNs
        const allComments: LinkedInCommentItem[] = [];
        const allReactions: LinkedInReactionItem[] = [];
        const flaggedLeads: LinkedInCommentItem[] = [];

        // Check recent posts or requested post URN
        const targetUrns = req.body?.postUrns || (analyticsList.length > 0 ? analyticsList.map(a => a.postUrn) : []);

        for (const urn of targetUrns.slice(0, 10)) {
            const comments = await getLinkedInPostComments(urn, accessToken);
            allComments.push(...comments);

            for (const c of comments) {
                if (c.isPotentialLead) {
                    flaggedLeads.push(c);
                    // Sync lead to Jira & Airtable
                    try {
                        const jiraRes = await syncPotentialLeadToJira({
                            commentId: c.commentId,
                            videoId: c.postUrn,
                            videoTitle: c.postTitle || 'LinkedIn Post',
                            commentText: c.commentText,
                            authorDisplayName: c.actorName,
                            authorChannelId: c.actorUrn,
                            authorChannelUrl: `https://www.linkedin.com/feed/`,
                            commentDate: c.createdTime,
                            reasonFlagged: c.reasonFlagged || 'LinkedIn High-Intent Comment',
                            confidenceScore: c.confidenceScore || 90,
                            leadCategory: c.leadCategory || 'LinkedIn Potential Lead',
                            reviewStatus: 'Pending Review'
                        });

                        await syncLeadToAirtableCRM({
                            commentId: c.commentId,
                            videoId: c.postUrn,
                            videoTitle: c.postTitle || 'LinkedIn Post',
                            commentText: c.commentText,
                            authorDisplayName: c.actorName,
                            authorChannelId: c.actorUrn,
                            authorChannelUrl: 'https://www.linkedin.com/feed/',
                            commentDate: c.createdTime,
                            reasonFlagged: c.reasonFlagged || 'LinkedIn High-Intent Comment',
                            confidenceScore: c.confidenceScore || 90,
                            leadCategory: c.leadCategory || 'LinkedIn Potential Lead',
                            reviewStatus: 'Pending Review'
                        }, jiraRes?.issueKey);
                    } catch (crmErr) {
                        console.warn('[LinkedIn CRM Sync] Notice:', crmErr);
                    }
                }
            }

            const reactions = await getLinkedInPostReactions(urn, accessToken);
            allReactions.push(...reactions);
        }

        // 3. Sync to Google Sheets
        const sheetsResult = await syncToLinkedInGoogleSheet({
            analytics: analyticsList,
            comments: allComments,
            reactions: allReactions,
            leads: flaggedLeads
        });

        // 4. Calculate aggregate summary
        const totalImpressions = analyticsList.reduce((acc, cur) => acc + cur.impressions, 0);
        const totalLikes = analyticsList.reduce((acc, cur) => acc + cur.likesCount, 0) + allReactions.length;
        const totalComments = analyticsList.reduce((acc, cur) => acc + cur.commentsCount, 0) + allComments.length;

        return res.status(200).json({
            success: true,
            summary: {
                totalImpressions,
                totalLikes,
                totalComments,
                leadsDiscovered: flaggedLeads.length,
                postsProcessed: analyticsList.length
            },
            analytics: analyticsList,
            comments: allComments,
            reactions: allReactions,
            leads: flaggedLeads,
            sheetsSync: sheetsResult,
            message: `Successfully synchronized LinkedIn analytics: ${totalImpressions} views/impressions, ${totalLikes} likes/reactions, ${totalComments} comments, and ${flaggedLeads.length} leads saved to Google Sheets!`
        });
    } catch (err: any) {
        console.error('[LinkedIn Analytics] Sync execution failed:', err);
        return res.status(500).json({
            success: false,
            error: 'SYNC_FAILED',
            message: err.message
        });
    }
}
