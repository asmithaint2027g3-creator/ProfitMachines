import type { VercelRequest, VercelResponse } from '@vercel/node';

interface IncomingChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface ChatRequestBody {
    message: string;
    pageContext?: {
        route?: string;
        title?: string;
        mainHeading?: string;
        summary?: string;
        pageType?: string;
        parentIndustry?: string;
        selectedVertical?: string;
        relevantOffering?: string;
    };
    groundedContext?: string;
    history?: IncomingChatMessage[];
}

// Simple in-memory sliding window rate limiter
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const clientRecord = ipRequestCounts.get(ip);

    if (!clientRecord || now > clientRecord.resetTime) {
        ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return true;
    }

    if (clientRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        return false;
    }

    clientRecord.count += 1;
    return true;
}

// Clean up stale IP records periodically
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [ip, record] of ipRequestCounts.entries()) {
            if (now > record.resetTime) {
                ipRequestCounts.delete(ip);
            }
        }
    }, 5 * 60 * 1000);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // 1. CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    // 2. Rate Limiting by IP
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 
                     req.socket?.remoteAddress || 
                     'anonymous';

    if (!checkRateLimit(clientIp)) {
        return res.status(429).json({
            error: 'Too many requests. Please wait a moment before sending another message.',
            retryAfter: 60
        });
    }

    // 3. Request Validation & Sanitization
    const body = (req.body || {}) as ChatRequestBody;
    const userMessage = typeof body.message === 'string' ? body.message.trim() : '';

    if (!userMessage) {
        return res.status(400).json({ error: 'Missing or empty message parameter.' });
    }

    if (userMessage.length > 1500) {
        return res.status(400).json({ error: 'Message exceeds the maximum limit of 1,500 characters.' });
    }

    const pageContext = body.pageContext || {};
    const groundedContext = typeof body.groundedContext === 'string' ? body.groundedContext.slice(0, 4000) : '';
    const rawHistory = Array.isArray(body.history) ? body.history : [];
    
    // Sanitize and cap conversation history to the last 8 turns
    const history = rawHistory
        .filter(m => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
        .slice(-8)
        .map(m => ({
            role: m.role,
            content: m.content.slice(0, 1000)
        }));

    // 4. Construct System Prompt with Grounded Domain Knowledge
    const systemInstruction = `You are Pooja, the Senior Digital Success Director and Executive AI Assistant for ProfitMachines (https://profitmachines.ai).
ProfitMachines is an enterprise autonomous revenue infrastructure and growth intelligence firm helping B2B enterprises, technology companies, and high-growth businesses eliminate pipeline leakage, deploy autonomous SDR swarms, sense dark-funnel buying signals (via DemandPulse AI™), and discover hidden profit pools.

CURRENT VISITOR CONTEXT:
- Active Page: ${pageContext.route || '/'}
- Page Title: ${pageContext.title || 'ProfitMachines Autonomous Revenue OS'}
- Page Category: ${pageContext.pageType || 'general'}
- Selected Vertical: ${pageContext.selectedVertical || 'None'}
- Parent Industry: ${pageContext.parentIndustry || 'None'}
- Page Summary: ${pageContext.summary || 'Autonomous revenue infrastructure for enterprise leaders.'}

GROUNDED KNOWLEDGE BASE EXCERPTS:
${groundedContext || 'No additional excerpts provided.'}

STRICT CONVERSATIONAL GUIDELINES:
1. Base all answers strictly on the grounded knowledge base and context above.
2. If asked about pricing: Starter is $2,500/mo, Growth is $5,000/mo (most popular), and Enterprise is custom.
3. If asked about benchmarks: use verified figures (4.2× pipeline velocity, 68% CAC reduction, 3.1× win rate lift). Never fabricate client metrics or financial guarantees.
4. Keep responses structured, executive, concise, and helpful (bullet points, clear paragraphs).
5. Always provide clickable markdown links to relevant internal pages when discussing solutions or booking, such as [B2B Market Discovery](/offerings/b2b/market-discovery), [All 7 Growth Verticals](/solutions#verticals), [Pricing](/pricing), or [Book Consultation](/book-consultation).
6. When the visitor expresses interest in discussing their business, pricing, or scheduling, warmly invite them to book a 30-minute consultation or submit an in-chat briefing.`;

    // 5. Check for Server-Side AI Provider Keys
    const openaiKey = process.env.OPENAI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    // A. OPENAI (Preferred if configured)
    if (openaiKey) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const openAiMessages = [
                { role: 'system', content: systemInstruction },
                ...history,
                { role: 'user', content: userMessage }
            ];

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiKey}`
                },
                body: JSON.stringify({
                    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
                    messages: openAiMessages,
                    temperature: 0.3,
                    max_tokens: 650
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                const aiResponseText = data.choices?.[0]?.message?.content?.trim();

                if (aiResponseText) {
                    return res.status(200).json({
                        success: true,
                        message: aiResponseText,
                        provider: 'openai',
                        model: data.model || 'gpt-4o-mini',
                        status: 'ai_live'
                    });
                }
            } else {
                console.warn('[Chat API] OpenAI responded with error status:', response.status);
            }
        } catch (err: any) {
            console.warn('[Chat API] OpenAI request failed or timed out:', err.message);
        }
    }

    // B. GROQ (High-speed Llama-3.3-70B alternative if configured)
    if (groqKey) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const groqMessages = [
                { role: 'system', content: systemInstruction },
                ...history,
                { role: 'user', content: userMessage }
            ];

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${groqKey}`
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: groqMessages,
                    temperature: 0.3,
                    max_tokens: 650
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                const aiResponseText = data.choices?.[0]?.message?.content?.trim();

                if (aiResponseText) {
                    return res.status(200).json({
                        success: true,
                        message: aiResponseText,
                        provider: 'groq',
                        model: 'llama-3.3-70b-versatile',
                        status: 'ai_live'
                    });
                }
            }
        } catch (err: any) {
            console.warn('[Chat API] Groq request failed or timed out:', err.message);
        }
    }

    // C. GEMINI (Google AI if configured)
    if (geminiKey) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const geminiContents = [
                ...history.map(h => ({
                    role: h.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: h.content }]
                })),
                {
                    role: 'user',
                    parts: [{ text: userMessage }]
                }
            ];

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemInstruction: { parts: [{ text: systemInstruction }] },
                    contents: geminiContents,
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 650
                    }
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

                if (aiResponseText) {
                    return res.status(200).json({
                        success: true,
                        message: aiResponseText,
                        provider: 'gemini',
                        model: 'gemini-1.5-flash',
                        status: 'ai_live'
                    });
                }
            }
        } catch (err: any) {
            console.warn('[Chat API] Gemini request failed or timed out:', err.message);
        }
    }

    // 6. Grounded Domain Fallback Response
    // If no provider API key is present or all external providers timed out / failed,
    // synthesize a high-precision domain response from the grounded knowledge base.
    const isOfflineOrNoKey = !openaiKey && !groqKey && !geminiKey && !anthropicKey;

    return res.status(200).json({
        success: true,
        message: null, // Signals frontend to render its rich local grounded response with dynamic action buttons
        status: 'grounded_rag',
        note: isOfflineOrNoKey
            ? 'Operating in Grounded Domain Mode. Add OPENAI_API_KEY or GROQ_API_KEY to .env to activate live LLM generation.'
            : 'AI Provider request timed out; falling back to grounded domain knowledge engine.'
    });
}
