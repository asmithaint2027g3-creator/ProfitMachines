import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SecurityController } from './_lib/security.ts';

/**
 * api/linkedin-publish.ts
 * Enterprise LinkedIn Post Publishing Engine (Universal: Text, Links & Images)
 * Publishes from Google Sheets or Admin Studio to LinkedIn Company Page / Profile
 *
 * GET  /api/linkedin-publish -> Diagnostic check for LinkedIn credentials & Organization access
 * POST /api/linkedin-publish -> Publish post (Text, Rich Link Preview, or Uploaded Image)
 */

async function uploadLinkedInImage(imageUrl: string, authorUrn: string, accessToken: string): Promise<string | null> {
    try {
        const imgRes = await fetch(imageUrl);
        if (!imgRes.ok) return null;
        const arrayBuffer = await imgRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const registerRes = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0'
            },
            body: JSON.stringify({
                registerUploadRequest: {
                    recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
                    owner: authorUrn,
                    serviceRelationships: [
                        {
                            relationshipType: 'OWNER',
                            identifier: 'urn:li:userGeneratedContent'
                        }
                    ]
                }
            })
        });

        if (!registerRes.ok) {
            console.warn('[LinkedIn Image Upload] Register failed:', registerRes.status);
            return null;
        }

        const regData: any = await registerRes.json();
        const uploadUrl = regData.value?.uploadMechanism?.['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest']?.uploadUrl;
        const assetUrn = regData.value?.asset;

        if (!uploadUrl || !assetUrn) return null;

        const uploadRes = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'image/jpeg'
            },
            body: buffer
        });

        if (uploadRes.ok || uploadRes.status === 201) {
            return assetUrn;
        }
    } catch (err: any) {
        console.warn('[LinkedIn Image Upload] Notice:', err.message);
    }
    return null;
}

async function getAuthenticatedUserUrn(accessToken: string): Promise<string | null> {
    try {
        const res = await fetch('https://api.linkedin.com/v2/userinfo', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        if (res.ok) {
            const data: any = await res.json();
            if (data.sub) return `urn:li:person:${data.sub}`;
        }
    } catch (e) {}

    try {
        const res = await fetch('https://api.linkedin.com/v2/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0'
            }
        });
        if (res.ok) {
            const data: any = await res.json();
            if (data.id) return `urn:li:person:${data.id}`;
        }
    } catch (e) {}

    return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const isAuthorized = await SecurityController.enforcePrivate(req, res, {
        allowedMethods: ['GET', 'POST'],
        requiredScope: 'automation:linkedin',
        allowSafeDiagnosticsOnGet: true,
        actionName: 'linkedin:publish',
    });
    if (!isAuthorized) return;

    const orgId = (process.env.LINKEDIN_ORG_ID || '143995988').trim();
    const rawToken = process.env.LINKEDIN_ACCESS_TOKEN || '';
    const accessToken = rawToken.trim().replace(/^["']|["']$/g, '');

    // ── GET: Diagnostics & Credentials Check ─────────────────────────────────
    if (req.method === 'GET') {
        const hasOrgId = Boolean(orgId);
        const hasToken = Boolean(accessToken && accessToken.length > 20);

        let personUrn: string | null = null;
        let tokenVerified = false;
        let apiStatus = 401;

        if (hasToken) {
            personUrn = await getAuthenticatedUserUrn(accessToken);
            tokenVerified = Boolean(personUrn);
            apiStatus = tokenVerified ? 200 : 403;
        }

        return res.status(200).json({
            configured: hasOrgId && hasToken,
            organizationId: orgId,
            organizationUrn: `urn:li:organization:${orgId}`,
            tokenStatus: hasToken ? `CONFIGURED (${accessToken.slice(0, 8)}...${accessToken.slice(-4)})` : 'MISSING',
            authenticatedPersonUrn: personUrn || 'NOT_DETECTED',
            tokenVerified,
            apiStatus,
            security: SecurityController.getDiagnosticStatus(),
            capabilities: ['Text Posts', 'Rich Link Previews', 'Image Uploads (image_url)', 'Auto-Author Fallback (Company or Person)']
        });
    }

    // ── POST: Publish Post to LinkedIn ───────────────────────────────────────
    const { postId, fullPostText, title, targetUrl, imageUrl, author: requestedAuthor } = req.body || {};

    if (!fullPostText) {
        return res.status(400).json({ error: 'Missing required field: fullPostText' });
    }

    if (!accessToken) {
        return res.status(400).json({
            success: false,
            error: 'MISSING_LINKEDIN_CREDENTIALS',
            message: 'LinkedIn publishing requires LINKEDIN_ACCESS_TOKEN. Please configure it in Vercel.'
        });
    }

    // Determine target author URN (organization or personal profile)
    let authorUrn = `urn:li:organization:${orgId}`;
    if (requestedAuthor && String(requestedAuthor).startsWith('urn:li:')) {
        authorUrn = String(requestedAuthor).trim();
    } else if (requestedAuthor && String(requestedAuthor).toUpperCase() === 'PERSONAL') {
        const pUrn = await getAuthenticatedUserUrn(accessToken);
        if (pUrn) authorUrn = pUrn;
    }

    try {
        // Build media content: check for uploaded image first
        let shareMediaCategory = 'NONE';
        let mediaArray: any[] = [];

        if (imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
            console.log(`[LinkedIn Publisher] Uploading image asset from ${imageUrl}...`);
            const assetUrn = await uploadLinkedInImage(imageUrl, authorUrn, accessToken);
            if (assetUrn) {
                shareMediaCategory = 'IMAGE';
                mediaArray = [
                    {
                        status: 'READY',
                        description: { text: title || 'ProfitMachines Strategy Insight' },
                        media: assetUrn,
                        title: { text: title || 'ProfitMachines' }
                    }
                ];
            }
        }

        // If no image uploaded but targetUrl provided, use ARTICLE link preview
        if (shareMediaCategory === 'NONE' && targetUrl) {
            shareMediaCategory = 'ARTICLE';
            mediaArray = [
                {
                    status: 'READY',
                    description: { text: 'ProfitMachines — Autonomous buyer intent, sales acceleration, and demand intelligence.' },
                    originalUrl: targetUrl,
                    title: { text: title || 'ProfitMachines — AI Revenue Transformation' }
                }
            ];
        }

        const buildUgcPayload = (currentAuthor: string) => ({
            author: currentAuthor,
            lifecycleState: 'PUBLISHED',
            specificContent: {
                'com.linkedin.ugc.ShareContent': {
                    shareCommentary: {
                        text: fullPostText
                    },
                    shareMediaCategory,
                    ...(mediaArray.length > 0 ? { media: mediaArray } : {})
                }
            },
            visibility: {
                'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
            }
        });

        console.log(`[LinkedIn Publisher] Dispatching post for ${authorUrn}...`);

        let response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0'
            },
            body: JSON.stringify(buildUgcPayload(authorUrn))
        });

        let status = response.status;
        let responseBody = await response.text();

        // Auto-Fallback: If organization publishing failed with 403 on [/author], try personal profile
        if (!response.ok && status === 403 && authorUrn.startsWith('urn:li:organization')) {
            console.log('[LinkedIn Publisher] Organization posting failed 403. Attempting personal profile fallback...');
            const fallbackPerson = await getAuthenticatedUserUrn(accessToken);
            if (fallbackPerson) {
                authorUrn = fallbackPerson;
                console.log(`[LinkedIn Publisher] Retrying publication under authenticated member profile: ${authorUrn}`);
                response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        'X-Restli-Protocol-Version': '2.0.0'
                    },
                    body: JSON.stringify(buildUgcPayload(authorUrn))
                });
                status = response.status;
                responseBody = await response.text();
            }
        }

        if (response.ok || status === 201) {
            let data: any = {};
            try { data = JSON.parse(responseBody); } catch (e) {}
            const postUrn = data.id || `urn:li:share:${Date.now()}`;
            const publishedAt = new Date().toISOString();

            console.log(`[LinkedIn Publisher] Post successfully published! URN: ${postUrn}`);

            // Automatically sync back to Google Sheets via Apps Script Webhook
            try {
                const scriptUrl = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbxnpkQyIM_BYBc9mdR8SskAbzb74v8idiwUMbzLuqKlCGRExzNkwRLloL63KQ-uhRqCYA/exec";
                await fetch(scriptUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'sync_linkedin_post',
                        event_type: 'linkedin_post',
                        post: {
                            post_id: postId,
                            title: title || 'LinkedIn Post',
                            status: 'PUBLISHED',
                            body: fullPostText,
                            target_url: targetUrl || 'https://profit-machines.vercel.app',
                            linkedin_urn: postUrn,
                            published_at: publishedAt,
                            author: authorUrn
                        }
                    })
                }).catch(() => {});
            } catch (sheetSyncErr) {
                console.warn('[LinkedIn Publisher] Notice syncing to Google Sheet:', sheetSyncErr);
            }

            return res.status(200).json({
                success: true,
                published: true,
                postId,
                postUrn,
                publishedAt,
                author: authorUrn,
                mediaType: shareMediaCategory,
                message: `Successfully published to LinkedIn (${authorUrn})!`
            });
        }

        console.error(`[LinkedIn Publisher] LinkedIn API rejected (${status}):`, responseBody);

        return res.status(200).json({
            success: false,
            published: false,
            statusCode: status,
            error: 'LINKEDIN_PUBLISH_FAILED',
            details: responseBody,
            author: authorUrn,
            message: `LinkedIn API error (${status}): ${responseBody}`
        });

    } catch (err: any) {
        console.error('[LinkedIn Publisher] Exception:', err);
        return res.status(500).json({
            success: false,
            published: false,
            error: 'PUBLISH_EXCEPTION',
            message: err.message
        });
    }
}
