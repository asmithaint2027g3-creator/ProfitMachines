/**
 * api/_lib/youtube.ts
 * Enterprise YouTube Data API v3 and YouTube Analytics API client
 * Handles OAuth2 token refresh, video metrics, comments ingestion, quota protection,
 * and graceful handling of disabled comments / unavailable analytics.
 */

export interface YouTubeVideoData {
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
}

export interface YouTubeCommentData {
    commentId: string;
    videoId: string;
    videoTitle: string;
    commentText: string;
    authorDisplayName: string;
    authorChannelId: string;
    authorChannelUrl: string;
    publishedAt: string;
    commentUrl: string;
    likeCount: number;
}

export interface YouTubeApiConfig {
    apiKey?: string;
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
    channelId?: string;
}

// In-memory token cache to prevent redundant token exchanges
let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

/**
 * Obtains a fresh OAuth2 access token using the stored refresh token.
 */
export async function getYouTubeAccessToken(config?: YouTubeApiConfig): Promise<string | null> {
    const clientId = config?.clientId || process.env.YOUTUBE_CLIENT_ID;
    const clientSecret = config?.clientSecret || process.env.YOUTUBE_CLIENT_SECRET;
    const refreshToken = config?.refreshToken || process.env.YOUTUBE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        return null;
    }

    if (cachedAccessToken && Date.now() < tokenExpiresAt - 60000) {
        return cachedAccessToken;
    }

    try {
        const res = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            })
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('[YouTube OAuth] Failed to refresh access token:', err);
            return null;
        }

        const data: any = await res.json();
        cachedAccessToken = data.access_token;
        tokenExpiresAt = Date.now() + ((data.expires_in || 3600) * 1000);
        return cachedAccessToken;
    } catch (error: any) {
        console.error('[YouTube OAuth] Network error refreshing access token:', error);
        return null;
    }
}

/**
 * Builds request headers with either Bearer authorization or API key parameter.
 */
async function buildYouTubeRequest(url: string, config?: YouTubeApiConfig): Promise<{ url: string; headers: Record<string, string> }> {
    const accessToken = await getYouTubeAccessToken(config);
    const apiKey = config?.apiKey || process.env.YOUTUBE_API_KEY;

    if (accessToken) {
        return {
            url,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        };
    }

    if (apiKey) {
        const separator = url.includes('?') ? '&' : '?';
        return {
            url: `${url}${separator}key=${apiKey}`,
            headers: { 'Accept': 'application/json' }
        };
    }

    throw new Error('No YouTube credentials found. Please set YOUTUBE_REFRESH_TOKEN (OAuth) or YOUTUBE_API_KEY in environment variables.');
}

/**
 * Retrieves the Uploads playlist ID for the channel.
 * Uses channels.list with part=contentDetails (only 1 quota unit, highly efficient).
 */
export async function getChannelUploadPlaylistId(channelId?: string, config?: YouTubeApiConfig): Promise<{ playlistId: string; channelTitle: string } | null> {
    const targetChannelId = channelId || config?.channelId || process.env.YOUTUBE_CHANNEL_ID;
    const req = await buildYouTubeRequest(
        targetChannelId 
            ? `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&id=${targetChannelId}`
            : 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&mine=true',
        config
    );

    const res = await fetch(req.url, { headers: req.headers });
    if (!res.ok) {
        const err = await res.text();
        console.error('[YouTube] channels.list error:', res.status, err);
        return null;
    }

    const data: any = await res.json();
    if (!data.items || data.items.length === 0) {
        if (targetChannelId && targetChannelId.startsWith('UC')) {
            const fallbackPlaylistId = 'UU' + targetChannelId.slice(2);
            console.log(`[YouTube] Fallback uploads playlist for ${targetChannelId}: ${fallbackPlaylistId}`);
            return {
                playlistId: fallbackPlaylistId,
                channelTitle: 'ProfitMachines YouTube Channel'
            };
        }
        return null;
    }

    const item = data.items[0];
    const playlistId = item.contentDetails?.relatedPlaylists?.uploads || (targetChannelId?.startsWith('UC') ? 'UU' + targetChannelId.slice(2) : null);
    return {
        playlistId: playlistId || (targetChannelId?.startsWith('UC') ? 'UU' + targetChannelId.slice(2) : ''),
        channelTitle: item.snippet?.title || 'ProfitMachines'
    };
}

/**
 * Retrieves video IDs and snippet details from the channel's uploads playlist.
 */
export async function getChannelVideos(maxVideos = 50, config?: YouTubeApiConfig): Promise<YouTubeVideoData[]> {
    const uploadInfo = await getChannelUploadPlaylistId(undefined, config);
    if (!uploadInfo || !uploadInfo.playlistId) {
        console.warn('[YouTube] Could not resolve uploads playlist for channel.');
        return [];
    }

    // 1. Fetch playlist items (uploads playlist)
    const playlistReq = await buildYouTubeRequest(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadInfo.playlistId}&maxResults=${Math.min(maxVideos, 50)}`,
        config
    );

    const plRes = await fetch(playlistReq.url, { headers: playlistReq.headers });
    if (!plRes.ok) {
        const err = await plRes.text();
        console.error('[YouTube] playlistItems.list error:', plRes.status, err);
        return [];
    }

    const plData: any = await plRes.json();
    const videoItems = plData.items || [];
    if (videoItems.length === 0) return [];

    const videoIds = videoItems.map((item: any) => item.contentDetails?.videoId || item.snippet?.resourceId?.videoId).filter(Boolean);

    // 2. Fetch full video statistics (views, likes, comments count)
    const statsReq = await buildYouTubeRequest(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(',')}`,
        config
    );

    const statsRes = await fetch(statsReq.url, { headers: statsReq.headers });
    if (!statsRes.ok) {
        const err = await statsRes.text();
        console.error('[YouTube] videos.list error:', statsRes.status, err);
        return [];
    }

    const statsData: any = await statsRes.json();
    const statsMap = new Map<string, any>();
    for (const v of statsData.items || []) {
        statsMap.set(v.id, v);
    }

    // 3. Optional: YouTube Analytics API for channel-owner watch time and subscriber stats
    const analyticsMap = await getChannelVideoAnalytics(videoIds, config);

    return videoItems.map((item: any): YouTubeVideoData => {
        const vidId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
        const detail = statsMap.get(vidId);
        const stats = detail?.statistics || {};
        const snippet = detail?.snippet || item.snippet || {};
        const analytics = analyticsMap.get(vidId);

        return {
            videoId: vidId,
            title: snippet.title || 'Untitled Video',
            url: `https://www.youtube.com/watch?v=${vidId}`,
            publishedAt: snippet.publishedAt || item.snippet?.publishedAt || '',
            views: parseInt(stats.viewCount || '0', 10),
            likes: parseInt(stats.likeCount || '0', 10),
            commentsCount: parseInt(stats.commentCount || '0', 10),
            watchTimeMinutes: analytics?.watchTimeMinutes,
            averageViewDurationSeconds: analytics?.averageViewDurationSeconds,
            subscribersGained: analytics?.subscribersGained,
            commentsDisabled: stats.commentCount === undefined && detail !== undefined
        };
    });
}

/**
 * Queries YouTube Analytics API for authorized channel owner video analytics.
 */
async function getChannelVideoAnalytics(videoIds: string[], config?: YouTubeApiConfig): Promise<Map<string, { watchTimeMinutes: number; averageViewDurationSeconds: number; subscribersGained: number }>> {
    const result = new Map<string, { watchTimeMinutes: number; averageViewDurationSeconds: number; subscribersGained: number }>();
    const accessToken = await getYouTubeAccessToken(config);
    if (!accessToken) {
        return result; // Analytics API requires authorized OAuth token
    }

    try {
        const now = new Date();
        const endDate = now.toISOString().slice(0, 10);
        const startDate = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10); // Last 90 days

        const url = `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&startDate=${startDate}&endDate=${endDate}&metrics=estimatedMinutesWatched,averageViewDuration,subscribersGained&dimensions=video&filters=video==${videoIds.join(',')}`;

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });

        if (res.ok) {
            const data: any = await res.json();
            if (data.rows && Array.isArray(data.rows)) {
                for (const row of data.rows) {
                    const [vidId, watchMins, avgDuration, subsGained] = row;
                    result.set(vidId, {
                        watchTimeMinutes: Math.round(Number(watchMins) || 0),
                        averageViewDurationSeconds: Math.round(Number(avgDuration) || 0),
                        subscribersGained: Number(subsGained) || 0
                    });
                }
            }
        } else {
            console.warn('[YouTube Analytics API] Analytics report unavailable or not authorized:', res.status);
        }
    } catch (err) {
        console.warn('[YouTube Analytics API] Fetch error:', err);
    }

    return result;
}

/**
 * Retrieves public comments for a specific video.
 * Handles disabled comments and API pagination gracefully.
 */
export async function getVideoComments(videoId: string, videoTitle: string, maxResults = 100, config?: YouTubeApiConfig): Promise<YouTubeCommentData[]> {
    const comments: YouTubeCommentData[] = [];
    let pageToken: string | undefined = undefined;

    try {
        do {
            const baseUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=${Math.min(maxResults, 100)}&textFormat=plainText${pageToken ? `&pageToken=${pageToken}` : ''}`;
            const req = await buildYouTubeRequest(baseUrl, config);

            const res = await fetch(req.url, { headers: req.headers });
            if (!res.ok) {
                if (res.status === 403) {
                    const errText = await res.text();
                    if (errText.includes('commentsDisabled')) {
                        console.log(`[YouTube] Comments are disabled for video: ${videoId}`);
                        return [];
                    }
                    console.warn(`[YouTube] Comments API access forbidden (quota or permissions): ${errText}`);
                }
                break;
            }

            const data: any = await res.json();
            const items = data.items || [];

            for (const item of items) {
                const topComment = item.snippet?.topLevelComment?.snippet;
                if (!topComment) continue;

                const commentId = item.id;
                const authorChannelId = topComment.authorChannelId?.value || '';

                comments.push({
                    commentId,
                    videoId,
                    videoTitle,
                    commentText: topComment.textDisplay || topComment.textOriginal || '',
                    authorDisplayName: topComment.authorDisplayName || 'Public Viewer',
                    authorChannelId,
                    authorChannelUrl: topComment.authorChannelUrl || (authorChannelId ? `https://www.youtube.com/channel/${authorChannelId}` : ''),
                    publishedAt: topComment.publishedAt || '',
                    commentUrl: `https://www.youtube.com/watch?v=${videoId}&lc=${commentId}`,
                    likeCount: topComment.likeCount || 0
                });
            }

            pageToken = data.nextPageToken;
        } while (pageToken && comments.length < maxResults);
    } catch (error: any) {
        console.error(`[YouTube] Failed to fetch comments for video ${videoId}:`, error.message);
    }

    return comments;
}

/**
 * Retrieves details for a specific single YouTube video by ID or URL.
 */
export async function getSingleVideoData(videoIdOrUrl: string, config?: YouTubeApiConfig): Promise<YouTubeVideoData | null> {
    const videoId = videoIdOrUrl.replace(/^.*(?:youtu\.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/, '$1').trim();
    if (!videoId) return null;

    try {
        const req = await buildYouTubeRequest(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}`,
            config
        );
        const res = await fetch(req.url, { headers: req.headers });
        if (!res.ok) {
            console.error('[YouTube] Failed to get single video details:', res.status, await res.text());
            return null;
        }

        const data: any = await res.json();
        if (!data.items || data.items.length === 0) return null;

        const item = data.items[0];
        const stats = item.statistics || {};
        return {
            videoId: item.id,
            title: item.snippet?.title || 'YouTube Video',
            url: `https://www.youtube.com/watch?v=${item.id}`,
            publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
            views: Number(stats.viewCount || 0),
            likes: Number(stats.likeCount || 0),
            commentsCount: Number(stats.commentCount || 0),
            commentsDisabled: stats.commentCount === undefined
        };
    } catch (err: any) {
        console.error('[YouTube] Single video fetch error:', err.message);
        return null;
    }
}

export interface PublishVideoInput {
    title: string;
    description: string;
    tags?: string[];
    privacyStatus?: 'public' | 'unlisted' | 'private';
    publishAt?: string;
    categoryId?: string;
    fileSize?: number;
    mimeType?: string;
}

/**
 * Initiates a YouTube Resumable Upload session or prepares video publication metadata.
 * Uses OAuth2 channel owner access token.
 */
export async function createYouTubeVideoPublishSession(params: PublishVideoInput, config?: YouTubeApiConfig): Promise<{
    success: boolean;
    uploadUrl?: string;
    videoId?: string;
    error?: string;
    message: string;
}> {
    const token = await getYouTubeAccessToken(config);
    if (!token) {
        return {
            success: false,
            error: 'OAUTH_REQUIRED',
            message: 'Publishing directly to YouTube requires an active OAuth 2.0 refresh token with upload scope. Please configure YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, and YOUTUBE_REFRESH_TOKEN.'
        };
    }

    const payload = {
        snippet: {
            title: params.title.trim(),
            description: params.description.trim(),
            tags: params.tags && params.tags.length > 0 ? params.tags : ['ProfitMachines', 'B2B', 'AI'],
            categoryId: params.categoryId || '28' // 28 = Science & Technology
        },
        status: {
            privacyStatus: params.privacyStatus || 'unlisted',
            selfDeclaredMadeForKids: false,
            ...(params.publishAt && params.privacyStatus === 'private' ? { publishAt: params.publishAt } : {})
        }
    };

    try {
        const uploadRes = await fetch(
            'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                    'X-Upload-Content-Type': params.mimeType || 'video/*',
                    ...(params.fileSize ? { 'X-Upload-Content-Length': String(params.fileSize) } : {})
                },
                body: JSON.stringify(payload)
            }
        );

        if (uploadRes.status === 200 || uploadRes.status === 201) {
            // Google Resumable Upload session established
            const uploadUrl = uploadRes.headers.get('location') || uploadRes.headers.get('Location') || '';
            return {
                success: true,
                uploadUrl,
                message: 'YouTube resumable upload session created. Video can be uploaded directly to channel.'
            };
        } else {
            const errText = await uploadRes.text();
            console.error('[YouTube Upload Session] Failed:', uploadRes.status, errText);
            return {
                success: false,
                error: `YOUTUBE_API_ERROR_${uploadRes.status}`,
                message: `YouTube rejected upload initiation (${uploadRes.status}): ${errText}`
            };
        }
    } catch (err: any) {
        console.error('[YouTube Upload Session] Network error:', err);
        return {
            success: false,
            error: 'NETWORK_ERROR',
            message: err.message
        };
    }
}
