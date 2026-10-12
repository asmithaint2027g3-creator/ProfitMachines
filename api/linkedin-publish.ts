import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * api/linkedin-publish.ts
 * Enterprise LinkedIn Company Page Publishing Endpoint for ProfitMachines
 *
 * Publishes posts EXCLUSIVELY to the official ProfitMachines Company Page
 * (author: urn:li:organization:${LINKEDIN_ORG_ID}) via the official LinkedIn REST API.
 * Never publishes from personal profiles.
 *
 * GET  /api/linkedin-publish -> Diagnostic check for LinkedIn credentials & Organization access
 * POST /api/linkedin-publish -> Publish approved post to LinkedIn Company Page
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const orgId = (process.env.LINKEDIN_ORG_ID || '').trim();
    const rawToken = process.env.LINKEDIN_ACCESS_TOKEN || '';
    const accessToken = rawToken.trim().replace(/^["']|["']$/g, '');

    // ── GET: Diagnostics & Credentials Check ─────────────────────────────────
    if (req.method === 'GET') {
        const hasOrgId = Boolean(orgId);
        const hasToken = Boolean(accessToken && accessToken.length > 20);

        const diagnosticResponse = {
            configured: hasOrgId && hasToken,
            organizationId: hasOrgId ? orgId : 'MISSING',
            organizationUrn: hasOrgId ? `urn:li:organization:${orgId}` : 'MISSING',
            tokenStatus: hasToken ? `CONFIGURED (${accessToken.slice(0, 8)}...${accessToken.slice(-4)})` : 'MISSING',
            publishingIdentity: 'ProfitMachines LinkedIn Company Page (Organization Only)',
            personalProfilePublishing: 'DISABLED (Strict Organization-Only Mode)',
            requiredScopes: ['w_organization_social', 'r_organization_social'],
            instructions: [
                '1. Go to https://developer.linkedin.com and select your ProfitMachines Developer App.',
                '2. Ensure the "Community Management API" or "Share on LinkedIn" product is approved.',
                '3. Verify your LinkedIn user account is a Super Admin or Content Admin of the ProfitMachines Company Page.',
                '4. Obtain an OAuth 2.0 Access Token with the "w_organization_social" scope.',
                '5. In your LinkedIn Company Page admin URL (e.g. https://www.linkedin.com/company/12345678/admin/), find your numerical Organization ID.',
                '6. Set LINKEDIN_ORG_ID and LINKEDIN_ACCESS_TOKEN in your Vercel Environment Variables.'
            ]
        };

        // If credentials are present, optionally ping LinkedIn API to verify token validity
        if (hasOrgId && hasToken) {
            try {
                const testRes = await fetch(`https://api.linkedin.com/v2/organizations/${orgId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'X-Restli-Protocol-Version': '2.0.0'
                    }
                });
                return res.status(200).json({
                    ...diagnosticResponse,
                    tokenVerified: testRes.ok,
                    apiStatus: testRes.status,
                    apiMessage: testRes.ok ? 'Successfully connected to ProfitMachines Company Page' : 'Token expired or organization permissions pending'
                });
            } catch (err: any) {
                return res.status(200).json({
                    ...diagnosticResponse,
                    tokenVerified: false,
                    apiError: err.message
                });
            }
        }

        return res.status(200).json(diagnosticResponse);
    }

    // ── POST: Publish Approved Post to Company Page ──────────────────────────
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use GET or POST.' });
    }

    const { postId, fullPostText, title, targetUrl, campaignSlug } = req.body || {};

    if (!fullPostText) {
        return res.status(400).json({ error: 'Missing required field: fullPostText' });
    }

    // Guard: Validate credentials before attempting API call
    if (!orgId || !accessToken) {
        const missing: string[] = [];
        if (!orgId) missing.push('LINKEDIN_ORG_ID');
        if (!accessToken) missing.push('LINKEDIN_ACCESS_TOKEN');

        return res.status(400).json({
            success: false,
            error: 'MISSING_LINKEDIN_CREDENTIALS',
            message: `LinkedIn publishing requires server credentials: ${missing.join(', ')}. Please configure them in Vercel.`,
            missingFields: missing,
            manualPublishFallback: {
                ready: true,
                formattedText: fullPostText,
                targetUrl: targetUrl || 'https://profit-machines.vercel.app'
            }
        });
    }

    const authorUrn = `urn:li:organization:${orgId}`;

    // Structure LinkedIn ugcPosts Payload (official universal v2 publishing standard)
    const ugcPayload: any = {
        author: authorUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: fullPostText
                },
                shareMediaCategory: targetUrl ? 'ARTICLE' : 'NONE',
                ...(targetUrl ? {
                    media: [
                        {
                            status: 'READY',
                            description: {
                                text: 'ProfitMachines — Autonomous buyer intent, sales acceleration, and demand intelligence.'
                            },
                            originalUrl: targetUrl,
                            title: {
                                text: title || 'ProfitMachines — AI Revenue Transformation'
                            }
                        }
                    ]
                } : {})
            }
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
    };

    try {
        console.log(`[LinkedIn Publisher] Dispatching post for ${authorUrn} (Post ID: ${postId || 'custom'})...`);

        const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0'
            },
            body: JSON.stringify(ugcPayload)
        });

        const status = response.status;

        if (response.ok || status === 201) {
            const data: any = await response.json().catch(() => ({}));
            const postUrn = data.id || `urn:li:share:${Date.now()}`;

            console.log(`[LinkedIn Publisher] Post successfully published! URN: ${postUrn}`);

            return res.status(200).json({
                success: true,
                published: true,
                postId,
                postUrn,
                companyPageUrl: `https://www.linkedin.com/company/${orgId}/`,
                publishedAt: new Date().toISOString(),
                author: authorUrn,
                message: 'Successfully published post to ProfitMachines LinkedIn Company Page!'
            });
        }

        const errorBody = await response.text();
        console.error(`[LinkedIn Publisher] LinkedIn API rejected publication (${status}):`, errorBody);

        const isAuthorPermissionIssue = errorBody.includes('[/author]') || status === 403;

        return res.status(200).json({
            success: false,
            published: false,
            statusCode: status,
            error: isAuthorPermissionIssue ? 'ORGANIZATION_SCOPE_REQUIRED' : 'LINKEDIN_API_ERROR',
            details: errorBody,
            author: authorUrn,
            message: isAuthorPermissionIssue 
                ? 'Your access token has member scope (w_member_social). To publish under the Company Page, add "Community Management API" under the Products tab in LinkedIn Developers. In the meantime, use the 1-Click Copy button to post!'
                : `LinkedIn API returned: ${errorBody}`
        });
    } catch (err: any) {
        console.error('[LinkedIn Publisher] Network failure contacting LinkedIn API:', err);
        return res.status(500).json({
            success: false,
            published: false,
            error: 'NETWORK_ERROR',
            message: err.message
        });
    }
}
